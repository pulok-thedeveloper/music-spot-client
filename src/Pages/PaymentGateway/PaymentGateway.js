import React from 'react';
import { useLoaderData } from 'react-router-dom';

const PaymentGateway = () => {
    const booking = useLoaderData();
    return (
        <div>
            <h3 className='text-xl'>Payment</h3>
            <p>{booking?.length}</p>
        </div>
    );
};

export default PaymentGateway;