import React from 'react';

const RecommendationCard = ({ recommendation }) => {
const { title, channel, url, thumbnail, difficulty, duration, confidence, content_type } = recommendation;

const formatDuration = (seconds) => {
if (!seconds) return 'N/A';
const hours = Math.floor(seconds / 3600);
const minutes = Math.floor((seconds % 3600) / 60);
return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
};

const getTypeIcon = (type) => {
switch(type) {
    case 'playlist': return '📋';
    case 'channel': return '📺';
    default: return '🎥';
}
};

const getDifficultyColor = (level) => {
switch(level) {
    case 'Beginner': return 'bg-green-100 text-green-800';
    case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
    case 'Advanced': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
}
};

return (
<div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 mb-4">
    <div className="flex items-start space-x-4">
    <img 
        src={thumbnail || '/api/placeholder/160/90'} 
        alt={title}
        className="w-40 h-24 object-cover rounded flex-shrink-0"
    />
    <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-2">
        <span className="text-lg">{getTypeIcon(content_type)}</span>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(difficulty)}`}>
            {difficulty || 'Beginner'}
        </span>
        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
            {Math.round((confidence || 0.5) * 100)}% match
        </span>
        </div>
        
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
        {title}
        </h3>
        
        <p className="text-sm text-gray-600 mb-3">
        by {channel || 'Unknown Channel'}
        </p>
        
        <div className="flex items-center justify-between">
        <span className="text-sm text-gray-500">
            Duration: {formatDuration(duration)}
        </span>
        
        <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
        >
            Watch on YouTube
        </a>
        </div>
    </div>
    </div>
</div>
);
};

export default RecommendationCard;