import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import "./App.css";
import CharactersList from "./components/pages/CharactersList";
import HeroPage from "./components/pages/HeroPage";

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/charactersList" exact component={CharactersList} />
      <Route path="/charactersList/:number" component={HeroPage} />
      <Redirect from="*" to="/charactersList" />
    </Switch>
  </BrowserRouter>
);

export default App;
