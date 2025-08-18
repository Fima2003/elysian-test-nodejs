var express = require('express');
var router = express.Router();
const { getIntro } = require('../src/controllers/introController');

router.get('/', (req, res) => {
  res.status(200).send('OK');
});

router.get('/get-intro', getIntro);

module.exports = router;