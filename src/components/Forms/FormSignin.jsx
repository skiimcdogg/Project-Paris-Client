import React, { Component } from "react";
import { withRouter, Redirect } from "react-router-dom";
import apiHandler from "../../api/apiHandler";
import { withUser } from "../Auth/withUser";
import "./../../styles/main.css"
import "./../../styles/basicStyles.css"

class FormSignin extends Component {
  state = {
    email: "",
    password: "",
  };

  handleChange = (event) => {
    const key = event.target.name;
    const value = event.target.value;

    this.setState({ [key]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    apiHandler
      .signin(this.state)
      .then((data) => {
        this.props.context.setUser(data);
      })
      .catch((error) => {
        console.log(error);
        // Display error message here, if you set the state
      });
  };

  render() {
    if (this.props.context.user) {
      return <Redirect to="/" />;
    }

    return (
      <form className="main-form" onChange={this.handleChange} onSubmit={this.handleSubmit}>
        <div className="form-group">
        <label htmlFor="email">Email</label>
        <input className="form-control" type="email" id="email" name="email" />
        </div>
        <div className="form-group">
        <label htmlFor="password">Password</label>
        <input className="form-control" type="password" id="password" name="password" />
        </div>
        <button className="form-control btn-outline-dark">Log In</button>
      </form>
    );
  }
}

export default withRouter(withUser(FormSignin));
