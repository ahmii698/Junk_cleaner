import React, { useState, useEffect } from 'react';
import api from '../../services/api';

const Quotes = () => {
    const [quotes, setQuotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [replyModal, setReplyModal] = useState(null);
    const [replyData, setReplyData] = useState({ subject: '', reply_message: '' });

    useEffect(() => {
        fetchQuotes();
    }, []);

    const fetchQuotes = async () => {
        try {
            const res = await api.get('/admin/quotes');
            setQuotes(res.data.data);
        } catch (error) {
            console.error(error);
        }
        setLoading(false);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure?')) {
            await api.delete(`/admin/quotes/${id}`);
            fetchQuotes();
        }
    };

    const handleReply = async (id) => {
        try {
            await api.post(`/admin/quotes/${id}/reply`, replyData);
            alert('Reply sent successfully!');
            setReplyModal(null);
            setReplyData({ subject: '', reply_message: '' });
        } catch (error) {
            alert('Failed to send reply');
        }
    };

    if (loading) return <div className="text-center text-cyan-500 py-20">Loading...</div>;

    return (
        <div>
            <h1 className="text-2xl font-bold text-white mb-6">Quote Requests</h1>
            <div className="bg-navy-800/60 rounded-2xl p-6 border border-cyan-500/20 overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="border-b border-cyan-500/20">
                        <tr>
                            <th className="py-2 text-gray-400">ID</th>
                            <th className="py-2 text-gray-400">Name</th>
                            <th className="py-2 text-gray-400">Email</th>
                            <th className="py-2 text-gray-400">Service</th>
                            <th className="py-2 text-gray-400">Description</th>
                            <th className="py-2 text-gray-400">Date</th>
                            <th className="py-2 text-gray-400">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {quotes.map((quote) => (
                            <tr key={quote.id} className="border-b border-cyan-500/10">
                                <td className="py-2 text-white">{quote.id}</td>
                                <td className="py-2 text-white">{quote.name}</td>
                                <td className="py-2 text-gray-300">{quote.email}</td>
                                <td className="py-2 text-gray-300">{quote.service}</td>
                                <td className="py-2 text-gray-300 max-w-md truncate">{quote.description}</td>
                                <td className="py-2 text-gray-400">{new Date(quote.created_at).toLocaleDateString()}</td>
                                <td className="py-2">
                                    <button onClick={() => setReplyModal(quote)} className="bg-cyan-500 text-navy-900 px-3 py-1 rounded-full text-sm mr-2">Reply</button>
                                    <button onClick={() => handleDelete(quote.id)} className="bg-red-600 text-white px-3 py-1 rounded-full text-sm">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Reply Modal */}
            {replyModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-navy-800 rounded-2xl p-6 w-full max-w-md border border-cyan-500/20">
                        <h2 className="text-xl font-bold text-white mb-4">Reply to {replyModal.name}</h2>
                        <input type="text" placeholder="Subject" className="w-full p-3 bg-navy-700 rounded-lg mb-3 text-white" onChange={(e) => setReplyData({ ...replyData, subject: e.target.value })} />
                        <textarea rows="5" placeholder="Message" className="w-full p-3 bg-navy-700 rounded-lg mb-3 text-white" onChange={(e) => setReplyData({ ...replyData, reply_message: e.target.value })}></textarea>
                        <div className="flex gap-3">
                            <button onClick={() => handleReply(replyModal.id)} className="bg-cyan-500 text-navy-900 px-4 py-2 rounded-full">Send Reply</button>
                            <button onClick={() => setReplyModal(null)} className="bg-gray-600 text-white px-4 py-2 rounded-full">Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Quotes;