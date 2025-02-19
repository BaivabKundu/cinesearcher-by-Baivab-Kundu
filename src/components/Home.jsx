import History from "./History";
import MoviePage from "./MoviePage";

const Home = () => (
  <div className="grid grid-cols-4">
    <div className="col-span-3">
      <MoviePage />
    </div>
    <div className="col-span-1 mx-4 my-10 flex justify-center">
      <History />
    </div>
  </div>
);

export default Home;
