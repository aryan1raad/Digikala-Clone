import '../../assets/Styles/Header.css'
import { Link, useNavigate} from 'react-router-dom'
import { useContext, useState } from 'react'
import { ProductContext } from '../../App'


export const Header = () => {
  const {user} = useContext(ProductContext);
  const navigate = useNavigate();
  const [searchValue , setSearchValue] = useState('');

  const handleChange = (e) => {
    setSearchValue(e.target.value);
  }
  const handleKeyDown = (e) => {
    if ( e.key === 'Enter' ) {
      handleSearch();
    }
  }
  const handleSearch = () => {
    navigate(`/search?q=${searchValue}`)
  }
  return (
    <header>
      <Link to={"/login"} className='headLeft'>
        <button className='SignUp_BTN'>
         {!user.isAuthorized ? 'ورود | ثبت نام' : user.userName}
        </button>
      </Link>
      <div className='headRight'>
        <input type="text" onChange={handleChange} onKeyDown={handleKeyDown} placeholder='جستجو' />
        <Link to='/'>
          <div className="logo"><img src="/src/assets/IMGS/DigiKalaLOGO.svg" alt="" /></div>
        </Link>
      </div>
    </header>
  )
}

