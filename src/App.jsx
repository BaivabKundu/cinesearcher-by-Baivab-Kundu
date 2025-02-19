import { Route, Switch } from "react-router-dom";

import "./App.css";
import Home from "./components/Home";
import routes from "./routes";

const App = () => (
  <Switch>
    <Route exact component={Home} path={routes.root} />
  </Switch>
);

export default App;
