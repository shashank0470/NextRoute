const mongoose = require('mongoose');

const technologySchema = new mongoose.Schema({
name: {
type: String,
required: true,
unique: true
},
category: {
type: String,
enum: ['frontend', 'backend', 'database', 'devops', 'mobile', 'ml', 'other'],
required: true
},
difficulty: {
type: Number,
min: 1,
max: 10,
required: true
},
estimatedHours: {
type: Number,
required: true
},
topics: [{
name: String,
estimatedHours: Number,
description: String,
resources: [String]
}],
dependencies: [{
type: mongoose.Schema.Types.ObjectId,
ref: 'Technology'
}],
description: String,
icon: String
}, {
timestamps: true
});

const Technology = mongoose.model('Technology', technologySchema);
module.exports = Technology;