import { NextResponse } from 'next/server';
import { getShoppingAdvice } from '@/lib/gemini';

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();
    
    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json({ 
        error: 'Invalid prompt provided' 
      }, { status: 400 });
    }

    console.log('Processing AI chat request for prompt:', prompt.substring(0, 100));
    
    // getShoppingAdvice now handles missing API keys gracefully
    const advice = await getShoppingAdvice(prompt);
    
    if (!advice) {
      console.warn('Empty response from Gemini API');
      return NextResponse.json({ 
        response: "I received your question but couldn't generate a response. Please try rephrasing your question." 
      });
    }
    
    return NextResponse.json({ response: advice });
  } catch (error) {
    console.error('AI Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error details:', errorMessage);
    
    // Return a user-friendly error response instead of 500
    return NextResponse.json({ 
      response: "I'm having trouble processing your request right now. Please try again in a moment, or use the Search and Compare features in the dashboard."
    });
  }
}
