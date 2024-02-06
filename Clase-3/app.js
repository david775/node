const express = require('express')
const movies = require('./movies.json')

const app = express()
app.disable('x-powered-by')

// Todos los recursos que sean MOVIES se identifican con /movies
app.get('/movies', (req, res) => {
  const { genre } = req.query
  if (genre) {
    // const filteredMovies = movies.filter(movie => movie.genre.includes(genre))
    const filteredMovies = movies.filter(movie => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase()))
    return res.json(filteredMovies)
  }

  res.json(movies)
})

// El :id se le llama segmento dinámico app.get('/movies/:id/:mas/:otro', (req, res) => {
app.get('/movies/:id', (req, res) => { // se puede usar regex, path-to-regex  es una libreria
  const { id } = req.params
  const movie = movies.find(movie => movie.id === id)
  if (movie) return res.json(movie)

  res.status(404).json({ message: 'Movie not found' })
})

const PORT = process.env.port ?? '1234'

app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`)
})
