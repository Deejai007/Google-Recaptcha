const express = require("express");
const router = express.Router();
const app = express();
const cors = require("cors");
const axios = require("axios");

const port =  2000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", router);
router.post("/post", async (req, res) => {
  const { token, inputVal } = req.body;
  try {
    const response = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify?secret=${"6LeSGHwlAAAAANjjlxqKPfnTbwJWQ4YrVDZ69qc6"}&response=${token}`
    );
    res.send(response.data.success);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error verifying reCAPTCHA");
  }
});
app.listen(port, () => {
  console.log(`~~~~~~ listening on port ${port}`);
});
