// src/pages/admin/ContactsAdmin.jsx
import React, { useState, useEffect } from 'react';
import api from '../../services/api';

const ContactsAdmin = () => {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [emailModal, setEmailModal] = useState(null);
    const [emailData, setEmailData] = useState({ subject: '', message: '' });
    const [sending, setSending] = useState(false);
    
    // 🔥 Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);

    useEffect(() => {
        fetchContacts();
    }, []);

    const fetchContacts = async () => {
        try {
            console.log('Fetching contacts...');
            const res = await api.get('/admin/contacts');
            console.log('Raw API Response:', res);
            console.log('Response data:', res.data);
            
            let data = [];
            
            if (res.data && Array.isArray(res.data)) {
                data = res.data;
                console.log('Case 1: Direct array, count:', data.length);
            }
            else if (res.data && res.data.success && Array.isArray(res.data.data)) {
                data = res.data.data;
                console.log('Case 2: success.data array, count:', data.length);
            }
            else if (res.data && res.data.data && Array.isArray(res.data.data)) {
                data = res.data.data;
                console.log('Case 3: data.data array, count:', data.length);
            }
            else if (res.data && typeof res.data === 'object') {
                const keys = Object.keys(res.data);
                for (let key of keys) {
                    if (Array.isArray(res.data[key])) {
                        data = res.data[key];
                        console.log(`Case 4: Found array in property "${key}", count:`, data.length);
                        break;
                    }
                }
            }
            
            // 🔥 Sort by created_at descending (latest first)
            const sortedData = [...data].sort((a, b) => {
                return new Date(b.created_at) - new Date(a.created_at);
            });
            
            console.log('Final contacts data (sorted latest first):', sortedData);
            setContacts(sortedData);
            setError(null);
            // Reset to first page when new data comes
            setCurrentPage(1);
        } catch (error) {
            console.error('Error fetching contacts:', error);
            setError(error.response?.data?.message || 'Failed to fetch contacts');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this message?')) {
            try {
                await api.delete(`/admin/contacts/${id}`);
                alert('Message deleted successfully!');
                fetchContacts();
            } catch (error) {
                console.error('Delete error:', error);
                alert('Failed to delete message');
            }
        }
    };

    const handleSendEmail = async () => {
        if (!emailData.subject.trim()) {
            alert('Please enter a subject');
            return;
        }
        if (!emailData.message.trim()) {
            alert('Please enter a message');
            return;
        }
        
        setSending(true);
        try {
            await api.post(`/admin/contacts/${emailModal.id}/send-email`, {
                subject: emailData.subject,
                message: emailData.message,
                to_email: emailModal.email,
                to_name: emailModal.name
            });
            alert(`Email sent successfully to ${emailModal.email}!`);
            setEmailModal(null);
            setEmailData({ subject: '', message: '' });
        } catch (error) {
            console.error('Send email error:', error);
            alert('Failed to send email. Please try again.');
        } finally {
            setSending(false);
        }
    };

    // 🔥 Pagination Logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = contacts.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(contacts.length / itemsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const goToPrevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };
    const goToNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-cyan-500">Loading contacts...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-12">
                <div className="bg-red-500/10 border border-red-500/50 rounded-2xl p-8 max-w-md mx-auto">
                    <i className="fas fa-exclamation-triangle text-red-500 text-5xl mb-4"></i>
                    <h3 className="text-red-400 text-xl font-bold mb-2">Error Loading Contacts</h3>
                    <p className="text-gray-400 mb-4">{error}</p>
                    <button 
                        onClick={fetchContacts} 
                        className="bg-cyan-500 text-navy-900 px-4 py-2 rounded-full hover:bg-cyan-400 transition"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-white">Contact Messages</h1>
                <span className="text-gray-400">Total: {contacts.length} messages</span>
            </div>

            {contacts.length === 0 ? (
                <div className="text-center py-12 bg-navy-800/60 rounded-2xl border border-cyan-500/20">
                    <i className="fas fa-inbox text-5xl text-gray-500 mb-4"></i>
                    <p className="text-gray-400">No contact messages found.</p>
                </div>
            ) : (
                <>
                    <div className="overflow-x-auto bg-navy-800/60 rounded-2xl border border-cyan-500/20">
                        <table className="w-full">
                            <thead className="bg-navy-800/80 border-b border-cyan-500/20">
                                <tr>
                                    <th className="p-3 text-left text-gray-400">ID</th>
                                    <th className="p-3 text-left text-gray-400">Name</th>
                                    <th className="p-3 text-left text-gray-400">Email</th>
                                    <th className="p-3 text-left text-gray-400">Phone</th>
                                    <th className="p-3 text-left text-gray-400">Message</th>
                                    <th className="p-3 text-left text-gray-400">IP Address</th>
                                    <th className="p-3 text-left text-gray-400">Date</th>
                                    <th className="p-3 text-left text-gray-400">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems.map((contact) => (
                                    <tr key={contact.id} className="border-b border-cyan-500/10 hover:bg-cyan-500/5 transition">
                                        <td className="p-3 text-white">{contact.id}</td>
                                        <td className="p-3 text-white font-medium">{contact.name}</td>
                                        <td className="p-3 text-cyan-400">{contact.email}</td>
                                        <td className="p-3 text-gray-300">{contact.phone || '-'}</td>
                                        <td className="p-3 text-gray-300 max-w-md">
                                            <div className="truncate max-w-xs" title={contact.message}>
                                                {contact.message}
                                            </div>
                                        </td>
                                        <td className="p-3 text-gray-500 text-sm">{contact.ip_address || '-'}</td>
                                        <td className="p-3 text-gray-400 text-sm">
                                            {new Date(contact.created_at).toLocaleString()}
                                        </td>
                                        <td className="p-3">
                                            <div className="flex gap-2">
                                                <button 
                                                    onClick={() => {
                                                        setEmailModal(contact);
                                                        setEmailData({ 
                                                            subject: `Regarding your message - Simon Junk Removal`, 
                                                            message: `Dear ${contact.name},\n\nThank you for contacting us. We have received your message and will get back to you shortly.\n\nBest regards,\nSimon Junk Removal Team`
                                                        });
                                                    }} 
                                                    className="bg-cyan-500 hover:bg-cyan-600 text-white px-3 py-1 rounded-full text-sm transition"
                                                >
                                                    <i className="fas fa-envelope mr-1"></i> Reply
                                                </button>
                                                <button 
                                                    onClick={() => handleDelete(contact.id)} 
                                                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-full text-sm transition"
                                                >
                                                    <i className="fas fa-trash mr-1"></i> Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* 🔥 Pagination Component */}
                    {totalPages > 1 && (
                        <div className="flex justify-center items-center gap-2 mt-6">
                            <button
                                onClick={goToPrevPage}
                                disabled={currentPage === 1}
                                className={`px-4 py-2 rounded-lg transition ${
                                    currentPage === 1 
                                        ? 'bg-navy-700 text-gray-500 cursor-not-allowed' 
                                        : 'bg-cyan-500 text-navy-900 hover:bg-cyan-400'
                                }`}
                            >
                                <i className="fas fa-chevron-left mr-1"></i> Previous
                            </button>
                            
                            <div className="flex gap-2">
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                                    <button
                                        key={number}
                                        onClick={() => paginate(number)}
                                        className={`w-10 h-10 rounded-lg transition ${
                                            currentPage === number
                                                ? 'bg-cyan-500 text-navy-900 font-bold'
                                                : 'bg-navy-700 text-gray-300 hover:bg-navy-600'
                                        }`}
                                    >
                                        {number}
                                    </button>
                                ))}
                            </div>
                            
                            <button
                                onClick={goToNextPage}
                                disabled={currentPage === totalPages}
                                className={`px-4 py-2 rounded-lg transition ${
                                    currentPage === totalPages 
                                        ? 'bg-navy-700 text-gray-500 cursor-not-allowed' 
                                        : 'bg-cyan-500 text-navy-900 hover:bg-cyan-400'
                                }`}
                            >
                                Next <i className="fas fa-chevron-right ml-1"></i>
                            </button>
                        </div>
                    )}
                    
                    {/* 🔥 Showing info */}
                    <div className="text-center text-gray-500 text-sm mt-4">
                        Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, contacts.length)} of {contacts.length} entries
                    </div>
                </>
            )}

            {/* Email Modal */}
            {emailModal && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
                    <div className="bg-navy-800 rounded-2xl p-6 w-full max-w-lg border border-cyan-500/20">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold text-white">
                                <i className="fas fa-envelope text-cyan-500 mr-2"></i>
                                Send Reply to {emailModal.name}
                            </h2>
                            <button 
                                onClick={() => setEmailModal(null)} 
                                className="text-gray-400 hover:text-white text-2xl"
                            >
                                &times;
                            </button>
                        </div>
                        
                        <div className="mb-4 p-3 bg-navy-700/50 rounded-lg">
                            <p className="text-gray-400 text-sm">To:</p>
                            <p className="text-cyan-400 font-medium">{emailModal.email}</p>
                        </div>
                        
                        <div className="mb-4">
                            <label className="block text-gray-400 text-sm mb-2">Subject</label>
                            <input 
                                type="text" 
                                value={emailData.subject} 
                                onChange={(e) => setEmailData({...emailData, subject: e.target.value})}
                                className="w-full p-3 bg-navy-700/50 rounded-xl border border-cyan-500/20 focus:border-cyan-500 outline-none text-white"
                                placeholder="Email subject..."
                            />
                        </div>
                        
                        <div className="mb-4">
                            <label className="block text-gray-400 text-sm mb-2">Message</label>
                            <textarea 
                                rows="8" 
                                value={emailData.message} 
                                onChange={(e) => setEmailData({...emailData, message: e.target.value})}
                                className="w-full p-3 bg-navy-700/50 rounded-xl border border-cyan-500/20 focus:border-cyan-500 outline-none text-white resize-none"
                                placeholder="Write your reply here..."
                            />
                        </div>
                        
                        <div className="flex gap-3">
                            <button 
                                onClick={handleSendEmail} 
                                disabled={sending}
                                className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-white py-3 rounded-xl font-bold transition disabled:opacity-50"
                            >
                                {sending ? (
                                    <>
                                        <i className="fas fa-spinner fa-spin mr-2"></i>
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        <i className="fas fa-paper-plane mr-2"></i>
                                        Send Reply
                                    </>
                                )}
                            </button>
                            <button 
                                onClick={() => setEmailModal(null)} 
                                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-3 rounded-xl font-bold transition"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ContactsAdmin;