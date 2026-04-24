import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
    return (
        <div className="py-20">
            <div className="container-custom">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
                    <div className="reveal">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">About <span className="text-cyan-500">Simon Junk Removal</span></h1>
                        <p className="text-gray-300 text-lg mb-6">With over 12 years of experience, we've helped thousands of homeowners and businesses clear their spaces efficiently and responsibly.</p>
                        <p className="text-gray-400 mb-6">We believe in giving back to the community and protecting our environment. That's why we donate usable items to local charities and recycle over 90% of what we collect.</p>
                        <div className="flex gap-4">
                            <div className="text-center"><div className="text-3xl font-bold text-cyan-500">12+</div><div className="text-gray-400">Years Experience</div></div>
                            <div className="text-center"><div className="text-3xl font-bold text-cyan-500">3500+</div><div className="text-gray-400">Projects Completed</div></div>
                            <div className="text-center"><div className="text-3xl font-bold text-cyan-500">95%</div><div className="text-gray-400">Recycled/Donated</div></div>
                        </div>
                    </div>
                    <div className="reveal"><img src="/01.webp" alt="About us" className="rounded-2xl shadow-2xl w-full" /></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
                    {[{ icon: 'fa-truck', title: 'Licensed & Insured', desc: 'Fully licensed and insured for your peace of mind' }, { icon: 'fa-leaf', title: 'Eco-Friendly', desc: 'We recycle and donate whenever possible' }, { icon: 'fa-clock', title: 'Same-Day Service', desc: 'Emergency and same-day service available' }].map((item, i) => (
                        <div key={i} className="card text-center reveal" style={{ transitionDelay: `${i * 0.1}s` }}><i className={`fas ${item.icon} text-4xl text-cyan-500 mb-4`}></i><h3 className="text-xl font-bold mb-2">{item.title}</h3><p className="text-gray-400">{item.desc}</p></div>
                    ))}
                </div>

                <div className="text-center mt-16 reveal"><Link to="/contact" className="btn-primary">Get Your Free Quote →</Link></div>
            </div>
        </div>
    );
};

export default About;