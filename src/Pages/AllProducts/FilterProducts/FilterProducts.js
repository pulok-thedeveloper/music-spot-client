import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import BookingModal from '../BookingModal/BookingModal';
import ProductCard from '../ProductCard/ProductCard';

const FilterProducts = () => {
    const [modalProduct, setModalProduct] = useState(null)

    const category = localStorage.getItem('category');


    const url = `https://music-spot-server.vercel.app/products?category=${category}`;

    const { data: filterProducts = [] } = useQuery({
        queryKey: ['filterProducts', category],
        queryFn: async () => {
            const res = await fetch(url, {
                headers:{
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            });
            const data = await res.json();
            console.log(data);
            return data;
        }
    })

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