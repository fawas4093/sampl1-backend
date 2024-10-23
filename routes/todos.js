// /routes/todos.js
const express = require('express');
const Todo = require('../models/Todo');
const { authenticateToken } = require('./auth');

const router = express.Router();

// Create a new todo
router.post('/', authenticateToken, async (req, res) => {
    const { title } = req.body;
    const newTodo = new Todo({
        title,
        user: req.user.id, // Assign the authenticated user
    });

    try {
        const savedTodo = await newTodo.save();
        res.status(201).json(savedTodo);
    } catch (error) {
        res.status(500).json({ error: 'Error creating todo' });
    }
});

// Get all todos for the authenticated user
router.get('/', authenticateToken, async (req, res) => {
    try {
        const todos = await Todo.find({ user: req.user.id });
        res.json(todos);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching todos' });
    }
});

// Export the router
module.exports = router;
