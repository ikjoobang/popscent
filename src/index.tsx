import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { html } from 'hono/html'
import { renderer } from './renderer'

type Bindings = {
  GEMINI_API_KEY?: string
  OPENAI_API_KEY?: string
}

// ============================================
// 10개국 다국어 번역 시스템
// ============================================
const LANGUAGE_ORDER = ['EN', 'KO', 'JA', 'ZH_CN', 'ZH_TW', 'DE', 'FR', 'IT', 'RU', 'AR'] as const
type LanguageCode = typeof LANGUAGE_ORDER[number]

interface Translation {
  nativeName: string
  dir: 'ltr' | 'rtl'
  // Navigation
  distribution: string
  trading: string
  development: string
  // Hero
  scrollDown: string
  // Sections
  domesticRetail: string
  importExport: string
  oemOdm: string
  partners: string
  hariboExclusive: string
  // Numbers
  revenue2024: string
  yoyGrowth: string
  countries: string
  globalBrands: string
  ownBrands: string
  clients: string
  // Contact
  contact: string
  getInTouch: string
  callNow: string
  // Footer
  companyName: string
  businessArea: string
  ceoTitle: string
  address: string
  addressEn: string
  copyright: string
  // Chat
  chatGreeting: string
  chatPlaceholder: string
  chatError: string
}

