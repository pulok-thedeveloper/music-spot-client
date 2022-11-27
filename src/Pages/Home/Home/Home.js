import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import Banner from '../Banner/Banner';
import Subscribe from '../Subscribe/Subscribe';

const Home = () => {
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        fetch('categories.json')
            .then(res => res.json())
            .then(data => setCategories(data))
    }, [])
    return (
        <div>
            <div className=''>
                <ul className="flex justify-around p-2">
                    {categories.map(category => <li key={category._id}><Link to={`/category/${category.name}`}>{category.name}</Link></li>)}
                </ul>
            </div>
            <Banner></Banner>
            <Subscribe></Subscribe>
        </div>

    )
};

export default Home;