DROP DATABASE IF exists moviesdb;
create database moviesdb; 
USE moviesdb;
    
create table movie(
	id BINARY(16) PRIMARY KEY DEFAULT (UUID_TO_BIN(UUID())),
    title VARCHAR(255) NOT NULL,
    year INT NOT NULL,
    director VARCHAR(255) NOT NULL,
    duration INT NOT NULL,
    poster TEXT,
    rate DECIMAL(2, 1) unsigned NOT NULL
);

create table genre (
	id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE
);

create table movie_genres(
	movie_id BINARY(16) REFERENCES movie(id),
    genre_id INT REFERENCES genre(id),
    PRIMARY KEY (movie_id, genre_id)
);

insert into genre (name) values
	('Drama'),
    ('Action'),
    ('Crime'),
    ('Adventure'),
    ('Sci-Fi'),
    ('Romance');
    
INSERT INTO movie(id, title, year, director, duration, poster, rate) values
	(UUID_TO_BIN(UUID()),"Inception", "2010", "Christopher Nolan", 148, "https://m.media-amazon.com/images/I/91Rc8cAmnAL._AC_UF1000,1000_QL80_.jpg", 8.8),
	(UUID_TO_BIN(UUID()),"The Shawshank Redemption", "1994", "Frank Darabont", 142, "https://i.ebayimg.com/images/g/4goAAOSwMyBe7hnQ/s-l1200.webp", 9.3),
	(UUID_TO_BIN(UUID()),"The Dark Knight", "2008", "Christopher Nolan", 152, "https://i.ebayimg.com/images/g/yokAAOSw8w1YARbm/s-l1200.jpg", 9);
    
INSERT INTO movie_genres (movie_id, genre_id) values
	((select id from movie where title='Inception'),(select id from genre where name='Sci-Fi')),
	((select id from movie where title='Inception'),(select id from genre where name='Action')),
	((select id from movie where title='The Shawshank Redemption'),(select id from genre where name='Drama')),
	((select id from movie where title='The Dark Knight'),(select id from genre where name='Action'));
    
select title, year, director, duration, poster, rate, BIN_TO_UUID(id) from movie;
SELECT movie_id FROM movie_genres where genre_id= 2;

SELECT * FROM movie m INNER JOIN  movie_genres g on m.id = g.id
-- SELECT tipo_incidente, AVG(edad) as edad_promedio FROM llamadas WHERE red IN ('Sur', 'Norte')  AND localidad IN ('Bosa', 'Ciudad Bolívar') AND tipo_incidente IN ( SELECT tipo_incidente FROM llamadas WHERE red IN ('Sur', 'Norte') AND localidad IN ('Bosa', 'Ciudad Bolívar') GROUP BY tipo_incidente HAVING COUNT(*) > 50 ) GROUP BY tipo_incidente ORDER BY edad_promedio DESC;