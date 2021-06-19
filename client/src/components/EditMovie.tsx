import React from 'react'

import "./EditMovie.css";
import { Movie } from '../interfaces/movie.interface';

export default function EditMovie() {

  const [movie, setMovie] = React.useState<Movie>();
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [error, setError] = React.useState<Error | null>(null);

  React.useEffect(() => {
    setMovie({
      id: 1,
      description: "123",
      genres: {},
      mpaa_rating: "PG13",
      rating: 3,
      release_date: new Date(),
      runtime: 142,
      title: "Shawshank Redemption",
      year: 1991,
    })
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const value = e.target.value;
    const name = e.target.name;
    setMovie({
      ...(movie as Movie),
      [name]: value,
    })
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    console.log("Form was submitted");
    e.preventDefault();
  };

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
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={movie?.title ?? ""}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="release_date" className="form-label">Release date</label>
          <input
            type="text"
            className="form-control"
            id="release_date"
            name="release_date"
            value={movie?.release_date.toString() ?? ""}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="runtime" className="form-label">Runtime</label>
          <input
            type="text"
            className="form-control"
            id="runtime"
            name="runtime"
            value={movie?.runtime.toString() ?? 0}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="mpaa_rating" className="form-label">MPAA Rating</label>
          <select
            className="form-select"
            name="mpaa_rating"
            id="mpaa_rating"
            value={movie?.mpaa_rating ?? ""}
            onChange={handleChange}
          >
            <option className="form-select">Choose...</option>
            <option className="form-select" value="G">G</option>
            <option className="form-select" value="PG">PG</option>
            <option className="form-select" value="PG13">PG13</option>
            <option className="form-select" value="R">R</option>
            <option className="form-select" value="NC17">NC17</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="rating" className="form-label">Rating</label>
          <input
            type="text"
            className="form-control"
            id="rating"
            name="rating"
            value={movie?.rating ?? 0}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea
            rows={3}
            onChange={handleChange}
            className="form-control"
            id="description"
            name="description"
            value={movie?.description ?? ""}
          />
        </div>

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
