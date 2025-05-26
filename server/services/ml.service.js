// const { PythonShell } = require('python-shell');
// const path = require('path');

// const predict = (userPreferences) => {
// return new Promise((resolve, reject) => {
// const scriptPath = path.join(__dirname, '../ml/recommendation_engine.py');

// const options = {
//     mode: 'json',
//     pythonPath: 'python',
//     scriptPath: path.dirname(scriptPath),
//     args: [JSON.stringify(userPreferences)]
// };

// PythonShell.run('recommendation_engine.py', options, (err, result) => {
//     if (err) {
//     console.error('Python script error:', err);
//     reject(new Error(`ML prediction failed: ${err.message}`));
//     } else {
//     try {
//         const predictions = result[0];
//         resolve(predictions);
//     } catch (parseError) {
//         reject(new Error(`Failed to parse ML predictions: ${parseError.message}`));
//     }
//     }
// });
// });
// };

// module.exports = {
// predict
// };



const fs = require('fs');
const path = require('path');

const predict = async (userPreferences) => {
try {
const { technology, skillLevel, schedulePreference } = userPreferences;

// Simple ML logic - filter by technology and skill level
const videoData = JSON.parse(
    fs.readFileSync(path.join(__dirname, '../data/youtube_videos.json'), 'utf8')
);

// Filter videos based on user preferences
const filteredVideos = videoData.filter(video => {
    const techMatch = video.tags.some(tag => 
    tag.toLowerCase().includes(technology.toLowerCase()) ||
    technology.toLowerCase().includes(tag.toLowerCase())
    );
    const skillMatch = video.difficulty.toLowerCase() === skillLevel.toLowerCase();
    
    return techMatch || skillMatch; // Show videos if either tech OR skill matches
});

// Score videos (simple scoring)
const scoredVideos = filteredVideos.map(video => ({
    ...video,
    score: Math.random() * 0.5 + 0.5 // Random score between 0.5-1.0
}));

return {
    predictions: scoredVideos.sort((a, b) => b.score - a.score).slice(0, 5),
    confidence: 0.85
};
} catch (error) {
throw new Error(`ML prediction failed: ${error.message}`);
}
};

module.exports = {
predict
};