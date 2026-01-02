# 🚀 젠스파크(Genspark) 개발자 전달 문서
## Brand Stone Official Website (popscent.kr)

---

## 📋 프로젝트 개요

| 항목 | 내용 |
|------|------|
| **프로젝트명** | 브랜드스톤 공식 웹사이트 |
| **도메인** | popscent.kr |
| **클라이언트** | 주식회사 브랜드스톤 (CEO: 양종억) |
| **디자인 레퍼런스** | https://toss.im/ (토스 스타일 미니멀리즘) |
| **기술 스택** | Hono + TypeScript + Tailwind CSS + Cloudflare Pages |

---

## 🎨 1. UI/UX 디자인 컨셉: "The Toss Minimalist"

### 디자인 원칙
```
✅ 극도의 심플함 - Black & White 기반
✅ 넓은 여백 (Whitespace) 활용
✅ 영문 헤드라인 + 한글 서브텍스트
✅ 스크롤 트리거 페이드인 애니메이션
✅ 모바일 퍼스트 반응형 디자인
```

### 컬러 팔레트
```css
/* Primary Colors */
--brand-black: #191f28;    /* 메인 텍스트 */
--brand-gray: #8b95a1;     /* 서브 텍스트 */
--brand-blue: #3182f6;     /* 액센트 (토스 블루) */
--brand-light: #f8f9fa;    /* 배경 */
--white: #ffffff;          /* 기본 배경 */
```

### 타이포그래피
```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;

/* 헤드라인 */
.headline {
  font-weight: 700-900;
  font-size: 4rem - 8rem;
  letter-spacing: -0.02em;
}

/* 서브텍스트 */
.subtext {
  font-weight: 400;
  font-size: 1rem - 1.25rem;
  color: var(--brand-gray);
}
```

---

## 🎬 2. 3대 사업영역 동적 애니메이션

### CEO 요구사항
> "토스의 정적인 이모티콘과 달리, 움직이는 화면으로 '사업이 이렇게 흘러가고 있다'는 표현을 원함"

### 구현된 애니메이션

#### A. DISTRIBUTION (국내 유통)
```css
/* 컨베이어 벨트 위에서 박스들이 움직이는 효과 */
@keyframes moveBoxes {
  0%, 100% { transform: translateY(0) scale(1); opacity: 0.7; }
  50% { transform: translateY(-40px) scale(1.1); opacity: 1; }
}

.box {
  background: linear-gradient(135deg, #3182f6 0%, #1a56db 100%);
  animation: moveBoxes 3s ease-in-out infinite;
}
```

#### B. GLOBAL TRADING (해외 수출입)
```css
/* 지구본 회전 + 무역 라인 펄스 효과 */
@keyframes rotate {
  from { transform: translate(-50%, -50%) rotate(0deg); }
  to { transform: translate(-50%, -50%) rotate(360deg); }
}

@keyframes pulse-line {
  0%, 100% { opacity: 0.3; height: 40px; }
  50% { opacity: 1; height: 60px; }
}
```

#### C. DEVELOPMENT (맞춤 개발)
```css
/* 파티클들이 모여 제품 형태를 만드는 어셈블 효과 */
@keyframes assemble {
  0% {
    transform: translate(calc(var(--tx) * 1px), calc(var(--ty) * 1px)) scale(0);
    opacity: 0;
  }
  50% {
    transform: translate(0, 0) scale(1);
    opacity: 1;
  }
  100% {
    transform: translate(calc(var(--tx) * -0.5px), calc(var(--ty) * -0.5px)) scale(0.8);
    opacity: 0.5;
  }
}
```

---

## 🤖 3. AI 영업사원 봇 (Gemini 1.5 Pro)

### 시스템 프롬프트
```javascript
const systemPrompt = `You are the Senior Sales Manager of Brand Stone (주식회사 브랜드스톤), 
a global home fragrance distribution and trading company.

COMPANY PROFILE:
- Company: Brand Stone Co., Ltd. (주식회사 브랜드스톤)
- CEO: Jongeok Yang (양종억)
- Established: August 17, 2023
- Business Areas: Home Fragrance (Air Fresheners, Candles, Diffusers) Distribution & Manufacturing
- 2024 Revenue: Achieved 1.29 Billion KRW

