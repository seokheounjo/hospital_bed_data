export interface Hospital {
  dutyName: string; // 병원명
  dutyTel3: string; // 전화번호
  hpid: string; // 기관ID

  // 응급실 병상
  hv1?: number; // 응급실 일반
  hv2?: number; // 응급실 소아
  hv3?: number; // 응급실 야간

  // 수술실
  hv4?: number; // 수술실 일반
  hv5?: string; // 수술실 신경외과
  hv6?: number; // 수술실 심장혈관외과
  hv7?: string; // 수술실 흉부외과

  // 중환자실
  hv10?: string; // 신경중환자실
  hv11?: string; // 신생중환자실
  hv12?: string; // 흉부중환자실
  hv13?: string | number; // 일반중환자실

  // 입원실
  hv17?: number; // 입원실
  hv18?: number; // 소아입원실

  // 병상수
  hvec?: number | string; // 응급실 병상수
  hvcc?: number | string; // 입원실 병상수
  hvoc?: number | string; // 수술실 병상수

  // 의료장비
  hvctayn?: string; // CT
  hvmriayn?: string; // MRI
  hv28?: number; // 인공호흡기
  hv29?: number; // 조영제촬영기
  hv30?: number; // 구급차
  hv31?: number;
  hv36?: number;
  hv42?: string;

  // 위치 정보 (있다면)
  dutyAddr?: string;
  wgs84Lon?: number;
  wgs84Lat?: number;
}

export interface HospitalParsed {
  병원명: string;
  전화번호: string;
  기관ID: string;
  응급실_일반: number;
  응급실_소아: number;
  응급실_야간: number;
  수술실_일반: number;
  수술실_신경외과: string;
  수술실_심장혈관외과: number;
  수술실_흉부외과: string;
  신경중환자실: string;
  신생중환자실: string;
  흉부중환자실: string;
  일반중환자실: string | number;
  입원실: number;
  소아입원실: number;
  응급실_병상수: number | string;
  입원실_병상수: number | string;
  수술실_병상수: number | string;
  CT가용: string;
  MRI가용: string;
  인공호흡기: number;
  조영제촬영기: number;
  구급차가용: number;
  위도?: number;
  경도?: number;
}

export interface ApiResponse {
  response: {
    header: {
      resultCode: string;
      resultMsg: string;
    };
    body: {
      items: {
        item: Hospital | Hospital[];
      };
      numOfRows: number;
      pageNo: number;
      totalCount: number;
    };
  };
}
