import { parse } from "yaml";
import fs from "fs";

// Edit these constants as needed
const FILE_NAME = 'metrics.yml';
const API_HOST = 'https://api.growthbook.io';
const GB_API_KEY = process.env.GB_API_KEY;

// Parse the yaml file
const file = fs.readFileSync(FILE_NAME, 'utf8');
const json = parse(file);

// Send to GrowthBook
const res = await fetch(`${API_HOST}/api/v1/bulk-import/facts`, {
  method: "POST",
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${GB_API_KEY}`
  },
  body: JSON.stringify(json)
});

// Handle errors and print the response
const resJson = await res.json();
if (!res.ok) throw new Error(resJson?.message || "Error syncing");
console.log("Success!", resJson);
