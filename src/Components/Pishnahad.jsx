import React, { useEffect, useRef } from 'react'
import { useContext } from 'react'
import { ProductContext } from '../App'
import { Link } from 'react-router-dom';
import styles from '../assets/Styles/Pishnahad.module.css'

//اجرایی سازی با swiper js
import 'swiper/css'
import 'swiper/css/mousewheel'
//ایمپورت ماژول
import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel , FreeMode } from 'swiper/modules'

export const Pishnahad = ({img}) => {
  const RadiusCheck = (index , lastIndex) => {
    if(index===lastIndex) 
      return{borderBottomLeftRadius: '8px',borderTopLeftRadius: '8px'}
    else if(index===0)
      return{borderBottomRightRadius: '8px',borderTopRightRadius: '8px'}
    else return null
  }
  // const { product } = useContext(ProductContext);
  const { setProduct } = useContext(ProductContext);
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
          {img.map((ProductImg , index) => {
            const lastIndex = img.length - 1;
            //استایل سویپر اسلاید مهم است
            return(
              <SwiperSlide key={index} style={{ width: 'auto'}}>
                <Link to = {`product/${ProductImg.id}`} onClick={()=> { 
                  setProduct(ProductImg);
                  console.log(ProductImg)
                 }}>
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
                        <img src="src/assets/IMGS/PishnahadIMGs/SVGs/toman.png" style={{width:'11px'}}/>{ProductImg.price}
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
            <img src="src/assets/IMGS/PishnahadIMGs/SVGs/Amazings.svg" />
          </div>
          <div className={styles.img2cont}>
            <img src="src/assets/IMGS/PishnahadIMGs/SVGs/Amazing2.svg" />
          </div>
        </div>
        <div className={styles.moshahede}>
          مشاهده ی همه
        </div>
      </div>

    </div>  
  )
}
