import React, { useEffect } from 'react';
import Button from "./Button.jsx";
import { TiLocationArrow } from "react-icons/ti";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
    const [currentIndex, setCurrentIndex] = React.useState(1);
    const [hasClicked, setHasClicked] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(true);
    const [loadedVideos, setLoadedVideos] = React.useState(0);

    const totalVideos = 3;
    const nextVideoRef = React.useRef(null); // For #next-video
    const miniVideoRef = React.useRef(null); // For the mini video

    const handleVideoLoaded = () => {
        setLoadedVideos((prev) => prev + 1);
    };

    const upcomingVideoIndex = (currentIndex % totalVideos) + 1;

    useEffect(() => {
        if (loadedVideos === totalVideos) {
            setIsLoading(false);
        }
    }, [loadedVideos]);

    const handleMiniVdClick = () => {
        setHasClicked(true);
        setCurrentIndex(upcomingVideoIndex);
    };

    useGSAP(() => {
        if (hasClicked) {
            gsap.set('#next-video', { visibility: 'visible' });

            gsap.to('#next-video', {
                transformOrigin: 'center center',
                scale: 1,
                width: '100%',
                height: '100%',
                duration: 1,
                ease: 'power1.inOut',
                onStart: () => nextVideoRef.current.play(),
            });
        }
    }, { dependencies: [currentIndex], revertOnUpdate: true });

    useGSAP(() => {
        // Set initial state to a full rectangle
        gsap.set('#video-frame', {
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
            borderRadius: '0 0 0 0',
        });

        // Animate to trapezoid shape on scroll
        gsap.to('#video-frame', {
            clipPath: 'polygon(14% 0%, 72% 0%, 90% 90%, 0% 100%)',
            borderRadius: '0 0 40% 10%',
            ease: 'power1.inOut',
            scrollTrigger: {
                trigger: '#video-frame',
                start: 'top top',      // Start when top of #video-frame hits top of viewport
                end: 'bottom top',     // End when bottom of #video-frame hits top of viewport
                scrub: true,
            },
        });
    }, { dependencies: [] });

    const getVideoSrc = (index) => `videos/hero-${index}.mp4`;

    return (
        <>
            {isLoading && (
                <div className='flex-center absolute z-[100] h-dvh w-screen overflow-x-hidden bg-violet-50'>
                    <div className='three-body'>
                        <div className='three-body__dot'/>
                        <div className='three-body__dot'/>
                        <div className='three-body__dot'/>
                    </div>
                </div>
            )}
            <div className='relative h-dvh w-screen overflow-x-hidden'>
                <div id='video-frame' className='relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-Zblue-75'>
                    <div>
                        <div className='mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg'>
                            <div onClick={handleMiniVdClick} className='origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100'>
                                <video
                                    ref={miniVideoRef}
                                    src={getVideoSrc(upcomingVideoIndex)}
                                    loop
                                    muted
                                    id='mini-video'
                                    className='size-64 origin-center scale-150 object-cover object-center'
                                    onLoadedData={handleVideoLoaded}
                                />
                            </div>
                        </div>
                        <video
                            ref={nextVideoRef}
                            src={getVideoSrc(currentIndex)}
                            loop
                            muted
                            id='next-video'
                            className='absolute-center invisible absolute z-20 size-64 object-cover object-center'
                            onLoadedData={handleVideoLoaded}
                        />
                        <video
                            src={getVideoSrc(currentIndex === totalVideos - 1 ? 1 : currentIndex)}
                            autoPlay
                            loop
                            muted
                            className='absolute left-0 top-0 size-full object-cover object-center'
                            onLoadedData={handleVideoLoaded}
                        />
                        <h1 className='special-font hero-heading absolute text-Zblue-75 bottom-5 right-5 z-40'>G<b>A</b>ming</h1>
                        <div className='absolute left-0 top-0 z-40 size-full'>
                            <div className='mt-24 px-5 sm:px-10'>
                                <h1 className='special-font hero-heading text-Zblue-100'>redefin<b>e</b></h1>
                                <p className='mb-5 max-w-64 text-Zblue-100'>Enter the Metagame Layer <br /> Unleash the play Economy</p>
                                <Button
                                    id='watch-trailer'
                                    title='watch trailer'
                                    leftIcon={<TiLocationArrow />}
                                    containerClass='!bg-Zyellow-300 flex-center gap-1'
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <h1 className='special-font hero-heading absolute text-black bottom-5 right-5'>G<b>A</b>ming</h1>
            </div>
        </>
    );
};

export default Hero;