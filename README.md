# 🏥 응급실 병상 찾기

전국 응급의료기관의 실시간 병상 정보를 한눈에 확인할 수 있는 웹 애플리케이션입니다.

![Next.js](https://img.shields.io/badge/Next.js-16.0-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?style=flat-square&logo=tailwind-css)

## ✨ 주요 기능

- 🔴 **실시간 병상 현황**: 전국 400+ 응급의료기관의 실시간 가용 병상 정보
- 🗺️ **지도 기반 검색**: 지역별 응급실 위치 및 병상 현황 시각화
- 🔍 **고급 검색 필터**: 시/도, 시/군/구 단위 지역 필터링
- 📱 **반응형 디자인**: 모바일, 태블릿, 데스크톱 모든 기기 지원
- 📊 **통계 대시보드**: 실시간 병상 통계 및 현황 분석

## 🚀 빠른 시작

### 1. 저장소 클론

```bash
git clone <repository-url>
cd emergency-bed-finder
```

### 2. 패키지 설치

```bash
npm install
```

### 3. 환경 변수 설정

`.env.local` 파일을 생성하고 다음 내용을 입력하세요:

```bash
# 공공데이터포털 API 키
NEXT_PUBLIC_API_KEY=your_api_key_here

# 카카오맵 API 키 (선택사항)
NEXT_PUBLIC_KAKAO_MAP_KEY=your_kakao_map_key_here
```

> **API 키 발급 방법**:
> - 공공데이터포털: https://www.data.go.kr/
> - 카카오 개발자: https://developers.kakao.com/

### 4. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

## 📦 빌드

프로덕션 빌드를 생성하려면:

```bash
npm run build
npm start
```

## 🌐 Vercel 배포

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### Vercel 환경 변수 설정

Vercel 대시보드에서 다음 환경 변수를 설정하세요:

- `NEXT_PUBLIC_API_KEY`: 공공데이터포털 API 키
- `NEXT_PUBLIC_KAKAO_MAP_KEY`: 카카오맵 API 키 (선택)

## 🛠️ 기술 스택

- **Framework**: [Next.js 16](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animation**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **HTTP Client**: [Axios](https://axios-http.com/)
- **Map**: [Kakao Maps SDK](https://apis.map.kakao.com/)

## 📁 프로젝트 구조

```
emergency-bed-finder/
├── app/
│   ├── api/beds/          # API 라우트
│   ├── layout.tsx          # 루트 레이아웃
│   ├── page.tsx            # 메인 페이지
│   └── globals.css         # 글로벌 스타일
├── components/
│   ├── Header.tsx          # 헤더 네비게이션
│   ├── HospitalCard.tsx    # 병원 카드 컴포넌트
│   ├── HospitalMap.tsx     # 지도 컴포넌트
│   ├── SearchBar.tsx       # 검색바
│   └── ComingSoonModal.tsx # 준비중 모달
├── lib/
│   └── api.ts              # API 유틸리티
├── types/
│   └── hospital.ts         # TypeScript 타입 정의
└── public/                 # 정적 파일
```

## 📊 데이터 출처

이 프로젝트는 [공공데이터포털](https://www.data.go.kr/)의 다음 API를 사용합니다:

- **API명**: 국립중앙의료원_전국 응급의료기관 정보 조회 서비스
- **제공기관**: 국립중앙의료원
- **데이터 갱신**: 실시간

## 🔒 라이선스

이 프로젝트는 MIT 라이선스를 따릅니다.

## 🤝 기여

이슈 제보와 풀 리퀘스트를 환영합니다!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📧 문의

프로젝트에 대한 문의사항이 있으시면 이슈를 생성해주세요.

---

Made with ❤️ using Next.js
