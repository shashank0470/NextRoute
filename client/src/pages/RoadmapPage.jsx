import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

function RoadmapPage() {
const { id } = useParams();
const [roadmap, setRoadmap] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

useEffect(() => {
const fetchRoadmap = async () => {
    try {
    const response = await axios.get(`${API_URL}/roadmaps/${id}`);
    setRoadmap(response.data);
    setLoading(false);
    } catch (err) {
    setError('Failed to fetch roadmap');
    setLoading(false);
    }
};

fetchRoadmap();
}, [id]);

if (loading) {
return <div className="text-center py-8">Loading roadmap...</div>;
}

if (error || !roadmap) {
return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
    {error || 'Failed to load roadmap'}
    </div>
);
}

// Helper to format time
const formatTime = (hours) => {
if (hours < 1) {
    return `${Math.round(hours * 60)} minutes`;
}
if (hours < 24) {
    return `${Math.round(hours)} hours`;
}
const days = Math.round(hours / 24);
return `${days} ${days === 1 ? 'day' : 'days'}`;
};

// Convert steps to timeline based on schedule
const getTimelineText = () => {
const { totalEstimatedHours, schedule } = roadmap;

switch (schedule) {
    case 'daily':
    const hoursPerDay = 2; // Assuming 2 hours per day
    return `${Math.ceil(totalEstimatedHours / hoursPerDay)} days at ${hoursPerDay} hours/day`;
    case 'weekly':
    const hoursPerWeek = 10; // Assuming 10 hours per week
    return `${Math.ceil(totalEstimatedHours / hoursPerWeek)} weeks at ${hoursPerWeek} hours/week`;
    case 'monthly':
    const hoursPerMonth = 40; // Assuming 40 hours per month
    return `${Math.ceil(totalEstimatedHours / hoursPerMonth)} months at ${hoursPerMonth} hours/month`;
    default:
    return `Total: ${formatTime(totalEstimatedHours)}`;
}
};

return (
<div className="max-w-4xl mx-auto">
    <h1 className="text-3xl font-bold mb-2">{roadmap.name}</h1>
    
    <div className="mb-6">
    <div className="bg-blue-100 border-l-4 border-blue-500 p-4 mb-4">
        <div className="flex justify-between flex-wrap">
        <div>
            <p className="font-semibold">Difficulty: {roadmap.difficultyLevel}</p>
            <p>Total time: {formatTime(roadmap.totalEstimatedHours)}</p>
        </div>
        <div>
            <p className="font-semibold">Timeline</p>
            <p>{getTimelineText()}</p>
        </div>
        </div>
    </div>
    </div>
    
    <div className="mb-6">
    <h2 className="text-xl font-semibold mb-3">Technologies</h2>
    <div className="flex flex-wrap gap-2">
        {roadmap.technologies.map(tech => (
        <span 
            key={tech._id}
            className="px-3 py-1 bg-gray-200 rounded-full text-sm"
        >
            {tech.name}
        </span>
        ))}
    </div>
    </div>
    
    <div>
<h2 className="text-xl font-semibold mb-4">Learning Path</h2>
    <div className="space-y-6">
        {roadmap.steps.sort((a, b) => a.order - b.order).map((step, index) => (
        <div 
            key={index}
            className="bg-white p-5 border rounded-lg shadow-sm"
        >
            <div className="flex items-center gap-3 mb-2">
            <div className="bg-blue-600 text-white rounded-full w-7 h-7 flex items-center justify-center text-sm font-medium">
                {index + 1}
            </div>
            <h3 className="text-lg font-medium">{step.name}</h3>
            </div>
            
            <p className="text-gray-600 mb-3">{step.description}</p>
            
            <div className="flex flex-wrap gap-2 mb-2">
            {step.technologies.map(tech => (
                <span 
                key={tech._id}
                className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs"
                >
                {tech.name}
                </span>
            ))}
            </div>
            
            <div className="text-sm text-gray-500">
            Estimated time: {formatTime(step.estimatedHours)}
            </div>
        </div>
        ))}
    </div>
    </div>
    
    <div className="mt-8 mb-4 text-center">
    <button
        onClick={() => window.print()}
        className="bg-gray-800 hover:bg-gray-900 text-white font-medium py-2 px-6 rounded"
    >
        Export Roadmap
    </button>
    </div>
</div>
);
}

export default RoadmapPage;