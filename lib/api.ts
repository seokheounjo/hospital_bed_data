import axios from 'axios';
import { Hospital, HospitalParsed, ApiResponse } from '@/types/hospital';

const API_KEY = process.env.NEXT_PUBLIC_API_KEY || '55361887939f3c9a75d709afcd988d6ede40ae2bfad558f8899f4fcb830d61e3';
const BASE_URL = 'https://apis.data.go.kr/B552657/ErmctInfoInqireService';

/**
 * 실시간 응급실 병상 정보 조회
 */
export async function getRealTimeBedInfo(
  stage1: string = '',
  stage2: string = '',
  numOfRows: number = 100
): Promise<{ items: Hospital[]; totalCount: number }> {
  const url = `${BASE_URL}/getEmrrmRltmUsefulSckbdInfoInqire`;

  try {
    const response = await axios.get<ApiResponse>(url, {
      params: {
        serviceKey: API_KEY,
        STAGE1: stage1,
        STAGE2: stage2,
        pageNo: 1,
        numOfRows: numOfRows,
        _type: 'json',
      },
    });

    if (response.data.response.header.resultCode === '00') {
      const body = response.data.response.body;
      const items = body.items?.item;

      // items가 없으면 빈 배열 반환
      if (!items) {
        return {
          items: [],
          totalCount: 0,
        };
      }

      // item이 배열인지 단일 객체인지 확인
      const itemsArray = Array.isArray(items) ? items : [items];

      return {
        items: itemsArray,
        totalCount: body.totalCount || 0,
      };
    } else {
      throw new Error(response.data.response.header.resultMsg);
    }
  } catch (error) {
    console.error('API 호출 실패:', error);
    throw error;
  }
}

/**
 * 병원 데이터 파싱 (API 응답 → UI용 데이터)
 */
export function parseBedInfo(item: Hospital): HospitalParsed {
  if (!item) {
    throw new Error('Invalid hospital data: item is undefined');
  }

  return {
    병원명: item.dutyName || 'N/A',
    전화번호: item.dutyTel3 || 'N/A',
    기관ID: item.hpid || 'N/A',
    응급실_일반: item.hv1 || 0,
    응급실_소아: item.hv2 || 0,
    응급실_야간: item.hv3 || 0,
    응급실_총병상: item.hvec || 0,
    응급실_사용중: item.hvoc || 0,
    중환자실_신경: item.hvs01 || 0,
    중환자실_신경_사용중: item.hvs02 || 0,
    중환자실_신생아: item.hvs03 || 0,
    중환자실_신생아_사용중: item.hvs04 || 0,
    중환자실_흉부외과: item.hvs05 || 0,
    중환자실_흉부외과_사용중: item.hvs06 || 0,
    중환자실_일반: item.hvs07 || 0,
    중환자실_일반_사용중: item.hvs08 || 0,
    CT_가능: item.hvctayn || 'N',
    MRI_가능: item.hvmriayn || 'N',
    인공호흡기_가능: item.hvventiayn || 'N',
    인공호흡기_격리_가능: item.hvventisoayn || 'N',
    인큐베이터_가능: item.hvincuayn || 'N',
    구급차_가용: item.hvamyn || 'N',
    위도: item.wgs84Lat,
    경도: item.wgs84Lon,
  };
}

/**
 * 카카오 로컬 API를 사용하여 병원 위치 검색
 */
export async function searchHospitalLocation(hospitalName: string): Promise<{
  lat: number;
  lon: number;
} | null> {
  try {
    const response = await fetch(
      `/api/hospital-location?name=${encodeURIComponent(hospitalName)}`
    );

    if (response.ok) {
      const data = await response.json();
      return {
        lat: data.lat,
        lon: data.lon,
      };
    }
    return null;
  } catch (error) {
    console.error('위치 검색 실패:', hospitalName, error);
    return null;
  }
}

/**
 * 여러 병원의 위치를 순차적으로 검색 (rate limiting 포함)
 */
export async function enrichHospitalsWithLocation(
  hospitals: HospitalParsed[]
): Promise<HospitalParsed[]> {
  const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
  const results: HospitalParsed[] = [];

  for (const hospital of hospitals) {
    if (!hospital.위도 || !hospital.경도) {
      const location = await searchHospitalLocation(hospital.병원명);
      if (location) {
        results.push({
          ...hospital,
          위도: location.lat,
          경도: location.lon,
        });
      } else {
        results.push(hospital);
      }
      // Rate limiting: 500ms 딜레이
      await delay(500);
    } else {
      results.push(hospital);
    }
  }

  return results;
}
