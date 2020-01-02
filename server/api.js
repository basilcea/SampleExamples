const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const cors = require('cors');
const server = express();

server.use(cors());

server.use(express.json());


server.get('/', (req, res) => {
  return res.json({ message: 'API is up 🚀' });
});
const PORT = process.env.PORT || 3001
server.listen(PORT, () => {
    console.log("Server is running")
})

module.exports = server;