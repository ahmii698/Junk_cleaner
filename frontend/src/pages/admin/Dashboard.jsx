import { useEffect, useState } from 'react';
import api from '../../services/api';

const Dashboard = () => {
    const [stats, setStats] = useState({
        services: 0,
        faqs: 0,
        galleries: 0,
        contacts: 0,
        quotes: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const [services, faqs, galleries, contacts, quotes] = await Promise.all([
                api.get('/admin/services'),
                api.get('/admin/faqs'),
                api.get('/admin/galleries'),
                api.get('/admin/contacts'),
                api.get('/admin/quotes')
            ]);
            
            const getCount = (data) => {
                if (!data) return 0;
                if (Array.isArray(data)) return data.length;
                if (data.data && Array.isArray(data.data)) return data.data.length;
                return 0;
            };
            
            setStats({
                services: getCount(services.data),
                faqs: getCount(faqs.data),
                galleries: getCount(galleries.data),
                contacts: getCount(contacts.data),
                quotes: getCount(quotes.data)
            });
        } catch (error) {
            console.error('Error fetching stats:', error);
        }
        setLoading(false);
    };

    const cards = [
        { title: 'Services', count: stats.services, icon: 'fa-cogs', color: 'text-cyan-500' },
        { title: 'FAQs', count: stats.faqs, icon: 'fa-question-circle', color: 'text-green-500' },
        { title: 'Gallery', count: stats.galleries, icon: 'fa-images', color: 'text-purple-500' },
        { title: 'Contacts', count: stats.contacts, icon: 'fa-envelope', color: 'text-yellow-500' },
        { title: 'Quotes', count: stats.quotes, icon: 'fa-file-alt', color: 'text-orange-500' },
    ];

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-cyan-500">Loading dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div>
            <h1 className="text-3xl font-bold text-white mb-8">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                {cards.map((card) => (
                    <div key={card.title} className="bg-navy-800/60 rounded-2xl p-6 border border-cyan-500/20 hover:border-cyan-500 transition-all">
                        <div className="flex items-center justify-between mb-4">
                            <i className={`fas ${card.icon} text-4xl ${card.color}`}></i>
                            <span className="text-3xl font-bold text-white">{card.count}</span>
                        </div>
                        <h3 className="text-gray-400 font-medium">{card.title}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;