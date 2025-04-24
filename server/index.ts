import express from "express";
import axios from "axios";
import { transformData } from "./utils/transformData";
const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", async (req, res) => {
  try {
    const response = await axios.get("https://dummyjson.com/users");
    const users = response.data.users;
    const transformedData = transformData(users);
    res.json(transformedData);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
