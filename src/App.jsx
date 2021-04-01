import React from "react";
import { Switch, Route } from "react-router-dom";
import NavMain from "./components/NavMain";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import TourismPlaces from "./pages/TourismPlaces";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/Profile";
import AllUsers from "./pages/AllUsers";
import {withRouter} from "react-router-dom";

function App() {
 

  return (
    <div className="App">
    
    <NavMain />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/signin" component={Signin} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/users" component={AllUsers} />
        <Route  path="/places" component={TourismPlaces} />
 
        <ProtectedRoute exact path="/profile" component={Profile} />
      </Switch>
    </div>
  );
}

export default withRouter(App);
