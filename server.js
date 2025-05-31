const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
const app = express();

app.use(cors());

const db = new Pool({
  user: "postgres",
  host: "localhost",
  database: "trillectric",
  password: "postgres",
  port: 5432,
});

app.use(express.json());

app.post("/data", (req, res) => {
  const { device_id, current, voltage } = req.body;
  console.log(
    `Received data: device_id=${device_id}, current=${current}, voltage=${voltage}`
  );
  db.query(
    "INSERT INTO device_data (current, voltage, device_id) VALUES ($1, $2, $3)",
    [current, voltage, device_id],
    (err, result) => {
      if (err) {
        console.error("Error inserting data:", err);
        res.status(500).send("Error inserting data");
      } else {
        console.log("Data inserted successfully");
        res.send("Data inserted");
      }
    }
  );
});

app.get("/latest-data/:device_id", (req, res) => {
  const { device_id } = req.params;
  console.log(`Fetching latest data for device_id=${device_id}`);
  db.query(
    "SELECT * FROM device_data WHERE device_id = $1 ORDER BY timestamp DESC LIMIT 1",
    [device_id],
    (err, result) => {
      if (err) {
        console.error("Error getting latest data:", err);
        res.status(500).send("Error getting latest data");
      } else {
        console.log("Latest data retrieved successfully:", result.rows[0]);
        res.send(result.rows[0]);
      }
    }
  );
});

app.get("/all-data/:device_id", (req, res) => {
  const { device_id } = req.params;
  console.log(`Fetching all data for device_id=${device_id}`);
  db.query(
    "SELECT * FROM device_data WHERE device_id = $1 ORDER BY timestamp",
    [device_id],
    (err, result) => {
      if (err) {
        console.error("Error getting all data:", err);
        res.status(500).send("Error getting all data");
      } else {
        console.log("All data retrieved successfully:", result.rows);
        res.send({ entries: result.rows });
      }
    }
  );
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
