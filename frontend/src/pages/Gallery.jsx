import React, { useState, useEffect } from 'react';
import { getGalleries, API_BASE_URL } from '../services/api';

const Gallery = () => {
    const [galleries, setGalleries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

    // 🔥 Show toast notification
    const showToast = (message, type = 'success') => {
        setToast({ show: true, message, type });
        setTimeout(() => {
            setToast({ show: false, message: '', type: 'success' });
        }, 3000);
    };

    useEffect(() => {
        const cachedGalleries = sessionStorage.getItem('galleriesData');
        
        if (cachedGalleries) {
            const parsedGalleries = JSON.parse(cachedGalleries);
            setGalleries(parsedGalleries);
            setLoading(false);
            console.log('Galleries loaded from cache:', parsedGalleries.length);
            fetchGalleriesInBackground();
        } else {
            fetchGalleries();
        }
    }, []);

    const fetchGalleries = async () => {
        try {
            console.log('Fetching galleries from API...');
            const res = await getGalleries();
            console.log('Galleries received:', res.data);
            
            let data = [];
            if (Array.isArray(res.data)) {
                data = res.data;
            } else if (res.data && res.data.success && Array.isArray(res.data.data)) {
                data = res.data.data;
            } else if (res.data && Array.isArray(res.data.data)) {
                data = res.data.data;
            }
            
            console.log('Processed galleries:', data.length);
            setGalleries(data);
            sessionStorage.setItem('galleriesData', JSON.stringify(data));
            showToast('Gallery loaded successfully!', 'success');
        } catch (err) {
            console.error('Gallery fetch error:', err);
            setGalleries([]);
            showToast('Failed to load gallery. Please refresh.', 'error');
        } finally {
            setLoading(false);
        }
    };
    
    const fetchGalleriesInBackground = async () => {
        try {
            const res = await getGalleries();
            let data = [];
            if (Array.isArray(res.data)) {
                data = res.data;
            } else if (res.data && res.data.success && Array.isArray(res.data.data)) {
                data = res.data.data;
            } else if (res.data && Array.isArray(res.data.data)) {
                data = res.data.data;
            }
            sessionStorage.setItem('galleriesData', JSON.stringify(data));
            console.log('Galleries cache updated in background');
        } catch (err) {
            console.error('Background fetch error:', err);
        }
    };

    const getImageUrl = (path) => {
        if (!path) {
            return 'https://placehold.co/600x400/1a2a3a/00d4ff?text=No+Image';
        }
        
        if (path.startsWith('http')) {
            return path;
        }
        
        const backendUrl = API_BASE_URL.replace('/api', '');
        
        if (path.startsWith('/storage')) {
            return `${backendUrl}${path}`;
        }
        
        if (path.startsWith('/')) {
            return `${backendUrl}${path}`;
        }
        
        if (path.startsWith('storage')) {
            return `${backendUrl}/${path}`;
        }
        
        return `${backendUrl}/storage/${path}`;
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-cyan-500 text-lg">Loading Gallery...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="py-20">
            <div className="container-custom">
                <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
                    Our <span className="text-cyan-500">Projects</span>
                </h1>
                <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
                    See some of our recent junk removal projects
                </p>

                {galleries.length === 0 ? (
                    <div className="text-center py-12">
                        <i className="fas fa-images text-6xl text-gray-600 mb-4"></i>
                        <p className="text-gray-400">No gallery items found. Please check backend.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {galleries.map((gallery) => {
                            const imageUrl = getImageUrl(gallery.image_path);
                            return (
                                <div key={gallery.id} className="group relative overflow-hidden rounded-2xl cursor-pointer bg-navy-800/30 transition-transform duration-300 hover:scale-[1.02]">
                                    <img 
                                        src={imageUrl} 
                                        alt={gallery.title} 
                                        className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-110"
                                        loading="lazy"
                                        onError={(e) => {
                                            console.error('Image load error for:', gallery.image_path);
                                            e.target.src = 'https://placehold.co/600x400/1a2a3a/00d4ff?text=Image+Not+Found';
                                        }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-end p-6">
                                        <div>
                                            <h3 className="text-xl font-bold text-white mb-1">{gallery.title}</h3>
                                            <p className="text-cyan-500">{gallery.category}</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* 🔥 Toast Notification - Bottom Right Side */}
            {toast.show && (
                <div className="fixed bottom-6 right-6 z-50 animate-slide-up">
                    <div className={`rounded-2xl shadow-2xl px-5 py-4 min-w-[320px] max-w-md flex items-center gap-3 backdrop-blur-sm ${
                        toast.type === 'success' 
                            ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white' 
                            : 'bg-gradient-to-r from-rose-500 to-red-500 text-white'
                    }`}>
                        <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white/20">
                            <i className={`fas ${toast.type === 'success' ? 'fa-check' : 'fa-exclamation'} text-xl`}></i>
                        </div>
                        <div className="flex-1">
                            <p className="font-semibold text-sm">{toast.type === 'success' ? 'Success!' : 'Error!'}</p>
                            <p className="text-xs opacity-90">{toast.message}</p>
                        </div>
                        <button 
                            onClick={() => setToast({ show: false, message: '', type: 'success' })}
                            className="text-white/70 hover:text-white transition"
                        >
                            <i className="fas fa-times"></i>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Gallery;