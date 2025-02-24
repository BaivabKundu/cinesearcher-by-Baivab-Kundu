import Header from "components/commons/Header";
import PageNotFound from "components/commons/PageNotFound";
import Favourites from "components/Favourites";
import Home from "components/Home";
import { Redirect, Route, Switch } from "react-router-dom";

import "./App.css";
import routes from "./routes";

const App = () => (
  <>
    <Header />
    <Switch>
      <Route exact component={Home} path={routes.movies} />
      <Route exact component={Favourites} path={routes.favourites} />
      <Redirect exact from={routes.root} to={routes.movies} />
      <Route component={PageNotFound} path="*" />
    </Switch>
  </>
);

export default App;
