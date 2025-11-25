import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 shadow-md z-50 bg-white/90 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold uppercase flex items-center gap-2">
          <img src="logo.png" alt="Blue Ocean logo" className='w-12 h-12' />
          <span className="text-blue-600 text-2xl">Blue Ocean</span> Strategy
        </Link>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium">About</Link>
            </li>
            <li>
              <Link to="/app" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300">
                Try Out
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
