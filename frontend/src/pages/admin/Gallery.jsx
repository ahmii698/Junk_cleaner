import React, { useState, useEffect } from 'react';
import api from '../../services/api';

const Gallery = () => {
    const [galleries, setGalleries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modal, setModal] = useState(null);
    const [formData, setFormData] = useState({ title: '', image_path: '', category: '' });

    useEffect(() => {
        fetchGalleries();
    }, []);

    const fetchGalleries = async () => {
        try {
            const res = await api.get('/admin/galleries');
            setGalleries(res.data);
        } catch (error) {
            console.error(error);
        }
        setLoading(false);
    };

    const handleSave = async () => {
        try {
            if (modal?.id) {
                await api.put(`/admin/galleries/${modal.id}`, formData);
            } else {
                await api.post('/admin/galleries', formData);
            }
            fetchGalleries();
            setModal(null);
            setFormData({ title: '', image_path: '', category: '' });
        } catch (error) {
            alert('Error saving gallery item');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure?')) {
            await api.delete(`/admin/galleries/${id}`);
            fetchGalleries();
        }
    };

    if (loading) return <div className="text-center text-cyan-500 py-20">Loading...</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-white">Gallery</h1>
                <button onClick={() => setModal({})} className="bg-cyan-500 text-navy-900 px-4 py-2 rounded-full">+ Add Image</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {galleries.map((gallery) => (
                    <div key={gallery.id} className="bg-navy-800/60 rounded-2xl overflow-hidden border border-cyan-500/20">
                        <img src={gallery.image_path} alt={gallery.title} className="w-full h-48 object-cover" />
                        <div className="p-4">
                            <h3 className="text-lg font-bold text-white">{gallery.title}</h3>
                            <p className="text-cyan-500 text-sm mb-2">{gallery.category}</p>
                            <div className="flex gap-2">
                                <button onClick={() => { setModal(gallery); setFormData(gallery); }} className="bg-cyan-500 text-navy-900 px-3 py-1 rounded-full text-sm">Edit</button>
                                <button onClick={() => handleDelete(gallery.id)} className="bg-red-600 text-white px-3 py-1 rounded-full text-sm">Delete</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {modal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-navy-800 rounded-2xl p-6 w-full max-w-md border border-cyan-500/20">
                        <h2 className="text-xl font-bold text-white mb-4">{modal.id ? 'Edit Gallery Item' : 'Add Gallery Item'}</h2>
                        <input type="text" placeholder="Title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="w-full p-3 bg-navy-700 rounded-lg mb-3 text-white" />
                        <input type="text" placeholder="Image Path (/images/example.jpg)" value={formData.image_path} onChange={(e) => setFormData({ ...formData, image_path: e.target.value })} className="w-full p-3 bg-navy-700 rounded-lg mb-3 text-white" />
                        <input type="text" placeholder="Category (Residential, Commercial, etc)" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="w-full p-3 bg-navy-700 rounded-lg mb-3 text-white" />
                        <div className="flex gap-3">
                            <button onClick={handleSave} className="bg-cyan-500 text-navy-900 px-4 py-2 rounded-full">Save</button>
                            <button onClick={() => { setModal(null); setFormData({ title: '', image_path: '', category: '' }); }} className="bg-gray-600 text-white px-4 py-2 rounded-full">Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Gallery;