import { format } from 'date-fns';
import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { AuthContext } from '../../context/AuthProvider';

const AddProduct = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [categories, setCategories] = useState([]);
    const publishDate = format(new Date(), 'PP')
    const { user} = useContext(AuthContext);
    const imageHostKey = process.env.REACT_APP_imgbb_key;

    useEffect(() => {
        fetch('http://localhost:5000/categories')
            .then(res => res.json())
            .then(data => setCategories(data))
    }, [])

    const handleAdProduct = data => {
        console.log(data);
        const image = data.image[0];
        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {
                if (imgData.success) {
                    console.log(imgData.data.url);
                    const product = {
                        picture: imgData.data.url,
                        productName: data.productName,
                        category: data.category,
                        condition: data.condition,
                        resalePrice: data.resalePrice,
                        originalPrice: data.originalPrice,
                        publishDate: publishDate,
                        sellerName: user.displayName,
                        phone: data.phone,
                        location: data.location,
                        description: data.description,
                        purchaseYear: data.purchaseYear,
                        useYears: data.useYears
                    }

                    fetch('http://localhost:5000/products', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
                            authorization: `bearer ${localStorage.getItem('accessToken')}`
                        },
                        body: JSON.stringify(product)
                    })
                        .then(res => res.json())
                        .then(result => {
                            console.log(result);
                            toast.success('Product Added Successfully');
                        })
                }
            })

    }

    return (
        <div>
            <div className='shadow-xl p-6 bg-base-200 rounded grid justify-center'>
                <h2 className='text-2xl mb-6 text-center'>Add Product</h2>

                <form onSubmit={handleSubmit(handleAdProduct)} className='mb-5 grid grid-cols-2 gap-5 justify-center justify-items-center'>

                    <div className="form-control w-full max-w-xs">
                        <label className="label"> <span className="label-text">Product Name</span></label>
                        <input type="text"
                            {...register("productName", {
                                required: "Product Name is required"
                            })}
                            className="input input-bordered w-full max-w-xs" />
                        {errors.productName && <p className='text-red-600 text-sm'>{errors.productName?.message}</p>}
                    </div>

                    <div className="form-control w-full max-w-xs">
                        <label className="label"> <span className="label-text">Original Price</span></label>
                        <input type="text"
                            {...register("originalPrice", {
                                required: "Price is required"
                            })}
                            className="input input-bordered w-full max-w-xs" />
                        {errors.originalPrice && <p className='text-red-600 text-sm'>{errors.originalPrice?.message}</p>}
                    </div>

                    <div className="form-control w-full max-w-xs">
                        <label className="label"> <span className="label-text">Resale Price</span></label>
                        <input type="text"
                            {...register("resalePrice", {
                                required: "Price is required"
                            })}
                            className="input input-bordered w-full max-w-xs" />
                        {errors.resalePrice && <p className='text-red-600 text-sm'>{errors.resalePrice?.message}</p>}
                    </div>

                    <div className="form-control w-full max-w-xs">
                        <label className="label"> <span className="label-text">Condition</span></label>
                        <select className='input input-borderd w-full max-w-xs' {...register("condition", { required: true })}>
                            <option value="Excellent">Excellent</option>
                            <option value="Good">Good</option>
                            <option value="Fair">Fair</option>

                        </select>
                        {errors.condition && <p className='text-red-600 text-sm'>{errors.condition?.message}</p>}
                    </div>

                    <div className="form-control w-full max-w-xs">
                        <label className="label"> <span className="label-text">Phone Number</span></label>
                        <input type="text"
                            {...register("phone", {
                                required: "Phone Number is required"
                            })}
                            className="input input-bordered w-full max-w-xs" />
                        {errors.phone && <p className='text-red-600 text-sm'>{errors.phone?.message}</p>}
                    </div>

                    <div className="form-control w-full max-w-xs">
                        <label className="label"> <span className="label-text">Location</span></label>
                        <select className='input input-borderd w-full max-w-xs' {...register("location", { required: true })}>
                            <option value="" disabled>Select Your Location</option>
                            <option value="Dhaka">Dhaka</option>
                            <option value="Chittagong">Chittagong</option>
                            <option value="Rajshahi">Rajshahi</option>
                            <option value="Khulna">Khulna</option>
                            <option value="Barisal">Barisal</option>
                            <option value="Syllhet">Syllhet</option>
                            <option value="Rangpur">Rangpur</option>
                            <option value="Mymensingh">Mymensingh</option>

                        </select>
                        {errors.location && <p className='text-red-600 text-sm'>{errors.location?.message}</p>}
                    </div>

                    <div className="form-control w-full max-w-xs">
                        <label className="label"> <span className="label-text">Category</span></label>
                        <select className='input input-borderd w-full max-w-xs' {...register("category", { required: true })}>
                            <option value="" disabled>Select Product Category</option>
                            {
                                categories.map(category => <option key={category._id} value={category.name}>{category.name}</option>)
                            }
                        </select>
                        {errors.category && <p className='text-red-600 text-sm'>{errors.category?.message}</p>}
                    </div>

                    <div className="form-control w-full max-w-xs">
                        <label className="label"> <span className="label-text">Purchase Year</span></label>
                        <input type="text"
                            {...register("purchaseYear", {
                                required: "Purchase Year is required"
                            })}
                            className="input input-bordered w-full max-w-xs" />
                        {errors.purchaseYear && <p className='text-red-600 text-sm'>{errors.purchaseYear?.message}</p>}
                    </div>

                    <div className="form-control w-full max-w-xs">
                        <label className="label"> <span className="label-text">Use Years</span></label>
                        <input type="text"
                            {...register("useYears", {
                                required: "Use Years is required"
                            })}
                            className="input input-bordered w-full max-w-xs" />
                        {errors.useYears && <p className='text-red-600 text-sm'>{errors.useYears?.message}</p>}
                    </div>

                    <div className="form-control w-full max-w-xs">
                        <label className="label"> <span className="label-text">Photo</span></label>

                        <input type="file" {...register("image", {
                            required: "Photo is Required"
                        })} className="file-input file-input-bordered w-full max-w-xs" />

                        {errors.img && <p className='text-red-500'>{errors.img.message}</p>}
                    </div>

                    <div className="form-control w-full">
                        <label className="label"> <span className="label-text">Description</span></label>
                        <textarea {...register("description", {
                            required: "Description is required"
                        })}
                            className="input input-bordered w-full" ></textarea>
                        {errors.description && <p className='text-red-600 text-sm'>{errors.description?.message}</p>}
                    </div>


                    <input className='btn btn-primary w-full mt-3 col-span-2' value="add product" type="submit" />
                </form>
            </div>
        </div>
    );
};

export default AddProduct;