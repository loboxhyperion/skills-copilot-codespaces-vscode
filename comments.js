// Create web server using express
const express = require('express');
const app = express();
const port = 3000;

// Use the public directory to serve static files
app.use(express.static('public'));
// Use express.json() to parse incoming requests with JSON payloads
app.use(express.json());
// Use express.urlencoded() to parse incoming requests with urlencoded payloads
app.use(express.urlencoded({ extended: true }));

// Create comments array
let comments = [];

// GET route to get comments
app.get('/comments', (req, res) => {
  res.send(comments);
});

// POST route to add comments
app.post('/comments', (req, res) => {
  const comment = req.body;
  comments.push(comment);
  res.send('Comment added successfully');
});

// DELETE route to delete comments
app.delete('/comments/:id', (req, res) => {
  const id = parseInt(req.params.id);
  comments = comments.filter((comment) => comment.id !== id);
  res.send('Comment deleted successfully');
});

// PUT route to update comments
app.put('/comments/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const updatedComment = req.body;
  comments = comments.map((comment) =>
    comment.id === id ? updatedComment : comment
  );
  res.send('Comment updated successfully');
});

// Start server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
