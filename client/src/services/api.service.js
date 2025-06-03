import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;
const API_URL = {apiUrl};

// Create axios instance
const apiClient = axios.create({
baseURL: API_URL,
headers: {
'Content-Type': 'application/json'
}
});

// Technology services
const TechService = {
getAllTechnologies: () => {
return apiClient.get('/technologies');
},
getTechnology: (id) => {
return apiClient.get(`/technologies/${id}`);
}
};

// Roadmap services
const RoadmapService = {
generateRoadmap: (data) => {
return apiClient.post('/roadmaps/generate', data);
},
getRoadmap: (id) => {
return apiClient.get(`/roadmaps/${id}`);
}
};

// NEW: Recommendation services
const RecommendationService = {
getRecommendations: (preferences) => {
return apiClient.post('/recommendations/generate', preferences);
}
};

export { TechService, RoadmapService, RecommendationService };