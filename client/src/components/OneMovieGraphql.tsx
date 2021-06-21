import React from 'react';
import { useParams } from 'react-router-dom';

import { Movie } from '../interfaces/movie.interface';

export default function OneMovieGraphql() {

  const [movie, setMovie] = React.useState<Movie>();
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [error] = React.useState<Error | null>(null);
  const [, setAlert] = React.useState({
    type: "d-none",
    msg: "",
  });

  const { id } = useParams<{ id: string }>();

  const fetchMovie = React.useCallback(async () => {
    const payload = `
      {
        movie(id: ${id}) {
          id
          title
          runtime
          description
          rating
          mpaa_rating
          poster
        }
      }
    `;

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
      method: "POST",
      body: payload,
      headers: myHeaders,
    };

    try {
      let response = await fetch(`${process.env.REACT_APP_API_URL}/v1/graphql`, requestOptions);
      if (!response.ok) {
        response = await response.json();
        throw new Error((response as any).error?.message || "Something went wrong");
      }
      const data = await response.json();

      setMovie(data.data.movie);
      setIsLoaded(true);
    } catch (err) {
      setIsLoaded(true);
      setAlert({ type: "alert-danger", msg: err.message });
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

      {movie?.poster !== "" && (
        <div>
          <img src={`https://image.tmdb.org/t/p/w200${movie!.poster}`} alt="poster" />
        </div>
      )}

      <div className="float-start">
        <small>Rating: {movie?.mpaa_rating}</small>
      </div>
      <div className="float-end">
        {(movie?.genres ? movie?.genres as string[] : []).map((m, index) => (
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
