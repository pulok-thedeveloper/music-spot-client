import React, { useEffect, useState } from 'react';
import BookingModal from './BookingModal/BookingModal';
import ProductCard from './ProductCard/ProductCard';

const AllProducts = () => {
    const [products, setProducts] = useState([]);
    const [modalProduct, setModalProduct] = useState({})

    useEffect(() => {
        fetch('http://localhost:5000/products')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [])
    return (
        <div className='mx-6 mb-6'>
        <h2 className='text-center my-5 font-semibold'>All Products</h2>
            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center'>
                {
                    products.map(product => <ProductCard key={product._id} product={product} setModalProduct={setModalProduct}></ProductCard>)
                }
            </div>
            <BookingModal key={modalProduct._id} modalProduct={modalProduct}></BookingModal>
        </div>
    );
};

export default AllProducts;