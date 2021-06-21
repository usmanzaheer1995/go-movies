import React from 'react';
import { Link } from 'react-router-dom';
import debounce from 'lodash/debounce';

import Input from './form-components/Input';
import { Movie } from '../interfaces/movie.interface';

export default function Graphql() {

  const [searchTerm, setSearchTerm] = React.useState("");
  const [movies, setMovies] = React.useState<Movie[]>([]);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [error, setError] = React.useState<Error | null>(null);
  const [, setAlert] = React.useState({
    type: "d-none",
    msg: "",
  });

  const fetchMovies = React.useCallback(async () => {
    const payload = `
    {
      list {
        id
        title
        runtime
        year
        description
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
      let response = await fetch("http://localhost:4000/v1/graphql", requestOptions);
      if (!response.ok) {
        response = await response.json();
        throw new Error((response as any).error?.message || "Something went wrong");
      }
      const data = await response.json();
      setMovies(data.data.list);
      setIsLoaded(true);
    } catch (err) {
      setIsLoaded(true);
      setAlert({ type: "alert-danger", msg: err.message });
      setError(err.message);
    }

  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);

    debounceOnChange(e.target.value);
  }

  const performSearch = async (term: any) => {
    const payload = `
      {
        search(titleContains: "${term}") {
          id
          title
          runtime
          year
          description
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
      let response = await fetch("http://localhost:4000/v1/graphql", requestOptions);
      if (!response.ok) {
        response = await response.json();
        throw new Error((response as any).error?.message || "Something went wrong");
      }
      const data = await response.json();

      if (data.data.search.length > 0) {
        setMovies(data.data.search);
      } else {
        setMovies([]);
      }
      setIsLoaded(true);
    } catch (err) {
      setIsLoaded(true);
      setAlert({ type: "alert-danger", msg: err.message });
    }
  }

  const debounceOnChange = React.useCallback(debounce(performSearch, 300), [])

  React.useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

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
        Graphql
      </h2>

      <hr />

      <Input
        title="Search"
        type="text"
        name="search"
        value={searchTerm}
        handleChange={handleChange}
        errorDiv=""
        errorMsg=""
      />

      <div className="list-group">
        {movies.map((m) => (
          <Link
            key={m.id}
            className="list-group-item list-group-item-action"
            to={`/movies/graphql/${m.id}`}
          >
            <strong>{m.title}</strong><br />
            <small className="text-muted">{m.year} - {m.runtime} mins</small><br />
            {m.description.slice(0, 100)}...
          </Link>
        ))}
      </div>
    </React.Fragment>
  );
}
