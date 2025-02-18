import React from "react";

import MovieCard from "./MovieCard";

const MovieList = ({ movies }) => (
  <div className="mx-5 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
    {movies.map(movie => (
      <MovieCard key={movie.imdbID} movie={movie} />
    ))}
  </div>
);

export default MovieList;
