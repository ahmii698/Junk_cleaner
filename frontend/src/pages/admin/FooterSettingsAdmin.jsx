// src/pages/admin/FooterSettingsAdmin.jsx
import React, { useState, useEffect } from 'react';
import api from '../../services/api';

const FooterSettingsAdmin = () => {
    const [footer, setFooter] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
        company_name: '',
        company_desc: '',
        facebook_url: '',
        instagram_url: '',
        twitter_url: '',
        copyright_text: '',
        license_text: '',
        phone: '',
        email: '',
        address: '',
        footer_bg: '',
        is_active: 1
    });

    useEffect(() => {
        fetchFooterSettings();
    }, []);

    const fetchFooterSettings = async () => {
        try {
            const res = await api.get('/footer');
            setFooter(res.data);
            setFormData({
                company_name: res.data.company_name || '',
                company_desc: res.data.company_desc || '',
                facebook_url: res.data.facebook_url || '',
                instagram_url: res.data.instagram_url || '',
                twitter_url: res.data.twitter_url || '',
                copyright_text: res.data.copyright_text || '',
                license_text: res.data.license_text || '',
                phone: res.data.phone || '',
                email: res.data.email || '',
                address: res.data.address || '',
                footer_bg: res.data.footer_bg || 'bg-navy-900/80',
                is_active: res.data.is_active || 1
            });
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        if (!footer) return;
        setSaving(true);
        try {
            await api.put(`/admin/footer/${footer.id}`, formData);
            alert('Footer settings updated successfully!');
            fetchFooterSettings();
        } catch (error) {
            alert('Error saving footer settings');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="text-center text-cyan-500 py-20">Loading...</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-white">Footer Settings</h1>
                <button onClick={handleSave} disabled={saving} className="bg-cyan-500 text-navy-900 px-6 py-2 rounded-full hover:bg-cyan-400 transition disabled:opacity-50">
                    {saving ? 'Saving...' : 'Save Changes'}
                </button>
            </div>

            <div className="bg-navy-800/60 rounded-2xl p-6 border border-cyan-500/20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Company Info */}
                    <div>
                        <label className="block text-gray-400 text-sm mb-2">Company Name</label>
                        <input type="text" value={formData.company_name} onChange={(e) => setFormData({...formData, company_name: e.target.value})} className="w-full p-3 bg-navy-700 rounded-lg text-white border border-cyan-500/20 focus:border-cyan-500 outline-none" />
                    </div>
                    <div>
                        <label className="block text-gray-400 text-sm mb-2">Background Class</label>
                        <input type="text" value={formData.footer_bg} onChange={(e) => setFormData({...formData, footer_bg: e.target.value})} className="w-full p-3 bg-navy-700 rounded-lg text-white border border-cyan-500/20 focus:border-cyan-500 outline-none" />
                        <p className="text-gray-500 text-xs mt-1">e.g., bg-navy-900/80, bg-gray-900</p>
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-gray-400 text-sm mb-2">Company Description</label>
                        <textarea rows="3" value={formData.company_desc} onChange={(e) => setFormData({...formData, company_desc: e.target.value})} className="w-full p-3 bg-navy-700 rounded-lg text-white border border-cyan-500/20 focus:border-cyan-500 outline-none"></textarea>
                    </div>
                </div>

                {/* Social Links */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                    <div><label className="block text-gray-400 text-sm mb-2">Facebook URL</label><input type="text" value={formData.facebook_url} onChange={(e) => setFormData({...formData, facebook_url: e.target.value})} className="w-full p-3 bg-navy-700 rounded-lg text-white" /></div>
                    <div><label className="block text-gray-400 text-sm mb-2">Instagram URL</label><input type="text" value={formData.instagram_url} onChange={(e) => setFormData({...formData, instagram_url: e.target.value})} className="w-full p-3 bg-navy-700 rounded-lg text-white" /></div>
                    <div><label className="block text-gray-400 text-sm mb-2">Twitter URL</label><input type="text" value={formData.twitter_url} onChange={(e) => setFormData({...formData, twitter_url: e.target.value})} className="w-full p-3 bg-navy-700 rounded-lg text-white" /></div>
                </div>

                {/* Contact Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    <div><label className="block text-gray-400 text-sm mb-2">Phone Number</label><input type="text" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full p-3 bg-navy-700 rounded-lg text-white" /></div>
                    <div><label className="block text-gray-400 text-sm mb-2">Email Address</label><input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full p-3 bg-navy-700 rounded-lg text-white" /></div>
                    <div className="md:col-span-2"><label className="block text-gray-400 text-sm mb-2">Address</label><input type="text" value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} className="w-full p-3 bg-navy-700 rounded-lg text-white" /></div>
                </div>

                {/* Copyright */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    <div><label className="block text-gray-400 text-sm mb-2">Copyright Text</label><input type="text" value={formData.copyright_text} onChange={(e) => setFormData({...formData, copyright_text: e.target.value})} className="w-full p-3 bg-navy-700 rounded-lg text-white" /></div>
                    <div><label className="block text-gray-400 text-sm mb-2">License Text</label><input type="text" value={formData.license_text} onChange={(e) => setFormData({...formData, license_text: e.target.value})} className="w-full p-3 bg-navy-700 rounded-lg text-white" /></div>
                </div>

                {/* Status */}
                <div className="mt-6">
                    <label className="block text-gray-400 text-sm mb-2">Status</label>
                    <select value={formData.is_active} onChange={(e) => setFormData({...formData, is_active: parseInt(e.target.value)})} className="w-full p-3 bg-navy-700 rounded-lg text-white border border-cyan-500/20 focus:border-cyan-500 outline-none">
                        <option value={1}>Active</option>
                        <option value={0}>Inactive</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default FooterSettingsAdmin;