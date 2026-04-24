import React, { useState, useEffect } from 'react';
import api from '../../services/api';

const FAQs = () => {
    const [faqs, setFaqs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modal, setModal] = useState(null);
    const [formData, setFormData] = useState({ question: '', answer: '' });

    useEffect(() => {
        fetchFaqs();
    }, []);

    const fetchFaqs = async () => {
        try {
            const res = await api.get('/admin/faqs');
            setFaqs(res.data);
        } catch (error) {
            console.error(error);
        }
        setLoading(false);
    };

    const handleSave = async () => {
        try {
            if (modal?.id) {
                await api.put(`/admin/faqs/${modal.id}`, formData);
            } else {
                await api.post('/admin/faqs', formData);
            }
            fetchFaqs();
            setModal(null);
            setFormData({ question: '', answer: '' });
        } catch (error) {
            alert('Error saving FAQ');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure?')) {
            await api.delete(`/admin/faqs/${id}`);
            fetchFaqs();
        }
    };

    if (loading) return <div className="text-center text-cyan-500 py-20">Loading...</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-white">FAQs</h1>
                <button onClick={() => setModal({})} className="bg-cyan-500 text-navy-900 px-4 py-2 rounded-full">+ Add FAQ</button>
            </div>
            <div className="space-y-4">
                {faqs.map((faq) => (
                    <div key={faq.id} className="bg-navy-800/60 rounded-2xl p-6 border border-cyan-500/20">
                        <h3 className="text-lg font-bold text-cyan-500 mb-2">{faq.question}</h3>
                        <p className="text-gray-300 mb-3">{faq.answer}</p>
                        <div className="flex gap-2">
                            <button onClick={() => { setModal(faq); setFormData(faq); }} className="bg-cyan-500 text-navy-900 px-3 py-1 rounded-full text-sm">Edit</button>
                            <button onClick={() => handleDelete(faq.id)} className="bg-red-600 text-white px-3 py-1 rounded-full text-sm">Delete</button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {modal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-navy-800 rounded-2xl p-6 w-full max-w-md border border-cyan-500/20">
                        <h2 className="text-xl font-bold text-white mb-4">{modal.id ? 'Edit FAQ' : 'Add FAQ'}</h2>
                        <input type="text" placeholder="Question" value={formData.question} onChange={(e) => setFormData({ ...formData, question: e.target.value })} className="w-full p-3 bg-navy-700 rounded-lg mb-3 text-white" />
                        <textarea placeholder="Answer" value={formData.answer} onChange={(e) => setFormData({ ...formData, answer: e.target.value })} className="w-full p-3 bg-navy-700 rounded-lg mb-3 text-white" rows="4"></textarea>
                        <div className="flex gap-3">
                            <button onClick={handleSave} className="bg-cyan-500 text-navy-900 px-4 py-2 rounded-full">Save</button>
                            <button onClick={() => { setModal(null); setFormData({ question: '', answer: '' }); }} className="bg-gray-600 text-white px-4 py-2 rounded-full">Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FAQs;