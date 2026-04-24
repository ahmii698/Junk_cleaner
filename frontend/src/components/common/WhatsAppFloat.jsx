import React from 'react';
import { Link } from 'react-router-dom';

const WhatsAppFloat = () => {
    return (
        <>
            <a href="https://wa.me/12482421376?text=Hi!%20Need%20junk%20removal%20quote" className="fixed bottom-6 right-6 bg-green-500 w-14 h-14 rounded-full flex items-center justify-center text-white text-3xl shadow-lg z-40 transition-all hover:scale-110 animate-pulse-green" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-whatsapp"></i>
            </a>
            <Link to="/contact" className="fixed bottom-6 left-6 bg-cyan-500 w-14 h-14 rounded-full flex items-center justify-center text-navy-900 text-2xl shadow-lg z-40 transition-all hover:scale-110">
                <i className="fas fa-comments"></i>
            </Link>
        </>
    );
};

export default WhatsAppFloat;