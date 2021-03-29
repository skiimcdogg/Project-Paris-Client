import React from "react";
import { withUser } from "./../components/Auth/withUser";

const Profile = (props) => {
  console.log(props.context.user.favorites);

  const favMonuments = [];

  props.context.user.favorites.forEach((elem) => {
    favMonuments.push(elem);
  })
  console.log(favMonuments);

  return (
    <div>
      <h1>Protected profile</h1>
      <table>
        <thead>
          <tr>
            <th>Infos</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Email: </td>
            <td> {props.context.user.email}</td>
            <td>cell2_1</td>
          </tr>
          <tr>
            <td>LastName: </td>
            <td> {props.context.user.lastName}</td>
            <td>cell2_2</td>
          </tr>
          <tr>
            <td>FirstName: </td>
            <td> {props.context.user.firstName}</td>
            <td>cell2_3</td>
          </tr>
        </tbody>
      </table>
      <p>{props.context.user.favorites[0].favMonuments.fields.adrs}</p>
      {props.context.user.favorites.map((fav) => {
        <p>{fav.favMonuments}</p>
      })}
      <p>{favMonuments.fields}</p>
    </div>
  );
};

export default withUser(Profile);
