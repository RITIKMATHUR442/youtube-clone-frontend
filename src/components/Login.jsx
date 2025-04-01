import React, { useState } from 'react';
import '../App.css';
import axios from 'axios';
import logo from '../assets/Y.T logo.png';
import { Link, useNavigate } from 'react-router-dom';  // Import useNavigate from react-router-dom
import {toast} from 'react-toastify'

const Login = () => {
    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState(''); 

    const navigate = useNavigate();

    // Submit handler to handle form submission
    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post('https://youtube-clone-backend-jwhl.onrender.com/user/login',{
                email:email,
                password:password
            })

            .then(res=>{
                // setLoading(false)
                console.log(res.data);
                localStorage.setItem('token',res.data.token)
                localStorage.setItem('userId',res.data._id)
                localStorage.setItem('channelName',res.data.channelName)
                localStorage.setItem('logoUrl',res.data.logoUrl)
            
                navigate('/dashboard')
                toast("welcome to MyTube")
                
            })
        } 
        catch (err) {
            console.log(err.response.data.error)
            toast.error(err.response.data.error)
        }
    }

    return (
        <div className='main-wrapper'>
            <div className='wrapper-header'>
                <img className='logo-image' src={logo} alt="Youtube Logo" />
                <h2 className='c-name'>MyTube</h2>
            </div>
            <form className='form-wrapper' onSubmit={submitHandler}>
                <input onChange={(e) => { setEmail(e.target.value); }} type='email' placeholder="Email" required />
                <input onChange={(e) => { setPassword(e.target.value); }} type='password' placeholder="Password" required />
                <button type='submit'>Submit</button>
                <Link to= '/signup'className='link'>Create your Account</Link>
            </form>
        </div>
    );
}

export default Login;
