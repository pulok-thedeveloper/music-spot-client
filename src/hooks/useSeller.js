import { useEffect, useState } from "react"

const useSeller = email =>{
    const [seller, setSeller] = useState(false);
    const [isSellerLoading, setIsSellerLoading] = useState(true);
    useEffect(()=>{
        if(email){
            fetch(`https://music-spot-server.vercel.app/users/seller/${email}`)
            .then(res => res.json())
            .then(data => {
                setSeller(data);
                setIsSellerLoading(false);
            })
        }
    },[email])
    return [seller,isSellerLoading]
}

export default useSeller;