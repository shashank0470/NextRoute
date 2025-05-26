// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';

// const API_URL = 'http://localhost:5000/api';

// function RoadmapPage() {
// const { id } = useParams();
// const [roadmap, setRoadmap] = useState(null);
// const [loading, setLoading] = useState(true);
// const [error, setError] = useState(null);

// useEffect(() => {
// const fetchRoadmap = async () => {
//     try {
//     const response = await axios.get(`${API_URL}/roadmaps/${id}`);
//     setRoadmap(response.data);
//     setLoading(false);
//     } catch (err) {
//     setError('Failed to fetch roadmap');
//     setLoading(false);
//     }
// };

// fetchRoadmap();
// }, [id]);

// if (loading) {
// return <div className="text-center py-8">Loading roadmap...</div>;
// }

// if (error || !roadmap) {
// return (
//     <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
//     {error || 'Failed to load roadmap'}
//     </div>
// );
// }

// // Helper to format time
// const formatTime = (hours) => {
// if (hours < 1) {
//     return `${Math.round(hours * 60)} minutes`;
// }
// if (hours < 24) {
//     return `${Math.round(hours)} hours`;
// }
// const days = Math.round(hours / 24);
// return `${days} ${days === 1 ? 'day' : 'days'}`;
// };

// // Convert steps to timeline based on schedule
// const getTimelineText = () => {
// const { totalEstimatedHours, schedule } = roadmap;

// switch (schedule) {
//     case 'daily':
//     const hoursPerDay = 2; // Assuming 2 hours per day
//     return `${Math.ceil(totalEstimatedHours / hoursPerDay)} days at ${hoursPerDay} hours/day`;
//     case 'weekly':
//     const hoursPerWeek = 10; // Assuming 10 hours per week
//     return `${Math.ceil(totalEstimatedHours / hoursPerWeek)} weeks at ${hoursPerWeek} hours/week`;
//     case 'monthly':
//     const hoursPerMonth = 40; // Assuming 40 hours per month
//     return `${Math.ceil(totalEstimatedHours / hoursPerMonth)} months at ${hoursPerMonth} hours/month`;
//     default:
//     return `Total: ${formatTime(totalEstimatedHours)}`;
// }
// };

// return (
// <div className="max-w-4xl mx-auto">
//     <h1 className="text-3xl font-bold mb-2">{roadmap.name}</h1>

//     <div className="mb-6">
//     <div className="bg-blue-100 border-l-4 border-blue-500 p-4 mb-4">
//         <div className="flex justify-between flex-wrap">
//         <div>
//             <p className="font-semibold">Difficulty: {roadmap.difficultyLevel}</p>
//             <p>Total time: {formatTime(roadmap.totalEstimatedHours)}</p>
//         </div>
//         <div>
//             <p className="font-semibold">Timeline</p>
//             <p>{getTimelineText()}</p>
//         </div>
//         </div>
//     </div>
//     </div>

//     <div className="mb-6">
//     <h2 className="text-xl font-semibold mb-3">Technologies</h2>
//     <div className="flex flex-wrap gap-2">
//         {roadmap.technologies.map(tech => (
//         <span 
//             key={tech._id}
//             className="px-3 py-1 bg-gray-200 rounded-full text-sm"
//         >
//             {tech.name}
//         </span>
//         ))}
//     </div>
//     </div>

//     <div>
// <h2 className="text-xl font-semibold mb-4">Learning Path</h2>
//     <div className="space-y-6">
//         {roadmap.steps.sort((a, b) => a.order - b.order).map((step, index) => (
//         <div 
//             key={index}
//             className="bg-white p-5 border rounded-lg shadow-sm"
//         >
//             <div className="flex items-center gap-3 mb-2">
//             <div className="bg-blue-600 text-white rounded-full w-7 h-7 flex items-center justify-center text-sm font-medium">
//                 {index + 1}
//             </div>
//             <h3 className="text-lg font-medium">{step.name}</h3>
//             </div>

//             <p className="text-gray-600 mb-3">{step.description}</p>

