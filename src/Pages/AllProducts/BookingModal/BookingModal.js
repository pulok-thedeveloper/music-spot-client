import React from 'react';

const BookingModal = ({ modalProduct }) => {

    const { productName, resalePrice } = modalProduct;

    const handleModal =event =>{
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const price = form.price.value;
        const phone = form.phone.value;
        const location = form.location.value;

        const modalData = {
            name,email,price,phone,location
        }

        console.log(modalData)

    }

    return (
        <>
            <input name="" type="checkbox" id="booking-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold mb-4">{productName}</h3>
                    <form onSubmit={handleModal}>
                        <input name="name" type="text" placeholder="Name" className="input input-bordered w-full mb-3" disabled/>

                        <input name="email" type="email" placeholder="Email Address" className="input input-bordered w-full mb-3" disabled/>

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