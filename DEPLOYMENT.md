# 🚀 Vercel 배포 가이드

## 배포 전 체크리스트

- [ ] 공공데이터포털 API 키 발급 완료
- [ ] (선택) 카카오맵 API 키 발급 완료
- [ ] GitHub 저장소 생성
- [ ] 로컬에서 빌드 테스트 완료 (`npm run build`)

## 1. Vercel에 프로젝트 연결

### 방법 1: Vercel CLI 사용

```bash
# Vercel CLI 설치
npm i -g vercel

# 프로젝트 디렉토리에서
vercel

# 프로덕션 배포
vercel --prod
```

### 방법 2: Vercel 대시보드 사용

1. [Vercel 대시보드](https://vercel.com/new)로 이동
2. "Import Git Repository" 클릭
3. GitHub 저장소 선택
4. 프로젝트 설정 확인
5. "Deploy" 버튼 클릭

## 2. 환경 변수 설정

Vercel 대시보드 > Settings > Environment Variables에서 설정:

### 필수 환경 변수

```
Name: NEXT_PUBLIC_API_KEY
Value: [공공데이터포털에서 발급받은 API 키]
```

### 선택 환경 변수

```
Name: NEXT_PUBLIC_KAKAO_MAP_KEY
Value: [카카오 개발자센터에서 발급받은 JavaScript 키]
```

> ⚠️ **중요**: `NEXT_PUBLIC_` 접두사가 있는 환경 변수는 클라이언트에 노출됩니다.

## 3. 빌드 설정

Vercel은 자동으로 Next.js 프로젝트를 감지합니다. 기본 설정:

```json
{
  "buildCommand": "next build",
  "outputDirectory": ".next",
  "devCommand": "next dev",
  "installCommand": "npm install"
}
```

필요시 `vercel.json` 파일로 커스터마이징 가능:

```json
{
  "buildCommand": "npm run build",
  "regions": ["icn1"],
  "headers": [
    {
      "source": "/api/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "s-maxage=60, stale-while-revalidate"
        }
      ]
    }
  ]
}
```

## 4. 도메인 설정

### Vercel 제공 도메인

배포 완료 후 자동으로 `your-project.vercel.app` 도메인이 생성됩니다.

### 커스텀 도메인 연결

1. Vercel 대시보드 > Settings > Domains
2. "Add Domain" 클릭
3. 도메인 입력 및 DNS 설정 완료

## 5. 성능 최적화

### 이미지 최적화

Next.js의 Image 컴포넌트 사용:

```tsx
import Image from 'next/image'

<Image
  src="/hospital-icon.png"
  width={40}
  height={40}
  alt="병원 아이콘"
/>
```

### 폰트 최적화

Pretendard 폰트를 CDN에서 로드 중 (현재 구현됨)

### API 캐싱

API 라우트에 캐싱 추가:

```typescript
export const revalidate = 60; // 60초마다 재검증
```

## 6. 모니터링

### Vercel Analytics

1. Vercel 대시보드 > Analytics 탭
2. "Enable Analytics" 클릭

### Error Tracking

Vercel은 자동으로 에러를 추적합니다:
- 대시보드 > Functions > Logs 에서 확인 가능

## 7. 배포 후 확인사항

- [ ] 메인 페이지 로딩 확인
- [ ] API 호출 정상 작동 확인
- [ ] 모바일 반응형 확인
- [ ] 검색 및 필터 기능 테스트
- [ ] 지도 표시 확인 (카카오맵 API 설정 시)
- [ ] 준비중 모달 테스트

## 8. 트러블슈팅

### API 키 오류

**증상**: "Failed to fetch hospital data" 에러

**해결**:
1. Vercel 환경 변수 확인
2. API 키가 올바른지 확인
3. 공공데이터포털에서 API 활성화 상태 확인

### 빌드 실패

**증상**: Build 단계에서 실패

**해결**:
```bash
# 로컬에서 빌드 테스트
npm run build

# 타입 에러 확인
npm run type-check
```

### 지도가 표시되지 않음

**증상**: 지도 영역이 빈 화면

**해결**:
1. `NEXT_PUBLIC_KAKAO_MAP_KEY` 환경 변수 설정 확인
2. 카카오 개발자센터에서 플랫폼 등록 (Web, 도메인 추가)

## 9. 지속적 배포 (CD)

Vercel은 자동으로 Git push 시 배포됩니다:

- `main` 브랜치 → 프로덕션 배포
- 다른 브랜치 → 프리뷰 배포

### 배포 브랜치 변경

Vercel 대시보드 > Settings > Git > Production Branch에서 변경 가능

## 10. 비용

Vercel 무료 플랜:
- ✅ 무제한 배포
- ✅ 자동 HTTPS
- ✅ 글로벌 CDN
- ⚠️ 함수 실행 시간 제한: 10초
- ⚠️ 대역폭 제한: 100GB/월

## 📚 참고 문서

- [Vercel 공식 문서](https://vercel.com/docs)
- [Next.js 배포 가이드](https://nextjs.org/docs/app/building-your-application/deploying)
- [환경 변수 설정](https://vercel.com/docs/projects/environment-variables)

---

배포 과정에서 문제가 발생하면 이슈를 생성해주세요! 🙏
