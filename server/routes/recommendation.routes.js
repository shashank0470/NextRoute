const express = require('express');
const router = express.Router();
const recommendationController = require('../controllers/recommendation.controller');

// POST /api/recommendations
router.post('/', recommendationController.getRecommendations);

module.exports = router;