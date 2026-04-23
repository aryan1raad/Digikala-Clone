import { useState } from 'react'
import { createContext } from 'react'
import { BrowserRouter as Router, Routes, Route, useParams, Outlet, Navigate } from 'react-router-dom'
import './App.css'
import './assets/Styles/Header.css'
import { Header } from './Components/Layout/header';
import { Landing } from './Pages/Landing';
import { Product } from './Pages/Product'
import { Footer } from './Components/Layout/Footer';
import Login from './Components/Login'
// داده‌های استوری
const Dadaye1 = {
  img: 'src/assets/StoryDataAssets/Namayangar/Atr.jpg',
  title: 'عطر سیمرغ',
  video: 'src/assets/StoryDataAssets/videos/simorgh.mp4',
  productImg: 'src/assets/StoryDataAssets/ProductImages/perfume.jpg',
  textContent: 'اکستریت د پرفیوم زنانه عطر یانی مدل سیمرغ با رایحه معتدل حجم 50 میلی‌لیتر',
  id: 12
};

const Dadaye2 = {
  img: 'src/assets/StoryDataAssets/Namayangar/zafferanNamaye.png',
  title: 'زعفران مصطفوی - 4.608 گرم',
  video: 'src/assets/StoryDataAssets/videos/zaaferan.mp4',
  productImg: 'src/assets/StoryDataAssets/ProductImages/zaaferan.jpg',
  textContent: 'برنج هیمه با ۴۰ سال سابقه بهترین‌ برنج‌ها را از مزارع مازندران دستچین کرده و به سفره‌های شما می‌آورد.',
  id: 13
};

// export const ProductContext = createContext();
const formatWithComma = (num) => {
  return new Intl.NumberFormat().format(num);
}
const takhfifPercent = (prevPrice, price) => {
  // عدد ضربدر منفی شده است تا تخفیف مثبت بیان شود
  return ((price / prevPrice) - 1) * -100
}

