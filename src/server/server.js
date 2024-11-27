import express from "express";
import { CosmosClient } from "@azure/cosmos";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const corsOptions = {
  origin: [
    "http://localhost",
    "capacitor://localhost",
    process.env.VITE_API_URL,
  ],
};

const app = express();
app.use(express.json());
app.use(cors(corsOptions));

const client = new CosmosClient({
  endpoint: process.env.COSMOS_URI,
  key: process.env.COSMOS_KEY,
});

const database = client.database(process.env.DATABASE_NAME);
const container = database.container(process.env.CONTAINER_NAME);

const testConnection = async () => {
  try {
    console.log("Attempting to connect to Cosmos DB...");
    const { resources: databases } = await client.databases
      .readAll()
      .fetchAll();
    console.log(
      `Successfully connected to Cosmos DB. Found ${databases.length} databases.`
    );
  } catch (err) {
    console.error("Error connecting to Cosmos DB:", err.message);
    process.exit(1);
  }
};

const fetchAllItems = async () => {
  try {
    console.log("Fetching items from Cosmos DB...");
    const { resources } = await container.items.readAll().fetchAll();

    console.log("Fetched items from Cosmos DB:", resources);
  } catch (err) {
    console.error("Error fetching data from Cosmos DB:", err.message);
  }
};

testConnection();
fetchAllItems();

app.post("/items", async (req, res) => {
  try {
    const newItem = req.body;
    console.log("Adding new item to Cosmos DB:", newItem);
    const { resource } = await container.items.create(newItem);
    res.status(201).json(resource);
  } catch (err) {
    console.error("Error adding item to Cosmos DB:", err.message);
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
