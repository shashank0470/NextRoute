
const recommendationService = require('../services/recommendation.service');

const getRecommendations = async (req, res) => {
try {
const { technology, skillLevel, schedulePreference } = req.body;

if (!technology || !skillLevel || !schedulePreference) {
    return res.status(400).json({
    success: false,
    message: 'Technology, skill level, and schedule preference are required'
    });
}

const recommendations = await recommendationService.generateRecommendations({
    technology,
    skillLevel,
    schedulePreference
});

res.json({
    success: true,
    data: recommendations
});
} catch (error) {
console.error('Recommendation error:', error);
res.status(500).json({
    success: false,
    message: error.message
});
}
};

module.exports = {
getRecommendations
};
