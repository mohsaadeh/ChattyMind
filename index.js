const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const { Configuration, OpenAIApi } = require("openai");

const config = new Configuration({
  apiKey: "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",
});

const openai = new OpenAIApi(config);

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post("/chat", async (req, res) => {
  try {
    const { prompt } = req.body;

    const completion = await openai.createCompletion({
      model: "text-davinci-003", // Update the model name if necessary
      max_tokens: 512,
      temperature: 0,
      prompt: prompt,
    });

    res.send(completion.data.choices[0].text);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred.");
  }
});

const port = 8080;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
