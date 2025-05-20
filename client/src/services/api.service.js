import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

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

export { TechService, RoadmapService };