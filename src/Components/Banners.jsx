import React from 'react'
import styles from '../assets/Styles/Banners.module.css'
export const Banners = ({img}) => {
  return (
    <div className={styles.container}>
        {img.map((src , index) => {
            return(
                <div className={styles.ImgCont} key={index}>
                    <img src={src} className={styles.Img} draggable={false} />
                </div>
            )
        })}
    </div>
  )
}
