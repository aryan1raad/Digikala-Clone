import { useEffect, useState } from 'react'
import { createContext } from 'react'
import { BrowserRouter as Router, Routes, Route, useParams, Outlet, Navigate, data } from 'react-router-dom'
import type { ProductContextType } from './types/context'
import type { Product } from './types/product'
import './App.css'
import './assets/Styles/Header.css'
import GetMainItems from './CustomHooks/Data/GetMainItems'
import Header from './Components/Layout/Header.tsx';
import Landing from './Pages/Landing';
import ProductPage from './Pages/Product'
import Footer from './Components/Layout/Footer.tsx';
import Login from './Pages/Login'
import SearchedPage from './Pages/SearchedPage'
import useLocalStorage from './CustomHooks/Data/useLocalStorage'
import Sabad from './Pages/Sabad'

type StoryDataType = {
  img: string;
  title: string;
  video: string;
  productImg: string;
  textContent: string;
  id: number;
};

// داده‌های استوری
const Dadaye1: StoryDataType = {
  img: '/IMGS/StoryImgs/Namayangar/Atr.jpg',
  title: 'عطر سیمرغ',
  video: '/videos/simorgh.mp4',
  productImg: '/IMGS/StoryImgs/ProductImages/perfume.jpg',
  textContent: 'اکستریت د پرفیوم زنانه عطر یانی مدل سیمرغ با رایحه معتدل حجم 50 میلی‌لیتر',
  id: 12
};

const Dadaye2: StoryDataType = {
  img: '/IMGS/StoryImgs/Namayangar/zafferanNamaye.png',
  title: 'زعفران مصطفوی - 4.608 گرم',
  video: '/videos/zaaferan.mp4',
  productImg: '/IMGS/StoryImgs/ProductImages/zaaferan.jpg',
  textContent: 'برنج هیمه با ۴۰ سال سابقه بهترین‌ برنج‌ها را از مزارع مازندران دستچین کرده و به سفره‌های شما می‌آورد.',
  id: 13
};

const items = GetMainItems();
const storyWrapperData: StoryDataType[] = [
  Dadaye1, Dadaye1, Dadaye2, Dadaye1, Dadaye2,
  Dadaye1, Dadaye2, Dadaye1, Dadaye2, Dadaye2,
  Dadaye1, Dadaye2, Dadaye1
];

export const ProductContext = createContext<ProductContextType | undefined>(undefined);

const MainLayout = () => {
  //نسخه پرامیس
  useEffect(() => {
    fetch('http://localhost:3001/products')
    .then((res) => res.json())
    .then((data) => console.log(data))

    .catch(err => {
      throw new Error(err)
    })
  }, [])

  //نسخه غیرهمگام 
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try{
  //       const res = await fetch('http://localhost:3001/products');
  //       if(!res.ok) throw new Error('خطا در دریافت داده ها ');
  //       const data = await res.json();
  //       console.log(data)
  //     }
  //     catch(err) { console.log(err)}
  //   }
  //   fetchData();
  // }, [])
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
          src="/IMGS/TopBanner.gif"
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
  const [product, setProduct] = useState<Product | null>(null);

  const MyInitialUser = {
    isAuthorized: true,
    userName: 'Aryan Raad'
  }

  //ذخیره در لوکال استورج
  const { state: user, setState: setUser } = useLocalStorage('user', {
    isAuthorized: false,
    userName: null,
    numOrMail: null
  })

  const {
    state: selectedProducts,
    setState: SetSelectedProducts,
    actions: { removeItem, clearAll }
  } = useLocalStorage<Product[]>('selectedProducts', []);
  return (
    <Router>
      <ProductContext.Provider value={{ product, setProduct, items, user, setUser }}>
        <Routes>
          <Route path='/login' element={<Login MyInitialUser={MyInitialUser} />} />

          <Route path='/' element={<MainLayout />}>
            <Route index element={<Landing storyWrapperData={storyWrapperData} />} />
            <Route path='/search/' element={<SearchedPage />} />
            <Route path='search/:category' element={<SearchedPage />} />
            <Route path='/product/:productId' element={<ProductPage SetSelectedProducts={SetSelectedProducts} selectedProducts={selectedProducts} />} />
            <Route path='/sabaadeKharid' element={<Sabad selectedProduct={selectedProducts} SetSelectedProducts={SetSelectedProducts} removeItem={removeItem} clearAll={clearAll} />} />
            <Route path="product/undefined" element={
              <div style={{ textAlign: 'center', marginTop: '50px' }}>
                <h1 dir='rtl' style={{ color: '#ed1944' }}>محصول مربوطه پیدا نشد</h1>
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