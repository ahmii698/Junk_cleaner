import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getServices } from '../services/api';

const Services = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // 🔥 Check if data exists in sessionStorage (cache)
        const cachedServices = sessionStorage.getItem('allServicesData');
        
        if (cachedServices) {
            // Load from cache instantly
            const parsedServices = JSON.parse(cachedServices);
            setServices(parsedServices);
            setLoading(false);
            console.log('Services loaded from cache:', parsedServices.length);
            
            // Still fetch in background to update cache
            fetchServicesInBackground();
        } else {
            // Fetch fresh data
            fetchServices();
        }
    }, []);

    const fetchServices = async () => {
        try {
            console.log('Fetching services from API...');
            const res = await getServices();
            console.log('Services received:', res.data.length, 'services');
            
            let servicesData = [];
            if (res.data && res.data.success && Array.isArray(res.data.data)) {
                servicesData = res.data.data;
            } else if (Array.isArray(res.data)) {
                servicesData = res.data;
            } else {
                servicesData = res.data || [];
            }
            
            setServices(servicesData);
            // Save to cache
            sessionStorage.setItem('allServicesData', JSON.stringify(servicesData));
        } catch (err) {
            console.error('Services fetch error:', err);
            setServices([]);
        } finally {
            setLoading(false);
        }
    };
    
    // Background fetch to update cache without blocking UI
    const fetchServicesInBackground = async () => {
        try {
            const res = await getServices();
            let servicesData = [];
            if (res.data && res.data.success && Array.isArray(res.data.data)) {
                servicesData = res.data.data;
            } else if (Array.isArray(res.data)) {
                servicesData = res.data;
            } else {
                servicesData = res.data || [];
            }
            sessionStorage.setItem('allServicesData', JSON.stringify(servicesData));
            console.log('Services cache updated in background');
        } catch (err) {
            console.error('Background fetch error:', err);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-cyan-500 text-lg">Loading Services...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="py-20">
            <div className="container-custom">
                <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
                    Our <span className="text-cyan-500">Services</span>
                </h1>
                <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
                    Professional junk removal services tailored to your needs
                </p>

                {services.length === 0 ? (
                    <div className="text-center py-12">
                        <i className="fas fa-cogs text-6xl text-gray-600 mb-4"></i>
                        <p className="text-gray-400">No services found. Please check backend.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {services.map((service) => (
                            <div key={service.id} className="flip-card">
                                <div className="flip-card-inner">
                                    <div className="flip-card-front">
                                        <i className={`fas ${service.icon || 'fa-tools'} text-5xl text-cyan-500 mb-4`}></i>
                                        <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
                                        <p className="text-gray-300">{service.short_description}</p>
                                    </div>
                                    <div className="flip-card-back">
                                        <i className={`fas ${service.icon || 'fa-tools'} text-4xl text-cyan-500 mb-4`}></i>
                                        <p className="text-gray-200 mb-4">
                                            {service.long_description || service.short_description || 'Professional junk removal service'}
                                        </p>
                                        {service.price_tag && (
                                            <div className="text-cyan-500 font-bold text-xl mb-4">{service.price_tag}</div>
                                        )}
                                        
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