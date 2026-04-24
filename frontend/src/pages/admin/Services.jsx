import React, { useState, useEffect } from 'react';
import api from '../../services/api';

const Services = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modal, setModal] = useState(null);
    const [formData, setFormData] = useState({ title: '', short_description: '', icon: 'fa-tools', price_tag: '' });

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        try {
            const res = await api.get('/admin/services');
            setServices(res.data);
        } catch (error) {
            console.error(error);
        }
        setLoading(false);
    };

    const handleSave = async () => {
        try {
            if (modal?.id) {
                await api.put(`/admin/services/${modal.id}`, formData);
            } else {
                await api.post('/admin/services', formData);
            }
            fetchServices();
            setModal(null);
            setFormData({ title: '', short_description: '', icon: 'fa-tools', price_tag: '' });
        } catch (error) {
            alert('Error saving service');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure?')) {
            await api.delete(`/admin/services/${id}`);
            fetchServices();
        }
    };

    if (loading) return <div className="text-center text-cyan-500 py-20">Loading...</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-white">Services</h1>
                <button onClick={() => setModal({})} className="bg-cyan-500 text-navy-900 px-4 py-2 rounded-full">+ Add Service</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((service) => (
                    <div key={service.id} className="bg-navy-800/60 rounded-2xl p-6 border border-cyan-500/20">
                        <i className={`fas ${service.icon} text-3xl text-cyan-500 mb-3`}></i>
                        <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
                        <p className="text-gray-300 text-sm mb-2">{service.short_description}</p>
                        {service.price_tag && <p className="text-cyan-500 font-bold">{service.price_tag}</p>}
                        <div className="flex gap-2 mt-4">
                            <button onClick={() => { setModal(service); setFormData(service); }} className="bg-cyan-500 text-navy-900 px-3 py-1 rounded-full text-sm">Edit</button>
                            <button onClick={() => handleDelete(service.id)} className="bg-red-600 text-white px-3 py-1 rounded-full text-sm">Delete</button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {modal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-navy-800 rounded-2xl p-6 w-full max-w-md border border-cyan-500/20">
                        <h2 className="text-xl font-bold text-white mb-4">{modal.id ? 'Edit Service' : 'Add Service'}</h2>
                        <input type="text" placeholder="Title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="w-full p-3 bg-navy-700 rounded-lg mb-3 text-white" />
                        <textarea placeholder="Short Description" value={formData.short_description} onChange={(e) => setFormData({ ...formData, short_description: e.target.value })} className="w-full p-3 bg-navy-700 rounded-lg mb-3 text-white" rows="3"></textarea>
                        <input type="text" placeholder="Icon (fa-home, fa-truck, etc)" value={formData.icon} onChange={(e) => setFormData({ ...formData, icon: e.target.value })} className="w-full p-3 bg-navy-700 rounded-lg mb-3 text-white" />
                        <input type="text" placeholder="Price Tag (optional)" value={formData.price_tag || ''} onChange={(e) => setFormData({ ...formData, price_tag: e.target.value })} className="w-full p-3 bg-navy-700 rounded-lg mb-3 text-white" />
                        <div className="flex gap-3">
                            <button onClick={handleSave} className="bg-cyan-500 text-navy-900 px-4 py-2 rounded-full">Save</button>
                            <button onClick={() => { setModal(null); setFormData({ title: '', short_description: '', icon: 'fa-tools', price_tag: '' }); }} className="bg-gray-600 text-white px-4 py-2 rounded-full">Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Services;