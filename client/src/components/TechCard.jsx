import React from 'react';

function TechCard({ tech, selected, onClick }) {
const difficultyColor = () => {
if (tech.difficulty <= 3) return 'bg-green-100 text-green-800';
if (tech.difficulty <= 6) return 'bg-yellow-100 text-yellow-800';
return 'bg-red-100 text-red-800';
};

return (
<div 
    className={`p-4 border rounded-lg cursor-pointer transition duration-200 ${
    selected ? 'bg-blue-100 border-blue-500' : 'bg-white hover:bg-gray-50'
    }`}
    onClick={onClick}
>
    <h3 className="font-medium text-lg">{tech.name}</h3>
    <div className="flex justify-between items-center mt-2">
    <span className={`px-2 py-1 rounded text-xs ${difficultyColor()}`}>
        Difficulty: {tech.difficulty}/10
    </span>
    <span className="text-sm text-gray-600">
        Est. {tech.estimatedHours}h
    </span>
    </div>
    {tech.description && (
    <p className="text-sm text-gray-600 mt-2">{tech.description}</p>
    )}
</div>
);
}

export default TechCard;