const express = require('express') // require -> commonJS
const crypto = require('node:crypto')
const movies = require('./movies.json')
const { validateMovie, validatePartialMovie } = require('./schemas/movies')

const app = express()
app.use(express.json())
app.disable('x-powered-by')

// Métodos normales: GET/HEAD/POST
// Métodos complejos: PUT/PATCH/DELE

// CORS PRE-Flight
// OPTIONS
const ACCEPTED_ORIGINS = [
  'http://127.0.0.1:5500',
  'http://localhost:8080',
  'http://localhost:1234',
  'https://movies.com',
  'https://midu.dev',
  'https://hector.dev'
]

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

  movies[movieIndex] = updateMovie

  return res.status(200).json(updateMovie)
})

app.options('/movies/:id', (req, res) => {
  const origin = req.header('origin')
  console.log('origin', origin)
  if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
    res.header('Access-Control-Allow-Origin', origin)
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE')
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    res.header('Access-Control-Allow-Credentials', true)
    res.send(200)
  }
})
const PORT = process.env.port ?? '1234'
app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`)
})
