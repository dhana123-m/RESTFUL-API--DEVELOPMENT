const express = require('express');
const app = express();
const bookRoutes = require('./routes/books');
const PORT = 3000;

app.use(express.json());
app.use('/api/books', bookRoutes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
