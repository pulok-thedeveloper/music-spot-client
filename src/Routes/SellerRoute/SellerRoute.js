import React, { useContext } from 'react';
import { TailSpin } from 'react-loader-spinner';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';
import useSeller from '../../hooks/useSeller';


const SellerRoute = ({children}) => {
    const {user, loading} = useContext(AuthContext);
    const [isSeller, isSellerLoading] = useSeller(user?.email);
    const location = useLocation();

    if(loading || isSellerLoading){
        return <TailSpin/>
    }

    if (user && isSeller){
        return children;
    }

    return <Navigate to="/login" state={{from: location}} replace></Navigate>;
};

export default SellerRoute;
