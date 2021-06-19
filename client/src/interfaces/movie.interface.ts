export interface Genre {
  id: number;
  genre_name: string;
}

export interface MovieGenre {
  genre: Genre;
}

export interface Movie {
  id: number;
  title: string;
  description: string;
  year: number;
  release_date: Date;
  runtime: number;
  rating: number;
  mpaa_rating: string;
  genres: { [key: number]: string } | string[];
}
