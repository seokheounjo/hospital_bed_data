import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

const KAKAO_REST_KEY = '3c0b515ee4c1a1d1d17c39e99f887980';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const hospitalName = searchParams.get('name');

  if (!hospitalName) {
    return NextResponse.json(
      { error: 'Hospital name is required' },
      { status: 400 }
    );
  }

  try {
    const response = await axios.get(
      'https://dapi.kakao.com/v2/local/search/keyword.json',
      {
        headers: {
          Authorization: `KakaoAK ${KAKAO_REST_KEY}`,
        },
        params: {
          query: hospitalName,
          category_group_code: 'HP8', // 병원 카테고리
        },
      }
    );

    if (response.data.documents.length > 0) {
      const place = response.data.documents[0];
      return NextResponse.json({
        name: place.place_name,
        address: place.address_name,
        lat: parseFloat(place.y),
        lon: parseFloat(place.x),
      });
    } else {
      return NextResponse.json(
        { error: 'Hospital not found' },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error('Kakao API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch location' },
      { status: 500 }
    );
  }
}
