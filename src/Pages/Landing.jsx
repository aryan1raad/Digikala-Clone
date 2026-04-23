import React, { useState } from 'react'
import styles from '../assets/Styles/Landing.module.css'
// import { createContext } from 'react'
import { useContext } from 'react'
import { ProductContext } from '../App'
import { Slider } from '../Components/Slider'
import { StoryWrapper } from '../Components/StoryWrapper'
import { QuickAccess } from '../Components/QuickAccess'
import { Pishnahad } from '../Components/Pishnahad'
import { Banners } from '../Components/Banners'
import { TakhfifBanners } from '../Components/TakhfifBanners'
import { Carousel } from '../Components/Carousel'
import { TwoBanner } from '../Components/TwoBanner'
import { BrandCraousel } from '../Components/BrandCraousel'

// export const ProductContext = createContext();
const formatWithComma = (num) => {
    return new Intl.NumberFormat().format(num);
} 
const takhfifPercent = (prevPrice , price) => {
    // عدد ضربدر منفی شده است تا تخفیف مثبت بیان شود
    return ((price/prevPrice)-1)*-100
}
export const Landing = ({storyWrapperData}) => {
    const SliderIMGs = [
        // با استفاده از اسم فولدر سورس دقیق 
        '/src/assets/IMGS/banner1.webp' , '/src/assets/IMGS/banner2.webp' , '/src/assets/IMGS/banner3.webp' , '/src/assets/IMGS/banner.jpg'
    ]
    const BannerIMGs1 = ['/src/assets/IMGS/BannerIMGs1/1.webp', '/src/assets/IMGS/BannerIMGs1/2.webp', '/src/assets/IMGS/BannerIMGs1/3.webp', '/src/assets/IMGS/BannerIMGs1/4.webp',];
    const BannerIMGs2 = ['/src/assets/IMGS/BannerIMGs2/1.webp', '/src/assets/IMGS/BannerIMGs2/2.webp', '/src/assets/IMGS/BannerIMGs2/3.webp', '/src/assets/IMGS/BannerIMGs2/4.webp',];
    const PishnahadIMGsDetail = [
        {img: '/src/assets/IMGS/PishnahadIMGs/1.webp' , title: 'کپسول ویتامین ث و زینک 10 میلی گرمی  بسته 60 عددی' , prevPrice: formatWithComma(506000) , price:formatWithComma(154000), percent: Math.round(takhfifPercent(506000,154000)) , id:1},
        {img: '/src/assets/IMGS/PishnahadIMGs/2.webp' , title: 'هدفون بلوتوثی ورنا مدل Airpods pro K14' , prevPrice: formatWithComma(810000) , price:formatWithComma(565000), percent: Math.round(takhfifPercent(810000,565000)) , id:2},
        {img: '/src/assets/IMGS/PishnahadIMGs/4.webp' , title: 'گوشی موبایل اپل مدل iPhone 15 Ch دو سیم‌ کارت ظرفیت 128 گیگابایت و رم 6 گیگابایت ' , prevPrice: formatWithComma(145999000) , price:formatWithComma(142999000), percent: Math.round(takhfifPercent(145999000,142999000)) , id:3},
        {img: '/src/assets/IMGS/PishnahadIMGs/3.webp' , title: 'کلاژینو بیوتی سه بسته 30 عددی' , prevPrice: formatWithComma(7500000) , price:formatWithComma(3488980), percent: Math.round(takhfifPercent(7500000,3488980)) , id:4},
        {img: '/src/assets/IMGS/PishnahadIMGs/5.webp' , title: ' هدفون بی سیم ادیفایر مدل X3' , prevPrice: formatWithComma(1049000) , price:formatWithComma(799000), percent: Math.round(takhfifPercent(1049000,799000)) , id:5},
        {img: '/src/assets/IMGS/PishnahadIMGs/6.webp' , title: 'جوراب ساق بلند مردانه اسپست مدل ASP-XSH-VRTAA1 مجموعه 3 عددی' , prevPrice: formatWithComma(600000) , price:formatWithComma(349900), percent: Math.round(takhfifPercent(600000,349900)) , id:6},
        {img: '/src/assets/IMGS/PishnahadIMGs/7.webp' , title: 'کتاب دیدار با تاریکی اثر محمدعلی حمصیان انتشارات کتابستان معرفت' , prevPrice: formatWithComma(332000) , price:formatWithComma(250000), percent: Math.round(takhfifPercent(332000,250000)) , id:7},
        {img: '/src/assets/IMGS/PishnahadIMGs/8.webp' , title: 'کرم آبرسان صورت گلاما مدل Hyaluronic Acid مناسب برای انواع پوست حجم 50 میلی‌لیتر' , prevPrice: formatWithComma(1450000) , price:formatWithComma(180000), percent: Math.round(takhfifPercent(1450000,180000)) , id:8},
        {img: '/src/assets/IMGS/PishnahadIMGs/9.webp' , title: 'کرم مرطوب کننده دست آرت وینا مدل اوره 10 درصد مناسب پوست خشک و آسیب دیده حجم 50 میلی لیتر' , prevPrice: formatWithComma(1485000) , price:formatWithComma(499900), percent: Math.round(takhfifPercent(1485000,499900)) , id:9},
        {img: '/src/assets/IMGS/PishnahadIMGs/10.webp' , title: 'کرم آبرسان صورت آرت وینا مدل HA+ مناسب انواع پوست حجم 50 میلی لیتر' , prevPrice: formatWithComma(1222000) , price:formatWithComma(475000), percent: Math.round(takhfifPercent(1222000,475000)) , id:10},
        {img: '/src/assets/IMGS/PishnahadIMGs/11.webp' , title: 'کرم دست فوق سبک و آبرسان مورینگا اِمو مدل 1 انواع پوست کاسه‌ای 250 میلی‌لیتر' , prevPrice: formatWithComma(230000) , price:formatWithComma(115500), percent: Math.round(takhfifPercent(230000,115500)) , id:11},

    ]
    const TakhfifIMGs = ['/src/assets/IMGS/TakhfifIMGs/takhfif-Left/1.webp' , '/src/assets/IMGS/TakhfifIMGs/takhfif-Left/2.webp' , '/src/assets/IMGS/TakhfifIMGs/takhfif-Left/3.webp' , '/src/assets/IMGS/TakhfifIMGs/takhfif-Left/4.webp' , '/src/assets/IMGS/TakhfifIMGs/takhfif-Left/5.webp' ,];
    const BrandCraouselImgs = ['/src/assets/IMGS/BrandCraouselImgs/1.png' , '/src/assets/IMGS/BrandCraouselImgs/2.png' , '/src/assets/IMGS/BrandCraouselImgs/3.jpg' , '/src/assets/IMGS/BrandCraouselImgs/4.jpg' , '/src/assets/IMGS/BrandCraouselImgs/5.jpg' , '/src/assets/IMGS/BrandCraouselImgs/7.png' , '/src/assets/IMGS/BrandCraouselImgs/8.jpg', '/src/assets/IMGS/BrandCraouselImgs/9.png' , '/src/assets/IMGS/BrandCraouselImgs/10.jpg' , '/src/assets/IMGS/BrandCraouselImgs/11.png' , '/src/assets/IMGS/BrandCraouselImgs/1.png' , '/src/assets/IMGS/BrandCraouselImgs/2.png' , '/src/assets/IMGS/BrandCraouselImgs/3.jpg' , '/src/assets/IMGS/BrandCraouselImgs/4.jpg' , '/src/assets/IMGS/BrandCraouselImgs/5.jpg' , '/src/assets/IMGS/BrandCraouselImgs/7.png' , '/src/assets/IMGS/BrandCraouselImgs/8.jpg', '/src/assets/IMGS/BrandCraouselImgs/9.png' , '/src/assets/IMGS/BrandCraouselImgs/10.jpg' , '/src/assets/IMGS/BrandCraouselImgs/11.png']
    // const [product , setProduct] = useState(PishnahadIMGsDetail[0]);
    return (
        <>
            <div style={
                {   
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '16px'
                }
                }>
                {/* <ProductContext.Provider value={{product , setProduct}}> */}
                    <StoryWrapper storyWrapperData={storyWrapperData}/>
                    <Slider SliderIMGs={SliderIMGs}/>
                    <QuickAccess />
                    <Pishnahad img={PishnahadIMGsDetail}/>
                    <Banners img={BannerIMGs1}/>
                    <TakhfifBanners imgLeft={TakhfifIMGs}/> 
                    <Banners img={BannerIMGs2}/>
                    <Carousel /> 
                    {/* کاروسل عکس های ثابت دارد پس دیتای آرایه ی ان را نمی فرستیم */}
                    <TwoBanner img1={'/src/assets/IMGS/TwoBanner/1.webp'} img2={'/src/assets/IMGS/TwoBanner/2.webp'} />
                    <BrandCraousel img={BrandCraouselImgs} />
                {/* </ProductContext.Provider> */}
            </div>
        </>
    )
}
//ایمپورت کردن عکس ها برای آمادگی برای بیلد و دیپلوی
    // import banner1 from '../assets/IMGS/BannerIMGs1/banner1.webp';
    // import banner2 from '../assets/IMGS/BannerIMGs1/banner2.webp';
    // import banner3 from '../assets/IMGS/BannerIMGs1/banner3.webp';
    // import banner4 from '../assets/IMGS/banner.jpg'; 
