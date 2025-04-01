import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './Upload.css';

const Upload = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [tags, setTags] = useState('');
    const [video, setVideo] = useState(null);
    const [thumbnail, setThumbnail] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [loading, setLoading] = useState(false); // Loader state

    const navigate = useNavigate();

    const videoHandler = (e) => {
        setVideo(e.target.files[0]);
    };

    const thumbnailHandler = (e) => {
        setThumbnail(e.target.files[0]);
        setImageUrl(URL.createObjectURL(e.target.files[0]));
    };

    const submitHandler = (e) => {
        e.preventDefault();
        setLoading(true); // Show loader

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('category', category);
        formData.append('tags', tags);
        formData.append('video', video);
        formData.append('thumbnail', thumbnail);

        axios.post('https://youtube-clone-backend-jwhl.onrender.com/video/upload', formData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        })
        .then(res => {
            console.log(res.data);
            toast('Video is uploaded');
            navigate('/dashboard/my-videos');
        })
        .catch(err => {
            console.log(err);
            toast.error(err.response?.data?.error || 'An unexpected error occurred.');
        })
        .finally(() => {
            setLoading(false); // Hide loader after upload
        });
    };

    return (
        <div className='upload-container'>
            <h2>Upload Video</h2>
            <form onSubmit={submitHandler} className='upload-form'>
                <input 
                    onChange={(e) => setTitle(e.target.value)} 
                    placeholder='Title' 
                    value={title}
                />
                <textarea 
                    onChange={(e) => setDescription(e.target.value)} 
                    placeholder='Description'
                    value={description}
                ></textarea>

                <select 
                    onChange={(e) => setCategory(e.target.value)} 
                    value={category}
                    required
                >
                    <option value=''>Select Category</option>
                    <option value='science'>Science</option>
                    <option value='education'>Education</option>
                    <option value='motivation'>Motivation</option>
                    <option value='technology'>Technology</option>
                    <option value='entertainment'>Entertainment</option>
                    <option value='stories'>Stories</option>
                </select>

                <textarea 
                    onChange={(e) => setTags(e.target.value)} 
                    placeholder='Tags'
                    value={tags}
                ></textarea>

                <label>Select Video</label>
                <input onChange={videoHandler} type='file' />

                <label>Thumbnail</label>
                <input onChange={thumbnailHandler} type='file' />
                {imageUrl && <img className='thumbnail' src={imageUrl} alt='thumbnail' />}

                <button type='submit' disabled={loading}> 
                    {loading ? 'Uploading...' : 'Upload'}
                </button>
                {loading && <div className='loader'></div>} {/* Loader */}
            </form>
        </div>
    );
};

export default Upload;