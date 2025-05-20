import React from 'react';
import { formatTime } from '../utils/timeUtils';

function RoadmapStep({ step, index }) {
return (
<div className="bg-white p-5 border rounded-lg shadow-sm">
    <div className="flex items-center gap-3 mb-2">
    <div className="bg-blue-600 text-white rounded-full w-7 h-7 flex items-center justify-center text-sm font-medium">
        {index + 1}
    </div>
    <h3 className="text-lg font-medium">{step.name}</h3>
    </div>
    
    <p className="text-gray-600 mb-3">{step.description}</p>
    
    <div className="flex flex-wrap gap-2 mb-2">
    {step.technologies && step.technologies.map(tech => (
        <span 
        key={tech._id || tech}
        className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs"
        >
        {tech.name || tech}
        </span>
    ))}
    </div>
    
    <div className="text-sm text-gray-500">
    Estimated time: {formatTime(step.estimatedHours)}
    </div>
</div>
);
}

export default RoadmapStep;