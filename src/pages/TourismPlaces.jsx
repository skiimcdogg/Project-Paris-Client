import React, { Component } from "react";
import apiHandler from "../api/apiHandler";
import { Link } from "react-router-dom";

class TourismPlaces extends Component {
  state = {
    monuments: null,
    museums: null,
    monumentsDisplay: true,
    museumsDisplay: true,
    isShow:false, 
    setIsShow:false,
  };

  componentDidMount() {
    apiHandler
      .getMonumentsList()
      .then((dataMonuments) => {
        // console.log(dataMonuments.monumentsRes);
        this.setState({ monuments: dataMonuments.monumentsRes });
      })
      .catch((err) => console.log(err));

    apiHandler
      .getMuseumsList()
      .then((dataMuseums) => {
        // console.log(dataMuseums.museumsRes);
        this.setState({ museums: dataMuseums.museumsRes });
      })
      .catch((err) => console.log(err));
  }

  displayMonuments = (event) => {
    console.log(this.state.monumentsDisplay);
    if(this.state.monumentsDisplay) {
      this.setState({ monumentsDisplay: false})
    } else {
      this.setState({ monumentsDisplay: true})
    }
  }

  displayMuseums = (event) => {
    console.log(this.state.museumsDisplay);
    if(this.state.museumsDisplay) {
      this.setState({ museumsDisplay: false})
    } else {
      this.setState({ museumsDisplay: true})
    }
  }
  

  searchPlaces = (event) => {
    let value = event.target.value.toLowerCase();

    apiHandler
      .getMonumentsList()
      .then((dataMonuments) => {
        //  console.log(dataMonuments.monumentsRes);
        let searchArr = dataMonuments.monumentsRes;
        let searchResult = searchArr.filter((monument) =>
          monument.fields.tico.toLowerCase().includes(value)
        );

        console.log(searchResult);
        this.setState({ monuments: searchResult });
      })
      .catch((err) => console.log(err));

    apiHandler
      .getMuseumsList()
      .then((dataMuseums) => {
        //  console.log(dataMuseums.museumsRes);
        let searchArr = dataMuseums.museumsRes;
        let searchResult = searchArr.filter((museum) =>
          museum.fields.nom_du_musee.toLowerCase().includes(value)
        );

        console.log(searchResult);
        this.setState({ museums: searchResult });
      })
      .catch((error) => {
        console.log(error);
      });
  };




  render() {
    if (this.state.monuments === null || this.state.museums === null) {
      return <div>Loading...</div>;
    }

    return (
     <div>

      <div>
          <input
            placeholder="Search"
            value={
              this.state.monuments.monumentsRes || this.state.museums.museumsRes
            }
            onChange={this.searchPlaces}
            type="text"
          />   
           <div>
          <label>Only Monuments </label>
          <input
            onChange={this.displayMonuments}
            type="checkbox"/>
      </div>
    <div>
          <label>Only Museums </label>
          <input
            onChange={this.displayMuseums}
            type="checkbox"
          />
        </div>
       </div>
      <div >  

        <div>
          <table>
            <thead>
              <tr>
                <th >Name</th>
                <th>Google Maps Direction</th>
                <th>Detail</th>
              </tr>
            </thead>
            <tbody>
              {this.state.monuments.map((monument) => {
                if(this.state.museumsDisplay === true) {
                return (
                <tr key={monument._id}>
                  <td>{monument.fields.tico} </td>
                  <td>
                    <a
                      href={`https://www.google.com/maps/dir//${monument.fields.coordonnees_ban}`}
                    >
                      {monument.fields.coordonnees_ban}
                    </a>
                  </td>
                  <td>
                    
                    <button>
                      <Link to={`/places/monument/${monument._id}`}>
                      
                        Detail
                      </Link>
                    </button>
                  </td>
                </tr>
                )} else if (this.state.museumsDisplay === false) {
                  <div> </div>
                }
              })} 
              
              {this.state.museums.map((museum) => {
                if(this.state.monumentsDisplay === true) {
                  return (

                <tr key={museum._id}>
                  <td>{museum.fields.nom_du_musee} </td>
                  <td>
                    <a
                      href={`https://www.google.com/maps/dir//${museum.fields.coordonnees_finales}`}
                    >
                      {museum.fields.coordonnees_finales}
                    </a>
                  </td>
                  <td>
                    {" "}
                    <button>
                      <Link to={`/places/museum/${museum._id}`}> Detail</Link>
                    </button>{" "}
                  </td>
                </tr>
                  )
                } else if(this.state.monumentsDisplay === false) {
                <div> </div>
              }
                
  })}
            </tbody>
          </table>
        </div>
      </div>
      </div>
    );
  }
}

export default TourismPlaces;
