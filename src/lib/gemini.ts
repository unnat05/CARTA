import { GoogleGenerativeAI } from "@google/generative-ai";
import { compareProduct, getBestDeal, searchProducts, Product } from "./mock-data";

// Lazy initialization of Gemini API
function getGenAI() {
  const apiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY || "";
  if (!apiKey) {
    return null;
  }
  return new GoogleGenerativeAI(apiKey);
}

const toCurrency = (value: number) => `₹${value.toLocaleString("en-IN")}`;

const formatProductSummary = (product: Product) => {
  const features = product.features?.slice(0, 3).join(', ');
  return `• ${product.name} (${product.marketplace}) — ${toCurrency(product.price)}, ${product.rating.toFixed(1)}★ from ${product.reviews}+ reviews${features ? `, ${features}` : ''}.`;
};

const parseCompareTerms = (prompt: string): [string, string] | null => {
  const normalized = prompt.replace(/[?\.]/g, ' ').replace(/\s+/g, ' ').trim();
  const tokens = normalized.match(/(?:compare|between)\s+(.+?)\s+(?:and|with|vs|versus)\s+(.+)/i);
  if (tokens?.length === 3) {
    return [tokens[1].trim(), tokens[2].trim()];
  }
  const vsTokens = normalized.match(/(.+?)\s+vs\s+(.+)/i);
  if (vsTokens?.length === 3) {
    return [vsTokens[1].trim(), vsTokens[2].trim()];
  }
  return null;
};

const extractProductName = (prompt: string): string | null => {
  const normalized = prompt.toLowerCase();
  const match = normalized.match(/(?:why is|should i buy|good time to buy|review of|tell me about|best choice for)\s+([\w\s\d\-\+\&]+?)(?:\?|$)/i);
  if (match?.[1]) {
    return match[1].trim();
  }
  const simple = normalized.match(/(?:buy|search|find|recommend)\s+([\w\s\d\-\+\&]+?)(?:\?|$)/i);
  return simple?.[1]?.trim() ?? null;
};

const buildSearchResponse = (prompt: string) => {
  const results = searchProducts(prompt);
  if (results.length === 0) {
    return `I couldn't find an exact match for "${prompt}" in the mock catalog, but here are three strong options to consider:\n\n• Apple iPhone 15 Pro – premium build, A17 Pro chip, best-in-class camera.\n• Samsung Galaxy S24 Ultra – excellent display, 200MP camera, strong battery.\n• Sony WH-1000XM5 – top-tier noise cancellation and comfort.\n\nIf you'd like, I can also compare any two of these in detail.`;
  }

  const top = results.slice(0, 3);
  return `I found ${results.length} relevant matches for "${prompt}". Top results:\n\n${top.map(formatProductSummary).join('\n')}\n\nRecommendation: ${top[0].name} is the best balance of performance, price, and availability from the mock marketplace data.`;
};

const buildCompareResponse = (prompt: string) => {
  const terms = parseCompareTerms(prompt);
  if (terms) {
    const [leftName, rightName] = terms;
    const left = getBestDeal(leftName) || compareProduct(leftName)[0];
    const right = getBestDeal(rightName) || compareProduct(rightName)[0];

    if (left && right) {
      const leftScore = left.rating * 10 + (left.discount ?? 0) + (right.price > left.price ? 5 : 0);
      const rightScore = right.rating * 10 + (right.discount ?? 0) + (left.price > right.price ? 5 : 0);
      const winner = leftScore >= rightScore ? left : right;
      const runnerUp = leftScore >= rightScore ? right : left;

      return `Comparing ${left.name} and ${right.name}:\n\n${formatProductSummary(left)}\n${formatProductSummary(right)}\n\nVerdict: ${winner.name} edges ahead because it offers the best mix of ${winner.rating >= runnerUp.rating ? 'rating and value' : 'price and feature set'}. If you want the most premium camera and display experience, ${winner.name} is the smarter pick.`;
    }
  }

  const results = searchProducts(prompt).slice(0, 2);
  if (results.length === 2) {
    return `I found two strong comparison candidates for your query:\n\n${formatProductSummary(results[0])}\n${formatProductSummary(results[1])}\n\nBetween these, ${results[0].name} is slightly better for general use, while ${results[1].name} is a strong alternative if you want a slightly different feature set.`;
  }

  return `I couldn't parse a direct comparison from your query, but I can still recommend top products based on the topic. Try asking "Compare iPhone 15 Pro vs Samsung Galaxy S24 Ultra" or "Which is better for photography?".`;
};