const TRANSLATIONS: Record<LanguageCode, Translation> = {
  EN: {
    nativeName: 'English',
    dir: 'ltr',
    distribution: 'Distribution',
    trading: 'Trading',
    development: 'Development',
    scrollDown: 'Scroll Down',
    domesticRetail: 'Domestic Retail',
    importExport: 'Import & Export',
    oemOdm: 'OEM / ODM',
    partners: 'Partners',
    hariboExclusive: 'Haribo Candle Asia Exclusive',
    // Why PopScent section
    whyBrandStone: 'Why PopScent?',
    whySubtitle: 'Your One-Stop Partner for Home Fragrance Business',
    why1Title: 'Exclusive Rights',
    why1Desc: 'Official partner of Haribo Candle, Yankee Candle, WoodWick, and TOMAMON',
    why2Title: 'OEM/ODM Ready',
    why2Desc: 'Custom product development with German manufacturers for reed diffusers, car & room fragrances',
    why3Title: 'Global Network',
    why3Desc: 'Active exports to 9+ countries including Japan, Taiwan, China, and Southeast Asia',
    why4Title: 'Multi-Channel',
    why4Desc: 'Coupang, Naver, convenience stores, Olive Young, and B2B corporate channels',
    revenue2024: '2024 Revenue',
    yoyGrowth: '10x YoY Growth',
    countries: 'Export Countries',
    globalBrands: 'Global Partners',
    ownBrands: 'Own Brands',
    clients: 'B2B Clients',
    contact: 'Contact',
    getInTouch: 'Get in Touch',
    callNow: 'Call',
    companyName: 'Brand Stone Co., Ltd.',
    businessArea: 'Home Fragrance / Distribution / OEM, ODM',
    ceoTitle: 'CEO',
    address: '(06083) V202, 6F, 602, Yeongdong-daero, Gangnam-gu, Seoul, Korea',
    addressEn: '(06083) V202, 6F, 602, Yeongdong-daero, Gangnam-gu, Seoul, Korea',
    copyright: '© 2023 Brand Stone Co., Ltd.',
    chatGreeting: "Hi! I'm PopScent's AI Sales Assistant. 😊\n\nFeel free to ask about our fragrances, OEM/ODM, or partnership opportunities!",
    chatPlaceholder: 'Type a message...',
    chatError: 'An error occurred.'
  },
  KO: {
    nativeName: '한국어',
    dir: 'ltr',
    distribution: 'Distribution',
    trading: 'Trading',
    development: 'Development',
    scrollDown: '스크롤',
    domesticRetail: '국내 유통',
    importExport: '해외 수출입',
    oemOdm: 'OEM / ODM',
    partners: 'Partners',
    hariboExclusive: '하리보캔들 아시아 총판',
    whyBrandStone: '왜 팝센트인가?',
    whySubtitle: '홈프래그런스 사업의 원스톱 파트너',
    why1Title: '독점권 보유',
    why1Desc: '하리보캔들, 양키캔들, 우드윅, 토마몬 공식 파트너',
    why2Title: 'OEM/ODM 가능',
    why2Desc: '독일 제조사와 협력한 리드디퓨저, 차량용·실내용 방향제 맞춤 개발',
    why3Title: '글로벌 네트워크',
    why3Desc: '일본, 대만, 중국, 동남아 등 9개국+ 수출 실적',
    why4Title: '다채널 유통',
    why4Desc: '쿠팡, 네이버, 편의점, 올리브영, B2B 기업 채널 운영',
    revenue2024: '2024 매출',
    yoyGrowth: '전년 대비 10배 성장',
    countries: '수출국',
    globalBrands: '글로벌 파트너',
    ownBrands: '자체 브랜드',
    clients: 'B2B 거래처',
    contact: 'Contact',
    getInTouch: '문의하기',
    callNow: '전화하기',
    companyName: '(주) 브랜드스톤',
    businessArea: '홈프래그런스 / 유통 / OEM, ODM',
    ceoTitle: '대표이사',
    address: '(06083) 서울시 강남구 영동대로 602, 6층 V202호 (삼성동 미켈란107)',
    addressEn: '(06083) V202, 6F, 602, Yeongdong-daero, Gangnam-gu, Seoul, Korea',
    copyright: '© 2023 주식회사 브랜드스톤',
    chatGreeting: '안녕하세요! 팝센트 AI 상담사입니다. 😊\n\n향기 제품, OEM/ODM, 파트너십 등 무엇이든 물어보세요!',
    chatPlaceholder: '메시지 입력...',
    chatError: '오류가 발생했습니다.'
  },
  JA: {
    nativeName: '日本語',
    dir: 'ltr',
    distribution: 'Distribution',
    trading: 'Trading',
    development: 'Development',
    scrollDown: 'スクロール',
    domesticRetail: '国内流通',
    importExport: '海外輸出入',
    oemOdm: 'OEM / ODM',
    partners: 'Partners',
    hariboExclusive: 'ハリボーキャンドル アジア総代理店',
    whyBrandStone: 'なぜPopScent？',
    whySubtitle: 'ホームフレグランス事業のワンストップパートナー',
    why1Title: '独占権保有',
    why1Desc: 'ハリボーキャンドル、ヤンキーキャンドル、ウッドウィック、トマモン公式パートナー',
    why2Title: 'OEM/ODM対応',
    why2Desc: 'ドイツメーカーと連携したリードディフューザー、車載・室内芳香剤のカスタム開発',
    why3Title: 'グローバルネットワーク',
    why3Desc: '日本、台湾、中国、東南アジアなど9カ国以上への輸出実績',
    why4Title: 'マルチチャネル',
    why4Desc: 'クーパン、ネイバー、コンビニ、オリーブヤング、B2B企業チャネル運営',
    revenue2024: '2024年 売上',
    yoyGrowth: '前年比10倍成長',
    countries: '輸出国',
    globalBrands: 'グローバルパートナー',
    ownBrands: '自社ブランド',
    clients: 'B2B取引先',
    contact: 'Contact',
    getInTouch: 'お問い合わせ',
    callNow: '電話する',
    companyName: '株式会社ブランドストーン',
    businessArea: 'ホームフレグランス / 流通 / OEM, ODM',
    ceoTitle: '代表取締役',
    address: '(06083) ソウル市江南区永東大路602, 6階V202号',
    addressEn: '(06083) V202, 6F, 602, Yeongdong-daero, Gangnam-gu, Seoul, Korea',
    copyright: '© 2023 Brand Stone Co., Ltd.',
    chatGreeting: 'こんにちは！ブランドストーンAI営業マネージャーです。😊\n\nOEM/ODM、輸出入、流通など何でもお気軽にお問い合わせください！',
    chatPlaceholder: 'メッセージを入力...',
    chatError: 'エラーが発生しました。'
  },
  ZH_CN: {
    nativeName: '简体中文',
    dir: 'ltr',
    distribution: 'Distribution',
    trading: 'Trading',
    development: 'Development',
    scrollDown: '向下滚动',
    domesticRetail: '国内分销',
    importExport: '进出口贸易',
    oemOdm: 'OEM / ODM',
    partners: 'Partners',
    hariboExclusive: '哈瑞宝蜡烛亚洲独家代理',
    whyBrandStone: '为什么选择PopScent？',
    whySubtitle: '家居香氛业务的一站式合作伙伴',
    why1Title: '独家代理权',
    why1Desc: 'Haribo Candle、Yankee Candle、WoodWick、TOMAMON官方合作伙伴',
    why2Title: 'OEM/ODM服务',
    why2Desc: '与德国制造商合作，定制开发藤条香薰、车载和室内香氛产品',
    why3Title: '全球网络',
    why3Desc: '出口至日本、台湾、中国、东南亚等9+国家',
    why4Title: '多渠道分销',
    why4Desc: 'Coupang、Naver、便利店、Olive Young及B2B企业渠道',
    revenue2024: '2024年营收',
    yoyGrowth: '同比增长10倍',
    countries: '出口国家',
    globalBrands: '全球合作伙伴',
    ownBrands: '自有品牌',
    clients: 'B2B客户',
    contact: 'Contact',
    getInTouch: '联系我们',
    callNow: '致电',
    companyName: 'Brand Stone 株式会社',
    businessArea: '家居香氛 / 分销 / OEM, ODM',
    ceoTitle: '首席执行官',
    address: '(06083) 首尔市江南区永东大路602, 6楼V202号',
    addressEn: '(06083) V202, 6F, 602, Yeongdong-daero, Gangnam-gu, Seoul, Korea',
    copyright: '© 2023 Brand Stone Co., Ltd.',
    chatGreeting: '您好！我是Brand Stone AI销售经理。😊\n\n欢迎咨询OEM/ODM、进出口或分销相关问题！',
    chatPlaceholder: '输入消息...',
    chatError: '发生错误。'
  },
  ZH_TW: {
    nativeName: '繁體中文',
    dir: 'ltr',
    distribution: 'Distribution',
    trading: 'Trading',
    development: 'Development',
    scrollDown: '向下捲動',
    domesticRetail: '國內分銷',
    importExport: '進出口貿易',
    oemOdm: 'OEM / ODM',
    partners: 'Partners',
    hariboExclusive: '哈瑞寶蠟燭亞洲獨家代理',
    whyBrandStone: '為什麼選擇PopScent？',
    whySubtitle: '家居香氛業務的一站式合作夥伴',
    why1Title: '獨家代理權',
    why1Desc: 'Haribo Candle、Yankee Candle、WoodWick、TOMAMON官方合作夥伴',
    why2Title: 'OEM/ODM服務',
    why2Desc: '與德國製造商合作，定製開發藤條香薰、車載和室內香氛產品',
    why3Title: '全球網絡',
    why3Desc: '出口至日本、台灣、中國、東南亞等9+國家',
    why4Title: '多渠道分銷',
    why4Desc: 'Coupang、Naver、便利店、Olive Young及B2B企業渠道',
    revenue2024: '2024年營收',
    yoyGrowth: '年增長10倍',
    countries: '出口國家',
    globalBrands: '全球合作夥伴',
    ownBrands: '自有品牌',
    clients: 'B2B客戶',
    contact: 'Contact',
    getInTouch: '聯繫我們',
    callNow: '致電',
    companyName: 'Brand Stone 株式會社',
    businessArea: '家居香氛 / 分銷 / OEM, ODM',
    ceoTitle: '執行長',
    address: '(06083) 首爾市江南區永東大路602, 6樓V202號',
    addressEn: '(06083) V202, 6F, 602, Yeongdong-daero, Gangnam-gu, Seoul, Korea',
    copyright: '© 2023 Brand Stone Co., Ltd.',
    chatGreeting: '您好！我是Brand Stone AI銷售經理。😊\n\n歡迎諮詢OEM/ODM、進出口或分銷相關問題！',
    chatPlaceholder: '輸入訊息...',
    chatError: '發生錯誤。'
  },
  DE: {
    nativeName: 'Deutsch',
    dir: 'ltr',
    distribution: 'Distribution',
    trading: 'Trading',
    development: 'Development',
    scrollDown: 'Scrollen',
    domesticRetail: 'Inlandsvertrieb',
    importExport: 'Import & Export',
    oemOdm: 'OEM / ODM',
    partners: 'Partners',
    hariboExclusive: 'Haribo Candle Asien Exklusiv',
    whyBrandStone: 'Warum PopScent?',
    whySubtitle: 'Ihr One-Stop-Partner für Home Fragrance',
    why1Title: 'Exklusivrechte',
    why1Desc: 'Offizieller Partner von Haribo Candle, Yankee Candle, WoodWick und TOMAMON',
    why2Title: 'OEM/ODM Service',
    why2Desc: 'Kundenspezifische Produktentwicklung mit deutschen Herstellern',
    why3Title: 'Globales Netzwerk',
    why3Desc: 'Export in 9+ Länder inkl. Japan, Taiwan, China und Südostasien',
    why4Title: 'Multi-Channel',
    why4Desc: 'Coupang, Naver, Convenience Stores, Olive Young und B2B-Kanäle',
    revenue2024: 'Umsatz 2024',
    yoyGrowth: '10x Wachstum',
    countries: 'Exportländer',
    globalBrands: 'Globale Partner',
    ownBrands: 'Eigenmarken',
    clients: 'B2B Kunden',
    contact: 'Kontakt',
    getInTouch: 'Kontaktieren',
    callNow: 'Anrufen',
    companyName: 'Brand Stone Co., Ltd.',
    businessArea: 'Home Fragrance / Vertrieb / OEM, ODM',
    ceoTitle: 'Geschäftsführer',
    address: '(06083) V202, 6F, 602, Yeongdong-daero, Gangnam-gu, Seoul, Korea',
    addressEn: '(06083) V202, 6F, 602, Yeongdong-daero, Gangnam-gu, Seoul, Korea',
    copyright: '© 2023 Brand Stone Co., Ltd.',
    chatGreeting: 'Hallo! Ich bin der AI Verkaufsmanager von Brand Stone. 😊\n\nFragen Sie gerne zu OEM/ODM, Import/Export oder Vertrieb!',
    chatPlaceholder: 'Nachricht eingeben...',
    chatError: 'Ein Fehler ist aufgetreten.'
  },
  FR: {
    nativeName: 'Français',
    dir: 'ltr',
    distribution: 'Distribution',
    trading: 'Trading',
    development: 'Development',
    scrollDown: 'Défiler',
    domesticRetail: 'Distribution nationale',
    importExport: 'Import & Export',
    oemOdm: 'OEM / ODM',
    partners: 'Partners',
    hariboExclusive: 'Haribo Candle Exclusif Asie',
    whyBrandStone: 'Pourquoi PopScent ?',
    whySubtitle: 'Votre partenaire unique pour les parfums d\'intérieur',
    why1Title: 'Droits exclusifs',
    why1Desc: 'Partenaire officiel de Haribo Candle, Yankee Candle, WoodWick et TOMAMON',
    why2Title: 'Service OEM/ODM',
    why2Desc: 'Développement personnalisé avec fabricants allemands',
    why3Title: 'Réseau mondial',
    why3Desc: 'Export vers 9+ pays dont Japon, Taiwan, Chine et Asie du Sud-Est',
    why4Title: 'Multi-canal',
    why4Desc: 'Coupang, Naver, supérettes, Olive Young et canaux B2B',
    revenue2024: 'Chiffre d\'affaires 2024',
    yoyGrowth: 'Croissance x10',
    countries: 'Pays export',
    globalBrands: 'Partenaires mondiaux',
    ownBrands: 'Marques propres',
    clients: 'Clients B2B',
    contact: 'Contact',
    getInTouch: 'Nous contacter',
    callNow: 'Appeler',
    companyName: 'Brand Stone Co., Ltd.',
    businessArea: 'Parfums d\'intérieur / Distribution / OEM, ODM',
    ceoTitle: 'PDG',
    address: '(06083) V202, 6F, 602, Yeongdong-daero, Gangnam-gu, Séoul, Corée',
    addressEn: '(06083) V202, 6F, 602, Yeongdong-daero, Gangnam-gu, Seoul, Korea',
    copyright: '© 2023 Brand Stone Co., Ltd.',
    chatGreeting: 'Bonjour ! Je suis le responsable commercial AI de Brand Stone. 😊\n\nN\'hésitez pas à poser des questions sur OEM/ODM, Import/Export ou Distribution !',
    chatPlaceholder: 'Tapez un message...',
    chatError: 'Une erreur s\'est produite.'
  },
  IT: {
    nativeName: 'Italiano',
    dir: 'ltr',
    distribution: 'Distribution',
    trading: 'Trading',
    development: 'Development',
    scrollDown: 'Scorri',
    domesticRetail: 'Distribuzione nazionale',
    importExport: 'Import & Export',
    oemOdm: 'OEM / ODM',
    partners: 'Partners',
    hariboExclusive: 'Haribo Candle Esclusiva Asia',
    whyBrandStone: 'Perché PopScent?',
    whySubtitle: 'Il tuo partner unico per le fragranze per la casa',
    why1Title: 'Diritti esclusivi',
    why1Desc: 'Partner ufficiale di Haribo Candle, Yankee Candle, WoodWick e TOMAMON',
    why2Title: 'Servizio OEM/ODM',
    why2Desc: 'Sviluppo personalizzato con produttori tedeschi',
    why3Title: 'Rete globale',
    why3Desc: 'Export in 9+ paesi tra cui Giappone, Taiwan, Cina e Sud-Est asiatico',
    why4Title: 'Multi-canale',
    why4Desc: 'Coupang, Naver, convenience store, Olive Young e canali B2B',
    revenue2024: 'Fatturato 2024',
    yoyGrowth: 'Crescita 10x',
    countries: 'Paesi export',
    globalBrands: 'Partner globali',
    ownBrands: 'Marchi propri',
    clients: 'Clienti B2B',
    contact: 'Contatto',
    getInTouch: 'Contattaci',
    callNow: 'Chiama',
    companyName: 'Brand Stone Co., Ltd.',
    businessArea: 'Fragranze per la casa / Distribuzione / OEM, ODM',
    ceoTitle: 'CEO',
    address: '(06083) V202, 6F, 602, Yeongdong-daero, Gangnam-gu, Seoul, Corea',
    addressEn: '(06083) V202, 6F, 602, Yeongdong-daero, Gangnam-gu, Seoul, Korea',
    copyright: '© 2023 Brand Stone Co., Ltd.',
    chatGreeting: 'Ciao! Sono il responsabile vendite AI di Brand Stone. 😊\n\nNon esitate a chiedere informazioni su OEM/ODM, Import/Export o Distribuzione!',
    chatPlaceholder: 'Scrivi un messaggio...',
    chatError: 'Si è verificato un errore.'
  },
  RU: {
    nativeName: 'Русский',
    dir: 'ltr',
    distribution: 'Distribution',
    trading: 'Trading',
    development: 'Development',
    scrollDown: 'Прокрутить',
    domesticRetail: 'Внутренняя дистрибуция',
    importExport: 'Импорт и Экспорт',
    oemOdm: 'OEM / ODM',
    partners: 'Partners',
    hariboExclusive: 'Haribo Candle Эксклюзив Азия',
    whyBrandStone: 'Почему PopScent?',
    whySubtitle: 'Ваш универсальный партнер в сфере домашних ароматов',
    why1Title: 'Эксклюзивные права',
    why1Desc: 'Официальный партнер Haribo Candle, Yankee Candle, WoodWick и TOMAMON',
    why2Title: 'OEM/ODM услуги',
    why2Desc: 'Индивидуальная разработка с немецкими производителями',
    why3Title: 'Глобальная сеть',
    why3Desc: 'Экспорт в 9+ стран: Япония, Тайвань, Китай и Юго-Восточная Азия',
    why4Title: 'Мультиканальность',
    why4Desc: 'Coupang, Naver, магазины, Olive Young и B2B каналы',
    revenue2024: 'Выручка 2024',
    yoyGrowth: 'Рост в 10 раз',
    countries: 'Страны экспорта',
    globalBrands: 'Глобальные партнеры',
    ownBrands: 'Собственные бренды',
    clients: 'Клиенты B2B',
    contact: 'Контакты',
    getInTouch: 'Связаться',
    callNow: 'Позвонить',
    companyName: 'Brand Stone Co., Ltd.',
    businessArea: 'Домашние ароматы / Дистрибуция / OEM, ODM',
    ceoTitle: 'Генеральный директор',
    address: '(06083) V202, 6F, 602, Yeongdong-daero, Gangnam-gu, Сеул, Корея',
    addressEn: '(06083) V202, 6F, 602, Yeongdong-daero, Gangnam-gu, Seoul, Korea',
    copyright: '© 2023 Brand Stone Co., Ltd.',
    chatGreeting: 'Здравствуйте! Я AI менеджер по продажам Brand Stone. 😊\n\nЗадавайте вопросы об OEM/ODM, импорте/экспорте или дистрибуции!',
    chatPlaceholder: 'Введите сообщение...',
    chatError: 'Произошла ошибка.'
  },
  AR: {
    nativeName: 'العربية',
    dir: 'rtl',
    distribution: 'Distribution',
    trading: 'Trading',
    development: 'Development',
    scrollDown: 'مرر للأسفل',
    domesticRetail: 'التوزيع المحلي',
    importExport: 'الاستيراد والتصدير',
    oemOdm: 'OEM / ODM',
    partners: 'Partners',
    hariboExclusive: 'هاريبو كاندل حصري آسيا',
    whyBrandStone: 'لماذا PopScent؟',
    whySubtitle: 'شريكك الشامل لأعمال العطور المنزلية',
    why1Title: 'حقوق حصرية',
    why1Desc: 'شريك رسمي لـ Haribo Candle، Yankee Candle، WoodWick و TOMAMON',
    why2Title: 'خدمات OEM/ODM',
    why2Desc: 'تطوير منتجات مخصصة مع مصنعين ألمان',
    why3Title: 'شبكة عالمية',
    why3Desc: 'تصدير إلى 9+ دول تشمل اليابان وتايوان والصين وجنوب شرق آسيا',
    why4Title: 'قنوات متعددة',
    why4Desc: 'Coupang، Naver، متاجر، Olive Young وقنوات B2B',
    revenue2024: 'إيرادات 2024',
    yoyGrowth: 'نمو 10 أضعاف',
    countries: 'دول التصدير',
    globalBrands: 'شركاء عالميون',
    ownBrands: 'العلامات الخاصة',
    clients: 'عملاء B2B',
    contact: 'اتصل',
    getInTouch: 'تواصل معنا',
    callNow: 'اتصل الآن',
    companyName: 'Brand Stone Co., Ltd.',
    businessArea: 'العطور المنزلية / التوزيع / OEM, ODM',
    ceoTitle: 'الرئيس التنفيذي',
    address: '(06083) V202, 6F, 602, Yeongdong-daero, Gangnam-gu, سيول، كوريا',
    addressEn: '(06083) V202, 6F, 602, Yeongdong-daero, Gangnam-gu, Seoul, Korea',
    copyright: '© 2023 Brand Stone Co., Ltd.',
    chatGreeting: 'مرحباً! أنا مدير المبيعات الذكي في Brand Stone. 😊\n\nلا تتردد في السؤال عن OEM/ODM أو الاستيراد/التصدير أو التوزيع!',
    chatPlaceholder: 'اكتب رسالة...',
    chatError: 'حدث خطأ.'
  }
}

