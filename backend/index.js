require("dotenv").config();
const express = require("express");
const axios = require("axios");
const app = express();
const port = process.env.PORT || 5000;

app.get("/posts", async (req, res) => {
  const pageSize = req.query.pageSize || 6;
  const page = req.query.page || 1;

  try {
    const response = await axios.get(`${process.env.BASE_URL}`, {
      params: {
        country: "us",
        apiKey: process.env.API_KEY,
        pageSize,
        page,
      },
    });

    res.json({
      articles: response.data.articles,
      totalResults: response.data.totalResults,
      totalPages: Math.ceil(response.data.totalResults / pageSize),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch data" });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