KEY BRANDS:
- Yankee Candle: Official Korean Partner
- Haribo Candle: Asia Exclusive Distributor (Japan, China, Taiwan, Vietnam)
- WoodWick: Premium crackling candle brand
- PopScent: In-house developed brand
- Scentrary: New premium line

BUSINESS PILLARS:
1. DISTRIBUTION: Domestic online/offline retail channels
2. GLOBAL TRADING: Import/Export, Asia distributorship
3. DEVELOPMENT: OEM/ODM manufacturing, private label

YOUR ROLE:
- Respond professionally in Korean
- Collect lead information for OEM/ODM, Export, or Distribution inquiries
- Guide potential partners to appropriate contact channels`;
```

### API 구현
```typescript
// src/index.tsx
app.post('/api/chat', async (c) => {
  const { message } = await c.req.json<{ message: string }>()
  const apiKey = c.env?.GEMINI_API_KEY || ''
  
  if (!apiKey) {
    return c.json({ response: getFallbackResponse(message) })
  }
  
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ role: 'user', parts: [{ text: message }] }],
        systemInstruction: { parts: [{ text: systemPrompt }] },
        generationConfig: { temperature: 0.7, maxOutputTokens: 1024 }
      })
    }
  )
  
  const data = await response.json()
  return c.json({ response: data.candidates?.[0]?.content?.parts?.[0]?.text })
})
```

### 챗봇 UI
```html
<!-- 우측 하단 고정 버블 -->
<div class="chat-bubble" onclick="toggleChat()">
  <i class="fas fa-comments text-white text-xl"></i>
</div>

<!-- 채팅 윈도우 -->
<div class="chat-window" id="chatWindow">
  <div class="chat-header">AI Sales Agent | 24/7 상담 가능</div>
  <div class="chat-messages" id="chatMessages"></div>
  <div class="chat-input-area">
    <input type="text" placeholder="메시지를 입력하세요..."/>
    <button onclick="sendMessage()">전송</button>
  </div>
</div>
```

---

## 🌐 4. 웹사이트 섹션 구조

```
┌─────────────────────────────────────┐
│           NAVIGATION                │
│   BRAND STONE | BUSINESS | BRANDS   │
├─────────────────────────────────────┤
│                                     │
│           HERO SECTION              │
│       "Design your air."            │
│    + 향기 웨이브 애니메이션          │
│                                     │
├─────────────────────────────────────┤
│                                     │
│       BUSINESS PILLARS              │
│  [Distribution][Trading][Development]│
│     움직이는 3D 애니메이션 카드      │
│                                     │
├─────────────────────────────────────┤
│                                     │
│          BRANDS SECTION             │
│  Yankee | Haribo | WoodWick | PopScent │
│                                     │
├─────────────────────────────────────┤
│                                     │
│       PERFORMANCE SECTION           │
│  ₩1,290,000,000+ | 5+ Countries | 4 Brands │
│      카운터 애니메이션              │
│                                     │
├─────────────────────────────────────┤
│                                     │
│         CONTACT SECTION             │
│        문의 양식 (Form)             │
│                                     │
├─────────────────────────────────────┤
│           FOOTER                    │
│   Company Info | Copyright          │
└─────────────────────────────────────┘
           [💬 AI Chat Bubble]
```

---

## 📦 5. 프로젝트 파일 구조

```
webapp/
├── src/
│   ├── index.tsx          # 메인 Hono 앱
│   │   ├── API Routes     # /api/health, /api/chat
│   │   ├── Main Page      # Hero, Business, Brands, Performance, Contact
│   │   └── Chatbot JS     # 클라이언트 사이드 스크립트
│   │
│   └── renderer.tsx       # JSX 렌더러
│       ├── HTML Head      # Meta, Fonts, CDN
│       ├── Global Styles  # CSS Animations
│       └── Tailwind Config
│
├── dist/                  # 빌드 결과물 (_worker.js)
├── ecosystem.config.cjs   # PM2 설정
├── package.json           # 의존성
├── tsconfig.json          # TypeScript 설정
├── vite.config.ts         # Vite 빌드 설정
├── wrangler.jsonc         # Cloudflare Pages 설정
├── README.md              # 프로젝트 문서
└── DEVELOPER_INSTRUCTION.md  # 이 문서
```

