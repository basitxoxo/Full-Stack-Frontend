import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Unauthorized() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-yellow-50 text-center p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">403 - Access Denied</h1>
      <p className="text-gray-600 max-w-md mb-6">
        You are authenticated, but you do not have the administrative staff privileges required to view this area.
      </p>
      <button 
        onClick={() => navigate('/')} 
        className="bg-gray-800 hover:bg-gray-900 text-white font-medium py-2 px-4 rounded transition"
      >
        Go Back Home
      </button>
    </div>
  );
}