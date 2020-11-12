const fs = require("fs")
const bodyParser = require("body-parser")
const express = require('express')
const app = express()
const port = 3007
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


const movies = JSON.parse(fs.readFileSync('movies.JSON'))

app.get('/', (req, res) => {
    return res.send(movies)
})

app.get('/movies/:id', (req, res) => {
     return res.send(
         movies.filter(mov => { 
             if(mov.movieId == req.params.id){return mov.movieId}})
     )
})

app.get('/:movie', (req, res) => {
    return res.send(
        movies.filter(mov => { 
            for(x = 0; x < movies.length; ++x){
                if(mov.movieId == req.query.id[x]){
                    return mov.movieId }}})
    )
})

app.post('/addMovie', (req, res) => {
    /* POST user data using the request body */
    let newMovie = req.body
    if(newMovie.title && newMovie.title && newMovie.title 
        && newMovie.movieId && newMovie.metascore && newMovie.boxOffice && newMovie.website 
        && newMovie.imdbVotes && newMovie.runtime && newMovie.language && newMovie.rated 
        && newMovie.released && newMovie.imdbRating && newMovie.production && newMovie.actors 
        && newMovie.imdbid && newMovie.plot && newMovie.director && newMovie.title 
        && newMovie.response && newMovie.type && newMovie.awards && newMovie.dvd && newMovie.year 
        && newMovie.poster && newMovie.country && newMovie.genre && newMovie.writer){
            movies.push(newMovie);
            res.send('success')
            
        }else{
            res.send('fail')
}})

app.delete('/delete/:id', (req, res) => {
    
       let x =  movies.find(mov => { 
            if(mov.movieId == req.params.id){return mov.movieId}})
            let kill = movies.indexOf(x)
            movies.splice(kill,1)
            return res.send('success')
            
})

app.listen(port, () => console.log(`Checkpoint app listening at http://localhost:${port}`))