---

## 🚀 6. 배포 가이드

### 로컬 개발
```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 또는 PM2로 실행
npm run build
pm2 start ecosystem.config.cjs
```

### Cloudflare Pages 배포
```bash
# 1. Cloudflare API 키 설정
# Deploy 탭에서 Cloudflare API Key 연결

# 2. 빌드
npm run build

# 3. 프로젝트 생성
npx wrangler pages project create brandstone --production-branch main

# 4. 배포
npx wrangler pages deploy dist --project-name brandstone

# 5. 환경변수 설정 (Gemini API Key)
npx wrangler secret put GEMINI_API_KEY --project-name brandstone
# 프롬프트에 API 키 입력

# 6. 커스텀 도메인 연결
npx wrangler pages domain add popscent.kr --project-name brandstone
```

### DNS 설정 (popscent.kr)
```
Type: CNAME
Name: @
Target: brandstone.pages.dev

Type: CNAME
Name: www
Target: brandstone.pages.dev
```

---

## 🔧 7. 환경변수

| 변수명 | 설명 | 필수 |
|--------|------|------|
| `GEMINI_API_KEY` | Google Gemini 1.5 Pro API 키 | 선택 (없으면 Fallback 응답) |

### .dev.vars (로컬 개발용)
```
GEMINI_API_KEY=your-api-key-here
```

### Gemini API 키 발급
1. https://makersuite.google.com/app/apikey 접속
2. "Create API Key" 클릭
3. 생성된 API 키 복사
4. Cloudflare Secret으로 등록

---

## 📊 8. 기업 정보 (시스템 프롬프트용)

```yaml
Company:
  name: 주식회사 브랜드스톤 (BRAND STONE Co., Ltd.)
  ceo: 양종억 (Jongeok Yang)
  established: 2023.08.17
  revenue_2024: 12.9억원

Business:
  - Distribution: 국내 온/오프라인 유통 (쿠팡, 네이버, 편의점, 백화점)
  - Global Trading: 해외 수출입 (일본, 중국, 대만, 베트남)
  - Development: OEM/ODM, 라이선스 상품 개발

Brands:
  - Yankee Candle: 한국 공식 파트너
  - Haribo Candle: 아시아 독점 총판
  - WoodWick: 프리미엄 크래클링 캔들
  - PopScent: 자체 브랜드

Contact:
  email: info@brandstone.co.kr
  trade: trade@brandstone.co.kr
  sales: sales@brandstone.co.kr
```

---

## ✅ 9. 체크리스트

### 완료된 작업
- [x] 토스 스타일 UI/UX 적용
- [x] Black & White 미니멀 디자인
- [x] 영문 헤드라인 + 한글 서브텍스트
- [x] 3대 사업영역 동적 애니메이션
- [x] 24시간 AI 영업사원 봇 (Gemini 1.5 Pro)
- [x] 모바일 반응형 디자인
- [x] 스크롤 페이드인 애니메이션
- [x] 카운터 애니메이션 (매출, 수출국, 브랜드)
- [x] Contact 양식

### 향후 작업 (권장)
- [ ] Gemini API 키 프로덕션 설정
- [ ] popscent.kr 도메인 연결
- [ ] 이메일 발송 연동 (SendGrid/Resend)
- [ ] Google Analytics 연동
- [ ] SEO 최적화 (sitemap.xml, robots.txt)
- [ ] 다국어 지원 (EN, JP, CN)

---

## 📞 10. 지원 연락처

**젠스파크 개발 지원 필요 시:**
- 이 문서와 함께 코드베이스 전달
- 추가 기능 요청 시 별도 명세 작성

**브랜드스톤 담당자:**
- CEO: 양종억
- Domain: popscent.kr
- Email: info@brandstone.co.kr

---

**문서 작성일**: 2026-01-01  
**버전**: 1.0.0  
**상태**: Production Ready