const app = new Hono<{ Bindings: Bindings }>()

app.use('/api/*', cors())
app.use(renderer)

// Health check
app.get('/api/health', (c) => {
  return c.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// Get translations for a language
app.get('/api/translations/:lang', (c) => {
  const lang = c.req.param('lang').toUpperCase() as LanguageCode
  if (TRANSLATIONS[lang]) {
    return c.json({ success: true, translations: TRANSLATIONS[lang] })
  }
  return c.json({ success: false, error: 'Language not found' }, 404)
})

// Get all available languages
app.get('/api/languages', (c) => {
  const languages = LANGUAGE_ORDER.map(code => ({
    code,
    nativeName: TRANSLATIONS[code].nativeName,
    dir: TRANSLATIONS[code].dir
  }))
  return c.json({ success: true, languages })
})

// OpenAI Translation API - for dynamic content
app.post('/api/translate', async (c) => {
  const { text, targetLang } = await c.req.json<{ text: string; targetLang: string }>()
  const apiKey = c.env?.OPENAI_API_KEY || ''
  
  if (!text || !targetLang) {
    return c.json({ success: false, error: 'Missing text or targetLang' }, 400)
  }
  
  // Get full language name
  const langNames: Record<string, string> = {
    EN: 'English', KO: 'Korean', JA: 'Japanese', 
    ZH_CN: 'Simplified Chinese', ZH_TW: 'Traditional Chinese',
    DE: 'German', FR: 'French', IT: 'Italian', RU: 'Russian', AR: 'Arabic'
  }
  const targetLangName = langNames[targetLang.toUpperCase()] || targetLang
  
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { 
            role: 'system', 
            content: `You are a professional translator. Translate the following text to ${targetLangName}. Return ONLY the translated text, nothing else. Preserve any formatting, emojis, and line breaks.`
          },
          { role: 'user', content: text }
        ],
        temperature: 0.3,
        max_tokens: 1024
      })
    })
    
    const data = await response.json() as any
    const translated = data.choices?.[0]?.message?.content || text
    
    return c.json({ success: true, translated, from: 'auto', to: targetLang })
  } catch (error) {
    console.error('Translation error:', error)
    return c.json({ success: false, error: 'Translation failed', original: text }, 500)
  }
})

// ============================================
// PopScent AI 상담사 마스터 시스템 프롬프트
// ============================================
const MASTER_SYSTEM_PROMPT = `
[System Role: PopScent AI 상담사]

1. 핵심 정체성:
당신은 단순한 CS 봇이 아닙니다. 당신은 PopScent의 **'향기 전문 컨설턴트'**이자 고객의 라이프스타일을 향기로 디자인하는 **'공감 능력이 뛰어난 파트너'**입니다.
- 이름: PopScent AI 상담사
- 브랜드 슬로건: "Design Your Air"
- 목표: 고객에게 최적의 향기 솔루션을 제안하고 비즈니스 파트너십으로 연결

2. 브랜드 정보 (Knowledge Base):
[브랜드 개요]
- 브랜드명: PopScent (팝센트)
- 슬로건: Design Your Air
- 운영사: 주식회사 브랜드스톤 (Brand Stone Co., Ltd.)
- 설립: 2023년 8월 17일
- 대표: 양종억
- 도메인: popscent.kr
- 사업영역: 프리미엄 홈프래그런스 (캔들, 디퓨저, 차량용/실내용 방향제)
- 매출: 2024년 12.9억원 (전년 대비 10배 성장)

[PopScent 제품 라인업]
- 캔들: 프리미엄 소이캔들, 향초
- 디퓨저: 리드디퓨저, 룸 스프레이
- 차량용: 차량용 방향제 (통풍구형, 거치형)
- 실내용: 실내 방향제, 섬유탈취제

[3대 사업 영역]
A. Distribution (국내 유통)
- 온라인: 쿠팡 로켓배송, 네이버 스마트스토어, 토스커머스
- 오프라인: GS25, CU, 세븐일레븐, 올리브영, 스타필드

B. Global Trading (해외 수출)
- 수출국: 일본, 대만, 중국, 싱가포르, 홍콩, 베트남, 태국 등 9개국+
- 핵심: 하리보캔들 아시아 독점 총판권

C. Development (OEM/ODM)
- 독일 제조사 파트너십
- 맞춤형 제품 개발 (향, 패키지, 용량)

[파트너 브랜드]
- Yankee Candle: 한국 공식 유통 파트너
- WoodWick: 우드윅 라이선스 디퓨저
- Haribo Candle: 아시아 독점 총판
- Candle Warmers, Millefiori

[연락처]
- 웹사이트: popscent.kr
- 이메일: jongeok.yang@brandstone.co.kr
- 전화: +82 02 523 7054

3. 심리적 영업 알고리즘 (5단계):
[1단계 - 공감 (Empathy)]
- 고객의 질문에 담긴 감정을 읽고 먼저 공감하라
- 예: "급하게 성과가 필요한 상황이시군요.", "그 부분에서 많이 고민되셨을 것 같습니다."
- 불만이나 어려움 토로 시 해결책 전 반드시 공감 문구 사용

[2단계 - 진단 (Diagnosis)]  
- 질문의 근본 원인을 파악하여 전문가적 소견 제시
- 예: "말씀하신 내용으로 보아, OEM 제작보다는 소량 수입이 더 적합하실 수 있습니다."

[3단계 - 해결 (Solution)]
- 브랜드스톤의 서비스가 어떻게 문제를 해결하는지 구체적으로 설명
- 데이터와 실적을 근거로 제시 (매출 10배 성장, 9개국 수출 등)

[4단계 - 안심 (Reassurance)]
- 확신 있는 어조로 심리적 안정감 제공
- "처음이라 막막하시죠? 제가 세팅부터 운영까지 가이드가 되어 드릴 테니 걱정 마세요."
- "저희가 24시간 옆에서 도울 테니 안심하셔도 됩니다."

[5단계 - 클로징 (Closing)]
- 답변 마지막에는 항상 다음 행동을 유도하는 역질문
- 예: "이 부분에 대해 더 자세히 안내드릴까요?", "현재 계획하시는 물량이나 일정이 있으신가요?"

4. 분야별 전문 대응:
[OEM/ODM 문의]
- 공감: "맞춤 제작, 많이 고민되시죠? 처음엔 누구나 막막합니다."
- 전문성: 독일 제조 파트너십, 최소 발주량(MOQ), 리드타임 안내
- 클로징: "어떤 제품군을 생각하고 계신가요? 향 종류나 용기 디자인 방향이 있으시면 더 정확한 견적을 드릴 수 있습니다."

[수출입/해외 진출 문의]
- 공감: "해외 시장 진출, 기대되면서도 걱정이 많으시죠."
- 전문성: 9개국 수출 실적, 하리보캔들 아시아 총판권, 통관/물류 노하우
- 클로징: "관심 있으신 국가나 타겟 채널이 있으신가요?"

[유통/입점 문의]
- 공감: "판로 확보가 사업의 핵심이죠. 충분히 이해합니다."
- 전문성: 쿠팡/네이버/토스/편의점/올리브영 입점 경험
- 클로징: "현재 어떤 채널을 우선적으로 생각하고 계신가요?"

[가격/비용 문의]
- 안심: "비용이 부담되시는 건 당연합니다. 저라도 같은 고민을 했을 거예요."
- 가치 제안: "하지만 저희 서비스로 놓칠 뻔한 기회를 잡으신다면, 이건 지출이 아니라 투자입니다."
- 클로징: "우선 대략적인 물량과 일정을 알려주시면 맞춤 견적을 준비해 드리겠습니다."

5. 응답 원칙:
- 한국어로 자연스럽고 따뜻하게 응답
- 단답형 금지: 항상 공감 + 정보 + 역질문 구조
- 모르는 내용은 지어내지 말고 "확인 후 정확한 안내 드리겠습니다"
- 이메일 안내 시 용도에 맞는 주소 제공 (일반/영업/수출입)
- 전문 용어는 쉽게 풀어서 설명

6. 🌟 브랜드스톤을 선택해야 하는 4가지 핵심 이유 (WHY BRAND STONE?):

[1. 독점권 보유 (Exclusive Rights)]
- 하리보캔들 아시아 독점 총판권: 독일 Fragrance Style GmbH와 공식 계약
- 양키캔들 한국 공식 유통 파트너: 스튜디오콜렉션 국내 최초 출시
- WoodWick 라이선스 디퓨저 유통권
→ "저희만의 독점 라인업, 이건 경쟁사가 따라올 수 없는 진입장벽입니다."

[2. OEM/ODM 즉시 대응 (OEM/ODM Ready)]
- 독일 제조사와 직접 파트너십 체결
- 리드디퓨저, 차량용/실내용 방향제, 테이블매트까지 풀라인업
- 2025년 5월 독일 리드디퓨저 OEM 프로젝트 진행 중
- 자체 브랜드(PopScent, Scentrary, Clean O' Bro)로 검증된 개발력
→ "아이디어만 있으시면 됩니다. 개발부터 생산까지 저희가 책임집니다."

[3. 글로벌 네트워크 (Global Network)]
- 일본, 대만, 중국, 싱가포르, 홍콩, 베트남, 태국, 필리핀, 인도네시아 (9개국+)
- 해외 통관/물류/현지 마케팅 노하우 축적
- 동남아 시장 적극 확장 중
→ "이미 검증된 해외 네트워크로 귀사의 글로벌 진출을 함께 합니다."

[4. 멀티채널 유통망 (Multi-Channel)]
- 온라인: 쿠팡 로켓배송, 네이버 스마트스토어, 토스커머스
- 오프라인: GS25, CU, 세븐일레븐, 올리브영, 스타필드
- B2B: 보험사, 대학교, 기업복지몰 특판
→ "어떤 채널이든 경험이 있습니다. 귀사에 맞는 최적 채널을 함께 찾아드립니다."

7. 킬러 문구 (자연스럽게 활용):
- "저희는 단순 판매가 아니라 파트너십을 제안드립니다."
- "2024년 매출 10배 성장의 비결은 고객과의 신뢰였습니다."
- "하리보캔들 아시아 총판권, 이건 저희만의 경쟁력입니다."
- "처음이시라면 오히려 저희가 더 세심하게 챙겨드립니다."
- "브랜드스톤은 수입, 개발, 유통, 수출까지 원스톱 솔루션을 제공합니다."
- "저희와 함께라면 홈프래그런스 비즈니스의 모든 퍼즐이 맞춰집니다."
`

