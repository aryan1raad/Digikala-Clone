import React, { useState } from 'react'
import styles from '../assets/Styles/Landing.module.css'
// import { createContext } from 'react'
import { useContext } from 'react'
import { ProductContext } from '../App'
import { Slider } from '../Components/Slider'
import { StoryWrapper } from '../Components/StoryWrapper'
import { QuickAccess } from '../Components/QuickAccess.tsx'
import { Pishnahad } from '../Components/Pishnahad'
import { Banners } from '../Components/Banners'
import { TakhfifBanners } from '../Components/TakhfifBanners'
import { Carousel } from '../Components/Carousel'
import { TwoBanner } from '../Components/TwoBanner'
import { BrandCraousel } from '../Components/BrandCraousel'

const formatWithComma = (num) => {
    return new Intl.NumberFormat().format(num);
} 
const takhfifPercent = (prevPrice , price) => {
    // عدد ضربدر منفی شده است تا تخفیف مثبت بیان شود
    return ((price/prevPrice)-1)*-100
}
const Landing = ({storyWrapperData}) => {
    const SliderIMGs = [
        // با استفاده از اسم فولدر سورس دقیق 
        {src: '/IMGS/banner1.webp' , category: 'mohafezat'} , {src: '/IMGS/banner2.webp' , category: 'supermarket'} , {src: '/IMGS/banner3.webp' , category: 'clothing'} , {src: '/IMGS/banner.jpg' , category: 'makeupCleaning'}
    ]
    const BannerIMGs1 = [{ src: '/IMGS/BannerIMGs1/1.webp' , category: 'jewlrey' }, { src: '/IMGS/BannerIMGs1/2.webp' , category: 'kitchen' }, { src: '/IMGS/BannerIMGs1/3.webp' , category: 'mobile' }, { src: '/IMGS/BannerIMGs1/4.webp' , category: 'massage' }];
    const BannerIMGs2 = [{ src: '/IMGS/BannerIMGs2/1.webp' , category: 'lastic'}, { src: '/IMGS/BannerIMGs2/2.webp' , category: 'jewlrey'}, { src: '/IMGS/BannerIMGs2/3.webp' , category: 'health'}, { src: '/IMGS/BannerIMGs2/4.webp' , category: 'supermarket'}];
    const PishnahadIMGsDetail = [
        {img: '/IMGS/PishnahadIMGs/1.webp' , title: 'کپسول ویتامین ث و زینک 10 میلی گرمی  بسته 60 عددی' , prevPrice: formatWithComma(506000) , price:formatWithComma(154000), percent: Math.round(takhfifPercent(506000,154000)) , id:1},
        {img: '/IMGS/PishnahadIMGs/2.webp' , title: 'هدفون بلوتوثی ورنا مدل Airpods pro K14' , prevPrice: formatWithComma(810000) , price:formatWithComma(565000), percent: Math.round(takhfifPercent(810000,565000)) , id:2},
        {img: '/IMGS/PishnahadIMGs/4.webp' , title: 'گوشی موبایل اپل مدل iPhone 15 Ch دو سیم‌ کارت ظرفیت 128 گیگابایت و رم 6 گیگابایت ' , prevPrice: formatWithComma(145999000) , price:formatWithComma(142999000), percent: Math.round(takhfifPercent(145999000,142999000)) , id:3},
        {img: '/IMGS/PishnahadIMGs/3.webp' , title: 'کلاژینو بیوتی سه بسته 30 عددی' , prevPrice: formatWithComma(7500000) , price:formatWithComma(3488980), percent: Math.round(takhfifPercent(7500000,3488980)) , id:4},
        {img: '/IMGS/PishnahadIMGs/5.webp' , title: ' هدفون بی سیم ادیفایر مدل X3' , prevPrice: formatWithComma(1049000) , price:formatWithComma(799000), percent: Math.round(takhfifPercent(1049000,799000)) , id:5},
        {img: '/IMGS/PishnahadIMGs/6.webp' , title: 'جوراب ساق بلند مردانه اسپست مدل ASP-XSH-VRTAA1 مجموعه 3 عددی' , prevPrice: formatWithComma(600000) , price:formatWithComma(349900), percent: Math.round(takhfifPercent(600000,349900)) , id:6},
        {img: '/IMGS/PishnahadIMGs/7.webp' , title: 'کتاب دیدار با تاریکی اثر محمدعلی حمصیان انتشارات کتابستان معرفت' , prevPrice: formatWithComma(332000) , price:formatWithComma(250000), percent: Math.round(takhfifPercent(332000,250000)) , id:7},
        {img: '/IMGS/PishnahadIMGs/8.webp' , title: 'کرم آبرسان صورت گلاما مدل Hyaluronic Acid مناسب برای انواع پوست حجم 50 میلی‌لیتر' , prevPrice: formatWithComma(1450000) , price:formatWithComma(180000), percent: Math.round(takhfifPercent(1450000,180000)) , id:8},
        {img: '/IMGS/PishnahadIMGs/9.webp' , title: 'کرم مرطوب کننده دست آرت وینا مدل اوره 10 درصد مناسب پوست خشک و آسیب دیده حجم 50 میلی لیتر' , prevPrice: formatWithComma(1485000) , price:formatWithComma(499900), percent: Math.round(takhfifPercent(1485000,499900)) , id:9},
        {img: '/IMGS/PishnahadIMGs/10.webp' , title: 'کرم آبرسان صورت آرت وینا مدل HA+ مناسب انواع پوست حجم 50 میلی لیتر' , prevPrice: formatWithComma(1222000) , price:formatWithComma(475000), percent: Math.round(takhfifPercent(1222000,475000)) , id:10},
        {img: '/IMGS/PishnahadIMGs/11.webp' , title: 'کرم دست فوق سبک و آبرسان مورینگا اِمو مدل 1 انواع پوست کاسه‌ای 250 میلی‌لیتر' , prevPrice: formatWithComma(230000) , price:formatWithComma(115500), percent: Math.round(takhfifPercent(230000,115500)) , id:11},

    ]
    const TakhfifIMGs = ['/IMGS/TakhfifIMGs/takhfif-Left/1.webp' , '/IMGS/TakhfifIMGs/takhfif-Left/2.webp' , '/IMGS/TakhfifIMGs/takhfif-Left/3.webp' , '/IMGS/TakhfifIMGs/takhfif-Left/4.webp' , '/IMGS/TakhfifIMGs/takhfif-Left/5.webp' ,];
    const BrandCraouselImgs = ['/IMGS/BrandCraouselImgs/1.png' , '/IMGS/BrandCraouselImgs/2.png' , '/IMGS/BrandCraouselImgs/3.jpg' , '/IMGS/BrandCraouselImgs/4.jpg' , '/IMGS/BrandCraouselImgs/5.jpg' , '/IMGS/BrandCraouselImgs/7.png' , '/IMGS/BrandCraouselImgs/8.jpg', '/IMGS/BrandCraouselImgs/9.png' , '/IMGS/BrandCraouselImgs/10.jpg' , '/IMGS/BrandCraouselImgs/11.png' , '/IMGS/BrandCraouselImgs/1.png' , '/IMGS/BrandCraouselImgs/2.png' , '/IMGS/BrandCraouselImgs/3.jpg' , '/IMGS/BrandCraouselImgs/4.jpg' , '/IMGS/BrandCraouselImgs/5.jpg' , '/IMGS/BrandCraouselImgs/7.png' , '/IMGS/BrandCraouselImgs/8.jpg', '/IMGS/BrandCraouselImgs/9.png' , '/IMGS/BrandCraouselImgs/10.jpg' , '/IMGS/BrandCraouselImgs/11.png']
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
                <StoryWrapper storyWrapperData={storyWrapperData}/>
                <Slider SliderIMGs={SliderIMGs}/>
                <QuickAccess />
                <Pishnahad img={PishnahadIMGsDetail}/>
                <Banners img={BannerIMGs1}/>
                <TakhfifBanners imgLeft={TakhfifIMGs}/> 
                <Banners img={BannerIMGs2}/>
                <Carousel /> 
                {/* کاروسل عکس های ثابت دارد پس دیتای آرایه ی ان را نمی فرستیم */}
                <TwoBanner img1={'/IMGS/TwoBanner/1.webp'} img2={'/IMGS/TwoBanner/2.webp'} />
                <BrandCraousel img={BrandCraouselImgs} />
            </div>
        </>
    )
}
export default Landing