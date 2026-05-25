// src/pages/admin/ServicesAdmin.jsx
import React, { useState, useEffect } from 'react';
import api from '../../services/api';

// 🔥 100+ Font Awesome Icons List
const fontAwesomeIcons = [
    // Home & Building
    { value: 'fa-home', label: '🏠 Home', preview: 'fa-home' },
    { value: 'fa-building', label: '🏢 Building', preview: 'fa-building' },
    { value: 'fa-warehouse', label: '🏚️ Warehouse', preview: 'fa-warehouse' },
    { value: 'fa-store', label: '🏪 Store', preview: 'fa-store' },
    { value: 'fa-house-damage', label: '🏚️ House Damage', preview: 'fa-house-damage' },
    
    // Transportation & Vehicles
    { value: 'fa-truck', label: '🚚 Truck', preview: 'fa-truck' },
    { value: 'fa-truck-moving', label: '🚛 Moving Truck', preview: 'fa-truck-moving' },
    { value: 'fa-car', label: '🚗 Car', preview: 'fa-car' },
    { value: 'fa-taxi', label: '🚕 Taxi', preview: 'fa-taxi' },
    { value: 'fa-train', label: '🚆 Train', preview: 'fa-train' },
    { value: 'fa-subway', label: '🚇 Subway', preview: 'fa-subway' },
    { value: 'fa-bus', label: '🚌 Bus', preview: 'fa-bus' },
    { value: 'fa-bicycle', label: '🚲 Bicycle', preview: 'fa-bicycle' },
    { value: 'fa-motorcycle', label: '🏍️ Motorcycle', preview: 'fa-motorcycle' },
    { value: 'fa-shipping-fast', label: '📦 Fast Shipping', preview: 'fa-shipping-fast' },
    
    // Tools & Equipment
    { value: 'fa-tools', label: '🔧 Tools', preview: 'fa-tools' },
    { value: 'fa-wrench', label: '🔧 Wrench', preview: 'fa-wrench' },
    { value: 'fa-screwdriver', label: '🪛 Screwdriver', preview: 'fa-screwdriver' },
    { value: 'fa-hammer', label: '🔨 Hammer', preview: 'fa-hammer' },
    { value: 'fa-hard-hat', label: '⛑️ Hard Hat', preview: 'fa-hard-hat' },
    { value: 'fa-helmet-safety', label: '🪖 Safety Helmet', preview: 'fa-helmet-safety' },
    { value: 'fa-gavel', label: '🔨 Gavel', preview: 'fa-gavel' },
    { value: 'fa-cogs', label: '⚙️ Cogs', preview: 'fa-cogs' },
    { value: 'fa-cog', label: '⚙️ Cog', preview: 'fa-cog' },
    { value: 'fa-gear', label: '⚙️ Gear', preview: 'fa-gear' },
    { value: 'fa-industry', label: '🏭 Industry', preview: 'fa-industry' },
    { value: 'fa-factory', label: '🏭 Factory', preview: 'fa-factory' },
    
    // Cleaning & Maintenance
    { value: 'fa-broom', label: '🧹 Broom', preview: 'fa-broom' },
    { value: 'fa-mop', label: '🧹 Mop', preview: 'fa-mop' },
    { value: 'fa-soap', label: '🧼 Soap', preview: 'fa-soap' },
    { value: 'fa-trash', label: '🗑️ Trash', preview: 'fa-trash' },
    { value: 'fa-trash-alt', label: '🗑️ Trash Alt', preview: 'fa-trash-alt' },
    { value: 'fa-dumpster', label: '🗑️ Dumpster', preview: 'fa-dumpster' },
    { value: 'fa-recycle', label: '♻️ Recycle', preview: 'fa-recycle' },
    { value: 'fa-leaf', label: '🍃 Leaf', preview: 'fa-leaf' },
    { value: 'fa-seedling', label: '🌱 Seedling', preview: 'fa-seedling' },
    { value: 'fa-tree', label: '🌳 Tree', preview: 'fa-tree' },
    
    // Nature & Environment
    { value: 'fa-water', label: '💧 Water', preview: 'fa-water' },
    { value: 'fa-tint', label: '💧 Tint', preview: 'fa-tint' },
    { value: 'fa-cloud-sun', label: '🌤️ Cloud Sun', preview: 'fa-cloud-sun' },
    { value: 'fa-cloud-rain', label: '🌧️ Cloud Rain', preview: 'fa-cloud-rain' },
    { value: 'fa-sun', label: '☀️ Sun', preview: 'fa-sun' },
    { value: 'fa-moon', label: '🌙 Moon', preview: 'fa-moon' },
    
    // Business & Services
    { value: 'fa-briefcase', label: '💼 Briefcase', preview: 'fa-briefcase' },
    { value: 'fa-handshake', label: '🤝 Handshake', preview: 'fa-handshake' },
    { value: 'fa-chart-line', label: '📈 Chart Line', preview: 'fa-chart-line' },
    { value: 'fa-chart-bar', label: '📊 Chart Bar', preview: 'fa-chart-bar' },
    { value: 'fa-dollar-sign', label: '💰 Dollar', preview: 'fa-dollar-sign' },
    { value: 'fa-tag', label: '🏷️ Tag', preview: 'fa-tag' },
    { value: 'fa-tags', label: '🏷️ Tags', preview: 'fa-tags' },
    { value: 'fa-clock', label: '🕐 Clock', preview: 'fa-clock' },
    { value: 'fa-calendar', label: '📅 Calendar', preview: 'fa-calendar' },
    { value: 'fa-phone', label: '📞 Phone', preview: 'fa-phone' },
    { value: 'fa-envelope', label: '✉️ Envelope', preview: 'fa-envelope' },
    { value: 'fa-map-marker-alt', label: '📍 Map Marker', preview: 'fa-map-marker-alt' },
    
    // Construction
    { value: 'fa-hard-hat', label: '⛑️ Hard Hat', preview: 'fa-hard-hat' },
    { value: 'fa-helmet-safety', label: '🪖 Safety Helmet', preview: 'fa-helmet-safety' },
    { value: 'fa-drafting-compass', label: '📐 Drafting Compass', preview: 'fa-drafting-compass' },
    { value: 'fa-ruler-combined', label: '📏 Ruler', preview: 'fa-ruler-combined' },
    { value: 'fa-paint-roller', label: '🎨 Paint Roller', preview: 'fa-paint-roller' },
    { value: 'fa-brush', label: '🖌️ Brush', preview: 'fa-brush' },
    
    // Electronics & Tech
    { value: 'fa-laptop', label: '💻 Laptop', preview: 'fa-laptop' },
    { value: 'fa-desktop', label: '🖥️ Desktop', preview: 'fa-desktop' },
    { value: 'fa-mobile-alt', label: '📱 Mobile', preview: 'fa-mobile-alt' },
    { value: 'fa-tablet-alt', label: '📟 Tablet', preview: 'fa-tablet-alt' },
    { value: 'fa-server', label: '🗄️ Server', preview: 'fa-server' },
    { value: 'fa-database', label: '🗄️ Database', preview: 'fa-database' },
    
    // Hands & Gestures
    { value: 'fa-hand-peace', label: '✌️ Peace', preview: 'fa-hand-peace' },
    { value: 'fa-hand-sparkles', label: '✨ Sparkles', preview: 'fa-hand-sparkles' },
    { value: 'fa-hand-holding-heart', label: '🤲 Holding Heart', preview: 'fa-hand-holding-heart' },
    { value: 'fa-hand-peace', label: '✌️ Peace', preview: 'fa-hand-peace' },
    { value: 'fa-thumbs-up', label: '👍 Thumbs Up', preview: 'fa-thumbs-up' },
    { value: 'fa-thumbs-down', label: '👎 Thumbs Down', preview: 'fa-thumbs-down' },
    
    // Files & Documents
    { value: 'fa-file-alt', label: '📄 File Alt', preview: 'fa-file-alt' },
    { value: 'fa-file-pdf', label: '📕 PDF', preview: 'fa-file-pdf' },
    { value: 'fa-file-word', label: '📘 Word', preview: 'fa-file-word' },
    { value: 'fa-file-excel', label: '📗 Excel', preview: 'fa-file-excel' },
    
    // Miscellaneous
    { value: 'fa-star', label: '⭐ Star', preview: 'fa-star' },
    { value: 'fa-heart', label: '❤️ Heart', preview: 'fa-heart' },
    { value: 'fa-shield-alt', label: '🛡️ Shield', preview: 'fa-shield-alt' },
    { value: 'fa-lock', label: '🔒 Lock', preview: 'fa-lock' },
    { value: 'fa-unlock', label: '🔓 Unlock', preview: 'fa-unlock' },
    { value: 'fa-key', label: '🔑 Key', preview: 'fa-key' },
    { value: 'fa-bolt', label: '⚡ Bolt', preview: 'fa-bolt' },
    { value: 'fa-fire', label: '🔥 Fire', preview: 'fa-fire' },
    { value: 'fa-crown', label: '👑 Crown', preview: 'fa-crown' },
    { value: 'fa-gem', label: '💎 Gem', preview: 'fa-gem' },
    { value: 'fa-rocket', label: '🚀 Rocket', preview: 'fa-rocket' },
    { value: 'fa-globe', label: '🌍 Globe', preview: 'fa-globe' },
    { value: 'fa-flag', label: '🏁 Flag', preview: 'fa-flag' },
    { value: 'fa-check-circle', label: '✅ Check Circle', preview: 'fa-check-circle' },
    { value: 'fa-times-circle', label: '❌ Times Circle', preview: 'fa-times-circle' },
];

