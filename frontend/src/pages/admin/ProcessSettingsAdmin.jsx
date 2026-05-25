// src/pages/admin/ProcessSettingsAdmin.jsx
import React, { useState, useEffect } from 'react';
import api from '../../services/api';

const ProcessSettingsAdmin = () => {
    const [process, setProcess] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
        section_title: '',
        section_highlight: '',
        step1_title: '',
        step1_desc: '',
        step2_title: '',
        step2_desc: '',
        step3_title: '',
        step3_desc: '',
        step4_title: '',
        step4_desc: '',
        is_active: 1
    });

    useEffect(() => {
        fetchProcessSettings();
    }, []);

    const fetchProcessSettings = async () => {
        try {
            const res = await api.get('/process');
            setProcess(res.data);
            setFormData({
                section_title: res.data.section_title || '',
                section_highlight: res.data.section_highlight || '',
                step1_title: res.data.step1_title || '',
                step1_desc: res.data.step1_desc || '',
                step2_title: res.data.step2_title || '',
                step2_desc: res.data.step2_desc || '',
                step3_title: res.data.step3_title || '',
                step3_desc: res.data.step3_desc || '',
                step4_title: res.data.step4_title || '',
                step4_desc: res.data.step4_desc || '',
                is_active: res.data.is_active || 1
            });
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        if (!process) return;
        setSaving(true);
        try {
            await api.put(`/admin/process/${process.id}`, formData);
            alert('Process settings updated successfully!');
            fetchProcessSettings();
        } catch (error) {
            alert('Error saving process settings');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="text-center text-cyan-500 py-20">Loading...</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-white">Process Section Settings</h1>
                <button onClick={handleSave} disabled={saving} className="bg-cyan-500 text-navy-900 px-6 py-2 rounded-full hover:bg-cyan-400 transition disabled:opacity-50">
                    {saving ? 'Saving...' : 'Save Changes'}
                </button>
            </div>

            <div className="bg-navy-800/60 rounded-2xl p-6 border border-cyan-500/20">
                {/* Section Title */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                        <label className="block text-gray-400 text-sm mb-2">Section Title</label>
                        <input type="text" value={formData.section_title} onChange={(e) => setFormData({...formData, section_title: e.target.value})} className="w-full p-3 bg-navy-700 rounded-lg text-white border border-cyan-500/20 focus:border-cyan-500 outline-none" />
                    </div>
                    <div>
                        <label className="block text-gray-400 text-sm mb-2">Highlight Word</label>
                        <input type="text" value={formData.section_highlight} onChange={(e) => setFormData({...formData, section_highlight: e.target.value})} className="w-full p-3 bg-navy-700 rounded-lg text-white border border-cyan-500/20 focus:border-cyan-500 outline-none" />
                    </div>
                </div>

                {/* Steps */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    {[1, 2, 3, 4].map((num) => (
                        <div key={num} className="bg-navy-700/50 rounded-lg p-4 border border-cyan-500/20">
                            <div className="flex items-center gap-2 mb-3">
                                <div className="w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center text-navy-900 font-bold">{num}</div>
                                <span className="text-gray-400">Step {num}</span>
                            </div>
                            <input type="text" placeholder="Title" value={formData[`step${num}_title`]} onChange={(e) => setFormData({...formData, [`step${num}_title`]: e.target.value})} className="w-full p-2 bg-navy-800 rounded-lg mb-2 text-white border border-cyan-500/20 focus:border-cyan-500 outline-none text-sm" />
                            <input type="text" placeholder="Description" value={formData[`step${num}_desc`]} onChange={(e) => setFormData({...formData, [`step${num}_desc`]: e.target.value})} className="w-full p-2 bg-navy-800 rounded-lg text-white border border-cyan-500/20 focus:border-cyan-500 outline-none text-sm" />
                        </div>
                    ))}
                </div>

                {/* Status */}
                <div>
                    <label className="block text-gray-400 text-sm mb-2">Status</label>
                    <select value={formData.is_active} onChange={(e) => setFormData({...formData, is_active: parseInt(e.target.value)})} className="w-full p-3 bg-navy-700 rounded-lg text-white border border-cyan-500/20 focus:border-cyan-500 outline-none">
                        <option value={1}>Active - Show on Website</option>
                        <option value={0}>Inactive - Hide from Website</option>
                    </select>
                </div>

                {/* Live Preview */}
                <div className="mt-8 pt-6 border-t border-cyan-500/20">
                    <h3 className="text-lg font-bold text-white mb-4">Live Preview</h3>
                    <div className="bg-navy-900/50 rounded-xl p-6">
                        <h2 className="text-2xl font-bold text-center mb-8">{formData.section_title} <span className="text-cyan-500">{formData.section_highlight}</span></h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[1, 2, 3, 4].map((num) => (
                                <div key={num} className="text-center">
                                    <div className="w-12 h-12 bg-cyan-500 rounded-full flex items-center justify-center text-navy-900 font-bold text-xl mx-auto mb-4">{num}</div>
                                    <h3 className="text-lg font-bold mb-2">{formData[`step${num}_title`] || `Step ${num}`}</h3>
                                    <p className="text-gray-400 text-sm">{formData[`step${num}_desc`] || 'Description here'}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProcessSettingsAdmin;