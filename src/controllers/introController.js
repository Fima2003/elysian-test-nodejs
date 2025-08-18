const { getRandomText } = require('../services/aiService');

async function getIntro(req, res, next) {
  try {
    const text = await getRandomText();
    res.status(200).json({ output: text });
  } catch (err) {
    next(err);
  }
}

module.exports = { getIntro };
