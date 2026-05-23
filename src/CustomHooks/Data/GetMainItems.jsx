const formatWithComma = (num) => {
  return new Intl.NumberFormat().format(num);
}
const takhfifPercent = (prevPrice, price) => {
  // عدد ضربدر منفی شده است تا تخفیف مثبت بیان شود
  return ((price / prevPrice) - 1) * -100
}
const items = [
  {
    img: '/IMGS/PishnahadIMGs/1.webp',
    title: 'کپسول ویتامین ث و زینک 10 میلی گرمی  بسته 60 عددی',
    prevPrice: formatWithComma(506000),
    price: formatWithComma(154000),
    percent: Math.round(takhfifPercent(506000, 154000)),
    priceNumber: 154000,   // ✅ موجود است
    id: 1,
    colors: [''],
    properties: [{ top: 'ماده اصلی مکمل', bottom: 'ویتامین C' }],
    rate: 4.4
  },
  {
    img: '/IMGS/PishnahadIMGs/2.webp',
    title: 'هدفون بلوتوثی ورنا مدل Airpods pro K14',
    prevPrice: formatWithComma(810000),
    price: formatWithComma(565000),
    percent: Math.round(takhfifPercent(810000, 565000)),
    priceNumber: 565000,
    id: 2,
    colors: ['white'],
    properties: [
      { top: 'قابلیت نویز کنسلینگ', bottom: 'فاقد قابلیت نویز کنسلینگ' },
      { top: 'نوع گوشی', bottom: 'دو گوشی' },
      { top: 'نوع اتصال', bottom: 'بی‌سیم' },
      { top: 'رابط‌ها', bottom: 'بلوتوث' }
    ],
    rate: 4.3,
    category: 'digitalProducts'
  },
  {
    img: '/IMGS/PishnahadIMGs/4.webp',
    title: 'گوشی موبایل اپل مدل iPhone 15 Ch دو سیم‌ کارت ظرفیت 128 گیگابایت و رم 6 گیگابایت ',
    prevPrice: formatWithComma(145999000),
    price: formatWithComma(142999000),
    percent: Math.round(takhfifPercent(145999000, 142999000)),
    priceNumber: 142999000,
    id: 3,
    colors: ['black', 'pink', 'blue', 'gold'],
    properties: [
      { top: 'فناوری صفحه‌ نمایش', bottom: 'Super Retina XDR OLED' },
      { top: 'فناوری صفحه‌ نسخه سیستم عامل', bottom: 'iOS 17' },
      { top: 'رزولوشن دوربین اصلی', bottom: '48 مگاپیکسل' },
      { top: 'اندازه', bottom: '6.1' },
    ],
    rate: 4.9,
    category: 'mobile'
  },
  {
    img: '/IMGS/PishnahadIMGs/3.webp',
    title: 'کلاژینو بیوتی سه بسته 30 عددی',
    prevPrice: formatWithComma(7500000),
    price: formatWithComma(3488980),
    percent: Math.round(takhfifPercent(7500000, 3488980)),
    priceNumber: 3488980,
    id: 4,
    colors: [''],
    properties: [
      { top: 'کشور تولید کننده', bottom: 'ایران' },
      { top: 'بسته', bottom: 'سی عددی' },
    ],
    rate: 4.1
  },
  {
    img: '/IMGS/PishnahadIMGs/5.webp',
    title: ' هدفون بی سیم ادیفایر مدل X3',
    prevPrice: formatWithComma(1049000),
    price: formatWithComma(799000),
    percent: Math.round(takhfifPercent(1049000, 799000)),
    priceNumber: 799000,
    id: 5,
    colors: ['black'],
    properties: [
      { top: 'قابلیت نویز کنسلینگ', bottom: 'فاقد قابلیت نویز کنسلینگ' },
      { top: 'نوع گوشی', bottom: 'دو گوشی' },
      { top: 'نوع اتصال', bottom: 'بی‌سیم' },
      { top: 'رابط‌ها', bottom: 'بلوتوث' }
    ],
    rate: 3.9,
    category: 'digitalProducts'
  },
  {
    img: '/IMGS/PishnahadIMGs/6.webp',
    title: 'جوراب ساق بلند مردانه اسپست مدل ASP-XSH-VRTAA1 مجموعه 3 عددی',
    prevPrice: formatWithComma(600000),
    price: formatWithComma(349900),
    percent: Math.round(takhfifPercent(600000, 349900)),
    priceNumber: 349900,
    id: 6,
    colors: ['navy', 'gold', 'red'],
    properties: [
      { top: 'تعداد', bottom: '3 جفت' },
      { top: 'جنس', bottom: 'پنبه و پلی‌استر' },
      { top: 'ویژگی', bottom: 'ساق بلند' },
    ],
    rate: 4.2,
    category: 'clothing'
  },
  {
    img: '/IMGS/PishnahadIMGs/7.webp',
    title: 'کتاب دیدار با تاریکی اثر محمدعلی حمصیان انتشارات کتابستان معرفت',
    prevPrice: formatWithComma(332000),
    price: formatWithComma(250000),
    percent: Math.round(takhfifPercent(332000, 250000)),
    priceNumber: 250000,
    id: 7,
    colors: [''],
    properties: [
      { top: 'نویسنده', bottom: 'محمدعلی حمصیان' },
      { top: 'انتشارات', bottom: 'کتابستان معرفت' },
      { top: 'قطع', bottom: 'رقعی' },
      { top: 'تعداد صفحات', bottom: '224 صفحه' },
    ],
    rate: 4.3
  },
  {
    img: '/IMGS/PishnahadIMGs/8.webp',
    title: 'کرم آبرسان صورت گلاما مدل Hyaluronic Acid مناسب برای انواع پوست حجم 50 میلی‌لیتر',
    prevPrice: formatWithComma(1450000),
    price: formatWithComma(180000),
    percent: Math.round(takhfifPercent(1450000, 180000)),
    priceNumber: 180000,
    id: 8,
    colors: ['blue', 'white'],
    properties: [
      { top: 'مناسب برای', bottom: 'انواع پوست' },
      { top: 'حاوی', bottom: 'هیالورونیک اسید' },
      { top: 'ویژگی', bottom: 'آبرسان قوی و سبک' },
      { top: 'حجم', bottom: '50 میلی‌لیتر' },
    ],
    rate: 2.7,
    category: 'makeupCleaning'
  },
  {
    img: '/IMGS/PishnahadIMGs/9.webp',
    title: 'کرم مرطوب کننده دست آرت وینا مدل اوره 10 درصد مناسب پوست خشک و آسیب دیده حجم 50 میلی لیتر',
    prevPrice: formatWithComma(1485000),
    price: formatWithComma(499900),
    percent: Math.round(takhfifPercent(1485000, 499900)),
    priceNumber: 499900,
    id: 9,
    colors: ['white'],
    properties: [
      { top: 'مناسب برای', bottom: 'پوست خشک و ترک‌خورده' },
      { top: 'حاوی', bottom: 'اوره 10٪' },
      { top: 'اثر', bottom: 'نرم‌کننده و ترمیم‌کننده' },
      { top: 'حجم', bottom: '50 میلی‌لیتر' },
    ],
    rate: 4.1,
    category: 'makeupCleaning'
  },
  {
    img: '/IMGS/PishnahadIMGs/10.webp',
    title: 'کرم آبرسان صورت آرت وینا مدل HA+ مناسب انواع پوست حجم 50 میلی لیتر',
    prevPrice: formatWithComma(1222000),
    price: formatWithComma(475000),
    percent: Math.round(takhfifPercent(1222000, 475000)),
    priceNumber: 475000,
    id: 10,
    colors: ['white', 'blue'],
    properties: [
      { top: 'مناسب برای', bottom: 'انواع پوست' },
      { top: 'ویژگی', bottom: 'جذب سریع بدون ایجاد سنگینی' },
      { top: 'حاوی', bottom: 'هیالورونیک اسید + ویتامین B5' },
      { top: 'حجم', bottom: '50 میلی‌لیتر' },
    ],
    rate: 5,
    category: 'makeupCleaning'
  },
  {
    img: '/IMGS/PishnahadIMGs/11.webp',
    title: 'کرم دست فوق سبک و آبرسان مورینگا اِمو مدل 1 انواع پوست کاسه‌ای 250 میلی‌لیتر',
    prevPrice: formatWithComma(230000),
    price: formatWithComma(115500),
    percent: Math.round(takhfifPercent(230000, 115500)),
    priceNumber: 115500,
    id: 11,
    colors: ['white', 'green'],
    properties: [
      { top: 'بافت', bottom: 'فوق سبک' },
      { top: 'مناسب برای', bottom: 'انواع پوست' },
      { top: 'اثر', bottom: 'آبرسان و نرم‌کننده' },
      { top: 'حجم', bottom: '250 میلی‌لیتر' },
    ],
    rate: 4.4,
    category: 'makeupCleaning'
  },
  {
    img: '/IMGS/PishnahadIMGs/12.webp',
    title: 'اکستریت د پرفیوم زنانه عطر یانی مدل سیمرغ با رایحه معتدل حجم 50 میلی‌لیتر',
    prevPrice: formatWithComma(3900000),
    price: formatWithComma(3510000),
    percent: Math.round(takhfifPercent(3900000, 3510000)),  // ✅ اصلاح شد (قبلاً اشتباه بود)
    priceNumber: 3510000,
    id: 12,
    colors: [""],
    properties: [
      { top: 'استانداردهای تولید', bottom: 'بدون مواد حساسیت‌زا' },
      { top: 'زمان استفاده', bottom: 'روز و شب' },
      { top: 'پخش بو', bottom: 'قوی' },
      { top: 'ماندگاری', bottom: 'زیاد' },
      { top: 'مناسبت استفاده', bottom: 'رسمی، مهمانی، روزمره' },
      { top: 'ساختار نت‌ها', bottom: 'گل' },
      { top: 'ساختار رایحه', bottom: 'گلی' },
      { top: 'مناسب برای فصل', bottom: 'بهار، تابستان، پاییز' },
    ],
    rate: 4.8
  },
  {
    img: '/IMGS/PishnahadIMGs/13.webp',
    title: 'زعفران مصطفوی - 4.608 گرم',
    prevPrice: formatWithComma(1897300),
    price: formatWithComma(1620000),
    percent: Math.round(takhfifPercent(1897300, 1620000)),
    priceNumber: 1620000,
    id: 13,
    colors: [''],
    properties: [
      { top: 'درجه کیفی زعفران', bottom: 'ممتاز (اعلاء)' },
      { top: 'شکل ماده غذایی', bottom: 'رشته کامل' }
    ],
    rate: 4.9
  },
  {
    img: '/IMGS/TotalIMGs/14.webp',
    title: 'گوشی موبایل اپل مدل iPhone 17 Pro Max ZAA تک سیم کارت + eSim ظرفیت 256 گیگابایت و رم 12 گیگابایت - نات اکتیو',
    price: formatWithComma(404999000),
    priceNumber: 404999000,
    id: 14,
    colors: ['orange'],
    properties: [
      { top: 'فناوری صفحه‌ نمایش', bottom: 'LTPO Super Retina XDR OLED' },
      { top: 'نسخه سیستم عامل', bottom: 'iOS 26' },
      { top: 'رزولوشن دوربین اصلی', bottom: '48 مگاپیکسل' },
      { top: 'اندازه', bottom: '6.9' },
    ],
    rate: 4.6,
    category: 'mobile'
  },
  {
    img: '/IMGS/TotalIMGs/15.webp',
    title: 'گوشی موبایل اپل مدل iPhone 17 CH دو سیم کارت ظرفیت 256 گیگابایت و رم 8 گیگابایت - نات اکتیو',
    price: formatWithComma(299999000),
    priceNumber: 299999000,
    id: 15,
    colors: ['white', 'purple', 'blue', 'black'],
    properties: [
      { top: 'فناوری صفحه‌ نمایش', bottom: 'LTPO Super Retina XDR OLED' },
      { top: 'نسخه سیستم عامل', bottom: 'iOS 26' },
      { top: 'رزولوشن دوربین اصلی', bottom: '48 مگاپیکسل' },
      { top: 'اندازه', bottom: '6.3' },
    ],
    rate: 4.6,
    category: 'mobile'
  },
  {
    img: '/IMGS/TotalIMGs/16.webp',
    title: 'لپ‌تاپ لنوو مدل IdeaPad 1 15IJL7 با پردازنده Celeron N4500، رم DDR4 8GB با فرکانس 2933MHz، حافظه SSD با ظرفیت 256GB، نمایشگر 15.6 اینچ TN با وضوح Full HD',
    price: formatWithComma(49400000),
    priceNumber: 49400000,
    id: 16,
    colors: ['gray'],
    properties: [
      { top: 'نورپردازی صفحه کلید', bottom: 'بدون نور پردازی' },
      { top: 'سازنده پردازنده گرافیکی', bottom: 'Intel' },
      { top: 'ظرفیت حافظه رم (RAM)', bottom: '8 گیگابایت' },
      { top: 'دقت صفحه نمایش', bottom: 'Full HD | 1920 x1080' },
      { top: 'ظرفیت حافظه داخلی', bottom: '256 گیگابایت' },
      { top: 'نسخه‌ بلوتوث', bottom: '5.2' },
      { top: 'نرخ بروزرسانی تصویر', bottom: '60' },
      { top: 'کاربری', bottom: 'عمومی' },
      { top: 'نوع روکش صفحه‌نمایش', bottom: 'مات' }
    ],
    rate: 4.3,
    category: 'laptop'
  },
  {
    img: '/IMGS/TotalIMGs/17.webp',
    title: 'ترازو دیجیتال پرسونال اسکیل مدل 2003B',
    price: formatWithComma(1630000),
    priceNumber: 1630000,
    id: 17,
    colors: ['white'],
    properties: [
      { top: 'حداکثر وزن قابل اندازه‌گیری', bottom: '180 کیلوگرم' },
      { top: 'منبع انرژی ترازو', bottom: 'باتری' },
      { top: 'دقت سنجش ترازو', bottom: '50 گرم' }
    ],
    rate: 3.9,
    category: 'massage'
  },
  {
    img: '/IMGS/TotalIMGs/18.webp',
    title: 'نیم ست طلا 18 عیار زنانه طلای کامک مدل تراش گل',
    prevPrice: formatWithComma(504000000),
    price: formatWithComma(443000000),
    priceNumber: 443000000,
    percent: Math.round(takhfifPercent(504000000, 443000000)),
    id: 18,
    colors: ['white'],
    properties: [
      { top: 'حداکثر وزن قابل اندازه‌گیری', bottom: '180 کیلوگرم' },
      { top: 'منبع انرژی ترازو', bottom: 'باتری' },
      { top: 'دقت سنجش ترازو', bottom: '50 گرم' }
    ],
    rate: 3.9,
    category: 'jewlrey'
  },
    {
    img: '/IMGS/TotalIMGs/19.webp',
    title: 'ست چاقو آشپزخانه 6 پارچه نینجا مدل K32006EU',
    price: formatWithComma(50900000),
    priceNumber: 50900000,
    id: 19,
    colors: ['gray'],
    properties: [
      { top: 'جنس تیغه', bottom: 'فولاد کربنی' }
    ],
    rate: 4.2,
    category: 'kitchen'
  }
];


const GetMainItems = () => {
    return items
}

export default GetMainItems