//             <div className="flex flex-wrap gap-2 mb-2">
//             {step.technologies.map(tech => (
//                 <span 
//                 key={tech._id}
//                 className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs"
//                 >
//                 {tech.name}
//                 </span>
//             ))}
//             </div>

//             <div className="text-sm text-gray-500">
//             Estimated time: {formatTime(step.estimatedHours)}
//             </div>
//         </div>
//         ))}
//     </div>
//     </div>

//     <div className="mt-8 mb-4 text-center">
//     <button
//         onClick={() => window.print()}
//         className="bg-gray-800 hover:bg-gray-900 text-white font-medium py-2 px-6 rounded"
//     >
//         Export Roadmap
//     </button>
//     </div>
// </div>
// );
// }

// export default RoadmapPage;

//this is the file which give the correct time to complete a skill, the above gives wrong time 

// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';

// const API_URL = 'http://localhost:5000/api';

// function RoadmapPage() {
// const { id } = useParams();
// const [roadmap, setRoadmap] = useState(null);
// const [loading, setLoading] = useState(true);
// const [error, setError] = useState(null);

// useEffect(() => {
// const fetchRoadmap = async () => {
//     try {
//     const response = await axios.get(`${API_URL}/roadmaps/${id}`);
//     setRoadmap(response.data);
//     setLoading(false);
//     } catch (err) {
//     setError('Failed to fetch roadmap');
//     setLoading(false);
//     }
// };

// fetchRoadmap();
// }, [id]);

// if (loading) {
// return <div className="text-center py-8">Loading roadmap...</div>;
// }

// if (error || !roadmap) {
// return (
//     <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
//     {error || 'Failed to load roadmap'}
//     </div>
// );
// }

// const getTimeInfo = () => {
// const { totalEstimatedHours, schedule } = roadmap;

// switch (schedule) {
//     case 'daily':
//     const hoursPerDay = 2;
//     const totalDays = Math.ceil(totalEstimatedHours / hoursPerDay);
//     return {
//         totalTime: `${totalDays} days`,
//         timeline: `${totalDays} days at ${hoursPerDay} hours/day`
//     };

//     case 'weekly':
//     const hoursPerWeek = 10;
//     const totalWeeks = Math.ceil(totalEstimatedHours / hoursPerWeek);
//     return {
//         totalTime: `${totalWeeks} weeks`,
//         timeline: `${totalWeeks} weeks at ${hoursPerWeek} hours/week`
//     };

//     case 'monthly':
//     const hoursPerMonth = 40;
//     const totalMonths = Math.ceil(totalEstimatedHours / hoursPerMonth);
//     return {
//         totalTime: `${totalMonths} months`,
//         timeline: `${totalMonths} months at ${hoursPerMonth} hours/month`
//     };

//     default:
//     return {
//         totalTime: formatTime(totalEstimatedHours),
//         timeline: `Total: ${formatTime(totalEstimatedHours)}`
//     };
// }
// };

// const formatTime = (hours) => {
// if (hours < 1) return `${Math.round(hours * 60)} minutes`;
// if (hours < 24) return `${Math.round(hours)} hours`;
// const days = Math.round(hours / 24);
// return `${days} ${days === 1 ? 'day' : 'days'}`;
// };

// const { totalTime, timeline } = getTimeInfo();

// return (
// <div className="max-w-4xl mx-auto">
//     <h1 className="text-3xl font-bold mb-2">{roadmap.name}</h1>

//     <div className="mb-6">
//     <div className="bg-blue-100 border-l-4 border-blue-500 p-4 mb-4">
//         <div className="flex justify-between flex-wrap">
//         <div>
//             <p className="font-semibold">Difficulty: {roadmap.difficultyLevel}</p>
//             <p>Total time: {totalTime}</p>
//         </div>
//         <div>
//             <p className="font-semibold">Timeline</p>
//             <p>{timeline}</p>
//         </div>
//         </div>
//     </div>
//     </div>

