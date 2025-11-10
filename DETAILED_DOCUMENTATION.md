# 📚 응급실 병상 찾기 - 상세 구성 문서

## 📋 목차
1. [프로젝트 개요](#프로젝트-개요)
2. [전체 구조](#전체-구조)
3. [페이지 상세 설명](#페이지-상세-설명)
4. [컴포넌트 상세 설명](#컴포넌트-상세-설명)
5. [API 및 데이터 흐름](#api-및-데이터-흐름)
6. [스타일링 시스템](#스타일링-시스템)
7. [반응형 디자인](#반응형-디자인)

---

## 🎯 프로젝트 개요

### 기술 스택
- **Framework**: Next.js 16.0.1 (App Router)
- **언어**: TypeScript 5.0
- **스타일링**: Tailwind CSS 4.0
- **애니메이션**: Framer Motion
- **아이콘**: Lucide React
- **HTTP 클라이언트**: Axios
- **빌드 도구**: Turbopack

### 주요 특징
- ✅ 서버 사이드 렌더링 (SSR)
- ✅ API 라우트 기반 데이터 fetching
- ✅ 실시간 데이터 업데이트
- ✅ 완전한 반응형 디자인 (모바일 우선)
- ✅ 접근성 고려 (Accessibility)
- ✅ SEO 최적화

---

## 📁 전체 구조

```
emergency-bed-finder/
├── app/                          # Next.js App Router
│   ├── api/                      # API 라우트
│   │   └── beds/                 # 병상 데이터 API
│   │       └── route.ts          # GET 엔드포인트
│   ├── layout.tsx                # 루트 레이아웃 (HTML 구조)
│   ├── page.tsx                  # 메인 페이지 (홈)
│   ├── globals.css               # 글로벌 CSS (Tailwind 설정)
│   └── favicon.ico               # 파비콘
│
├── components/                   # React 컴포넌트
│   ├── Header.tsx                # 헤더 네비게이션
│   ├── HospitalCard.tsx          # 병원 정보 카드
│   ├── HospitalMap.tsx           # 지도 (카카오맵)
│   ├── SearchBar.tsx             # 검색 및 필터
│   └── ComingSoonModal.tsx       # 준비중 모달
│
├── lib/                          # 유틸리티 함수
│   └── api.ts                    # API 호출 함수
│
├── types/                        # TypeScript 타입 정의
│   └── hospital.ts               # 병원 데이터 타입
│
├── public/                       # 정적 파일
│   ├── next.svg
│   ├── vercel.svg
│   └── ...
│
├── .env.local                    # 환경 변수 (로컬)
├── .env.local.example            # 환경 변수 예시
├── package.json                  # 패키지 설정
├── tsconfig.json                 # TypeScript 설정
├── tailwind.config.js            # Tailwind 설정
├── next.config.ts                # Next.js 설정
│
├── README.md                     # 프로젝트 문서
├── DEPLOYMENT.md                 # 배포 가이드
├── PROJECT_SUMMARY.md            # 프로젝트 요약
└── DETAILED_DOCUMENTATION.md     # 이 파일
```

---

## 📄 페이지 상세 설명

### 1. 메인 페이지 (`app/page.tsx`)

**역할**: 응급실 병상 현황을 보여주는 메인 대시보드

#### 주요 섹션

##### 1.1 Hero Section (히어로 섹션)
**위치**: 페이지 상단
**기능**:
- 실시간 통계 표시 (등록 병원, 가용 병상, 병상 보유 병원)
- 그라데이션 배경 (#287dff → #417dff)
- 애니메이션 효과 (페이드인 + 위로 슬라이드)

**구성 요소**:
```typescript
- 제목: "실시간 응급실 병상 현황"
- 부제목: "전국 응급의료기관의 실시간 병상 정보를 한눈에 확인하세요"
- 통계 카드 3개:
  1. 등록 병원 수 (Activity 아이콘)
  2. 총 가용 병상 수 (TrendingUp 아이콘)
  3. 병상 보유 병원 수 (MapPin 아이콘)
```

**반응형**:
- **모바일**: 1열 그리드, 작은 아이콘, 간결한 텍스트
- **태블릿**: 3열 그리드, 중간 아이콘
- **데스크톱**: 3열 그리드, 큰 아이콘, 큰 텍스트

##### 1.2 검색 섹션
**컴포넌트**: `<SearchBar />`
**기능**:
- 병원명 검색
- 시/도 선택 필터
- 시/군/구 선택 필터
- 선택된 필터 표시 및 초기화

##### 1.3 지도 섹션
**컴포넌트**: `<HospitalMap />`
**기능**:
- 카카오맵 SDK 통합 (API 키 필요)
- 병원 위치 마커 표시
- 마커 호버 시 병원명 표시

##### 1.4 병원 목록 섹션
**컴포넌트**: `<HospitalCard />` (반복)
**기능**:
- 그리드 레이아웃 (3열)
- 각 병원의 상세 정보 카드
- 무한 스크롤 대응
- 로딩 상태 표시
- 에러 처리

#### 상태 관리

```typescript
// 주요 State
const [hospitals, setHospitals] = useState<HospitalParsed[]>([]);
const [filteredHospitals, setFilteredHospitals] = useState<HospitalParsed[]>([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState<string | null>(null);
const [searchQuery, setSearchQuery] = useState('');
const [region, setRegion] = useState({ stage1: '', stage2: '' });
```

#### 데이터 흐름

```
1. 페이지 로드
   ↓
2. useEffect 실행 (fetchHospitals)
   ↓
3. API 호출 (/api/beds)
   ↓
4. 데이터 파싱 (parseBedInfo)
   ↓
5. State 업데이트 (hospitals, filteredHospitals)
   ↓
6. UI 렌더링
```

#### useEffect 훅

##### 데이터 로드
```typescript
useEffect(() => {
  fetchHospitals(); // region 변경 시 재호출
}, [region]);
```

##### 검색 필터링
```typescript
useEffect(() => {
  let filtered = hospitals;

  if (searchQuery) {
    filtered = filtered.filter((hospital) =>
      hospital.병원명.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  setFilteredHospitals(filtered);
}, [searchQuery, hospitals]);
```

#### 로딩 상태

```typescript
{loading && (
  <div className="flex items-center justify-center py-20">
    <Loader2 className="w-12 h-12 text-[#287dff] animate-spin" />
    <p>데이터를 불러오는 중...</p>
  </div>
)}
```

#### 에러 상태

```typescript
{error && (
  <div className="bg-red-50 border border-red-200 rounded-xl p-6">
    <AlertCircle className="w-6 h-6" />
    <h3>오류가 발생했습니다</h3>
    <p>{error}</p>
  </div>
)}
```

---

## 🧩 컴포넌트 상세 설명

### 1. Header (`components/Header.tsx`)

**역할**: 전역 네비게이션 및 로고

#### 구조
```
Header
├── Logo (Heart 아이콘 + 텍스트)
├── Desktop Navigation (lg 이상)
│   ├── 실시간 병상
│   ├── 병원 검색 (준비중)
│   ├── 내 정보 (준비중)
│   └── 설정 (준비중)
├── 로그인 버튼 (준비중)
└── Mobile Menu Button (lg 미만)
    └── Mobile Navigation Drawer
```

#### 주요 기능

##### 모바일 메뉴
```typescript
const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

// 토글 버튼
<button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
  {mobileMenuOpen ? <X /> : <Menu />}
</button>
```

##### 준비중 모달
```typescript
const handleFeatureClick = (feature: string) => {
  setComingSoonFeature(feature);
  setShowComingSoon(true);
};
```

#### 스타일링
- **고정 헤더**: `fixed top-0 z-50`
- **배경**: 흰색 + 그림자
- **높이**: 모바일 56px, 데스크톱 64px
- **최대 너비**: 1280px (max-w-7xl)

#### 반응형 브레이크포인트
- **모바일 (< 1024px)**: 햄버거 메뉴
- **데스크톱 (≥ 1024px)**: 전체 네비게이션

---

### 2. SearchBar (`components/SearchBar.tsx`)

**역할**: 병원 검색 및 지역 필터

#### 구조
```
SearchBar
├── 검색 입력 필드 (Search 아이콘)
├── 지역 필터
│   ├── 시/도 선택 (MapPin 아이콘)
│   └── 시/군/구 선택 (Filter 아이콘)
└── 선택된 필터 표시
    ├── 필터 태그들
    └── 초기화 버튼
```

#### 주요 Props

```typescript
interface SearchBarProps {
  onSearch: (query: string) => void;
  onRegionChange: (stage1: string, stage2: string) => void;
}
```

#### 지역 데이터

```typescript
const regions = {
  서울특별시: ['강남구', '강동구', '강북구', ...],
  경기도: ['수원시', '성남시', '고양시', ...],
  인천광역시: ['중구', '동구', '미추홀구', ...],
  부산광역시: ['중구', '서구', '동구', ...],
  대구광역시: ['중구', '동구', '서구', ...],
};
```

#### 검색 로직

```typescript
const handleSearchSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  onSearch(searchQuery); // 부모 컴포넌트로 전달
};
```

#### 필터 로직

```typescript
const handleStage1Change = (value: string) => {
  setSelectedStage1(value);
  setSelectedStage2(''); // 시/군/구 초기화
  onRegionChange(value, '');
};

const handleStage2Change = (value: string) => {
  setSelectedStage2(value);
  onRegionChange(selectedStage1, value);
};
```

#### 스타일링
- **배경**: 흰색 + 큰 그림자
- **테두리 반경**: 16px (rounded-2xl)
- **패딩**: 모바일 16px, 데스크톱 24px
- **아이콘**: 입력 필드 왼쪽에 절대 위치

#### 개선 사항
- ✅ 드롭다운 화살표 아이콘 추가
- ✅ 포커스 시 파란색 링 (`focus:ring-2`)
- ✅ 비활성화 상태 스타일 (`disabled:bg-gray-100`)

---

### 3. HospitalCard (`components/HospitalCard.tsx`)

**역할**: 개별 병원 정보 표시 카드

#### 구조
```
HospitalCard
├── Header (그라데이션 배경)
│   ├── 병원명
│   ├── 전화번호 (Phone 아이콘)
│   └── 병상 상태 뱃지 (포화/부족/여유)
├── Body
│   ├── 응급실 가용 병상 (Bed 아이콘)
│   │   ├── 일반
│   │   ├── 소아
│   │   └── 야간
│   ├── 정보 그리드 (2열)
│   │   ├── 중환자실 (Activity 아이콘)
│   │   │   ├── 신경
│   │   │   └── 일반
│   │   └── 의료장비 (Stethoscope 아이콘)
│   │       ├── CT/MRI
│   │       └── 인공호흡기
│   └── 하단 정보
│       ├── 구급차 정보 (Ambulance 아이콘)
│       └── 상세보기 버튼 (준비중)
```

#### Props

```typescript
interface HospitalCardProps {
  hospital: HospitalParsed;
  index: number; // 애니메이션 딜레이용
}
```

#### 병상 상태 로직

```typescript
const totalBeds =
  Number(hospital.응급실_일반) +
  Number(hospital.응급실_소아) +
  Number(hospital.응급실_야간);

const getBedStatusColor = (beds: number) => {
  if (beds === 0) return 'text-red-500 bg-red-50'; // 포화
  if (beds <= 3) return 'text-orange-500 bg-orange-50'; // 부족
  return 'text-green-500 bg-green-50'; // 여유
};
```

#### 애니메이션

```typescript
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: index * 0.05 }} // 순차 애니메이션
>
```

#### 스타일링
- **카드**: 흰색 배경 + 그림자 + 호버 효과
- **헤더**: 파란색 그라데이션 배경
- **섹션 배경**:
  - 응급실: 연한 파란색 (#eff6ff)
  - 기타 정보: 회색 (#f9fafb)

#### 텍스트 처리
- ✅ 병원명: `break-words` (긴 이름 줄바꿈)
- ✅ 전화번호: `truncate` (긴 번호 말줄임)
- ✅ 최소 너비 설정: `min-w-0`

#### 반응형
- **모바일**: 작은 아이콘, 작은 폰트, 좁은 패딩
- **태블릿**: 중간 크기
- **데스크톱**: 큰 아이콘, 큰 폰트, 넓은 패딩

---

### 4. HospitalMap (`components/HospitalMap.tsx`)

**역할**: 카카오맵 기반 병원 위치 표시

#### 구조
```
HospitalMap
├── 헤더 (MapPin 아이콘 + 제목)
├── 지도 영역
│   └── 카카오맵 (또는 플레이스홀더)
└── 안내 메시지
```

#### Props

```typescript
interface HospitalMapProps {
  hospitals: HospitalParsed[];
}
```

#### 카카오맵 SDK 로딩

```typescript
useEffect(() => {
  const script = document.createElement('script');
  script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=YOUR_KEY&autoload=false`;
  script.async = true;

  script.onload = () => {
    window.kakao.maps.load(() => {
      setIsScriptLoaded(true);
    });
  };

  document.head.appendChild(script);
}, []);
```

#### 지도 초기화

```typescript
useEffect(() => {
  if (!isScriptLoaded || !mapRef.current) return;

  const options = {
    center: new window.kakao.maps.LatLng(37.5665, 126.978), // 서울 시청
    level: 8,
  };

  const kakaoMap = new window.kakao.maps.Map(mapRef.current, options);
  setMap(kakaoMap);
}, [isScriptLoaded]);
```

#### 마커 추가

```typescript
useEffect(() => {
  if (!map || hospitals.length === 0) return;

  hospitals.forEach((hospital) => {
    if (hospital.위도 && hospital.경도) {
      const markerPosition = new window.kakao.maps.LatLng(
        hospital.위도,
        hospital.경도
      );

      const marker = new window.kakao.maps.Marker({
        position: markerPosition,
        map: map,
      });

      // 인포윈도우
      const infowindow = new window.kakao.maps.InfoWindow({
        content: `<div style="padding:5px;">${hospital.병원명}</div>`,
      });

      // 이벤트
      window.kakao.maps.event.addListener(marker, 'mouseover', () => {
        infowindow.open(map, marker);
      });

      window.kakao.maps.event.addListener(marker, 'mouseout', () => {
        infowindow.close();
      });
    }
  });
}, [map, hospitals]);
```

#### 플레이스홀더
- 카카오맵 API 키가 없을 경우 안내 메시지 표시
- 맵 아이콘 + 텍스트

---

### 5. ComingSoonModal (`components/ComingSoonModal.tsx`)

**역할**: 준비중 기능 안내 모달

#### 구조
```
ComingSoonModal
├── Backdrop (반투명 검은색)
└── Modal
    ├── 닫기 버튼 (X)
    ├── 아이콘 (Construction)
    ├── 제목: "준비중입니다"
    ├── 내용
    │   └── "[기능명] 기능은 현재 개발 중입니다."
    └── 확인 버튼
```

#### Props

```typescript
interface ComingSoonModalProps {
  isOpen: boolean;
  onClose: () => void;
  feature: string;
}
```

#### 애니메이션 (Framer Motion)

```typescript
<AnimatePresence>
  {isOpen && (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
      >
        ...
      </motion.div>
    </>
  )}
</AnimatePresence>
```

#### 닫기 동작
- X 버튼 클릭
- 확인 버튼 클릭
- Backdrop 클릭

---

## 🔌 API 및 데이터 흐름

### API 라우트 (`app/api/beds/route.ts`)

**엔드포인트**: `GET /api/beds`

#### 쿼리 파라미터

```typescript
- stage1: string (시/도) - 선택
- stage2: string (시/군/구) - 선택
- numOfRows: number (조회 건수) - 기본값: 50
```

#### 응답 형식

```typescript
{
  items: {
    item: Hospital | Hospital[]
  },
  numOfRows: number,
  pageNo: number,
  totalCount: number
}
```

#### 구현

```typescript
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const stage1 = searchParams.get('stage1') || '';
  const stage2 = searchParams.get('stage2') || '';
  const numOfRows = parseInt(searchParams.get('numOfRows') || '50');

  try {
    const data = await getRealTimeBedInfo(stage1, stage2, numOfRows);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch hospital data' },
      { status: 500 }
    );
  }
}
```

### API 유틸리티 (`lib/api.ts`)

#### getRealTimeBedInfo()

**역할**: 공공데이터포털 API 호출

```typescript
export async function getRealTimeBedInfo(
  stage1: string = '',
  stage2: string = '',
  numOfRows: number = 50
) {
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
}
```

#### parseBedInfo()

**역할**: API 응답 데이터를 UI용 형식으로 변환

```typescript
export function parseBedInfo(item: Hospital): HospitalParsed {
  return {
    병원명: item.dutyName || 'N/A',
    전화번호: item.dutyTel3 || 'N/A',
    기관ID: item.hpid || 'N/A',
    응급실_일반: item.hv1 || 0,
    응급실_소아: item.hv2 || 0,
    응급실_야간: item.hv3 || 0,
    // ... 기타 필드
  };
}
```

### 타입 정의 (`types/hospital.ts`)

#### Hospital (API 응답 타입)

```typescript
export interface Hospital {
  dutyName: string;       // 병원명
  dutyTel3: string;       // 전화번호
  hpid: string;           // 기관ID
  hv1?: number;           // 응급실 일반
  hv2?: number;           // 응급실 소아
  hv3?: number;           // 응급실 야간
  // ... 추가 필드
}
```

#### HospitalParsed (UI용 타입)

```typescript
export interface HospitalParsed {
  병원명: string;
  전화번호: string;
  기관ID: string;
  응급실_일반: number;
  응급실_소아: number;
  응급실_야간: number;
  // ... 추가 필드
}
```

---

## 🎨 스타일링 시스템

### 컬러 팔레트

```css
/* 주조색 */
--primary: #287dff;           /* 파란색 */
--primary-dark: #417dff;      /* 진한 파란색 */

/* 텍스트 */
--foreground: #242424;        /* 다크 그레이 */
--text-gray: #212121;         /* 텍스트 그레이 */

/* 배경 */
--background: #ffffff;        /* 흰색 */
--bg-light-blue: #eff6ff;     /* 연한 파란색 */
--bg-gray: #f9fafb;          /* 연한 회색 */

/* 상태 */
--error: #ef4444;            /* 빨간색 */
--warning: #f97316;          /* 주황색 */
--success: #10b981;          /* 초록색 */
```

### 타이포그래피

```css
/* 폰트 패밀리 */
font-family: Pretendard, -apple-system, BlinkMacSystemFont, sans-serif;

/* 크기 */
text-xs: 0.75rem;     /* 12px */
text-sm: 0.875rem;    /* 14px */
text-base: 1rem;      /* 16px */
text-lg: 1.125rem;    /* 18px */
text-xl: 1.25rem;     /* 20px */
text-2xl: 1.5rem;     /* 24px */
text-3xl: 1.875rem;   /* 30px */
text-4xl: 2.25rem;    /* 36px */
text-5xl: 3rem;       /* 48px */

/* 굵기 */
font-normal: 400;
font-medium: 500;
font-semibold: 600;
font-bold: 700;
```

### 간격 시스템

```css
/* 패딩/마진 */
p-1: 0.25rem;    /* 4px */
p-2: 0.5rem;     /* 8px */
p-3: 0.75rem;    /* 12px */
p-4: 1rem;       /* 16px */
p-6: 1.5rem;     /* 24px */
p-8: 2rem;       /* 32px */

/* 간격 */
gap-1: 0.25rem;
gap-2: 0.5rem;
gap-3: 0.75rem;
gap-4: 1rem;
```

### 그림자

```css
shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1);
```

### 테두리 반경

```css
rounded-lg: 0.5rem;      /* 8px */
rounded-xl: 0.75rem;     /* 12px */
rounded-2xl: 1rem;       /* 16px */
rounded-full: 9999px;    /* 완전한 원 */
```

---

## 📱 반응형 디자인

### 브레이크포인트

```css
/* Tailwind 기본 브레이크포인트 */
sm: 640px;      /* 모바일 가로 */
md: 768px;      /* 태블릿 세로 */
lg: 1024px;     /* 태블릿 가로 / 작은 데스크톱 */
xl: 1280px;     /* 데스크톱 */
2xl: 1536px;    /* 큰 데스크톱 */
```

### 반응형 전략

#### 모바일 우선 (Mobile First)
기본 스타일은 모바일에 최적화, 큰 화면에서 확장

```typescript
// 예시
<div className="text-sm md:text-base lg:text-lg">
  // 모바일: 14px → 태블릿: 16px → 데스크톱: 18px
</div>
```

### 컴포넌트별 반응형

#### Header
```typescript
// 높이
h-14 md:h-16         // 모바일: 56px, 데스크톱: 64px

// 로고 크기
w-6 h-6 md:w-8 md:h-8

// 네비게이션
hidden lg:flex       // 1024px 이상에서만 표시
lg:hidden           // 1024px 미만에서만 표시
```

#### HospitalCard
```typescript
// 패딩
p-3 md:p-4          // 모바일: 12px, 데스크톱: 16px

// 폰트
text-base md:text-lg // 모바일: 16px, 데스크톱: 18px

// 아이콘
w-4 h-4 md:w-5 md:h-5

// 그리드
grid-cols-3          // 모든 화면에서 3열
gap-2 md:gap-3       // 간격 차이
```

#### SearchBar
```typescript
// 입력 필드
py-2.5 md:py-3      // 모바일: 10px, 데스크톱: 12px
text-sm md:text-base

// 그리드
grid-cols-1 md:grid-cols-2  // 모바일: 1열, 태블릿: 2열
```

#### Hero Section
```typescript
// 제목
text-2xl md:text-4xl lg:text-5xl

// 통계 카드
grid-cols-3          // 항상 3열 (모바일에서도)
p-3 md:p-4           // 패딩 차이
```

### 최적화 포인트

1. **텍스트 말줄임**: `truncate`, `break-words`
2. **최소/최대 너비**: `min-w-0`, `max-w-7xl`
3. **Flex 속성**: `flex-shrink-0`, `flex-1`
4. **간격 조정**: `gap-2 md:gap-4`
5. **조건부 표시**: `hidden md:block`

---

## 🔧 주요 개선 사항

### UI 개선 (2025-11-10)

#### 1. 텍스트 잘림 문제 해결
- ✅ 병원명: `break-words` 적용
- ✅ 전화번호: `truncate` 적용
- ✅ 모든 텍스트에 `min-w-0` 설정

#### 2. 모바일 최적화
- ✅ 헤더 높이 감소 (64px → 56px)
- ✅ 로고 텍스트 단축 ("응급실 병상 찾기" → "병상찾기")
- ✅ 아이콘 크기 조정 (모바일에서 작게)
- ✅ 패딩 감소

#### 3. 입력 요소 개선
- ✅ 드롭다운 화살표 추가
- ✅ 포커스 링 스타일 개선
- ✅ 플레이스홀더 텍스트 크기 조정

#### 4. 카드 레이아웃 개선
- ✅ 그리드 간격 조정
- ✅ 내부 여백 최적화
- ✅ 버튼 크기 반응형 적용

---

## 📊 성능 최적화

### 1. 이미지 최적화
- Next.js Image 컴포넌트 사용 준비
- Lazy Loading 기본 적용

### 2. 코드 스플리팅
- Next.js App Router 자동 코드 분할
- 각 페이지/컴포넌트별 번들 분리

### 3. 폰트 최적화
- Pretendard CDN 사용
- `font-display: swap` 설정

### 4. API 최적화
- Server-Side API Route 사용
- 클라이언트 직접 호출 방지

### 5. 애니메이션 최적화
- Framer Motion GPU 가속 사용
- `transform`, `opacity`만 애니메이션

---

## 🚀 배포 후 체크리스트

### Vercel 환경 변수
```
NEXT_PUBLIC_API_KEY=[공공데이터포털 API 키]
NEXT_PUBLIC_KAKAO_MAP_KEY=[카카오맵 API 키]  (선택)
```

### 필수 확인 사항
- [ ] 메인 페이지 로딩
- [ ] API 데이터 표시
- [ ] 검색 기능
- [ ] 필터 기능
- [ ] 모바일 반응형
- [ ] 애니메이션 작동
- [ ] 모달 작동

---

## 📝 추가 개발 계획

### Phase 1: 핵심 기능
- [ ] 병원 상세 페이지
- [ ] 즐겨찾기
- [ ] 최근 검색
- [ ] 거리순 정렬

### Phase 2: 사용자 기능
- [ ] 회원가입/로그인
- [ ] 사용자 프로필
- [ ] 알림 설정

### Phase 3: 고급 기능
- [ ] 실시간 알림
- [ ] 경로 안내
- [ ] 응급 전화
- [ ] 통계 분석

---

## 🎓 학습 포인트

이 프로젝트를 통해 배운 내용:

1. **Next.js App Router**: 서버 컴포넌트와 클라이언트 컴포넌트 구분
2. **TypeScript**: 타입 안전성을 통한 버그 예방
3. **Tailwind CSS**: 유틸리티 퍼스트 CSS 방법론
4. **반응형 디자인**: 모바일 우선 개발 전략
5. **API 통합**: 공공데이터 API 활용
6. **상태 관리**: React Hooks 효과적 사용
7. **애니메이션**: Framer Motion 성능 최적화
8. **Vercel 배포**: CI/CD 파이프라인

---

**문서 작성일**: 2025년 11월 10일
**버전**: 1.0.0
**최종 업데이트**: UI 개선 및 반응형 최적화 완료
