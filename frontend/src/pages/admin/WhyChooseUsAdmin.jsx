// src/pages/admin/WhyChooseUsAdmin.jsx
import React, { useState, useEffect } from 'react';
import api from '../../services/api';

// 🔥 100+ Font Awesome Icons List (Same as Services)
const fontAwesomeIcons = [
    // Home & Building
    { value: 'fa-home', label: '🏠 Home' },
    { value: 'fa-building', label: '🏢 Building' },
    { value: 'fa-warehouse', label: '🏚️ Warehouse' },
    { value: 'fa-store', label: '🏪 Store' },
    { value: 'fa-house-damage', label: '🏚️ House Damage' },
    
    // Transportation & Vehicles
    { value: 'fa-truck', label: '🚚 Truck' },
    { value: 'fa-truck-moving', label: '🚛 Moving Truck' },
    { value: 'fa-car', label: '🚗 Car' },
    { value: 'fa-taxi', label: '🚕 Taxi' },
    { value: 'fa-train', label: '🚆 Train' },
    { value: 'fa-subway', label: '🚇 Subway' },
    { value: 'fa-bus', label: '🚌 Bus' },
    { value: 'fa-bicycle', label: '🚲 Bicycle' },
    { value: 'fa-motorcycle', label: '🏍️ Motorcycle' },
    { value: 'fa-shipping-fast', label: '📦 Fast Shipping' },
    
    // Tools & Equipment
    { value: 'fa-tools', label: '🔧 Tools' },
    { value: 'fa-wrench', label: '🔧 Wrench' },
    { value: 'fa-screwdriver', label: '🪛 Screwdriver' },
    { value: 'fa-hammer', label: '🔨 Hammer' },
    { value: 'fa-hard-hat', label: '⛑️ Hard Hat' },
    { value: 'fa-helmet-safety', label: '🪖 Safety Helmet' },
    { value: 'fa-gavel', label: '🔨 Gavel' },
    { value: 'fa-cogs', label: '⚙️ Cogs' },
    { value: 'fa-cog', label: '⚙️ Cog' },
    { value: 'fa-gear', label: '⚙️ Gear' },
    { value: 'fa-industry', label: '🏭 Industry' },
    { value: 'fa-factory', label: '🏭 Factory' },
    
    // Cleaning & Maintenance
    { value: 'fa-broom', label: '🧹 Broom' },
    { value: 'fa-mop', label: '🧹 Mop' },
    { value: 'fa-soap', label: '🧼 Soap' },
    { value: 'fa-trash', label: '🗑️ Trash' },
    { value: 'fa-trash-alt', label: '🗑️ Trash Alt' },
    { value: 'fa-dumpster', label: '🗑️ Dumpster' },
    { value: 'fa-recycle', label: '♻️ Recycle' },
    { value: 'fa-leaf', label: '🍃 Leaf' },
    { value: 'fa-seedling', label: '🌱 Seedling' },
    { value: 'fa-tree', label: '🌳 Tree' },
    
    // Nature & Environment
    { value: 'fa-water', label: '💧 Water' },
    { value: 'fa-tint', label: '💧 Tint' },
    { value: 'fa-cloud-sun', label: '🌤️ Cloud Sun' },
    { value: 'fa-cloud-rain', label: '🌧️ Cloud Rain' },
    { value: 'fa-sun', label: '☀️ Sun' },
    { value: 'fa-moon', label: '🌙 Moon' },
    
    // Business & Services
    { value: 'fa-briefcase', label: '💼 Briefcase' },
    { value: 'fa-handshake', label: '🤝 Handshake' },
    { value: 'fa-chart-line', label: '📈 Chart Line' },
    { value: 'fa-chart-bar', label: '📊 Chart Bar' },
    { value: 'fa-dollar-sign', label: '💰 Dollar' },
    { value: 'fa-tag', label: '🏷️ Tag' },
    { value: 'fa-tags', label: '🏷️ Tags' },
    { value: 'fa-clock', label: '🕐 Clock' },
    { value: 'fa-calendar', label: '📅 Calendar' },
    { value: 'fa-phone', label: '📞 Phone' },
    { value: 'fa-envelope', label: '✉️ Envelope' },
    { value: 'fa-map-marker-alt', label: '📍 Map Marker' },
    
    // Construction
    { value: 'fa-drafting-compass', label: '📐 Drafting Compass' },
    { value: 'fa-ruler-combined', label: '📏 Ruler' },
    { value: 'fa-paint-roller', label: '🎨 Paint Roller' },
    { value: 'fa-brush', label: '🖌️ Brush' },
    
    // Electronics & Tech
    { value: 'fa-laptop', label: '💻 Laptop' },
    { value: 'fa-desktop', label: '🖥️ Desktop' },
    { value: 'fa-mobile-alt', label: '📱 Mobile' },
    { value: 'fa-tablet-alt', label: '📟 Tablet' },
    { value: 'fa-server', label: '🗄️ Server' },
    { value: 'fa-database', label: '🗄️ Database' },
    
    // Hands & Gestures
    { value: 'fa-hand-peace', label: '✌️ Peace' },
    { value: 'fa-hand-sparkles', label: '✨ Sparkles' },
    { value: 'fa-hand-holding-heart', label: '🤲 Holding Heart' },
    { value: 'fa-thumbs-up', label: '👍 Thumbs Up' },
    { value: 'fa-thumbs-down', label: '👎 Thumbs Down' },
    
    // Files & Documents
    { value: 'fa-file-alt', label: '📄 File Alt' },
    { value: 'fa-file-pdf', label: '📕 PDF' },
    { value: 'fa-file-word', label: '📘 Word' },
    { value: 'fa-file-excel', label: '📗 Excel' },
    
    // Miscellaneous
    { value: 'fa-star', label: '⭐ Star' },
    { value: 'fa-heart', label: '❤️ Heart' },
    { value: 'fa-shield-alt', label: '🛡️ Shield' },
    { value: 'fa-lock', label: '🔒 Lock' },
    { value: 'fa-unlock', label: '🔓 Unlock' },
    { value: 'fa-key', label: '🔑 Key' },
    { value: 'fa-bolt', label: '⚡ Bolt' },
    { value: 'fa-fire', label: '🔥 Fire' },
    { value: 'fa-crown', label: '👑 Crown' },
    { value: 'fa-gem', label: '💎 Gem' },
    { value: 'fa-rocket', label: '🚀 Rocket' },
    { value: 'fa-globe', label: '🌍 Globe' },
    { value: 'fa-flag', label: '🏁 Flag' },
    { value: 'fa-check-circle', label: '✅ Check Circle' },
    { value: 'fa-times-circle', label: '❌ Times Circle' },
];

