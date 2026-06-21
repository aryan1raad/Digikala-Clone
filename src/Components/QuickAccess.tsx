import React from 'react'
import styles from '../assets/Styles/QuickAccess.module.scss'
export const QuickAccess = () => {
    return (
        <div className={styles.QuickAccess_Cont}>
            <div className={styles.QuickAccess}>
                <div className={styles.Quick}>
                    <div className={styles.QuickImgCont}>
                        <img src="/IMGS/LandingSVGs/shopping.png" />
                    </div>
                    <span>ارسال‌فوری خواربار</span>
                </div>

                <div className={styles.Quick}>
                    <div className={styles.QuickImgCont}>
                        <img src="/IMGS/LandingSVGs/Tala.png" />
                    </div>
                    <span>طلای دیجیتال</span>
                </div>
                <div className={styles.Quick}>
                    <div className={styles.QuickImgCont}>
                        <img src="/IMGS/LandingSVGs/truck.png" />
                    </div>
                    <span>ارسال‌رایگان</span>
                </div>
                <div className={styles.Quick}>
                    <div className={styles.QuickImgCont}>
                        <img src="/IMGS/LandingSVGs/tala2.png" />
                    </div>
                    <span>خرید آنی طلا</span>
                </div>                
                <div className={styles.Quick}>
                    <div className={styles.QuickImgCont}>
                        <img src="/IMGS/LandingSVGs/vaam.png" />
                    </div>
                    <span>وام بانکی دیجی پی</span>
                </div>
                <div className={styles.Quick}>
                    <div className={styles.QuickImgCont}>
                        <img src="/IMGS/LandingSVGs/taghvim.png" />
                    </div>
                    <span>ارسال‌فوری خواربار</span>
                </div>
                <div className={styles.Quick}>
                    <div className={styles.QuickImgCont}>
                        <img src="/IMGS/LandingSVGs/kune.png" />
                    </div>
                    <span>آرامش خود را حفظ کنید</span>
                </div>
                <div className={styles.Quick}>
                    <div className={styles.QuickImgCont}>
                        <img src="/IMGS/LandingSVGs/khune2.jpg" />
                    </div>
                    <span>خانه بمانیم</span>
                </div>
                <div className={styles.Quick}>
                    <div className={styles.QuickImgCont}>
                        <img src="/IMGS/LandingSVGs/aghsaat.png" />
                    </div>
                    <span>ارسال‌فوری خواربار</span>
                </div>
                <div className={styles.Quick}>
                    <div className={styles.QuickImgCont}  style={{backgroundColor: '#a1a3a8' , borderRadius: '50%' , display: 'flex', justifyContent: 'center' , alignItems: 'center', gap: '4px'}}>
                        <span className={styles.dot}></span><span className={styles.dot}></span><span className={styles.dot}></span>
                    </div>
                    <span>بیشتر</span>
                </div>
            </div>
        </div>
    )
}
