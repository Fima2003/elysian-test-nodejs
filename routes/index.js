var express = require('express');
var router = express.Router();

const OpenAI = require('openai');
const client = OpenAI();

router.get('/get-intro', async (req, res) => {
  try {
    const response = await client.responses.create({
      model: "gpt-5-nano",
      input: "Write a one-sentence story about a user who successfully logged in in a rhyme"
    });
    res.status(200).json({ output: response.output_text });
  } catch (e) {
    res.status(500).json({ output: "Error occurred with OpenAI" });
  }
});

module.exports = router;