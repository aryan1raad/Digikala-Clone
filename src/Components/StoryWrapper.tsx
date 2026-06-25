import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import styles from '../assets/Styles/StoryWrapper.module.scss';
import { StoryDataType } from '../App';


interface storyWrapperDataType {
    id:number,
    img:string,
    productImg:string,
    textContent:string,
    title:string,
    video:string
}



//پیاده سازی این اسلایدر با سی اس اس ترنسلیت و ترنسفورم انجام شده است
export const StoryWrapper = ({ storyWrapperData }: {
    storyWrapperData: storyWrapperDataType[]
} ) => {
    const modal = document.getElementById('StoryModal');
    const StoryRef = useRef<HTMLDivElement>(null);
    const leftBTN = useRef<HTMLButtonElement>(null);
    const rightBTN = useRef<HTMLButtonElement>(null);

    // موقعیت اسکرول شده :
    const translateXRef = useRef(0);
    const isDraggingRef = useRef(false);
    // فقط برای e.pageX آن هم برای ابتدا:
    const startXRef = useRef(0);
    const startTranslateRef = useRef(0);

    const [isDown, setIsDown] = useState(false);
    // کد های سطر های بعدی برای کنترل نمایش استوری و کنترل 
    const [activeStory, SetActiveStory] = useState<StoryDataType | null>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const isMuted = useRef(false);
    //مطمئن نیستم
    const MuteMessage = useRef<HTMLParagraphElement | null>(null);
    //رف برای نگه داشتن آیدی
    const IDKeeperRef = useRef<storyWrapperDataType | null>(null);
    const progressBarRef = useRef<HTMLDivElement>(null);

    const handleTimeUpdate = () => {
        if (videoRef.current && progressBarRef.current) {
            const percent = (videoRef.current.currentTime / videoRef.current.duration) * 100;
            progressBarRef.current.style.width = `${percent}%`;
        }
    }
    const storyIdKeepHandler = (IDvalue: storyWrapperDataType) => {
        IDKeeperRef.current = IDvalue;
    }
    //هندل کردن میوت با کلیک ویدیو
    const handleStoryMuted = () => {
        if (videoRef.current) {
            isMuted.current = (!isMuted.current);
            //برعکس کردن وضعیت فعلی صدا :
            videoRef.current.muted = isMuted.current;
            if (videoRef.current.muted) {
                if (MuteMessage.current) {
                    MuteMessage.current.classList.add('active');
                    MuteMessage.current.textContent = 'صدا میوت شد:(';
                }
            }
            else if (MuteMessage.current) {
                MuteMessage.current.textContent = 'صدا آن شد :)';

                setTimeout(() => {
                    if (!isMuted.current && MuteMessage.current) {
                        MuteMessage.current.style.visibility = 'hidden';
                        MuteMessage.current.classList.remove('active');
                    }
                }, 1000)
            }
        }
    }

    const handleClicker = (e: React.MouseEvent<HTMLDivElement>) => {
        //گرفتن استوری کلیک شده با کلوسست
        const target = e.target as HTMLElement
        const storyContainer = target.closest(`.${styles['Story__container']}`);
        if (storyContainer) {
            //AI coded:
            if (!StoryRef.current) return;
            const index = Array.from(StoryRef.current?.children).indexOf(storyContainer);
            if (index !== -1 && storyWrapperData[index]) {
                SetActiveStory(storyWrapperData[index]);
                storyIdKeepHandler(storyWrapperData[index]);
            }
        }
    }

    const RightLeftFunction = (side : 'right' | 'left') => {
        if (!StoryRef.current) return;
        const max = StoryRef.current?.scrollWidth - StoryRef.current?.clientWidth;
        const min = 0;

        let newTranslate = 0;

        if (side === 'left') { newTranslate = 75; }
        else if (side === 'right') { newTranslate = -75; }
        if (StoryRef.current) {
            StoryRef.current.style.transition = 'transform 0.3 cubic-bezier(0.25, 1, 0.5, 1)';
            if ((translateXRef.current + newTranslate) > max) { translateXRef.current = max; }
            if ((translateXRef.current + newTranslate) < min) { translateXRef.current = min; }
            else {
                translateXRef.current += newTranslate;
            }
            StoryRef.current.style.transform = `translate3d(${translateXRef.current}px, 0, 0)`;
            // console.log( translateXRef.current , newTranslate)
        }
    }

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        isDraggingRef.current = true;
        setIsDown(true);
        if(rightBTN && leftBTN){
            //as Node برای این است که تایپ اسکریپت مطمئن شود
            if(rightBTN.current?.contains(e.target as Node) || leftBTN.current?.contains(e.target as Node))
                return
        }
        // ذخیره موقعیت شروع ماوس
        startXRef.current = e.pageX;
        //  ذخیره موقعیت فعلی اسکرول درشروع ماوس
        startTranslateRef.current = translateXRef.current;
        if (StoryRef.current) {
            StoryRef.current.style.transition = 'none';
        }
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isDraggingRef.current) return;

        e.preventDefault();

        if (StoryRef.current) {
            // محاسبه مسافت حرکت ماوس
            const walk = (e.pageX - startXRef.current);
            const newTranslate = startTranslateRef.current + walk;
            // console.log(walk);
            translateXRef.current = newTranslate;
            StoryRef.current.style.transform = `translate3d(${newTranslate}px, 0, 0)`;
        }
    };

    const handleMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isDraggingRef.current) return;

        isDraggingRef.current = false;
        setIsDown(false);

        if (StoryRef.current) {
            StoryRef.current.style.transition = 'transform 0.3s cubic-bezier(0.25, 1, 0.5, 1)';
            const clientWidth = StoryRef.current.clientWidth;
            const totalWidth = StoryRef.current.scrollWidth;
            // محاسبه مرزها
            const max = totalWidth - clientWidth;
            const min = 0;
            let finalPosition = translateXRef.current;

            //محاسبه ی کلیک شدن
            const endX = e.pageX;
            const ekhtelaf = Math.abs(endX - startXRef.current);

            if (ekhtelaf < 5) { handleClicker(e); }

            // اصلاح موقعیت نهایی اگر از مرزکانتینر ها خارج شده باشد
            if (finalPosition < min) {
                finalPosition = min;
            } else if (finalPosition > max) {
                finalPosition = max;
            }

            translateXRef.current = finalPosition;
            StoryRef.current.style.transform = `translate3d(${finalPosition}px, 0, 0)`;
        }
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
        handleMouseUp(e);
    };

    // پاکسازی برای جلوگیری از ارورهای حافظه
    useEffect(() => {
        return () => {
            isDraggingRef.current = false;
        };
    }, []);


    return (
        <>
            <div className={styles['StoryCont']}>
                <button ref={rightBTN} className={styles['StoryCont__buttonRight']}
                    onClick={() => RightLeftFunction('right')}
                >right</button>
                <div
                    style={{
                        transform: `translate3d(0px, 0, 0)`,
                        pointerEvents: activeStory ? 'none' : 'auto',

                    }}
                    className={styles['Story__wrapper']}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseLeave}
                    ref={StoryRef}
                >
                    {/* مپ برای داده های استوری رپر */}
                    {storyWrapperData.map((story, index) => (
                        <div className={styles['Story__container']} key={index}>
                            <div className={styles['StoryIMG_Gradient']}>
                                <div className={styles['StoryIMG_WHITE']}>
                                    <div className={styles['StoryIMG_CONT']}>
                                        <img src={story.img} className={styles['StoryIMG']} draggable='false' alt={story.title} />
                                    </div>
                                </div>
                            </div>
                            <div className={styles['Story--title']}>
                                {story.title}
                            </div>
                        </div>
                    ))}
                </div>
                <button ref={leftBTN} className={styles['StoryCont__buttonLeft']}
                    onClick={() => RightLeftFunction('left')}
                >Left</button>
            </div>

            {/* پورتال برای ویدیو ی استوری */}
            {
            modal ?
            activeStory && createPortal(
                <div
                    className='StoryModalPortal'
                    onClick={() => {
                        SetActiveStory(null);
                        isMuted.current = false;
                    }}
                    style={{
                        position: 'fixed',
                        zIndex: '2',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        background: 'rgba(0,0,0,0.8)',
                        color: '#fff',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <div
                        className='StoryVideoCont'
                        // جلوی بسته شدن را می‌گیرد وقتی روی خود محتوا کلیک می‌شود
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            background: '#fff',
                            color: '#000',
                            borderRadius: '10px',
                            position: 'relative',
                        }}
                    >
                        <video
                            ref={videoRef}
                            onClick={handleStoryMuted}
                            onTimeUpdate={handleTimeUpdate}
                            className='Story_video'
                            autoPlay src={`${activeStory.video}`}
                            muted={isMuted.current}
                            loop>
                        </video>
                        <div className='progressBarCont'>
                            <div
                                className='progressBar'
                                ref={progressBarRef}
                            >
                                <div className='progress'></div>
                            </div>
                        </div>
                        <p className='MuteMessage' ref={MuteMessage}>
                            صدا میوت شد{':('}
                        </p>

                        <div className='StoryVideoDown'>
                            <h2 style={{ fontWeight: 600 }}>{activeStory.title}</h2>
                            <button onClick={() => { SetActiveStory(null); isMuted.current = false; }} style={{ marginTop: '10px' }}>بستن</button>
                        </div>
                        <Link to={`product/${IDKeeperRef.current?.id}`} >
                            <div className='Story_detail'>
                                <span>{`${activeStory.textContent}`}</span>
                                <div className='StoryModalImgCont'>
                                    <img className='StoryModalImg' src={`${activeStory.productImg}`} />
                                </div>
                            </div>
                        </Link>

                    </div>
                </div>, modal
            )
            : null
        }

        </>
    );
};