import React, { useState, useEffect } from 'react';
import api from '../../services/api';

const Dashboard = () => {
    const [stats, setStats] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboard();
    }, []);

    const fetchDashboard = async () => {
        try {
            const res = await api.get('/admin/dashboard');
            setStats(res.data);
        } catch (error) {
            console.error(error);
        }
        setLoading(false);
    };

    const statCards = [
        { title: 'Total Contacts', value: stats.total_contacts, icon: 'fa-envelope', color: 'blue' },
        { title: 'Total Quotes', value: stats.total_quotes, icon: 'fa-file-alt', color: 'green' },
        { title: 'Total Services', value: stats.total_services, icon: 'fa-cogs', color: 'purple' },
        { title: 'Total FAQs', value: stats.total_faqs, icon: 'fa-question-circle', color: 'orange' },
        { title: 'Gallery Items', value: stats.total_galleries, icon: 'fa-images', color: 'pink' },
        { title: 'Total Users', value: stats.total_users, icon: 'fa-users', color: 'cyan' },
    ];

    if (loading) return <div className="text-center text-cyan-500 py-20">Loading...</div>;

    return (
        <div>
            <h1 className="text-2xl font-bold text-white mb-6">Dashboard</h1>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {statCards.map((card, i) => (
                    <div key={i} className="bg-navy-800/60 rounded-2xl p-6 border border-cyan-500/20">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-400 text-sm">{card.title}</p>
                                <p className="text-3xl font-bold text-white">{card.value || 0}</p>
                            </div>
                            <i className={`fas ${card.icon} text-4xl text-cyan-500`}></i>
                        </div>
                    </div>
                ))}
            </div>

            {/* Recent Contacts */}
            <div className="bg-navy-800/60 rounded-2xl p-6 border border-cyan-500/20 mb-6">
                <h2 className="text-xl font-bold text-white mb-4">Recent Contacts</h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="border-b border-cyan-500/20">
                            <tr>
                                <th className="py-2 text-gray-400">Name</th>
                                <th className="py-2 text-gray-400">Email</th>
                                <th className="py-2 text-gray-400">Message</th>
                                <th className="py-2 text-gray-400">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {stats.recent_contacts?.map((contact) => (
                                <tr key={contact.id} className="border-b border-cyan-500/10">
                                    <td className="py-2 text-white">{contact.name}</td>
                                    <td className="py-2 text-gray-300">{contact.email}</td>
                                    <td className="py-2 text-gray-300 max-w-xs truncate">{contact.message}</td>
                                    <td className="py-2 text-gray-400">{new Date(contact.created_at).toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Recent Quotes */}
            <div className="bg-navy-800/60 rounded-2xl p-6 border border-cyan-500/20">
                <h2 className="text-xl font-bold text-white mb-4">Recent Quotes</h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="border-b border-cyan-500/20">
                            <tr>
                                <th className="py-2 text-gray-400">Name</th>
                                <th className="py-2 text-gray-400">Service</th>
                                <th className="py-2 text-gray-400">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {stats.recent_quotes?.map((quote) => (
                                <tr key={quote.id} className="border-b border-cyan-500/10">
                                    <td className="py-2 text-white">{quote.name}</td>
                                    <td className="py-2 text-gray-300">{quote.service}</td>
                                    <td className="py-2 text-gray-400">{new Date(quote.created_at).toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;