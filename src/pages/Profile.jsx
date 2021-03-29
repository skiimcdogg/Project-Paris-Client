import React from "react";
import { withUser } from "./../components/Auth/withUser";
import DeleteFav from "../components/DeleteFav";

const Profile = (props) => {
  console.log(props.context.user.favorites);

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
          </tr>
          <tr>
            <td>LastName: </td>
            <td> {props.context.user.lastName}</td>
          </tr>
          <tr>
            <td>FirstName: </td>
            <td> {props.context.user.firstName}</td>
          </tr>
        </tbody>
      </table>

      <h3>Mes favoris:</h3>
      <p>{props.context.user.favorites[0].favMonuments.fields.tico}</p>
      <p>{props.context.user.favorites[1].favMonuments.fields.tico}</p>

      {props.context.user.favorites.map((fav) => {
        if (fav.monuments != null) {
          return(
            <div key={fav.id}>
            <p>{fav.favMonuments.fields.tico}</p>
            <DeleteFav />
            </div>
          )
        } else if (fav.favMuseums != null) {
          return(
            <div key={fav.id}>
            <p>{fav.favMuseums.fields.nom_du_musee}</p>
            <DeleteFav />
            </div>
          )
        } else {
          <p>Nothing here!</p>
        }
      })}


      {/* {props.context.user.favorites.map((fav) => {
        return(
          <div key={fav.id}>
          <p>{fav.favMuseums.fields.nom_du_musee}</p>
          </div>
        )
      })} */}
    </div>
  );
};

export default withUser(Profile);
