import React from 'react';
import { PortfolioProvider } from './context/PortfolioContext';
import Navbar from './components/navbar/Navbar';
import Hero from './components/hero/Hero';
import About from './components/about/About';
import Skills from './components/skills/Skills';
import Projects from './components/projects/Projects';
import Experience from './components/experience/Experience';
import Testimonials from './components/testimonials/Testimonials';
import Contact from './components/contact/Contact';
import Footer from './components/footer/Footer';
import AdminModal from './components/admin/AdminModal';

const PortfolioApp = () => {
  return (
    <div className="min-h-screen bg-bg-base text-text-main font-main transition-colors duration-300 selection:bg-primary selection:text-white relative">
      <Navbar />
      
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Testimonials />
        <Contact />
      </main>

      <Footer />
      
      {/* Floating Real-time Customization Panel */}
      <AdminModal />
    </div>
  );
};

function App() {
  return (
    <PortfolioProvider>
      <PortfolioApp />
    </PortfolioProvider>
  );
}

export default App;
