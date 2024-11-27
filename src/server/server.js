const express = require("express");
const { CosmosClient } = require("@azure/cosmos");
const cors = require("cors");
require("dotenv").config();

const corsOptions = {
  origin: [
    "http://localhost",
    "capacitor://localhost",
    "workoutbackend.azurewebsites.net",
  ],
};

const app = express();
app.use(express.json());
app.use(cors(corsOptions));

const client = new CosmosClient({
  endpoint: process.env.COSMOS_URI,
  key: process.env.COSMOS_KEY,
});
const database = client.database("DatabaseName");
const container = database.container("ContainerName");

app.get("/", async (req, res) => {
  try {
    const { resources } = await container.items.readAll().fetchAll();
    res.status(200).json(resources);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/items", async (req, res) => {
  try {
    const newItem = req.body;
    const { resource } = await container.items.create(newItem);
    res.status(201).json(resource);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
