import React from 'react'
import styles from '../assets/Styles/Banners.module.css'
import { Link } from 'react-router-dom'
export const Banners = ({img}) => {
  return (
    <div className={styles.container}>
        {img.map((src , index) => {
            return(
                <Link to={`/search/${src.category}`} className={styles.ImgCont} key={index}>
                    <img src={src.src} className={styles.Img} draggable={false} />
                </Link>
            )
        })}
    </div>
  )
}