//BannerIMGs1
    // import bannerImg1_1 from '../assets/IMGS/BannerIMGs1/1.webp';
    // import bannerImg1_2 from '../assets/IMGS/BannerIMGs1/2.webp';
    // import bannerImg1_3 from '../assets/IMGS/BannerIMGs1/3.webp';
    // import bannerImg1_4 from '../assets/IMGS/BannerIMGs1/4.webp';
//BannerIMGs2
    // import bannerImg2_1 from '../assets/IMGS/BannerIMGs2/1.webp';
    // import bannerImg2_2 from '../assets/IMGS/BannerIMGs2/2.webp';
    // import bannerImg2_3 from '../assets/IMGS/BannerIMGs2/3.webp';
    // import bannerImg2_4 from '../assets/IMGS/BannerIMGs2/4.webp';
//PishnahadIMGsDetail
    // import pishnahadImg1 from '../assets/IMGS/PishnahadIMGs/1.webp';
    // import pishnahadImg2 from '../assets/IMGS/PishnahadIMGs/2.webp';
//TakhfifIMGs
    // import takhfifImg1 from '../assets/IMGS/TakhfifIMGs/takhfif-Left/1.webp';
    // import takhfifImg2 from '../assets/IMGS/TakhfifIMGs/takhfif-Left/2.webp';
    // import takhfifImg3 from '../assets/IMGS/TakhfifIMGs/takhfif-Left/3.webp';
    // import takhfifImg4 from '../assets/IMGS/TakhfifIMGs/takhfif-Left/4.webp';
    // import takhfifImg5 from '../assets/IMGS/TakhfifIMGs/takhfif-Left/5.webp';
//اتمام ایمپورت
