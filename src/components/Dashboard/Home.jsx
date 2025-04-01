import React, { useState, useEffect } from 'react';
import './Home.css';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import ShowVideo from './ShowVideo';
import { FaSearch, FaBell, FaUserCircle, FaHome, FaVideo, FaUpload, FaSignOutAlt } from 'react-icons/fa';
import yt from '../../assets/Y.T logo.png';

// Navbar Component
export const Navbar = ({ searchQuery, setSearchQuery }) => {
  const location = useLocation();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown); // Toggle dropdown visibility
  };

  return (
    <div className="navbar">
      <div className="navbar_logo">
        <Link to="/" style={{ textDecoration: 'none', color: 'black' }}>
          <h1>MyTube <img src={yt} alt="youtube link" className="w-10 h-10 rounded-full" /></h1>
        </Link>
      </div>

      <div className="navbar_search">
        <input 
          type="text" 
          placeholder="Search" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <FaSearch className="search_icon" />
      </div>

      <div className="navbar_links">
        <Link to='/dashboard/home' className={`menu-link ${location.pathname === '/dashboard/home' ? 'active-link' : ''}`}>
          <FaHome /> Home
        </Link>
        <Link to='/dashboard/my-videos' className={`menu-link ${location.pathname === '/dashboard/my-videos' ? 'active-link' : ''}`}>
          <FaVideo /> My Videos
        </Link>
        <Link to='/dashboard/upload' className={`menu-link ${location.pathname === '/dashboard/upload' ? 'active-link' : ''}`}>
          <FaUpload /> Upload Video
        </Link>
      </div>

      <div className="navbar_icons">
        <FaBell className="navbar_icon" />

        <div className="user_dropdown">
          <FaUserCircle className="navbar_icon" onClick={handleDropdownToggle} style={{ cursor: 'pointer' }} />
          {showDropdown && (
            <div className="dropdown_menu">
              <Link to='/login' className='menu-link flex items-center gap-3 p-3 rounded-md hover:bg-red-600 transition duration-300'>
                <FaSignOutAlt /> Logout
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Home = () => {
  const [videos, setVideos] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOption, setSelectedOption] = useState('All');
  const navigate = useNavigate();

  const options = [
    "All", "Twenty20 Cricket", "Music", "Live", "Mixes", "Gaming", "Debates", "Coke Studio", "Democracy", "Drama", "Comedy", "Entertainment"
  ];

  useEffect(() => {
    fetch('https://youtube-clone-backend-jwhl.onrender.com/video/all-video', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => response.json())
    .then((data) => {
      setVideos(data.allvideos);
    });
  }, []);

  const filteredVideos = videos.filter((video) => {
    const title = video.title || '';
    const description = video.description || '';
    const tags = Array.isArray(video.tags) ? video.tags.join(' ') : (video.tags || '');

    const matchesSearchQuery =
      title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesOption =
      selectedOption === 'All' ||
      tags.toLowerCase().includes(selectedOption.toLowerCase());

    return matchesSearchQuery && matchesOption;
  });

  return (
    <div className="homePage">
      <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <div className="homePage_options">
        {options.map((item, index) => (
          <div 
            key={index} 
            className={`homePage_option ${selectedOption === item ? 'active-option' : ''}`}
            onClick={() => setSelectedOption(item)}
          >
            {item}
          </div>
        ))}
      </div>

      <div className="homePage_videoList">
        {filteredVideos.map((video) => (
          <div 
            key={video._id} 
            className="videoWrapper"
            onClick={() =>
              navigate('/Video', {
                state: { videoUrl: video.videoUrl, user_id: video.user_id, video },
              })
            }
          >
            <ShowVideo videoData={video} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
