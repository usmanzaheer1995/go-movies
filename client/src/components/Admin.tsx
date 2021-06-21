import React from 'react';
import { Link, useHistory } from 'react-router-dom';

import { Movie } from '../interfaces/movie.interface';

type IProps = {
  jwt: string;
} & typeof defaultProps;

const defaultProps = {

};

function Admin(props: IProps) {
  const [movies, setMovies] = React.useState<Movie[]>([]);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [error, setError] = React.useState<Error | null>(null);

  const history = useHistory();

  const fetchAllMovies = React.useCallback(async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/v1/movies`);

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
    if (!localStorage.getItem("go-movies-jwt")) {
      history.replace("/login");
      return;
    }

    fetchAllMovies();
  }, [fetchAllMovies, props.jwt, history]);

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

export default Admin;
