import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center p-6">
      <h1 className="text-9xl font-extrabold text-gray-300 tracking-widest">404</h1>
      <div className="bg-blue-600 text-white px-2 text-sm rounded rotate-12 absolute mb-16">
        Page Not Found
      </div>
      <Link to="/" className="text-blue-600 hover:underline font-medium">
        Back to Home
      </Link>
    </div>
  );
}