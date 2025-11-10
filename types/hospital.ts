// API 응답 타입
export interface Hospital {
  dutyName: string;       // 병원명
  dutyTel3: string;       // 전화번호
  hpid: string;           // 기관ID
  hv1?: number;           // 응급실 일반
  hv2?: number;           // 응급실 소아
  hv3?: number;           // 응급실 야간
  hvec?: number;          // 응급실 총 병상
  hvoc?: number;          // 응급실 사용 중 병상
  hvs01?: number;         // 신경중환자실
  hvs02?: number;         // 신경중환자실 사용 중
  hvs03?: number;         // 신생아중환자실
  hvs04?: number;         // 신생아중환자실 사용 중
  hvs05?: number;         // 흉부외과중환자실
  hvs06?: number;         // 흉부외과중환자실 사용 중
  hvs07?: number;         // 일반중환자실
  hvs08?: number;         // 일반중환자실 사용 중
  hvctayn?: string;       // CT 가능 여부
  hvmriayn?: string;      // MRI 가능 여부
  hvventiayn?: string;    // 인공호흡기 가능 여부
  hvventisoayn?: string;  // 인공호흡기(격리) 가능 여부
  hvincuayn?: string;     // 인큐베이터 가능 여부
  hvamyn?: string;        // 구급차 가용 여부
  wgs84Lat?: number;      // 위도
  wgs84Lon?: number;      // 경도
}

// UI용 파싱된 타입
export interface HospitalParsed {
  병원명: string;
  전화번호: string;
  기관ID: string;
  응급실_일반: number;
  응급실_소아: number;
  응급실_야간: number;
  응급실_총병상: number;
  응급실_사용중: number;
  중환자실_신경: number;
  중환자실_신경_사용중: number;
  중환자실_신생아: number;
  중환자실_신생아_사용중: number;
  중환자실_흉부외과: number;
  중환자실_흉부외과_사용중: number;
  중환자실_일반: number;
  중환자실_일반_사용중: number;
  CT_가능: string;
  MRI_가능: string;
  인공호흡기_가능: string;
  인공호흡기_격리_가능: string;
  인큐베이터_가능: string;
  구급차_가용: string;
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
