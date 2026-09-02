// Get the Express app from app.js.
const server = require('./app');

// Start the server on port 3000.
server.listen(3000, () => {
    console.log('Server is running on port 3000');
});
