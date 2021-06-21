import React from 'react'
import { Link } from 'react-router-dom';

import { Genre } from '../interfaces/movie.interface';

export default function Genres() {

  const [genres, setGenres] = React.useState<Genre[]>([]);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [error, setError] = React.useState<Error | null>(null);

  const fetchAllGenres = React.useCallback(async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/v1/genres`);

      if (response.status !== 200) {
        let err = new Error();
        err.message = "Invalid response code: " + response.status;
        throw err;
      }

      const json: { genres: Genre[] } = await response.json();
      setGenres(json.genres);
      setIsLoaded(true);
    } catch (err) {
      setIsLoaded(true);
      setError(err);
    }
  }, []);

  React.useEffect(() => {
    fetchAllGenres();
  }, [fetchAllGenres]);

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
      <h2>Genres</h2>

      <div className="list-group">
        {genres.map((g) => (
          <Link
            key={g.id}
            to={{
              pathname: `/genre/${g.id}`,
              state: {
                genreName: g.genre_name,
              }
            }}
            className="list-group-item list-group-action"
          >
            {g.genre_name}
          </Link>
        ))}
      </div>
    </React.Fragment>
  );
}
