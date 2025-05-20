const express = require('express');
const router = express.Router();
const roadmapController = require('../controllers/roadmap.controller');

router.post('/generate', roadmapController.generateRoadmap);
router.get('/:id', roadmapController.getRoadmapById);

module.exports = router;