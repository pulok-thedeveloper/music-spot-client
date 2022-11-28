import React from 'react';

const ProductCard = ({ product, setModalProduct }) => {


    const { picture, productName, location, resalePrice, originalPrice, useYears, sellerName, publishDate } = product;


    return (
        <div className="card card-compact w-96 bg-base-100 shadow-xl">
            <figure><img className='w-48' src={picture} alt="" /></figure>
            <div className="card-body">
                <h2 className="card-title text-lg">{productName}</h2>
                <p className='text-lg'>Price: {resalePrice}</p>
                <p>Original price: {originalPrice}</p>
                <p>Used: {useYears} years</p>
                <p className='font-semibold'>{sellerName}</p>
                <p>{location}</p>
                <p>Publish Date: {publishDate}</p>
                <div className="card-actions">
                    <label onClick={()=>setModalProduct(product)} htmlFor="booking-modal" className="btn w-full btn-primary rounded-none">Book Now</label>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;