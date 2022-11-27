import React, { useContext } from 'react';
import { TailSpin } from 'react-loader-spinner';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';


const PrivateRoute = ({children}) => {
    const {user, loading} = useContext(AuthContext);
    const location = useLocation();

    if(loading){
        return <TailSpin/>
    }

    if (user){
        return children;
    }

    return <Navigate to="/login" state={{from: location}} replace></Navigate>;
};

export default PrivateRoute;