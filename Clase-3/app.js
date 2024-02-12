const express = require('express') // require -> commonJS
const crypto = require('node:crypto')
const movies = require('./movies.json')
const { validateMovie, validatePartialMovie } = require('./schemas/movies')

const app = express()
app.use(express.json())
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
app.get('/movies/:id', (req, res) => { // se puede usar regex, path-to-regex  es una librería
  const { id } = req.params
  const movie = movies.find(movie => movie.id === id)
  if (movie) return res.json(movie)

  res.status(404).json({ message: 'Movie not found' })
})

app.post('/movies', (req, res) => {
  const result = validateMovie(req.body)

  if (result.error) {
    // 422 Unprocessable entity
    return res.status(400).json({ error: JSON.parse(result.error.message) })
  }

  const newMovie = {
    Id: crypto.randomUUID(), // uuid v4
    ...result
  }

  // Esto no seria REST porque se guarda
  // el estado de la aplicación en la memoria
  movies.push(newMovie)

  res.status(200).json(newMovie)
})

app.patch('/movies/:id', (req, res) => {
  const result = validatePartialMovie(req.body)
  if (!result.success) {
    // 422 Unprocessable entity
    return res.status(400).json({ error: JSON.parse(result.error.message) })
  }

  const { id } = req.params
  // const movie = movies.find(movie => movie.id === id)
  // if (!movie) return res.status(404).json({ message: 'Movie not found' })
  const movieIndex = movies.findIndex(movie => movie.id === id)
  if (movieIndex === -1) return res.status(404).json({ message: 'Movie not found' })

  const updateMovie = {
    ...movies[movieIndex],
    ...result.data
  }
  console.log(movies[movieIndex] + '1 ', result.data)
  console.log(updateMovie)

  movies[movieIndex] = updateMovie

  return res.status(200).json(updateMovie)
})
// })

const PORT = process.env.port ?? '1234'
app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`)
})
