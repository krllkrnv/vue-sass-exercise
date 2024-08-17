const fs = require('fs')
const movies = require('./index.js');

const process = movies.map(el => {
    return {
        id: el.id,
        title: el.title,
        description: el.description,
        year: el.year,
        poster: el.poster,
        actors: el.actors,
        genres: el.genres,
        directors: el.directors,
        collapse: {duration: el.collapse.duration},
    }
})
fs.writeFile('db.json', JSON.stringify(process), function (err,data) {
    if (err) {
        return console.log(err);
    }
    console.log(data);
});
