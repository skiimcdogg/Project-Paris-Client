import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { withUser } from "./Auth/withUser";
import apiHandler from "../api/apiHandler";
import heart from "./images/heart.png";

class Favorites extends Component {

    handleSubmit = (event) => {
        event.preventDefault()

        const id = this.props.match.params.id;

          apiHandler
          .addFavorites(id)
          .then((response) => {
            console.log("favorite added")
              console.log(response)
            this.props.context.setUser(response)
          })
          .catch((error) => {
            console.log(error)
          })
      }
    
    render() {
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                <input type="hidden" name="favMuseums" value={this.props.match.params.id}/>
                <input type="hidden" name="favMonuments" value={this.props.match.params.id}/>
                <button><img className="logo" src={heart} alt="like"/></button>
                </form>
            </div>
        )
    }
}

export default withRouter(withUser(Favorites));
