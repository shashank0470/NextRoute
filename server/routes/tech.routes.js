const express = require('express');
const router = express.Router();
const techController = require('../controllers/tech.controller');

router.get('/', techController.getAllTechnologies);
router.get('/:id', techController.getTechnologyById);
router.post('/', techController.createTechnology);
router.put('/:id', techController.updateTechnology);
router.delete('/:id', techController.deleteTechnology);

module.exports = router;