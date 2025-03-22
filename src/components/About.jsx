import React from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { useGSAP } from '@gsap/react';
import AnimatedTitle from './AnimatedTitle';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
    useGSAP(
        () => {
            const clipAnimation = gsap.timeline({
                scrollTrigger: {
                    trigger: '#clip',
                    start: 'center center',
                    end: '+=800 center',
                    scrub: 0.5,
                    pin: true,
                    pinSpacing: true,
                }
            });


            clipAnimation
                .to('#clip .mask-clip-path', {
                    clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
                    height: '100vh',
                    width: '100vw',
                    borderRadius: 0,
                    duration: 1,
                })
        },
        { scope: '#clip' }
    );

    return (
        <div id='about' className='min-h-screen w-screen'>
            <div className='relative mb-8 mt-36 flex flex-col items-center gap-5 text-center'>
                <h2 className='relative mb-8 font-general text-sm uppercase md:text-[10px]'>
                    Welcome to Zentry
                </h2>
                <AnimatedTitle
                    title="Dis<b>o</b>ver the world's <br /> largest shared <b>a</b>dventure"
                    containerClass="mt-5 !text-black text-center special-font"
                />
            </div>

            <div className='h-dvh w-screen flex flex-col items-center justify-center relative' id='clip'>
                <div className='mask-clip-path about-image'>
                    <img src="img/about.webp" alt="Background image" />
                </div>
                <div className='about-subtext'>
                    <p>The Game of Games begins-your life, now epic MMORPG</p>
                    <p className='text-black/50'>
                        Zentry unites every player from countless games and platforms
                    </p>
                </div>
            </div>
        </div>
    );
};

export default About;