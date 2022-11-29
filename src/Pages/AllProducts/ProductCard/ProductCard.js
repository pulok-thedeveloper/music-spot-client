import React from 'react';
import useSeller from '../../../hooks/useSeller';
import { MdVerifiedUser } from 'react-icons/md';

const ProductCard = ({ product, setModalProduct }) => {


    const { picture, productName, location, resalePrice, originalPrice, useYears, sellerName, publishDate, email } = product;
    const [seller] = useSeller(email);


    return (
        <div className="card card-compact w-96 bg-base-100 shadow-xl">
            <figure><img className='w-48' src={picture} alt="" /></figure>
            <div className="card-body">
                <h2 className="card-title text-lg">{productName}</h2>
                <p className='text-lg'>Price: {resalePrice}</p>
                <p>Original price: {originalPrice}</p>
                <p>Used: {useYears} years</p>
                <p className='font-semibold flex items-center'>
                    {sellerName}
                    {
                        seller?.verifyStatus === 'verified' &&
                        <MdVerifiedUser className='fill-blue-800'/>
                    }
                </p>
                <p>{location}</p>
                <p>Publish Date: {publishDate}</p>
                <div className="card-actions">
                    <label onClick={() => setModalProduct(product)} htmlFor="booking-modal" className="btn w-full btn-primary rounded-none">Book Now</label>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;