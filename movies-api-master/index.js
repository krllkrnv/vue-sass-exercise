const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const config = require('./src/config');
const movies = require('./src/db');
const app = express();

app.use(morgan('combined'));
app.use(express.json());
app.use(cors());

app.listen(process.env.PORT || config.port,
    () => console.log(`Server start on port ${config.port} ...`));

app.get('/api/movies', (req, res) => {
    res.json(
        {
            "success": true,
            "data": movies
        }
    )
});

app.get('/api/movie/:id', (req, res) => {
    const movie = movies.find(el => el.id == req.params.id)

    res.json(
        {
            "success": !!JSON.stringify(req.params.id).length,
            "data": movie || null
        }
    )
});
