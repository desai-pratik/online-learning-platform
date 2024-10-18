import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const ProtectedRoute = ({ element }) => {
    const { user } = useContext(AuthContext);

    return user ? element : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
