import mysql from 'mysql2/promise'
import { randomUUID } from 'node:crypto'

const config = {
  host: 'localhost',
  user: 'root',
  port: 3306,
  password: '',
  database: 'moviesdb'
}

const connection = await mysql.createConnection(config)

export class MovieModel {
  static async getAll ({ genre }) {
    if (genre) {
      const lowerCaseGenre = genre.toLowerCase()

      // get genre ids form database table using genre names
      const [genres] = await connection.query(
        'SELECT id, name FROM genre WHERE LOWER(name) = ?;', [lowerCaseGenre]
      )

      // no genre found
      if (genres.length === 0) return []

      // get de id form the first genre result
      const [{ id }] = genres
      // get all movies ids from database table
      // using genre id
      // la query a movie_genres
      const movies = connection.query(
        'SELECT BIN_TO_UUID(movie_id) as id FROM movie_genres where genre_id=?;', [id]
      )
        .then(result => result[0])
        .then(moviesIds => {
          console.log(moviesIds)
        })

      // const movies = await connection.query(
      //   'select title, year, director, duration, poster, rate, BIN_TO_UUID(id) from movie;'
      // )
      // 'SELECT BIN_TO_UUID(id) as id, title, year, director, duration, poster, rate  FROM llamadas WHERE red IN ('Sur', 'Norte')  AND localidad IN ('Bosa', 'Ciudad Bolívar') AND tipo_incidente IN ( SELECT tipo_incidente FROM llamadas WHERE red IN ('Sur', 'Norte') AND localidad IN ('Bosa', 'Ciudad Bolívar') GROUP BY tipo_incidente HAVING COUNT(*) > 50 ) GROUP BY tipo_incidente ORDER BY edad_promedio DESC;'
      // join
      // devolver resultados

      // const [movieses] = connection.query(
      //   'SELECT * FROM movie m INNER JOIN  movie_genres g on m.id = ?;', [movies]
      // )
      return movies.toString()
    }

    const movies = await connection.query(
      'select title, year, director, duration, poster, rate, BIN_TO_UUID(id) from movie;'
    )

    console.log(movies)
  }

  static async getById ({ id }) {
    const [movie] = await connection.query(
      'select title, year, director, duration, poster, rate, BIN_TO_UUID(id) from movie WHERE id = UUID_TO_BIN(?);', [id]
    )

    console.log(movie)
  }

  static async create ({ input }) {
    const result = await connection.query(
      'INSERT INTO movie(id, title, year, director, duration, poster, rate) value ?', [input.title, input.year, input.director, input.duration, input.poster, input.rate]
      // (UUID_TO_BIN(UUID()),"Inception", "2010", "Christopher Nolan", 148, "https://m.media-amazon.com/images/I/91Rc8cAmnAL._AC_UF1000,1000_QL80_.jpg", 8.8);
    )

    console.log(result)
  }

  static async delete ({ id }) {
    const [movie] = await connection.query(
      'select title, year, director, duration, poster, rate, BIN_TO_UUID(id) from movie WHERE id = UUID_TO_BIN(?);', [id]
    )

    console.log(movie)
  }

  static async update ({ id, input }) {
  }
}
