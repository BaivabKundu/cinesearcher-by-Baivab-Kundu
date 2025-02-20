import { DEFAULT_POSTER_URL } from "../MoviePage/constants";

export const FallbackImage = ({ title, poster }) => (
  <img
    alt={title}
    className="neeto-ui-rounded-lg h-full w-full object-cover"
    src={poster !== "N/A" ? poster : DEFAULT_POSTER_URL}
  />
);
