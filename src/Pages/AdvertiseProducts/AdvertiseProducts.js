import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import BookingModal from '../AllProducts/BookingModal/BookingModal';
import ProductCard from '../AllProducts/ProductCard/ProductCard';

const AdvertiseProducts = () => {
    const [modalProduct, setModalProduct] = useState(null)

    const { data: advertiseProducts = [] } = useQuery({
        queryKey: ['advertiseProducts'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/advertised');
            const data = await res.json();
            return data;
        }
    });

    return (
        <div className='m-6'>
        <h3 className='mb-3 text-xl'>Advertisement</h3>
            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center justify-items-center'>
            {
                advertiseProducts.map(product=> <ProductCard key={product._id} product={product} setModalProduct={setModalProduct}></ProductCard>)
            }
            </div>
            {
                modalProduct &&
                <BookingModal key={modalProduct._id} modalProduct={modalProduct} setModalProduct={setModalProduct}></BookingModal>
            }
        </div>
    );
};

export default AdvertiseProducts;