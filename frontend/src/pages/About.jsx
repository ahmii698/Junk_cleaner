import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAboutSettings } from '../services/api';

const About = () => {
    const [about, setAbout] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Check if data already exists in localStorage (cache)
        const cachedData = localStorage.getItem('aboutData');
        if (cachedData) {
            try {
                const parsed = JSON.parse(cachedData);
                setAbout(parsed);
                setLoading(false);
                console.log('Loaded from cache');
                return;
            } catch (e) {
                console.error('Cache parse error:', e);
            }
        }
        
        fetchAbout();
    }, []);

    const fetchAbout = async () => {
        try {
            setLoading(true);
            const res = await getAboutSettings();
            console.log('About settings:', res.data);
            setAbout(res.data);
            // Cache the data
            localStorage.setItem('aboutData', JSON.stringify(res.data));
            setError(null);
        } catch (error) {
            console.error('Error fetching about:', error);
            setError(error.message);
            // Set default data if API fails
            const defaultData = {
                heading: 'About Simon Junk Removal',
                highlight_word: 'Simon Junk Removal',
                paragraph1: "With over 12 years of experience, we've helped thousands of homeowners and businesses clear their spaces efficiently and responsibly.",
                paragraph2: "We believe in giving back to the community and protecting our environment. That's why we donate usable items to local charities and recycle over 90% of what we collect.",
                about_image: '/01.webp',
                stat1_number: '12+',
                stat1_label: 'Years Experience',
                stat2_number: '3500+',
                stat2_label: 'Projects Completed',
                stat3_number: '95%',
                stat3_label: 'Recycled/Donated',
                card1_icon: 'fa-truck',
                card1_title: 'Licensed & Insured',
                card1_desc: 'Fully licensed and insured for your peace of mind',
                card2_icon: 'fa-leaf',
                card2_title: 'Eco-Friendly',
                card2_desc: 'We recycle and donate whenever possible',
                card3_icon: 'fa-clock',
                card3_title: 'Same-Day Service',
                card3_desc: 'Emergency and same-day service available',
                button_text: 'Get Your Free Quote →',
                button_link: '/contact',
                is_active: 1
            };
            setAbout(defaultData);
        } finally {
            setLoading(false);
        }
    };

    // Helper function to get full image URL
    const getImageUrl = (path) => {
        if (!path) return 'https://placehold.co/600x400/1a2a3a/00d4ff?text=No+Image';
        if (path.startsWith('http')) return path;
        if (path.startsWith('/storage')) return `http://localhost:8000${path}`;
        if (path.startsWith('/')) return `http://localhost:8000${path}`;
        return `http://localhost:8000/storage/${path}`;
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-cyan-500 text-lg">Loading...</p>
                </div>
            </div>
        );
    }

    if (error && !about) {
        return (
            <div className="py-20">
                <div className="container-custom text-center">
                    <h1 className="text-4xl font-bold text-white">About Us</h1>
                    <p className="text-red-400 mt-4">Failed to load content. Please try again later.</p>
                    <button onClick={fetchAbout} className="mt-4 bg-cyan-500 text-navy-900 px-4 py-2 rounded-full">Retry</button>
                </div>
            </div>
        );
    }

    if (!about || about.is_active === 0) {
        return (
            <div className="py-20">
                <div className="container-custom text-center">
                    <h1 className="text-4xl font-bold text-white">About Us</h1>
                    <p className="text-gray-400 mt-4">Content coming soon...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="py-20">
            <div className="container-custom">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
                    <div className="reveal">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">
                            {about.heading} <span className="text-cyan-500">{about.highlight_word}</span>
                        </h1>
                        <p className="text-gray-300 text-lg mb-6">{about.paragraph1}</p>
                        <p className="text-gray-400 mb-6">{about.paragraph2}</p>
                        <div className="flex flex-wrap gap-4">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-cyan-500">{about.stat1_number}</div>
                                <div className="text-gray-400">{about.stat1_label}</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-cyan-500">{about.stat2_number}</div>
                                <div className="text-gray-400">{about.stat2_label}</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-cyan-500">{about.stat3_number}</div>
                                <div className="text-gray-400">{about.stat3_label}</div>
                            </div>
                        </div>
                    </div>
                    <div className="reveal">
                        <img 
                            src={getImageUrl(about.about_image)} 
                            alt="About us" 
                            className="rounded-2xl shadow-2xl w-full"
                            onError={(e) => {
                                e.target.src = 'https://placehold.co/600x400/1a2a3a/00d4ff?text=Image+Not+Found';
                            }}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
                    <div className="card text-center reveal">
                        <i className={`fas ${about.card1_icon} text-4xl text-cyan-500 mb-4`}></i>
                        <h3 className="text-xl font-bold mb-2">{about.card1_title}</h3>
                        <p className="text-gray-400">{about.card1_desc}</p>
                    </div>
                    <div className="card text-center reveal">
                        <i className={`fas ${about.card2_icon} text-4xl text-cyan-500 mb-4`}></i>
                        <h3 className="text-xl font-bold mb-2">{about.card2_title}</h3>
                        <p className="text-gray-400">{about.card2_desc}</p>
                    </div>
                    <div className="card text-center reveal">
                        <i className={`fas ${about.card3_icon} text-4xl text-cyan-500 mb-4`}></i>
                        <h3 className="text-xl font-bold mb-2">{about.card3_title}</h3>
                        <p className="text-gray-400">{about.card3_desc}</p>
                    </div>
                </div>

                <div className="text-center mt-16 reveal">
                    <Link to={about.button_link || '/contact'} className="btn-primary">
                        {about.button_text || 'Get Your Free Quote →'}
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default About;