import React from 'react'
import styles from '../assets/Styles/TakhfifBanners.module.scss'
export const TakhfifBanners = ({imgLeft} : {imgLeft: string[]}) => {
  return (
    <a className={styles.container}>
        <div className={styles['container__background']}></div>
        <div className={styles.right}>
            <div>
                <img src="/IMGS/TakhfifIMGs/takhfif-Right/fresh.webp" alt="" />
            </div>
            <div>
                <img src="/IMGS/TakhfifIMGs/takhfif-Right/fresh-incredible-offer.svg" alt="" />
            </div>
            <div className={styles['container__rightTakhfif']}>
                تا 35% تخفیف
            </div>
        </div>
        <div className={styles.left}>
            {imgLeft.map((ProductImage , index) => {
                return(            
                    <div className={styles['container--product']} key={index}>
                        <div className={styles['container__ProductImageCont']}>
                            <img src={ProductImage} className={styles['container__ProductImageCont--ProductImage']} draggable='false'/>
                        </div>
                        <span className={styles['container--number']}>40%</span>
                    </div>
                )
            })}

            <div className={styles.left_btn}>بیش از 60 کالا</div>
        </div>

    </a>
  )
}
