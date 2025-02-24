import { t } from "i18next";
import withTitle from "utils/withTitle";

import History from "./History";
import MoviePage from "./MoviePage";

const Home = () => (
  <div className="fixed inset-x-0 top-0 mt-10 grid h-full grid-cols-4">
    <div className="col-span-3 mt-5 overflow-y-auto">
      <MoviePage />
    </div>
    <div className="col-span-1 mx-4 my-10 flex h-full justify-center overflow-y-auto">
      <History />
    </div>
  </div>
);

export default withTitle(Home, t("title.home"));
