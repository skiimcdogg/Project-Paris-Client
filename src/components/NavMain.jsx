import React from "react";
import { NavLink } from "react-router-dom";
import { withUser } from "../components/Auth/withUser";
import apiHandler from "../api/apiHandler";
import arc from "./images/arc.png";
import "../styles/NavMain.css";



const NavMain = (props) => {
  const { context } = props;
  function handleLogout() {
    apiHandler
      .logout()
      .then(() => {
        context.removeUser();
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <nav className="NavMain">
      <NavLink exact to="/">
        <img className="logo" src={arc} alt="" />
      </NavLink>
      <ul className="nav-list">
        <li>
          {" "}
          <NavLink className="block" exact to="/places">
            Where to GO ?
          </NavLink>
        </li>
        {context.isLoggedIn && (
          <React.Fragment>
            <li>
              <NavLink className="block" to="/profile">
                {context.user && context.user.lastName}{" "}
                {context.user && context.user.firstName}
              </NavLink>
            </li>
            <li>
              <NavLink className="block" to="/users">
                {context.user.role === "admin" && "All Users"}
              </NavLink>
            </li>
            <li>
              <p className="block" onClick={handleLogout}>Logout</p>
            </li>
          </React.Fragment>
        )}
        {!context.isLoggedIn && (
          <React.Fragment>
            <li>
              <NavLink className="block" to="/signin">Log in</NavLink>
            </li>
            <li>
              <NavLink className="block" to="/signup">Create account</NavLink>
            </li>
          </React.Fragment>
        )}
      </ul>
    </nav>
  );
};
export default withUser(NavMain);
