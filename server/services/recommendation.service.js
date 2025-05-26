const mlService = require('./ml.service');
const youtubeService = require('./youtube.service');

const generateRecommendations = async (userPreferences) => {
try {
// Get ML predictions
const predictions = await mlService.predict(userPreferences);

// Fetch actual YouTube content based on predictions
const contentData = await youtubeService.getRecommendedContent(predictions);

return {
    recommendations: contentData.recommendations,
    confidence: predictions.confidence,
    totalResults: contentData.recommendations.length,
    userPreferences: userPreferences
};
} catch (error) {
throw new Error(`Recommendation generation failed: ${error.message}`);
}
};

module.exports = {
generateRecommendations
};