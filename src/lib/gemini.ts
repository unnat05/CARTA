import { GoogleGenerativeAI } from "@google/generative-ai";

// Lazy initialization of Gemini API
function getGenAI() {
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || "";
  if (!apiKey) {
    return null;
  }
  return new GoogleGenerativeAI(apiKey);
}

export const getShoppingAdvice = async (prompt: string) => {
  try {
    const genAI = getGenAI();
    
    if (!genAI) {
      // Return a helpful demo response when API key is not configured
      return `I understand you're asking about: "${prompt}"\n\nI'm currently in demo mode. Here's what I can help you with:\n\n• **Product Search**: Use the search feature to find products across multiple stores\n• **Price Comparison**: Compare prices and features side-by-side\n• **Price Alerts**: Set up alerts to track price drops\n• **Shopping History**: Review your past searches and decisions\n\nTo enable full AI-powered responses, add your Gemini API key to the .env.local file as NEXT_PUBLIC_GEMINI_API_KEY.\n\nYou can get a free API key from: https://makersuite.google.com/app/apikey`;
    }
    
    // Try gemini-1.5-flash first (faster and more reliable for free tier)
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      generationConfig: {
        temperature: 0.7,
        topP: 0.95,
        topK: 40,
        maxOutputTokens: 1024,
      },
    });
    
    const systemPrompt = `You are Carta, an AI shopping assistant for Indian e-commerce. Help users make smart purchasing decisions.
    
    Guidelines:
    - Be conversational and friendly
    - Give clear, actionable advice in 2-3 paragraphs
    - Focus on value and quality
    - Be honest about pros and cons
    - Mention specific products when relevant
    - Use Indian Rupees (₹) for prices
    - Keep responses concise but helpful (max 200 words)
    
    Format your response with clear structure when appropriate.`;

    const result = await model.generateContent(`${systemPrompt}\n\nUser: ${prompt}`);
    const response = await result.response;
    const text = response.text();
    
    if (!text || text.trim().length === 0) {
      throw new Error('Empty response from AI');
    }
    
    return text;
  } catch (error: any) {
    console.error('Gemini API error:', error);
    
    // Provide specific error messages
    if (error?.message?.includes('API_KEY_INVALID')) {
      return "⚠️ The Gemini API key is invalid. Please check your API key configuration.\n\nGet a valid API key from: https://makersuite.google.com/app/apikey";
    }
    
    if (error?.message?.includes('QUOTA_EXCEEDED')) {
      return "⚠️ API quota exceeded. The free tier has limits. Please try again later or upgrade your API plan.";
    }
    
    if (error?.message?.includes('SAFETY')) {
      return "I couldn't process that request due to safety filters. Please try rephrasing your question.";
    }
    
    // Generic fallback with helpful suggestions
    return `I'm having trouble connecting to the AI service right now. Here's what I can suggest:\n\n**For your question about "${prompt.substring(0, 50)}${prompt.length > 50 ? '...' : ''}":**\n\n• Try the **Search** feature to find products\n• Use **Compare** to see side-by-side analysis\n• Check **Price Alerts** for deals\n\nThe AI service will be back shortly!`;
  }
};

export const summarizeReviews = async (reviewText: string) => {
  try {
    const genAI = getGenAI();
    
    if (!genAI) {
      return "Review summarization requires an API key. Please configure your Gemini API key to use this feature.";
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
