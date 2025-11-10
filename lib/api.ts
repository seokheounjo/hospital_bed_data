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
 * 병원 기본 정보 조회 (위치 정보 포함)
 */
async function getHospitalLocation(hpid: string): Promise<{ lat?: number; lon?: number }> {
  const url = `${BASE_URL}/getEgytBassInfoInqire`;

  try {
    const response = await axios.get(url, {
      params: {
        serviceKey: API_KEY,
        HPID: hpid,
        pageNo: 1,
        numOfRows: 1,
        _type: 'json',
      },
    });

    if (response.data.response.header.resultCode === '00') {
      const item = response.data.response.body.items?.item;
      if (item) {
        return {
          lat: item.wgs84Lat,
          lon: item.wgs84Lon,
        };
      }
    }
  } catch (error) {
    console.error('위치 정보 조회 실패:', hpid, error);
  }

  return {};
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
 * 위치 정보를 추가로 조회하여 병합
 */
export async function enrichWithLocation(hospitals: HospitalParsed[]): Promise<HospitalParsed[]> {
  const promises = hospitals.map(async (hospital) => {
    if (!hospital.위도 || !hospital.경도) {
      const location = await getHospitalLocation(hospital.기관ID);
      return {
        ...hospital,
        위도: location.lat,
        경도: location.lon,
      };
    }
    return hospital;
  });

  return await Promise.all(promises);
}
