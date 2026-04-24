import React, { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AdminLayout = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(true);

    useEffect(() => {
        if (!user || user.role !== 'admin') {
            navigate('/login');
        }
    }, [user, navigate]);

    const menuItems = [
        { name: 'Dashboard', path: '/admin', icon: 'fa-tachometer-alt' },
        { name: 'Contacts', path: '/admin/contacts', icon: 'fa-envelope' },
        { name: 'Quotes', path: '/admin/quotes', icon: 'fa-file-alt' },
        { name: 'Services', path: '/admin/services', icon: 'fa-cogs' },
        { name: 'FAQs', path: '/admin/faqs', icon: 'fa-question-circle' },
        { name: 'Gallery', path: '/admin/gallery', icon: 'fa-images' },
        { name: 'Users', path: '/admin/users', icon: 'fa-users' },
    ];

    return (
        <div className="min-h-screen bg-navy-900">
            {/* Sidebar */}
            <div className={`fixed top-0 left-0 h-full bg-navy-800 border-r border-cyan-500/20 transition-all duration-300 z-50 ${sidebarOpen ? 'w-64' : 'w-20'}`}>
                <div className="p-4 border-b border-cyan-500/20 flex justify-between items-center">
                    {sidebarOpen && <h2 className="text-cyan-500 font-bold text-lg">Admin Panel</h2>}
                    <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-cyan-500">
                        <i className={`fas ${sidebarOpen ? 'fa-chevron-left' : 'fa-chevron-right'}`}></i>
                    </button>
                </div>
                <nav className="mt-6">
                    {menuItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className="flex items-center px-4 py-3 text-gray-300 hover:bg-cyan-500/10 hover:text-cyan-500 transition-colors"
                        >
                            <i className={`fas ${item.icon} w-6`}></i>
                            {sidebarOpen && <span className="ml-3">{item.name}</span>}
                        </Link>
                    ))}
                    <button
                        onClick={logout}
                        className="w-full flex items-center px-4 py-3 text-gray-300 hover:bg-red-500/10 hover:text-red-500 transition-colors mt-4"
                    >
                        <i className="fas fa-sign-out-alt w-6"></i>
                        {sidebarOpen && <span className="ml-3">Logout</span>}
                    </button>
                </nav>
            </div>

            {/* Main Content */}
            <div className={`transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>
                <header className="bg-navy-800/95 backdrop-blur-md border-b border-cyan-500/20 p-4">
                    <div className="flex justify-between items-center">
                        <h1 className="text-xl font-bold text-white">Welcome, {user?.name}</h1>
                        <button onClick={logout} className="md:hidden bg-red-600 text-white px-4 py-2 rounded-full">
                            Logout
                        </button>
                    </div>
                </header>
                <main className="p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;