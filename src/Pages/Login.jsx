import { useRef, useEffect, useReducer, use, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import styles from '../assets/Styles/Login.module.css';
import { useProductContext } from '../CustomHooks/useProductContext';
import { useUserStore } from '../Stores/useUserStore';

function minutes_And_seconds(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return (`${mins < 10 ? `0${mins}` : mins} : ${secs < 10 ? `0${secs}` : secs}`)
}

const Login = ({MyInitialUser}) => {
    const LoginInputRef = useRef(null);
    const timerIdRef = useRef(null);
    const navigate = useNavigate();
    const setUser = useUserStore(state => state.setUser);

    const initialState = {
        status: 'NumberIsGiving',
        input: '',
        NumberOrMail: '',
        Code: '1234',
        InputVoid: true,
        secondsLeft: 3,
        //:برای فوکوس کردن اینپوت به صورت خودکار در قسمت بعدی
        EnteredCodeStatus: false,   

    }
    const [{ status, secondsLeft, input, InputVoid, NumberOrMail, EnteredCodeStatus, }, dispatch] = useReducer(reducer, initialState);
    function reducer(state, action) {
        switch (action.type) {
            case 'tick_Tock':
                return {
                    ...state,
                    secondsLeft: state.secondsLeft - 1,
                }
            case 'ChangeHandler':
                if (action.payload === '') {
                    return {
                        ...state,
                        input: action.payload,
                        InputVoid: true,
                    }
                } else {
                    return {
                        ...state,
                        input: action.payload,
                        InputVoid: false
                    }
                }
            case 'SubmitPhoneNumber':
                if (state.InputVoid) {
                    console.log('چیزی ننوشتید');
                    return state
                }

                // یک الگو رجکس برای شماره ایران
                //یک اعتبار سنجی ساده
                const phoneRegex = /^09\d{9}$/;
                //جیمیل
                const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
                if(!gmailRegex.test(state.input) && !phoneRegex.test(state.input)){
                    //اگر دارای جیمیل دات کام نبود و شماره ایرانی هم نبود
                    //ارور بده
                    return{
                        ...state,
                        status: 'ErrorNum',
                        input: '',
                        InputVoid: true
                    }
                }
                
                return{
                    ...state,
                    NumberOrMail: state.input,
                    status: 'SendingCode',
                    EnteredCodeStatus: true, //فوکوس برای اینپوت در وضعیت ارسال کد
                    input: ''
                }
            case 'sendMeAgain':
                return {
                    ...state,
                    status: 'SendingCode',
                    secondsLeft: 3,
                    input: '' 
                }
            case 'verifyCode' :
                if (state.input === "")
                    return {
                        ...state,
                        InputVoid: true 
                    }
                if (state.input === state.Code)
                    return {
                        ...state,
                        status: 'Done',
                        InputVoid: 'false'
                    }
                else 
                    return {
                        ...state,
                        status: 'ErrorCode',
                        input: '',
                        InputVoid: true,
                    }
            case 'SetError': 
                return { 
                    ...state, 
                    status: 'Error', 
                    InputVoid: true 
                };
            case 'ResetLogin':
                return { 
                    ...initialState, 
                    status: 'NumberIsGiving', 
                    secondsLeft: 0 
                };
            default:
                return state;
        }
    }

    // تایمر
    useEffect(() => {
        if (status === 'SendingCode' && secondsLeft > 0) {
            timerIdRef.current = setInterval(() => {
                dispatch({ type: 'tick_Tock' })
            }, 1000)
        }
        else if (secondsLeft === 0 && timerIdRef.current){
            clearInterval(timerIdRef.current);
            timerIdRef.current = null;
        }
        return () => {
            if (timerIdRef.current) {
                clearInterval(timerIdRef.current);
                timerIdRef.current = null;
            }
        }
    }, [status, secondsLeft])

    useEffect(() => {
        if (EnteredCodeStatus && LoginInputRef.current) {
            // برای اطمینان از DOM 
            setTimeout(() => {
                LoginInputRef.current.focus();
            }, 0);
        }
    }, [EnteredCodeStatus]);

    useEffect(() => {
        if (status === 'Done'){
            console.log("لاگین با موفقیت انجام شد");
            setUser({
                ...MyInitialUser,
                numOrMail : NumberOrMail
            })
            navigate('/');


        }
    }, [status , navigate]);

    const handleEmptySubmit = () => {
        //در آینده میتوان پیام توستر نیز به عنوان فیدبک اضافه شود
        //فعلا فقط لاگ میکنیم
        console.log('لطفا فیلد مناسب را پر کنید.')
    }
    return (
        <main className={styles.main}>
            <div className={styles.Cont}>
                <div className={styles.row1}>
                    <div className={styles.ComeBack} onClick={() => navigate(-1)} >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="#636363" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                    <Link to={'/'}>
                        <div className={styles.logoCont}><img src="/IMGS/DigiKalaLOGO2.svg" alt="Digikala" /></div>
                    </Link>
                </div>
                <div className={styles.row2}>
                    <h1 className={styles.textH1}>
                        {status === "NumberIsGiving" && " ورود | ثبت‌نام"}
                        {status === "SendingCode" && "کد تایید را وارد کنید"}
                        {(status === "ErrorCode" || status === "ErrorNum") && "خطا در ورود"}
                    </h1>

                    {status === "NumberIsGiving" && <p style={{ fontSize: '12px', color: '#3f4064', marginTop: '16px', lineHeight: '2.17', fontWeight: '500' }}>
                        سلام!
                    </p>}

                    <p style={{ fontSize: '12px', color: '#3f4064', marginBottom: '16px', lineHeight: '2.17', fontWeight: '500' }}>
                        {status === "NumberIsGiving" && "لطفا شماره موبایل یا ایمیل خود را وارد کنید"}
                        {status === "SendingCode" && `کد تایید به  ${NumberOrMail} ارسال شد`}
                        {status === "ErrorNum" && <div>لطفا ایمیل یا شماره تلفن خود را به درستی وارد کنید.<br /></div>}
                        {status === "ErrorCode" && <div>لطفا کد ارسالی را به درستی وارد کنید.<br />[code:1234]</div>}
                    </p>

                    <form onSubmit={(e) => { e.preventDefault() }}>
                        <label className={styles.labelInput}>
                            <div className={styles.divInput}>
                                <div className={styles.grow}>
                                    <input
                                        ref={LoginInputRef}
                                        value={input}
                                        onChange={(e) => dispatch({ type: 'ChangeHandler', payload: e.target.value })}
                                        type="text"
                                        name=""
                                        id=""
                                        autoComplete='off'
                                    />
                                </div>
                            </div>
                            {(InputVoid || input==='') && <p className={styles.alert}>لطفا این قسمت را خالی نگذارید.</p> }
                        </label>

                        {/* مدت زمان باقی مانده */}
                        {(status === "SendingCode" && secondsLeft > 0) && <div dir='ltr' className={styles.remaining}> {minutes_And_seconds(secondsLeft)}<div>مانده تا دریافت مجدد کد</div></div>}

                        {/* ارسال از طرق پیامک */}
                        {(status === "SendingCode" && secondsLeft === 0) && <p onClick={() => dispatch({ type: 'sendMeAgain' })} className={styles.accept} style={{ color: 'black', cursor: 'pointer' }}>دریافت مجدد کد از طریق <span style={{ fontWeight: 600 }}>پیامک</span></p>}

                        {/* سابمیت های نهایی */}
                        {(status === 'NumberIsGiving'  || status === 'ErrorNum') && <input type='submit'
                            onClick={() => {
                                dispatch({ type: 'SubmitPhoneNumber' })}
                            } 
                            value='ورود' 
                            className={styles.login_btn} 
                        />}

                        

                        {(status === 'SendingCode' || (status === 'ErrorCode')) && <input type='submit' 
                            onClick={() => {
                                // اگر سندینگ کد نیست ، پس ارور است
                                // پس حتما در اعتبار سنجی شماره تلفن هستیم
                                dispatch({ type: 'verifyCode'})}
                            } 
                            value='تایید'
                            className={styles.login_btn} 
                            disabled={ InputVoid && status!== 'Error'} //اگر ارور داده باشد بتواند دوباره امتحان کند
                            //اگر ارور نباشد و اینپوت خالی باشد ، غیرفعالش بکن
                        />}
                        
                    </form>
                    {(status === "NumberIsGiving") && <p className={styles.accept}>ورود شما به معنای پذیرش <span>شرایط دیجی کالا</span> و <span>قوانین حریم‌خصوصی</span> است</p>}
                </div>
            </div>
        </main>
    )
}

export default Login