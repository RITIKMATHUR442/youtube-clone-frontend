import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import './Video.css';
import Dashboard from '../components/Dashboard/Dashboard.jsx'; // Importing the sidebar component
import { Navbar } from '../components/Dashboard/Home'; // Import the Navbar component from Home.jsx

const Video = () => {
  const location = useLocation();
  const [isExpanded, setExpanded] = useState(false);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [likes, setLikes] = useState(location.state?.video.likes || 0);
  const [dislikes, setDislikes] = useState(location.state?.video.dislikes || 0);
  const [views, setViews] = useState(location.state?.video.views || 0);
  const [subscribed, setSubscribed] = useState(false);
  const [subscribers, setSubscribers] = useState(location.state?.user_id?.subscribers || 0);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]); // Default to empty array to prevent undefined errors
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingCommentId, setEditingCommentId] = useState(null); // Store the commentId being edited
  const [searchQuery, setSearchQuery] = useState(''); // State to store search query

  useEffect(() => {
    if (location.state?.video._id) {
      incrementView(location.state.video._id);
    }
    fetchComments();  // Fetch comments when the video is loaded
  }, [location.state]);

  const incrementView = async (videoId) => {
    try {
      const response = await axios.put(`https://youtube-clone-backend-jwhl.onrender.com/video/views/${videoId}`);
      if (response.status === 200) {
        setViews((prevViews) => prevViews + 1);
      }
    } catch (error) {
      console.error('Error increasing view count:', error);
    }
  };

  const fetchComments = async () => {
    try {
      const videoId = location.state.video._id;
      const response = await axios.get(`https://youtube-clone-backend-jwhl.onrender.com/comment/${videoId}`);
      if (response.status === 200) {
        setComments(response.data.commentsList || []); // Ensure comments is always an array
      }
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const handleAddComment = async () => {
    if (comment.trim()) {
      if (editingIndex !== null) {
        // Update the comment
        try {
          const videoId = location.state.video._id;
          const response = await axios.put(
            `https://youtube-clone-backend-jwhl.onrender.com/comment/${editingCommentId}`,
            { commentText: comment },
            { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
          );

          if (response.status === 200) {
            const updatedComment = response.data.updatedComment;
            const updatedComments = [...comments];
            updatedComments[editingIndex] = updatedComment; // Update the comment in the array
            setComments(updatedComments);
            setComment('');
            setEditingIndex(null);
            setEditingCommentId(null); // Reset the commentId
          }
        } catch (error) {
          console.error('Error updating comment:', error);
        }
      } else {
        // Add new comment
        try {
          const videoId = location.state.video._id;
          const response = await axios.post(
            `https://youtube-clone-backend-jwhl.onrender.com/comment/new-comment/${videoId}`,
            { commentText: comment },
            { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
          );

          if (response.status === 200) {
            const newComment = response.data.newComment;
            setComments([newComment, ...comments]); // Add the new comment at the start
            setComment('');
          }
        } catch (error) {
          console.error('Error posting comment:', error);
        }
      }
    }
  };

  const handleEditComment = (index, commentId) => {
    setComment(comments[index].commentText);
    setEditingIndex(index);
    setEditingCommentId(commentId); // Set the commentId for editing
  };

  const handleDeleteComment = async (index, commentId) => {
    try {
      const response = await axios.delete(
        `https://youtube-clone-backend-jwhl.onrender.com/comment/${commentId}`,
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );

      if (response.status === 200) {
        const updatedComments = comments.filter((_, i) => i !== index);
        setComments(updatedComments);
      }
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  const handleLike = async () => {
    try {
      const videoId = location.state.video._id;
      const response = await axios.put(
        `https://youtube-clone-backend-jwhl.onrender.com/video/like/${videoId}`,
        {},
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      
      if (response.status === 200) {
        setLiked(true);
        setDisliked(false); // Prevent the user from disliking after liking
        setLikes(likes + 1); // Increment like count
      }
    } catch (error) {
      console.error('Error liking the video:', error);
    }
  };

  const handleDislike = async () => {
    try {
      const videoId = location.state.video._id;
      const response = await axios.put(
        `https://youtube-clone-backend-jwhl.onrender.com/video/dislike/${videoId}`,
        {},
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      
      if (response.status === 200) {
        setDisliked(true);
        setLiked(false); // Prevent the user from liking after disliking
        setDislikes(dislikes + 1); // Increment dislike count
      }
    } catch (error) {
      console.error('Error disliking the video:', error);
    }
  };

  const handleSubscribe = async () => {
    try {
      const response = await axios.post(
        `https://youtube-clone-backend-jwhl.onrender.com/user/subscribe/${location.state.user_id._id}`,
        {},
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );

      if (response.status === 200) {
        setSubscribed(true);
        setSubscribers(subscribers + 1);
      }
    } catch (error) {
      console.error('Error subscribing to channel:', error);
    }
  };

  const handleUnsubscribe = async () => {
    try {
      const response = await axios.post(
        `https://youtube-clone-backend-jwhl.onrender.com/user/unsubscribe/${location.state.user_id._id}`,
        {},
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );

      if (response.status === 200) {
        setSubscribed(false);
        setSubscribers(subscribers - 1);
      }
    } catch (error) {
      console.error('Error unsubscribing from channel:', error);
    }
  };

  if (!location.state) {
    return <div>No video data available</div>;
  }

  return (
    <div className='pageContainer'>
      <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <div className='wrapper'>
        <div className='video-and-comment'>
          <video controls className='video-box'>
            <source src={location.state.videoUrl} />
          </video>
          <h3>{location.state.video.tittle || 'No Title Available'}</h3>
          <p>
            {views} views
            <button className='like-btn' onClick={handleLike} disabled={liked}>Like ({likes})</button>
            <button className='dislike-btn' onClick={handleDislike} disabled={disliked}>Dislike ({dislikes})</button>
          </p>
        </div>
        <div className='channel-info'>
          <img className='channel-logo' alt='logo' src={location.state.video.thumbnailUrl} />
          <div>
            <p>{location.state.user_id?.channelName} <span className='subscribers'>
              {subscribers} subscribers</span></p>
          </div>
          <button className='subscribe-btn' onClick={subscribed ? handleUnsubscribe : handleSubscribe}>
            {subscribed ? 'Unsubscribe' : 'Subscribe'}
          </button>
          <div>
            <p className='description'>{location.state.video.description}</p>
          </div>
        </div>

        <div className='comment-section'>
          <p>Add Comment</p>
          <input
            type='text'
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder='Add a comment...'
          />
          {comment && (
            <button onClick={handleAddComment}>{editingIndex !== null ? 'Update' : 'Post'}</button>
          )}
          <ul>
            {comments.map((c, index) => (
              <li key={index}>
                {c.commentText}
                <button onClick={() => handleEditComment(index, c._id)}>Edit</button>
                <button onClick={() => handleDeleteComment(index, c._id)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Video;