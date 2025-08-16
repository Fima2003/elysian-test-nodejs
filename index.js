const express = require('express');
const app = express();
require('dotenv').config();
console.log(process.env.OPENAI_API_KEY);
const PORT = process.env.PORT || 3000;
const OpenAI = require('openai');
const client = OpenAI();

app.get('/get-intro', async (req, res) => {
  try {
    const response = await client.responses.create({
      model: "gpt-5-nano",
      input: "Write a one-sentence story about a user who successfully logged in in a rhyme"
    });
    res.status(200).json({ output: response.output_text });
  }catch (e){
    res.status(500).json({output: "Error occurred with OpenAI"});
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
