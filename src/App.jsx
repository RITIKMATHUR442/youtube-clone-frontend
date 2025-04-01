import { Component } from 'react'
import './App.css'
import Login from './components/Login'
import Signup from './components/Signup'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Dashboard from './components/Dashboard/Dashboard'
import Home from './components/Dashboard/Home'
import Upload from './components/Dashboard/Upload'
import MyVideos from './components/Dashboard/MyVideos'
import Video from './components/Video'
import VideoDetails from './components/Dashboard/VideoDetails'
import Sidenav from './components/Dashboard/Sidenav'

function App() {
  const myRoutes = createBrowserRouter([
    { path: '', Component: Signup },
    { path: '/signup', Component: Signup },
    { path: '/login', Component: Login },
    {
      path: '/dashboard',
      Component: Dashboard,
      children: [
        { path: '', Component: Home },
        { path: 'home', Component: Home },
        { path: 'upload', Component: Upload },
        { path: 'my-videos', Component: MyVideos },
        { path: 'video', Component: Video }, // ✅ Added Video route here
        { path: 'videos/:id', Component: VideoDetails }, // Uncomment if needed
      ],
    },
    {
      path: '/sidenav',
      Component: Sidenav,
      children: [{ path: 'video', Component: Video }],
    },
    { path: '/video', Component: Video }, // ✅ Added this for direct access
  ])

  return (
    <div>
      <RouterProvider router={myRoutes} />
      <ToastContainer />
    </div>
  )
}

export default App
