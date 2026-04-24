import React, { useState, useEffect } from 'react';
import api from '../../services/api';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const res = await api.get('/admin/users');
            setUsers(res.data.data);
        } catch (error) {
            console.error(error);
        }
        setLoading(false);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure?')) {
            await api.delete(`/admin/users/${id}`);
            fetchUsers();
        }
    };

    if (loading) return <div className="text-center text-cyan-500 py-20">Loading...</div>;

    return (
        <div>
            <h1 className="text-2xl font-bold text-white mb-6">Users</h1>
            <div className="bg-navy-800/60 rounded-2xl p-6 border border-cyan-500/20 overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="border-b border-cyan-500/20">
                        <tr>
                            <th className="py-2 text-gray-400">ID</th>
                            <th className="py-2 text-gray-400">Name</th>
                            <th className="py-2 text-gray-400">Email</th>
                            <th className="py-2 text-gray-400">Role</th>
                            <th className="py-2 text-gray-400">Joined</th>
                            <th className="py-2 text-gray-400">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id} className="border-b border-cyan-500/10">
                                <td className="py-2 text-white">{user.id}</td>
                                <td className="py-2 text-white">{user.name}</td>
                                <td className="py-2 text-gray-300">{user.email}</td>
                                <td className="py-2"><span className={`px-2 py-1 rounded-full text-xs ${user.role === 'admin' ? 'bg-cyan-500 text-navy-900' : 'bg-gray-600 text-white'}`}>{user.role}</span></td>
                                <td className="py-2 text-gray-400">{new Date(user.created_at).toLocaleDateString()}</td>
                                <td className="py-2">
                                    <button onClick={() => handleDelete(user.id)} className="bg-red-600 text-white px-3 py-1 rounded-full text-sm">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Users;