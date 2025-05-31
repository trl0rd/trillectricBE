const axios = require("axios");

setInterval(() => {
  const device_id = "SOL-001";
  const voltage = Math.floor(Math.random() * 10 + 220);
  const current = Math.random() * 10;
  const data = { device_id, voltage, current };
  axios.post("http://localhost:3000/data", data);
}, 10000);

// const { Client } = require("pg");
// const client = new Client({
//   user: "postgres",
//   host: "localhost",
//   database: "trillectric",
//   password: "postgres",
//   port: 5432,
// });

// (async () => {
//   await client.connect();
//   await client.query(
//     "ALTER TABLE device_data ALTER COLUMN voltage TYPE float8, ALTER COLUMN current TYPE float8"
//   );
//   await client.end();
// })();
