import React from 'react';
import { useParams } from 'react-router-dom';

import { Movie } from '../interfaces/movie.interface';

export default function OneMovie() {

  const [movie, setMovie] = React.useState<Movie>();
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [error, setError] = React.useState<Error | null>(null);

  const { id } = useParams<{ id: string }>();

  const fetchMovie = React.useCallback(async () => {
    try {
      const response = await fetch("http://localhost:4000/v1/movie/" + id);

      if (response.status !== 200) {
        let err = new Error();
        err.message = "Invalid response code: " + response.status;
        throw err;
      }

      const json: { movie: Movie } = await response.json();

      if (json.movie.genres) {
        json.movie.genres = Object.values(json.movie.genres);
      } else {
        json.movie.genres = [];
      }

      setMovie(json.movie);
      setIsLoaded(true);
    } catch (err) {
      setIsLoaded(true);
      setError(err);
    }
  }, [id]);

  React.useEffect(() => {
    fetchMovie();
  }, [id, fetchMovie]);

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
        Movie: {movie?.title} {movie?.year}
      </h2>

      <div className="float-start">
        <small>Rating: {movie?.mpaa_rating}</small>
      </div>
      <div className="float-end">
        {(movie?.genres as string[]).map((m, index) => (
          <span className="badge bg-secondary me-1" key={index}>
            {m}
          </span>
        ))}
      </div>
      <div className="clearfix"></div>

      <hr />

      <table className="table table-compact table-striped">
        <thead></thead>
        <tbody>
          <tr>
            <td>
              <strong>Title: </strong>
              <strong>{movie?.title}</strong>
            </td>
          </tr>
          <tr>
            <td>
              <strong>Description: </strong>
              <strong>{movie?.description}</strong>
            </td>
          </tr>
          <tr>
            <td>
              <strong>Runtime: </strong>
              <strong>{movie?.runtime} minutes</strong>
            </td>
          </tr>
        </tbody>
      </table>
    </React.Fragment>
  );
}
