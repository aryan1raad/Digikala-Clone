import { useState , useRef , useEffect} from 'react';
import styles from '../assets/Styles/SearchedPage.module.css'

const PriceRange = ({ min = 0, max = 50000000 }) => {
    const [minValue, setMinValue] = useState(min);
    const [maxValue, setMaxValue] = useState(max);
    const [dragging , setDragging] = useState(null);
    const [tabIsOpen , setTabOpen] = useState(false);
    const trackRef = useRef(null);

    // تعریف فرمت برای استفاده
    const format = Intl.NumberFormat();

    const getValueFromClientX = (clientX) => {
        const rect = trackRef.current.getBoundingClientRect();
        let percent = 1 - ((clientX - rect.left) / rect.width);
        //کلیک های خارج از المنت
        if (percent < 0) percent = 0;
        if (percent > 1) percent = 1;
        // جمع با مینیمم برای از حتما صفر شروع نکردن
        let raw = min + percent * (max - min);
        return Math.round(raw);
    };

    const getPercent = (val) => {
        return ((val-min) / (max-min)) * 100;
    }
    
    //آن ماوس داون چیزی را فرخوانی نمیکند
    //استیت را درگینگ میکند و درنتیجه یوز افکت تریگر میشود
    useEffect(() => {
        if(!dragging) 
            return

        const HandleMouseMove = (e) => {
            const newValue = getValueFromClientX(e.clientX)
            if( dragging === 'max' && newValue >= minValue) 
                setMaxValue(newValue)
            else if ( dragging === 'min' && newValue <= maxValue)
                setMinValue(newValue)
            //یا مینیمم رو کاربر حرکت میده یا ماکسیمم رو
        }
        const HandleMouseUp = () => {
            setDragging(null);
        }
        window.addEventListener('mousemove' , HandleMouseMove);
        window.addEventListener('mouseup' , HandleMouseUp)

        return () => {
            window.removeEventListener('mousemove' , HandleMouseMove)
            window.removeEventListener('mouseup' , HandleMouseUp)
        }
    } , [dragging , minValue , maxValue , min , max]);

    const minPercent = getPercent(minValue);
    const maxPercent = getPercent(maxValue);

    return (
        <div style={{padding: '12px 0', color: '#3f4064', fontWeight: '700' , fontSize: '19px' , borderBottom: '1px solid #f0f0f1'}}>
            <div onClick={() => setTabOpen((prev) => !prev)} style={{userSelect: 'none'}}>محدوده قیمت</div>
            <div className={styles.container} style={{maxHeight: `${tabIsOpen ? '250px' : '0px'}` , padding: `${!tabIsOpen ? 'unset' : '16px 12px'}`}}>
                <div className={styles.labels}>
                    <div className={styles.PriceRange}>
                        <div style={{fontWeight: '700', fontSize: '16px' , lineHeight: '2.15', color: '#81858b'}}>از</div>
                        <div style={{width: '100%' , textAlign: 'center', borderBottom: '1px solid #e0e0e2'}}>
                            <p style={{fontWeight: '900', fontSize: '1.7rem' , lineHeight: '2.1', color: '#3f4064' , marginRight: 'auto' , marginLeft: 'auto'}}>
                                {format.format(minValue)}
                            </p>
                        </div>
                        <div className={styles.PriceRangeImgCont}><img src="/src/assets/IMGS/PishnahadIMGs/SVGs/toman.png" alt="" style={{scale: '0.5'}}/></div>
                    </div>

                    <div className={styles.PriceRange}>
                        <div style={{fontWeight: '700', fontSize: '16px' , lineHeight: '2.15', color: '#81858b'}}>از</div>
                        <div style={{width: '100%' , textAlign: 'center', borderBottom: '1px solid #e0e0e2'}}>
                            <p style={{fontWeight: '900', fontSize: '1.7rem' , lineHeight: '2.1', color: '#3f4064' , marginRight: 'auto' , marginLeft: 'auto'}}>
                                {format.format(maxValue)}
                            </p>
                        </div>
                        <div className={styles.PriceRangeImgCont}><img src="/src/assets/IMGS/PishnahadIMGs/SVGs/toman.png" alt="" style={{scale: '0.5'}}/></div>
                    </div>            
                </div>

                <div ref={trackRef} className={styles.track}>
                    {/*قسمت خاکستری*/}
                    <div className={styles.trackBackground} />
                    <div 
                        className={styles.filled} 
                        style={{
                            right: `${minPercent}%`, 
                            width: `${maxPercent - minPercent}%`
                        }} 
                    />
                    <div 
                        onMouseDown={() => setDragging('min')} 
                        className={styles.thumb} 
                        style={{right: `${minPercent}%`}} 
                    />
                    <div 
                        onMouseDown={() => setDragging('max')} 
                        className={styles.thumb} 
                        style={{right: `${maxPercent}%`}} 
                    />
                </div>
                <div style={{display: 'flex' , justifyContent: 'space-between'}} dir='ltr'>
                    <span>گرانترین</span>
                    <span>ارزانترین</span>
                </div>
            </div>
        </div>
        
    );
}

export default PriceRange