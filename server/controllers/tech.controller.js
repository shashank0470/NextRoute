const Technology = require('../models/technology.model');

exports.getAllTechnologies = async (req, res) => {
try {
const technologies = await Technology.find();
res.status(200).json(technologies);
} catch (error) {
res.status(500).json({ message: error.message });
}
};

exports.getTechnologyById = async (req, res) => {
try {
const technology = await Technology.findById(req.params.id);
if (!technology) {
    return res.status(404).json({ message: 'Technology not found' });
}
res.status(200).json(technology);
} catch (error) {
res.status(500).json({ message: error.message });
}
};

exports.createTechnology = async (req, res) => {
try {
const newTechnology = new Technology(req.body);
const savedTechnology = await newTechnology.save();
res.status(201).json(savedTechnology);
} catch (error) {
res.status(400).json({ message: error.message });
}
};

exports.updateTechnology = async (req, res) => {
try {
const updatedTechnology = await Technology.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
);
if (!updatedTechnology) {
    return res.status(404).json({ message: 'Technology not found' });
}
res.status(200).json(updatedTechnology);
} catch (error) {
res.status(400).json({ message: error.message });
}
};

exports.deleteTechnology = async (req, res) => {
try {
const deletedTechnology = await Technology.findByIdAndDelete(req.params.id);
if (!deletedTechnology) {
    return res.status(404).json({ message: 'Technology not found' });
}
res.status(200).json({ message: 'Technology deleted successfully' });
} catch (error) {
res.status(500).json({ message: error.message });
}
};