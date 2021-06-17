import React from 'react';
import { useParams } from 'react-router-dom';

import { Movie } from '../interfaces/movie.interface';

export default function OneMovie() {

  const [movie, setMovie] = React.useState<Movie>();

  const { id } = useParams<{ id: string }>();

  React.useEffect(() => {
    setMovie({
      id: parseInt(id, 10),
      title: 'Some movie',
      runtime: 120,
    })
  }, [id]);

  return (
    <React.Fragment>
      <h2>
        Movie: {movie?.title} {movie?.id}
      </h2>

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
              <strong>Runtime: </strong>
              <strong>{movie?.runtime} minutes</strong>
            </td>
          </tr>
        </tbody>
      </table>
    </React.Fragment>
  );
}
