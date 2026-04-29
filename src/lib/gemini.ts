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
    
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
    
    const systemPrompt = `You are Carta, an AI shopping assistant. Help users make smart purchasing decisions.
    
    Guidelines:
    - Be conversational and friendly
    - Give clear, actionable advice
    - Focus on value and quality
    - Be honest about pros and cons
    - Keep responses concise but helpful
    
    Format your response with clear structure when appropriate.`;

    const result = await model.generateContent(`${systemPrompt}\n\nUser: ${prompt}`);
    const response = await result.response;
    const text = response.text();
    
    if (!text) {
      throw new Error('Empty response from AI');
    }
    
    return text;
  } catch (error) {
    console.error('Gemini API error:', error);
    // Return a user-friendly error message instead of throwing
    return "I'm having trouble connecting to the AI service right now. This could be due to:\n\n• Network connectivity issues\n• API service temporarily unavailable\n• Invalid API key configuration\n\nPlease try again in a moment, or use the Search and Compare features in the dashboard.";
  }
};

export const summarizeReviews = async (reviewText: string) => {
  try {
    const genAI = getGenAI();
    
    if (!genAI) {
      return "Review summarization requires an API key. Please configure your Gemini API key to use this feature.";
    }
    
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
    const result = await model.generateContent(`Summarize these product reviews into Pros and Cons list with a final Verdict: ${reviewText}`);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Gemini API error:', error);
    return "Unable to summarize reviews at this time. Please try again later.";
  }
};
