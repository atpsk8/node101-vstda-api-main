const express = require('express');

// Create the Express application.
const app = express();

// This array is our temporary database.
// The data will reset whenever the server restarts.
const data = [
    {
        todoItemId: 0,
        name: 'an item',
        priority: 3,
        completed: false
    },
    {
        todoItemId: 1,
        name: 'another item',
        priority: 2,
        completed: false
    },
    {
        todoItemId: 2,
        name: 'a done item',
        priority: 1,
        completed: true
    }
];

// This lets Express read JSON sent in a request body.
app.use(express.json());

// Check if the server is running.
app.get('/', (req, res) => {
    res.status(200).json({ 
        status: 'ok' });
});

// Send back every todo item in the data array.
app.get('/api/TodoItems', (req, res) => {
    res.status(200).json(data);
});

// Add a new todo item to the data array.
app.post('/api/TodoItems', (req, res) => {
    // Make a new object using the information sent by the user.
    const newItem = {
        todoItemId: req.body.todoItemId,
        name: req.body.name,
        priority: req.body.priority,
        completed: req.body.completed
    };

    // Put the new object at the end of the data array.
    data.push(newItem);

    // Send the new item back with a 201 "Created" status.
    res.status(201).json(newItem);
});

// Delete one todo item using the ID in the URL.
app.delete('/api/TodoItems/:id', (req, res) => {
    // URL values are strings, so change the ID into a number.
    const id = Number(req.params.id);

    // Find where the matching item is located in the array.
    const index = data.findIndex(item => item.todoItemId === id);

    // An index of -1 means that no matching item was found.
    if (index !== -1) {
        // Remove the item and save it in deletedItem.
        const deletedItem = data.splice(index, 1)[0];
        res.status(200).json(deletedItem);
    } else {
        res.status(404).json({ error: 'Item not found' });
    }
});

// Get one todo item using the ID in the URL.
app.get('/api/TodoItems/:id', (req, res) => {
    // Change the ID from a string into a number.
    const id = Number(req.params.id);

    // Look through the array for an item with the same ID.
    const item = data.find(item => item.todoItemId === id);

    // Send the item if it exists. Otherwise, send a 404 error.
    if (item) {
        res.status(200).json(item);
    } else {
        res.status(404).json({ error: 'Item not found' });
    }
});

// Export the app so index.js and the tests can use it.
module.exports = app;
