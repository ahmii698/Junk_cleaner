import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();

    console.log('ProtectedRoute - isAuthenticated:', isAuthenticated, 'loading:', loading);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-navy-900 to-navy-950">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-cyan-500 text-lg">Checking authentication...</p>
                </div>
            </div>
        );
    }

    if (!isAuthenticated) {
        console.log('Not authenticated, redirecting to login');
        return <Navigate to="/login" replace />;
    }

    console.log('Authenticated, allowing access');
    return children;
};

export default ProtectedRoute;