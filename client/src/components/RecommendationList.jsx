import React from 'react';
import RecommendationCard from './RecommendationCard';

const RecommendationList = ({ recommendations, loading, error }) => {
if (loading) {
return (
    <div className="space-y-4">
    {[...Array(5)].map((_, index) => (
        <div key={index} className="bg-white rounded-lg shadow-md p-6 animate-pulse">
        <div className="flex items-start space-x-4">
            <div className="w-40 h-24 bg-gray-300 rounded"></div>
            <div className="flex-1">
            <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-gray-300 rounded w-1/2 mb-2"></div>
            <div className="h-3 bg-gray-300 rounded w-1/4"></div>
            </div>
        </div>
        </div>
    ))}
    </div>
);
}

if (error) {
return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
    <div className="text-red-600 text-lg font-medium mb-2">
        Failed to load recommendations
    </div>
    <p className="text-red-500 text-sm">{error}</p>
    </div>
);
}

if (!recommendations || recommendations.length === 0) {
return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
    <div className="text-gray-600 text-lg font-medium mb-2">
        No recommendations found
    </div>
    <p className="text-gray-500 text-sm">
        Try adjusting your preferences or check back later.
    </p>
    </div>
);
}

return (
<div className="space-y-4">
    <div className="mb-6">
    <h2 className="text-2xl font-bold text-gray-900 mb-2">
        Recommended for You
    </h2>
    <p className="text-gray-600">
        Found {recommendations.length} personalized recommendations
    </p>
    </div>
    
    {recommendations.map((recommendation, index) => (
    <RecommendationCard 
        key={recommendation.id || index} 
        recommendation={recommendation} 
    />
    ))}
</div>
);
};

export default RecommendationList;