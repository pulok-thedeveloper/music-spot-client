import React from 'react';
import notFound from '../../src/assets/Page_not_found.png'

const Error404 = () => {
    return (
        <div className='max-h-screen'>
            <img className='max-h-screen' src={notFound} alt=''/>
        </div>
    );
};

export default Error404;