import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import apiHandler from "../api/apiHandler";

class DeleteFav extends Component {

    handleSubmit = (event) => {
        event.preventDefault()

        const id = this.props.match.params.id;

          apiHandler.
          deleteFavorites(id)
          .then((response) => {
            console.log("favorite deleted")
          })
          .catch((error) => {
            console.log(error)
          })
      }
    
    render() {
        return(
            <div>
                <button onClick={this.handleClick}> Delete this favorite </button>
            </div>
        )
    }
}

export default withRouter(DeleteFav);
