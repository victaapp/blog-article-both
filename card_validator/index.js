const express = require('express');
const bodyParser = require('body-parser');
const rootRoutes = require('./root');
const app = express();
const cors = require('cors')

app.use(cors())
app.use(bodyParser.json());

app.use(rootRoutes);

// Start the server and listen on port 3001
const PORT = 3001;
const IP_ADDRESS = '127.0.0.1';

app.listen(PORT, IP_ADDRESS, () => {
  console.log(`Server running at http://${IP_ADDRESS}:${PORT}/`);
});
