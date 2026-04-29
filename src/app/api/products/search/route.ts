import { NextResponse } from 'next/server';
import { searchAllMarketplaces } from '@/lib/marketplace-api';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { query, category, minPrice, maxPrice, sortBy, marketplace } = body;
    
    if (!query || typeof query !== 'string') {
      return NextResponse.json({ 
        error: 'Invalid query provided' 
      }, { status: 400 });
    }

    const products = await searchAllMarketplaces({
      query,
      category,
      minPrice,
      maxPrice,
      sortBy,
      marketplace,
    });
    
    return NextResponse.json({ 
      products,
      totalResults: products.length,
      query,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Product search error:', error);
    return NextResponse.json({ 
      error: 'Failed to search products',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('q');
  
  if (!query) {
    return NextResponse.json({ 
      error: 'Query parameter "q" is required' 
    }, { status: 400 });
  }

  try {
    const products = await searchAllMarketplaces({ query });
    
    return NextResponse.json({ 
      products,
      totalResults: products.length,
      query,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Product search error:', error);
    return NextResponse.json({ 
      error: 'Failed to search products',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
