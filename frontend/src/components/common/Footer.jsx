import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-navy-900/80 border-t border-cyan-500/10 py-12 mt-20">
            <div className="container-custom">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                    <div>
                        <h4 className="text-cyan-500 text-lg font-bold mb-4">Simon Junk Removal</h4>
                        <p className="text-gray-400 text-sm">Professional, eco-friendly junk removal serving Maplewood and all of Essex County, NJ.</p>
                        <div className="flex space-x-4 mt-4">
                            <a href="#" className="w-8 h-8 bg-cyan-500/10 rounded-full flex items-center justify-center text-gray-400 hover:text-cyan-500 transition-all"><i className="fab fa-facebook-f"></i></a>
                            <a href="#" className="w-8 h-8 bg-cyan-500/10 rounded-full flex items-center justify-center text-gray-400 hover:text-cyan-500 transition-all"><i className="fab fa-instagram"></i></a>
                            <a href="#" className="w-8 h-8 bg-cyan-500/10 rounded-full flex items-center justify-center text-gray-400 hover:text-cyan-500 transition-all"><i className="fab fa-twitter"></i></a>
                        </div>
                    </div>
                    <div>
                        <h4 className="text-cyan-500 text-lg font-bold mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            <li><Link to="/" className="text-gray-400 hover:text-cyan-500">Home</Link></li>
                            <li><Link to="/services" className="text-gray-400 hover:text-cyan-500">Services</Link></li>
                            <li><Link to="/about" className="text-gray-400 hover:text-cyan-500">About</Link></li>
                            <li><Link to="/contact" className="text-gray-400 hover:text-cyan-500">Contact</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-cyan-500 text-lg font-bold mb-4">Services</h4>
                        <ul className="space-y-2">
                            <li><Link to="/services" className="text-gray-400 hover:text-cyan-500">Residential Junk Removal</Link></li>
                            <li><Link to="/services" className="text-gray-400 hover:text-cyan-500">Commercial Junk Removal</Link></li>
                            <li><Link to="/services" className="text-gray-400 hover:text-cyan-500">Property Cleanouts</Link></li>
                            <li><Link to="/services" className="text-gray-400 hover:text-cyan-500">Demolition Services</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-cyan-500 text-lg font-bold mb-4">Contact Info</h4>
                        <ul className="space-y-3">
                            <li className="flex items-center space-x-3 text-gray-400"><i className="fas fa-phone text-cyan-500"></i><span>(248) 242-1376</span></li>
                            <li className="flex items-center space-x-3 text-gray-400"><i className="fas fa-envelope text-cyan-500"></i><span className="text-sm">salvadorgutierrez2012@gmail.com</span></li>
                            <li className="flex items-center space-x-3 text-gray-400"><i className="fas fa-map-marker-alt text-cyan-500"></i><span>Maplewood, NJ 07040</span></li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-gray-800 pt-6 text-center">
                    <p className="text-gray-500 text-sm">© {currentYear} Simon Junk Removal. All rights reserved. | License #JR-2847-NJ</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;