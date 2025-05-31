# Trillectric API

This is a Node.js API for Trillectric, a company that makes IoT devices.

## Development

To start the development server, run `npm start`. This will start the server on port 3000.

## API Endpoints

### POST /data

Inserts data into the database.

### GET /latest-data/:device_id

Fetches the latest data for a given device_id.

### GET /all-data/:device_id

Fetches all data for a given device_id.

## Database

The database is a PostgreSQL database. The database name is `trillectric`. The schema is as follows:

- Table: `device_data`
  - Columns:
    - `device_id` (VARCHAR)
    - `current` (FLOAT8)
    - `voltage` (FLOAT8)
    - `timestamp` (TIMESTAMP DEFAULT CURRENT_TIMESTAMP)

### Running Data Insert Script

To run the data insert script, run `node data_insert.js`. This will insert data into the database every 10 seconds.