const buildPersonalAdvice = (prompt: string) => {
  const candidate = extractProductName(prompt) ?? '';
  const match = getBestDeal(candidate) || searchProducts(candidate)[0];

  if (match) {
    return `For your question about ${match.name}, it's a very competent choice. ${match.name} offers ${match.features?.slice(0, 3).join(', ') || 'strong performance and good battery life'}, and the mock listing shows it at ${toCurrency(match.price)}.\n\nIf you want value, it is definitely worth considering now. If you'd like, I can also compare it with another option like the Samsung Galaxy S24 Ultra or the Sony WH-1000XM5.`;
  }

  if (/good time to buy/.test(prompt.toLowerCase())) {
    return `Yes — the mock market is showing stable prices and a few discounts right now. If you're looking at premium smartphones or noise-cancelling headphones, it's a good time to buy before the next sales window.`;
  }

  return `This looks like a strong shopping question. Based on the latest mock data, I recommend selecting a product with high ratings and a solid price drop. Feel free to ask me to compare two exact products or search for the best deal.`;
};

const buildGeneralResponse = (prompt: string) => {
  const lower = prompt.toLowerCase();
  if (lower.includes('headphones') || lower.includes('earbuds')) {
    return `For headphones, the Sony WH-1000XM5 is our top mock recommendation—excellent noise cancellation, 30-hour battery life, and a premium listening experience. If you want a slightly cheaper alternative, Bose QC45 is also a strong option.`;
  }
  if (lower.includes('laptop') || lower.includes('macbook') || lower.includes('xps')) {
    return `For laptops, the mock data favors the Apple MacBook Air M3 for everyday performance and battery life, while the Dell XPS 15 is better if you need a bigger screen and more raw power.`;
  }
  return `I'm seeing a lot of good shopping opportunities in mock data. The fastest way to get a useful answer is to ask about a specific product or comparison, like "Compare iPhone 15 Pro and Samsung Galaxy S24 Ultra" or "Best noise-cancelling headphones."`;
};

const getMockShoppingAdvice = (prompt: string) => {
  const normalized = prompt.toLowerCase();
  if (/\b(compare|versus| vs |between)\b/.test(normalized)) {
    return buildCompareResponse(prompt);
  }

  if (/\b(why is|best choice|should i buy|good time to buy|review of|is it worth)\b/.test(normalized)) {
    return buildPersonalAdvice(prompt);
  }

  if (/\b(search|find|best|recommend|top|deal|price)\b/.test(normalized)) {
    return buildSearchResponse(prompt);
  }

  return buildGeneralResponse(prompt);
};

export const getShoppingAdvice = async (prompt: string) => {
  const genAI = getGenAI();
  if (!genAI) {
    return getMockShoppingAdvice(prompt);
  }

  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig: {
        temperature: 0.7,
        topP: 0.95,
        topK: 40,
        maxOutputTokens: 1024,
      },
    });

    const systemPrompt = `You are Carta, an AI shopping assistant for Indian e-commerce. Help users make smart purchasing decisions.\n\nGuidelines:\n- Be conversational and friendly\n- Give clear, actionable advice in 2-3 paragraphs\n- Focus on value and quality\n- Be honest about pros and cons\n- Mention specific products when relevant\n- Use Indian Rupees (₹) for prices\n- Keep responses concise but helpful (max 200 words)\n\nFormat your response with clear structure when appropriate.`;

    const result = await model.generateContent(`${systemPrompt}\n\nUser: ${prompt}`);
    const response = await result.response;
    const text = response.text();

    if (!text || text.trim().length === 0) {
      return getMockShoppingAdvice(prompt);
    }

    return text;
  } catch (error: unknown) {
    console.error('Gemini API error:', error);
    return getMockShoppingAdvice(prompt);
  }
};

export const summarizeReviews = async (reviewText: string) => {
  try {
    const genAI = getGenAI();
    
    if (!genAI) {
      return "Review summarization requires an API key. Please configure your Gemini API key as GEMINI_API_KEY or NEXT_PUBLIC_GEMINI_API_KEY.";
    }
    
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      generationConfig: {
        temperature: 0.5,
        maxOutputTokens: 512,
      },
    });
    
    const result = await model.generateContent(`Summarize these product reviews into Pros and Cons list with a final Verdict:\n\n${reviewText}`);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Gemini API error:', error);
    return "Unable to summarize reviews at this time. Please try again later.";
  }
};
