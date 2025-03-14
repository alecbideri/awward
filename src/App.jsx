import React from 'react'
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";

const App = () => {
    return (
        <div>
            <main className='relative min-h-screen w-screen overflow-x-hidden'>
                <Hero/>
                <About/>
                <section className='min-h-screen w-screen bg-black'/>
            </main>
        </div>
    )
}
export default App