const items = [
  {
    img: '/src/assets/IMGS/PishnahadIMGs/1.webp', title: 'کپسول ویتامین ث و زینک 10 میلی گرمی  بسته 60 عددی', prevPrice: formatWithComma(506000), price: formatWithComma(154000), percent: Math.round(takhfifPercent(506000, 154000)),
    id: 1, colors: [''],
    properties: [
      { top: 'ماده اصلی مکمل', bottom: 'ویتامین C' }
    ]
  },

  {
    img: '/src/assets/IMGS/PishnahadIMGs/2.webp', title: 'هدفون بلوتوثی ورنا مدل Airpods pro K14', prevPrice: formatWithComma(810000), price: formatWithComma(565000), percent: Math.round(takhfifPercent(810000, 565000)),
    id: 2, colors: ['white'],
    properties: [
      { top: 'قابلیت نویز کنسلینگ', bottom: 'فاقد قابلیت نویز کنسلینگ' },
      { top: 'نوع گوشی', bottom: 'دو گوشی' },
      { top: 'نوع اتصال', bottom: 'بی‌سیم' },
      { top: 'رابط‌ها', bottom: 'بلوتوث' }
    ]
  },

  {
    img: '/src/assets/IMGS/PishnahadIMGs/4.webp', title: 'گوشی موبایل اپل مدل iPhone 15 Ch دو سیم‌ کارت ظرفیت 128 گیگابایت و رم 6 گیگابایت ', prevPrice: formatWithComma(145999000), price: formatWithComma(142999000), percent: Math.round(takhfifPercent(145999000, 142999000)),
    id: 3, colors: ['black', 'pink', 'blue', 'gold'],
    properties: [
      { top: 'فناوری صفحه‌ نمایش', bottom: 'Super Retina XDR OLED' },
      { top: 'فناوری صفحه‌ نسخه سیستم عامل', bottom: 'iOS 17' },
      { top: 'رزولوشن دوربین اصلی', bottom: '48 مگاپیکسل' },
      { top: 'اندازه', bottom: '6.1' },
    ]
  },

  {
    img: '/src/assets/IMGS/PishnahadIMGs/3.webp', title: 'کلاژینو بیوتی سه بسته 30 عددی', prevPrice: formatWithComma(7500000), price: formatWithComma(3488980), percent: Math.round(takhfifPercent(7500000, 3488980)),
    id: 4, colors: [''],
    properties: [
      { top: 'کشور تولید کننده', bottom: 'ایران' },
      { top: 'بسته', bottom: 'سی عددی' },
    ]
  },
  {
    img: '/src/assets/IMGS/PishnahadIMGs/5.webp', title: ' هدفون بی سیم ادیفایر مدل X3', prevPrice: formatWithComma(1049000), price: formatWithComma(799000), percent: Math.round(takhfifPercent(1049000, 799000)),
    id: 5, colors: ['black'],
    properties: [
      { top: 'قابلیت نویز کنسلینگ', bottom: 'فاقد قابلیت نویز کنسلینگ' },
      { top: 'نوع گوشی', bottom: 'دو گوشی' },
      { top: 'نوع اتصال', bottom: 'بی‌سیم' },
      { top: 'رابط‌ها', bottom: 'بلوتوث' }
    ]
  }, {
    img: '/src/assets/IMGS/PishnahadIMGs/6.webp', title: 'جوراب ساق بلند مردانه اسپست مدل ASP-XSH-VRTAA1 مجموعه 3 عددی', prevPrice: formatWithComma(600000), price: formatWithComma(349900), percent: Math.round(takhfifPercent(600000, 349900)),
    id: 6, colors: ['navy', 'gold', 'red'],
    properties: [
      { top: 'تعداد', bottom: '3 جفت' },
      { top: 'جنس', bottom: 'پنبه و پلی‌استر' },
      { top: 'ویژگی', bottom: 'ساق بلند' },
    ]
  },

  {
    img: '/src/assets/IMGS/PishnahadIMGs/7.webp', title: 'کتاب دیدار با تاریکی اثر محمدعلی حمصیان انتشارات کتابستان معرفت', prevPrice: formatWithComma(332000), price: formatWithComma(250000), percent: Math.round(takhfifPercent(332000, 250000)),
    id: 7, colors: [''],
    properties: [
      { top: 'نویسنده', bottom: 'محمدعلی حمصیان' },
      { top: 'انتشارات', bottom: 'کتابستان معرفت' },
      { top: 'قطع', bottom: 'رقعی' },
      { top: 'تعداد صفحات', bottom: '224 صفحه' },
    ]
  },

  {
    img: '/src/assets/IMGS/PishnahadIMGs/8.webp', title: 'کرم آبرسان صورت گلاما مدل Hyaluronic Acid مناسب برای انواع پوست حجم 50 میلی‌لیتر', prevPrice: formatWithComma(1450000), price: formatWithComma(180000), percent: Math.round(takhfifPercent(1450000, 180000)),
    id: 8, colors: ['blue', 'white'],
    properties: [
      { top: 'مناسب برای', bottom: 'انواع پوست' },
      { top: 'حاوی', bottom: 'هیالورونیک اسید' },
      { top: 'ویژگی', bottom: 'آبرسان قوی و سبک' },
      { top: 'حجم', bottom: '50 میلی‌لیتر' },
    ]
  },

  {
    img: '/src/assets/IMGS/PishnahadIMGs/9.webp', title: 'کرم مرطوب کننده دست آرت وینا مدل اوره 10 درصد مناسب پوست خشک و آسیب دیده حجم 50 میلی لیتر', prevPrice: formatWithComma(1485000), price: formatWithComma(499900), percent: Math.round(takhfifPercent(1485000, 499900)),
    id: 9, colors: ['white'],
    properties: [
      { top: 'مناسب برای', bottom: 'پوست خشک و ترک‌خورده' },
      { top: 'حاوی', bottom: 'اوره 10٪' },
      { top: 'اثر', bottom: 'نرم‌کننده و ترمیم‌کننده' },
      { top: 'حجم', bottom: '50 میلی‌لیتر' },
    ]
  },

  {
    img: '/src/assets/IMGS/PishnahadIMGs/10.webp', title: 'کرم آبرسان صورت آرت وینا مدل HA+ مناسب انواع پوست حجم 50 میلی لیتر', prevPrice: formatWithComma(1222000), price: formatWithComma(475000), percent: Math.round(takhfifPercent(1222000, 475000)),
    id: 10, colors: ['white', 'blue'],
    properties: [
      { top: 'مناسب برای', bottom: 'انواع پوست' },
      { top: 'ویژگی', bottom: 'جذب سریع بدون ایجاد سنگینی' },
      { top: 'حاوی', bottom: 'هیالورونیک اسید + ویتامین B5' },
      { top: 'حجم', bottom: '50 میلی‌لیتر' },
    ]
  },

  {
    img: '/src/assets/IMGS/PishnahadIMGs/11.webp', title: 'کرم دست فوق سبک و آبرسان مورینگا اِمو مدل 1 انواع پوست کاسه‌ای 250 میلی‌لیتر', prevPrice: formatWithComma(230000), price: formatWithComma(115500), percent: Math.round(takhfifPercent(230000, 115500)),
    id: 11, colors: ['white', 'green'],
    properties: [
      { top: 'بافت', bottom: 'فوق سبک' },
      { top: 'مناسب برای', bottom: 'انواع پوست' },
      { top: 'اثر', bottom: 'آبرسان و نرم‌کننده' },
      { top: 'حجم', bottom: '250 میلی‌لیتر' },
    ]
  },

  {
    img: '/src/assets/IMGS/PishnahadIMGs/12.webp', title: 'اکستریت د پرفیوم زنانه عطر یانی مدل سیمرغ با رایحه معتدل حجم 50 میلی‌لیتر', prevPrice: formatWithComma(3900000), price: formatWithComma(3510000), percent: Math.round(takhfifPercent(230000, 115500)),
    id: 12, colors: [""],
    properties: [
      { top: 'استانداردهای تولید', bottom: 'بدون مواد حساسیت‌زا' },
      { top: 'زمان استفاده', bottom: 'روز و شب' },
      { top: 'پخش بو', bottom: 'قوی' },
      { top: 'ماندگاری', bottom: 'زیاد' },
      { top: 'مناسبت استفاده', bottom: 'رسمی، مهمانی، روزمره' },
      { top: 'ساختار نت‌ها', bottom: 'گل' },
      { top: 'ساختار رایحه', bottom: 'گلی' },
      { top: 'مناسب برای فصل', bottom: 'بهار، تابستان، پاییز' },
    ]
  },

  {
    img: '/src/assets/IMGS/PishnahadIMGs/13.webp', title: 'زعفران مصطفوی - 4.608 گرم', prevPrice: formatWithComma(1897300), price: formatWithComma(1620000), percent: Math.round(takhfifPercent(1897300, 1620000)),
    id: 13, colors: [''],
    properties: [
      { top: 'درجه کیفی زعفران', bottom: 'ممتاز (اعلاء)' },
      { top: 'شکل ماده غذایی', bottom: 'رشته کامل' }
    ]
  }
];
const storyWrapperData = [
  Dadaye1, Dadaye1, Dadaye2, Dadaye1, Dadaye2,
  Dadaye1, Dadaye2, Dadaye1, Dadaye2, Dadaye2,
  Dadaye1, Dadaye2, Dadaye1
];

