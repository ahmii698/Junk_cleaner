import React, { useState } from 'react';
import { submitContact, submitQuote, uploadImage } from '../services/api';

const Contact = () => {
    const [activeForm, setActiveForm] = useState('contact');
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
    const [contactForm, setContactForm] = useState({ name: '', email: '', phone: '', message: '' });
    const [quoteForm, setQuoteForm] = useState({ name: '', email: '', phone: '', service: '', description: '' });
    const [images, setImages] = useState([]);

    // Phone number validation function
    const validatePhone = (phone) => {
        const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
        const phoneRegex = /^\d+$/;
        if (!phoneRegex.test(cleanPhone)) {
            return 'Phone number should contain only numbers';
        }
        if (cleanPhone.length < 7) {
            return 'Phone number should be at least 7 digits';
        }
        if (cleanPhone.length > 15) {
            return 'Phone number should not exceed 15 digits';
        }
        return null;
    };

    // Show toast notification
    const showToast = (message, type = 'success') => {
        setToast({ show: true, message, type });
        setTimeout(() => {
            setToast({ show: false, message: '', type: 'success' });
        }, 3000);
    };

    const handleContactSubmit = async (e) => {
        e.preventDefault();
        
        const phoneError = validatePhone(contactForm.phone);
        if (phoneError) {
            showToast(phoneError, 'error');
            return;
        }
        
        setLoading(true);
        try {
            await submitContact(contactForm);
            showToast('✓ Message sent successfully! We will contact you soon.', 'success');
            setContactForm({ name: '', email: '', phone: '', message: '' });
        } catch (error) {
            showToast('✗ Error sending message. Please try again.', 'error');
        }
        setLoading(false);
    };

    const handleQuoteSubmit = async (e) => {
        e.preventDefault();
        
        const phoneError = validatePhone(quoteForm.phone);
        if (phoneError) {
            showToast(phoneError, 'error');
            return;
        }
        
        setLoading(true);
        try {
            await submitQuote({ ...quoteForm, images });
            showToast('✓ Quote request submitted! We will get back to you within 24 hours.', 'success');
            setQuoteForm({ name: '', email: '', phone: '', service: '', description: '' });
            setImages([]);
        } catch (error) {
            showToast('✗ Error submitting quote. Please try again.', 'error');
        }
        setLoading(false);
    };

    const handleImageUpload = async (e) => {
        const files = Array.from(e.target.files);
        const uploadedPaths = [];
        for (const file of files) {
            const res = await uploadImage(file);
            uploadedPaths.push(res.data.path);
        }
        setImages([...images, ...uploadedPaths]);
    };

    const handlePhoneChange = (e, formType) => {
        let value = e.target.value;
        value = value.replace(/[^0-9]/g, '');
        
        if (formType === 'contact') {
            setContactForm({ ...contactForm, phone: value });
        } else {
            setQuoteForm({ ...quoteForm, phone: value });
        }
    };

    const services = ['Residential Junk Removal', 'Commercial Junk Removal', 'Property Cleanouts', 'Construction Debris Removal', 'Demolition Services', 'Storage Unit Cleanouts', 'Drain Cleaning', 'Emergency Junk Removal'];

    const mapUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d24186.0!2d-74.28723045!3d40.72957845!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c3aa0e3f6b8e2d%3A0x5c8b6f8e8f8e2d8!2sMaplewood%2C%20NJ%2007040!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus";

    return (
        <section className="py-16 relative">
            <div className="container-custom">
                <h2 className="section-title reveal"><span>Contact Us</span></h2>
                
                <div className="flex justify-center gap-4 mb-10 reveal">
                    <button onClick={() => setActiveForm('contact')} className={`px-6 py-2 rounded-full font-semibold transition-all ${activeForm === 'contact' ? 'bg-cyan-500 text-navy-900' : 'bg-navy-800 text-gray-300 hover:bg-navy-700'}`}>Contact Us</button>
                    <button onClick={() => setActiveForm('quote')} className={`px-6 py-2 rounded-full font-semibold transition-all ${activeForm === 'quote' ? 'bg-cyan-500 text-navy-900' : 'bg-navy-800 text-gray-300 hover:bg-navy-700'}`}>Request Quote</button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {activeForm === 'contact' ? (
                        <div className="bg-gradient-to-br from-navy-800 to-navy-900 rounded-3xl p-8 border border-cyan-500/20 reveal">
                            <h3 className="text-2xl font-bold mb-6">Send Us a <span className="text-cyan-500">Message</span></h3>
                            <form onSubmit={handleContactSubmit}>
                                <div className="space-y-4">
                                    <input type="text" placeholder="Full Name" value={contactForm.name} onChange={e => setContactForm({...contactForm, name: e.target.value})} className="w-full p-4 bg-navy-700/50 rounded-xl border border-cyan-500/20 focus:border-cyan-500 outline-none text-white" required />
                                    <input type="email" placeholder="Email Address" value={contactForm.email} onChange={e => setContactForm({...contactForm, email: e.target.value})} className="w-full p-4 bg-navy-700/50 rounded-xl border border-cyan-500/20 focus:border-cyan-500 outline-none text-white" required />
                                    <input type="tel" placeholder="Phone Number" value={contactForm.phone} onChange={(e) => handlePhoneChange(e, 'contact')} className="w-full p-4 bg-navy-700/50 rounded-xl border border-cyan-500/20 focus:border-cyan-500 outline-none text-white" required />
                                    <textarea rows="4" placeholder="Your Message" value={contactForm.message} onChange={e => setContactForm({...contactForm, message: e.target.value})} className="w-full p-4 bg-navy-700/50 rounded-xl border border-cyan-500/20 focus:border-cyan-500 outline-none text-white" required></textarea>
                                    <button type="submit" disabled={loading} className="w-full btn-primary disabled:opacity-50">{loading ? 'Sending...' : 'Send Message →'}</button>
                                </div>
                            </form>
                        </div>
                    ) : (
                        <div className="bg-gradient-to-br from-navy-800 to-navy-900 rounded-3xl p-8 border border-cyan-500/20 reveal">
                            <h3 className="text-2xl font-bold mb-6">Request a <span className="text-cyan-500">Quote</span></h3>
                            <form onSubmit={handleQuoteSubmit}>
                                <div className="space-y-4">
                                    <input type="text" placeholder="Full Name" value={quoteForm.name} onChange={e => setQuoteForm({...quoteForm, name: e.target.value})} className="w-full p-4 bg-navy-700/50 rounded-xl border border-cyan-500/20 focus:border-cyan-500 outline-none text-white" required />
                                    <input type="email" placeholder="Email Address" value={quoteForm.email} onChange={e => setQuoteForm({...quoteForm, email: e.target.value})} className="w-full p-4 bg-navy-700/50 rounded-xl border border-cyan-500/20 focus:border-cyan-500 outline-none text-white" required />
                                    <input type="tel" placeholder="Phone Number" value={quoteForm.phone} onChange={(e) => handlePhoneChange(e, 'quote')} className="w-full p-4 bg-navy-700/50 rounded-xl border border-cyan-500/20 focus:border-cyan-500 outline-none text-white" required />
                                    <select value={quoteForm.service} onChange={e => setQuoteForm({...quoteForm, service: e.target.value})} className="w-full p-4 bg-navy-700/50 rounded-xl border border-cyan-500/20 focus:border-cyan-500 outline-none text-white" required>
                                        <option value="">Select a service...</option>
                                        {services.map(s => <option key={s} value={s}>{s}</option>)}
                                    </select>
                                    <textarea rows="3" placeholder="Tell us what needs removing, your location, and any details..." value={quoteForm.description} onChange={e => setQuoteForm({...quoteForm, description: e.target.value})} className="w-full p-4 bg-navy-700/50 rounded-xl border border-cyan-500/20 focus:border-cyan-500 outline-none text-white" required></textarea>
                                    
                                    <div className="border-2 border-dashed border-cyan-500/30 rounded-xl p-6 text-center cursor-pointer hover:border-cyan-500 transition-all" onClick={() => document.getElementById('imageUpload').click()}>
                                        <i className="fas fa-cloud-upload-alt text-3xl text-cyan-500 mb-2"></i>
                                        <p className="text-gray-300">Upload Photos (Optional)</p>
                                        <small className="text-gray-500">Click to upload images</small>
                                        <input type="file" id="imageUpload" multiple accept="image/*" className="hidden" onChange={handleImageUpload} />
                                        {images.length > 0 && <p className="text-cyan-500 mt-2">{images.length} image(s) uploaded</p>}
                                    </div>
                                    
                                    <button type="submit" disabled={loading} className="w-full btn-primary disabled:opacity-50">{loading ? 'Submitting...' : 'Get Free Quote →'}</button>
                                </div>
                            </form>
                        </div>
                    )}

                    <div className="bg-gradient-to-br from-navy-800 to-navy-900 rounded-3xl overflow-hidden border border-cyan-500/20 reveal flex flex-col">
                        <div className="p-4 bg-cyan-500/10 border-b border-cyan-500/20">
                            <h3 className="text-xl font-bold text-white text-center">
                                <i className="fas fa-map-marker-alt text-cyan-500 mr-2"></i>
                                Our Location
                            </h3>
                        </div>
                        <div className="flex-1 w-full">
                            <iframe 
                                src={mapUrl}
                                width="100%" 
                                height="100%" 
                                style={{ border: 0, minHeight: '500px' }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Google Map - Simon Junk Removal Location"
                                className="w-full h-full"
                            ></iframe>
                        </div>
                        <div className="p-4 bg-navy-800/50 border-t border-cyan-500/20 text-center">
                            <p className="text-gray-300 text-sm">
                                <i className="fas fa-location-dot text-cyan-500 mr-1"></i>
                                Serving Maplewood, NJ & surrounding areas
                            </p>
                            <p className="text-gray-400 text-xs mt-1">
                                Call us for emergency service available 24/7
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* 🔥 Toast Notification - Bottom Right Side with Better Design */}
            {toast.show && (
                <div className="fixed bottom-6 right-6 z-50 animate-slide-up">
                    <div className={`rounded-2xl shadow-2xl px-5 py-4 min-w-[320px] max-w-md flex items-center gap-3 backdrop-blur-sm ${
                        toast.type === 'success' 
                            ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white' 
                            : 'bg-gradient-to-r from-rose-500 to-red-500 text-white'
                    }`}>
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            toast.type === 'success' ? 'bg-white/20' : 'bg-white/20'
                        }`}>
                            <i className={`fas ${toast.type === 'success' ? 'fa-check' : 'fa-exclamation'} text-xl`}></i>
                        </div>
                        <div className="flex-1">
                            <p className="font-semibold text-sm">{toast.type === 'success' ? 'Success!' : 'Error!'}</p>
                            <p className="text-xs opacity-90">{toast.message}</p>
                        </div>
                        <button 
                            onClick={() => setToast({ show: false, message: '', type: 'success' })}
                            className="text-white/70 hover:text-white transition"
                        >
                            <i className="fas fa-times"></i>
                        </button>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Contact;