import React, { useState, useEffect } from 'react';
import { getFAQs } from '../services/api';

const FAQ = () => {
    const [faqs, setFaqs] = useState([]);
    const [activeIndex, setActiveIndex] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // 🔥 Check if data exists in sessionStorage (cache)
        const cachedFaqs = sessionStorage.getItem('faqsData');
        
        if (cachedFaqs) {
            // Load from cache instantly
            const parsedFaqs = JSON.parse(cachedFaqs);
            setFaqs(parsedFaqs);
            setLoading(false);
            console.log('FAQs loaded from cache:', parsedFaqs.length);
            
            // Still fetch in background to update cache
            fetchFaqsInBackground();
        } else {
            // Fetch fresh data
            fetchFaqs();
        }
    }, []);

    const fetchFaqs = async () => {
        try {
            console.log('Fetching FAQs from API...');
            const res = await getFAQs();
            console.log('FAQs received:', res.data);
            
            let faqsData = [];
            if (res.data && res.data.success && Array.isArray(res.data.data)) {
                faqsData = res.data.data;
            } else if (Array.isArray(res.data)) {
                faqsData = res.data;
            } else {
                faqsData = res.data || [];
            }
            
            setFaqs(faqsData);
            // Save to cache
            sessionStorage.setItem('faqsData', JSON.stringify(faqsData));
        } catch (err) {
            console.error('FAQ fetch error:', err);
            setFaqs([]);
        } finally {
            setLoading(false);
        }
    };
    
    // Background fetch to update cache without blocking UI
    const fetchFaqsInBackground = async () => {
        try {
            const res = await getFAQs();
            let faqsData = [];
            if (res.data && res.data.success && Array.isArray(res.data.data)) {
                faqsData = res.data.data;
            } else if (Array.isArray(res.data)) {
                faqsData = res.data;
            } else {
                faqsData = res.data || [];
            }
            sessionStorage.setItem('faqsData', JSON.stringify(faqsData));
            console.log('FAQs cache updated in background');
        } catch (err) {
            console.error('Background fetch error:', err);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-cyan-500 text-lg">Loading FAQs...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="py-20">
            <div className="container-custom">
                <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
                    Frequently Asked <span className="text-cyan-500">Questions</span>
                </h1>
                <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
                    Find answers to common questions about our services
                </p>

                {faqs.length === 0 ? (
                    <div className="text-center py-12">
                        <i className="fas fa-question-circle text-6xl text-gray-600 mb-4"></i>
                        <p className="text-gray-400">No FAQs found. Please check backend.</p>
                    </div>
                ) : (
                    <div className="max-w-3xl mx-auto">
                        {faqs.map((faq, index) => (
                            <div 
                                key={faq.id} 
                                className={`bg-navy-800/60 rounded-2xl mb-4 border border-cyan-500/10 transition-all ${activeIndex === index ? 'border-cyan-500/30' : ''}`}
                            >
                                <button 
                                    className="w-full text-left p-6 flex justify-between items-center hover:bg-cyan-500/5 transition-colors rounded-2xl"
                                    onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                                >
                                    <span className="font-semibold text-lg text-white">{faq.question}</span>
                                    <i className={`fas fa-chevron-down text-cyan-500 transition-transform duration-300 ${activeIndex === index ? 'rotate-180' : ''}`}></i>
                                </button>
                                <div className={`overflow-hidden transition-all duration-300 ${activeIndex === index ? 'max-h-40 pb-6 px-6' : 'max-h-0'}`}>
                                    <p className="text-gray-400">{faq.answer}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default FAQ;