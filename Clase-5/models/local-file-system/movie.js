import { randomUUID } from 'node:crypto'
import { readJSON } from '../../utils.js'
const movies = readJSON('./movies.json')

export class MovieModel {
  static getAll = async (genre) => {
    if (genre) {
      // como se filtran y recuperan los datos
      return movies.filter(
        movie => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase())
      )
    }
    return movies
  }

  static async getById ({ id }) {
    const movie = movies.find(movie => movie.id === id)
    return movie
  }

  static async create ({ input }) {
    const newMovie = {
      Id: randomUUID(), // uuid v4
      ...input
    }

    // Esto no seria REST porque se guarda
    // el estado de la aplicación en la memoria
    movies.push(newMovie)
    return movies
  }

  static async delete ({ id }) {
    const movieIndex = movies.findIndex(movie => movie.id === id)
    if (movieIndex === -1) return false
    movies.splice(movieIndex, -1)
    return true
  }

  static async update ({ id, input }) {
    const movieIndex = movies.findIndex(movie => movie.id === id)
    if (movieIndex === -1) return false
    movies[movieIndex] = {
      ...movies[movieIndex],
      ...input
    }
    return movies[movieIndex]
  }
}
