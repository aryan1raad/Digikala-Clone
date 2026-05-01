import { useEffect, useState } from 'react'
import { createContext } from 'react'
import { BrowserRouter as Router, Routes, Route, useParams, Outlet, Navigate } from 'react-router-dom'
import './App.css'
import './assets/Styles/Header.css'
import GetMainItems from './CustomHooks/Data/GetMainItems'
import Header from './Components/Layout/header';
import Landing from './Pages/Landing';
import Product from './Pages/Product'
import Footer from './Components/Layout/Footer';
import Login from './Pages/Login'
import SearchedPage from './Pages/SearchedPage'
import useLocalStorage from './CustomHooks/Data/useLocalStorage'
import Sabad from './Pages/Sabad'


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

const items = GetMainItems();
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

  const MyInitialUser = {
    isAuthorized: true,
    userName: 'Aryan Raad'
  }

  //ذخیره در لوکال استورج
  const [user , setUser] = useLocalStorage('user' , {
    isAuthorized : false,
    userName: null,
    numOrMail: null
  })

  const [selectedProducts , SetSelectedProducts] = useLocalStorage( 'selectedProducts' , [])
  return (
    <Router>
      <ProductContext.Provider value={{ product, setProduct, items, user, setUser }}>

        <Routes>
          <Route path='/login' element={<Login MyInitialUser={MyInitialUser} />} />

          <Route path='/' element={<MainLayout />}>
            <Route index element={<Landing storyWrapperData={storyWrapperData} />} />
            <Route path='/search/' element={<SearchedPage />} />
            <Route path='search/:category' element={<SearchedPage />} />
            <Route path='/product/:productId' element={<Product SetSelectedProducts={SetSelectedProducts} selectedProducts={selectedProducts}/>} />
            <Route path='/sabaadeKharid' element={<Sabad selectedProduct={selectedProducts}/>} />
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