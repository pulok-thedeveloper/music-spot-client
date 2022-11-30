import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthProvider';

const BookingModal = ({ modalProduct, setModalProduct }) => {
    const {user} = useContext(AuthContext);
    const navigate = useNavigate();


    const { productName, resalePrice, picture} = modalProduct;

    const handleModal =event =>{
        event.preventDefault();
        const form = event.target;
        const pName = productName;
        const name = form.name.value;
        const email = form.email.value;
        const price = form.price.value;
        const phone = form.phone.value;
        const location = form.location.value;

        const modalData = {
            name,
            productName: pName,
            email,
            price,
            phone,
            location,
            picture
        }

        fetch('https://music-spot-server.vercel.app/bookings', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(modalData)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.acknowledged) {
                    setModalProduct(null)
                    toast.success('Booked Successfuly');
                    navigate('/dashboard/myorders')
                }
                else{
                    toast.error(data.message);
                }
            })

    }

    return (
        <>
            <input name="" type="checkbox" id="booking-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold mb-4">{productName}</h3>
                    <form onSubmit={handleModal}>
                        <input name="name" type="text" value={user.displayName} className="input input-bordered w-full mb-3" disabled/>

                        <input name="email" type="email" value={user.email} className="input input-bordered w-full mb-3" disabled/>

                        <input name="price" type="text" value={resalePrice} className="input input-bordered w-full mb-3" disabled/>

                        <input name="phone" type="text" placeholder="Phone" className="input input-bordered w-full mb-3" />

                        <input name="location" type="text" placeholder="Location" className="input input-bordered w-full mb-3" />

                        <input name="" type="submit" value="Book" className='btn btn-primary w-full rounded-none'/>
                    </form>
                </div>
            </div>
        </>
    );
};

export default BookingModal;