// const fs = require('fs').promises;
// const path = require('path');

// const getRecommendedContent = async (predictions) => {
// try {
// // Load YouTube data files
// const videosPath = path.join(__dirname, '../data/youtube_videos.json');
// const playlistsPath = path.join(__dirname, '../data/youtube_playlists.json');
// const channelsPath = path.join(__dirname, '../data/youtube_channels.json');

// const [videosData, playlistsData, channelsData] = await Promise.all([
//     fs.readFile(videosPath, 'utf8').then(data => JSON.parse(data)).catch(() => []),
//     fs.readFile(playlistsPath, 'utf8').then(data => JSON.parse(data)).catch(() => []),
//     fs.readFile(channelsPath, 'utf8').then(data => JSON.parse(data)).catch(() => [])
// ]);

// // Filter content based on predictions
// const recommendedContent = [];

// // Add videos
// const matchingVideos = videosData.filter(video => 
//     predictions.recommendedContent.includes(video.id)
// );
// recommendedContent.push(...matchingVideos);

// // Add playlists
// const matchingPlaylists = playlistsData.filter(playlist => 
//     predictions.recommendedContent.includes(playlist.id)
// );
// recommendedContent.push(...matchingPlaylists);

// // Add channels
// const matchingChannels = channelsData.filter(channel => 
//     predictions.recommendedContent.includes(channel.id)
// );
// recommendedContent.push(...matchingChannels);

// // Sort by confidence score
// const sortedRecommendations = recommendedContent
//     .map(content => ({
//     ...content,
//     confidence: predictions.confidenceScores[content.id] || 0.5
//     }))
//     .sort((a, b) => b.confidence - a.confidence)
//     .slice(0, 10); // Return top 10 recommendations

// return {
//     recommendations: sortedRecommendations
// };
// } catch (error) {
// throw new Error(`Failed to get YouTube content: ${error.message}`);
// }
// };


const getRecommendedContent = async (predictions) => {
try {
const { predictions: videos, confidence } = predictions;

// Format recommendations for frontend
const recommendations = videos.map(video => ({
    id: video.id,
    title: video.title,
    description: video.description,
    channel: video.channel,
    url: video.url,
    thumbnail: video.thumbnail,
    duration: formatDuration(video.duration),
    views: formatViews(video.views),
    difficulty: video.difficulty,
    score: video.score,
    tags: video.tags
}));

return {
    recommendations,
    confidence,
    totalResults: recommendations.length
};
} catch (error) {
throw new Error(`YouTube service failed: ${error.message}`);
}
};

const formatDuration = (seconds) => {
const hours = Math.floor(seconds / 3600);
const minutes = Math.floor((seconds % 3600) / 60);

if (hours > 0) {
return `${hours}h ${minutes}m`;
}
return `${minutes}m`;
};

const formatViews = (views) => {
if (views >= 1000000) {
return `${(views / 1000000).toFixed(1)}M views`;
}
if (views >= 1000) {
return `${(views / 1000).toFixed(0)}K views`;
}
return `${views} views`;
};

module.exports = {
getRecommendedContent
};