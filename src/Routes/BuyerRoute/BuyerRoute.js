import React, { useContext } from 'react';
import { TailSpin } from 'react-loader-spinner';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';
import useBuyer from '../../hooks/useBuyer';



const BuyerRoute = ({children}) => {
    const {user, loading} = useContext(AuthContext);
    const [isBuyer, isBuyerLoading] = useBuyer(user?.email);
    const location = useLocation();

    if(loading || isBuyerLoading){
        return <TailSpin/>
    }

    if (user && isBuyer){
        return children;
    }

    return <Navigate to="/login" state={{from: location}} replace></Navigate>;
};

export default BuyerRoute;
