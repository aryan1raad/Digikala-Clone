import React, { useEffect, useRef } from 'react'
import { useProductContext } from '../CustomHooks/useProductContext'
import { Link } from 'react-router-dom';
import styles from '../assets/Styles/Pishnahad.module.css'
import { Product } from '../types/product';
//اجرایی سازی با swiper js
// @ts-ignore
import 'swiper/css'
// @ts-ignore
import 'swiper/css/mousewheel'
//ایمپورت ماژول
import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel , FreeMode } from 'swiper/modules'

export const Pishnahad = ({img} : {img: Product[]}) => {
  const RadiusCheck = (index:number , lastIndex:number) => {
    if(index===lastIndex) 
      return{borderBottomLeftRadius: '8px',borderTopLeftRadius: '8px'}
    else if(index===0)
      return{borderBottomRightRadius: '8px',borderTopRightRadius: '8px'}
    else return undefined
  }

  return (
    <div className={styles.Pishnahad}>
      <div dir='rtl' className={styles.left}>
        <Swiper
          // ref={swiperRef}
          slidesPerView={'auto'}
          spaceBetween={'10px'}
          freeMode={{
            enabled: true,
            sticky: false, // اسلایدها به طور خودکار به مرکز اسلاید بعدی نمی‌چسبند
            momentum: true,
            momentumRatio: 0.5
          }}

          speed={100}

          mousewheel={{
            forceToAxis: true,
            releaseOnEdges: false,
            sensitivity: 0.4
          }}
          modules={[Mousewheel, FreeMode]}
          className="mySwiper"
        >
          {img.map((ProductImg , index:number) => {
            
            const lastIndex = img.length - 1;
            //استایل سویپر اسلاید مهم است
            return(
              <SwiperSlide key={index} style={{ width: 'auto'}}>
                <Link to = {`product/${ProductImg.id}`}>

                  {/* فراخوانی تابع RadiusCheck برای کِرو دور پروداکت اول و آخر */}
                  <div className={styles.card } data-id={index} style={RadiusCheck(index , lastIndex)}>
                    <div className={styles.productImgCont}>
                      <img src={ProductImg.img} />
                    </div>
                    <h3 className={styles.productTitle}>
                      {ProductImg.title}
                    </h3>
                    <div className={styles.pricePercent}>
                      <span className={styles.price} dir='ltr'>
                        <img src="/IMGS/PishnahadIMGs/SVGs/toman.png" style={{width:'11px'}}/>{ProductImg.price}
                      </span >
                      <div className={styles.percent}>
                        {ProductImg.percent}%
                      </div>
                    </div>
                    <span className={styles.prevPrice}>
                      {ProductImg.prevPrice}
                    </span>
                  </div>
                </Link>
              </SwiperSlide>
            )
          })}
        </Swiper>
      </div>

      <div className={styles.right}>
        <div className={styles.imgConts}>
          <div className={styles.img1cont}>
            <img src="/IMGS/PishnahadIMGs/SVGs/Amazings.svg" />
          </div>
          <div className={styles.img2cont}>
            <img src="/IMGS/PishnahadIMGs/SVGs/Amazing2.svg" />
          </div>
        </div>
        <div className={styles.moshahede}>
          مشاهده ی همه
        </div>
      </div>

    </div>  
  )
}
