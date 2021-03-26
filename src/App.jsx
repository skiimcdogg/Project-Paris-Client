import React from "react";
import { Switch, Route } from "react-router-dom";
import NavMain from "./components/NavMain";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import TourismPlaces from "./pages/TourismPlaces";
import MonumentDetail from "./pages/MonumentDetail";
import MuseumDetail from "./pages/MuseumDetail";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/Profile";

function App() {
  return (
    <div className="App">
      <NavMain />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/signin" component={Signin} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/places" component={TourismPlaces} />
        <Route exact path="/places/monument/:id" component={MonumentDetail} />
        <Route exact path="/places/museum/:id" component={MuseumDetail}  />
        <ProtectedRoute exact path="/profile" component={Profile} />
      </Switch>
    </div>
  );
}

export default App;
