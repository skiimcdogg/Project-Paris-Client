import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import apiHandler from "../api/apiHandler";

class DeleteFav extends Component {

    handleClick = (event) => {
        // event.preventDefault()

        const id = this.props.id;
        console.log(this.props.id)

          apiHandler.
          deleteFavorites(id)
          .then((response) => {
            console.log("favorite deleted")
          })
          .catch((error) => {
            console.log(error)
          })
          window.location.reload();
      }
    
    render() {
        return(
            <div>
                <button onClick={this.handleClick}> Delete </button>
            </div>
        )
    }
}

export default withRouter(DeleteFav);
