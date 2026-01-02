# BRAND STONE Official Website (popscent.kr)

## 프로젝트 개요
- **Project Name**: Brand Stone Corporate Website
- **Target Domain**: popscent.kr
- **Goal**: 글로벌 홈 프래그런스 전문 기업 브랜드스톤의 공식 웹사이트
- **Design Reference**: Toss (toss.im) 스타일의 미니멀리즘 UI/UX

## 라이브 미리보기
- **Preview URL**: https://3000-i98uy8ytf5nxs9iujibot-18e660f9.sandbox.novita.ai

## 현재 완료된 기능

### 1. UI/UX Design (토스 스타일)
- ✅ Black & White 기반 극도로 심플한 디자인
- ✅ 영문 헤드라인 + 한글 서브 텍스트 구성
- ✅ 넓은 여백과 고가독성 타이포그래피 (Inter 폰트)
- ✅ 스크롤 시 페이드인 애니메이션
- ✅ 모바일 반응형 디자인

### 2. 3대 사업영역 동적 애니메이션
CEO님의 핵심 요구사항인 '살아 움직이는 비즈니스' 구현:

| 사업 부문 | 애니메이션 |
|----------|-----------|
| **DISTRIBUTION** (국내 유통) | 택배 박스들이 컨베이어 벨트 위에서 움직이는 효과 |
| **GLOBAL TRADING** (해외 수출입) | 지구본이 회전하며 무역 라인이 펄스되는 효과 |
| **DEVELOPMENT** (맞춤 개발) | 파티클들이 모여 제품 형태를 만드는 어셈블 효과 |

### 3. 24시간 AI 영업사원 봇
- ✅ 우측 하단 채팅 버블 UI
- ✅ Gemini 1.5 Pro API 연동 (환경변수로 API 키 관리)
- ✅ 브랜드스톤 기업 정보 기반 시스템 프롬프트
- ✅ Fallback 응답 (API 키 미설정 시)
- ✅ OEM/ODM, 수출입, 유통 문의 자동 응대
- ✅ 타이핑 인디케이터 애니메이션

### 4. 웹사이트 섹션 구성
1. **Hero Section**: "Design your air." + 향기 웨이브 애니메이션
2. **Business Pillars**: 3대 사업영역 동적 카드
3. **Brands**: 양키캔들, 하리보캔들, 우드윅, 팝센트 파트너 로고
4. **Performance**: 매출 12.9억, 수출국 5+, 브랜드 4개 카운터 애니메이션
5. **Contact**: 문의 양식
6. **Footer**: 기업 정보

### 5. API 엔드포인트
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/` | GET | 메인 페이지 |
| `/api/health` | GET | 헬스 체크 |
| `/api/chat` | POST | AI 챗봇 대화 |

## 기술 스택
- **Framework**: Hono (Cloudflare Pages optimized)
- **Styling**: Tailwind CSS (CDN)
- **Fonts**: Inter (Google Fonts)
- **Icons**: Font Awesome
- **AI**: Gemini 1.5 Pro API
- **Deployment**: Cloudflare Pages

## 데이터 아키텍처
- **Storage**: 현재 없음 (필요시 Cloudflare D1/KV 추가 가능)
- **API Integration**: Google Generative AI (Gemini 1.5 Pro)
- **Data Flow**: Client → Hono API → Gemini API → Response

## 배포 방법

### 1. 환경변수 설정
```bash
# .dev.vars (로컬 개발용)
GEMINI_API_KEY=your-gemini-api-key

# 프로덕션 배포 시
npx wrangler secret put GEMINI_API_KEY
```

### 2. 빌드 및 배포
```bash
# 빌드
npm run build

# Cloudflare Pages 배포
npx wrangler pages deploy dist --project-name brandstone
```

### 3. 커스텀 도메인 연결
```bash
npx wrangler pages domain add popscent.kr --project-name brandstone
```

## 사용자 가이드

### 방문자용
1. 메인 페이지에서 스크롤하여 기업 정보 확인
2. 우측 하단 채팅 버블 클릭하여 AI 상담사와 대화
3. OEM/ODM, 수출입, 유통 관련 문의 가능
4. Contact 섹션에서 직접 문의 양식 제출

### 관리자용
1. Cloudflare Dashboard에서 트래픽 모니터링
2. 환경변수로 Gemini API 키 관리
3. 로그 확인: `wrangler pages deployment tail`

## 향후 개발 계획

### 미구현 기능
- [ ] 실제 문의 양식 이메일 발송 (SendGrid/Resend 연동)
- [ ] 다국어 지원 (영어, 일본어, 중국어)
- [ ] 제품 카탈로그 페이지
- [ ] 블로그/뉴스 섹션
- [ ] Google Analytics 연동

### 권장 다음 단계
1. **Gemini API 키 설정**: 프로덕션 환경에서 실제 AI 응답 활성화
2. **커스텀 도메인**: popscent.kr DNS 설정 및 SSL 인증서
3. **이메일 연동**: 문의 양식 제출 시 담당자 이메일 발송
4. **SEO 최적화**: 메타 태그, 사이트맵 추가

## 파일 구조
```
webapp/
├── src/
│   ├── index.tsx          # 메인 Hono 앱 + API 라우트
│   └── renderer.tsx       # JSX 렌더러 + 글로벌 스타일
├── dist/                  # 빌드 결과물
├── ecosystem.config.cjs   # PM2 설정
├── package.json
├── tsconfig.json
├── vite.config.ts
├── wrangler.jsonc         # Cloudflare 설정
└── README.md
```

## 기업 정보 (브랜드스톤)
- **회사명**: 주식회사 브랜드스톤 (BRAND STONE Co., Ltd.)
- **대표자**: 양종억 (Jongeok Yang)
- **설립일**: 2023.08.17
- **사업분야**: 홈 프래그런스 유통 및 제조
- **2024 매출**: 12.9억원 달성
- **주요 브랜드**: 양키캔들(한국 파트너), 하리보캔들(아시아 총판), 우드윅, 팝센트
- **수출국**: 일본, 중국, 대만, 베트남

---
**Last Updated**: 2026-01-01
**Status**: ✅ Active - Development Complete
