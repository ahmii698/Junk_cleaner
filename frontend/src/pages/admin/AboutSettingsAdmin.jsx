// src/pages/admin/AboutSettingsAdmin.jsx
import React, { useState, useEffect } from 'react';
import api from '../../services/api';

const AboutSettingsAdmin = () => {
    const [about, setAbout] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [formData, setFormData] = useState({
        heading: '', highlight_word: '', paragraph1: '', paragraph2: '', about_image: '',
        stat1_number: '', stat1_label: '', stat2_number: '', stat2_label: '',
        stat3_number: '', stat3_label: '',
        card1_icon: '', card1_title: '', card1_desc: '',
        card2_icon: '', card2_title: '', card2_desc: '',
        card3_icon: '', card3_title: '', card3_desc: '',
        button_text: '', button_link: '', is_active: 1
    });

    useEffect(() => {
        fetchAboutSettings();
    }, []);

    const fetchAboutSettings = async () => {
        try {
            const res = await api.get('/about');
            setAbout(res.data);
            setFormData({
                heading: res.data.heading || '',
                highlight_word: res.data.highlight_word || '',
                paragraph1: res.data.paragraph1 || '',
                paragraph2: res.data.paragraph2 || '',
                about_image: res.data.about_image || '',
                stat1_number: res.data.stat1_number || '',
                stat1_label: res.data.stat1_label || '',
                stat2_number: res.data.stat2_number || '',
                stat2_label: res.data.stat2_label || '',
                stat3_number: res.data.stat3_number || '',
                stat3_label: res.data.stat3_label || '',
                card1_icon: res.data.card1_icon || 'fa-truck',
                card1_title: res.data.card1_title || '',
                card1_desc: res.data.card1_desc || '',
                card2_icon: res.data.card2_icon || 'fa-leaf',
                card2_title: res.data.card2_title || '',
                card2_desc: res.data.card2_desc || '',
                card3_icon: res.data.card3_icon || 'fa-clock',
                card3_title: res.data.card3_title || '',
                card3_desc: res.data.card3_desc || '',
                button_text: res.data.button_text || '',
                button_link: res.data.button_link || '',
                is_active: res.data.is_active || 1
            });
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            alert('Please select an image file');
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
            setFormData({ ...formData, about_image: res.data.path });
            alert('Image uploaded successfully!');
        } catch (error) {
            alert('Failed to upload image');
        } finally {
            setUploading(false);
        }
    };

    const handleSave = async () => {
        if (!about) return;
        setSaving(true);
        try {
            await api.put(`/admin/about/${about.id}`, formData);
            alert('About settings updated successfully!');
            fetchAboutSettings();
        } catch (error) {
            alert('Error saving settings');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="text-center text-cyan-500 py-20">Loading...</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-white">About Us Section</h1>
                <button onClick={handleSave} disabled={saving} className="bg-cyan-500 text-navy-900 px-6 py-2 rounded-full hover:bg-cyan-400 transition disabled:opacity-50">
                    {saving ? 'Saving...' : 'Save Changes'}
                </button>
            </div>

            <div className="bg-navy-800/60 rounded-2xl p-6 border border-cyan-500/20 space-y-6">
                {/* Heading Section */}
                <div className="grid grid-cols-2 gap-4">
                    <div><label className="text-gray-400 text-sm">Heading</label><input type="text" value={formData.heading} onChange={(e) => setFormData({...formData, heading: e.target.value})} className="w-full p-3 bg-navy-700 rounded-lg text-white" /></div>
                    <div><label className="text-gray-400 text-sm">Highlight Word</label><input type="text" value={formData.highlight_word} onChange={(e) => setFormData({...formData, highlight_word: e.target.value})} className="w-full p-3 bg-navy-700 rounded-lg text-white" /></div>
                </div>

                {/* Paragraphs */}
                <div><label className="text-gray-400 text-sm">Paragraph 1</label><textarea rows="3" value={formData.paragraph1} onChange={(e) => setFormData({...formData, paragraph1: e.target.value})} className="w-full p-3 bg-navy-700 rounded-lg text-white" /></div>
                <div><label className="text-gray-400 text-sm">Paragraph 2</label><textarea rows="3" value={formData.paragraph2} onChange={(e) => setFormData({...formData, paragraph2: e.target.value})} className="w-full p-3 bg-navy-700 rounded-lg text-white" /></div>

                {/* Image */}
                <div><label className="text-gray-400 text-sm">About Image</label><div className="flex gap-3"><label className="cursor-pointer bg-cyan-500 px-4 py-2 rounded-lg">{uploading ? 'Uploading...' : 'Choose Image'}<input type="file" hidden accept="image/*" onChange={handleImageUpload} disabled={uploading} /></label><input type="text" value={formData.about_image} onChange={(e) => setFormData({...formData, about_image: e.target.value})} className="flex-1 p-3 bg-navy-700 rounded-lg text-white" /></div>
                {formData.about_image && <img src={`http://localhost:8000${formData.about_image}`} alt="Preview" className="mt-2 w-32 h-32 object-cover rounded-lg" onError={(e) => e.target.src='https://placehold.co/400x300/1a2a3a/00d4ff?text=No+Image'} />}</div>

                {/* Statistics */}
                <div className="grid grid-cols-3 gap-4"><div><label>Stat 1 Number</label><input type="text" value={formData.stat1_number} onChange={(e) => setFormData({...formData, stat1_number: e.target.value})} className="w-full p-3 bg-navy-700 rounded-lg text-white" /><label>Stat 1 Label</label><input type="text" value={formData.stat1_label} onChange={(e) => setFormData({...formData, stat1_label: e.target.value})} className="w-full p-3 bg-navy-700 rounded-lg text-white" /></div>
                <div><label>Stat 2 Number</label><input type="text" value={formData.stat2_number} onChange={(e) => setFormData({...formData, stat2_number: e.target.value})} className="w-full p-3 bg-navy-700 rounded-lg text-white" /><label>Stat 2 Label</label><input type="text" value={formData.stat2_label} onChange={(e) => setFormData({...formData, stat2_label: e.target.value})} className="w-full p-3 bg-navy-700 rounded-lg text-white" /></div>
                <div><label>Stat 3 Number</label><input type="text" value={formData.stat3_number} onChange={(e) => setFormData({...formData, stat3_number: e.target.value})} className="w-full p-3 bg-navy-700 rounded-lg text-white" /><label>Stat 3 Label</label><input type="text" value={formData.stat3_label} onChange={(e) => setFormData({...formData, stat3_label: e.target.value})} className="w-full p-3 bg-navy-700 rounded-lg text-white" /></div></div>

                {/* Cards */}
                {[1,2,3].map(num => (<div key={num} className="p-4 bg-navy-700/30 rounded-lg"><h3 className="text-cyan-500 font-bold">Card {num}</h3><div className="grid grid-cols-3 gap-3"><input type="text" placeholder="Icon" value={formData[`card${num}_icon`]} onChange={(e) => setFormData({...formData, [`card${num}_icon`]: e.target.value})} className="p-2 bg-navy-700 rounded text-white" /><input type="text" placeholder="Title" value={formData[`card${num}_title`]} onChange={(e) => setFormData({...formData, [`card${num}_title`]: e.target.value})} className="p-2 bg-navy-700 rounded text-white" /><input type="text" placeholder="Description" value={formData[`card${num}_desc`]} onChange={(e) => setFormData({...formData, [`card${num}_desc`]: e.target.value})} className="p-2 bg-navy-700 rounded text-white" /></div></div>))}

                {/* Button */}
                <div className="grid grid-cols-2 gap-4"><div><label>Button Text</label><input type="text" value={formData.button_text} onChange={(e) => setFormData({...formData, button_text: e.target.value})} className="w-full p-3 bg-navy-700 rounded-lg text-white" /></div><div><label>Button Link</label><input type="text" value={formData.button_link} onChange={(e) => setFormData({...formData, button_link: e.target.value})} className="w-full p-3 bg-navy-700 rounded-lg text-white" /></div></div>

                {/* Status */}
                <select value={formData.is_active} onChange={(e) => setFormData({...formData, is_active: parseInt(e.target.value)})} className="w-full p-3 bg-navy-700 rounded-lg text-white"><option value={1}>Active</option><option value={0}>Inactive</option></select>
            </div>
        </div>
    );
};

export default AboutSettingsAdmin;