//     <div className="mb-6">
//     <h2 className="text-xl font-semibold mb-3">Technologies</h2>
//     <div className="flex flex-wrap gap-2">
//         {roadmap.technologies.map(tech => (
//         <span key={tech._id} className="px-3 py-1 bg-gray-200 rounded-full text-sm">
//             {tech.name}
//         </span>
//         ))}
//     </div>
//     </div>

//     <div>
//     <h2 className="text-xl font-semibold mb-4">Learning Path</h2>
//     <div className="space-y-6">
//         {roadmap.steps.sort((a, b) => a.order - b.order).map((step, index) => (
//         <div key={index} className="bg-white p-5 border rounded-lg shadow-sm">
//             <div className="flex items-center gap-3 mb-2">
//             <div className="bg-blue-600 text-white rounded-full w-7 h-7 flex items-center justify-center text-sm font-medium">
//                 {index + 1}
//             </div>
//             <h3 className="text-lg font-medium">{step.name}</h3>
//             </div>
//             <p className="text-gray-600 mb-3">{step.description}</p>
//             <div className="flex flex-wrap gap-2 mb-2">
//             {step.technologies.map(tech => (
//                 <span key={tech._id} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
//                 {tech.name}
//                 </span>
//             ))}
//             </div>
//             <div className="text-sm text-gray-500">
//             Estimated time: {formatTime(step.estimatedHours)}
//             </div>
//         </div>
//         ))}
//     </div>
//     </div>

//     <div className="mt-8 mb-4 text-center">
//     <button
//         onClick={() => window.print()}
//         className="bg-gray-800 hover:bg-gray-900 text-white font-medium py-2 px-6 rounded"
//     >
//         Export Roadmap
//     </button>
//     </div>
// </div>
// );
// }

// export default RoadmapPage;



//this is the  file given by claude for making the ML works it includes the time correction also i think

import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

