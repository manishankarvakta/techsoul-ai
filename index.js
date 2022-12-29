const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { Configuration, OpenAIApi } = require("openai");

dotenv.config();

const PORT = process.env.PORT || "5000";

const configration = new Configuration({
  apiKey: process.env.OPEN_API_KEY,
});

const openai = new OpenAIApi(configration);

const app = express();
app.use(cors());

app.use(express.json());

app.get("/", async (req, res) => {
  res.status(200).send({
    message: "OPEN-AI Api",
  });
});

app.post("/", async (req, res) => {
  try {
    console.log(req.body);
    const prompt = req.body.prompt;

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `${prompt}`,
      temperature: 0,
      max_tokens: 3000,
      top_p: 1,
      frequency_penalty: 0.5,
      presence_penalty: 0,
    });

    console.log(response.data);
    res.status(200).send({
      bot: response.data.choices[0].text,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error });
  }
});

app.listen(PORT, () => {
  console.log("app starting at port: 5000");
});
