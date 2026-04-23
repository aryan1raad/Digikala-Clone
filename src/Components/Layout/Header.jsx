import React from 'react'
import '../../assets/Styles/Header.css'

import { Link } from 'react-router-dom'
export const Header = () => {
  return (
    <header>
        <Link to={"/login"} className='headLeft'>
          <button className='SignUp_BTN'>ورود | ثبت نام</button>
        </Link>
        <div className='headRight'>
          <input type="text" placeholder='جستجو' />
          <Link to ='/'>
            <div className="logo"><img src="/src/assets/IMGS/DigiKalaLOGO.svg" alt="" /></div>
          </Link>
        </div>

    </header>
  )
}

