import React, { useState, useRef, useEffect } from 'react';
import styles from '../assets/Styles/Slider.module.scss';
import { SliderItem } from '../Pages/Landing';

//پیاده سازی این اسلایدر با اسکرول ذاتی جاواسکریپت انجام شده است
export const Slider = ({ SliderIMGs }: {SliderIMGs: SliderItem[]}) => {
    const sliderRef = useRef<HTMLDivElement>(null);
    const timerRef = useRef<number | null>(null);
    
    //کد توسط بوف ادیت شده است
    const [ImgContWidth, setImgContWidth] = useState(0);
    const [isDown, setIsDown] = useState(false);
    const [targetPosition, setTargetPosition] = useState(0);
    
    const startXRef = useRef(0);
    const scrollLeftRef = useRef(0);

    const updateSize = () => {
        if (sliderRef.current && sliderRef.current.children.length > 0) {
            // تغییر مهم: عرض اولین فرزند (اسلاید) را می‌گیریم، نه عرض کل کانتینر را
            // این باعث می‌شود دقیقاً بدانیم هر اسلاید چقدر عرض دارد
            setImgContWidth(sliderRef.current.children[0].clientWidth);
            // فعلا کد بالایی را به تعلیق در میاوریم به خاطر حفظ درست سایز در تغییر اندازه در مرورگر
            setTargetPosition(0);
            sliderRef.current.scrollTo({left: 0})
        }
    }

    const autoSlider = () => {
        if (!sliderRef.current || ImgContWidth === 0) return;
        
        const maxScrollLeft = sliderRef.current.scrollWidth - sliderRef.current.clientWidth;
        const currentScroll = sliderRef.current.scrollLeft;
        
        // محاسبه ایندکس اسلاید فعلی برای جلوگیری از انحراف
        const currentIndex = Math.round(currentScroll / ImgContWidth);
        let nextIndex = currentIndex + 1;
        
        // اگر به آخر رسید، برگرد به اول
        if (nextIndex * ImgContWidth > maxScrollLeft) {
            nextIndex = 0;
        }
        
        const nextPos = nextIndex * ImgContWidth;

        sliderRef.current.scrollTo({
            left: nextPos,
            behavior: 'smooth'
        });
        setTargetPosition(nextPos);
    };

    useEffect(() => {
        // تاخیر کوچک برای اطمینان از لود شدن DOM
        const timeoutId = setTimeout(() => {
            updateSize();
        }, 100);

        timerRef.current = setInterval(autoSlider, 3000);
        window.addEventListener('resize', updateSize);

        return () => {
            clearTimeout(timeoutId);
            if (timerRef.current) clearInterval(timerRef.current);
            window.removeEventListener('resize', updateSize);
        };
    }, [ImgContWidth]); // این وابستگی باعث می‌شود وقتی عرض محاسبه شد، اسلایدر آپدیت شود

    const handleMouseDown = (e: React.MouseEvent) => {
        if (timerRef.current) clearInterval(timerRef.current);
        setIsDown(true);
        if (sliderRef.current) {
            startXRef.current = e.pageX - sliderRef.current.offsetLeft;
            scrollLeftRef.current = sliderRef.current.scrollLeft;
        }
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDown) return;
        e.preventDefault();
        if (sliderRef.current) {
            const x = e.pageX - sliderRef.current.offsetLeft;
            const walk = (x - startXRef.current) * 1; 
            sliderRef.current.scrollLeft = scrollLeftRef.current - walk;
        }
    };

    const handleMouseUp = () => { 
        setIsDown(false); 
        
        if (sliderRef.current) {
            const currentScroll = sliderRef.current.scrollLeft;
            const maxScrollLeft = sliderRef.current.scrollWidth - sliderRef.current.clientWidth;
            const hassasiat = 100 ;
            if((targetPosition+hassasiat)<currentScroll){
                let nextPos = targetPosition + ImgContWidth;
                //اگر میزان اسکرولی که میخوایم از باقیمانده بیشتر باشد
                //برگردیم اول
                if(nextPos > maxScrollLeft){
                    nextPos = 0;
                }
                sliderRef.current.scrollTo({ left: nextPos, behavior: 'smooth' });
                setTargetPosition(nextPos);
            }
            else if((targetPosition-hassasiat)>currentScroll){
                let prevPos = targetPosition - ImgContWidth;
                if(prevPos < 0){
                    prevPos = 0;
                }
                sliderRef.current.scrollTo({ left: prevPos, behavior: 'smooth' });
                setTargetPosition(prevPos);
            }
            else{
                sliderRef.current.scrollTo({left:targetPosition , behavior: 'smooth'});
            }
        }
        
        // راه‌اندازی مجدد تایمر
        if (timerRef.current) clearInterval(timerRef.current);
        timerRef.current = setInterval(autoSlider, 3000);
    };

    const handleMouseLeave = () => { 
        setIsDown(false);
        if (sliderRef.current) {
             sliderRef.current.scrollTo({ left: targetPosition, behavior: 'smooth' });
        }
        if (timerRef.current) clearInterval(timerRef.current);
        timerRef.current = setInterval(autoSlider, 3000);
    };

    return (
        <div
            className={styles.SliderCont}
            ref={sliderRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            style={{
                overflowX: 'scroll', 
                display: 'flex',
                cursor: isDown ? 'grabbing' : 'grab',
                userSelect: 'none', 
                scrollbarWidth: 'none'
            }}
        >
            {SliderIMGs.map((image: SliderItem, index:number) => (
                <div key={index} className={styles.Slider_IMG_Cont}>
                    <img src={image.src} alt="" className={styles.Slider_IMG} draggable="false" />
                </div>
            ))}
        </div>
    );
};