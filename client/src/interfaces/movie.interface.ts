export interface Genre {
  id: number;
  genre_name: string;
}

export interface MovieGenre {
  genre: Genre;
}

export interface Movie {
  id?: number | string;
  title: string;
  description: string;
  year: number | string;
  release_date: string;
  runtime: number;
  rating: number;
  mpaa_rating: string;
  genres: { [key: number]: string } | string[];
}
