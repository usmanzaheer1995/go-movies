import React from 'react';
import { Link } from 'react-router-dom';

import { Movie } from '../interfaces/movie.interface';

export default function Admin() {
  const [movies, setMovies] = React.useState<Movie[]>([]);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [error, setError] = React.useState<Error | null>(null);

  const fetchAllMovies = React.useCallback(async () => {
    try {
      const response = await fetch("http://localhost:4000/v1/movies");

      if (response.status !== 200) {
        let err = new Error();
        err.message = "Invalid response code: " + response.status;
        throw err;
      }

      const json: { movies: Movie[] } = await response.json();
      setMovies(json.movies);
      setIsLoaded(true);
    } catch (err) {
      setIsLoaded(true);
      setError(err);
    }
  }, []);

  React.useEffect(() => {
    fetchAllMovies();
  }, [fetchAllMovies]);

  if (!isLoaded) {
    return (
      <p>Loading...</p>
    );
  }
  if (error) {
    return (
      <div>Error: {error.message}</div>
    );
  }
  return (
    <React.Fragment>
      <h2>
        Manage Catalogue
      </h2>

      <div className="list-group">
        {movies.map((m) => (
          <Link key={m.id} className="list-group-item list-group-action" to={`/admin/movie/${m.id}`}>{m.title}</Link>
        ))}
      </div>
    </React.Fragment>
  );
}
