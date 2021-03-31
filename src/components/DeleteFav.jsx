import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import apiHandler from "../api/apiHandler";
import { withUser } from "./Auth/withUser";

class DeleteFav extends Component {
  state = {
    favorites: [],
  };

  componentDidMount() {
      this.setState({ favorites: this.props.favArray });
  }

  handleClick = (event) => {
    const id = event.target.value;

    apiHandler
      .deleteFavorites(id)
      .then((response) => {
        const copyArray = this.state.favorites;
        const filteredArr = copyArray.filter((favorite) => {
          const deletedId = response._id;
          return favorite._id !== deletedId;
        });
        const user = this.props.context.user;
        this.props.context.setUser({ ...user, favorites: filteredArr })
        this.setState({ favorites: filteredArr });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    if (this.state.favorites === []) {
      return <div>Nothing yet</div>;
    }

    return (
      <div>
        {this.state.favorites.map((fav) => {
          if (fav.favMonuments != null) {
            return (
              <div key={fav._id}>
                <p>{fav.favMonuments.fields.tico}</p>
                <button onClick={this.handleClick} value={fav._id}>
                  Delete
                </button>
              </div>
            );
          } else if (fav.favMuseums != null) {
            return (
              <div key={fav._id}>
                <p>{fav.favMuseums.fields.nom_du_musee}</p>
                <button onClick={this.handleClick} value={fav._id}>
                  Delete
                </button>
              </div>
            );
          }
        })}
      </div>
    );
  }
}

export default withRouter(withUser(DeleteFav));
