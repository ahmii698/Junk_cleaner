import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getServices, getGalleries } from '../services/api';

const Home = () => {
    const [services, setServices] = useState([]);
    const [galleries, setGalleries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeFaq, setActiveFaq] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const servicesRes = await getServices();
                setServices(servicesRes.data.slice(0, 6)); // Sirf 6 services dikhayega
                const galleriesRes = await getGalleries();
                setGalleries(galleriesRes.data);
            } catch (err) {
                console.error(err);
            }
            setLoading(false);
        };
        fetchData();
    }, []);

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

    // FAQ Data
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
            <section className="py-20 md:py-28 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-radial from-cyan-500/5 to-transparent pointer-events-none"></div>
                <div className="container-custom relative z-10">
                    <div className="flex flex-col lg:flex-row items-center gap-12">
                        <div className="flex-1 text-center lg:text-left">
                            <div className="inline-block bg-cyan-500/20 border border-cyan-500/30 rounded-full px-4 py-1 text-cyan-500 text-sm mb-6">
                                Maplewood's Most Trusted | 12+ Years
                            </div>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 bg-gradient-to-r from-white via-cyan-400 to-cyan-500 bg-clip-text text-transparent">
                                Clear Your Space.<br />Fast. Fair. Green.
                            </h1>
                            <p className="text-gray-300 text-lg mb-8">
                                Professional junk removal services — from single items to full property cleanouts. Same-day service available.
                            </p>
                            <Link to="/contact" className="btn-primary inline-block">
                                Get Free Estimate →
                            </Link>
                            <div className="flex flex-wrap justify-center lg:justify-start gap-4 mt-8">
                                <div className="bg-white/5 rounded-full px-4 py-2 text-sm">3500+ projects</div>
                                <div className="bg-white/5 rounded-full px-4 py-2 text-sm">95% recycled</div>
                                <div className="bg-white/5 rounded-full px-4 py-2 text-sm">5.0 stars (412 reviews)</div>
                            </div>
                        </div>
                        <div className="flex-1">
                            <img src="/download.jfif" alt="Junk removal truck" className="rounded-3xl shadow-2xl w-full max-w-lg mx-auto animate-float" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Section - Sirf 6 services + More button */}
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
                                            <Link to="/contact" className="inline-block mt-4 bg-cyan-500 text-navy-900 px-4 py-2 rounded-full text-sm font-bold hover:bg-cyan-400 transition">
                                                Get Quote
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {/* More Services Button */}
                        <div className="text-center mt-12">
                            <Link to="/services" className="btn-outline inline-flex items-center gap-2">
                                View All Services <i className="fas fa-arrow-right text-sm"></i>
                            </Link>
                        </div>
                    </div>
                </section>
            )}

            {/* About Section - Preview */}
            <section className="py-20">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold mb-6">About <span className="text-cyan-500">Simon Junk Removal</span></h2>
                            <p className="text-gray-300 text-lg mb-6">
                                With over 12 years of experience, we've helped thousands of homeowners and businesses clear their spaces efficiently and responsibly.
                            </p>
                            <p className="text-gray-400 mb-6">
                                We believe in giving back to the community and protecting our environment. That's why we donate usable items to local charities and recycle over 90% of what we collect.
                            </p>
                            <Link to="/about" className="btn-outline inline-block">Learn More →</Link>
                        </div>
                        <div>
                            <img src="/01.webp" alt="About us" className="rounded-2xl shadow-2xl w-full" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Process Section */}
            <section className="py-20 bg-navy-800/30">
                <div className="container-custom">
                    <h2 className="section-title">How <span>We Work</span></h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { num: 1, title: 'Free Quote', desc: 'Call or text — get price instantly' },
                            { num: 2, title: 'Schedule', desc: 'Pick time that suits you' },
                            { num: 3, title: 'We Haul', desc: 'We load, sweep, clean up' },
                            { num: 4, title: 'Green Disposal', desc: 'Donate & recycle maximum' }
                        ].map((step, i) => (
                            <div key={i} className="card text-center">
                                <div className="w-12 h-12 bg-cyan-500 rounded-full flex items-center justify-center text-navy-900 font-bold text-xl mx-auto mb-4">
                                    {step.num}
                                </div>
                                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                                <p className="text-gray-400">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="py-20">
                <div className="container-custom">
                    <h2 className="section-title">Why <span>Choose Us?</span></h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { icon: 'fa-bolt', title: 'Lightning Fast', desc: 'Local team arrives within 1-2 hours', price: '1-2 hour arrival' },
                            { icon: 'fa-dollar-sign', title: 'Upfront Price', desc: 'No hidden fees', price: 'Transparent pricing' },
                            { icon: 'fa-leaf', title: 'Eco Friendly', desc: 'Green disposal', price: '90%+ recycled' }
                        ].map((item, i) => (
                            <div key={i} className="flip-card">
                                <div className="flip-card-inner">
                                    <div className="flip-card-front">
                                        <i className={`fas ${item.icon} text-5xl text-cyan-500 mb-4`}></i>
                                        <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                                        <p className="text-gray-300">{item.desc}</p>
                                    </div>
                                    <div className="flip-card-back">
                                        <i className={`fas ${item.icon} text-4xl text-cyan-500 mb-4`}></i>
                                        <p className="text-gray-200 mb-4">{item.desc}</p>
                                        <div className="text-cyan-500 font-bold">{item.price}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Gallery Section */}
            {galleries.length > 0 && (
                <section className="py-20 bg-navy-800/30">
                    <div className="container-custom">
                        <h2 className="section-title"><span>Recent Projects</span></h2>
                        <p className="text-center text-gray-400 mb-10">Real cleanouts across Maplewood, NJ</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {galleries.map((gallery) => (
                                <div key={gallery.id} className="group relative overflow-hidden rounded-2xl cursor-pointer">
                                    <img src={gallery.image_path} alt={gallery.title} className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-400 flex items-end p-6">
                                        <div>
                                            <h4 className="text-xl font-bold text-white mb-1">{gallery.title}</h4>
                                            <p className="text-cyan-500">{gallery.category}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* FAQ Section - Accordion Style */}
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
                        <Link to="/contact" className="btn-primary inline-block">Get Free Quote →</Link>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Home;