import React, { useContext, useState } from 'react';
import Navbar from '../Shared/Navbar/Navbar';
import image from '../../assets/login.png'
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../context/AuthProvider';
import toast from 'react-hot-toast';
import useToken from '../../hooks/useToken';

const SignUp = () => {
    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    const { createUser, updateUser } = useContext(AuthContext);
    const [signUpError, setSignUPError] = useState('');
    const [createdUserEmail, setCreatedUserEmail] = useState('');
    const [token] = useToken(createdUserEmail);
    const navigate = useNavigate();

    if(token){
        navigate('/');
    }

    const handleSignUp = data => {
        console.log(data);
        setSignUPError('');
        createUser(data.email, data.password)
            .then(result => {
                const user = result.user
                console.log(user)
                const userInfo = {
                    displayName: data.name
                }
                updateUser(userInfo)
                    .then(() => {
                        saveUser(data.name, data.email, data.role);
                    })
                    .catch(err => console.log(err));
            })
            .catch(error => {
                console.log(error)
                setSignUPError(error.message)
            });

    }

    const saveUser = (name, email, role) => {
        const newUser = {
            email: email,
            name: name,
            role: role,
        }

        fetch('http://localhost:5000/users', {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newUser)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    setCreatedUserEmail(email);
                    toast.success('Account Created Successfully')
                    reset();
                }
                else {
                    toast.error(data.message);
                }
            })
    }


    return (
        <div>
            <Navbar></Navbar>
            <div className='min-h-screen grid lg:grid-cols-2 justify-items-center items-center'>
                <img className='w-3/4 hidden lg:block' src={image} alt="" />
                <div className='shadow-xl p-6 bg-base-200 rounded'>
                    <h2 className='text-2xl text-center'>Sign Up</h2>

                    <form onSubmit={handleSubmit(handleSignUp)} className='mb-5 grid grid-cols-2 gap-5 justify-center'>

                        <div className="form-control w-full max-w-xs">
                            <label className="label"> <span className="label-text">Name</span></label>
                            <input type="text"
                                {...register("name", {
                                    required: "Name is required"
                                })}
                                className="input input-bordered w-full max-w-xs" />
                            {errors.name && <p className='text-red-600 text-sm'>{errors.name?.message}</p>}
                        </div>

                        <div className="form-control w-full max-w-xs">
                            <label className="label"> <span className="label-text">Email</span></label>
                            <input type="text"
                                {...register("email", {
                                    required: "Email Address is required"
                                })}
                                className="input input-bordered w-full max-w-xs" />
                            {errors.email && <p className='text-red-600 text-sm'>{errors.email?.message}</p>}
                        </div>

                        <div className="form-control w-full max-w-xs">
                            <label className="label"> <span className="label-text">User Role</span></label>
                            <select className='input input-borderd w-full max-w-xs' {...register("role", { required: true })}>
                                <option value="buyer">Buyer</option>
                                <option value="seller">Seller</option>
                            </select>
                            {errors.email && <p className='text-red-600 text-sm'>{errors.email?.message}</p>}
                        </div>



                        <div className="form-control w-full max-w-xs">
                            <label className="label"> <span className="label-text">Password</span></label>
                            <input type="password"
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: { value: 6, message: 'Password must be 6 characters or longer' }
                                })}
                                className="input input-bordered w-full max-w-xs" />
                            {errors.password && <p className='text-red-600 text-sm'>{errors.password?.message}</p>}
                        </div>

                        <input className='btn btn-primary w-full mt-3 col-span-2' value="signup" type="submit" />
                        <div>
                            {signUpError && <p className='text-red-600'>{signUpError}</p>}
                        </div>
                    </form>

                    <p>Already have an account? <Link className='text-primary' to="/login">Login</Link></p>
                    <div className="divider">OR</div>
                    <button className='btn btn-outline w-full'>CONTINUE WITH GOOGLE</button>
                </div>

            </div>
        </div>
    );
};

export default SignUp;