import React, { useState } from 'react';
import '../App.css';
import axios from 'axios';
import logo from '../assets/Y.T logo.png';
import { Link, useNavigate } from 'react-router-dom';  // Import useNavigate from react-router-dom
import { toast } from 'react-toastify';

const Signup = () => {
    const [channelName, setChannelName] = useState(''); 
    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState(''); 
    const [phone, setPhone] = useState(''); 
    const [logos, setLogo] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const [loading, setLoading] = useState(false);  // Added loading state

    const navigate = useNavigate();

    // File handler to preview image
    const fileHandler = (e) => {
        console.log(e.target.files[0]);
        setLogo(e.target.files[0]);
        setImageUrl(URL.createObjectURL(e.target.files[0]));  // Image preview
    }

    // Submit handler to handle form submission
    const submitHandler = async (e) => {
        e.preventDefault();
        
        setLoading(true);  // Set loading state to true before the request

        // Create a FormData object to send data and file
        const formData = new FormData();
        formData.append('channelName', channelName);
        formData.append('email', email);
        formData.append('phone', phone);
        formData.append('password', password);
        formData.append('logo', logos);

        try {
            const res = await axios.post('https://youtube-clone-backend-jwhl.onrender.com/user/signup', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'                      
                }
            })
            .then(res=>{
                console.log(res.data);
                setLoading(false);  // Set loading state to false after the request is complete
                navigate('/login'); 
                toast("Account is created");
            })
        } catch (err) {
            console.log(err);
            setLoading(false);  // Set loading state to false if there is an error
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
                <input onChange={(e) => { setChannelName(e.target.value); }} type='text' placeholder="Channel Name" required />
                <input onChange={(e) => { setEmail(e.target.value); }} type='email' placeholder="Email" required />
                <input onChange={(e) => { setPassword(e.target.value); }} type='password' placeholder="Password" required />
                <input onChange={(e) => { setPhone(e.target.value); }} type='text' placeholder="Phone" required />
                <input onChange={fileHandler} type='file' required />
               {imageUrl && <img className='preview-image' alt="logo-image" src={imageUrl} />}
                
                {/* Display loader while loading */}
                {loading ? <div className="loader"></div> : <button type='submit'>Submit</button>}
                
                <Link to='/login' className='link'>Login with your Account</Link>
            </form>
        </div>
    );
}

export default Signup;
