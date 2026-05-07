import React, { useState } from 'react';
import AdminDashboard from './AdminDashboard';
import AdminLogin from './AdminLogin';

const AdminPage = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(
        () => Boolean(window.sessionStorage.getItem('kanter_admin_token'))
    );

    if (!isAuthenticated) {
        return <AdminLogin onLogin={() => setIsAuthenticated(true)} />;
    }

    return <AdminDashboard onLogout={() => setIsAuthenticated(false)} />;
};

export default AdminPage;
