import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider';

const SignUp = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { createUser, googleSignIn, updateUser } = useContext(AuthContext)
    const [signUpError, setSignUpError] = useState('')
    const [userEmail, setuserEmail] = useState('')
    //const [token] = useToken(userEmail);
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || '/';

    const handleSignUp = data => {
        setSignUpError('')
        createUser(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user);
                //toast.success('user created')
                const userInfo = {
                    displayName: data.name
                }
                updateUser(userInfo)
                    .then(() => {
                        //saveUser(data.name, data.email)
                        console.log(user)
                    })
                    .catch(error => console.log(error))
            })
            .catch(error => {
                setSignUpError(error.message)
                console.log(error)
            })
    }

    const handleGoogleLogin = () => {
        googleSignIn()
            .then(result => {
                const user = result.user;
                updateUser(user.displayName)
                    .then(() => {
                        console.log(user)
                    })
                    .catch(error => console.log(error))
                navigate(from, { replace: true })
            })
            .catch(error => {
                setSignUpError(error.message);
                console.log(error)
            })
    }

    return (
        <div className='h-2/3 text-center flex justify-center items-center'>
            <div className='w-96 p-6'>
                <h2 className='text-2xl'>Sign Up</h2>
                <form onSubmit={handleSubmit(handleSignUp)}>
                    <div className="form-control w-full max-w-xs">
                        <label className="label"><span className="label-text">Name</span></label>
                        <input
                            {...register('name', { required: "Name is required" })}
                            type='text' className="input input-bordered w-full max-w-xs" />
                    </div>
                    {errors.name && <p className='text-red-600' role="alert">{errors.name?.message}</p>}
                    <div className="form-control w-full max-w-xs">
                        <label className="label"><span className="label-text">Email</span></label>
                        <input
                            {...register('email', { required: "Email Address is required" })}
                            type='text' className="input input-bordered w-full max-w-xs" />
                    </div>
                    {errors.email && <p className='text-red-600' role="alert">{errors.email?.message}</p>}
                    <div className="form-control w-full max-w-xs">
                        <label className="label"><span className="label-text">Password</span></label>
                        <input
                            {...register('password',
                                {
                                    required: "Password is required",
                                    minLength: { value: 6, message: "Password must be six characters long" },
                                    //pattern: { value: /(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/, message: "Create a strong password" }
                                })}
                            type='password' className="input input-bordered w-full max-w-xs" />
                    </div>
                    {errors.password && <p className='text-red-600' role="alert">{errors.password?.message}</p>}
                    <input className='my-4 w-full btn btn-accent' value="Sign Up" type="submit" />
                    {signUpError && <p className='text-red-600'>{signUpError}</p>}
                    <p>Already Registered <Link to='/login' className='text-secondary'>Please Login</Link> </p>
                    <div className="divider">OR</div>
                    <button onClick={handleGoogleLogin} className='btn btn-outline w-full'>CONTINUE WITH GOOGLE</button>
                </form>
            </div>
        </div>
    );
};

export default SignUp;