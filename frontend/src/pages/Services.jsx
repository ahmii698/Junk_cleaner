import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getServices } from '../services/api';

const Services = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log('Services page loaded - fetching data...');
        getServices()
            .then(res => {
                console.log('Services received:', res.data.length, 'services');
                setServices(res.data);
            })
            .catch(err => {
                console.error('Services fetch error:', err);
            })
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return <div className="text-center py-20 text-cyan-500">Loading Services...</div>;
    }

    return (
        <div className="py-20">
            <div className="container-custom">
                <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">Our <span className="text-cyan-500">Services</span></h1>
                <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">Professional junk removal services tailored to your needs</p>

                {services.length === 0 ? (
                    <div className="text-center text-gray-400">No services found. Please check backend.</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {services.map((service, index) => (
                            <div key={service.id} className="flip-card">
                                <div className="flip-card-inner">
                                    <div className="flip-card-front">
                                        <i className={`fas ${service.icon} text-5xl text-cyan-500 mb-4`}></i>
                                        <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
                                        <p className="text-gray-300">{service.short_description}</p>
                                    </div>
                                    <div className="flip-card-back">
                                        <i className={`fas ${service.icon} text-4xl text-cyan-500 mb-4`}></i>
                                        <p className="text-gray-200 mb-4">{service.long_description || service.short_description}</p>
                                        {service.price_tag && <div className="text-cyan-500 font-bold text-xl mb-4">{service.price_tag}</div>}
                                        <Link to="/contact" className="bg-cyan-500 text-navy-900 px-4 py-2 rounded-full text-sm font-bold hover:bg-cyan-400">Get Quote</Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Services;