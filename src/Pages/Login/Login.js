import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import Navbar from '../Shared/Navbar/Navbar';
import image from '../../assets/login.png'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';
import useToken from '../../hooks/useToken';

const Login = () => {
    const { register, formState: { errors }, handleSubmit } = useForm()
    const { signIn } = useContext(AuthContext);
    const [loginError, setLoginError] = useState('');
    const [loginUserEmail, setLoginUserEmail] = useState('');
    const [token] = useToken(loginUserEmail);
    const location = useLocation();
    const navigate = useNavigate();

    const from = location.state?.from?.pathname || '/';

    if(token){
        navigate(from, { replace: true });
    }

    const handleLogin = data => {
        console.log(data);
        setLoginError('');
        signIn(data.email, data.password)
            .then(result => {
                const user = result.user
                console.log(user)
                setLoginUserEmail(data.email);
            })
            .catch(err => {
                console.error(err.message);
                setLoginError(err.message)
            });
    }
    return (
        <div>
            <Navbar></Navbar>
            <div className='min-h-screen grid md:grid-cols-2 justify-items-center items-center'>
                <img className='w-3/4 hidden md:block' src={image} alt="" />
                <div className='shadow-xl p-6 bg-base-200 rounded'>
                    <h2 className='text-2xl text-center'>Login</h2>
                    <form className='mb-5' onSubmit={handleSubmit(handleLogin)}>
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
                            <label className="label"> <span className="label-text">Password</span></label>
                            <input type="password"
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: { value: 6, message: 'Password must be 6 characters or longer' }
                                })}
                                className="input input-bordered w-full max-w-xs" />
                            {errors.password && <p className='text-red-600 text-sm'>{errors.password?.message}</p>}
                            <label className="label"> <span className="label-text">Forgot Password?</span></label>
                        </div>
                        <input className='btn btn-primary max-w-xs w-full mt-3' value="Login" type="submit" />
                        <div>
                            {loginError && <p className='text-red-600'>{loginError}</p>}
                        </div>
                    </form>
                    <p>New User? <Link className='text-primary' to="/signup">Create new Account</Link></p>
                    <div className="divider">OR</div>
                    <button className='btn btn-outline w-full'>CONTINUE WITH GOOGLE</button>
                </div>

            </div>
        </div>
    );
};

export default Login;