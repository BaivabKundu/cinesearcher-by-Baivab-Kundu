import History from "./History";
import MoviePage from "./MoviePage";

const Home = () => (
  <div className="grid h-screen grid-cols-4">
    <div className="col-span-3 overflow-y-auto">
      <MoviePage />
    </div>
    <div className="col-span-1 mx-4 my-10 flex justify-center overflow-y-auto">
      <History />
    </div>
  </div>
);

export default Home;
