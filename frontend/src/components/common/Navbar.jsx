import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/');
        setIsOpen(false);
    };

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Services', path: '/services' },
        { name: 'About', path: '/about' },
        { name: 'Gallery', path: '/gallery' },
        { name: 'FAQ', path: '/faq' },
        { name: 'Contact', path: '/contact' },
    ];

    return (
        <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-navy-900/95 backdrop-blur-md border-b border-cyan-500/20' : 'bg-transparent'}`}>
            <div className="container-custom">
                <div className="flex justify-between items-center py-3">
                    {/* Logo - Bada kiya */}
                    <Link to="/" className="flex items-center shrink-0">
                        <img 
                            src="https://lirp.cdn-website.com/3ef302d5/dms3rep/multi/opt/Simon+Junk+Removal+logo+red-1920w.png" 
                            alt="Simon Junk Removal" 
                            className="h-14 md:h-16 w-auto"
                        />
                    </Link>

                    {/* Desktop Menu - Center aligned */}
                    <div className="hidden md:flex items-center justify-center flex-1 mx-4">
                        <div className="flex items-center space-x-6 lg:space-x-8">
                            {navLinks.map(link => (
                                <Link key={link.path} to={link.path} className="text-gray-300 hover:text-cyan-500 font-semibold transition-colors text-sm lg:text-base">
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Right Side - Login and Free Quote */}
                    <div className="hidden md:flex items-center space-x-3 lg:space-x-4 shrink-0">
                        {user ? (
                            <>
                                <span className="text-cyan-500 text-sm">Hi, {user.name}</span>
                                <button onClick={handleLogout} className="bg-red-600/80 hover:bg-red-600 text-white px-4 py-2 rounded-full transition-all text-sm">
                                    Logout
                                </button>
                            </>
                        ) : (
                            <Link to="/login" className="text-gray-300 hover:text-cyan-500 font-semibold transition-colors text-sm">Login</Link>
                        )}
                        <Link to="/contact" className="btn-primary text-sm py-2 px-5">Free Quote →</Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button className="md:hidden text-cyan-500 text-2xl" onClick={() => setIsOpen(!isOpen)}>
                        <i className={`fas ${isOpen ? 'fa-times' : 'fa-bars'}`}></i>
                    </button>
                </div>

                {/* Mobile Menu */}
                <div className={`md:hidden overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 py-4 border-t border-cyan-500/20' : 'max-h-0'}`}>
                    {navLinks.map(link => (
                        <Link key={link.path} to={link.path} className="block py-3 text-gray-300 hover:text-cyan-500" onClick={() => setIsOpen(false)}>
                            {link.name}
                        </Link>
                    ))}
                    {user ? (
                        <>
                            <span className="block py-3 text-cyan-500">Hi, {user.name}</span>
                            <button onClick={handleLogout} className="w-full bg-red-600/80 hover:bg-red-600 text-white py-2 rounded-full">Logout</button>
                        </>
                    ) : (
                        <Link to="/login" className="block py-3 text-cyan-500" onClick={() => setIsOpen(false)}>Login</Link>
                    )}
                    <Link to="/contact" className="block mt-3 btn-primary text-center" onClick={() => setIsOpen(false)}>Free Quote →</Link>
                </div>
            </div>
        </header>
    );
};

export default Navbar;