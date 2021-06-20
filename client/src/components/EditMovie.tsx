import React from 'react';
import { useParams } from 'react-router-dom';

import "./EditMovie.css";
import { Movie } from '../interfaces/movie.interface';
import Input from './form-components/Input';
import Textarea from './form-components/Textarea';
import Select from './form-components/Select';

export default function EditMovie() {

  const { id } = useParams<{ id: string }>();
  const memoizedId = React.useMemo(() => {
    return parseInt(id, 10);
  }, [id]);

  const [movie, setMovie] = React.useState<Movie>();
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [error, setError] = React.useState<Error | null>(null);
  const [errors, setErrors] = React.useState<string[]>([]);

  const fetchMovie = React.useCallback(async () => {
    try {
      const response = await fetch("http://localhost:4000/v1/movie/" + memoizedId);

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
      json.movie.release_date = new Date(json.movie.release_date).toISOString().split("T")[0];

      setMovie(json.movie);
      setIsLoaded(true);
    } catch (err) {
      setIsLoaded(true);
      setError(err);
    }
  }, [memoizedId]);

  React.useEffect(() => {
    if (memoizedId > 0) {
      fetchMovie();
    } else {
      setIsLoaded(true);
      setMovie({
        id: 0,
        description: "",
        genres: {},
        mpaa_rating: "",
        rating: 0,
        release_date: "",
        runtime: 0,
        title: "",
        year: 0
      })
    }
  }, [fetchMovie, memoizedId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const value = e.target.value;
    const name = e.target.name;
    setMovie({
      ...(movie as Movie),
      [name]: value,
    })
  };

  const handleSubmit = React.useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // client-side validation
    let newErrors: string[] = [];

    if (movie?.title === "") {
      newErrors.push("title");
    }

    if (movie?.description === "") {
      newErrors.push("description");
    }

    if (movie?.release_date === "") {
      newErrors.push("release_date");
    }

    if (isNaN(movie?.runtime!) || parseInt(movie?.runtime.toString()!, 10) <= 0) {
      newErrors.push("runtime");
    }

    if (isNaN(movie?.rating!) || movie?.rating! <= 0 || parseInt(movie?.rating.toString()!, 10) > 5) {
      newErrors.push("rating");
    }

    setErrors(newErrors);

    if (newErrors.length > 0) {
      return false;
    }

    const requestOptions = {
      method: "post",
      body: JSON.stringify(movie),
    }

    let response = await fetch("http://localhost:4000/v1/admin/editmovie", requestOptions);
    response = await response.json();

    console.log(response);
  }, [movie]);

  const hasError = (key: string) => {
    return errors.indexOf(key) !== -1;
  }

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
      <h2>Add/Edit Movie</h2>
      <hr />
      <form onSubmit={handleSubmit}>
        <input
          type="hidden"
          name="id"
          id="id"
          value={movie?.id ?? 0}
          onChange={handleChange}
        />

        <Input
          type="text"
          className={hasError("title") ? "is-invalid" : ""}
          name="title"
          title="Title"
          value={movie?.title ?? ""}
          handleChange={handleChange}
          errorDiv={hasError("title") ? "text-danger" : "d-none"}
          errorMsg={"Please enter a title"}
        />

        <Input
          type="date"
          name="release_date"
          title="Release date"
          value={movie?.release_date ?? ""}
          handleChange={handleChange}
          className={hasError("release_date") ? "is-invalid" : ""}
          errorDiv={hasError("release_date") ? "text-danger" : "d-none"}
          errorMsg={"Please enter a release date"}
        />

        <Input
          type="text"
          name="runtime"
          title="Runtime"
          value={movie?.runtime ?? 0}
          handleChange={handleChange}
          className={hasError("runtime") ? "is-invalid" : ""}
          errorDiv={hasError("runtime") ? "text-danger" : "d-none"}
          errorMsg={"Please enter a valid runtime"}
        />

        <Select
          name="mpaa_rating"
          title="MPAA Rating"
          value={movie?.mpaa_rating ?? 0}
          handleChange={handleChange}
          options={[
            { value: "G", text: "G" },
            { value: "PG", text: "PG" },
            { value: "PG13", text: "PG13" },
            { value: "R", text: "R" },
            { value: "NC17", text: "NC17" },
          ]}
        />

        <Input
          type="text"
          name="rating"
          title="Rating"
          value={movie?.rating ?? 0}
          handleChange={handleChange}
          className={hasError("rating") ? "is-invalid" : ""}
          errorDiv={hasError("rating") ? "text-danger" : "d-none"}
          errorMsg={"Please enter a rating between 1 and 5"}
        />

        <Textarea
          title="Description"
          name="description"
          value={movie?.description ?? ""}
          handleChange={handleChange}
          className={hasError("description") ? "is-invalid" : ""}
          errorDiv={hasError("description") ? "text-danger" : "d-none"}
          errorMsg={"Please enter a release date"}
        />

        <hr />

        <button className="btn btn-primary mb-3">Save</button>
      </form>

      <div>
        <pre>
          {JSON.stringify(movie, null, 3)}
        </pre>
      </div>
    </React.Fragment>
  );
}
