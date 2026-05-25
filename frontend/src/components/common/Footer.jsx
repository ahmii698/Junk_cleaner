import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getFooterSettings } from '../../services/api';

const Footer = () => {
    const [footer, setFooter] = useState(null);
    const [loading, setLoading] = useState(true);
    const currentYear = new Date().getFullYear();

    useEffect(() => {
        const fetchFooter = async () => {
            try {
                const res = await getFooterSettings();
                console.log('Footer settings:', res.data);
                setFooter(res.data);
            } catch (error) {
                console.error('Error fetching footer:', error);
                // Set default data if API fails
                setFooter({
                    company_name: 'Simon Junk Removal',
                    company_desc: 'Professional, eco-friendly junk removal serving Maplewood and all of Essex County, NJ.',
                    facebook_url: '#',
                    instagram_url: '#',
                    twitter_url: '#',
                    copyright_text: 'All rights reserved.',
                    license_text: 'License #JR-2847-NJ',
                    phone: '(248) 242-1376',
                    email: 'salvadorgutierrez2012@gmail.com',
                    address: 'Maplewood, NJ 07040',
                    footer_bg: 'bg-navy-900/80',
                    is_active: 1
                });
            } finally {
                setLoading(false);
            }
        };
        
        fetchFooter();
    }, []);

    if (loading || !footer || footer.is_active === 0) {
        return null;
    }

    return (
        <footer className={`${footer.footer_bg || 'bg-navy-900/80'} border-t border-cyan-500/10 py-12 mt-20`}>
            <div className="container-custom">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                    {/* Company Info */}
                    <div>
                        <h4 className="text-cyan-500 text-lg font-bold mb-4">{footer.company_name}</h4>
                        <p className="text-gray-400 text-sm">{footer.company_desc}</p>
                        <div className="flex space-x-4 mt-4">
                            <a href={footer.facebook_url} target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-cyan-500/10 rounded-full flex items-center justify-center text-gray-400 hover:text-cyan-500 transition-all"><i className="fab fa-facebook-f"></i></a>
                            <a href={footer.instagram_url} target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-cyan-500/10 rounded-full flex items-center justify-center text-gray-400 hover:text-cyan-500 transition-all"><i className="fab fa-instagram"></i></a>
                            <a href={footer.twitter_url} target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-cyan-500/10 rounded-full flex items-center justify-center text-gray-400 hover:text-cyan-500 transition-all"><i className="fab fa-twitter"></i></a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-cyan-500 text-lg font-bold mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            <li><Link to="/" className="text-gray-400 hover:text-cyan-500">Home</Link></li>
                            <li><Link to="/services" className="text-gray-400 hover:text-cyan-500">Services</Link></li>
                            <li><Link to="/about" className="text-gray-400 hover:text-cyan-500">About</Link></li>
                            <li><Link to="/contact" className="text-gray-400 hover:text-cyan-500">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Services Links */}
                    <div>
                        <h4 className="text-cyan-500 text-lg font-bold mb-4">Services</h4>
                        <ul className="space-y-2">
                            <li><Link to="/services" className="text-gray-400 hover:text-cyan-500">Residential Junk Removal</Link></li>
                            <li><Link to="/services" className="text-gray-400 hover:text-cyan-500">Commercial Junk Removal</Link></li>
                            <li><Link to="/services" className="text-gray-400 hover:text-cyan-500">Property Cleanouts</Link></li>
                            <li><Link to="/services" className="text-gray-400 hover:text-cyan-500">Demolition Services</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-cyan-500 text-lg font-bold mb-4">Contact Info</h4>
                        <ul className="space-y-3">
                            <li className="flex items-center space-x-3 text-gray-400">
                                <i className="fas fa-phone text-cyan-500"></i>
                                <span>{footer.phone}</span>
                            </li>
                            <li className="flex items-center space-x-3 text-gray-400">
                                <i className="fas fa-envelope text-cyan-500"></i>
                                <span className="text-sm break-all">{footer.email}</span>
                            </li>
                            <li className="flex items-center space-x-3 text-gray-400">
                                <i className="fas fa-map-marker-alt text-cyan-500"></i>
                                <span>{footer.address}</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t border-gray-800 pt-6 text-center">
                    <p className="text-gray-500 text-sm">
                        © {currentYear} {footer.company_name}. {footer.copyright_text} | {footer.license_text}
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;