// Gemini Chat API
app.post('/api/chat', async (c) => {
  const { message } = await c.req.json<{ message: string }>()
  const apiKey = c.env?.GEMINI_API_KEY || ''
  
  if (!apiKey) {
    return c.json({ response: getSmartFallbackResponse(message) })
  }
  
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ role: 'user', parts: [{ text: message }] }],
          systemInstruction: { parts: [{ text: MASTER_SYSTEM_PROMPT }] },
          generationConfig: { 
            temperature: 0.8,
            maxOutputTokens: 1024,
            topP: 0.95
          }
        })
      }
    )

    const data = await response.json() as any
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || '죄송합니다. 잠시 후 다시 시도해 주세요.'
    return c.json({ response: reply })
  } catch {
    return c.json({ response: getSmartFallbackResponse(message) })
  }
})

// 스마트 폴백 응답 (API 키 없을 때도 영업사원처럼)
function getSmartFallbackResponse(message: string): string {
  const m = message.toLowerCase()
  
  // OEM/ODM 관련
  if (m.includes('oem') || m.includes('odm') || m.includes('제조') || m.includes('맞춤') || m.includes('개발')) {
    return `맞춤 제작에 관심 가져주셔서 감사합니다! 😊

저희 브랜드스톤은 독일 제조사 파트너와 협력하여 리드디퓨저, 차량용 방향제, 실내용 방향제 등 다양한 OEM/ODM 제작을 진행하고 있습니다.

2025년 5월부터 독일 리드디퓨저 OEM 프로젝트도 시작했어요.

혹시 어떤 제품군을 생각하고 계신가요? 향 종류나 용기 디자인 방향이 있으시면 더 정확한 견적을 드릴 수 있습니다.

📧 상세 문의: jongeok.yang@brandstone.co.kr`
  }
  
  // 가격 관련
  if (m.includes('가격') || m.includes('비용') || m.includes('견적') || m.includes('얼마')) {
    return `비용이 궁금하시군요! 충분히 이해합니다. 😊

가격은 제품 종류, 수량, 제작 방식에 따라 달라지는데요.

저희는 소량부터 대량까지 유연하게 대응 가능하고, 무엇보다 품질 대비 경쟁력 있는 가격을 자신합니다.

대략적인 물량과 일정을 알려주시면 맞춤 견적을 준비해 드릴게요!

어떤 제품에 관심 있으신가요?

📧 견적 문의: jongeok.yang@brandstone.co.kr`
  }
  
  // 수출입/해외
  if (m.includes('수출') || m.includes('수입') || m.includes('해외') || m.includes('글로벌') || m.includes('trading') || m.includes('무역')) {
    return `해외 시장에 관심 가져주셔서 감사합니다! 🌏

저희 브랜드스톤은 현재 일본, 대만, 중국, 싱가포르, 홍콩, 베트남, 태국, 필리핀, 인도네시아 등 9개국 이상에 수출하고 있어요.

특히 하리보캔들 아시아 독점 총판권을 보유하고 있어서, 해외 진출 시 강력한 경쟁력이 됩니다.

관심 있으신 국가나 타겟 채널이 있으신가요?

📧 수출입 문의: jongeok.yang@brandstone.co.kr`
  }
  
  // 유통/입점
  if (m.includes('유통') || m.includes('입점') || m.includes('판매') || m.includes('채널') || m.includes('쿠팡') || m.includes('네이버')) {
    return `유통 채널에 관심 가져주셨군요! 👍

저희는 현재 다양한 채널에서 운영 중입니다:
• 온라인: 쿠팡 로켓배송, 네이버, 토스커머스
• 오프라인: 편의점(GS25, CU), 올리브영, 스타필드
• B2B: 기업복지몰, 보험사, 대학교 등

2024년 매출 10배 성장의 비결은 다채널 전략이었어요.

현재 어떤 채널을 우선적으로 생각하고 계신가요?

📧 유통 문의: jongeok.yang@brandstone.co.kr`
  }
  
  // 하리보캔들
  if (m.includes('하리보') || m.includes('haribo')) {
    return `하리보캔들에 관심 가져주셔서 감사합니다! 🍬

저희 브랜드스톤은 하리보캔들의 아시아 독점 총판입니다.
독일 Fragrance Style GmbH와 직접 계약했어요.

현재 일본, 대만, 중국으로 활발히 수출 중이고, 동남아 시장도 확대하고 있습니다.

하리보캔들 관련해서 어떤 부분이 궁금하신가요? 수입, 유통, 아니면 해외 판매권?

📧 문의: jongeok.yang@brandstone.co.kr`
  }
  
  // 양키캔들
  if (m.includes('양키') || m.includes('yankee')) {
    return `양키캔들에 관심 가져주셔서 감사합니다! 🕯️

저희 브랜드스톤은 양키캔들 한국 공식 유통 파트너입니다.

2024년 1월, 스튜디오콜렉션을 국내 최초로 출시했고, 차량용 방향제 5종도 운영 중이에요.

양키캔들 관련해서 어떤 부분을 알고 싶으신가요?

📧 문의: jongeok.yang@brandstone.co.kr`
  }
  
  // 인사/첫 대화
  if (m.includes('안녕') || m.includes('hello') || m.includes('hi') || m.includes('처음')) {
    return `안녕하세요! 팝센트 AI 상담사입니다. 😊

저희는 홈프래그런스 전문 기업으로, 수입/유통/OEM 제조까지 원스톱으로 도와드립니다.

• 양키캔들, 하리보캔들 공식 파트너
• 2024년 매출 12.9억 (전년 대비 10배 성장)
• 9개국 이상 수출 실적

오늘 어떤 부분에서 도움이 필요하신가요?
OEM/ODM, 해외 수출입, 국내 유통 중 관심 있는 분야가 있으시면 말씀해 주세요!`
  }
  
  // 회사 정보
  if (m.includes('회사') || m.includes('브랜드스톤') || m.includes('소개') || m.includes('뭐하는')) {
    return `브랜드스톤을 소개해 드릴게요! 🏢

저희는 2023년 8월 설립된 홈프래그런스 전문 기업입니다.

[핵심 경쟁력]
• 양키캔들, 우드윅, 하리보캔들 공식 파트너
• 하리보캔들 아시아 독점 총판권
• 자체 브랜드: PopScent, Scentrary, Clean O' Bro
• 2024년 매출 12.9억원 (전년 대비 10배 성장!)
• 9개국 이상 글로벌 수출

[3대 사업영역]
1️⃣ Distribution - 국내 온/오프라인 유통
2️⃣ Global Trading - 해외 수출입
3️⃣ Development - OEM/ODM 맞춤 제작

어떤 분야에 관심이 있으신가요?`
  }
  
  // 기본 응답 (PopScent 스타일)
  return `문의 감사합니다! 😊

PopScent는 "Design Your Air" 철학으로 프리미엄 홈프래그런스를 제공합니다.

어떤 부분에서 도움이 필요하신가요?

🕯️ 캔들 & 디퓨저 제품
🚗 차량용/실내용 방향제
🏭 OEM/ODM 맞춤 제작
🌏 해외 수출입 파트너십

편하게 물어보세요!

📧 jongeok.yang@brandstone.co.kr | 📞 +82 02 523 7054`
}

