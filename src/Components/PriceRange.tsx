import { useState, useRef, useEffect } from 'react';
import styles from '../assets/Styles/SearchedPage.module.css'
import { Product, Products } from '../types/product';

interface PriceRangeProps {
    min?: number;
    max?: number;
    showingItems: Product[];
    setShowingItems: React.Dispatch<React.SetStateAction<Product[]>>;
    BeforeRange: React.MutableRefObject<Product[]>;  // ref حاوی آرایه‌ای از محصولات
}

const PriceRange = ({ min = 0, max = 50000000, showingItems, setShowingItems, BeforeRange }: PriceRangeProps) => {
    console.log(showingItems)
    const [minValue, setMinValue] = useState(min);
    const [maxValue, setMaxValue] = useState(max);

    const [dragging, setDragging] = useState<'min' | 'max' | null>(null);
    const [tabIsOpen, setTabOpen] = useState(false);
    const trackRef = useRef<HTMLDivElement>(null);

    // تعریف فرمت برای استفاده
    const format = Intl.NumberFormat();

    const getValueFromClientX = (clientX: number) => {
        if(!trackRef.current) return min;

        const rect = trackRef.current.getBoundingClientRect();
        let percent = 1 - ((clientX - rect.left) / rect.width);
        //کلیک های خارج از المنت
        if (percent < 0) percent = 0;
        if (percent > 1) percent = 1;
        // جمع با مینیمم برای از حتما صفر شروع نکردن
        let raw = min + percent * (max - min);
        return Math.round(raw);
    };

    const getPercent = (val: number) => {
        return ((val - min) / (max - min)) * 100;
    }
    let newArr: Products | [] = [];
    const finishPoint = () => {
        newArr = BeforeRange.current.filter(itm => (itm.priceNumber <= maxValue && itm.priceNumber >= minValue));
        setShowingItems(newArr)
    }
    //آن ماوس داون چیزی را فرخوانی نمیکند
    //استیت را درگینگ میکند و درنتیجه یوز افکت تریگر میشود
    useEffect(() => {
        if (!dragging) {
            // setMaxValue(max);
            // setMinValue(min);
            // return
            setDragging(null);
        }

        const HandleMouseMove = (e: MouseEvent ) => {
            const newValue = getValueFromClientX(e.clientX);
            // console.log(newValue)
            if (dragging === 'max' && newValue >= minValue)
                setMaxValue(newValue)
            else if (dragging === 'min' && newValue <= maxValue)
                setMinValue(newValue)
            //یا مینیمم رو کاربر حرکت میده یا ماکسیمم رو
        }
        const HandleMouseUp = () => {
            setDragging(null);
        }
        window.addEventListener('mousemove', HandleMouseMove);
        window.addEventListener('mouseup', HandleMouseUp)

        return () => {
            window.removeEventListener('mousemove', HandleMouseMove)
            window.removeEventListener('mouseup', HandleMouseUp)
        }
    }, [dragging, minValue, maxValue, min, max]);

    useEffect(() => {
        if (showingItems.length > 0) {
            let min = showingItems[0].priceNumber;
            let max = showingItems[0].priceNumber;
            for (let i = 0; i < showingItems.length; i++) {
                //پیدا کردن ماکسیمم و مینیمم
                if (showingItems[i].priceNumber < min)
                    min = showingItems[i].priceNumber;
                if (showingItems[i].priceNumber > max)
                    max = showingItems[i].priceNumber;
            }
            setMaxValue(max);
            setMinValue(min);
        }

    }, [showingItems])

    useEffect(() => {
        newArr = showingItems.filter(itm => (itm.priceNumber <= maxValue && itm.priceNumber >= minValue));
    }, [maxValue, minValue])


    const minPercent = getPercent(minValue);
    const maxPercent = getPercent(maxValue);
    console.log('min:', min, 'max:', max);
    return (
        <div style={{ padding: '12px 0', color: '#3f4064', fontWeight: '700', fontSize: '19px', borderBottom: '1px solid #f0f0f1' }}>
            <div onClick={() => setTabOpen((prev) => !prev)} style={{ userSelect: 'none' }}>محدوده قیمت</div>
            <div className={styles.container} style={{ maxHeight: `${tabIsOpen ? '330px' : '0px'}`, padding: `${!tabIsOpen ? 'unset' : '16px 12px'}` }}>
                <div className={styles.labels}>
                    <div className={styles.PriceRange}>
                        <div style={{ fontWeight: '700', fontSize: '16px', lineHeight: '2.15', color: '#81858b' }}>از</div>
                        <div style={{ width: '100%', textAlign: 'center', borderBottom: '1px solid #e0e0e2' }}>
                            <p style={{ fontWeight: '900', fontSize: '1.7rem', lineHeight: '2.1', color: '#3f4064', marginRight: 'auto', marginLeft: 'auto' }}>
                                {format.format(minValue)}
                            </p>
                        </div>
                        <div className={styles.PriceRangeImgCont}><img src="/IMGS/PishnahadIMGs/SVGs/toman.png" alt="" style={{ scale: '0.5' }} /></div>
                    </div>

                    <div className={styles.PriceRange}>
                        <div style={{ fontWeight: '700', fontSize: '16px', lineHeight: '2.15', color: '#81858b' }}>از</div>
                        <div style={{ width: '100%', textAlign: 'center', borderBottom: '1px solid #e0e0e2' }}>
                            <p style={{ fontWeight: '900', fontSize: '1.7rem', lineHeight: '2.1', color: '#3f4064', marginRight: 'auto', marginLeft: 'auto' }}>
                                {format.format(maxValue)}
                            </p>
                        </div>
                        <div className={styles.PriceRangeImgCont}><img src="/IMGS/PishnahadIMGs/SVGs/toman.png" alt="" style={{ scale: '0.5' }} /></div>
                    </div>
                </div>

                <div ref={trackRef} className={styles.track}>
                    {/*قسمت خاکستری*/}
                    <div className={styles.trackBackground}></div>
                    <div
                        className={styles.filled}
                        style={{
                            right: `${minPercent}%`,
                            width: `${maxPercent - minPercent}%`
                        }}
                    >
                    </div>
                    <div
                        onMouseDown={() => setDragging('min')}
                        className={styles.thumb}
                        style={{ right: `${minPercent}%` }}
                    >
                    </div>
                    <div
                        onMouseDown={() => setDragging('max')}
                        className={styles.thumb}
                        //این عدد 1.4 برای روهم منطبق نشدن و یو اکس بهتر است
                        style={{ right: `${maxPercent + 1.4}%` }}
                    >
                    </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }} dir='ltr'>
                    <span>گرانترین</span>
                    <span>ارزانترین</span>
                </div>
                <button
                    onClick={finishPoint}
                    style={{ width: '100%', backgroundColor: '#00bcd4', color: 'white', fontWeight: '700', padding: '5px', border: 'none', marginTop: '10px' }}
                >اعمال</button>
                <button
                    onClick={() => { setShowingItems(BeforeRange.current) }}
                    style={{ width: '100%', background: 'linear-gradient(225deg, #d22c4e, #ee384e, #ef5662)', color: 'white', padding: '5px', border: 'none', marginTop: '10px' }}
                >بازنشانی محدوده</button>
            </div>

        </div>

    );
}

export default PriceRange