const ServicesAdmin = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modal, setModal] = useState(null);
    const [saving, setSaving] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [formData, setFormData] = useState({
        title: '',
        short_description: '',
        long_description: '',
        icon: 'fa-home',
        price_tag: '',
        is_active: 1,
        order: 0
    });

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        try {
            const res = await api.get('/admin/services');
            let servicesData = [];
            if (Array.isArray(res.data)) {
                servicesData = res.data;
            } else if (res.data && res.data.success && Array.isArray(res.data.data)) {
                servicesData = res.data.data;
            } else if (res.data && Array.isArray(res.data.data)) {
                servicesData = res.data.data;
            }
            setServices(servicesData);
            setErrorMsg('');
        } catch (error) {
            console.error('Error fetching services:', error);
            setErrorMsg(error.response?.data?.message || error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        if (!formData.title.trim()) {
            alert('Please enter service title');
            return;
        }
        if (!formData.short_description.trim()) {
            alert('Please enter short description');
            return;
        }
        
        setSaving(true);
        setErrorMsg('');
        
        try {
            const payload = {
                title: formData.title,
                short_description: formData.short_description,
                long_description: formData.long_description || null,
                icon: formData.icon,
                price_tag: formData.price_tag || null,
                is_active: formData.is_active,
                order: formData.order || services.length + 1
            };
            
            if (modal?.id) {
                await api.put(`/admin/services/${modal.id}`, payload);
                alert('Service updated successfully!');
            } else {
                await api.post('/admin/services', payload);
                alert('Service created successfully!');
            }
            
            await fetchServices();
            setModal(null);
            setFormData({ title: '', short_description: '', long_description: '', icon: 'fa-home', price_tag: '', is_active: 1, order: 0 });
            
        } catch (error) {
            console.error('Error:', error);
            if (error.response?.data?.errors) {
                const errors = error.response.data.errors;
                alert('Validation Error:\n' + Object.values(errors).flat().join('\n'));
            } else {
                alert(error.response?.data?.message || 'Error saving service');
            }
            setErrorMsg(error.response?.data?.message || error.message);
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this service?')) {
            try {
                await api.delete(`/admin/services/${id}`);
                alert('Service deleted successfully!');
                await fetchServices();
            } catch (error) {
                alert('Failed to delete service');
            }
        }
    };

    if (loading) return <div className="text-center text-cyan-500 py-20">Loading...</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-white">Services</h1>
                <button 
                    onClick={() => {
                        setModal({});
                        setFormData({ title: '', short_description: '', long_description: '', icon: 'fa-home', price_tag: '', is_active: 1, order: services.length + 1 });
                    }} 
                    className="bg-cyan-500 text-navy-900 px-4 py-2 rounded-full hover:bg-cyan-400 transition"
                >
                    + Add Service
                </button>
            </div>

            {errorMsg && (
                <div className="bg-red-500/20 border border-red-500 rounded-lg p-3 mb-4 text-red-400">
                    Error: {errorMsg}
                </div>
            )}

            <div className="overflow-x-auto bg-navy-800/60 rounded-2xl border border-cyan-500/20">
                <table className="w-full">
                    <thead className="bg-navy-800/80 border-b border-cyan-500/20">
                        <tr>
                            <th className="p-3 text-left text-gray-400">ID</th>
                            <th className="p-3 text-left text-gray-400">Icon</th>
                            <th className="p-3 text-left text-gray-400">Title</th>
                            <th className="p-3 text-left text-gray-400">Price</th>
                            <th className="p-3 text-left text-gray-400">Status</th>
                            <th className="p-3 text-left text-gray-400">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {services.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="text-center text-gray-400 py-8">No services found. Click "Add Service" to create one.</td>
                            </tr>
                        ) : (
                            services.map((service) => (
                                <tr key={service.id} className="border-b border-cyan-500/10 hover:bg-cyan-500/5 transition">
                                    <td className="p-3 text-white">{service.id}</td>
                                    <td className="p-3">
                                        <i className={`fas ${service.icon || 'fa-tools'} text-cyan-500 text-xl`}></i>
                                    </td>
                                    <td className="p-3 text-white font-medium">{service.title}</td>
                                    <td className="p-3 text-gray-300">{service.price_tag || '-'}</td>
                                    <td className="p-3">
                                        <span className={`px-2 py-1 rounded-full text-xs ${service.is_active ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                                            {service.is_active ? 'Active' : 'Inactive'}
                                        </span>
                                    </td>
                                    <td className="p-3">
                                        <button 
                                            onClick={() => { 
                                                setModal(service); 
                                                setFormData({
                                                    title: service.title || '',
                                                    short_description: service.short_description || '',
                                                    long_description: service.long_description || '',
                                                    icon: service.icon || 'fa-home',
                                                    price_tag: service.price_tag || '',
                                                    is_active: service.is_active,
                                                    order: service.order || 0
                                                });
                                            }} 
                                            className="bg-cyan-500 text-navy-900 px-3 py-1 rounded-full text-sm mr-2 hover:bg-cyan-400 transition"
                                        >
                                            Edit
                                        </button>
                                        <button 
                                            onClick={() => handleDelete(service.id)} 
                                            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-full text-sm transition"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Modal with Icon Dropdown */}
            {modal && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
                    <div className="bg-navy-800 rounded-2xl p-6 w-full max-w-md border border-cyan-500/20 max-h-[90vh] overflow-y-auto">
                        <h2 className="text-xl font-bold text-white mb-4">{modal.id ? 'Edit Service' : 'Add Service'}</h2>
                        
                        <input 
                            type="text" 
                            placeholder="Service Title *" 
                            value={formData.title} 
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })} 
                            className="w-full p-3 bg-navy-700 rounded-lg mb-3 text-white border border-cyan-500/20 focus:border-cyan-500 outline-none" 
                        />
                        
                        <textarea 
                            placeholder="Short Description *" 
                            value={formData.short_description} 
                            onChange={(e) => setFormData({ ...formData, short_description: e.target.value })} 
                            className="w-full p-3 bg-navy-700 rounded-lg mb-3 text-white border border-cyan-500/20 focus:border-cyan-500 outline-none" 
                            rows="2"
                        ></textarea>
                        
                        <textarea 
                            placeholder="Long Description (Optional)" 
                            value={formData.long_description} 
                            onChange={(e) => setFormData({ ...formData, long_description: e.target.value })} 
                            className="w-full p-3 bg-navy-700 rounded-lg mb-3 text-white border border-cyan-500/20 focus:border-cyan-500 outline-none" 
                            rows="3"
                        ></textarea>
                        
                        {/* 🔥 Icon Dropdown with Preview */}
                        <div className="mb-3">
                            <label className="block text-gray-400 text-sm mb-2">Select Icon *</label>
                            <div className="flex gap-3 items-center">
                                <div className="flex-1">
                                    <select 
                                        value={formData.icon} 
                                        onChange={(e) => setFormData({ ...formData, icon: e.target.value })} 
                                        className="w-full p-3 bg-navy-700 rounded-lg text-white border border-cyan-500/20 focus:border-cyan-500 outline-none"
                                    >
                                        {fontAwesomeIcons.map((icon) => (
                                            <option key={icon.value} value={icon.value}>
                                                {icon.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="w-14 h-14 bg-navy-700 rounded-lg flex items-center justify-center border border-cyan-500/20">
                                    <i className={`fas ${formData.icon} text-cyan-500 text-2xl`}></i>
                                </div>
                            </div>
                            <p className="text-gray-500 text-xs mt-1">Preview: Your icon will look like this →</p>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-3 mb-3">
                            <input 
                                type="text" 
                                placeholder="Price Tag (Starting $99)" 
                                value={formData.price_tag} 
                                onChange={(e) => setFormData({ ...formData, price_tag: e.target.value })} 
                                className="w-full p-3 bg-navy-700 rounded-lg text-white border border-cyan-500/20 focus:border-cyan-500 outline-none" 
                            />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-3 mb-3">
                            <select 
                                value={formData.is_active} 
                                onChange={(e) => setFormData({ ...formData, is_active: parseInt(e.target.value) })} 
                                className="w-full p-3 bg-navy-700 rounded-lg text-white border border-cyan-500/20 focus:border-cyan-500 outline-none"
                            >
                                <option value={1}>Active</option>
                                <option value={0}>Inactive</option>
                            </select>
                            <input 
                                type="number" 
                                placeholder="Order" 
                                value={formData.order} 
                                onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })} 
                                className="w-full p-3 bg-navy-700 rounded-lg text-white border border-cyan-500/20 focus:border-cyan-500 outline-none" 
                            />
                        </div>
                        
                        <div className="flex gap-3 mt-4">
                            <button 
                                onClick={handleSave} 
                                disabled={saving}
                                className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-navy-900 px-4 py-2 rounded-full font-bold transition disabled:opacity-50"
                            >
                                {saving ? 'Saving...' : (modal.id ? 'Update Service' : 'Create Service')}
                            </button>
                            <button 
                                onClick={() => setModal(null)} 
                                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-full font-bold transition"
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

export default ServicesAdmin;