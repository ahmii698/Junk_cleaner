import React, { useState } from 'react';
import { submitContact, submitQuote, uploadImage } from '../services/api';

const Contact = () => {
    const [activeForm, setActiveForm] = useState('contact');
    const [loading, setLoading] = useState(false);
    const [contactForm, setContactForm] = useState({ name: '', email: '', phone: '', message: '' });
    const [quoteForm, setQuoteForm] = useState({ name: '', email: '', phone: '', service: '', description: '' });
    const [images, setImages] = useState([]);

    const handleContactSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await submitContact(contactForm);
            alert('Message sent successfully! We will contact you soon.');
            setContactForm({ name: '', email: '', phone: '', message: '' });
        } catch (error) {
            alert('Error sending message. Please try again.');
        }
        setLoading(false);
    };

    const handleQuoteSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await submitQuote({ ...quoteForm, images });
            alert('Quote request submitted! We will get back to you within 24 hours.');
            setQuoteForm({ name: '', email: '', phone: '', service: '', description: '' });
            setImages([]);
        } catch (error) {
            alert('Error submitting quote. Please try again.');
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

    const services = ['Residential Junk Removal', 'Commercial Junk Removal', 'Property Cleanouts', 'Construction Debris Removal', 'Demolition Services', 'Storage Unit Cleanouts', 'Drain Cleaning', 'Emergency Junk Removal'];

    return (
        <section className="py-20">
            <div className="container-custom">
                <h2 className="section-title reveal"><span>Contact Us</span></h2>
                
                {/* Form Toggle */}
                <div className="flex justify-center gap-4 mb-10 reveal">
                    <button onClick={() => setActiveForm('contact')} className={`px-6 py-2 rounded-full font-semibold transition-all ${activeForm === 'contact' ? 'bg-cyan-500 text-navy-900' : 'bg-navy-800 text-gray-300 hover:bg-navy-700'}`}>Contact Us</button>
                    <button onClick={() => setActiveForm('quote')} className={`px-6 py-2 rounded-full font-semibold transition-all ${activeForm === 'quote' ? 'bg-cyan-500 text-navy-900' : 'bg-navy-800 text-gray-300 hover:bg-navy-700'}`}>Request Quote</button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Contact Info */}
                    <div className="bg-gradient-to-br from-navy-800 to-navy-900 rounded-3xl p-8 border border-cyan-500/20 reveal">
                        <h3 className="text-2xl font-bold mb-4">Get In <span className="text-cyan-500">Touch</span></h3>
                        <p className="text-gray-300 mb-8">Ready to reclaim your space? Contact us for a free, no-obligation estimate.</p>
                        <div className="space-y-6">
                            <div className="flex items-center gap-4"><div className="w-12 h-12 bg-cyan-500/20 rounded-full flex items-center justify-center"><i className="fas fa-phone text-cyan-500 text-xl"></i></div><div><strong className="block">(248) 242-1376</strong><span className="text-gray-400 text-sm">Call or Text Anytime</span></div></div>
                            <div className="flex items-center gap-4"><div className="w-12 h-12 bg-cyan-500/20 rounded-full flex items-center justify-center"><i className="fas fa-envelope text-cyan-500 text-xl"></i></div><div><strong className="block">salvadorgutierrez2012@gmail.com</strong><span className="text-gray-400 text-sm">We respond within a few hours</span></div></div>
                            <div className="flex items-center gap-4"><div className="w-12 h-12 bg-cyan-500/20 rounded-full flex items-center justify-center"><i className="fas fa-clock text-cyan-500 text-xl"></i></div><div><strong className="block">Mon – Fri: 8AM – 6PM</strong><span className="text-gray-400 text-sm">Emergency service available</span></div></div>
                        </div>
                        <div className="flex flex-wrap gap-4 mt-8 pt-8 border-t border-gray-700">
                            <a href="#" className="text-gray-400 hover:text-cyan-500"><i className="fab fa-facebook-f mr-2"></i>Facebook</a>
                            <a href="#" className="text-gray-400 hover:text-cyan-500"><i className="fab fa-google mr-2"></i>Google</a>
                            <a href="#" className="text-gray-400 hover:text-cyan-500"><i className="fab fa-yelp mr-2"></i>Yelp</a>
                        </div>
                    </div>

                    {/* Contact Form */}
                    {activeForm === 'contact' ? (
                        <div className="bg-gradient-to-br from-navy-800 to-navy-900 rounded-3xl p-8 border border-cyan-500/20 reveal">
                            <h3 className="text-2xl font-bold mb-6">Send Us a <span className="text-cyan-500">Message</span></h3>
                            <form onSubmit={handleContactSubmit}>
                                <div className="space-y-4">
                                    <input type="text" placeholder="Full Name" value={contactForm.name} onChange={e => setContactForm({...contactForm, name: e.target.value})} className="w-full p-4 bg-navy-700/50 rounded-xl border border-cyan-500/20 focus:border-cyan-500 outline-none text-white" required />
                                    <input type="email" placeholder="Email Address" value={contactForm.email} onChange={e => setContactForm({...contactForm, email: e.target.value})} className="w-full p-4 bg-navy-700/50 rounded-xl border border-cyan-500/20 focus:border-cyan-500 outline-none text-white" required />
                                    <input type="tel" placeholder="Phone Number" value={contactForm.phone} onChange={e => setContactForm({...contactForm, phone: e.target.value})} className="w-full p-4 bg-navy-700/50 rounded-xl border border-cyan-500/20 focus:border-cyan-500 outline-none text-white" required />
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
                                    <input type="tel" placeholder="Phone Number" value={quoteForm.phone} onChange={e => setQuoteForm({...quoteForm, phone: e.target.value})} className="w-full p-4 bg-navy-700/50 rounded-xl border border-cyan-500/20 focus:border-cyan-500 outline-none text-white" required />
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
                </div>
            </div>
        </section>
    );
};

export default Contact;