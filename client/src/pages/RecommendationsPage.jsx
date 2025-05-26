import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import RecommendationList from '../components/RecommendationList';
import LoadingSpinner from '../components/LoadingSpinner';
import { RecommendationService } from '../services/api.service';

const RecommendationsPage = () => {
const [recommendations, setRecommendations] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
const [userPreferences, setUserPreferences] = useState(null);

const location = useLocation();
const navigate = useNavigate();

useEffect(() => {
const preferences = location.state?.preferences;

if (!preferences) {
    navigate('/select');
    return;
}

setUserPreferences(preferences);
fetchRecommendations(preferences);
}, [location.state, navigate]);

const fetchRecommendations = async (preferences) => {
try {
    setLoading(true);
    setError(null);

    const response = await RecommendationService.getRecommendations(preferences);

    if (response.data.success) {
    setRecommendations(response.data.data.recommendations);
    } else {
    setError(response.data.message || 'Failed to get recommendations');
    }
} catch (err) {
    setError(err.message || 'An error occurred while fetching recommendations');
    console.error('Recommendation error:', err);
} finally {
    setLoading(false);
}
};

const handleRetry = () => {
if (userPreferences) {
    fetchRecommendations(userPreferences);
}
};

const handleBackToSelection = () => {
navigate('/select');
};

return (
<div className="max-w-4xl mx-auto">
    <div className="mb-8">
    <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-900">
        Your Learning Recommendations
        </h1>
        <button
        onClick={handleBackToSelection}
        className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
        >
        Back to Selection
        </button>
    </div>

    {userPreferences && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <h3 className="font-semibold text-blue-900 mb-2">Your Preferences:</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
            <span className="font-medium text-blue-800">Technology:</span>
            <span className="ml-2 text-blue-700">{userPreferences.technology}</span>
            </div>
            <div>
            <span className="font-medium text-blue-800">Skill Level:</span>
            <span className="ml-2 text-blue-700">{userPreferences.skillLevel}</span>
            </div>
            <div>
            <span className="font-medium text-blue-800">Schedule:</span>
            <span className="ml-2 text-blue-700">{userPreferences.schedulePreference}</span>
            </div>
        </div>
        </div>
    )}
    </div>

    {loading ? (
    <LoadingSpinner message="Finding the best learning resources for you..." />
    ) : error ? (
    <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <div className="text-red-600 text-lg font-medium mb-2">
        Something went wrong
        </div>
        <p className="text-red-500 text-sm mb-4">{error}</p>
        <button
        onClick={handleRetry}
        className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
        >
        Try Again
        </button>
    </div>
    ) : (
    <RecommendationList 
        recommendations={recommendations}
        loading={loading}
        error={error}
    />
    )}
</div>
);
};

export default RecommendationsPage;



