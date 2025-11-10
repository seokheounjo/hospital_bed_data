import axios from 'axios';
import { Hospital, HospitalParsed } from '@/types/hospital';

const API_KEY = process.env.NEXT_PUBLIC_API_KEY || '55361887939f3c9a75d709afcd988d6ede40ae2bfad558f8899f4fcb830d61e3';
const BASE_URL = 'https://apis.data.go.kr/B552657/ErmctInfoInqireService';

export async function getRealTimeBedInfo(
  stage1: string = '',
  stage2: string = '',
  numOfRows: number = 50
) {
  try {
    const url = `${BASE_URL}/getEmrrmRltmUsefulSckbdInfoInqire`;
    const response = await axios.get(url, {
      params: {
        serviceKey: API_KEY,
        STAGE1: stage1,
        STAGE2: stage2,
        pageNo: 1,
        numOfRows: numOfRows,
      },
      paramsSerializer: (params) => {
        return Object.entries(params)
          .map(([key, value]) => `${key}=${value}`)
          .join('&');
      },
    });

    if (response.data.response.header.resultCode === '00') {
      return response.data.response.body;
    } else {
      throw new Error(response.data.response.header.resultMsg);
    }
  } catch (error) {
    console.error('API 호출 실패:', error);
    throw error;
  }
}

export function parseBedInfo(item: Hospital): HospitalParsed {
  return {
    병원명: item.dutyName || 'N/A',
    전화번호: item.dutyTel3 || 'N/A',
    기관ID: item.hpid || 'N/A',
    응급실_일반: item.hv1 || 0,
    응급실_소아: item.hv2 || 0,
    응급실_야간: item.hv3 || 0,
    수술실_일반: item.hv4 || 0,
    수술실_신경외과: item.hv5 || 'N/A',
    수술실_심장혈관외과: item.hv6 || 0,
    수술실_흉부외과: item.hv7 || 'N/A',
    신경중환자실: item.hv10 || 'N/A',
    신생중환자실: item.hv11 || 'N/A',
    흉부중환자실: item.hv12 || 'N/A',
    일반중환자실: item.hv13 || 'N/A',
    입원실: item.hv17 || 0,
    소아입원실: item.hv18 || 0,
    응급실_병상수: item.hvec || 0,
    입원실_병상수: item.hvcc || 0,
    수술실_병상수: item.hvoc || 0,
    CT가용: item.hvctayn || 'N/A',
    MRI가용: item.hvmriayn || 'N/A',
    인공호흡기: item.hv28 || 0,
    조영제촬영기: item.hv29 || 0,
    구급차가용: item.hv30 || 0,
    위도: item.wgs84Lat,
    경도: item.wgs84Lon,
  };
}
