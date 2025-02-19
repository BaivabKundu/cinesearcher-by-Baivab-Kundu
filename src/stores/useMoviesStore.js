import { uniqBy, pipe, append } from "ramda";
import { create } from "zustand";

const useMoviesStore = create(set => ({
  movies: [],
  selectedMovie: null,
  setMovies: movie =>
    set(state => ({
      movies: pipe(
        append(movie),
        uniqBy(m => m.imdbID)
      )(state.movies),
    })),
  setSelectedMovie: movie => set({ selectedMovie: movie }),
}));

export default useMoviesStore;
