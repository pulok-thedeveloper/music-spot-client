import { useQuery } from '@tanstack/react-query/build/lib';
const UseCategory =() => {

    const categoryName = localStorage.getItem('category').toLowerCase();

    const { data: filterProducts = [], refetch} = useQuery({
        queryKey: ['filterProducts', categoryName],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/products?category=${categoryName}`);
            const data = await res.json();
            return data
        }
    });

    return [filterProducts, refetch]
};

export default UseCategory;