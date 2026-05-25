import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getServices, getGalleries, getHeroSettings, getProcessSettings, getWhyChooseUs, getAboutSettings } from '../services/api';

const Home = () => {
    const [services, setServices] = useState([]);
    const [galleries, setGalleries] = useState([]);
    const [hero, setHero] = useState(null);
    const [process, setProcess] = useState(null);
    const [whyChooseUs, setWhyChooseUs] = useState(null);
    const [about, setAbout] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeFaq, setActiveFaq] = useState(null);

    const getAboutImageUrl = (path) => {
        if (!path) return null;
        if (path.startsWith('http')) return path;
        if (path.startsWith('/storage')) return `http://localhost:8000${path}`;
        if (path.startsWith('/')) return `http://localhost:8000${path}`;
        return `http://localhost:8000/storage/${path}`;
    };

    useEffect(() => {
        const cachedHero = sessionStorage.getItem('heroData');
        const cachedProcess = sessionStorage.getItem('processData');
        const cachedWhy = sessionStorage.getItem('whyData');
        const cachedAbout = sessionStorage.getItem('aboutData');
        const cachedServices = sessionStorage.getItem('servicesData');
        const cachedGalleries = sessionStorage.getItem('galleriesData');
        
        if (cachedHero && cachedProcess && cachedWhy && cachedAbout && cachedServices && cachedGalleries) {
            setHero(JSON.parse(cachedHero));
            setProcess(JSON.parse(cachedProcess));
            setWhyChooseUs(JSON.parse(cachedWhy));
            setAbout(JSON.parse(cachedAbout));
            setServices(JSON.parse(cachedServices));
            setGalleries(JSON.parse(cachedGalleries));
            setLoading(false);
            fetchDataInBackground();
        } else {
            fetchAllData();
        }
    }, []);

    const fetchAllData = async () => {
        try {
            setLoading(true);
            setError(null);
            
            const [heroRes, processRes, whyRes, aboutRes, servicesRes, galleriesRes] = await Promise.all([
                getHeroSettings(),
                getProcessSettings(),
                getWhyChooseUs(),
                getAboutSettings(),
                getServices(),
                getGalleries()
            ]);
            
            if (heroRes.data) {
                setHero(heroRes.data);
                sessionStorage.setItem('heroData', JSON.stringify(heroRes.data));
            }
            
            if (processRes.data) {
                setProcess(processRes.data);
                sessionStorage.setItem('processData', JSON.stringify(processRes.data));
            }
            
            if (whyRes.data) {
                setWhyChooseUs(whyRes.data);
                sessionStorage.setItem('whyData', JSON.stringify(whyRes.data));
            }
            
            if (aboutRes.data) {
                setAbout(aboutRes.data);
                sessionStorage.setItem('aboutData', JSON.stringify(aboutRes.data));
            }
            
            let servicesData = [];
            if (servicesRes.data && servicesRes.data.success && Array.isArray(servicesRes.data.data)) {
                servicesData = servicesRes.data.data;
            } else if (Array.isArray(servicesRes.data)) {
                servicesData = servicesRes.data;
            }
            setServices(servicesData.slice(0, 6));
            sessionStorage.setItem('servicesData', JSON.stringify(servicesData.slice(0, 6)));
            
            let galleriesData = [];
            if (galleriesRes.data && galleriesRes.data.success && Array.isArray(galleriesRes.data.data)) {
                galleriesData = galleriesRes.data.data;
            } else if (Array.isArray(galleriesRes.data)) {
                galleriesData = galleriesRes.data;
            }
            setGalleries(galleriesData);
            sessionStorage.setItem('galleriesData', JSON.stringify(galleriesData));
            
        } catch (err) {
            console.error('Fetch error:', err);
            setError('Failed to load content. Please refresh the page.');
        } finally {
            setLoading(false);
        }
    };
    
    const fetchDataInBackground = async () => {
        try {
            const [heroRes, processRes, whyRes, aboutRes, servicesRes, galleriesRes] = await Promise.all([
                getHeroSettings(),
                getProcessSettings(),
                getWhyChooseUs(),
                getAboutSettings(),
                getServices(),
                getGalleries()
            ]);
            
            if (heroRes.data) sessionStorage.setItem('heroData', JSON.stringify(heroRes.data));
            if (processRes.data) sessionStorage.setItem('processData', JSON.stringify(processRes.data));
            if (whyRes.data) sessionStorage.setItem('whyData', JSON.stringify(whyRes.data));
            if (aboutRes.data) sessionStorage.setItem('aboutData', JSON.stringify(aboutRes.data));
            
            let servicesData = [];
            if (servicesRes.data && servicesRes.data.success && Array.isArray(servicesRes.data.data)) {
                servicesData = servicesRes.data.data;
            } else if (Array.isArray(servicesRes.data)) {
                servicesData = servicesRes.data;
            }
            sessionStorage.setItem('servicesData', JSON.stringify(servicesData.slice(0, 6)));
            
            let galleriesData = [];
            if (galleriesRes.data && galleriesRes.data.success && Array.isArray(galleriesRes.data.data)) {
                galleriesData = galleriesRes.data.data;
            } else if (Array.isArray(galleriesRes.data)) {
                galleriesData = galleriesRes.data;
            }
            sessionStorage.setItem('galleriesData', JSON.stringify(galleriesData));
        } catch (err) {
            console.error('Background fetch error:', err);
        }
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

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center bg-red-500/10 border border-red-500 rounded-2xl p-8 max-w-md">
                    <i className="fas fa-exclamation-triangle text-red-500 text-5xl mb-4"></i>
                    <p className="text-red-400 text-lg">{error}</p>
                    <button onClick={() => window.location.reload()} className="mt-4 bg-cyan-500 text-navy-900 px-4 py-2 rounded-full">Try Again</button>
                </div>
            </div>
        );
    }

    const faqData = [
        { q: 'How fast can you come?', a: 'Same-day or next-day service. Emergency slots available 24/7.' },
        { q: 'What items do you take?', a: 'Furniture, appliances, electronics, yard waste, construction debris. No hazardous materials.' },
        { q: 'Do I need to be home?', a: 'Not necessary if items are accessible. We will send before/after photos.' },
        { q: 'How is pricing calculated?', a: 'Based on volume/weight. Free upfront quote before any work starts.' },
        { q: 'Do you donate usable items?', a: 'Yes! We partner with local charities for furniture, electronics & appliances in good condition.' }
    ];

    return (
        <>
            {/* Hero Section */}
            {hero && hero.is_active == 1 && (
                <section className="py-20 md:py-28 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-radial from-cyan-500/5 to-transparent pointer-events-none"></div>
                    <div className="container-custom relative z-10">
                        <div className="flex flex-col lg:flex-row items-center gap-12">
                            <div className="flex-1 text-center lg:text-left">
                                <div className="inline-block bg-cyan-500/20 border border-cyan-500/30 rounded-full px-4 py-1 text-cyan-500 text-sm mb-6">
                                    {hero.badge_text}
                                </div>
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 bg-gradient-to-r from-white via-cyan-400 to-cyan-500 bg-clip-text text-transparent">
                                    {hero.heading_line1}<br />
                                    {hero.heading_line2}
                                </h1>
                                <p className="text-gray-300 text-lg mb-8">
                                    {hero.description}
                                </p>
                                <Link to={hero.button_link} className="btn-primary inline-block">
                                    {hero.button_text}
                                </Link>
                                <div className="flex flex-wrap justify-center lg:justify-start gap-4 mt-8">
                                    <div className="bg-white/5 rounded-full px-4 py-2 text-sm">{hero.stat1_text}</div>
                                    <div className="bg-white/5 rounded-full px-4 py-2 text-sm">{hero.stat2_text}</div>
                                    <div className="bg-white/5 rounded-full px-4 py-2 text-sm">{hero.stat3_text}</div>
                                </div>
                            </div>
                            <div className="flex-1">
                                <img 
                                    src={hero.hero_image} 
                                    alt="Junk removal truck" 
                                    className="rounded-3xl shadow-2xl w-full max-w-lg mx-auto animate-float" 
                                />
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Services Section */}
            {services.length > 0 && (
                <section className="py-20">
                    <div className="container-custom">
                        <h2 className="section-title">Our <span>Services</span></h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {services.map((service) => (
                                <div key={service.id} className="flip-card">
                                    <div className="flip-card-inner">
                                        <div className="flip-card-front">
                                            <i className={`fas ${service.icon} text-5xl text-cyan-500 mb-4`}></i>
                                            <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
                                            <p className="text-gray-300">{service.short_description}</p>
                                        </div>
                                        <div className="flip-card-back">
                                            <i className={`fas ${service.icon} text-4xl text-cyan-500 mb-4`}></i>
                                            <p className="text-gray-200 mb-4">
                                                {service.long_description || service.short_description}
                                            </p>
                                            {service.price_tag && (
                                                <div className="text-cyan-500 font-bold">{service.price_tag}</div>
                                            )}
                                            
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="text-center mt-12">
                            <Link to="/services" className="btn-outline inline-flex items-center gap-2">
                                View All Services <i className="fas fa-arrow-right text-sm"></i>
                            </Link>
                        </div>
                    </div>
                </section>
            )}

            {/* About Section */}
            {about && about.is_active == 1 && (
                <section className="py-20">
                    <div className="container-custom">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                                    {about.heading} <span className="text-cyan-500">{about.highlight_word}</span>
                                </h2>
                                <p className="text-gray-300 text-lg mb-6">{about.paragraph1}</p>
                                <p className="text-gray-400 mb-6">{about.paragraph2}</p>
                                <Link to="/about" className="btn-outline inline-block">Learn More →</Link>
                            </div>
                            <div>
                                <img 
                                    src={getAboutImageUrl(about.about_image)} 
                                    alt="About us" 
                                    className="rounded-2xl shadow-2xl w-full"
                                />
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Process Section */}
            {process && process.is_active == 1 && (
                <section className="py-20 bg-navy-800/30">
                    <div className="container-custom">
                        <h2 className="section-title">
                            {process.section_title} <span>{process.section_highlight}</span>
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            <div className="card text-center">
                                <div className="w-12 h-12 bg-cyan-500 rounded-full flex items-center justify-center text-navy-900 font-bold text-xl mx-auto mb-4">1</div>
                                <h3 className="text-xl font-bold mb-2">{process.step1_title}</h3>
                                <p className="text-gray-400">{process.step1_desc}</p>
                            </div>
                            <div className="card text-center">
                                <div className="w-12 h-12 bg-cyan-500 rounded-full flex items-center justify-center text-navy-900 font-bold text-xl mx-auto mb-4">2</div>
                                <h3 className="text-xl font-bold mb-2">{process.step2_title}</h3>
                                <p className="text-gray-400">{process.step2_desc}</p>
                            </div>
                            <div className="card text-center">
                                <div className="w-12 h-12 bg-cyan-500 rounded-full flex items-center justify-center text-navy-900 font-bold text-xl mx-auto mb-4">3</div>
                                <h3 className="text-xl font-bold mb-2">{process.step3_title}</h3>
                                <p className="text-gray-400">{process.step3_desc}</p>
                            </div>
                            <div className="card text-center">
                                <div className="w-12 h-12 bg-cyan-500 rounded-full flex items-center justify-center text-navy-900 font-bold text-xl mx-auto mb-4">4</div>
                                <h3 className="text-xl font-bold mb-2">{process.step4_title}</h3>
                                <p className="text-gray-400">{process.step4_desc}</p>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Why Choose Us Section */}
            {whyChooseUs && whyChooseUs.is_active == 1 && (
                <section className="py-20">
                    <div className="container-custom">
                        <h2 className="section-title">
                            {whyChooseUs.section_title} <span>{whyChooseUs.section_highlight}</span>
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="flip-card">
                                <div className="flip-card-inner">
                                    <div className="flip-card-front">
                                        <i className={`fas ${whyChooseUs.card1_icon} text-5xl text-cyan-500 mb-4`}></i>
                                        <h3 className="text-2xl font-bold mb-2">{whyChooseUs.card1_title}</h3>
                                        <p className="text-gray-300">{whyChooseUs.card1_desc}</p>
                                    </div>
                                    <div className="flip-card-back">
                                        <i className={`fas ${whyChooseUs.card1_icon} text-4xl text-cyan-500 mb-4`}></i>
                                        <p className="text-gray-200 mb-4">{whyChooseUs.card1_desc}</p>
                                        <div className="text-cyan-500 font-bold">{whyChooseUs.card1_price}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="flip-card">
                                <div className="flip-card-inner">
                                    <div className="flip-card-front">
                                        <i className={`fas ${whyChooseUs.card2_icon} text-5xl text-cyan-500 mb-4`}></i>
                                        <h3 className="text-2xl font-bold mb-2">{whyChooseUs.card2_title}</h3>
                                        <p className="text-gray-300">{whyChooseUs.card2_desc}</p>
                                    </div>
                                    <div className="flip-card-back">
                                        <i className={`fas ${whyChooseUs.card2_icon} text-4xl text-cyan-500 mb-4`}></i>
                                        <p className="text-gray-200 mb-4">{whyChooseUs.card2_desc}</p>
                                        <div className="text-cyan-500 font-bold">{whyChooseUs.card2_price}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="flip-card">
                                <div className="flip-card-inner">
                                    <div className="flip-card-front">
                                        <i className={`fas ${whyChooseUs.card3_icon} text-5xl text-cyan-500 mb-4`}></i>
                                        <h3 className="text-2xl font-bold mb-2">{whyChooseUs.card3_title}</h3>
                                        <p className="text-gray-300">{whyChooseUs.card3_desc}</p>
                                    </div>
                                    <div className="flip-card-back">
                                        <i className={`fas ${whyChooseUs.card3_icon} text-4xl text-cyan-500 mb-4`}></i>
                                        <p className="text-gray-200 mb-4">{whyChooseUs.card3_desc}</p>
                                        <div className="text-cyan-500 font-bold">{whyChooseUs.card3_price}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Gallery Section */}
            {galleries.length > 0 && (
                <section className="py-20 bg-navy-800/30">
                    <div className="container-custom">
                        <h2 className="section-title"><span>Recent Projects</span></h2>
                        <p className="text-center text-gray-400 mb-10">Real cleanouts across Maplewood, NJ</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {galleries.slice(0, 4).map((gallery) => (
                                <div key={gallery.id} className="group relative overflow-hidden rounded-2xl cursor-pointer">
                                    <img 
                                        src={`http://localhost:8000${gallery.image_path}`} 
                                        alt={gallery.title} 
                                        className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-400 flex items-end p-6">
                                        <div>
                                            <h4 className="text-xl font-bold text-white mb-1">{gallery.title}</h4>
                                            <p className="text-cyan-500">{gallery.category}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="text-center mt-12">
                            <Link to="/gallery" className="btn-outline inline-flex items-center gap-2">
                                View All Projects <i className="fas fa-arrow-right text-sm"></i>
                            </Link>
                        </div>
                    </div>
                </section>
            )}

            {/* FAQ Section */}
            <section className="py-20 bg-navy-800/30">
                <div className="container-custom">
                    <h2 className="section-title">Frequently Asked <span>Questions</span></h2>
                    <p className="text-center text-gray-400 mb-10">Click on any question to see the answer</p>
                    <div className="max-w-3xl mx-auto">
                        {faqData.map((faq, index) => (
                            <div key={index} className="bg-navy-800/60 rounded-2xl mb-4 border border-cyan-500/10 overflow-hidden">
                                <button
                                    className="w-full text-left p-6 flex justify-between items-center hover:bg-navy-800/80 transition-colors"
                                    onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                                >
                                    <h3 className="text-lg font-bold text-cyan-500">{faq.q}</h3>
                                    <i className={`fas fa-chevron-down text-cyan-500 transition-transform duration-300 ${activeFaq === index ? 'rotate-180' : ''}`}></i>
                                </button>
                                <div className={`overflow-hidden transition-all duration-300 ${activeFaq === index ? 'max-h-40 pb-6 px-6' : 'max-h-0'}`}>
                                    <p className="text-gray-400">{faq.a}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="text-center mt-8">
                        <Link to="/faq" className="btn-outline inline-flex items-center gap-2">
                            View All FAQs <i className="fas fa-arrow-right text-sm"></i>
                        </Link>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20">
                <div className="container-custom">
                    <div className="bg-gradient-to-r from-cyan-600/20 to-navy-800/50 rounded-3xl p-12 text-center border border-cyan-500/20">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Clear Your Space?</h2>
                        <p className="text-gray-300 mb-8 max-w-2xl mx-auto">Get a free quote today. No obligation, just honest pricing.</p>
                        <Link to="/contact" className="btn-primary inline-block">
                            Get Free Quote →
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Home;