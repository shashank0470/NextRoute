import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

function SelectTechPage() {
const [technologies, setTechnologies] = useState([]);
const [selectedTechs, setSelectedTechs] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
const [schedule, setSchedule] = useState('weekly');
const [skillLevel, setSkillLevel] = useState('beginner');
const navigate = useNavigate();

useEffect(() => {
const fetchTechnologies = async () => {
    try {
    const response = await axios.get(`${API_URL}/technologies`);
    setTechnologies(response.data);
    setLoading(false);
    } catch (err) {
    setError('Failed to fetch technologies');
    setLoading(false);
    }
};

fetchTechnologies();
}, []);

const handleTechSelect = (techId) => {
if (selectedTechs.includes(techId)) {
    setSelectedTechs(selectedTechs.filter(id => id !== techId));
} else {
    setSelectedTechs([...selectedTechs, techId]);
}
};

const handleSubmit = async (e) => {
e.preventDefault();

if (selectedTechs.length === 0) {
    setError('Please select at least one technology');
    return;
}

setLoading(true);

try {
    const response = await axios.post(`${API_URL}/roadmaps/generate`, {
    technologies: selectedTechs,
    schedule,
    userSkillLevel: skillLevel
    });
    
    navigate(`/roadmap/${response.data._id}`);
} catch (err) {
    setError('Failed to generate roadmap');
    setLoading(false);
}
};

if (loading && technologies.length === 0) {
return <div className="text-center py-8">Loading technologies...</div>;
}

return (
<div className="max-w-4xl mx-auto">
    <h1 className="text-3xl font-bold mb-6">Select Technologies</h1>
    
    {error && (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
        {error}
    </div>
    )}
    
    <form onSubmit={handleSubmit}>
    <div className="mb-6">
        <h2 className="text-xl font-semibold mb-3">Technologies</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {technologies.map(tech => (
            <div 
            key={tech._id}
            className={`p-4 border rounded-lg cursor-pointer ${
                selectedTechs.includes(tech._id) 
                ? 'bg-blue-100 border-blue-500' 
                : 'bg-white'
            }`}
            onClick={() => handleTechSelect(tech._id)}
            >
            <h3 className="font-medium">{tech.name}</h3>
            <div className="text-sm text-gray-600">
                Difficulty: {tech.difficulty}/10
            </div>
            <div className="text-sm text-gray-600">
                Est. Time: {tech.estimatedHours}h
            </div>
            </div>
        ))}
        </div>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
        <label className="block text-sm font-medium mb-2">
            Schedule Preference
        </label>
        <select
            value={schedule}
            onChange={(e) => setSchedule(e.target.value)}
            className="w-full p-2 border rounded"
        >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
        </select>
        </div>
        
        <div>
        <label className="block text-sm font-medium mb-2">
            Your Skill Level
        </label>
        <select
            value={skillLevel}
            onChange={(e) => setSkillLevel(e.target.value)}
            className="w-full p-2 border rounded"
        >
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
            <option value="expert">Expert</option>
        </select>
        </div>
    </div>
    
    <div className="mt-6">
        <button
        type="submit"
        disabled={loading || selectedTechs.length === 0}
        className={`py-2 px-6 rounded font-medium ${
            loading || selectedTechs.length === 0
            ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
            : 'bg-blue-600 text-white hover:bg-blue-700'
        }`}
        >
        {loading ? 'Generating...' : 'Generate Roadmap'}
        </button>
    </div>
    </form>
</div>
);
}

export default SelectTechPage;