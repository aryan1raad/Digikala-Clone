// identifier همان ایمیل یا شماره تلفنی است که وارد میکنیم
import { useRef, useEffect, useReducer } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import styles from '../assets/Styles/Login.module.scss';
import { useUserStore } from '../Stores/useUserStore';
import { UserType } from '../types/context';
import { FieldErrors, useForm, UseFormReturn } from 'react-hook-form';

//تایپ ها
type status = "enterIdentifier" | "code" | "done";

type identifierFormType = {
    identifier: string,
}
type codeFormType = {
    code: string
}

type reducerStateType = { status: status, identifierValue?: number | string, secondsLeft: number, error?: null }
type reducerActionType = { type: string, payload?: string }

//util
function minutes_And_seconds(seconds: number) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return (`${mins < 10 ? `0${mins}` : mins} : ${secs < 10 ? `0${secs}` : secs}`)
}

const Login = ({ MyInitialUser }: {
    MyInitialUser: UserType
}) => {

    //دو فرم 
    // دو یوز فرم
    const { register: registerIdentifier, handleSubmit: handleIdentifierSubmit, formState: { errors: identifierErrors }, setFocus: setIdentifierFocus } = useForm<{ identifier: string }>({
        mode: 'onChange',
        defaultValues: {
            identifier: ""
        }
    })
    const { register: registerCode, handleSubmit: handleCodeSubmit, formState: { errors: codeErrors }, setFocus: setCodeFocus, } = useForm<{ code: string }>(
        {
            // این فرم (کد) در سابیمت ارور خواهد گرفت
            mode: 'onSubmit',
            defaultValues: {
                code: '' 
            }
        }
    )

    //برای آیدنتیفایر
    function onSubimtIdentifier(data: identifierFormType) {
        console.log(data, "Data");
        dispatch({
            type: 'Identifier_Submitted',
            payload: data.identifier
        })
    }
    function onErrorIderntifier(err: FieldErrors) {
        console.log("error", err);
    }

    //برای کد
    function onSubimtCode(data: codeFormType) {
        console.log(data);
        dispatch({
            type: 'done'
        })
    }
    function onErrorCode(error: FieldErrors) {
        console.log('error', error)
    }


    const timerIdRef = useRef<null | number>(null);
    const navigate = useNavigate();
    const setUser = useUserStore(state => state.setUser);

    const initialState : reducerStateType = {
        status: 'enterIdentifier',
        secondsLeft: 3,
        identifierValue: ''
    }

    const [{ status, identifierValue, secondsLeft, error }, dispatch] = useReducer(reducer, initialState);
    function reducer(state: reducerStateType, action: reducerActionType): reducerStateType {
        switch (action.type) {

            //وقتی کد ارسالی درست باشد
            case "done":
                return {
                    ...state,
                    status: 'done'
                }

            case "startOver":
                return {
                    ...initialState
                }

            case "Identifier_Submitted":
                return {
                    ...state,
                    status: 'code',
                    identifierValue: action.payload, // شماره/ایمیل وارد شده
                    secondsLeft: 3,
                }

            case "ResendCode":
                return {
                    ...state,
                    secondsLeft: 3,
                }

            case "tick_Tock":
                return {
                    ...state,
                    secondsLeft: state.secondsLeft - 1
                }

            default: return state;
        }
    }

    // تایمر
    useEffect(() => {
        if (status === 'code' && secondsLeft > 0) {
            timerIdRef.current = setInterval(() => {
                dispatch({ type: 'tick_Tock' })
            }, 1000)
        }
        else if (secondsLeft === 0 && timerIdRef.current) {
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
        if( status === "enterIdentifier")
            setIdentifierFocus('identifier');
        if( status === "code")
            setCodeFocus('code');  
    }, [setCodeFocus, setIdentifierFocus, status])

    useEffect(() => {
        if (status === 'done') {
            console.log("لاگین با موفقیت انجام شد");
            //برای خطای تایپ اسکریپت
            if (identifierValue) {
                setUser({
                    ...MyInitialUser,
                    numOrMail: identifierValue,
                    isAuthorized: true
                })
            }
            navigate('/');
        }
    }, [status, navigate]);

    return (
        <main className={styles.main}>
            {status == 'enterIdentifier' && <form
                autoComplete='off'
                onSubmit={handleIdentifierSubmit(onSubimtIdentifier, onErrorIderntifier)}
                className={styles.Cont}
                noValidate
            >
                <div className={styles.row1}>
                    <div className={styles.ComeBack} onClick={() => navigate(-1)} >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http:www.w3.org/2000/svg">
                            <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="#636363" strokeWidth="2" strokeLinecap="round" stroke-linejoin="round" />
                        </svg>
                    </div>
                    <Link to={'/'}>
                        <div className={styles.logoCont}><img src="/IMGS/DigiKalaLOGO2.svg" alt="Digikala" /></div>
                    </Link>
                </div>
                <div className={styles.row2}>
                    <h1 className={styles.textH1}>
                        ورود | ثبت‌نام
                    </h1>

                    {status === "enterIdentifier" && <p style={{ fontSize: '12px', color: '$color-dark-blue', marginTop: '16px', lineHeight: '2.17', fontWeight: '500' }}>
                        سلام!
                    </p>}

                    <p style={{ fontSize: '12px', color: '$color-dark-blue', marginBottom: '16px', lineHeight: '2.17', fontWeight: '500' }}>
                        {status === "enterIdentifier" && "لطفا شماره موبایل یا ایمیل خود را وارد کنید"}
                    </p>

                    <div>
                        <label className={styles.labelInput}>
                            <div className={styles.divInput}>
                                <div className={styles.grow}>
                                    <input
                                        type="text"
                                        {...registerIdentifier("identifier", {
                                            required: 'شماره یا ایمیل خود را وارد کنید.',
                                            validate: (value: string) => {
                                                const phoneRegex = /^09\d{9}$/;
                                                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

                                                return (phoneRegex.test(String(value)) ||
                                                    emailRegex.test(String(value)) ||
                                                    "شماره موبایل یا ایمیل را به درستی انتخاب بکنید."
                                                )
                                            }
                                        })}
                                    />
                                </div>
                            </div>
                            {(identifierErrors.identifier?.message) && <p className={styles.alert}>{identifierErrors.identifier?.message}</p>}
                        </label>
                    </div>
                </div>
                <input type='submit'
                    value='ورود'
                    className={styles.login_btn}
                />
            </form>}




            {status == "code" && <form
                autoComplete='off'
                onSubmit={handleCodeSubmit(onSubimtCode, onErrorCode)}
                className={styles.Cont}
                noValidate
            >
                <div className={styles.row1}>
                    <div className={styles.ComeBack} onClick={() => navigate(-1)} >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http:www.w3.org/2000/svg">
                            <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="#636363" strokeWidth="2" strokeLinecap="round" stroke-linejoin="round" />
                        </svg>
                    </div>
                    <Link to={'/'}>
                        <div className={styles.logoCont}><img src="/IMGS/DigiKalaLOGO2.svg" alt="Digikala" /></div>
                    </Link>
                </div>

                <div className={styles.row2}>

                    <h1 className={styles.textH1}>
                        {codeErrors.code?.message ? "خطا در ورود" : "کد تایید را وارد کنید"}
                    </h1>
                    <p style={{ fontSize: '12px', color: '$color-dark-blue', marginBottom: '16px', lineHeight: '2.17', fontWeight: '500' }}>
                        {codeErrors.code?.message ? "لطفا کد [1234] را به درستی وارد کنید." : "کد ارسالی را وارد نمایید."}
                    </p>

                    <div>
                        <label className={styles.labelInput}>
                            <div className={styles.divInput}>
                                <div className={styles.grow}>
                                    <input
                                        type="text"
                                        {...registerCode("code", {
                                            required: 'کد ارسالی را وارد کنید.',
                                            validate: (value: string) => {
                                                return (String(value) == "1234" || "لطفا کد [1234] را به درستی وارد کنید.")
                                            }
                                        })}
                                    />
                                </div>
                            </div>
                            {(codeErrors.code?.message) && <p className={styles.alert}>{codeErrors.code?.message}</p>}
                        </label>
                    </div>
                </div>
                <input type='submit'
                    value='ورود'
                    className={styles.login_btn}
                />

                {/* مدت زمان باقی مانده */}
                {(status === "code" && secondsLeft > 0) && <div dir='ltr' className={styles.remaining}> {minutes_And_seconds(secondsLeft)}<div>مانده تا دریافت مجدد کد</div></div>}

                {/* ارسال از طرق پیامک */}
                {(status === "code" && secondsLeft === 0) && <p onClick={() => dispatch({ type: 'ResendCode' })} className={styles.accept} style={{ color: 'black', cursor: 'pointer' }}>دریافت مجدد کد از طریق <span style={{ fontWeight: 600 }}>پیامک</span></p>}

            </form>}
        </main >
    )
}

export default Login