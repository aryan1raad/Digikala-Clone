import '../../assets/Styles/Header.css'
import { Link, useNavigate } from 'react-router-dom'
import React, { useEffect, useRef, useState } from 'react'
import { useProductContext } from '../../CustomHooks/useProductContext'


const Header = () => {
  const { user, setUser } = useProductContext();

  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');

  const [PopIsOpen, setPopOpen] = useState(false);
  const popWindowRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  const togglePop = () => {
    setPopOpen((Pop) => !Pop)
  }
  useEffect(() => {
    const handleMouseDownOutside = (e: MouseEvent | TouchEvent) => {
      const target = e.target;

      //AI coded
      // بررسی اینکه آیا target یک Node است
      if (target instanceof Node) {
        if (
          PopIsOpen &&
          (popWindowRef.current && !popWindowRef.current.contains(target)) &&
          (btnRef.current && !btnRef.current.contains(target))
        ) {
          setPopOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handleMouseDownOutside);
    document.addEventListener('touchstart', handleMouseDownOutside)
    return () => {
      document.removeEventListener('mousedown', handleMouseDownOutside)
      document.removeEventListener('touchstart', handleMouseDownOutside)
    }
  }, [PopIsOpen])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  }
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  }
  const handleSearch = () => {
    navigate(`/search/?q=${searchValue}`)
  }

  return (
    <header>
      {user.isAuthorized ?
        <div className='headLeft'>
          <button className='SignUp_BTN' ref={btnRef} onClick={togglePop} style={PopIsOpen ? { backgroundColor: '#ff546817' } : {}}>
            {user.userName}
          </button>
          {PopIsOpen && <div ref={popWindowRef} className="PopInfo" dir='rtl'>
            <Link to={'/'} onClick={() => setPopOpen(false)} className='Poplink'>
              <div className='NumberOrMail'>{user.numOrMail}</div>
            </Link>
            <Link to={'/sabaadeKharid'} onClick={() => setPopOpen(false)} className='Poplink'>
              <div className='NumberOrMail'>سبد خرید</div>
            </Link>
            <div className='Poplink' onClick={() => setUser({
              isAuthorized: false,
              userName: null,
              numOrMail: null
            })}
            >
              <div className='Exit' onClick={() => setUser({
                isAuthorized: false,
                userName: null,
                numOrMail: null
              })}
              >
                خروج از حساب کاربری
              </div>
            </div>
          </div>}
        </div>
        :
        <Link to={"/login"} className='headLeft'>
          <button className='SignUp_BTN' >
            ورود | ثبت نام
          </button>
        </Link>
      }
      <div className='headRight'>
        <input type="text" onChange={handleChange} onKeyDown={handleKeyDown} placeholder='جستجو' />
        <Link to='/'>
          <div className="logo"><img src="/IMGS/DigiKalaLOGO.svg" alt="" /></div>
        </Link>
      </div>
    </header>
  )
}

export default Header 