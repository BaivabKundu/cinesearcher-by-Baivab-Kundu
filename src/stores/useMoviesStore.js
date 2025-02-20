import { uniqBy, pipe, append } from "ramda";
import { create } from "zustand";

const useMoviesStore = create(set => ({
  movies: [],
  lastSelectedMovie: null,
  setMovies: movie =>
    set(state => ({
      movies: pipe(
        append(movie),
        uniqBy(m => m.imdbID)
      )(state.movies),
    })),
  setLastSelectedMovie: movie => set({ lastSelectedMovie: movie }),
}));

export default useMoviesStore;
