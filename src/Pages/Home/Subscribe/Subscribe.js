import React from 'react';
import image from '../../../assets/subscribe.jpg'

const Subscribe = () => {
    return (
        <div className='grid lg:grid-cols-2 m-6 items-center bg-base-300'>
            <img src={image} alt=""></img>
            <div className='px-6 py-10'>
                <h3 className='text-2xl font-semibold mb-4'>Get the Best of Music Spot in Your Inbox</h3>
                <div className='flex mb-3'>
                    <input type="email" placeholder='Your Email' className="input input-bordered w-full max-w-sm rounded-none" />
                    <button className='btn btn-primary rounded-none'>Subscribe</button>
                </div>
                <p className='text-xs'>By clicking Subscribe, I agree to receive exclusive offers & promotions, news & reviews, and personalized tips for buying and selling on Music Spot.</p>
            </div>
        </div>
    );
};

export default Subscribe;