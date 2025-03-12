
---

## 2. Commented Code , for more explanation 

below is the detailed comments to the `Hero` component to explain the intention of each part of the code.

```jsx
import React, { useEffect } from 'react';
import Button from './Button.jsx'; // Custom Button component for the "Watch Trailer" button
import { TiLocationArrow } from 'react-icons/ti'; // Icon for the "Watch Trailer" button
import { useGSAP } from '@gsap/react'; // GSAP hook for React
import gsap from 'gsap'; // Core GSAP library for animations
import { ScrollTrigger } from 'gsap/all'; // ScrollTrigger plugin for scroll-based animations

// Register ScrollTrigger plugin with GSAP
gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
    // State to track the current background video (1, 2, or 3 for hero-1.mp4, hero-2.mp4, hero-3.mp4)
    const [currentIndex, setCurrentIndex] = React.useState(1);
    // State to trigger GSAP animation when the mini video is clicked
    const [hasClicked, setHasClicked] = React.useState(false);
    // State to control the loading overlay visibility
    const [isLoading, setIsLoading] = React.useState(true);
    // State to count how many videos have loaded
    const [loadedVideos, setLoadedVideos] = React.useState(0);

    // Total number of videos in the sequence
    const totalVideos = 3;
    // Ref for the transitioning video (#next-video) that scales up when clicked
    const nextVideoRef = React.useRef(null);
    // Ref for the mini video preview to isolate it from other animations
    const miniVideoRef = React.useRef(null);

    // Function to increment loadedVideos when a video finishes loading
    const handleVideoLoaded = () => {
        setLoadedVideos((prev) => prev + 1);
    };

    // Calculate the index of the next video in the sequence (loops back to 1 after 3)
    const upcomingVideoIndex = (currentIndex % totalVideos) + 1;

    // UseEffect to hide the loading overlay when all videos are loaded
    useEffect(() => {
        if (loadedVideos === totalVideos) {
            setIsLoading(false); // Hide loading overlay when all 3 videos are loaded
        }
    }, [loadedVideos]); // Re-run whenever loadedVideos changes

    // Function to handle clicks on the mini video preview
    const handleMiniVdClick = () => {
        setHasClicked(true); // Trigger GSAP animation for video transition
        setCurrentIndex(upcomingVideoIndex); // Update to the next video
    };

    // GSAP animation for transitioning to the next video when the mini video is clicked
    useGSAP(() => {
        if (hasClicked) {
            // Make the transitioning video visible
            gsap.set('#next-video', { visibility: 'visible' });

            // Animate #next-video from small to full-screen
            gsap.to('#next-video', {
                transformOrigin: 'center center',
                scale: 1,
                width: '100%',
                height: '100%',
                duration: 1,
                ease: 'power1.inOut',
                onStart: () => nextVideoRef.current.play(), // Play the video during animation
            });
        }
    }, { dependencies: [currentIndex], revertOnUpdate: true }); // Re-run when currentIndex changes

    // GSAP animation for the scroll-triggered trapezoid transformation
    useGSAP(() => {
        // Set initial state to a full rectangle to ensure the section starts full-screen
        gsap.set('#video-frame', {
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
            borderRadius: '0 0 0 0',
        });

        // Animate to trapezoid shape with rounded bottom corners as the user scrolls
        gsap.to('#video-frame', {
            clipPath: 'polygon(14% 0%, 72% 0%, 90% 90%, 0% 100%)', // Trapezoid shape
            borderRadius: '0 0 40% 10%', // Rounded bottom corners
            ease: 'power1.inOut',
            scrollTrigger: {
                trigger: '#video-frame',
                start: 'top top', // Start when top of #video-frame hits top of viewport
                end: 'bottom top', // End when bottom of #video-frame hits top of viewport
                scrub: true, // Tie animation progress to scroll position
            },
        });
    }, { dependencies: [] }); // Run once on mount

    // Function to generate video source paths based on index
    const getVideoSrc = (index) => `videos/hero-${index}.mp4`;

    return (
        <>
            {/* Loading overlay: Displays a violet background with a three-dot loader until all videos are loaded */}
            {isLoading && (
                <div className='flex-center absolute z-[100] h-dvh w-screen overflow-x-hidden bg-violet-50'>
                    <div className='three-body'>
                        <div className='three-body__dot'/>
                        <div className='three-body__dot'/>
                        <div className='three-body__dot'/>
                    </div>
                </div>
            )}
            {/* Main container for the hero section */}
            <div className='relative h-dvh w-screen overflow-x-hidden'>
                {/* Video frame containing all content, animated to a trapezoid on scroll */}
                <div id='video-frame' className='relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-Zblue-75'>
                    <div>
                        {/* Mini video preview: Scales and fades in on hover, triggers transition on click */}
                        <div className='mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg'>
                            <div
                                onClick={handleMiniVdClick}
                                className='origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100'
                            >
                                <video
                                    ref={miniVideoRef}
                                    src={getVideoSrc(upcomingVideoIndex)} // Next video in sequence
                                    loop
                                    muted
                                    id='mini-video'
                                    className='size-64 origin-center scale-150 object-cover object-center'
                                    onLoadedData={handleVideoLoaded}
                                />
                            </div>
                        </div>
                        {/* Transitioning video: Expands to full-screen when mini video is clicked */}
                        <video
                            ref={nextVideoRef}
                            src={getVideoSrc(currentIndex)} // Current video, updates on click
                            loop
                            muted
                            id='next-video'
                            className='absolute-center invisible absolute z-20 size-64 object-cover object-center'
                            onLoadedData={handleVideoLoaded}
                        />
                        {/* Background video: Always playing, updates based on currentIndex */}
                        <video
                            src={getVideoSrc(currentIndex === totalVideos - 1 ? 1 : currentIndex)}
                            autoPlay
                            loop
                            muted
                            className='absolute left-0 top-0 size-full object-cover object-center'
                            onLoadedData={handleVideoLoaded}
                        />
                        {/* Bottom-right "GAMING" text with stylized "A" */}
                        <h1 className='special-font hero-heading absolute text-Zblue-75 bottom-5 right-5 z-40'>
                            G<b>A</b>ming
                        </h1>
                        {/* Overlay for top-left content: "REDEFINE," tagline, and button */}
                        <div className='absolute left-0 top-0 z-40 size-full'>
                            <div className='mt-24 px-5 sm:px-10'>
                                <h1 className='special-font hero-heading text-Zblue-100'>
                                    redefin<b>e</b>
                                </h1>
                                <p className='mb-5 max-w-64 text-Zblue-100'>
                                    Enter the Metagame Layer <br /> Unleash the play Economy
                                </p>
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
                {/* Bottom-right "GAMING" text outside #video-frame (not clipped) */}
                <h1 className='special-font hero-heading absolute text-black bottom-5 right-5'>
                    G<b>A</b>ming
                </h1>
            </div>
        </>
    );
};

export default Hero;