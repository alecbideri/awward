import React from "react";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Navbar from "./components/Navbar.jsx";

const App = () => {
  return (
    <div>
      <main className="relative min-h-screen w-screen overflow-x-hidden">
        <Navbar />
        <Hero />
        <About />
        <section className="min-h-screen w-screen bg-black" />
      </main>
    </div>
  );
};
export default App;
