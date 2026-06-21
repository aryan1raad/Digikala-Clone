import React from 'react'
import styles from '../assets/Styles/BrandCraousel.module.scss'

//اجرایی سازی با swiper js
// @ts-ignore
import 'swiper/css'
// @ts-ignore
import 'swiper/css/mousewheel'
// @ts-ignore
import 'swiper/css/free-mode'
// @ts-ignore
import 'swiper/css/navigation'; // ✅ اضافه کردن استایل نویگیشن

//ایمپورت ماژول ها
import { Swiper , SwiperSlide } from 'swiper/react'
import { Mousewheel , FreeMode , Navigation } from 'swiper/modules'
import { Product } from '../types/product'

export const BrandCraousel = ({img} : { img: string[] }) => {
    
    const checkBorderRightRadius = (index: number) => {
        if(index===0){
            return undefined
        }
        else 
            return {borderRight:'1px solid #f0f0f1'}
    }

  return (
    <div className={styles.BrandCraousel}>
        <p className={styles.title}>محبوب ترین برند ها</p>
        <div dir='rtl'>
            <Swiper
                navigation={true}
                slidesPerView={'auto'}
                spaceBetween={0}
                freeMode={{
                    enabled: true,
                    sticky:false,
                    momentum: true,
                    momentumRatio: 0.5,
                    momentumBounce: true, // فعال کردن اثر بازگشت 
                }}
                speed={300}
                mousewheel={{
                    forceToAxis: true,
                    releaseOnEdges:false,
                    sensitivity: 0.1
                }}
                modules={[FreeMode,Mousewheel]}
                className='mySwiper'
            >
                {img.map((product: string , index: number) => {
                    return(
                    <SwiperSlide style={{width:'140px' , height: '140px'}} key={index}>
                        <div style={ checkBorderRightRadius(index)} className={styles.brandCont}>
                            <img src={product} alt={`brand-${index}`}/>
                        </div>
                    </SwiperSlide>
                    )
                })}

            </Swiper>
        </div>
    </div>
  )
}