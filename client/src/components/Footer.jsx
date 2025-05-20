import React from 'react';

function Footer() {
return (
<footer className="bg-gray-800 text-white py-4">
    <div className="container mx-auto px-4 text-center">
    <p>© {new Date().getFullYear()} DevRoadmap - Your Programming Learning Path</p>
    </div>
</footer>
);
}

export default Footer;