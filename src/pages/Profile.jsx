import React from "react";
import { withUser } from "./../components/Auth/withUser";
import DeleteFav from "../components/DeleteFav";

const Profile = (props) => {
  console.log(props.context.user);

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

          {props.context.user.favorites.map((fav) => {
            if (fav.favMonuments != null) {
              return(
                <div key={fav.favMonuments._id}>
                <p>{fav.favMonuments.fields.tico}</p>
                <DeleteFav id={fav._id}/>
                </div>
              )
            } else if (fav.favMuseums != null) {
              return(
                <div key={fav.favMuseums._id}>
                <p>{fav.favMuseums.fields.nom_du_musee}</p>
                <DeleteFav id={fav._id}/>
                </div>
              )
            }
          })}

    </div>
  );
};

export default withUser(Profile);
