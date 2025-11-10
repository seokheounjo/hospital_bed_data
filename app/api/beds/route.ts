import { NextResponse } from 'next/server';
import { getRealTimeBedInfo } from '@/lib/api';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const stage1 = searchParams.get('stage1') || '';
  const stage2 = searchParams.get('stage2') || '';
  const numOfRows = parseInt(searchParams.get('numOfRows') || '50');

  try {
    const data = await getRealTimeBedInfo(stage1, stage2, numOfRows);
    return NextResponse.json(data);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch hospital data' },
      { status: 500 }
    );
  }
}
