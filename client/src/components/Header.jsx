import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
return (
<header className="bg-gray-800 text-white py-4">
    <div className="container mx-auto px-4 flex justify-between items-center">
    <Link to="/" className="text-2xl font-bold">
        NextRoute
    </Link>
    <nav>
        <ul className="flex space-x-6">
        <li>
            <Link to="/" className="hover:text-gray-300">
            Home
            </Link>
        </li>
        <li>
            <Link to="/select" className="hover:text-gray-300">
            Create Roadmap
            </Link>
        </li>
        </ul>
    </nav>
    </div>
</header>
);
}

export default Header;