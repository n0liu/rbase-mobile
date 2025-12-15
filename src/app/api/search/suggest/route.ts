import { NextRequest, NextResponse } from 'next/server';

/**
 * 搜索建议 API 代理
 * 解决跨域问题：通过服务器端代理请求，避免浏览器 CORS 限制
 */
export async function GET(request: NextRequest) {
  try {
    // 从查询参数获取关键词
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('q');

    if (!query) {
      return NextResponse.json(
        { error: '缺少查询参数 q' },
        { status: 400 }
      );
    }

    // 代理请求到实际的 API
    const apiUrl = `https://rai-api.chinagut.cn/api/f/search/suggest?q=${encodeURIComponent(query)}`;
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`API 请求失败: ${response.status}`);
    }

    const data = await response.json();

    // 返回数据，同时设置 CORS 头（可选，如果需要从其他域名访问）
    return NextResponse.json(data, {
      headers: {
        'Access-Control-Allow-Origin': '*', // 生产环境建议指定具体域名
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  } catch (error) {
    console.error('搜索建议代理错误:', error);
    return NextResponse.json(
      { error: '获取搜索建议失败', data: [] },
      { status: 500 }
    );
  }
}

// 处理 OPTIONS 预检请求
export async function OPTIONS() {
  return NextResponse.json({}, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
