import React from 'react';

const LoadingSpinner = ({ message = "Loading recommendations..." }) => {
return (
<div className="flex flex-col items-center justify-center py-12">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
    <p className="text-gray-600 text-lg">{message}</p>
    <p className="text-gray-500 text-sm mt-2">
    Our AI is analyzing your preferences...
    </p>
</div>
);
};

export default LoadingSpinner;