// Main Page - Toss Style Ultra Minimal
app.get('/', (c) => {
  return c.render(
    <>
      {/* Navigation - Light Background */}
      <nav class="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div class="max-w-7xl mx-auto px-4 md:px-8 h-14 md:h-20 flex items-center justify-between">
          <a href="#" class="flex items-center gap-2">
            <div class="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-sky-400 to-sky-600 rounded-lg flex items-center justify-center">
              <span class="text-white font-bold text-sm md:text-lg">P</span>
            </div>
            <span class="text-lg md:text-2xl font-bold tracking-tight text-gray-900">PopScent</span>
          </a>
          <div class="flex items-center gap-3 md:gap-6">
            <div class="hidden md:flex items-center gap-8">
              <a href="#distribution" class="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">Distribution</a>
              <a href="#trading" class="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">Trading</a>
              <a href="#development" class="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">Development</a>
            </div>
            {/* Language Dropdown */}
            <div class="relative">
              <button id="langToggle" onclick="toggleLangDropdown()" class="text-xs md:text-sm font-medium px-3 md:px-4 py-1.5 md:py-2 rounded-full border border-gray-200 text-gray-700 hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-all flex items-center gap-1">
                <span id="currentLangName">EN</span>
                <i class="fas fa-chevron-down text-[10px]"></i>
              </button>
              <div id="langDropdown" class="hidden absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50 max-h-80 overflow-y-auto">
                <button onclick="setLanguage('EN')" class="lang-option w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex justify-between items-center" data-lang="EN">
                  <span>English</span>
                  <span class="text-gray-400 text-xs">EN</span>
                </button>
                <button onclick="setLanguage('KO')" class="lang-option w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex justify-between items-center" data-lang="KO">
                  <span>한국어</span>
                  <span class="text-gray-400 text-xs">KO</span>
                </button>
                <button onclick="setLanguage('JA')" class="lang-option w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex justify-between items-center" data-lang="JA">
                  <span>日本語</span>
                  <span class="text-gray-400 text-xs">JA</span>
                </button>
                <button onclick="setLanguage('ZH_CN')" class="lang-option w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex justify-between items-center" data-lang="ZH_CN">
                  <span>简体中文</span>
                  <span class="text-gray-400 text-xs">CN</span>
                </button>
                <button onclick="setLanguage('ZH_TW')" class="lang-option w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex justify-between items-center" data-lang="ZH_TW">
                  <span>繁體中文</span>
                  <span class="text-gray-400 text-xs">TW</span>
                </button>
                <button onclick="setLanguage('DE')" class="lang-option w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex justify-between items-center" data-lang="DE">
                  <span>Deutsch</span>
                  <span class="text-gray-400 text-xs">DE</span>
                </button>
                <button onclick="setLanguage('FR')" class="lang-option w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex justify-between items-center" data-lang="FR">
                  <span>Français</span>
                  <span class="text-gray-400 text-xs">FR</span>
                </button>
                <button onclick="setLanguage('IT')" class="lang-option w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex justify-between items-center" data-lang="IT">
                  <span>Italiano</span>
                  <span class="text-gray-400 text-xs">IT</span>
                </button>
                <button onclick="setLanguage('RU')" class="lang-option w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex justify-between items-center" data-lang="RU">
                  <span>Русский</span>
                  <span class="text-gray-400 text-xs">RU</span>
                </button>
                <button onclick="setLanguage('AR')" class="lang-option w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex justify-between items-center" data-lang="AR">
                  <span>العربية</span>
                  <span class="text-gray-400 text-xs">AR</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Section 1: Hero - PopScent Brand Hero */}
      <section class="fullscreen-hero">
        <video 
          id="heroVideo"
          class="fullscreen-video" 
          autoplay 
          muted 
          loop 
          playsinline
          preload="auto"
          poster="/hero-poster.jpg"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
        
        {/* Taglines Only - No Logo */}
        <div class="absolute inset-0 flex flex-col items-center justify-center z-10">
          <p class="text-xl md:text-3xl lg:text-4xl text-gray-800 font-light tracking-widest">
            Design Your Air
          </p>
          <p class="mt-4 md:mt-6 text-sm md:text-base text-gray-600 font-light">
            Premium Home Fragrance Brand
          </p>
        </div>
        
        {/* Scroll Down */}
        <div class="scroll-indicator-simple">
          <i class="fas fa-chevron-down"></i>
        </div>
      </section>

      {/* Section 2: Distribution */}
      <section id="distribution" class="min-h-screen flex items-center justify-center bg-[#fafafa] py-16 md:py-0">
        <div class="max-w-7xl mx-auto px-4 md:px-8 w-full grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
          <div class="text-center md:text-left">
            <p class="text-sm font-medium text-gray-300 mb-2 md:mb-4">01</p>
            <h2 class="text-3xl md:text-5xl lg:text-7xl font-bold tracking-tight mb-2 md:mb-4">
              Distribution
            </h2>
            <p class="text-base md:text-xl text-gray-400 lang-text" data-key="domesticRetail">
              Domestic Retail
            </p>
          </div>
          <div class="flex justify-center mt-4 md:mt-0">
            <div class="distribution-visual">
              <div class="dist-box"></div>
              <div class="dist-box"></div>
              <div class="dist-box"></div>
              <div class="dist-belt"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Trading */}
      <section id="trading" class="min-h-screen flex items-center justify-center bg-black text-white py-16 md:py-0">
        <div class="max-w-7xl mx-auto px-4 md:px-8 w-full grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
          <div class="order-2 md:order-1 flex justify-center">
            <div class="trading-visual">
              <div class="globe-outer">
                <div class="globe-inner"></div>
              </div>
              <div class="trade-pulse"></div>
              <div class="trade-pulse delay-1"></div>
              <div class="trade-pulse delay-2"></div>
            </div>
          </div>
          <div class="order-1 md:order-2 text-center md:text-left">
            <p class="text-sm font-medium text-gray-600 mb-2 md:mb-4">02</p>
            <h2 class="text-3xl md:text-5xl lg:text-7xl font-bold tracking-tight mb-2 md:mb-4">
              Global<br />Trading
            </h2>
            <p class="text-base md:text-xl text-gray-500 lang-text" data-key="importExport">
              Import & Export
            </p>
          </div>
        </div>
      </section>

      {/* Section 4: Development */}
      <section id="development" class="min-h-screen flex items-center justify-center bg-white py-16 md:py-0">
        <div class="max-w-7xl mx-auto px-4 md:px-8 w-full grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
          <div class="text-center md:text-left">
            <p class="text-sm font-medium text-gray-300 mb-2 md:mb-4">03</p>
            <h2 class="text-3xl md:text-5xl lg:text-7xl font-bold tracking-tight mb-2 md:mb-4">
              Development
            </h2>
            <p class="text-base md:text-xl text-gray-400 lang-text" data-key="oemOdm">
              OEM / ODM
            </p>
          </div>
          <div class="flex justify-center mt-4 md:mt-0">
            <div class="dev-visual">
              <div class="dev-particle"></div>
              <div class="dev-particle"></div>
              <div class="dev-particle"></div>
              <div class="dev-particle"></div>
              <div class="dev-center"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Partners - Ultra Simple */}
      <section class="min-h-screen flex items-center justify-center bg-[#f8f8f8] py-16 md:py-0">
        <div class="text-center px-4 md:px-8">
          <h2 class="text-3xl md:text-5xl lg:text-7xl font-bold tracking-tight mb-10 md:mb-20 text-gray-800">
            Partners
          </h2>
          <div class="flex flex-wrap justify-center gap-4 md:gap-8 lg:gap-12">
            <div class="w-20 h-20 md:w-28 md:h-28 bg-gray-900 rounded-full flex items-center justify-center shadow-lg">
              <span class="text-white text-[8px] md:text-[10px] font-bold text-center leading-tight">YANKEE<br />CANDLE</span>
            </div>
            <div class="w-20 h-20 md:w-28 md:h-28 bg-amber-800 rounded-full flex items-center justify-center shadow-lg">
              <span class="text-white text-[8px] md:text-[10px] font-bold text-center leading-tight">WOOD<br />WICK</span>
            </div>
            <div class="w-20 h-20 md:w-28 md:h-28 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
              <span class="text-gray-900 text-[8px] md:text-[10px] font-bold text-center leading-tight">HARIBO<br />CANDLE</span>
            </div>
            <div class="w-20 h-20 md:w-28 md:h-28 bg-gray-500 rounded-full flex items-center justify-center shadow-lg">
              <span class="text-white text-[8px] md:text-[10px] font-bold text-center leading-tight">CANDLE<br />WARMERS</span>
            </div>
            <div class="w-20 h-20 md:w-28 md:h-28 bg-pink-400 rounded-full flex items-center justify-center shadow-lg">
              <span class="text-white text-[8px] md:text-[10px] font-bold text-center leading-tight">TOMAMON</span>
            </div>
          </div>

        </div>
      </section>

      {/* Section 6: Why PopScent - Value Proposition */}
      <section class="py-20 md:py-32 bg-[#fafafa]">
        <div class="max-w-6xl mx-auto px-4 md:px-8">
          <div class="text-center mb-12 md:mb-20">
            <h2 class="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 text-gray-800 lang-text" data-key="whyBrandStone">
              Why PopScent?
            </h2>
            <p class="text-base md:text-xl text-gray-400 lang-text" data-key="whySubtitle">
              Your One-Stop Partner for Home Fragrance Business
            </p>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {/* Card 1: Exclusive Rights - Soft Gray */}
            <div class="group p-6 md:p-8 bg-white rounded-2xl border border-gray-200 hover:border-gray-400 hover:shadow-lg transition-all duration-300">
              <div class="w-12 h-12 md:w-14 md:h-14 bg-gray-800 rounded-xl flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform">
                <i class="fas fa-crown text-white text-xl md:text-2xl"></i>
              </div>
              <h3 class="text-lg md:text-xl font-bold mb-2 md:mb-3 text-gray-800 lang-text" data-key="why1Title">Exclusive Rights</h3>
              <p class="text-sm md:text-base text-gray-500 leading-relaxed lang-text" data-key="why1Desc">
                Haribo Candle Asia exclusive distributor with direct partnerships with Yankee Candle & WoodWick
              </p>
            </div>
            
            {/* Card 2: OEM/ODM - Soft Gray */}
            <div class="group p-6 md:p-8 bg-white rounded-2xl border border-gray-200 hover:border-gray-400 hover:shadow-lg transition-all duration-300">
              <div class="w-12 h-12 md:w-14 md:h-14 bg-gray-700 rounded-xl flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform">
                <i class="fas fa-flask text-white text-xl md:text-2xl"></i>
              </div>
              <h3 class="text-lg md:text-xl font-bold mb-2 md:mb-3 text-gray-800 lang-text" data-key="why2Title">OEM/ODM Ready</h3>
              <p class="text-sm md:text-base text-gray-500 leading-relaxed lang-text" data-key="why2Desc">
                Custom product development with German manufacturers for reed diffusers, car & room fragrances
              </p>
            </div>
            
            {/* Card 3: Global Network - Soft Gray */}
            <div class="group p-6 md:p-8 bg-white rounded-2xl border border-gray-200 hover:border-gray-400 hover:shadow-lg transition-all duration-300">
              <div class="w-12 h-12 md:w-14 md:h-14 bg-gray-600 rounded-xl flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform">
                <i class="fas fa-globe-asia text-white text-xl md:text-2xl"></i>
              </div>
              <h3 class="text-lg md:text-xl font-bold mb-2 md:mb-3 text-gray-800 lang-text" data-key="why3Title">Global Network</h3>
              <p class="text-sm md:text-base text-gray-500 leading-relaxed lang-text" data-key="why3Desc">
                Active exports to 9+ countries including Japan, Taiwan, China, and Southeast Asia
              </p>
            </div>
            
            {/* Card 4: Multi-Channel - Soft Gray */}
            <div class="group p-6 md:p-8 bg-white rounded-2xl border border-gray-200 hover:border-gray-400 hover:shadow-lg transition-all duration-300">
              <div class="w-12 h-12 md:w-14 md:h-14 bg-gray-500 rounded-xl flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform">
                <i class="fas fa-store text-white text-xl md:text-2xl"></i>
              </div>
              <h3 class="text-lg md:text-xl font-bold mb-2 md:mb-3 text-gray-800 lang-text" data-key="why4Title">Multi-Channel</h3>
              <p class="text-sm md:text-base text-gray-500 leading-relaxed lang-text" data-key="why4Desc">
                Coupang, Naver, convenience stores, Olive Young, and B2B corporate channels
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 7: Numbers - Big Impact - Soft Black & White */}
      <section class="min-h-screen flex items-center justify-center bg-gray-900 text-white py-16 md:py-0">
        <div class="text-center px-4 md:px-8">
          {/* 10x Growth - Main Highlight */}
          <p class="text-5xl md:text-[8rem] lg:text-[10rem] font-bold leading-none tracking-tighter">
            10<span class="text-gray-400">x</span>
          </p>
          <p class="text-xl md:text-3xl text-gray-400 mt-2 md:mt-4 lang-text" data-key="yoyGrowth">
            Year-over-Year Growth
          </p>
          <p class="text-sm md:text-base text-gray-500 mt-2">
            2023 → 2024
          </p>
          
          {/* Key Metrics */}
          <div class="flex flex-wrap justify-center gap-8 md:gap-16 lg:gap-20 mt-12 md:mt-20">
            <div class="text-center">
              <p class="text-3xl md:text-5xl lg:text-6xl font-bold text-white">9<span class="text-gray-500">+</span></p>
              <p class="text-gray-400 text-sm md:text-base mt-2 lang-text" data-key="countries">Export Countries</p>
            </div>
            <div class="text-center">
              <p class="text-3xl md:text-5xl lg:text-6xl font-bold text-white">5</p>
              <p class="text-gray-400 text-sm md:text-base mt-2 lang-text" data-key="globalBrands">Global Partners</p>
            </div>
            <div class="text-center">
              <p class="text-3xl md:text-5xl lg:text-6xl font-bold text-white">3</p>
              <p class="text-gray-400 text-sm md:text-base mt-2 lang-text" data-key="ownBrands">Own Brands</p>
            </div>
            <div class="text-center">
              <p class="text-3xl md:text-5xl lg:text-6xl font-bold text-white">100<span class="text-gray-500">+</span></p>
              <p class="text-gray-400 text-sm md:text-base mt-2 lang-text" data-key="clients">B2B Clients</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 7: Contact - With Real Info */}
      <section id="contact" class="min-h-screen flex items-center justify-center bg-white py-16 md:py-0">
        <div class="text-center px-4 md:px-8">
          <h2 class="text-3xl md:text-5xl lg:text-7xl font-bold tracking-tight mb-4 md:mb-6 lang-text" data-key="contact">
            Contact
          </h2>
          <div class="mb-6 md:mb-10">
            <p class="text-lg md:text-2xl lg:text-3xl text-gray-800 mb-2">+82 02 523 7054</p>
            <p class="text-sm md:text-xl text-gray-400 break-all md:break-normal">jongeok.yang@brandstone.co.kr</p>
          </div>
          <div class="flex flex-col sm:flex-row justify-center gap-3 md:gap-4">
            <a href="tel:+82-02-523-7054" class="inline-block px-6 md:px-12 py-3 md:py-4 bg-black text-white text-sm md:text-lg font-medium rounded-full hover:bg-gray-800 transition-colors">
              <i class="fas fa-phone mr-2"></i><span class="lang-text" data-key="callNow">Call</span>
            </a>
            <a href="mailto:jongeok.yang@brandstone.co.kr" class="inline-block px-6 md:px-12 py-3 md:py-4 bg-blue-500 text-white text-sm md:text-lg font-medium rounded-full hover:bg-blue-600 transition-colors">
              <i class="fas fa-envelope mr-2"></i><span class="lang-text" data-key="getInTouch">Get in Touch</span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer - PopScent by Brand Stone */}
      <footer class="py-10 md:py-16 bg-gradient-to-b from-sky-900 to-sky-950 text-white">
        <div class="max-w-7xl mx-auto px-4 md:px-8">
          {/* PopScent Logo and Tagline */}
          <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 md:gap-8 mb-8">
            <div>
              <div class="flex items-center gap-3 mb-2">
                <div class="w-12 h-12 bg-gradient-to-br from-sky-400 to-sky-600 rounded-xl flex items-center justify-center">
                  <span class="text-white font-bold text-xl">P</span>
                </div>
                <div>
                  <p class="text-2xl md:text-3xl font-bold tracking-tight">PopScent</p>
                  <p class="text-xs text-sky-300">Design Your Air</p>
                </div>
              </div>
              <p class="text-sm text-sky-200/60 mt-2">Premium Home Fragrance Brand</p>
            </div>
            <div class="text-right">
              <p class="text-sm text-sky-200/80 mb-1">Operated by</p>
              <p class="text-lg font-semibold">Brand Stone Co., Ltd.</p>
              <p class="text-xs text-sky-300/60">(주) 브랜드스톤</p>
            </div>
          </div>
          
          {/* Contact Info */}
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 py-6 border-t border-b border-sky-700/50">
            <div>
              <p class="text-sky-300 text-xs mb-2 uppercase tracking-wider">Contact</p>
              <p class="mb-1"><span class="text-sky-400">T:</span> +82 02 523 7054</p>
              <p class="mb-1"><span class="text-sky-400">M:</span> +82 10 9241 2684</p>
              <p><span class="text-sky-400">E:</span> jongeok.yang@brandstone.co.kr</p>
            </div>
            <div>
              <p class="text-sky-300 text-xs mb-2 uppercase tracking-wider">Address</p>
              <p class="text-sm text-sky-100/80">(06083) 서울시 강남구 영동대로 602,</p>
              <p class="text-sm text-sky-100/80">6층 V202호 (삼성동 미켈란107)</p>
            </div>
            <div>
              <p class="text-sky-300 text-xs mb-2 uppercase tracking-wider">Business</p>
              <p class="text-sm text-sky-100/80">Home Fragrance</p>
              <p class="text-sm text-sky-100/80">Distribution / OEM / ODM</p>
            </div>
          </div>
          
          {/* Copyright */}
          <div class="flex flex-col md:flex-row justify-between items-center gap-2 text-xs text-sky-300/60">
            <p>© 2023 PopScent by Brand Stone Co., Ltd. All rights reserved.</p>
            <p>popscent.kr</p>
          </div>
        </div>
      </footer>

      {/* Chat Bubble - PopScent Sky Blue */}
      <div class="chat-bubble" onclick="toggleChat()" style="background: linear-gradient(135deg, #38bdf8, #0284c7);">
        <i class="fas fa-comment-dots text-white text-2xl"></i>
      </div>
      
      {/* Chat Window */}
      <div class="chat-window" id="chatWindow">
        <div class="chat-header" style="background: linear-gradient(135deg, #0ea5e9, #0369a1);">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <span class="text-white font-bold text-lg">P</span>
            </div>
            <div>
              <p class="font-bold text-sm text-white">PopScent AI</p>
              <p class="text-xs text-sky-200">24/7 Sales Assistant</p>
            </div>
          </div>
          <button onclick="toggleChat()" class="text-sky-200 hover:text-white">
            <i class="fas fa-times text-lg"></i>
          </button>
        </div>
        <div class="chat-messages" id="chatMessages">
          <div class="message bot">
            <span class="lang-text" data-key="chatGreeting">Hi! I'm PopScent's AI Sales Assistant. 😊

