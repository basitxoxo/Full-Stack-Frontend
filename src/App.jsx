import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { useState } from 'react';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import AdminDashboard from './pages/AdminDashboard';
import Unauthorized from './pages/Unauthorized';
import NotFound from './pages/NotFound';
import AdminChangePassword from './pages/AdminChangePassword';

import reactLogo from './assets/react.svg';
import viteLogo from './assets/vite.svg';
import heroImg from './assets/hero.png';
import './App.css';
import ChangePassword from './pages/ChangePassword';
export default function App() {
  return (
    <BrowserRouter>

      <nav className="bg-white border-b border-gray-200 py-3 px-6 flex gap-4 text-sm font-medium text-gray-600 shadow-sm">
        <Link to="/" className="hover:text-blue-600 transition">Home</Link>
        <Link to="/login" className="hover:text-blue-600 transition">Login</Link>
        <Link to="/register" className="hover:text-blue-600 transition">Register</Link>
        <Link to="/profile" className="hover:text-blue-600 transition">Profile</Link>
        <Link to="/admin" className="hover:text-blue-600 transition">Admin</Link>
        <Link to="/welcome" className="hover:text-blue-600 transition"> Error Page </Link>
      </nav>

      <Routes>

  {/* Public */}
  <Route path="/" element={<Home />} />
  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />

  {/* Protected */}
  <Route path="/profile" element={<Profile />} />

  {/* Admin */}
  <Route path="/admin" element={<AdminDashboard />} />

  {/* Error Pages */}
  <Route path="/unauthorized" element={<Unauthorized />} />
  <Route path="*" element={<NotFound />} />

  <Route path="/admin/change-password" element={<AdminChangePassword />}/>
  <Route path="/change-password" element={<ChangePassword />} />
</Routes>
    </BrowserRouter>
  );
}

// Your original template component isolated into a clean sub-layout
function ViteWelcomeTemplate() {
  const [count, setCount] = useState(0);

  return (
    <div className="vite-template-wrapper p-6 bg-neutral-900 text-white min-h-screen">
      <section id="center">
        <div className="hero flex justify-center items-center gap-4 my-6">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework animate-spin-slow" alt="React logo" width="60" />
          <img src={viteLogo} className="vite" alt="Vite logo" width="60" />
        </div>
        <div className="text-center my-4">
          <h1 className="text-4xl font-extrabold mb-2">Get started</h1>
          <p className="text-gray-400">
            Edit <code className="bg-gray-800 px-1 py-0.5 rounded text-red-400">src/App.jsx</code> and save to test <code>HMR</code>
          </p>
        </div>
        <div className="flex justify-center my-4">
          <button
            type="button"
            className="counter bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded font-medium"
            onClick={() => setCount((count) => count + 1)}
          >
            Count is {count}
          </button>
        </div>
      </section>

      <div className="ticks my-6 border-t border-gray-800"></div>

      <section id="next-steps" className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <div id="docs" className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-2">Documentation</h2>
          <p className="text-gray-400 mb-4">Your questions, answered</p>
          <ul className="space-y-2">
            <li>
              <a href="https://vite.dev/" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-blue-400 hover:underline">
                <img className="logo" src={viteLogo} alt="" width="20" />
                Explore Vite
              </a>
            </li>
            <li>
              <a href="https://react.dev/" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-blue-400 hover:underline">
                <img className="button-icon" src={reactLogo} alt="" width="20" />
                Learn more
              </a>
            </li>
          </ul>
        </div>
        
        <div id="social" className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-2">Connect with us</h2>
          <p className="text-gray-400 mb-4">Join the Vite community</p>
          <ul className="grid grid-cols-2 gap-2 text-blue-400">
            <li><a href="https://github.com/vitejs/vite" target="_blank" rel="noreferrer" className="hover:underline">GitHub</a></li>
            <li><a href="https://chat.vite.dev/" target="_blank" rel="noreferrer" className="hover:underline">Discord</a></li>
            <li><a href="https://x.com/vite_js" target="_blank" rel="noreferrer" className="hover:underline">X.com</a></li>
            <li><a href="https://bsky.app/profile/vite.dev" target="_blank" rel="noreferrer" className="hover:underline">Bluesky</a></li>
          </ul>
        </div>
      </section>

      <div className="ticks my-6 border-t border-gray-800"></div>
      <section id="spacer" className="h-12"></section>
    </div>
  );
}