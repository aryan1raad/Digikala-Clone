import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import styles from '../assets/Styles/Product.module.css'
import { ProductContext } from '../App'
//تمامی آیتم ها درقالب آرایه از اَپ گرفته میشوند
const Product = ({ SetSelectedProducts, selectedProducts }) => {
    const { items, user } = useContext(ProductContext);
    // گرفتن آیدی محصولمان از یو آر ال فعلی
    const { productId } = useParams();
    const navigate = useNavigate()
    useEffect(() => {
        window.scrollTo({ top: 0 });
        //پیدا کردن محصول با مقایسه آیدی آیتم گرفته شده از لندینگ
        const NEW = items.find(i => i.id == productId);
        // چاپ آبجکت محصول خط کد زیر
        // console.log(NEW)
        setColorSelected(NEW.colors[0])
    }, []);
    const colorNames = {
        blue: { persian: 'آبی', secondUsed: '#5288ff' },
        black: { persian: 'مشکی', secondUsed: '#232323' },
        pink: { persian: 'صورتی', secondUsed: '#cd7fc1' },
        red: { persian: 'قرمز', secondUsed: '#b50021' },
        green: { persian: 'سبز', secondUsed: '#38c550' },
        white: { persian: 'سفید', secondUsed: '#c3c3c3' },
        gold: { persian: 'طلایی', secondUsed: '#b89e13' },
        gray: { persian: 'خاکستری', secondUsed: '#373737' },
        navy: { persian: 'سرمه ای', secondUsed: '#00009e' },
        orange: { persian: 'نارنجی', secondUsed: '#e67700' },
        purple: { persian: 'بنفش', secondUsed: 'purple' },
    };
    const [colorSelected, setColorSelected] = useState('blue');
    // برای نمایش رنگ رف
    const colorRef = useRef(null);
    const colorSelection = (colorCircle) => {
        setColorSelected(colorCircle);
    }
    const handleAddtoCart = (id) => {
        SetSelectedProducts([...selectedProducts, { id: id, color: colorSelected }])
        console.log(...selectedProducts)
    }
    return (
        <div className={styles.cont}>

            {items.map((item, index) => {
                if (item.id == productId) {
                    return (
                        <div key={index} className={styles.productSelfCont}>
                            <nav className={styles.flow} dir='rtl'>
                                <div>
                                    <Link to={'/'} style={{ color: '#81858b' }}>دیجی کالا</Link>
                                    <span style={{ marginRight: '12px', marginLeft: '12px' }}>/</span>
                                </div>
                                <div>
                                    <Link to={`/search/${item.category}`} style={{ color: '#81858b' }}>{item.category}</Link>
                                    <span style={{ marginRight: '12px', marginLeft: '12px' }}>{item.category ? '/' : ''}</span>
                                </div>
                                <div className={styles.title}>{item.title}
                                </div>
                            </nav>
                            <div className={styles.productCont}>
                                <div className={styles.left}>
                                    <div className={styles.leftUP}>
                                        <h1 dir='rtl'>{item.title}</h1>
                                    </div>
                                    <div className={styles.leftDOWN}>
                                        <div className={styles.variant} style={{ display: colorSelected === '' ? 'none' : 'block', }}>
                                            <div dir='rtl' style={{ display: colorSelected === '' ? 'none' : 'block', }} className={styles.rangCont}>

                                                <span style={{ display: colorSelected === '' ? 'none' : 'block', fontWeight: '700', fontSize: '16px', lineHeight: '180%', fontSize: '18px' }}>رنگ:</span>
                                                <span ref={colorRef} style={{ display: colorSelected === '' ? 'none' : 'block', color: colorSelected === '' ? 'none' : colorNames[colorSelected].secondUsed, fontWeight: '700', fontSize: '16px', lineHeight: '180%', fontSize: '18px', marginRight: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                    {/* اسم استیت رنگ به فارسی به عنوان محتوا */}
                                                    {colorSelected === '' ? '' : colorNames[colorSelected].persian}
                                                    <span style={{ display: colorSelected === '' ? 'none' : 'flex', background: colorSelected, display: 'flex', width: '16px', height: '16px' }} className={styles.circle}></span>

                                                </span>
                                            </div>

                                            <div dir='rtl' className={styles.circles} style={{ display: 'flex', marginBottom: '16px', flexDirection: 'row', gap: '8px' }}>
                                                {/* مپ کردن رنگ های محصول */}
                                                {item.colors.map((colorCircle, index) => {
                                                    return (
                                                        <div style={{ display: colorSelected === '' ? 'none' : 'flex', background: (colorSelected == colorCircle) ? '#19bfd3' : 'white', border: '1px solid #909090' }} className={styles.circleCont} key={index}>
                                                            <div onClick={() => colorSelection(colorCircle)} className={styles.circle} style={{ background: `${(colorCircle)}`, border: colorCircle === colorSelected ? '4px solid #ffffff' : 'none' }}></div>
                                                        </div>
                                                    )
                                                })}
                                            </div>

                                        </div>
                                        <div className={styles.properties}>
                                            <div>

                                                <div dir='rtl' style={{ padding: '12px 0', fontWeight: '700', fontSize: '18px', lineHeight: '2.17' }}>ویژگی ها</div>
                                                <div className={styles.propertiesGrid} dir='rtl'>

                                                    {/* لوپ مپ برای گرفتن جزئیات پراپرتیز محصول[آیتم] */}
                                                    {item.properties.map((property, index) => {
                                                        return (
                                                            <div className={styles.box} key={index}>
                                                                <p className={styles.topProperty} style={{ color: '#81858b', fontSize: '12px' }}>
                                                                    {property.top}
                                                                </p>
                                                                <p className={styles.downProperty} style={{ fontWeight: '600', fontSize: '12px' }}>
                                                                    {property.bottom}
                                                                </p>
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                                <div className={styles.hrWithText} style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                                                    <hr />
                                                    <button style={{ padding: '8px 16px', borderRadius: '8px', border: '1px solid #e0e0e2', backgroundColor: 'white', fontWeight: '700', textWrap: 'nowrap' }}>مشاهده همه ی ویژگی ها</button>
                                                    <hr />
                                                </div>
                                                <div className={styles.alert} dir='rtl'>
                                                    <div></div>
                                                    <div>درخواست مرجوع کردن کالا در این گروه کالایی با دلیل "انصراف از خرید" تنها در صورتی قابل تایید است که کالا در شرایط اولیه باشد (در صورت پلمب بودن، کالا نباید باز شده باشد).</div>
                                                </div>
                                                <div className={styles.PlusContSection}>
                                                    <div></div>
                                                    <div></div>
                                                </div>

                                            </div>

                                        </div>
                                        <div className={styles.furushContCard}>
                                            <div className={styles.furushInner}>
                                                <div className={styles.card} dir='rtl'>
                                                    <div className={styles.furushande}>
                                                        <h3>فروشنده</h3>
                                                    </div>
                                                    <div className={styles.digi}>
                                                        <div>
                                                            <div>
                                                                <div style={{ fontSize: '1.1rem', color: '#3f4064' }}>دیجی‌کالا</div>
                                                                <div style={{ color: '#81858b' }} dir='rtl'><span style={{ color: '#00a049', fontWeight: '500' }}>100%</span> رضایت از کالا</div>
                                                            </div>
                                                        </div>
                                                        <div className={styles.circle} style={{ background: '#ef4056', scale: '0.8', marginLeft: '16px' }}>
                                                        </div>
                                                    </div>
                                                    <div className={styles.price}>
                                                        <div className={styles.innerPrice}>
                                                            <div className={styles.PrevThenNow}>
                                                                <div className={styles.prevPriceInner}>

                                                                    {item.percent && <div className={styles.prevPriceColCont}>
                                                                        <span>%{item.percent}</span><div>{item.prevPrice}</div>
                                                                    </div>}
                                                                    <div style={{ fontSize: '24px', fontWeight: '700', color: '#23254e' }}>{item.price}</div>

                                                                </div>
                                                            </div>

                                                            {/* انیمیشن به بالا */}
                                                            <div className={styles.animator} dir="rtl">
                                                                <div className={styles.track}>
                                                                    <div className={styles.item}>
                                                                        <img src="/IMGS/Uncategorized/heart.png" />
                                                                        <span>۴۰۰+ نفر به این کالا علاقه دارند</span>
                                                                    </div>

                                                                    <div className={styles.item}>
                                                                        <img src="/IMGS/Uncategorized/hundred.png" />
                                                                        <span>۵۰۰+ نفر این کالا را خریدند</span>
                                                                    </div>

                                                                    <div className={styles.item}>
                                                                        <img src="/IMGS/Uncategorized/eye.png" />
                                                                        <span>۵۰۰۰+ بازدید در ۲۴ ساعت اخیر</span>
                                                                    </div>

                                                                    {/* کلون آیتم اول برای لوپ نرم */}
                                                                    <div className={styles.item}>
                                                                        <img src="/IMGS/Uncategorized/heart.png" />
                                                                        <span>۴۰۰+ نفر به این کالا علاقه دارند</span>
                                                                    </div>
                                                                </div>
                                                            </div>


                                                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                                <button
                                                                    style={{ backgroundColor: '#ef4056', fontWeight: '600', color: 'white', width: '100%', height: '48px', border: 'none', borderRadius: '8px' }}
                                                                    onClick={() => {
                                                                        if (user && user.isAuthorized) {
                                                                            handleAddtoCart(item.id);
                                                                            navigate('/sabaadeKharid');
                                                                        }
                                                                        else navigate('/login')
                                                                    }}
                                                                >
                                                                    افزودن به سبد خرید
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div style={{ paddingRight: '4px', margin: '16px  4px  14px  0px' }}>
                                                        گارانتی 18 ماهه
                                                    </div>

                                                </div>
                                                <div></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.right}>
                                    <div className={styles.productImgCont}>
                                        <img src={item.img} style={{ width: '100%' }} alt="" />
                                    </div>
                                    <div className={styles.lilCont}>
                                        <div className={styles.littleImgCont}><img src={item.img} alt="" /></div>
                                        <div className={styles.littleImgCont}><img src={item.img} alt="" /></div>
                                        <div className={styles.littleImgCont}><img src={item.img} alt="" /></div>
                                        <div className={styles.littleImgCont}><img src={item.img} alt="" /></div>
                                        <div className={styles.littleImgCont}><img src={item.img} alt="" /></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }


            })}
        </div>
    )
}
export default Product