Feel free to ask about our fragrances, OEM/ODM, or partnership opportunities!</span>
          </div>
        </div>
        <div class="chat-input-area">
          <input type="text" class="chat-input" id="chatInput" placeholder="메시지 입력..." onkeypress="if(event.key==='Enter')sendMessage()" />
          <button class="chat-send" onclick="sendMessage()">
            <i class="fas fa-arrow-up"></i>
          </button>
        </div>
      </div>

      {/* Scripts */}
      {html`<script>
        // ============================================
        // 10개국 다국어 시스템
        // ============================================
        
        // 번역 데이터
        var TRANSLATIONS = {
          EN: {
            nativeName: 'English', dir: 'ltr',
            domesticRetail: 'Domestic Retail',
            importExport: 'Import & Export',
            oemOdm: 'OEM / ODM',
            hariboExclusive: 'Haribo Candle Asia Exclusive',
            whyBrandStone: 'Why Brand Stone?',
            whySubtitle: 'Your One-Stop Partner for Home Fragrance Business',
            why1Title: 'Exclusive Rights',
            why1Desc: 'Official partner of Haribo Candle, Yankee Candle, WoodWick, and TOMAMON',
            why2Title: 'OEM/ODM Ready',
            why2Desc: 'Custom product development with German manufacturers for reed diffusers, car & room fragrances',
            why3Title: 'Global Network',
            why3Desc: 'Active exports to 9+ countries including Japan, Taiwan, China, and Southeast Asia',
            why4Title: 'Multi-Channel',
            why4Desc: 'Coupang, Naver, convenience stores, Olive Young, and B2B corporate channels',
            revenue2024: '2024 Revenue',
            yoyGrowth: '10x YoY Growth',
            countries: 'Export Countries',
            globalBrands: 'Global Partners',
            ownBrands: 'Own Brands',
            clients: 'B2B Clients',
            contact: 'Contact',
            getInTouch: 'Get in Touch',
            callNow: 'Call',
            companyName: 'Brand Stone Co., Ltd.',
            businessArea: 'Home Fragrance / Distribution / OEM, ODM',
            ceoTitle: 'CEO',
            address: '(06083) V202, 6F, 602, Yeongdong-daero, Gangnam-gu, Seoul, Korea',
            addressEn: '(06083) V202, 6F, 602, Yeongdong-daero, Gangnam-gu, Seoul, Korea',
            copyright: '© 2023 Brand Stone Co., Ltd.',
            chatGreeting: "Hi! I'm PopScent's AI Sales Assistant. 😊\\n\\nFeel free to ask about our fragrances, OEM/ODM, or partnership opportunities!",
            chatPlaceholder: 'Type a message...',
            chatError: 'An error occurred.'
          },
          KO: {
            nativeName: '한국어', dir: 'ltr',
            domesticRetail: '국내 유통',
            importExport: '해외 수출입',
            oemOdm: 'OEM / ODM',
            hariboExclusive: '하리보캔들 아시아 총판',
            whyBrandStone: '왜 팝센트인가?',
            whySubtitle: '홈프래그런스 사업의 원스톱 파트너',
            why1Title: '독점권 보유',
            why1Desc: '하리보캔들, 양키캔들, 우드윅, 토마몬 공식 파트너',
            why2Title: 'OEM/ODM 가능',
            why2Desc: '독일 제조사와 협력한 리드디퓨저, 차량용·실내용 방향제 맞춤 개발',
            why3Title: '글로벌 네트워크',
            why3Desc: '일본, 대만, 중국, 동남아 등 9개국+ 수출 실적',
            why4Title: '다채널 유통',
            why4Desc: '쿠팡, 네이버, 편의점, 올리브영, B2B 기업 채널 운영',
            revenue2024: '2024 매출',
            yoyGrowth: '전년 대비 10배 성장',
            countries: '수출국',
            globalBrands: '글로벌 파트너',
            ownBrands: '자체 브랜드',
            clients: 'B2B 거래처',
            contact: 'Contact',
            getInTouch: '문의하기',
            callNow: '전화하기',
            companyName: '(주) 브랜드스톤',
            businessArea: '홈프래그런스 / 유통 / OEM, ODM',
            ceoTitle: '대표이사',
            address: '(06083) 서울시 강남구 영동대로 602, 6층 V202호 (삼성동 미켈란107)',
            addressEn: '(06083) V202, 6F, 602, Yeongdong-daero, Gangnam-gu, Seoul, Korea',
            copyright: '© 2023 주식회사 브랜드스톤',
            chatGreeting: '안녕하세요! 팝센트 AI 상담사입니다. 😊\\n\\n향기 제품, OEM/ODM, 파트너십 등 무엇이든 물어보세요!',
            chatPlaceholder: '메시지 입력...',
            chatError: '오류가 발생했습니다.'
          },
          JA: {
            nativeName: '日本語', dir: 'ltr',
            domesticRetail: '国内流通',
            importExport: '海外輸出入',
            oemOdm: 'OEM / ODM',
            hariboExclusive: 'ハリボーキャンドル アジア総代理店',
            whyBrandStone: 'なぜPopScent？',
            whySubtitle: 'ホームフレグランス事業のワンストップパートナー',
            why1Title: '独占権保有',
            why1Desc: 'ハリボーキャンドル、ヤンキーキャンドル、ウッドウィック、トマモン公式パートナー',
            why2Title: 'OEM/ODM対応',
            why2Desc: 'ドイツメーカーと連携したリードディフューザー、車載・室内芳香剤のカスタム開発',
            why3Title: 'グローバルネットワーク',
            why3Desc: '日本、台湾、中国、東南アジアなど9カ国以上への輸出実績',
            why4Title: 'マルチチャネル',
            why4Desc: 'クーパン、ネイバー、コンビニ、オリーブヤング、B2B企業チャネル運営',
            revenue2024: '2024年 売上',
            yoyGrowth: '前年比10倍成長',
            countries: '輸出国',
            globalBrands: 'グローバルパートナー',
            ownBrands: '自社ブランド',
            clients: 'B2B取引先',
            contact: 'Contact',
            getInTouch: 'お問い合わせ',
            callNow: '電話する',
            companyName: '株式会社ブランドストーン',
            businessArea: 'ホームフレグランス / 流通 / OEM, ODM',
            ceoTitle: '代表取締役',
            address: '(06083) ソウル市江南区永東大路602, 6階V202号',
            addressEn: '(06083) V202, 6F, 602, Yeongdong-daero, Gangnam-gu, Seoul, Korea',
            copyright: '© 2023 Brand Stone Co., Ltd.',
            chatGreeting: 'こんにちは！ブランドストーンAI営業マネージャーです。😊\\n\\nOEM/ODM、輸出入、流通など何でもお気軽にお問い合わせください！',
            chatPlaceholder: 'メッセージを入力...',
            chatError: 'エラーが発生しました。'
          },
          ZH_CN: {
            nativeName: '简体中文', dir: 'ltr',
            domesticRetail: '国内分销',
            importExport: '进出口贸易',
            oemOdm: 'OEM / ODM',
            hariboExclusive: '哈瑞宝蜡烛亚洲独家代理',
            whyBrandStone: '为什么选择PopScent？',
            whySubtitle: '家居香氛业务的一站式合作伙伴',
            why1Title: '独家代理权',
            why1Desc: 'Haribo Candle、Yankee Candle、WoodWick、TOMAMON官方合作伙伴',
            why2Title: 'OEM/ODM服务',
            why2Desc: '与德国制造商合作，定制开发藤条香薰、车载和室内香氛产品',
            why3Title: '全球网络',
            why3Desc: '出口至日本、台湾、中国、东南亚等9+国家',
            why4Title: '多渠道分销',
            why4Desc: 'Coupang、Naver、便利店、Olive Young及B2B企业渠道',
            revenue2024: '2024年营收',
            yoyGrowth: '同比增长10倍',
            countries: '出口国家',
            globalBrands: '全球合作伙伴',
            ownBrands: '自有品牌',
            clients: 'B2B客户',
            contact: 'Contact',
            getInTouch: '联系我们',
            callNow: '致电',
            companyName: 'Brand Stone 株式会社',
            businessArea: '家居香氛 / 分销 / OEM, ODM',
            ceoTitle: '首席执行官',
            address: '(06083) 首尔市江南区永东大路602, 6楼V202号',
            addressEn: '(06083) V202, 6F, 602, Yeongdong-daero, Gangnam-gu, Seoul, Korea',
            copyright: '© 2023 Brand Stone Co., Ltd.',
            chatGreeting: '您好！我是Brand Stone AI销售经理。😊\\n\\n欢迎咨询OEM/ODM、进出口或分销相关问题！',
            chatPlaceholder: '输入消息...',
            chatError: '发生错误。'
          },
          ZH_TW: {
            nativeName: '繁體中文', dir: 'ltr',
            domesticRetail: '國內分銷',
            importExport: '進出口貿易',
            oemOdm: 'OEM / ODM',
            hariboExclusive: '哈瑞寶蠟燭亞洲獨家代理',
            whyBrandStone: '為什麼選擇PopScent？',
            whySubtitle: '家居香氛業務的一站式合作夥伴',
            why1Title: '獨家代理權',
            why1Desc: 'Haribo Candle、Yankee Candle、WoodWick、TOMAMON官方合作夥伴',
            why2Title: 'OEM/ODM服務',
            why2Desc: '與德國製造商合作，定製開發藤條香薰、車載和室內香氛產品',
            why3Title: '全球網絡',
            why3Desc: '出口至日本、台灣、中國、東南亞等9+國家',
            why4Title: '多渠道分銷',
            why4Desc: 'Coupang、Naver、便利店、Olive Young及B2B企業渠道',
            revenue2024: '2024年營收',
            yoyGrowth: '年增長10倍',
            countries: '出口國家',
            globalBrands: '全球合作夥伴',
            ownBrands: '自有品牌',
            clients: 'B2B客戶',
            contact: 'Contact',
            getInTouch: '聯繫我們',
            callNow: '致電',
            companyName: 'Brand Stone 株式會社',
            businessArea: '家居香氛 / 分銷 / OEM, ODM',
            ceoTitle: '執行長',
            address: '(06083) 首爾市江南區永東大路602, 6樓V202號',
            addressEn: '(06083) V202, 6F, 602, Yeongdong-daero, Gangnam-gu, Seoul, Korea',
            copyright: '© 2023 Brand Stone Co., Ltd.',
            chatGreeting: '您好！我是Brand Stone AI銷售經理。😊\\n\\n歡迎諮詢OEM/ODM、進出口或分銷相關問題！',
            chatPlaceholder: '輸入訊息...',
            chatError: '發生錯誤。'
          },
          DE: {
            nativeName: 'Deutsch', dir: 'ltr',
            domesticRetail: 'Inlandsvertrieb',
            importExport: 'Import & Export',
            oemOdm: 'OEM / ODM',
            hariboExclusive: 'Haribo Candle Asien Exklusiv',
            whyBrandStone: 'Warum PopScent?',
            whySubtitle: 'Ihr One-Stop-Partner für Home Fragrance',
            why1Title: 'Exklusivrechte',
            why1Desc: 'Offizieller Partner von Haribo Candle, Yankee Candle, WoodWick und TOMAMON',
            why2Title: 'OEM/ODM Service',
            why2Desc: 'Kundenspezifische Produktentwicklung mit deutschen Herstellern',
            why3Title: 'Globales Netzwerk',
            why3Desc: 'Export in 9+ Länder inkl. Japan, Taiwan, China und Südostasien',
            why4Title: 'Multi-Channel',
            why4Desc: 'Coupang, Naver, Convenience Stores, Olive Young und B2B-Kanäle',
            revenue2024: 'Umsatz 2024',
            yoyGrowth: '10x Wachstum',
            countries: 'Exportländer',
            globalBrands: 'Globale Partner',
            ownBrands: 'Eigenmarken',
            clients: 'B2B Kunden',
            contact: 'Kontakt',
            getInTouch: 'Kontaktieren',
            callNow: 'Anrufen',
            companyName: 'Brand Stone Co., Ltd.',
            businessArea: 'Home Fragrance / Vertrieb / OEM, ODM',
            ceoTitle: 'Geschäftsführer',
            address: '(06083) V202, 6F, 602, Yeongdong-daero, Gangnam-gu, Seoul, Korea',
            addressEn: '(06083) V202, 6F, 602, Yeongdong-daero, Gangnam-gu, Seoul, Korea',
            copyright: '© 2023 Brand Stone Co., Ltd.',
            chatGreeting: 'Hallo! Ich bin der AI Verkaufsmanager von Brand Stone. 😊\\n\\nFragen Sie gerne zu OEM/ODM, Import/Export oder Vertrieb!',
            chatPlaceholder: 'Nachricht eingeben...',
            chatError: 'Ein Fehler ist aufgetreten.'
          },
          FR: {
            nativeName: 'Français', dir: 'ltr',
            domesticRetail: 'Distribution nationale',
            importExport: 'Import & Export',
            oemOdm: 'OEM / ODM',
            hariboExclusive: 'Haribo Candle Exclusif Asie',
            whyBrandStone: 'Pourquoi PopScent ?',
            whySubtitle: "Votre partenaire unique pour les parfums d'intérieur",
            why1Title: 'Droits exclusifs',
            why1Desc: 'Partenaire officiel de Haribo Candle, Yankee Candle, WoodWick et TOMAMON',
            why2Title: 'Service OEM/ODM',
            why2Desc: 'Développement personnalisé avec fabricants allemands',
            why3Title: 'Réseau mondial',
            why3Desc: "Export vers 9+ pays dont Japon, Taiwan, Chine et Asie du Sud-Est",
            why4Title: 'Multi-canal',
            why4Desc: 'Coupang, Naver, supérettes, Olive Young et canaux B2B',
            revenue2024: "Chiffre d'affaires 2024",
            yoyGrowth: 'Croissance x10',
            countries: 'Pays export',
            globalBrands: 'Partenaires mondiaux',
            ownBrands: 'Marques propres',
            clients: 'Clients B2B',
            contact: 'Contact',
            getInTouch: 'Nous contacter',
            callNow: 'Appeler',
            companyName: 'Brand Stone Co., Ltd.',
            businessArea: "Parfums d'intérieur / Distribution / OEM, ODM",
            ceoTitle: 'PDG',
            address: '(06083) V202, 6F, 602, Yeongdong-daero, Gangnam-gu, Séoul, Corée',
            addressEn: '(06083) V202, 6F, 602, Yeongdong-daero, Gangnam-gu, Seoul, Korea',
            copyright: '© 2023 Brand Stone Co., Ltd.',
            chatGreeting: "Bonjour ! Je suis le responsable commercial AI de Brand Stone. 😊\\n\\nN'hésitez pas à poser des questions sur OEM/ODM, Import/Export ou Distribution !",
            chatPlaceholder: 'Tapez un message...',
            chatError: "Une erreur s'est produite."
          },
          IT: {
            nativeName: 'Italiano', dir: 'ltr',
            domesticRetail: 'Distribuzione nazionale',
            importExport: 'Import & Export',
            oemOdm: 'OEM / ODM',
            hariboExclusive: 'Haribo Candle Esclusiva Asia',
            whyBrandStone: 'Perché PopScent?',
            whySubtitle: 'Il tuo partner unico per le fragranze per la casa',
            why1Title: 'Diritti esclusivi',
            why1Desc: 'Partner ufficiale di Haribo Candle, Yankee Candle, WoodWick e TOMAMON',
            why2Title: 'Servizio OEM/ODM',
            why2Desc: 'Sviluppo personalizzato con produttori tedeschi',
            why3Title: 'Rete globale',
            why3Desc: 'Export in 9+ paesi tra cui Giappone, Taiwan, Cina e Sud-Est asiatico',
            why4Title: 'Multi-canale',
            why4Desc: 'Coupang, Naver, convenience store, Olive Young e canali B2B',
            revenue2024: 'Fatturato 2024',
            yoyGrowth: 'Crescita 10x',
            countries: 'Paesi export',
            globalBrands: 'Partner globali',
            ownBrands: 'Marchi propri',
            clients: 'Clienti B2B',
            contact: 'Contatto',
            getInTouch: 'Contattaci',
            callNow: 'Chiama',
            companyName: 'Brand Stone Co., Ltd.',
            businessArea: 'Fragranze per la casa / Distribuzione / OEM, ODM',
            ceoTitle: 'CEO',
            address: '(06083) V202, 6F, 602, Yeongdong-daero, Gangnam-gu, Seoul, Corea',
            addressEn: '(06083) V202, 6F, 602, Yeongdong-daero, Gangnam-gu, Seoul, Korea',
            copyright: '© 2023 Brand Stone Co., Ltd.',
            chatGreeting: 'Ciao! Sono il responsabile vendite AI di Brand Stone. 😊\\n\\nNon esitate a chiedere informazioni su OEM/ODM, Import/Export o Distribuzione!',
            chatPlaceholder: 'Scrivi un messaggio...',
            chatError: 'Si è verificato un errore.'
          },
          RU: {
            nativeName: 'Русский', dir: 'ltr',
            domesticRetail: 'Внутренняя дистрибуция',
            importExport: 'Импорт и Экспорт',
            oemOdm: 'OEM / ODM',
            hariboExclusive: 'Haribo Candle Эксклюзив Азия',
            whyBrandStone: 'Почему PopScent?',
            whySubtitle: 'Ваш универсальный партнер в сфере домашних ароматов',
            why1Title: 'Эксклюзивные права',
            why1Desc: 'Официальный партнер Haribo Candle, Yankee Candle, WoodWick и TOMAMON',
            why2Title: 'OEM/ODM услуги',
            why2Desc: 'Индивидуальная разработка с немецкими производителями',
            why3Title: 'Глобальная сеть',
            why3Desc: 'Экспорт в 9+ стран: Япония, Тайвань, Китай и Юго-Восточная Азия',
            why4Title: 'Мультиканальность',
            why4Desc: 'Coupang, Naver, магазины, Olive Young и B2B каналы',
            revenue2024: 'Выручка 2024',
            yoyGrowth: 'Рост в 10 раз',
            countries: 'Страны экспорта',
            globalBrands: 'Глобальные партнеры',
            ownBrands: 'Собственные бренды',
            clients: 'Клиенты B2B',
            contact: 'Контакты',
            getInTouch: 'Связаться',
            callNow: 'Позвонить',
            companyName: 'Brand Stone Co., Ltd.',
            businessArea: 'Домашние ароматы / Дистрибуция / OEM, ODM',
            ceoTitle: 'Генеральный директор',
            address: '(06083) V202, 6F, 602, Yeongdong-daero, Gangnam-gu, Сеул, Корея',
            addressEn: '(06083) V202, 6F, 602, Yeongdong-daero, Gangnam-gu, Seoul, Korea',
            copyright: '© 2023 Brand Stone Co., Ltd.',
            chatGreeting: 'Здравствуйте! Я AI менеджер по продажам Brand Stone. 😊\\n\\nЗадавайте вопросы об OEM/ODM, импорте/экспорте или дистрибуции!',
            chatPlaceholder: 'Введите сообщение...',
            chatError: 'Произошла ошибка.'
          },
          AR: {
            nativeName: 'العربية', dir: 'rtl',
            domesticRetail: 'التوزيع المحلي',
            importExport: 'الاستيراد والتصدير',
            oemOdm: 'OEM / ODM',
            hariboExclusive: 'هاريبو كاندل حصري آسيا',
            whyBrandStone: 'لماذا PopScent؟',
            whySubtitle: 'شريكك الشامل لأعمال العطور المنزلية',
            why1Title: 'حقوق حصرية',
            why1Desc: 'شريك رسمي لـ Haribo Candle، Yankee Candle، WoodWick و TOMAMON',
            why2Title: 'خدمات OEM/ODM',
            why2Desc: 'تطوير منتجات مخصصة مع مصنعين ألمان',
            why3Title: 'شبكة عالمية',
            why3Desc: 'تصدير إلى 9+ دول تشمل اليابان وتايوان والصين وجنوب شرق آسيا',
            why4Title: 'قنوات متعددة',
            why4Desc: 'Coupang، Naver، متاجر، Olive Young وقنوات B2B',
            revenue2024: 'إيرادات 2024',
            yoyGrowth: 'نمو 10 أضعاف',
            countries: 'دول التصدير',
            globalBrands: 'شركاء عالميون',
            ownBrands: 'العلامات الخاصة',
            clients: 'عملاء B2B',
            contact: 'اتصل',
            getInTouch: 'تواصل معنا',
            callNow: 'اتصل الآن',
            companyName: 'Brand Stone Co., Ltd.',
            businessArea: 'العطور المنزلية / التوزيع / OEM, ODM',
            ceoTitle: 'الرئيس التنفيذي',
            address: '(06083) V202, 6F, 602, Yeongdong-daero, Gangnam-gu, سيول، كوريا',
            addressEn: '(06083) V202, 6F, 602, Yeongdong-daero, Gangnam-gu, Seoul, Korea',
            copyright: '© 2023 Brand Stone Co., Ltd.',
            chatGreeting: 'مرحباً! أنا مدير المبيعات الذكي في Brand Stone. 😊\\n\\nلا تتردد في السؤال عن OEM/ODM أو الاستيراد/التصدير أو التوزيع!',
            chatPlaceholder: 'اكتب رسالة...',
            chatError: 'حدث خطأ.'
          }
        };
        
        // Global state - 기본 영문(EN)
        var currentLang = 'EN';
        
        // Simple video autoplay
        document.addEventListener('DOMContentLoaded', function() {
          var video = document.getElementById('heroVideo');
          if (video) {
            video.muted = true;
            video.play().catch(function(e) {
              console.log('Autoplay prevented:', e);
            });
          }
          
          // Close dropdown when clicking outside
          document.addEventListener('click', function(e) {
            var dropdown = document.getElementById('langDropdown');
            var toggle = document.getElementById('langToggle');
            if (dropdown && toggle && !toggle.contains(e.target) && !dropdown.contains(e.target)) {
              dropdown.classList.add('hidden');
            }
          });
        });
        
        // Toggle language dropdown
        function toggleLangDropdown() {
          var dropdown = document.getElementById('langDropdown');
          if (dropdown) {
            dropdown.classList.toggle('hidden');
          }
        }
        
        // Set language
        function setLanguage(lang) {
          currentLang = lang;
          var t = TRANSLATIONS[lang];
          if (!t) return;
          
          // Update button text
          var langName = document.getElementById('currentLangName');
          if (langName) {
            langName.textContent = lang.replace('_', '-').replace('ZH-CN', 'CN').replace('ZH-TW', 'TW');
          }
          
          // Update RTL direction
          document.documentElement.dir = t.dir;
          document.body.dir = t.dir;
          
          // Update all lang-text elements
          var elements = document.querySelectorAll('.lang-text');
          for (var i = 0; i < elements.length; i++) {
            var el = elements[i];
            var key = el.getAttribute('data-key');
            if (key && t[key]) {
              el.innerHTML = t[key].replace(/\\\\n/g, '<br>');
            }
          }
          
          // Update chat input placeholder
          var chatInput = document.getElementById('chatInput');
          if (chatInput) {
            chatInput.placeholder = t.chatPlaceholder;
          }
          
          // Close dropdown
          var dropdown = document.getElementById('langDropdown');
          if (dropdown) {
            dropdown.classList.add('hidden');
          }
          
          // Highlight active language
          var options = document.querySelectorAll('.lang-option');
          for (var j = 0; j < options.length; j++) {
            var opt = options[j];
            if (opt.getAttribute('data-lang') === lang) {
              opt.classList.add('bg-gray-100', 'font-bold');
            } else {
              opt.classList.remove('bg-gray-100', 'font-bold');
            }
          }
          
          console.log('Language changed to:', lang);
        }
        
        // Chat Functions
        window.toggleChat = function() {
          var chatWindow = document.getElementById('chatWindow');
          if (chatWindow) {
            chatWindow.classList.toggle('active');
          }
        };
        
        window.sendMessage = async function() {
          var input = document.getElementById('chatInput');
          var messages = document.getElementById('chatMessages');
          if (!input || !messages) return;
          
          var message = input.value.trim();
          if (!message) return;
          
          var userMsg = document.createElement('div');
          userMsg.className = 'message user';
          userMsg.textContent = message;
          messages.appendChild(userMsg);
          input.value = '';
          
          var typing = document.createElement('div');
          typing.className = 'message bot typing';
          typing.innerHTML = '<span></span><span></span><span></span>';
          messages.appendChild(typing);
          messages.scrollTop = messages.scrollHeight;
          
          try {
            var res = await fetch('/api/chat', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ message: message })
            });
            var data = await res.json();
            typing.remove();
            
            var botMsg = document.createElement('div');
            botMsg.className = 'message bot';
            botMsg.innerHTML = data.response.replace(/\\n/g, '<br>');
            messages.appendChild(botMsg);
          } catch (err) {
            typing.remove();
            var t = TRANSLATIONS[currentLang];
            var errMsg = document.createElement('div');
            errMsg.className = 'message bot';
            errMsg.textContent = t ? t.chatError : 'An error occurred.';
            messages.appendChild(errMsg);
          }
          messages.scrollTop = messages.scrollHeight;
        };
        
        // Dynamic translation API (for runtime content)
        window.translateText = async function(text, targetLang) {
          try {
            var res = await fetch('/api/translate', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ text: text, targetLang: targetLang })
            });
            var data = await res.json();
            return data.success ? data.translated : text;
          } catch (err) {
            console.error('Translation error:', err);
            return text;
          }
        };
      </script>`}
    </>
  )
})

export default app
