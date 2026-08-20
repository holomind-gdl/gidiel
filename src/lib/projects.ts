import type { Locale } from "@/lib/i18n/types";

export interface ProjectResult {
  value: string;
  label: string;
}

export interface ProjectQuote {
  text: string;
  author: string;
  role: string;
}

export interface ProjectContent {
  title: string;
  summary: string;
  location: string;
  overview: string;
  challenge: string;
  approach: string[];
  results: ProjectResult[];
  quote?: ProjectQuote;
}

export interface Project {
  slug: string;
  image: string;
  categoryKey: string;
  year: string;
  client: string;
  content: Record<Locale, ProjectContent>;
}

export const projects: Project[] = [
  {
    slug: "maison-rouge-spring-lip-drop",
    image: "/images/work/maison-rouge.jpg",
    categoryKey: "work.categories.launch",
    year: "2025",
    client: "Maison Rouge",
    content: {
      en: {
        title: "Maison Rouge — Spring Lip Drop",
        summary: "+212% sell-through in 3 weeks",
        location: "Paris · France",
        overview:
          "A three-week launch campaign for Maison Rouge's spring lip collection, built to win the counter at launch and keep selling through the quarter.",
        challenge:
          "The collection was entering a crowded spring season with no hero SKU and a short runway to launch. Maison Rouge needed instant sell-through at department-store counters, not just awareness.",
        approach: [
          "Positioned one shade as the hero SKU and built every asset around a single, repeatable visual signature.",
          "Ran in-store sampling and counter takeovers across 12 flagship doors in Paris, Milan, and London.",
          "Layered paid social and creator seeding timed to the counter activation windows.",
        ],
        results: [
          { value: "+212%", label: "sell-through in 3 weeks" },
          { value: "12", label: "flagship counters activated" },
          { value: "#1", label: "best-selling SKU of the quarter" },
        ],
        quote: {
          text: "GiDieL turned our spring launch into the best-selling SKU of the quarter. The in-store activation alone paid for the whole campaign.",
          author: "Camille Fournier",
          role: "VP Marketing, Maison Rouge",
        },
      },
      ru: {
        title: "Maison Rouge — Весенний запуск помад",
        summary: "+212% продаж за 3 недели",
        location: "Париж · Франция",
        overview:
          "Трёхнедельная запусковая кампания весенней коллекции помад Maison Rouge, созданная, чтобы выиграть прилавок на старте и продолжать продавать весь квартал.",
        challenge:
          "Коллекция выходила в насыщенный весенний сезон без героя-SKU и с коротким окном запуска. Maison Rouge нужны были мгновенные продажи на прилавках универмагов, а не просто узнаваемость.",
        approach: [
          "Выделили один оттенок как герой-SKU и построили все материалы вокруг единой повторяемой визуальной подписи.",
          "Провели сэмплинг в магазинах и захват прилавков в 12 флагманских точках Парижа, Милана и Лондона.",
          "Наложили платную соцсеть и посев с создателями, синхронизированные с окнами активаций в магазинах.",
        ],
        results: [
          { value: "+212%", label: "продаж за 3 недели" },
          { value: "12", label: "флагманских прилавков активировано" },
          { value: "#1", label: "самый продаваемый SKU квартала" },
        ],
        quote: {
          text: "GiDieL превратил наш весенний запуск в самый продаваемый SKU квартала. Одна активация в магазине окупила всю кампанию.",
          author: "Камиль Фурнье",
          role: "VP Маркетинг, Maison Rouge",
        },
      },
      he: {
        title: "Maison Rouge — השקת שפתונים אביבית",
        summary: "+212% במכירות תוך 3 שבועות",
        location: "פריז · צרפת",
        overview:
          "קמפיין השקה בן שלושה שבועות לקולקציית השפתונים האביבית של Maison Rouge, שנבנה כדי לנצח את המדף בהשקה ולהמשיך למכור לאורך הרבעון.",
        challenge:
          "הקולקציה נכנסה לעונת אביב עמוסה ללא SKU מוביל ועם חלון השקה קצר. Maison Rouge נזקקה למכירות מיידיות בדלפקי הכלבו, לא רק לחשיפה.",
        approach: [
          "מיצבנו גוון אחד כ-SKU המוביל ובנינו את כל הנכסים סביב חתימה חזותית אחת חוזרת.",
          "הרצנו דגימות בחנות והשתלטויות על דלפקים ב-12 חנויות דגל בפריז, מילאנו ולונדון.",
          "שכבנו רשתות חברתיות בתשלום ושתילה עם יוצרים בתזמון לחלונות ההפעלה בחנות.",
        ],
        results: [
          { value: "+212%", label: "במכירות תוך 3 שבועות" },
          { value: "12", label: "דלפקי דגל הופעלו" },
          { value: "#1", label: "ה-SKU הנמכר ביותר ברבעון" },
        ],
        quote: {
          text: "GiDieL הפכה את ההשקה של האביב ל-SKU הנמכר ביותר ברבעון. הפעלה בחנות אחת לבדה שילמה על כל הקמפיין.",
          author: "קמייל פורנייה",
          role: "VP שיווק, Maison Rouge",
        },
      },
    },
  },
  {
    slug: "aurora-skin-counter-revival",
    image: "/images/work/aurora-skin.jpg",
    categoryKey: "work.categories.activation",
    year: "2025",
    client: "Aurora Skin",
    content: {
      en: {
        title: "Aurora Skin — Counter Revival",
        summary: "47% foot-traffic uplift",
        location: "Milan · Italy",
        overview:
          "A counter-revival program that turned a quiet beauty floor into Aurora Skin's highest-traffic destination.",
        challenge:
          "Aurora Skin had strong products but a tired counter that shoppers walked past. The brief: rebuild the in-store experience and convert foot traffic without a full retail redesign budget.",
        approach: [
          "Redesigned the counter's visual merchandising and navigation to spotlight three hero routines.",
          "Trained and scripted beauty advisors for a consultative, five-minute routine demo.",
          "Installed a sampling journey that ended at the till with a first-purchase incentive.",
        ],
        results: [
          { value: "+47%", label: "foot-traffic uplift" },
          { value: "2.4x", label: "conversion at the counter" },
          { value: "31%", label: "repeat purchase within 90 days" },
        ],
        quote: {
          text: "They understand beauty retail like no agency we've worked with. Every detail — from the press kit to the counter design — felt editorial.",
          author: "Daria Kowalski",
          role: "Founder, Aurora Skin",
        },
      },
      ru: {
        title: "Aurora Skin — Возрождение прилавка",
        summary: "+47% рост трафика",
        location: "Милан · Италия",
        overview:
          "Программа возрождения прилавка, превратившая тихий косметический этаж в самую посещаемую точку Aurora Skin.",
        challenge:
          "У Aurora Skin были сильные продукты, но уставший прилавок, мимо которого проходили покупатели. Бриф: перестроить опыт в магазине и конвертировать трафик без бюджета на полный редизайн розницы.",
        approach: [
          "Переработали визуальный мерчандайзинг и навигацию прилавка, выделив три ключевых ритуала.",
          "Обучили и проработали сценарии бьюти-консультантов для консультативной пятиминутной демонстрации ухода.",
          "Внедрили сэмплинг-путь, который завершался на кассе стимулом к первой покупке.",
        ],
        results: [
          { value: "+47%", label: "рост трафика" },
          { value: "2.4x", label: "конверсия у прилавка" },
          { value: "31%", label: "повторных покупок за 90 дней" },
        ],
        quote: {
          text: "Они понимают ритейл красоты как ни одно агентство, с которым мы работали. Каждая деталь — от пресс-кита до дизайна прилавка — была редакционной.",
          author: "Дарья Ковальски",
          role: "Основатель, Aurora Skin",
        },
      },
      he: {
        title: "Aurora Skin — התחדשות הדלפק",
        summary: "+47% עלייה בתנועת רגל",
        location: "מילאנו · איטליה",
        overview:
          "תוכנית התחדשות לדלפק שהפכה קומת יופי שקטה ליעד הנצפה ביותר של Aurora Skin.",
        challenge:
          "ל-Aurora Skin היו מוצרים חזקים אבל דלפק עייף שקונים חלפו על פניו. הבריף: לבנות מחדש את חוויית החנות ולהמיר תנועת רגל ללא תקציב לעיצוב קמעונאי מלא.",
        approach: [
          "עיצבנו מחדש את שיווק המוצר והניווט של הדלפק כדי להבליט שלוש שגרות מובילות.",
          "הכשרנו ותיסרטו יועצי יופי להדגמת שגרה ייעוצית של חמש דקות.",
          "התקנו מסע דגימות שהסתיים בקופה עם תמריץ לרכישה ראשונה.",
        ],
        results: [
          { value: "+47%", label: "עלייה בתנועת רגל" },
          { value: "2.4x", label: "המרה בדלפק" },
          { value: "31%", label: "רכישה חוזרת תוך 90 ימים" },
        ],
        quote: {
          text: "הם מבינים את ריטייל היופי כמו סוכנות שעבדה בתחום. כל פרט — מערכות העיתונות ועד לעיצוב המדף — הרגיש עורכי.",
          author: "דריה קובאלסקי",
          role: "מייסדת, Aurora Skin",
        },
      },
    },
  },
  {
    slug: "velvete-50-creator-wave",
    image: "/images/work/velvete.jpg",
    categoryKey: "work.categories.influencer",
    year: "2024",
    client: "Velveté",
    content: {
      en: {
        title: "Velveté — 50-Creator Wave",
        summary: "8.2M earned impressions",
        location: "Paris · London · NYC",
        overview:
          "A coordinated 50-creator wave that pushed Velveté's new fragrance line from launch to sell-through.",
        challenge:
          "Fragrance lives or dies on word of mouth. Velveté needed credible, on-brand voices at scale — without the scattergun reach of a one-off paid push.",
        approach: [
          "Curated a tiered mix of 50 creators across fragrance, beauty, and lifestyle niches.",
          "Shipped editorial unboxing kits and scripted a shared narrative arc across three drop waves.",
          "Timed creator output to in-store availability so demand landed where stock was.",
        ],
        results: [
          { value: "8.2M", label: "earned impressions" },
          { value: "50", label: "creators activated" },
          { value: "+68%", label: "search lift for the line" },
        ],
        quote: {
          text: "Our influencer wave hit 8 million impressions and the sell-through followed. GiDieL is now our default promotion partner.",
          author: "Inès Bouvier",
          role: "Brand Director, Velveté",
        },
      },
      ru: {
        title: "Velveté — Волна из 50 создателей",
        summary: "8,2 млн органических показов",
        location: "Париж · Лондон · Нью-Йорк",
        overview:
          "Скоординированная волна из 50 создателей, продвинувшая новую линейку ароматов Velveté от запуска до продаж.",
        challenge:
          "Парфюмерия живёт или умирает на сарафанном радио. Velveté нужны были авторитетные, попадающие в бренд голоса в масштабе — без размытого охвата разовой платной кампании.",
        approach: [
          "Собрали многоуровневый микс из 50 создателей в нишах парфюмерии, красоты и лайфстайла.",
          "Отправили редакционные анбоксинг-киты и прописали общую сюжетную арку на три волны дропов.",
          "Синхронизировали выходы создателей с наличием в магазинах, чтобы спрос приходил туда, где есть сток.",
        ],
        results: [
          { value: "8,2 млн", label: "органических показов" },
          { value: "50", label: "создателей активировано" },
          { value: "+68%", label: "рост поиска по линейке" },
        ],
        quote: {
          text: "Наша инфлюенсерская волна достигла 8 миллионов показов, и продажи последовали. GiDieL теперь наш партнер по продвижению по умолчанию.",
          author: "Инес Бувье",
          role: "Brand Director, Velveté",
        },
      },
      he: {
        title: "Velveté — גל של 50 יוצרים",
        summary: "8.2M חשיפות אורגניות",
        location: "פריז · לונדון · ניו יורק",
        overview:
          "גל מתואם של 50 יוצרים שדחף את קו הבושם החדש של Velveté מהשקה ועד מכירות.",
        challenge:
          "בושם חי או מת על מפה לאוזן. Velveté נזקקה לקולות אמינים שמתאימים למותג בקנה מידה — בלי הפיזור הרחב של קמפיין ממומן חד-פעמי.",
        approach: [
          "אצרנו מיקס מדורג של 50 יוצרים בתחומי הבושם, היופי והלייף סטייל.",
          "שלחנו ערכות אנבוקסינג עורכיות ותיסרטו קשת סיפור משותף על פני שלושה גלי הפצה.",
          "תזמנו את תפוקת היוצרים לזמינות בחנות כך שהביקוש נחת איפה שהיה מלאי.",
        ],
        results: [
          { value: "8.2M", label: "חשיפות אורגניות" },
          { value: "50", label: "יוצרים הופעלו" },
          { value: "+68%", label: "עלייה בחיפוש לקו" },
        ],
        quote: {
          text: "גל המשפיענים שלנו הגיע ל-8 מיליון תצוגות והמכירות הלכו אחריהן. GiDieL הפכה לשותפת הקידום הרגילה שלנו.",
          author: "אינז בובייה",
          role: "מנהלת מותג, Velveté",
        },
      },
    },
  },
  {
    slug: "noir-beaute-editorial-film",
    image: "/images/work/noir-beaute.jpg",
    categoryKey: "work.categories.content",
    year: "2024",
    client: "Noir Beauté",
    content: {
      en: {
        title: "Noir Beauté — Editorial Film",
        summary: "3x engagement vs. benchmark",
        location: "Studio · Paris",
        overview:
          "An editorial film and stills package that gave Noir Beauté's campaign a cinematic, shareable identity across social and retail.",
        challenge:
          "Noir Beauté needed content that felt like an editorial, not an ad — assets that would hold their own in feeds and on high-street screens.",
        approach: [
          "Produced a 60-second hero film and a modular stills library under one art direction.",
          "Cut platform-native versions for Instagram, TikTok, and in-store screens.",
          "Designed a color and motion system the brand could reuse across the season.",
        ],
        results: [
          { value: "3x", label: "engagement vs. benchmark" },
          { value: "1.4M", label: "organic video views" },
          { value: "60+", label: "assets delivered" },
        ],
      },
      ru: {
        title: "Noir Beauté — Редакционный фильм",
        summary: "3x вовлечённость против бенчмарка",
        location: "Студия · Париж",
        overview:
          "Пакет редакционного фильма и фото, который дал кампании Noir Beauté кинематографичную, легко распространяемую айдентику для соцсетей и розницы.",
        challenge:
          "Noir Beauté нужен был контент, который ощущается как редакция, а не реклама — активы, способные удержаться в лентах и на экранах в магазинах.",
        approach: [
          "Сняли 60-секундный герой-фильм и модульную библиотеку фото под единым арт-направлением.",
          "Нарезали версии под платформы для Instagram, TikTok и экранов в магазинах.",
          "Разработали систему цвета и движения, которую бренд мог переиспользовать весь сезон.",
        ],
        results: [
          { value: "3x", label: "вовлечённость против бенчмарка" },
          { value: "1,4 млн", label: "органических просмотров видео" },
          { value: "60+", label: "доставленных активов" },
        ],
      },
      he: {
        title: "Noir Beauté — סרט עורכי",
        summary: "3x מעורבות לעומת בֶּנצ׳מָרק",
        location: "סטודיו · פריז",
        overview:
          "חבילת סרט ותמונות עורכית שהעניקה לקמפיין של Noir Beauté זהות קולנועית וברת-שיתוף לרשתות ולקמעונאות.",
        challenge:
          "Noir Beauté נזקקה לתוכן שמרגיש כמו עריכה עיתונאית, לא כמו פרסומת — נכסים שיחזיקו מעמד בפידים ובמסכים בחנויות.",
        approach: [
          "הפקנו סרט גיבור בן 60 שניות וספריית תמונות מודולרית תחת כיוון אמנותי אחד.",
          "חתכנו גרסאות מותאמות פלטפורמה לאינסטגרם, טיקטוק ומסכים בחנויות.",
          "עיצבנו מערכת צבע ותנועה שהמותג יוכל לעשות בה שימוש חוזר לאורך העונה.",
        ],
        results: [
          { value: "3x", label: "מעורבות לעומת בֶּנצ׳מָרק" },
          { value: "1.4M", label: "צפיות וידאו אורגניות" },
          { value: "60+", label: "נכסים שנמסרו" },
        ],
      },
    },
  },
  {
    slug: "kasia-israel-market-entry",
    image: "/images/work/kasia.jpg",
    categoryKey: "work.categories.importExport",
    year: "2025",
    client: "Kasia",
    content: {
      en: {
        title: "Kasia — Israel Market Entry",
        summary: "Full compliance & shelf placement in 90 days",
        location: "Tel Aviv · Israel",
        overview:
          "End-to-end market entry that took Kasia from zero Israeli presence to compliant, on-shelf, and selling in 90 days.",
        challenge:
          "Entering Israel meant untangling cosmetics regulation, Hebrew labeling, import certification, and retail distribution — fast, with no local team.",
        approach: [
          "Managed customs clearance, compliance documentation, and Hebrew labeling end to end.",
          "Secured certification and negotiated shelf placement across a national retail chain.",
          "Stood up local sampling and an in-store launch event to build early velocity.",
        ],
        results: [
          { value: "90", label: "days to full shelf placement" },
          { value: "100%", label: "compliance on first inspection" },
          { value: "1", label: "national retail chain live" },
        ],
      },
      ru: {
        title: "Kasia — Выход на рынок Израиля",
        summary: "Полный комплаенс и выкладка за 90 дней",
        location: "Тель-Авив · Израиль",
        overview:
          "Комплексный выход на рынок, который вывел Kasia от нулевого присутствия в Израиле до комплаенса, выкладки и продаж за 90 дней.",
        challenge:
          "Выход в Израиль означал распутывание косметического регулирования, маркировки на иврите, импортной сертификации и розничной дистрибуции — быстро и без локальной команды.",
        approach: [
          "Полностью сопроводили таможенную очистку, документацию по комплаенсу и маркировку на иврите.",
          "Обеспечили сертификацию и договорились о выкладке в национальной розничной сети.",
          "Запустили локальный сэмплинг и ивент запуска в магазине для раннего импульса продаж.",
        ],
        results: [
          { value: "90", label: "дней до полной выкладки" },
          { value: "100%", label: "комплаенс с первой проверки" },
          { value: "1", label: "национальная сеть запущена" },
        ],
      },
      he: {
        title: "Kasia — כניסה לשוק הישראלי",
        summary: "עמידה מלאה ברגולציה ומיקום על המדף ב-90 ימים",
        location: "תל אביב · ישראל",
        overview:
          "כניסה מלאה לשוק שהובילה את Kasia מאפס נוכחות בישראל לעמידה ברגולציה, מיקום על המדף ומכירות תוך 90 ימים.",
        challenge:
          "כניסה לישראל משמעותה לפענח רגולציית קוסמטיקה, תיוג בעברית, הסמכת יבוא והפצה קמעונאית — מהר, וללא צוות מקומי.",
        approach: [
          "ניהלנו מקצה לקצה שחרור ממכס, תיעוד עמידה ברגולציה ותיוג בעברית.",
          "הבטחנו הסמכה וניהלנו משא ומתן על מיקום על המדף ברשת קמעונאית ארצית.",
          "הקמנו דגימות מקומיות ואירוע השקה בחנות לבניית מומנטום מוקדם.",
        ],
        results: [
          { value: "90", label: "ימים למיקום מלא על המדף" },
          { value: "100%", label: "עמידה ברגולציה בבדיקה הראשונה" },
          { value: "1", label: "רשת קמעונאית ארצית פעילה" },
        ],
      },
    },
  },
  {
    slug: "opalence-private-label-skincare",
    image: "/images/work/opalence.jpg",
    categoryKey: "work.categories.turnkeyBrand",
    year: "2025",
    client: "Opalence",
    content: {
      en: {
        title: "Opalence — Private Label Skincare",
        summary: "Formula to retail in 6 months",
        location: "Worldwide",
        overview:
          "A turnkey private-label skincare line, taken from formula brief to retail-ready in six months.",
        challenge:
          "Opalence wanted to launch its own skincare brand but had no lab, no packaging, and no supply chain. They needed a single partner to own the whole build.",
        approach: [
          "Developed the formula with world-class labs to the client's exact spec and price point.",
          "Sourced packaging, managed production, and handled logistics and compliance.",
          "Delivered a sell-ready brand with launch assets for the first retail push.",
        ],
        results: [
          { value: "6 mo", label: "formula to retail" },
          { value: "1", label: "turnkey brand launched" },
          { value: "3", label: "formulas developed to spec" },
        ],
      },
      ru: {
        title: "Opalence — Собственная марка ухода",
        summary: "От формулы до розницы за 6 месяцев",
        location: "По всему миру",
        overview:
          "Готовая линейка ухода под собственной маркой, доведённая от брифа на формулу до готовности к рознице за шесть месяцев.",
        challenge:
          "Opalence хотела запустить собственный бренд ухода, но не имела ни лаборатории, ни упаковки, ни цепочки поставок. Им нужен был один партнёр, который возьмёт на себя всю сборку.",
        approach: [
          "Разработали формулу в лабораториях мирового уровня под точную спецификацию и ценовую точку клиента.",
          "Подобрали упаковку, управляли производством и взяли на себя логистику и комплаенс.",
          "Передали готовый к продаже бренд с запусковыми активами для первого выхода в розницу.",
        ],
        results: [
          { value: "6 мес", label: "от формулы до розницы" },
          { value: "1", label: "готовый бренд запущен" },
          { value: "3", label: "формулы разработаны по спецификации" },
        ],
      },
      he: {
        title: "Opalence — מותג טיפוח פרטי",
        summary: "מפורמולה לרשת תוך 6 חודשים",
        location: "ברחבי העולם",
        overview:
          "קו טיפוח מפתח תחת מותג פרטי, שנלקח מבריף פורמולה למוכן לרשת תוך שישה חודשים.",
        challenge:
          "Opalence רצתה להשיק מותג טיפוח משלה אבל לא היו לה מעבדה, אריזה או שרשרת אספקה. הם נזקקו לשותף אחד שייקח בעלות על כל הבנייה.",
        approach: [
          "פיתחנו את הפורמולה במעבדות ברמה עולמית לפי המפרט ונקודת המחיר המדויקת של הלקוח.",
          "איתרנו אריזה, ניהלנו את הייצור וטיפלנו בלוגיסטיקה וברגולציה.",
          "מסרנו מותג מוכן למכירה עם נכסי השקה לדחיפה הקמעונאית הראשונה.",
        ],
        results: [
          { value: "6 חודשים", label: "מפורמולה לרשת" },
          { value: "1", label: "מותג מפתח הושק" },
          { value: "3", label: "פורמולות פותחו לפי מפרט" },
        ],
      },
    },
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAllProjectSlugs(): string[] {
  return projects.map((p) => p.slug);
}
