// src/pages/admin/HeroSettingsAdmin.jsx
import React, { useState, useEffect } from 'react';
import api from '../../services/api';

const HeroSettingsAdmin = () => {
    const [hero, setHero] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [formData, setFormData] = useState({
        badge_text: '',
        heading_line1: '',
        heading_line2: '',
        description: '',
        button_text: '',
        button_link: '',
        stat1_text: '',
        stat2_text: '',
        stat3_text: '',
        hero_image: '',
        is_active: 1
    });

    useEffect(() => {
        fetchHeroSettings();
    }, []);

    const fetchHeroSettings = async () => {
        try {
            const res = await api.get('/hero');
            console.log('Hero settings:', res.data);
            setHero(res.data);
            setFormData({
                badge_text: res.data.badge_text || '',
                heading_line1: res.data.heading_line1 || '',
                heading_line2: res.data.heading_line2 || '',
                description: res.data.description || '',
                button_text: res.data.button_text || '',
                button_link: res.data.button_link || '',
                stat1_text: res.data.stat1_text || '',
                stat2_text: res.data.stat2_text || '',
                stat3_text: res.data.stat3_text || '',
                hero_image: res.data.hero_image || '',
                is_active: res.data.is_active || 1
            });
        } catch (error) {
            console.error('Error fetching hero settings:', error);
            alert('Failed to load hero settings');
        } finally {
            setLoading(false);
        }
    };

    // 🔥 Image Upload Handler
    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Validate file type
        if (!file.type.startsWith('image/')) {
            alert('Please select an image file (JPEG, PNG, GIF, WEBP)');
            return;
        }

        // Validate file size (max 5MB)
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
            
            const imageUrl = res.data.path;
            setFormData({ ...formData, hero_image: imageUrl });
            alert('Image uploaded successfully!');
        } catch (error) {
            console.error('Upload error:', error);
            alert('Failed to upload image: ' + (error.response?.data?.message || error.message));
        } finally {
            setUploading(false);
        }
    };

    const handleSave = async () => {
        if (!hero) {
            alert('No hero settings found');
            return;
        }
        
        setSaving(true);
        try {
            await api.put(`/admin/hero/${hero.id}`, formData);
            alert('Hero settings updated successfully!');
            fetchHeroSettings();
        } catch (error) {
            console.error('Save error:', error);
            alert('Error saving hero settings: ' + (error.response?.data?.message || error.message));
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-cyan-500">Loading hero settings...</p>
                </div>
            </div>
        );
    }

    if (!hero) {
        return (
            <div className="text-center py-12">
                <div className="bg-red-500/10 border border-red-500/50 rounded-2xl p-8 max-w-md mx-auto">
                    <i className="fas fa-exclamation-triangle text-red-500 text-5xl mb-4"></i>
                    <h3 className="text-red-400 text-xl font-bold mb-2">No Hero Settings Found</h3>
                    <p className="text-gray-400">Please run the migration first.</p>
                </div>
            </div>
        );
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-white">Hero Section Settings</h1>
                <button 
                    onClick={handleSave} 
                    disabled={saving}
                    className="bg-cyan-500 text-navy-900 px-6 py-2 rounded-full hover:bg-cyan-400 transition disabled:opacity-50 font-bold"
                >
                    {saving ? (
                        <>
                            <i className="fas fa-spinner fa-spin mr-2"></i>
                            Saving...
                        </>
                    ) : (
                        <>
                            <i className="fas fa-save mr-2"></i>
                            Save Changes
                        </>
                    )}
                </button>
            </div>

            <div className="bg-navy-800/60 rounded-2xl p-6 border border-cyan-500/20">
                <div className="grid grid-cols-1 gap-6">
                    {/* Badge Text */}
                    <div>
                        <label className="block text-gray-400 text-sm mb-2">Badge Text</label>
                        <input 
                            type="text" 
                            value={formData.badge_text} 
                            onChange={(e) => setFormData({...formData, badge_text: e.target.value})}
                            className="w-full p-3 bg-navy-700 rounded-lg text-white border border-cyan-500/20 focus:border-cyan-500 outline-none"
                            placeholder="e.g., Maplewood's Most Trusted | 12+ Years"
                        />
                        <p className="text-gray-500 text-xs mt-1">This appears above the main heading</p>
                    </div>

                    {/* Heading Line 1 */}
                    <div>
                        <label className="block text-gray-400 text-sm mb-2">Heading Line 1</label>
                        <input 
                            type="text" 
                            value={formData.heading_line1} 
                            onChange={(e) => setFormData({...formData, heading_line1: e.target.value})}
                            className="w-full p-3 bg-navy-700 rounded-lg text-white border border-cyan-500/20 focus:border-cyan-500 outline-none"
                            placeholder="e.g., Clear Your Space."
                        />
                    </div>

                    {/* Heading Line 2 */}
                    <div>
                        <label className="block text-gray-400 text-sm mb-2">Heading Line 2</label>
                        <input 
                            type="text" 
                            value={formData.heading_line2} 
                            onChange={(e) => setFormData({...formData, heading_line2: e.target.value})}
                            className="w-full p-3 bg-navy-700 rounded-lg text-white border border-cyan-500/20 focus:border-cyan-500 outline-none"
                            placeholder="e.g., Fast. Fair. Green."
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-gray-400 text-sm mb-2">Description</label>
                        <textarea 
                            rows="3" 
                            value={formData.description} 
                            onChange={(e) => setFormData({...formData, description: e.target.value})}
                            className="w-full p-3 bg-navy-700 rounded-lg text-white border border-cyan-500/20 focus:border-cyan-500 outline-none"
                            placeholder="Enter description text..."
                        ></textarea>
                    </div>

                    {/* Button Text & Link */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-400 text-sm mb-2">Button Text</label>
                            <input 
                                type="text" 
                                value={formData.button_text} 
                                onChange={(e) => setFormData({...formData, button_text: e.target.value})}
                                className="w-full p-3 bg-navy-700 rounded-lg text-white border border-cyan-500/20 focus:border-cyan-500 outline-none"
                                placeholder="e.g., Get Free Estimate →"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-400 text-sm mb-2">Button Link</label>
                            <input 
                                type="text" 
                                value={formData.button_link} 
                                onChange={(e) => setFormData({...formData, button_link: e.target.value})}
                                className="w-full p-3 bg-navy-700 rounded-lg text-white border border-cyan-500/20 focus:border-cyan-500 outline-none"
                                placeholder="e.g., /contact"
                            />
                            <p className="text-gray-500 text-xs mt-1">Internal page link (e.g., /contact, /services)</p>
                        </div>
                    </div>

                    {/* Statistics - 3 columns */}
                    <div>
                        <label className="block text-gray-400 text-sm mb-2">Statistics (3 items)</label>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <input 
                                type="text" 
                                placeholder="Stat 1 (e.g., 3500+ projects)" 
                                value={formData.stat1_text} 
                                onChange={(e) => setFormData({...formData, stat1_text: e.target.value})}
                                className="w-full p-3 bg-navy-700 rounded-lg text-white border border-cyan-500/20 focus:border-cyan-500 outline-none"
                            />
                            <input 
                                type="text" 
                                placeholder="Stat 2 (e.g., 95% recycled)" 
                                value={formData.stat2_text} 
                                onChange={(e) => setFormData({...formData, stat2_text: e.target.value})}
                                className="w-full p-3 bg-navy-700 rounded-lg text-white border border-cyan-500/20 focus:border-cyan-500 outline-none"
                            />
                            <input 
                                type="text" 
                                placeholder="Stat 3 (e.g., 5.0 stars (412 reviews))" 
                                value={formData.stat3_text} 
                                onChange={(e) => setFormData({...formData, stat3_text: e.target.value})}
                                className="w-full p-3 bg-navy-700 rounded-lg text-white border border-cyan-500/20 focus:border-cyan-500 outline-none"
                            />
                        </div>
                    </div>

                    {/* 🔥 Hero Image with Upload */}
                    <div>
                        <label className="block text-gray-400 text-sm mb-2">Hero Image</label>
                        
                        {/* Upload Button */}
                        <div className="flex gap-3 mb-3">
                            <label className="cursor-pointer bg-cyan-500 hover:bg-cyan-600 text-navy-900 px-4 py-2 rounded-lg font-bold transition">
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
                                value={formData.hero_image} 
                                onChange={(e) => setFormData({...formData, hero_image: e.target.value})}
                                className="flex-1 p-3 bg-navy-700 rounded-lg text-white border border-cyan-500/20 focus:border-cyan-500 outline-none"
                                placeholder="Or enter image URL directly"
                            />
                        </div>
                        
                        {/* Image Preview */}
                        {formData.hero_image && (
                            <div className="mt-3">
                                <p className="text-gray-400 text-sm mb-2">Image Preview:</p>
                                <div className="relative inline-block">
                                    <img 
                                        src={formData.hero_image} 
                                        alt="Hero Preview" 
                                        className="w-48 h-32 object-cover rounded-lg border border-cyan-500/20"
                                        onError={(e) => { 
                                            e.target.src = 'https://placehold.co/400x300/1a2a3a/00d4ff?text=Invalid+URL'; 
                                        }}
                                    />
                                    <button
                                        onClick={() => setFormData({...formData, hero_image: ''})}
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

                    {/* Status */}
                    <div>
                        <label className="block text-gray-400 text-sm mb-2">Status</label>
                        <select 
                            value={formData.is_active} 
                            onChange={(e) => setFormData({...formData, is_active: parseInt(e.target.value)})}
                            className="w-full p-3 bg-navy-700 rounded-lg text-white border border-cyan-500/20 focus:border-cyan-500 outline-none"
                        >
                            <option value={1}>Active - Show on Website</option>
                            <option value={0}>Inactive - Hide from Website</option>
                        </select>
                    </div>
                </div>

                {/* Live Preview Section */}
                <div className="mt-8 pt-6 border-t border-cyan-500/20">
                    <h3 className="text-lg font-bold text-white mb-4">Live Preview</h3>
                    <div className="bg-navy-900/50 rounded-xl p-6">
                        <div className="inline-block bg-cyan-500/20 border border-cyan-500/30 rounded-full px-4 py-1 text-cyan-500 text-sm mb-4">
                            {formData.badge_text || 'Badge Text'}
                        </div>
                        <h2 className="text-3xl font-bold text-white mb-2">
                            {formData.heading_line1 || 'Heading Line 1'}<br />
                            {formData.heading_line2 || 'Heading Line 2'}
                        </h2>
                        <p className="text-gray-300 mb-4">{formData.description || 'Description text will appear here...'}</p>
                        <div className="inline-block bg-cyan-500 text-navy-900 px-6 py-2 rounded-full font-bold">
                            {formData.button_text || 'Button Text'}
                        </div>
                        <div className="flex flex-wrap gap-4 mt-4">
                            <div className="bg-white/5 rounded-full px-4 py-2 text-sm">{formData.stat1_text || 'Stat 1'}</div>
                            <div className="bg-white/5 rounded-full px-4 py-2 text-sm">{formData.stat2_text || 'Stat 2'}</div>
                            <div className="bg-white/5 rounded-full px-4 py-2 text-sm">{formData.stat3_text || 'Stat 3'}</div>
                        </div>
                        {formData.hero_image && (
                            <div className="mt-4">
                                <img 
                                    src={formData.hero_image} 
                                    alt="Preview" 
                                    className="w-64 h-40 object-cover rounded-lg"
                                    onError={(e) => { e.target.style.display = 'none'; }}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroSettingsAdmin;