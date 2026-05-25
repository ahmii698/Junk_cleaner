import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';

const AdminLayout = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    const menuItems = [
        { path: '/admin', name: 'Dashboard', icon: 'fa-tachometer-alt' },
        { path: '/admin/hero', name: 'Hero Section', icon: 'fa-home' },
        { path: '/admin/process', name: 'Process Section', icon: 'fa-chart-line' },
        { path: '/admin/why-choose-us', name: 'Why Choose Us', icon: 'fa-star' },
        { path: '/admin/about', name: 'About Section', icon: 'fa-info-circle' },
        { path: '/admin/footer', name: 'Footer Section', icon: 'fa-copyright' },  // 🔥 ADD THIS
        { path: '/admin/services', name: 'Services', icon: 'fa-cogs' },
        { path: '/admin/faqs', name: 'FAQs', icon: 'fa-question-circle' },
        { path: '/admin/galleries', name: 'Gallery', icon: 'fa-images' },
        { path: '/admin/contacts', name: 'Contacts', icon: 'fa-envelope' },
        { path: '/admin/quotes', name: 'Quotes', icon: 'fa-file-alt' },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-navy-900 to-navy-950">
            {/* Toggle Button */}
            <button
                onClick={toggleSidebar}
                className="fixed top-4 left-4 z-50 bg-cyan-500 hover:bg-cyan-600 text-navy-900 p-2 rounded-lg shadow-lg"
            >
                <i className={`fas ${sidebarOpen ? 'fa-chevron-left' : 'fa-bars'} text-xl`}></i>
            </button>

            {/* Sidebar */}
            <div className={`fixed left-0 top-0 h-full bg-navy-800/95 backdrop-blur-sm border-r border-cyan-500/20 z-40 transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-16'}`}>
                <div className={`p-6 border-b border-cyan-500/20 ${!sidebarOpen && 'hidden'}`}>
                    <h1 className="text-cyan-500 text-2xl font-bold">Admin Panel</h1>
                    <p className="text-gray-400 text-sm mt-1">Welcome, {user?.name || user?.email}</p>
                </div>
                <nav className="p-4">
                    {menuItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-cyan-500 hover:bg-cyan-500/10 rounded-xl transition-all mb-1 ${!sidebarOpen && 'justify-center'}`}
                            title={!sidebarOpen ? item.name : ''}
                        >
                            <i className={`fas ${item.icon} w-5 text-xl`}></i>
                            {sidebarOpen && <span>{item.name}</span>}
                        </Link>
                    ))}
                    <button
                        onClick={handleLogout}
                        className={`flex items-center gap-3 px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl transition-all w-full mt-4 ${!sidebarOpen && 'justify-center'}`}
                    >
                        <i className="fas fa-sign-out-alt w-5 text-xl"></i>
                        {sidebarOpen && <span>Logout</span>}
                    </button>
                </nav>
            </div>

            {/* Main Content */}
            <div className={`transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-16'} p-8`}>
                <Outlet />
            </div>
        </div>
    );
};

export default AdminLayout;