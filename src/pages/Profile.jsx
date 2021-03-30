import React, { Component } from 'react';
import { withUser } from "./../components/Auth/withUser";
import DeleteFav from "../components/DeleteFav";

class Profile extends Component {
  state = {
    user: null
  }

  componentDidMount() {
    this.setState({ user: this.props.context.user })
    console.log(this.props)
  }

  setValue() {
    this.setState({ user: this.props.context.user })
  }

  render() {
    if (this.state.user === null) {
      return <div>Loading...</div>;}

    return (
      <div>
        <h1>{this.state.user.firstName}'s profile</h1>
        <table>
          <thead>
            <tr>
              <th>Infos</th>
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
  
        <h3>My fav</h3>
  
        <DeleteFav
        favArray={this.state.user.favorites}
        value={{ value: this.state.value, setValue: this.setValue}}
      />

      </div>
    );
  }

};

export default withUser(Profile);
