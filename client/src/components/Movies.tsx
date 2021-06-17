import React from 'react';
import { Link } from 'react-router-dom';

import { Movie } from '../interfaces/movie.interface';

export default function Movies() {

  const [movies, setMovies] = React.useState<Movie[]>([]);

  React.useEffect(() => {
    setMovies([
      { id: 1, title: "The Shawshank Redemption", runtime: 142 },
      { id: 2, title: "The Godfather", runtime: 175 },
      { id: 3, title: "The Dark Knight", runtime: 153 },
    ])
  }, []);

  return (
    <React.Fragment>
      <h2>
        Choose a movie
      </h2>

      <ul>
        {movies.map((m) => (
          <li key={m.id}>
            <Link to={`/movies/${m.id}`}>{m.title}</Link>
          </li>
        ))}
      </ul>
    </React.Fragment>
  );
}
