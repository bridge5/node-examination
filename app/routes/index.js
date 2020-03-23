const express = require('express');
const playerController = require('../controllers/playerController');

const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({
    message: 'Building a RESTful CRUD API with Node.js, Express and MongoDB.'
  });
});

router.get('/player/:id([0-9a-f]{24})', playerController.show);
router.post('/player', playerController.create);
router.put('/player/:id([0-9a-f]{24})', playerController.update);
router.delete('/player/:id([0-9a-f]{24})', playerController.delete);

module.exports = router;
