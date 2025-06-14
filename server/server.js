// const express = require('express');
// const cors = require('cors');
// require('dotenv').config();

// const connectDB = require('./config/db');
// const seedTechnologies = require('./utils/seedData');
// const techRoutes = require('./routes/tech.routes');
// const roadmapRoutes = require('./routes/roadmap.routes');

// const app = express();
// const PORT = process.env.PORT || 5000;

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Connect to database
// connectDB();

// // Seed initial data
// seedTechnologies();

// // Routes
// app.use('/api/technologies', techRoutes);
// app.use('/api/roadmaps', roadmapRoutes);

// // Error handling middleware
// app.use((err, req, res, next) => {
// console.error(err.stack);
// res.status(500).json({ message: 'Something went wrong!' });
// });

// app.listen(PORT, () => {
// console.log(`Server running on port ${PORT}`);
// });


//this is the new or server.js for the ML implementaion


// Updated server/server.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');
const seedTechnologies = require('./utils/seedData');
const techRoutes = require('./routes/tech.routes');
const roadmapRoutes = require('./routes/roadmap.routes');
const recommendationRoutes = require('./routes/recommendation.routes'); // NEW

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to database
connectDB();

// Seed initial data
seedTechnologies();

// Routes
app.use('/api/technologies', techRoutes);
app.use('/api/roadmaps', roadmapRoutes);
app.use('/api/recommendations', recommendationRoutes); // NEW

// Add after your routes are defined:
app.get('/', (req, res) => {
    res.send('⚡ Nextroute backend is running!');
});


// Error handling middleware
app.use((err, req, res, next) => { 
console.error(err.stack);
res.status(500).json({ message: 'Something went wrong!' });
});

app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`);
});