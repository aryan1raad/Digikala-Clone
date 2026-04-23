import React from 'react'
import styles from '../assets/Styles/TakhfifBanners.module.css'
export const TakhfifBanners = ({imgLeft}) => {
  return (
    <a className={styles.container}>
        <div className={styles.background}></div>
        <div className={styles.right}>
            <div>
                <img src="src/assets/IMGS/TakhfifIMGs/takhfif-Right/fresh.webp" alt="" />
            </div>
            <div>
                <img src="src/assets/IMGS/TakhfifIMGs/takhfif-Right/fresh-incredible-offer.svg" alt="" />
            </div>
            <div className={styles.rightTakhfif}>
                تا 35% تخفیف
            </div>
        </div>
        <div className={styles.left}>
            {imgLeft.map((ProductImage , index) => {
                return(            
                    <div className={styles.product} key={index}>
                        <div className={styles.ProductImageCont}>
                            <img src={ProductImage} className={styles.ProductImage} draggable='false'/>
                        </div>
                        <span className={styles.number}>40%</span>
                    </div>
                )
            })}

            <div className={styles.left_btn}>بیش از 60 کالا</div>
        </div>

    </a>
  )
}
