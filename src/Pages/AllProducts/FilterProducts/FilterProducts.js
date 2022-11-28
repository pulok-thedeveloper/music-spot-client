import React, { useEffect, useState } from 'react';
import BookingModal from '../BookingModal/BookingModal';
import ProductCard from '../ProductCard/ProductCard';

const FilterProducts = () => {
    const [modalProduct, setModalProduct] = useState(null)
    const [filterProducts, setFilterProducts] = useState(null);
    const category = localStorage.getItem('category');
    useEffect(() => {
        fetch(`http://localhost:5000/products?category=${category}`)
            .then(res => res.json())
            .then(data => {
                setFilterProducts(data);
            })
    }, [category])
    return (

        <div>
            <h2 className='text-center my-5 font-semibold'>{category.toUpperCase()}</h2>
            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center justify-items-center'>
                {
                    filterProducts &&
                    filterProducts.map(product => <ProductCard key={product._id} product={product} setModalProduct={setModalProduct}></ProductCard>)
                }
            </div>
            {
                modalProduct &&
                <BookingModal key={modalProduct._id} modalProduct={modalProduct} setModalProduct={setModalProduct}></BookingModal>
            }
            
        </div>
    );
};

export default FilterProducts;