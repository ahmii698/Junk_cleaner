import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getServiceBySlug } from '../services/api';

const ServiceDetail = () => {
    const { slug } = useParams();
    const [service, setService] = useState(null);

    useEffect(() => {
        getServiceBySlug(slug).then(res => setService(res.data)).catch(err => console.log(err));
    }, [slug]);

    if (!service) return <div className="text-center py-20">Loading...</div>;

    return (
        <div className="py-20">
            <div className="container-custom">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="reveal"><div className="w-24 h-24 bg-cyan-500/20 rounded-2xl flex items-center justify-center mb-6"><i className={`fas ${service.icon} text-5xl text-cyan-500`}></i></div><h1 className="text-4xl md:text-5xl font-bold mb-4">{service.title}</h1><p className="text-gray-300 text-lg mb-6">{service.long_description || service.short_description}</p>{service.price_tag && <div className="inline-block bg-cyan-500/20 rounded-full px-6 py-2 text-cyan-500 font-bold mb-6">{service.price_tag}</div>}<Link to="/contact" className="btn-primary inline-block">Request This Service →</Link></div>
                    <div className="reveal"><img src="/download.jfif" alt={service.title} className="rounded-2xl shadow-2xl" /></div>
                </div>
            </div>
        </div>
    );
};

export default ServiceDetail;