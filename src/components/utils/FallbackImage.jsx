import { DEFAULT_POSTER_URL } from "../MoviePage/constants";

export const FallbackImage = ({ movie }) => (
  <img
    alt={movie.title}
    className="neeto-ui-rounded-lg h-full w-full object-cover"
    src={movie.poster !== "N/A" ? movie.poster : DEFAULT_POSTER_URL}
  />
);
