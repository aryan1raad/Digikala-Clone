import { useEffect, useState } from 'react'
import { createContext } from 'react'
import { BrowserRouter as Router, Routes, Route, useParams, Outlet, Navigate, data } from 'react-router-dom'
import type { ProductContextType, UserType } from './types/context'
import './App.css'
import './assets/Styles/Header.css'
import Header from './Components/Layout/Header';
import Landing from './Pages/Landing';
import ProductPage from './Pages/Product'
import Footer from './Components/Layout/Footer';
import Login from './Pages/Login.tsx'
import SearchedPage from './Pages/SearchedPage.tsx'
import useLocalStorage from './CustomHooks/useLocalStorage'
import Sabad from './Pages/Sabad'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useGetProducts } from '../DB/services/GetMethod'

export type StoryDataType = {
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

const storyWrapperData: StoryDataType[] = [
  Dadaye1, Dadaye1, Dadaye2, Dadaye1, Dadaye2,
  Dadaye1, Dadaye2, Dadaye1, Dadaye2, Dadaye2,
  Dadaye1, Dadaye2, Dadaye1
];

export const ProductContext = createContext<ProductContextType | undefined>(undefined);

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

const queryClient = new QueryClient();
function App() {

  const MyInitialUser = {
    isAuthorized: true,
    userName: 'Aryan Raad'
  }

  //ذخیره در لوکال استورج
  const { state: user, setState: setUser } = useLocalStorage<UserType>('user', {
    isAuthorized: false,
    userName: null,
    numOrMail: null
  })

  return (
    <Router>
      <QueryClientProvider client={queryClient}>
        <ProductContext.Provider value={{ user, setUser }}>
          <Routes>
            <Route path='/login' element={<Login MyInitialUser={MyInitialUser} />} />

            <Route path='/' element={<MainLayout />}>
              <Route index element={<Landing storyWrapperData={storyWrapperData} />} />
              <Route path='/search/' element={<SearchedPage />} />
              <Route path='search/:category' element={<SearchedPage />} />
              <Route path='/product/:productId' element={<ProductPage  />} />
              <Route path='/sabaadeKharid' element={<Sabad />} />
              <Route path="product/undefined" element={
                <div style={{ textAlign: 'center', marginTop: '50px' }}>
                  <h1 dir='rtl' style={{ color: '#ed1944' }}>محصول مربوطه پیدا نشد</h1>
                </div>
              } />
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>

        </ProductContext.Provider>
      </QueryClientProvider>
    </Router>
  );
}

export default App;