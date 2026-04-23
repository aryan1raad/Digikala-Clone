import { useRef , useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import styles from '../assets/Styles/Login.module.css';
const Login = () => {

    const [isFocused , setFocused] = useState(true);
    const [submited , setSubmited] = useState(false);
    const LoginInputRef = useRef(null);
    useEffect(() => {
        if( LoginInputRef ) {
            LoginInputRef.current.focus();
        }
    }, [])
    //حتما باید فقط در اولین رندر فوکس کند نه در تمامی ری رندر ها

    function changeHandler(e){
        if(e.target.value != ''){
            setFocused(true);
        }
    }
    function SubmitHandler(){
        setSubmited(true);
    }
  return (
    <main className={styles.main}>
        <div className={styles.Cont}>
            <div className={styles.row1}>
                <div className={styles.ComeBack}>arrowright</div>
                <Link to={'/'}>
                    <div className={styles.logoCont}><img src="/src/assets/IMGS/DigiKalaLOGO2.svg" alt="Digikala" /></div>
                </Link>
            </div>
            <div className={styles.row2}>
                <h1 className={styles.textH1}>ورود | ثبت‌نام</h1>
                <p  style={{fontSize: '12px' , color: '#3f4064' , marginTop: '16px' , lineHeight: '2.17' , fontWeight: '500'}}>سلام!</p>
                <p  style={{fontSize: '12px' , color: '#3f4064' , marginBottom: '16px' , lineHeight: '2.17' , fontWeight: '500'}}>لطفا شماره موبایل یا ایمیل خود را وارد کنید</p>
                <form>
                    <label className={styles.labelInput}>
                        <div className={styles.divInput} >
                            <div className={styles.grow}>
                                <input className={ isFocused ? styles.focused : styles.UnFocused} ref={LoginInputRef} onChange={changeHandler} onFocus={() => setFocused(true)} onBlur={() => {if (LoginInputRef.current.value === "" ) setFocused(false)}} type="text" name="" id="" />
                            </div>
                        </div>
                        <p style={isFocused ? {visibility: 'hidden'} : {visibility: 'visible'}} className={styles.alert}>لطفا این قسمت را خالی نگذارید.</p>
                    </label>
                    <input onSubmit={SubmitHandler} type='submit' value='ورود' className={styles.login_btn}/>
                </form>
                <p className={styles.accept} >ورود شما به معنای پذیرش <span>شرایط دیجی کالا</span> و <span>قوانین حریم‌خصوصی</span> است</p>
            </div>
        </div>
    </main>
  )
}

export default Login