import React from 'react'
import styles from '../assets/Styles/BrandCraousel.module.css'

//اجرایی سازی با swiper js
import 'swiper/css'
import 'swiper/css/mousewheel'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'; // ✅ اضافه کردن استایل نویگیشن

//ایمپورت ماژول ها
import { Swiper , SwiperSlide } from 'swiper/react'
import { Mousewheel , FreeMode , Navigation } from 'swiper/modules'

export const BrandCraousel = ({img}) => {

    const checkBorderRightRadius = (index) => {
        if(index===0){
            return null
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
                    momentumRatio: 1
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
                {img.map((product , index) => {
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
