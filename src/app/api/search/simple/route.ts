import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const q = searchParams.get('q');

  if (!q) {
    return NextResponse.json({ error: 'Missing query parameter' }, { status: 400 });
  }

  try {
    const response = await fetch(
      `https://rai-api.chinagut.cn/api/f/search/simple?q=${encodeURIComponent(q)}`,
      {
        headers: {
          'Accept': 'application/json',
        },
      }
    );

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Search API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