function RoadmapPage() {
const { id } = useParams();
const location = useLocation();
const [roadmap, setRoadmap] = useState(null);
const [recommendations, setRecommendations] = useState([]);
const [loading, setLoading] = useState(true);
const [loadingRecommendations, setLoadingRecommendations] = useState(false);
const [error, setError] = useState(null);

const userPreferences = location.state?.userPreferences;

const fetchRecommendations = useCallback(async () => {
setLoadingRecommendations(true);
try {
    const response = await axios.post(`${API_URL}/recommendations`, userPreferences);
    setRecommendations(response.data.data.recommendations);
} catch (err) {
    console.error('Failed to fetch recommendations:', err);
} finally {
    setLoadingRecommendations(false);
}
}, [userPreferences]);

useEffect(() => {
const fetchRoadmap = async () => {
    try {
    const response = await axios.get(`${API_URL}/roadmaps/${id}`);
    setRoadmap(response.data);
    setLoading(false);

    if (userPreferences) {
        fetchRecommendations();
    }
    } catch (err) {
    setError('Failed to fetch roadmap');
    setLoading(false);
    }
};

fetchRoadmap();
}, [id, userPreferences, fetchRecommendations]);

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

const getTimeInfo = () => {
const { totalEstimatedHours, schedule } = roadmap;

switch (schedule) {
    case 'daily':
    const hoursPerDay = 2;
    const totalDays = Math.ceil(totalEstimatedHours / hoursPerDay);
    return {
        totalTime: `${totalDays} days`,
        timeline: `${totalDays} days at ${hoursPerDay} hours/day`
    };
    case 'weekly':
    const hoursPerWeek = 10;
    const totalWeeks = Math.ceil(totalEstimatedHours / hoursPerWeek);
    return {
        totalTime: `${totalWeeks} weeks`,
        timeline: `${totalWeeks} weeks at ${hoursPerWeek} hours/week`
    };
    case 'monthly':
    const hoursPerMonth = 40;
    const totalMonths = Math.ceil(totalEstimatedHours / hoursPerMonth);
    return {
        totalTime: `${totalMonths} months`,
        timeline: `${totalMonths} months at ${hoursPerMonth} hours/month`
    };
    default:
    return {
        totalTime: formatTime(totalEstimatedHours),
        timeline: `Total: ${formatTime(totalEstimatedHours)}`
    };
}
};

const formatTime = (hours) => {
if (hours < 1) return `${Math.round(hours * 60)} minutes`;
if (hours < 24) return `${Math.round(hours)} hours`;
const days = Math.round(hours / 24);
return `${days} ${days === 1 ? 'day' : 'days'}`;
};

const { totalTime, timeline } = getTimeInfo();

return (
<div className="max-w-4xl mx-auto">
    <h1 className="text-3xl font-bold mb-2">{roadmap.name}</h1>

    <div className="mb-6">
    <div className="bg-blue-100 border-l-4 border-blue-500 p-4 mb-4">
        <div className="flex justify-between flex-wrap">
        <div>
            <p className="font-semibold">Difficulty: {roadmap.difficultyLevel}</p>
            <p>Total time: {totalTime}</p>
        </div>
        <div>
            <p className="font-semibold">Timeline</p>
            <p>{timeline}</p>
        </div>
        </div>
    </div>
    </div>

    <div className="mb-6">
    <h2 className="text-xl font-semibold mb-3">Technologies</h2>
    <div className="flex flex-wrap gap-2">
        {roadmap.technologies.map(tech => (
        <span key={tech._id} className="px-3 py-1 bg-gray-200 rounded-full text-sm">
            {tech.name}
        </span>
        ))}
    </div>
    </div>

    <div className="mb-8">
    <h2 className="text-xl font-semibold mb-4">Learning Path</h2>
    <div className="space-y-6">
        {roadmap.steps.sort((a, b) => a.order - b.order).map((step, index) => (
        <div key={index} className="bg-white p-5 border rounded-lg shadow-sm">
            <div className="flex items-center gap-3 mb-2">
            <div className="bg-blue-600 text-white rounded-full w-7 h-7 flex items-center justify-center text-sm font-medium">
                {index + 1}
            </div>
            <h3 className="text-lg font-medium">{step.name}</h3>
            </div>
            <p className="text-gray-600 mb-3">{step.description}</p>
            <div className="flex flex-wrap gap-2 mb-2">
            {step.technologies.map(tech => (
                <span key={tech._id} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
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

    {/* YouTube Recommendations Section */}
    <div className="mb-8">
    <h2 className="text-xl font-semibold mb-4">📺 Recommended Learning Resources</h2>

    {!userPreferences && (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4">
        To get personalized video recommendations, please select your preferences from the technology selection page.
        </div>
    )}

    {userPreferences && !recommendations.length && !loadingRecommendations && (
        <button
        onClick={fetchRecommendations}
        className="bg-red-600 hover:bg-red-700 text-black font-medium py-2 px-4 rounded mb-4"
        >
        Get YouTube Recommendations
        </button>
    )}

    {loadingRecommendations && (
        <div className="text-center py-4">
        <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
        <span className="ml-2">Finding best videos for you...</span>
        </div>
    )}

    {recommendations.length > 0 && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {recommendations.map((video) => (
            <div key={video.id} className="bg-white border rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
            <div className="p-4">
                <h3 className="font-medium text-sm mb-2 line-clamp-2">{video.title}</h3>
                <p className="text-xs text-gray-600 mb-2">{video.channel}</p>
                <p className="text-xs text-gray-500 mb-3 line-clamp-2">{video.description}</p>
                <div className="flex justify-between items-center text-xs text-gray-500 mb-3">
                <span>{video.duration}</span>
                <span>{video.views}</span>
                </div>
                <div className="flex justify-between items-center">
                <span className={`px-2 py-1 rounded text-xs ${
                    video.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                    video.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                }`}>
                    {video.difficulty}
                </span>
                <a
                    href={video.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-red-600 hover:bg-red-700 text-white text-xs px-3 py-1 rounded"
                >
                    Watch
                </a>
                </div>
            </div>
            </div>
        ))}
        </div>
    )}
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
