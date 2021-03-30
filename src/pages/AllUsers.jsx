import React, { Component } from 'react'
import apiHandler from '../api/apiHandler';
import { Link } from "react-router-dom";
import axios from "axios";

 class AllUsers extends Component {

state ={
  users : null,
}

componentDidMount(){
  apiHandler.
  getUsersList()
  .then((dataUsers) => {
    this.setState({ users: dataUsers.usersRes });
  })
  .catch((err) => console.log(err));
 
}

deleteUser = (event) => {
    const userId = event.target.value;
console.log(event.target.value);
console.log(this.state.users);
    apiHandler
    .deleteUser(userId)
    .then(() => {
        console.log("user deleted");
    })
    .catch((err) => console.log(err));
    window.location.reload();
}




  render() {
    if (this.state.users === null) {
      return <div>Loading...</div>;}

    return (

 <div> 

<table>
          <thead>
          <tr>
            <th>Account</th>
            <th>Delete</th>
            
          </tr>
          </thead>
          <tbody>
          {this.state.users.map((user) => (
          <tr key={user._id}>
            <td>{user.email} </td>
            <td> <button value={user._id} onClick={this.deleteUser}>x</button></td>
          </tr>))}
         
          </tbody>
        </table>
</div>

       
    )
  }
}


export default AllUsers;