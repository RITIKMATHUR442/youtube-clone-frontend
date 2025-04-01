import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faVideo, faUpload, faSignOutAlt, faHistory, faBell, faThumbsUp, faCog } from '@fortawesome/free-solid-svg-icons';
import './Dashboard.css'
import ashish from '../../assets/ashish.png';
import bbki from '../../assets/bbki.png';
import carry from '../../assets/carry.png';
import technical from '../../assets/technical.png';
import triggered from '../../assets/triggered.png';
import yt from '../../assets/Y.T logo.png';



const Dashboard = () => {
  const location = useLocation();
  return (
    <div className='dashboard-container flex h-screen'>
      <div className='side-nav w-64 bg-gray-900 text-white p-4 flex flex-col justify-between shadow-2xl'>
        {/* Profile Section */}
        <h2>MyTube <img src={yt} alt="youtube link" className="w-10 h-10 rounded-full" /></h2>
        <div className='profile-container flex items-center space-x-3 mb-6'>
          <img 
            src={localStorage.getItem('logoUrl')} 
            alt='logo' 
            className='w-12 h-12 rounded-full border-2 border-gray-500' 
          />
          <h2 className='text-xl font-semibold'>{localStorage.getItem('channelName')}</h2>
        </div>

        {/* Menu Section */}
        <div className='menu-container space-y-4'>
          <Link to='/dashboard/home' className={`menu-link flex items-center gap-3 p-3 rounded-md hover:bg-gray-700 transition duration-300 ${location.pathname === '/dashboard/home' ? 'bg-gray-700' : ''}`}>
            <FontAwesomeIcon icon={faHouse} /> Home
          </Link>

          <Link to='/dashboard/my-videos' className={`menu-link flex items-center gap-3 p-3 rounded-md hover:bg-gray-700 transition duration-300 ${location.pathname === '/dashboard/my-videos' ? 'bg-gray-700' : ''}`}>
            <FontAwesomeIcon icon={faVideo} /> My Videos
          </Link>

          <Link to='/dashboard/upload' className={`menu-link flex items-center gap-3 p-3 rounded-md hover:bg-gray-700 transition duration-300 ${location.pathname === '/dashboard/upload' ? 'bg-gray-700' : ''}`}>
            <FontAwesomeIcon icon={faUpload} /> Upload Video
          </Link>

          <div to='/dashboard/history' className='menu-link flex items-center gap-3 p-3 rounded-md hover:bg-gray-700 transition duration-300'>
            <FontAwesomeIcon icon={faHistory} /> History
          </div>

          <div to='/dashboard/notifications' className='menu-link flex items-center gap-3 p-3 rounded-md hover:bg-gray-700 transition duration-300'>
            <FontAwesomeIcon icon={faBell} /> Notifications
          </div>

          <div to='/dashboard/liked-videos' className='menu-link flex items-center gap-3 p-3 rounded-md hover:bg-gray-700 transition duration-300'>
            <FontAwesomeIcon icon={faThumbsUp} /> Liked Videos
          </div>

          <div to='/dashboard/settings' className='menu-link flex items-center gap-3 p-3 rounded-md hover:bg-gray-700 transition duration-300'>
            <FontAwesomeIcon icon={faCog} /> Settings
          </div>

          <Link to='/login' className='menu-link flex items-center gap-3 p-3 rounded-md hover:bg-red-600 transition duration-300'>
  <FontAwesomeIcon icon={faSignOutAlt} /> Logout
</Link>
        </div>

        {/* Subscribed List Section */}
        <div className="subscribed-list mt-8">
          <h3 className="text-lg font-semibold mb-4">SUBSCRIBED</h3>
          
          {/* Subscribed users */}
          <a href="https://www.youtube.com/@ashishchanchlanivines" target="_blank" rel="noopener noreferrer" className="side-link flex items-center space-x-2 mb-4">
            <img src={ashish} alt="Ashish Chanchlani" className="w-10 h-10 rounded-full" />
            <p>Ashish Chanchlani</p>
          </a>

          <a href="https://www.youtube.com/@BBKiVines" target="_blank" rel="noopener noreferrer" className="side-link flex items-center space-x-2 mb-4">
            <img src={bbki} alt="BB Ki Vines" className="w-10 h-10 rounded-full" />
            <p>BB Ki Vines</p>
          </a>

          <a href="https://www.youtube.com/@CarryMinati" target="_blank" rel="noopener noreferrer" className="side-link flex items-center space-x-2 mb-4">
            <img src={carry} alt="CarryMinati" className="w-10 h-10 rounded-full" />
            <p>CarryMinati</p>
          </a>

          <a href="https://www.youtube.com/@TechnicalGuruji" target="_blank" rel="noopener noreferrer" className="side-link flex items-center space-x-2 mb-4">
            <img src={technical} alt="Technical Guruji" className="w-10 h-10 rounded-full" />
            <p>Technical Guruji</p>
          </a>

          <a href="https://www.youtube.com/@triggeredinsaan" target="_blank" rel="noopener noreferrer" className="side-link flex items-center space-x-2">
            <img src={triggered} alt="Triggered Insaan" className="w-10 h-10 rounded-full" />
            <p>Triggered Insaan</p>
          </a>
        </div>

      </div>

      {/* Content Section */}
      <div className='content-container flex-1 bg-gray-100 p-6 overflow-auto'>
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;





