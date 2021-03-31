import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import apiHandler from "../api/apiHandler";

class Favorites extends Component {

    handleSubmit = (event) => {
        event.preventDefault()

        const id = this.props.match.params.id;

          apiHandler
          .addFavorites(id)
          .then((response) => {
            console.log("favorite added")
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
                <button> Add to favorites </button>
                </form>
            </div>
        )
    }
}

export default withRouter(Favorites);
