import React, { Component } from "react";
import { withRouter, Redirect } from "react-router-dom";
import { withUser } from "../Auth/withUser";
import apiHandler from "../../api/apiHandler";
import "./../../styles/main.css"

class FormSignup extends Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };

  handleChange = (event) => {
    const value = event.target.value;
    const key = event.target.name;

    this.setState({ [key]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    apiHandler
      .signup(this.state)
      .then((data) => {
        this.props.context.setUser(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    if (this.props.context.user) {
      return <Redirect to="/" />;
    }

    return (
      <form className="main-form" onSubmit={this.handleSubmit}>
        <div className="row">
          <div className="col">
            <div className="form-group">
              <label htmlFor="firstName">First Name: </label>
              <input
                className="form-control"
                onChange={this.handleChange}
                value={this.state.firstName}
                type="text"
                id="firstName"
                name="firstName"
              />
            </div>
          </div>
          <div className="col">
            <div className="form-group">
              <label htmlFor="lastName">Last Name: </label>
              <input
                className="form-control"
                onChange={this.handleChange}
                value={this.state.lastName}
                type="text"
                id="lastName"
                name="lastName"
              />
            </div>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="email">Email: </label>
          <input
            className="form-control"
            onChange={this.handleChange}
            value={this.state.email}
            type="email"
            id="email"
            name="email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password: </label>
          <input
            className="form-control"
            onChange={this.handleChange}
            value={this.state.password}
            type="password"
            id="password"
            name="password"
          />
        </div>
        <button className="form-control btn-outline-dark">Submit</button>
      </form>
    );
  }
}

export default withRouter(withUser(FormSignup));
