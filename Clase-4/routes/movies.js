import { Router } from 'express' // ---> crea un enrutador para resolver todos los pasos
import { readJSON } from './utils.js'
import { randomUUID } from 'node:crypto'

import { validateMovie, validatePartialMovie } from './schemas/movies.js'
import { movieModel } from '../models/movie.js'
const movies = readJSON('./movies.json')
export const moviesRouter = Router()

moviesRouter.get('/', (req, res) => {
  const { genre } = req.query
  const movies = movieModel.getAll(genre)
  res.json(movies)
})

moviesRouter.get('/:id', (req, res) => {
  const { id } = req.params
  const movie = movies.find(movie => movie.id === id)
  if (movie) return res.json(movie)

  res.status(404).json({ message: 'Movie not found' })
})

moviesRouter.post('/', (req, res) => {
  const result = validateMovie(req.body)

  if (result.error) {
    // 422 Unprocessable entity
    return res.status(400).json({ error: JSON.parse(result.error.message) })
  }

  const newMovie = {
    Id: randomUUID(), // uuid v4
    ...result
  }

  // Esto no seria REST porque se guarda
  // el estado de la aplicación en la memoria
  movies.push(newMovie)

  res.status(200).json(newMovie)
})

moviesRouter.delete('/:id', (req, res) => {
  const { id } = req.params
  const movieIndex = movies.findIndex(movie => movie.id === id)
  if (movieIndex === -1) return res.status(404).json({ message: 'Movie not found' })

  movies.splice(movieIndex, -1)

  return res.json({ message: 'Movie deleted' })
})

moviesRouter.patch('/:id', (req, res) => {
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
