import mysql from 'mysql2/promise'

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
      console.log(genres)
      // get de id form the first genre result
      const [{ id }] = genres


      // const [movies] = connection.query(
      //   'SELECT * FROM movie_genres where genre_id=?;', [id]
      // )
      // get all movies ids from database table
      // using genre id
      // la query a movie_genres
      // join
      // devolver resultados

      // const [movieses] = connection.query(
      //   'SELECT * FROM movie m INNER JOIN  movie_genres g on m.id = ?;', [movies]
      // )
      // console.log(movies)
      return []
    }

    const [movies] = await connection.query(
      'select title, year, director, duration, poster, rate, BIN_TO_UUID(id) from movie;'
    )

    console.log(movies)
  }

  static async getById ({ id }) {
  }

  static async create ({ input }) {
  }

  static async delete ({ id }) {
  }

  static async update ({ id, input }) {
  }
}
