// src/pages/admin/GalleriesAdmin.jsx
import React, { useState, useEffect } from 'react';
import api from '../../services/api';

const API_BASE = 'http://localhost:8000'; // 🔥 ADD THIS

const GalleriesAdmin = () => {
    const [galleries, setGalleries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modal, setModal] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [formData, setFormData] = useState({ 
        title: '', 
        category: '', 
        image_path: '', 
        order: 0, 
        is_active: 1 
    });

    useEffect(() => {
        fetchGalleries();
    }, []);

    const fetchGalleries = async () => {
        try {
            const res = await api.get('/admin/galleries');
            let data = [];
            if (res.data && res.data.success && Array.isArray(res.data.data)) data = res.data.data;
            else if (Array.isArray(res.data)) data = res.data;
            setGalleries(data);
        } catch (error) { console.error(error); }
        setLoading(false);
    };

    // 🔥 Get full image URL
    const getFullImageUrl = (path) => {
        if (!path) return 'https://placehold.co/400x300/1a2a3a/00d4ff?text=No+Image';
        if (path.startsWith('http')) return path;
        if (path.startsWith('/storage')) return `${API_BASE}${path}`;
        if (path.startsWith('/')) return `${API_BASE}${path}`;
        return `${API_BASE}/storage/${path}`;
    };

    // 🔥 Image Upload Handler
    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            alert('Please select an image file (JPEG, PNG, GIF, WEBP)');
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            alert('Image size should be less than 5MB');
            return;
        }

        setUploading(true);
        const uploadFormData = new FormData();
        uploadFormData.append('image', file);

        try {
            const res = await api.post('/upload-image', uploadFormData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            console.log('Upload response:', res.data);
            
            let imageUrl = '';
            if (res.data.path) {
                imageUrl = res.data.path;
            }
            
            console.log('Final image URL to save:', imageUrl);
            setFormData({ ...formData, image_path: imageUrl });
            alert('Image uploaded successfully!');
        } catch (error) {
            console.error('Upload error:', error);
            alert('Failed to upload image: ' + (error.response?.data?.message || error.message));
        } finally {
            setUploading(false);
        }
    };

    const handleSave = async () => {
        if (!formData.title.trim()) {
            alert('Please enter title');
            return;
        }
        if (!formData.category.trim()) {
            alert('Please enter category');
            return;
        }
        if (!formData.image_path.trim()) {
            alert('Please select/upload an image');
            return;
        }
        
        try {
            if (modal?.id) {
                await api.put(`/admin/galleries/${modal.id}`, formData);
                alert('Gallery updated successfully!');
            } else {
                await api.post('/admin/galleries', formData);
                alert('Gallery added successfully!');
            }
            fetchGalleries();
            setModal(null);
            setFormData({ title: '', category: '', image_path: '', order: 0, is_active: 1 });
        } catch (error) { 
            console.error('Save error:', error);
            alert('Error saving gallery: ' + (error.response?.data?.message || error.message)); 
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this image?')) {
            try {
                await api.delete(`/admin/galleries/${id}`);
                alert('Gallery deleted successfully!');
                fetchGalleries();
            } catch (error) {
                console.error('Delete error:', error);
                alert('Failed to delete gallery');
            }
        }
    };

    if (loading) return <div className="text-center text-cyan-500 py-20">Loading...</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-white">Gallery</h1>
                <button 
                    onClick={() => {
                        setModal({});
                        setFormData({ title: '', category: '', image_path: '', order: galleries.length + 1, is_active: 1 });
                    }} 
                    className="bg-cyan-500 text-navy-900 px-4 py-2 rounded-full hover:bg-cyan-400 transition"
                >
                    + Add Image
                </button>
            </div>

            {galleries.length === 0 ? (
                <div className="text-center py-12 bg-navy-800/60 rounded-2xl border border-cyan-500/20">
                    <i className="fas fa-images text-5xl text-gray-500 mb-4"></i>
                    <p className="text-gray-400">No gallery images found. Click "Add Image" to upload.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {galleries.map((gallery) => (
                        <div key={gallery.id} className="bg-navy-800/60 rounded-2xl overflow-hidden border border-cyan-500/20 hover:border-cyan-500 transition group">
                            <div className="relative h-48 overflow-hidden">
                                <img 
                                    src={getFullImageUrl(gallery.image_path)}  // 🔥 FIXED HERE
                                    alt={gallery.title} 
                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                    onError={(e) => {
                                        console.log('Image load error for:', gallery.image_path);
                                        e.target.src = 'https://placehold.co/400x300/1a2a3a/00d4ff?text=Image+Not+Found';
                                    }}
                                />
                            </div>
                            <div className="p-4">
                                <h3 className="text-white font-bold text-lg">{gallery.title}</h3>
                                <p className="text-cyan-500 text-sm mb-2">{gallery.category}</p>
                                <div className="flex justify-between items-center mt-3">
                                    <span className={`text-xs px-2 py-1 rounded-full ${gallery.is_active ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                                        {gallery.is_active ? 'Active' : 'Inactive'}
                                    </span>
                                    <div className="flex gap-2">
                                        <button 
                                            onClick={() => { 
                                                setModal(gallery); 
                                                setFormData({
                                                    title: gallery.title || '',
                                                    category: gallery.category || '',
                                                    image_path: gallery.image_path || '',
                                                    order: gallery.order || 0,
                                                    is_active: gallery.is_active
                                                });
                                            }} 
                                            className="bg-cyan-500 text-navy-900 px-3 py-1 rounded-full text-sm hover:bg-cyan-400 transition"
                                        >
                                            Edit
                                        </button>
                                        <button 
                                            onClick={() => handleDelete(gallery.id)} 
                                            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-full text-sm transition"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Modal with Image Upload */}
            {modal && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
                    <div className="bg-navy-800 rounded-2xl p-6 w-full max-w-md border border-cyan-500/20 max-h-[90vh] overflow-y-auto">
                        <h2 className="text-xl font-bold text-white mb-4">{modal.id ? 'Edit Gallery' : 'Add Gallery'}</h2>
                        
                        <input 
                            type="text" 
                            placeholder="Title *" 
                            value={formData.title} 
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })} 
                            className="w-full p-3 bg-navy-700 rounded-lg mb-3 text-white border border-cyan-500/20 focus:border-cyan-500 outline-none" 
                        />
                        
                        <input 
                            type="text" 
                            placeholder="Category * (e.g., Residential, Commercial, Demolition)" 
                            value={formData.category} 
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })} 
                            className="w-full p-3 bg-navy-700 rounded-lg mb-3 text-white border border-cyan-500/20 focus:border-cyan-500 outline-none" 
                        />
                        
                        {/* Image Upload Section */}
                        <div className="mb-3">
                            <label className="block text-gray-400 text-sm mb-2">Image</label>
                            <div className="flex gap-3 mb-3">
                                <label className="cursor-pointer bg-cyan-500 hover:bg-cyan-600 text-navy-900 px-4 py-2 rounded-lg font-bold transition text-sm">
                                    <i className="fas fa-cloud-upload-alt mr-2"></i>
                                    {uploading ? 'Uploading...' : 'Choose Image from PC'}
                                    <input 
                                        type="file" 
                                        className="hidden" 
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        disabled={uploading}
                                    />
                                </label>
                                <input 
                                    type="text" 
                                    placeholder="Or enter image URL directly" 
                                    value={formData.image_path} 
                                    onChange={(e) => setFormData({ ...formData, image_path: e.target.value })} 
                                    className="flex-1 p-3 bg-navy-700 rounded-lg text-white border border-cyan-500/20 focus:border-cyan-500 outline-none text-sm" 
                                />
                            </div>
                            
                            {/* Image Preview */}
                            {formData.image_path && (
                                <div className="mt-2">
                                    <div className="relative inline-block w-full">
                                        <img 
                                            src={getFullImageUrl(formData.image_path)}  // 🔥 FIXED HERE
                                            alt="Preview" 
                                            className="w-full h-40 object-cover rounded-lg border border-cyan-500/20"
                                            onError={(e) => {
                                                e.target.src = 'https://placehold.co/400x300/1a2a3a/00d4ff?text=Invalid+URL';
                                            }}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setFormData({ ...formData, image_path: '' })}
                                            className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-700"
                                            title="Remove image"
                                        >
                                            <i className="fas fa-times"></i>
                                        </button>
                                    </div>
                                </div>
                            )}
                            <p className="text-gray-500 text-xs mt-1">Supported formats: JPEG, PNG, GIF, WEBP (Max 5MB)</p>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-3 mb-3">
                            <input 
                                type="number" 
                                placeholder="Order" 
                                value={formData.order} 
                                onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })} 
                                className="w-full p-3 bg-navy-700 rounded-lg text-white border border-cyan-500/20 focus:border-cyan-500 outline-none" 
                            />
                            <select 
                                value={formData.is_active} 
                                onChange={(e) => setFormData({ ...formData, is_active: parseInt(e.target.value) })} 
                                className="w-full p-3 bg-navy-700 rounded-lg text-white border border-cyan-500/20 focus:border-cyan-500 outline-none"
                            >
                                <option value={1}>Active</option>
                                <option value={0}>Inactive</option>
                            </select>
                        </div>
                        
                        <div className="flex gap-3 mt-4">
                            <button 
                                onClick={handleSave} 
                                className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-navy-900 px-4 py-2 rounded-full font-bold transition"
                            >
                                {modal.id ? 'Update Gallery' : 'Add Gallery'}
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

export default GalleriesAdmin;