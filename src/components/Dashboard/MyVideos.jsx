import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../App.css';

const MyVideos = () => {
  const navigate = useNavigate();
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    getOwnVideo();
  }, []);

  const getOwnVideo = () => {
    axios
      .get('https://youtube-clone-backend-jwhl.onrender.com/video/own-video', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .then((res) => {
        setVideos(res.data.videos.reverse());
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDelete = (videoId) => {
    if (window.confirm('Are you sure you want to delete this video?')) {
      axios
        .delete(`https://youtube-clone-backend-jwhl.onrender.com/video/${videoId}`, {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        })
        .then(() => {
          alert('Video deleted successfully!');
          getOwnVideo();
        })
        .catch((err) => {
          console.log(err);
          alert('Failed to delete the video.');
        });
    }
  };

  // ✅ Edit Video Function
  const handleEdit = (video) => {
    const newTitle = prompt('Enter new title:', video.tittle);
    const newDescription = prompt('Enter new description:', video.description);
    const newCategory = prompt('Enter new category:', video.category);
    const newTags = prompt('Enter new tags (comma-separated):', video.tags.join(", "));

    if (newTitle && newDescription && newCategory && newTags) {
      axios
        .put(
          `https://youtube-clone-backend-jwhl.onrender.com/video/${video._id}`,
          {
            title: newTitle,
            description: newDescription,
            category: newCategory,
            tags: newTags,
          },
          {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
          }
        )
        .then(() => {
          alert('Video updated successfully!');
          getOwnVideo();
        })
        .catch((err) => {
          console.log(err);
          alert('Failed to update the video.');
        });
    }
  };

  return (
    <div className='my-videos-container'>
      <table className='videos-table'>
        <thead>
          <tr>
            <th>Videos</th>
            <th>Title</th>
            <th>Date</th>
            <th>Views</th>
            <th>Like vs Dislike</th>
            <th>Delete</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {videos.map((video) => (
            <tr key={video._id}>
              <td>
                <div
                  onClick={() =>
                    navigate('/Video', {
                      state: { videoUrl: video.videoUrl, user_id: video.user_id, video },
                    })
                  }
                >
                  <img alt='thumbnail' src={video.thumbnailUrl} />
                </div>
              </td>
              <td>
                <div
                  onClick={() =>
                    navigate('/Video', {
                      state: { video: video, videoUrl: video.videoUrl, user_id: video.user_id },
                    })
                  }
                >
                  {video.tittle}
                </div>
              </td>
              <td>{video.createdAt}</td>
              <td>{video.views}</td>
              <td>
                {video.likes} / {video.dislikes}
              </td>
              <td>
                <button onClick={() => handleDelete(video._id)}>Delete</button>
              </td>
              <td>
                <button onClick={() => handleEdit(video)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyVideos;
