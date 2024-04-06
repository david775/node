import { readJSON } from '../utils.js'
const movies = readJSON('../movies.json')

export class movieModel {
  static getAll (genre) {
    if (genre) {
      return movies.filter(
        movie => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase())
      )
    }
    return movies
  }
}
