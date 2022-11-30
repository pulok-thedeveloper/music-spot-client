import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';

const Categories = () => {
    const { loadFilterProducts } = useContext(AuthContext);
    const [categories, setCategories] = useState([]);
    
    useEffect(() => {
        fetch('https://music-spot-server.vercel.app/categories')
            .then(res => res.json())
            .then(data => setCategories(data))
    }, [])
    return (
        <div>
            <ul className="flex justify-around p-2">
                {categories.map(category => <li key={category._id}><Link onClick={() => loadFilterProducts(category.name)} to={`/category/${category.name}`}>{category.name}</Link></li>)}
            </ul>
        </div>
    );
};

export default Categories;