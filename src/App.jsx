import { Redirect, Route, Switch } from "react-router-dom";

import "./App.css";
import PageNotFound from "./components/commons/PageNotFound";
import Home from "./components/Home";
import routes from "./routes";

const App = () => (
  <Switch>
    <Route exact component={Home} path={`${routes.movies.index}/:search?`} />
    <Redirect exact path={routes.root} to={routes.movies.index} />
    <Route component={PageNotFound} path="*" />
  </Switch>
);

export default App;
