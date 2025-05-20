const mongoose = require('mongoose');

const roadmapSchema = new mongoose.Schema({
name: {
type: String,
required: true
},
technologies: [{
type: mongoose.Schema.Types.ObjectId,
ref: 'Technology'
}],
totalEstimatedHours: Number,
difficultyLevel: {
type: String,
enum: ['beginner', 'intermediate', 'advanced', 'expert'],
required: true
},
schedule: {
type: String,
enum: ['daily', 'weekly', 'monthly'],
default: 'weekly'
},
steps: [{
name: String,
description: String,
technologies: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Technology'
}],
topics: [String],
estimatedHours: Number,
order: Number
}]
}, {
timestamps: true
});

const Roadmap = mongoose.model('Roadmap', roadmapSchema);
module.exports = Roadmap;