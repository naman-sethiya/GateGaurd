import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="w-[95%] mx-auto px-3 py-4 bg-gray-800 min-h-screen flex flex-col items-center justify-center">
      <div className="LogoHeading flex items-center gap-5 border-2 p-2 mb-4 rounded-[10px] bg-gradient-to-r from-white to-blue-200">
        <img src="https://event.iitg.ac.in/icann2019/Proceedings_LaTeX/2019/IITG_logo.png" alt="IITGLOGO" height={80} width={80} />
        <h1 className="text-[1.6rem] font-bold text-gray-700">Indian Institute of Technology Guwahati</h1>
      </div>
      <div className="flex flex-col items-center gap-4">
        <span className="text-blue-500 text-6xl font-bold">404</span>
        <span className="text-xl text-cyan-200">Page Not Found</span>
        <p className="text-gray-400">Sorry, the page you're looking for does not exist.</p>
        <Link to="/" className="mt-4">
          <button className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold leading-7 text-white hover:bg-indigo-500">
            Go Back to Home <span className="text-xl">←</span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
