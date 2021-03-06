import React, { Component } from "react";
import { withUser } from "./../components/Auth/withUser";
import DeleteFav from "../components/DeleteFav";

class Profile extends Component {
  state = {
    user: null,
  };

  componentDidMount() {
    this.setState({ user: this.props.context.user });
  }

  render() {
    if (this.state.user === null) {
      return <div>Loading...</div>;
    }
    return (
      <div>
        <h1 className="display-title">{this.state.user.firstName}'s profile</h1>
        <table className="table table-hover table-bordered with-margin">
          <thead className="thead-dark">
            <tr>
              <th colSpan="2">Infos</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Email: </td>
              <td> {this.state.user.email}</td>
            </tr>
            <tr>
              <td>LastName: </td>
              <td> {this.state.user.lastName}</td>
            </tr>
            <tr>
              <td>FirstName: </td>
              <td> {this.state.user.firstName}</td>
            </tr>
          </tbody>
        </table>

        <h3 className="display-title">My favorites places</h3>
        <DeleteFav favArray={this.state.user.favorites}/>
      </div>
    );
  }
}

export default withUser(Profile);
