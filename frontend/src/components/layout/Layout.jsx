import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../common/Navbar';
import Footer from '../common/Footer';
import WhatsAppFloat from '../common/WhatsAppFloat';

const Layout = ({ children }) => {
  const location = useLocation();

  // Force scroll to top and re-trigger animations
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Re-trigger reveal animations
    const timer = setTimeout(() => {
      const reveals = document.querySelectorAll('.reveal');
      reveals.forEach(el => {
        el.classList.remove('active');
        // Force reflow
        void el.offsetHeight;
        if (el.getBoundingClientRect().top < window.innerHeight - 100) {
          el.classList.add('active');
        }
      });
    }, 50);
    
    return () => clearTimeout(timer);
  }, [location]);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-20">
        {children}
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
};

export default Layout;