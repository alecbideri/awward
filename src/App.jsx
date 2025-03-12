import React from 'react'
import Hero from "./components/Hero.jsx";

const App = () => {
    return (
        <div>
            <main className='relative min-h-screen w-screen overflow-x-hidden'>
                <Hero/>
                <section className='min-h-screen bg-black'/>
            </main>
        </div>
    )
}
export default App
