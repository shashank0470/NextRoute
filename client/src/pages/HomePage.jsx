import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
return (
<div className="max-w-4xl mx-auto">
    <section className="text-center py-12">
    <h1 className="text-4xl font-bold mb-4">Plan Your Programming Journey</h1>
    <p className="text-xl mb-8">
        Create personalized roadmaps for learning programming languages and technologies.
    </p>
    <Link 
        to="/select" 
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-lg"
    >
        Create Your Roadmap
    </Link>
    </section>
    
    <section className="py-8">
    <h2 className="text-2xl font-bold mb-6">How It Works</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-3">1. Select Technologies</h3>
        <p>Choose the programming languages and frameworks you want to learn.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-3">2. Get Your Roadmap</h3>
        <p>Our ML algorithm creates a personalized learning path just for you.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-3">3. Track Your Progress</h3>
        <p>Follow your roadmap and track completion as you learn.</p>
        </div>
    </div>
    </section>
</div>
);
}

export default HomePage;