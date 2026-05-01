import '../../assets/Styles/Header.css'
import { Link, useNavigate} from 'react-router-dom'
import { useContext, useEffect, useRef, useState } from 'react'
import { ProductContext } from '../../App'


const Header = () => {
  const {user} = useContext(ProductContext);
  const {setUser} = useContext(ProductContext);

  const navigate = useNavigate();
  const [searchValue , setSearchValue] = useState('');

  const [PopIsOpen , setPopOpen] = useState(false);
  const popWindowRef = useRef(null);
  const btnRef = useRef(null);

  const togglePop = () => {
    setPopOpen((Pop)=> !Pop)
  }
  useEffect(() => {
    const handleMouseDownOutside = (e)  => {
      //وقتی خارج از منو کلیک شود بدون نویگیت های مورد نظر منو را میبندیم
      if(PopIsOpen && (popWindowRef.current && !popWindowRef.current.contains(e.target)) && (btnRef.current && !btnRef.current.contains(e.target))){
        
        setPopOpen(false);
      }
    }

    document.addEventListener('mousedown' , handleMouseDownOutside);
    return () => document.removeEventListener('mousedown' , handleMouseDownOutside)
  }, [PopIsOpen])

  const handleChange = (e) => {
    setSearchValue(e.target.value);
  }
  const handleKeyDown = (e) => {
    if ( e.key === 'Enter' ) {
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
          <button className='SignUp_BTN' ref={btnRef} onClick={togglePop} style={ PopIsOpen ? {backgroundColor: '#ff546817'} : {}}>
            {user.userName}
          </button>
          {PopIsOpen && <div ref={popWindowRef} className="PopInfo" dir='rtl'>
            <Link to={'/'} onClick={()=> setPopOpen(false)} className='Poplink'>
              <div className='NumberOrMail'>{user.numOrMail}</div>  
            </Link>
            <Link to={'/sabaadeKharid'} onClick={()=> setPopOpen(false)} className='Poplink'>
              <div className='NumberOrMail'>سبد خرید</div>  
            </Link>
            <div className='Poplink' onClick={() => setUser({    
              isAuthorized : false,
              userName: null,
              numOrMail: null})}
            >
              <div className='Exit' onClick={() => setUser({
                  isAuthorized : false,
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
          <div className="logo"><img src="/src/assets/IMGS/DigiKalaLOGO.svg" alt="" /></div>
        </Link>
      </div>
    </header>
  )
}

export default Header 