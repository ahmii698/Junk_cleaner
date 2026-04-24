import React, { useState, useEffect } from 'react';
import { getFAQs } from '../services/api';

const FAQ = () => {
    const [faqs, setFaqs] = useState([]);
    const [activeIndex, setActiveIndex] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log('FAQ page loaded - fetching data...');
        getFAQs()
            .then(res => {
                console.log('FAQs received:', res.data);
                setFaqs(res.data);
            })
            .catch(err => {
                console.error('FAQ fetch error:', err);
            })
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return <div className="text-center py-20 text-cyan-500">Loading FAQs...</div>;
    }

    return (
        <div className="py-20">
            <div className="container-custom">
                <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">Frequently Asked <span className="text-cyan-500">Questions</span></h1>
                <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">Find answers to common questions about our services</p>

                {faqs.length === 0 ? (
                    <div className="text-center text-gray-400">No FAQs found. Please check backend.</div>
                ) : (
                    <div className="max-w-3xl mx-auto">
                        {faqs.map((faq, index) => (
                            <div key={faq.id} className={`bg-navy-800/60 rounded-2xl mb-4 border border-cyan-500/10 transition-all ${activeIndex === index ? 'border-cyan-500/30' : ''}`}>
                                <button className="w-full text-left p-6 flex justify-between items-center" onClick={() => setActiveIndex(activeIndex === index ? null : index)}>
                                    <span className="font-semibold text-lg">{faq.question}</span>
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