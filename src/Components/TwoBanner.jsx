import React from 'react'
import styles from '../assets/Styles/TwoBanner.module.css';

export const TwoBanner = ({img1 , img2}) => {
  return (
    <div className={styles.TwoBanner}>
        <a href="#" className={styles.a_Cont}>
            <div className={`${styles.imgCont} ${styles.marginRight}`}>
                <img src={img1} className={styles.img} draggable={false}/>
            </div>
        </a>

        <a href="#" className={styles.a_Cont}>
            <div className={styles.imgCont}>
                <img src={img2} className={styles.img} draggable={false}/>
            </div>
        </a>
    </div>
  )
}