export const ProductContext = createContext();

const MainLayout = () => {
  return (
    <>
      {/* استوری با پورتال دیده می شود*/}
      <div id='StoryModal'></div>

      {/* بنر بالای صفحه */}
      <div style={{
        height: '60px',
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center'
      }}>
        <img
          src="src/assets/IMGS/TopBanner.gif"
          alt="Top Banner"
          style={{ height: '100%', width: '100%', objectFit: 'cover' }}
        />
      </div>

      <Header />
      <Outlet />
      <Footer />
    </>
  )
}

function App() {
  const [product, setProduct] = useState();


  function getParams() {
    const { productId } = useParams();
    return productId
  }
  return (
    <Router>
      <ProductContext.Provider value={{ product, setProduct }}>

        <Routes>
          <Route path='/login' element={<Login />} />

          <Route path='/' element={<MainLayout />}>
            <Route index element={<Landing storyWrapperData={storyWrapperData} />} />
            <Route path='/product/:productId' element={<Product items={items} />} />
            <Route path="product/undefined" element={
              <div style={{ textAlign: 'center', marginTop: '50px' }}>
                <h1 dir='rtl' style={{ color: '#ed1944' }}>محصول مربوطه پیدا نشد</h1>
                <button onClick={() => window.location.href = '/'}>بازگشت به خانه</button>
              </div>
            } />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

      </ProductContext.Provider>
    </Router>
  );
}

export default App;