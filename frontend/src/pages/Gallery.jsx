import React, { useState, useEffect } from 'react';
import { getGalleries } from '../services/api';

const Gallery = () => {
    const [galleries, setGalleries] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log('Gallery page loaded - fetching data...');
        getGalleries()
            .then(res => {
                console.log('Galleries received:', res.data.length, 'items');
                setGalleries(res.data);
            })
            .catch(err => {
                console.error('Gallery fetch error:', err);
            })
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return <div className="text-center py-20 text-cyan-500">Loading Gallery...</div>;
    }

    return (
        <div className="py-20">
            <div className="container-custom">
                <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">Our <span className="text-cyan-500">Projects</span></h1>
                <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">See some of our recent junk removal projects</p>

                {galleries.length === 0 ? (
                    <div className="text-center text-gray-400">No gallery items found. Please check backend.</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {galleries.map((gallery, i) => (
                            <div key={gallery.id} className="group relative overflow-hidden rounded-2xl cursor-pointer">
                                <img src={gallery.image_path} alt={gallery.title} className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-110" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-end p-6">
                                    <div>
                                        <h3 className="text-xl font-bold text-white mb-1">{gallery.title}</h3>
                                        <p className="text-cyan-500">{gallery.category}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Gallery;