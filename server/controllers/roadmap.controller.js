const Roadmap = require('../models/roadmap.model');
const Technology = require('../models/technology.model');
const { PythonShell } = require('python-shell');
const path = require('path');

exports.generateRoadmap = async (req, res) => {
try {
const { technologies, schedule, userSkillLevel } = req.body;

// Get full technology details
const techDetails = await Technology.find({
    _id: { $in: technologies }
});

if (techDetails.length === 0) {
    return res.status(400).json({ message: 'No valid technologies selected' });
}

// Calculate base metrics
let totalHours = techDetails.reduce((sum, tech) => sum + tech.estimatedHours, 0);

// Use ML model for optimized roadmap if available
try {
    const options = {
    mode: 'json',
    pythonPath: 'python',
    scriptPath: path.join(__dirname, '../ml'),
    args: [
        JSON.stringify(techDetails.map(t => ({
        id: t._id.toString(),
        name: t.name,
        difficulty: t.difficulty,
        estimatedHours: t.estimatedHours,
        topics: t.topics
        }))),
        userSkillLevel || 'beginner',
        schedule
    ]
    };
    
    const results = await PythonShell.run('predict.py', options);
    const mlResult = results[0];
    
    // Create roadmap with ML recommendations
    const newRoadmap = new Roadmap({
    name: `${techDetails.map(t => t.name).join(', ')} Roadmap`,
    technologies,
    totalEstimatedHours: mlResult.totalHours || totalHours,
    difficultyLevel: mlResult.difficultyLevel || getDifficultyLevel(techDetails),
    schedule,
    steps: mlResult.steps || generateDefaultSteps(techDetails)
    });
    
    const savedRoadmap = await newRoadmap.save();
    res.status(201).json(savedRoadmap);
} catch (mlError) {
    console.error('ML error:', mlError);
    
    // Fallback to basic roadmap if ML fails
    const newRoadmap = new Roadmap({
    name: `${techDetails.map(t => t.name).join(', ')} Roadmap`,
    technologies,
    totalEstimatedHours: totalHours,
    difficultyLevel: getDifficultyLevel(techDetails),
    schedule,
    steps: generateDefaultSteps(techDetails)
    });
    
    const savedRoadmap = await newRoadmap.save();
    res.status(201).json(savedRoadmap);
}

} catch (error) {
res.status(500).json({ message: error.message });
}
};

exports.getRoadmapById = async (req, res) => {
try {
const roadmap = await Roadmap.findById(req.params.id)
    .populate('technologies')
    .populate('steps.technologies');
    
if (!roadmap) {
    return res.status(404).json({ message: 'Roadmap not found' });
}

res.status(200).json(roadmap);
} catch (error) {
res.status(500).json({ message: error.message });
}
};

// Helper functions
function getDifficultyLevel(technologies) {
const avgDifficulty = technologies.reduce((sum, tech) => sum + tech.difficulty, 0) / technologies.length;

if (avgDifficulty <= 3) return 'beginner';
if (avgDifficulty <= 6) return 'intermediate';
if (avgDifficulty <= 8) return 'advanced';
return 'expert';
}

function generateDefaultSteps(technologies) {
// Simple sequential steps without ML optimization
return technologies.flatMap((tech, index) => {
return tech.topics.map((topic, topicIdx) => ({
    name: `Learn ${topic.name}`,
    description: topic.description || `Master ${topic.name} in ${tech.name}`,
    technologies: [tech._id],
    topics: [topic.name],
    estimatedHours: topic.estimatedHours,
    order: (index * 100) + topicIdx
}));
});
}