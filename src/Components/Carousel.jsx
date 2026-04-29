import React from 'react'
import styles from '../assets/Styles/Carousel.module.css'
//اجرایی سازی با swiper js
import 'swiper/css'
import 'swiper/css/mousewheel'
import 'swiper/css/free-mode'
//ایمپورت ماژول ها
import { Swiper , SwiperSlide } from 'swiper/react'
import { Mousewheel , FreeMode } from 'swiper/modules'
import { Link } from 'react-router-dom'

export const Carousel = () => {
  return (
    <div className={styles.firstCont}>
        <h3 className={styles.bigTitle}>خرید بر اساس دسته‌بندی</h3>
        <div dir='rtl' className={styles.Dastebandi}>
            <Swiper
                slidesPerView={'auto'}
                spaceBetween={85}
                freeMode={{
                    enabled : true,
                    sticky : false,
                    momentum : true,
                    momentumRatio: 0.5
                }}

                speed={100}

                mousewheel={{
                    forceToAxis: true,
                    releaseOnEdges: false,
                    sensitivity: 0.4
                }}
                modules={[Mousewheel,FreeMode]}
                className='mySwiper'
            >

                <SwiperSlide style={{ width: '100px' , display: 'flex' , }}>
                    <div className={styles.TwoCont}>
                        <Link to={'/search/mobile'} style={{color: 'black'}} className={styles.productCont}>
                            <div className={styles.imgCont}>
                                <img src="src/assets/IMGS/Dastebandi/phone.jpg" className={styles.imgCont}/>
                            </div>
                            <p className={styles.text}>موبایل</p>
                        </Link>
                        <Link to={'/search/mobile'} style={{color: 'black'}} className={styles.productCont}>
                            <div className={styles.imgCont}>
                                <img src="src/assets/IMGS/Dastebandi/phone.jpg" className={styles.imgCont}/>
                            </div>
                            <p className={styles.text}>موبایل</p>
                        </Link>
                    </div>
                </SwiperSlide>

                <SwiperSlide style={{ width: '100px'}}>
                    <div className={styles.TwoCont}>

                        <Link to={'/search/laptop'} style={{color: 'black'}} className={styles.productCont}>
                            <div className={styles.imgCont}>
                                <img src="src/assets/IMGS/Dastebandi/laptop.jpg" className={styles.imgCont}/>
                            </div>
                            <p className={styles.text}>لپتاپ</p>
                        </Link>

                        <Link to={'/search/laptop'} style={{color: 'black'}} className={styles.productCont}>
                            <div className={styles.imgCont}>
                                <img src="src/assets/IMGS/Dastebandi/laptop.jpg" className={styles.imgCont}/>
                            </div>
                            <p className={styles.text}>لپتاپ</p>
                        </Link>
                    </div>
                </SwiperSlide>

                <SwiperSlide style={{ width: '100px'}}>
                    <div className={styles.TwoCont}>
                        <Link to={'/search/digitalProducts'} style={{color: 'black'}} className={styles.productCont}>
                            <div className={styles.imgCont}>
                                <img src="src/assets/IMGS/Dastebandi/digital.jpg" className={styles.imgCont}/>
                            </div>
                            <p className={styles.text}>کالای دیجیتال</p>
                        </Link>
                        <Link to={'/search/digitalProducts'} style={{color: 'black'}} className={styles.productCont}>
                            <div className={styles.imgCont}>
                                <img src="src/assets/IMGS/Dastebandi/digital.jpg" className={styles.imgCont}/>
                            </div>
                            <p className={styles.text}>کالای دیجیتال</p>
                        </Link>
                    </div>
                </SwiperSlide>

                <SwiperSlide style={{ width: '100px'}}>
                    <div className={styles.TwoCont}>

                        <Link to={'/search/kitchen'} style={{color: 'black'}} className={styles.productCont}>                        
                            <div className={styles.imgCont}>
                                <img src="src/assets/IMGS/Dastebandi/ashpazkhane.jpg" className={styles.imgCont}/>
                            </div>
                            <p className={styles.text}>خانه و آشپزخانه</p>
                        </Link>

                        <Link to={'/search/kitchen'} style={{color: 'black'}} className={styles.productCont}>                        
                            <div className={styles.imgCont}>
                                <img src="src/assets/IMGS/Dastebandi/ashpazkhane.jpg" className={styles.imgCont}/>
                            </div>
                            <p className={styles.text}>خانه و آشپزخانه</p>
                        </Link>
                    </div>
                </SwiperSlide>

                <SwiperSlide style={{ width: '100px'}}>
                    <div className={styles.TwoCont}>
                        
                        <Link to={'/search/homeAppliance'} style={{color: 'black'}} className={styles.productCont}>
                            <div className={styles.imgCont}>
                                <img src="src/assets/IMGS/Dastebandi/lavazemKhanegi.jpg" className={styles.imgCont}/>
                            </div>
                            <p className={styles.text}>لوازم خانگی برقی</p>
                        </Link>
                        
                        <Link to={'/search/homeAppliance'} style={{color: 'black'}} className={styles.productCont}>
                            <div className={styles.imgCont}>
                                <img src="src/assets/IMGS/Dastebandi/lavazemKhanegi.jpg" className={styles.imgCont}/>
                            </div>
                            <p className={styles.text}>لوازم خانگی برقی</p>
                        </Link>
                    </div>
                </SwiperSlide>
                
                <SwiperSlide style={{ width: '100px'}}>
                    <div className={styles.TwoCont}>

                        <Link to={'/search/makeupCleaning'} style={{color: 'black'}} className={styles.productCont}>
                            <div className={styles.imgCont}>
                                <img src="src/assets/IMGS/Dastebandi/arayeshi.jpg" className={styles.imgCont}/>
                            </div>
                            <p className={styles.text}>آرایشی و بهداشتی</p>
                        </Link>

                        <Link to={'/search/makeupCleaning'} style={{color: 'black'}} className={styles.productCont}>
                            <div className={styles.imgCont}>
                                <img src="src/assets/IMGS/Dastebandi/arayeshi.jpg" className={styles.imgCont}/>
                            </div>
                            <p className={styles.text}>آرایشی و بهداشتی</p>
                        </Link>
                    </div>
                </SwiperSlide>

                <SwiperSlide style={{ width: '100px'}}>
                    <div className={styles.TwoCont}>

                        <Link to={'/search/clothing'} style={{color: 'black'}} className={styles.productCont}>
                            <div className={styles.imgCont}>
                                <img src="src/assets/IMGS/Dastebandi/mod.jpg" className={styles.imgCont}/>
                            </div>
                            <p className={styles.text}>مد و پوشاک</p>
                        </Link>

                        <Link to={'/search/clothing'} style={{color: 'black'}} className={styles.productCont}>
                            <div className={styles.imgCont}>
                                <img src="src/assets/IMGS/Dastebandi/mod.jpg" className={styles.imgCont}/>
                            </div>
                            <p className={styles.text}>مد و پوشاک</p>
                        </Link>
                    </div>
                </SwiperSlide>

                <SwiperSlide style={{ width: '100px'}}>
                    <div className={styles.TwoCont}>

                        <Link to={'/search/jewlrey'} style={{color: 'black'}} className={styles.productCont}>
                            <div className={styles.imgCont}>
                                <img src="src/assets/IMGS/Dastebandi/tala.jpg" className={styles.imgCont}/>
                            </div>
                            <p className={styles.text}>طلا و نقره</p>
                        </Link>

                        <Link to={'/search/jewlrey'} style={{color: 'black'}} className={styles.productCont}>
                            <div className={styles.imgCont}>
                                <img src="src/assets/IMGS/Dastebandi/tala.jpg" className={styles.imgCont}/>
                            </div>
                            <p className={styles.text}>طلا و نقره</p>
                        </Link>
                    </div>
                </SwiperSlide>

                <SwiperSlide style={{ width: '100px'}}>
                    <div className={styles.TwoCont}>

                        <Link to={'/search/carMotor'} style={{color: 'black'}} className={styles.productCont}>
                            <div className={styles.imgCont}>
                                <img src="src/assets/IMGS/Dastebandi/khodro.jpg" className={styles.imgCont}/>
                            </div>
                            <p className={styles.text}>خودرو و موتورسیکلت</p>
                        </Link>

                        <Link to={'/search/carMotor'} style={{color: 'black'}} className={styles.productCont}>
                            <div className={styles.imgCont}>
                                <img src="src/assets/IMGS/Dastebandi/khodro.jpg" className={styles.imgCont}/>
                            </div>
                            <p className={styles.text}>خودرو و موتورسیکلت</p>
                        </Link>
                    </div>
                </SwiperSlide>
                
            </Swiper>
        </div>
    </div>
  )
}
