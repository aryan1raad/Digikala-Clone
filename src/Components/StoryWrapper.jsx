import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import styles from '../assets/Styles/StoryWrapper.module.css';

//پیاده سازی این اسلایدر با سی اس اس ترنسلیت و ترنسفورم انجام شده است
export const StoryWrapper = ({ storyWrapperData }) => {
    const StoryRef = useRef(null);
    // موقعیت اسکرول شده :
    const translateXRef = useRef(0);
    const isDraggingRef = useRef(false);
    // فقط برای e.pageX آن هم برای ابتدا:
    const startXRef = useRef(0);
    const startTranslateRef = useRef(0);
    
    const [isDown, setIsDown] = useState(false);
    // کد های سطر های بعدی برای کنترل نمایش استوری و کنترل 
    const [activeStory , SetActiveStory] = useState(null);
    const videoRef = useRef(null);
    const isMuted = useRef(false);
    const MuteMessage = useRef(null);
    //رف برای نگه داشتن آیدی
    const IDKeeperRef = useRef(null);
    const progressBarRef = useRef(null);
    
    const handleTimeUpdate = () => {
        if(videoRef.current && progressBarRef.current){
            const percent = (videoRef.current.currentTime / videoRef.current.duration) * 100 ;
            progressBarRef.current.style.width = `${percent}%`;
        }
    }
    const storyIdKeepHandler = (IDvalue) => {
        IDKeeperRef.current = IDvalue;
    }
    //هندل کردن میوت با کلیک ویدیو
    const handleStoryMuted = () => {
        if(videoRef.current) {
            isMuted.current = (!isMuted.current);
            //برعکس کردن وضعیت فعلی صدا :
            videoRef.current.muted = isMuted.current;
            if (videoRef.current.muted){
                if(MuteMessage.current){
                    MuteMessage.current.classList.add('active');
                    MuteMessage.current.textContent = 'صدا میوت شد:(';
                }
            }
            else if (MuteMessage.current){
                MuteMessage.current.textContent = 'صدا آن شد :)';

                setTimeout(() => {
                    if(!isMuted.current && MuteMessage.current){
                        MuteMessage.current.style.visibility = 'hidden';
                        MuteMessage.current.classList.remove('active');
                    }
                }, 1000)
            }
        }
    }

    const handleClicker = (e) => {
        const storyContainer = e.target.closest(`.${styles.Story_container}`);
        if(storyContainer){
            const index = Array.from(StoryRef.current.children).indexOf(storyContainer);
            if (index !== -1 && storyWrapperData[index]) {
                SetActiveStory(storyWrapperData[index]);
                storyIdKeepHandler(storyWrapperData[index]);
            }
        }
    }
    
    const RightLeftFunction = (side) => {
        const max = StoryRef.current.scrollWidth - StoryRef.current.clientWidth;
        const min = 0 ;
        
        let newTranslate = 0 ;
        
        if( side==='left' ) { newTranslate = 75; } 
        else if ( side==='right' ) { newTranslate = -75; }
        if(StoryRef.current){
            StoryRef.current.style.transition = 'transform 0.3 cubic-bezier(0.25, 1, 0.5, 1)';
            if((translateXRef.current + newTranslate)  > max ) { translateXRef.current = max;}
            if((translateXRef.current + newTranslate)  < min ) { translateXRef.current = min;}
            else{
                translateXRef.current += newTranslate;
            }
            StoryRef.current.style.transform = `translate3d(${ translateXRef.current}px, 0, 0)`;
            // console.log( translateXRef.current , newTranslate)
        }
    }

    const handleMouseDown = (e) => {
        isDraggingRef.current = true;
        setIsDown(true);
        if(e.target.classList.contains('left') || e.target.classList.contains('right')) {console.log('yes'); return}
        // ذخیره موقعیت شروع ماوس
        startXRef.current = e.pageX;
        //  ذخیره موقعیت فعلی اسکرول درشروع ماوس
        startTranslateRef.current = translateXRef.current;
        if (StoryRef.current) {
            StoryRef.current.style.transition = 'none';
        }
    };

    const handleMouseMove = (e) => {
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

    const handleMouseUp = (e) => {
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
            const endX = e.pageX ;
            const ekhtelaf = Math.abs( endX - startXRef.current );

            if(ekhtelaf<5) { handleClicker(e); }

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

    const handleMouseLeave = (e) => {
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
        <div className={styles.Story_MainCont}>
            <button className="right"   style={{
                right:  '0' , 
                top: '52px' , 
                position:"absolute" , 
                zIndex:'1' , 
                padding: '10px' , 
                backgroundColor: 'white' , 
                borderRadius:'90px',
                width: '50px',
                height: '50px',
                border: 'rgb(224, 224, 226) 1px solid',
                color: 'rgb(66, 71, 80)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                scale:'0.88',
                fontWeight: '0.9',
                textAlign: 'center',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}  onClick={ () => RightLeftFunction('right')}
            >right</button>
            <div 
                style={{
                    transform: `translate3d(0px, 0, 0)`,
                    pointerEvents: activeStory ? 'none' : 'auto',

                }}
                className={styles.Story_wrapper}                        
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove} 
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseLeave}
                ref={StoryRef}
            >
                {/* مپ برای داده های استوری رپر */}
                {storyWrapperData.map((story, index) => (
                    <div className={styles.Story_container} key={index}>
                        <div className={styles.Story_IMG_Gradient}>
                            <div className={styles.Story_IMG_WHITE}>
                                <div className={styles.Story_IMG_CONT}>
                                    <img src={story.img} className={styles.Story_IMG} draggable='false' alt={story.title} />
                                </div>
                            </div>
                        </div>
                        <div className={styles.Story_title}>
                            {story.title}
                        </div>
                    </div>
                ))}
            </div>
            <button className="left" style={{
                left:  '0' , 
                top: '52px' , 
                position:"absolute" , 
                zIndex:'1' , 
                padding: '10px' , 
                backgroundColor: 'white' , 
                borderRadius:'90px',
                width: '50px',
                height: '50px',
                border: 'rgb(224, 224, 226) 1px solid',
                color: 'rgb(66, 71, 80)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                scale:'0.88'
            }} 
                onClick={ () => RightLeftFunction('left')}
            >Left</button>
        </div>

        {/* پورتال برای ویدیو ی استوری */}
        {activeStory && createPortal(
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
                        <h2 style={{fontWeight:600}}>{activeStory.title}</h2>
                        <button onClick={() =>{SetActiveStory(null); isMuted.current = false;}} style={{ marginTop: '10px' }}>بستن</button>
                    </div>
                    <Link to = {`product/${IDKeeperRef.current.id}`} >
                        <div className='Story_detail'>
                            <span>{`${activeStory.textContent}`}</span>
                            <div className='StoryModalImgCont'>
                                <img className='StoryModalImg' src={`${activeStory.productImg}`} />
                            </div>
                        </div>
                    </Link>

                </div>
            </div>, document.getElementById('StoryModal')
        )}
        
        </>
    );
};