const WhyChooseUsAdmin = () => {
    const [why, setWhy] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
        section_title: '',
        section_highlight: '',
        card1_icon: 'fa-bolt', card1_title: '', card1_desc: '', card1_price: '',
        card2_icon: 'fa-dollar-sign', card2_title: '', card2_desc: '', card2_price: '',
        card3_icon: 'fa-leaf', card3_title: '', card3_desc: '', card3_price: '',
        is_active: 1
    });

    useEffect(() => {
        fetchWhyChooseUs();
    }, []);

    const fetchWhyChooseUs = async () => {
        try {
            const res = await api.get('/why-choose-us');
            setWhy(res.data);
            setFormData({
                section_title: res.data.section_title || '',
                section_highlight: res.data.section_highlight || '',
                card1_icon: res.data.card1_icon || 'fa-bolt',
                card1_title: res.data.card1_title || '',
                card1_desc: res.data.card1_desc || '',
                card1_price: res.data.card1_price || '',
                card2_icon: res.data.card2_icon || 'fa-dollar-sign',
                card2_title: res.data.card2_title || '',
                card2_desc: res.data.card2_desc || '',
                card2_price: res.data.card2_price || '',
                card3_icon: res.data.card3_icon || 'fa-leaf',
                card3_title: res.data.card3_title || '',
                card3_desc: res.data.card3_desc || '',
                card3_price: res.data.card3_price || '',
                is_active: res.data.is_active || 1
            });
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        if (!why) return;
        setSaving(true);
        try {
            await api.put(`/admin/why-choose-us/${why.id}`, formData);
            alert('Settings updated successfully!');
            fetchWhyChooseUs();
        } catch (error) {
            alert('Error saving settings');
        } finally {
            setSaving(false);
        }
    };

    // 🔥 Helper function to render icon dropdown for a card
    const renderIconDropdown = (cardNum) => {
        const iconValue = formData[`card${cardNum}_icon`];
        return (
            <div className="mb-3">
                <label className="block text-gray-400 text-sm mb-2">Select Icon for Card {cardNum}</label>
                <div className="flex gap-3 items-center">
                    <div className="flex-1">
                        <select 
                            value={iconValue} 
                            onChange={(e) => setFormData({...formData, [`card${cardNum}_icon`]: e.target.value})}
                            className="w-full p-3 bg-navy-700 rounded-lg text-white border border-cyan-500/20 focus:border-cyan-500 outline-none"
                        >
                            {fontAwesomeIcons.map((icon) => (
                                <option key={icon.value} value={icon.value}>
                                    {icon.label} - {icon.value}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="w-14 h-14 bg-navy-700 rounded-lg flex items-center justify-center border border-cyan-500/20">
                        <i className={`fas ${iconValue} text-cyan-500 text-2xl`}></i>
                    </div>
                </div>
            </div>
        );
    };

    if (loading) return <div className="text-center text-cyan-500 py-20">Loading...</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-white">Why Choose Us Section</h1>
                <button onClick={handleSave} disabled={saving} className="bg-cyan-500 text-navy-900 px-6 py-2 rounded-full hover:bg-cyan-400 transition disabled:opacity-50">
                    {saving ? 'Saving...' : 'Save Changes'}
                </button>
            </div>

            <div className="bg-navy-800/60 rounded-2xl p-6 border border-cyan-500/20">
                {/* Section Title */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                        <label className="block text-gray-400 text-sm mb-2">Section Title</label>
                        <input type="text" value={formData.section_title} onChange={(e) => setFormData({...formData, section_title: e.target.value})} 
                            className="w-full p-3 bg-navy-700 rounded-lg text-white border border-cyan-500/20 focus:border-cyan-500 outline-none" 
                            placeholder="Why Choose Us?" />
                    </div>
                    <div>
                        <label className="block text-gray-400 text-sm mb-2">Highlight Word</label>
                        <input type="text" value={formData.section_highlight} onChange={(e) => setFormData({...formData, section_highlight: e.target.value})} 
                            className="w-full p-3 bg-navy-700 rounded-lg text-white border border-cyan-500/20 focus:border-cyan-500 outline-none" 
                            placeholder="Choose Us?" />
                    </div>
                </div>

                {/* Card 1 */}
                <div className="mb-6 p-4 bg-navy-700/30 rounded-lg border border-cyan-500/20">
                    <h3 className="text-cyan-500 font-bold mb-3">Card 1</h3>
                    {renderIconDropdown(1)}
                    <div className="grid grid-cols-2 gap-3 mb-3">
                        <input type="text" placeholder="Title" value={formData.card1_title} onChange={(e) => setFormData({...formData, card1_title: e.target.value})} 
                            className="p-3 bg-navy-700 rounded-lg text-white border border-cyan-500/20 focus:border-cyan-500 outline-none" />
                        <input type="text" placeholder="Description" value={formData.card1_desc} onChange={(e) => setFormData({...formData, card1_desc: e.target.value})} 
                            className="p-3 bg-navy-700 rounded-lg text-white border border-cyan-500/20 focus:border-cyan-500 outline-none" />
                    </div>
                    <div>
                        <input type="text" placeholder="Price/Badge (e.g., 1-2 hour arrival)" value={formData.card1_price} onChange={(e) => setFormData({...formData, card1_price: e.target.value})} 
                            className="w-full p-3 bg-navy-700 rounded-lg text-white border border-cyan-500/20 focus:border-cyan-500 outline-none" />
                    </div>
                </div>

                {/* Card 2 */}
                <div className="mb-6 p-4 bg-navy-700/30 rounded-lg border border-cyan-500/20">
                    <h3 className="text-cyan-500 font-bold mb-3">Card 2</h3>
                    {renderIconDropdown(2)}
                    <div className="grid grid-cols-2 gap-3 mb-3">
                        <input type="text" placeholder="Title" value={formData.card2_title} onChange={(e) => setFormData({...formData, card2_title: e.target.value})} 
                            className="p-3 bg-navy-700 rounded-lg text-white border border-cyan-500/20 focus:border-cyan-500 outline-none" />
                        <input type="text" placeholder="Description" value={formData.card2_desc} onChange={(e) => setFormData({...formData, card2_desc: e.target.value})} 
                            className="p-3 bg-navy-700 rounded-lg text-white border border-cyan-500/20 focus:border-cyan-500 outline-none" />
                    </div>
                    <div>
                        <input type="text" placeholder="Price/Badge (e.g., Transparent pricing)" value={formData.card2_price} onChange={(e) => setFormData({...formData, card2_price: e.target.value})} 
                            className="w-full p-3 bg-navy-700 rounded-lg text-white border border-cyan-500/20 focus:border-cyan-500 outline-none" />
                    </div>
                </div>

                {/* Card 3 */}
                <div className="mb-6 p-4 bg-navy-700/30 rounded-lg border border-cyan-500/20">
                    <h3 className="text-cyan-500 font-bold mb-3">Card 3</h3>
                    {renderIconDropdown(3)}
                    <div className="grid grid-cols-2 gap-3 mb-3">
                        <input type="text" placeholder="Title" value={formData.card3_title} onChange={(e) => setFormData({...formData, card3_title: e.target.value})} 
                            className="p-3 bg-navy-700 rounded-lg text-white border border-cyan-500/20 focus:border-cyan-500 outline-none" />
                        <input type="text" placeholder="Description" value={formData.card3_desc} onChange={(e) => setFormData({...formData, card3_desc: e.target.value})} 
                            className="p-3 bg-navy-700 rounded-lg text-white border border-cyan-500/20 focus:border-cyan-500 outline-none" />
                    </div>
                    <div>
                        <input type="text" placeholder="Price/Badge (e.g., 90%+ recycled)" value={formData.card3_price} onChange={(e) => setFormData({...formData, card3_price: e.target.value})} 
                            className="w-full p-3 bg-navy-700 rounded-lg text-white border border-cyan-500/20 focus:border-cyan-500 outline-none" />
                    </div>
                </div>

                {/* Live Preview Section */}
                <div className="mt-8 pt-6 border-t border-cyan-500/20">
                    <h3 className="text-lg font-bold text-white mb-4">Live Preview</h3>
                    <div className="bg-navy-900/50 rounded-xl p-6">
                        <h2 className="text-2xl font-bold text-center mb-8">
                            {formData.section_title || 'Why Choose Us?'} 
                            <span className="text-cyan-500"> {formData.section_highlight || 'Choose Us?'}</span>
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Card 1 Preview */}
                            <div className="text-center p-4 bg-navy-800/50 rounded-xl">
                                <i className={`fas ${formData.card1_icon || 'fa-bolt'} text-5xl text-cyan-500 mb-4`}></i>
                                <h3 className="text-xl font-bold mb-2">{formData.card1_title || 'Lightning Fast'}</h3>
                                <p className="text-gray-400">{formData.card1_desc || 'Local team arrives within 1-2 hours'}</p>
                                <div className="mt-2 text-cyan-500 font-bold">{formData.card1_price || '1-2 hour arrival'}</div>
                            </div>
                            {/* Card 2 Preview */}
                            <div className="text-center p-4 bg-navy-800/50 rounded-xl">
                                <i className={`fas ${formData.card2_icon || 'fa-dollar-sign'} text-5xl text-cyan-500 mb-4`}></i>
                                <h3 className="text-xl font-bold mb-2">{formData.card2_title || 'Upfront Price'}</h3>
                                <p className="text-gray-400">{formData.card2_desc || 'No hidden fees'}</p>
                                <div className="mt-2 text-cyan-500 font-bold">{formData.card2_price || 'Transparent pricing'}</div>
                            </div>
                            {/* Card 3 Preview */}
                            <div className="text-center p-4 bg-navy-800/50 rounded-xl">
                                <i className={`fas ${formData.card3_icon || 'fa-leaf'} text-5xl text-cyan-500 mb-4`}></i>
                                <h3 className="text-xl font-bold mb-2">{formData.card3_title || 'Eco Friendly'}</h3>
                                <p className="text-gray-400">{formData.card3_desc || 'Green disposal'}</p>
                                <div className="mt-2 text-cyan-500 font-bold">{formData.card3_price || '90%+ recycled'}</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Status */}
                <div className="mt-6">
                    <label className="block text-gray-400 text-sm mb-2">Status</label>
                    <select value={formData.is_active} onChange={(e) => setFormData({...formData, is_active: parseInt(e.target.value)})} 
                        className="w-full p-3 bg-navy-700 rounded-lg text-white border border-cyan-500/20 focus:border-cyan-500 outline-none">
                        <option value={1}>Active - Show on Website</option>
                        <option value={0}>Inactive - Hide from Website</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default WhyChooseUsAdmin;