import { removeBy } from "neetocist";
import { uniqBy, pipe, append } from "ramda";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useMoviesStore = create(
  persist(
    set => ({
      movies: [],
      lastSelectedMovie: null,
      addMovieToHistory: movie =>
        set(state => ({
          movies: pipe(
            append(movie),
            uniqBy(m => m.imdbID)
          )(state.movies),
        })),
      setLastSelectedMovie: movie => set({ lastSelectedMovie: movie }),
      removeMovieFromHistory: movieId =>
        set(state => ({
          movies: removeBy({ imdbID: movieId }, state.movies),
        })),
      clearAllMoviesFromHistory: () => set({ movies: [] }),
    }),
    {
      name: "movies",
    }
  )
);

export default useMoviesStore;
