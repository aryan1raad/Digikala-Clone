import React from 'react'
import styles from '../assets/Styles/Banners.module.scss'
import { Link } from 'react-router-dom'
export const Banners = ({img}: {img: {
    src: string,
    category: string
}[]}) => {
  return (
    <div className={styles.container}>
        {img.map((src , index:number) => {
            return(
                <Link to={`/search/${src.category}`} className={styles.ImgCont} key={index}>
                    <img src={src.src} className={styles.Img} draggable={false} />
                </Link>
            )
        })}
    </div>
  )
}
