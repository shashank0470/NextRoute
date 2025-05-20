const Technology = require('../models/technology.model');
const techData = require('../data/tech_data.json');

/**
 * Seed the database with initial technology data
 */
const seedTechnologies = async () => {
try {
// Check if data already exists
const count = await Technology.countDocuments();

if (count === 0) {
    console.log('Seeding technologies...');
    
    // Insert data
    await Technology.insertMany(techData);
    
    console.log('Technologies seeded successfully!');
} else {
    console.log('Database already contains technologies, skipping seed.');
}
} catch (error) {
console.error('Error seeding technologies:', error);
}
};

module.exports = seedTechnologies;