import React, { Component } from 'react'
import apiHandler from '../api/apiHandler';
import { Link } from "react-router-dom";
import axios from "axios";

 class TourismPlaces extends Component {

state ={
  monuments : null,
  museums: null,
 
}

componentDidMount(){
  apiHandler.
  getMonumentsList()
  .then((dataMonuments) => {
    // console.log(dataMonuments.monumentsRes);
    this.setState({ monuments: dataMonuments.monumentsRes });
  })
  .catch((err) => console.log(err));

  apiHandler.
  getMuseumsList()
  .then((dataMuseums) => {
    // console.log(dataMuseums.museumsRes);
    this.setState({ museums: dataMuseums.museumsRes });
  })
  .catch((err) => console.log(err));

}


searchPlaces =(event)=> {
    
  let value = event.target.value.toLowerCase();

  apiHandler.
  getMonumentsList()
  .then((dataMonuments) => {
    //  console.log(dataMonuments.monumentsRes);
    let searchArr = dataMonuments.monumentsRes ;
    let searchResult = searchArr.filter((monument)=>monument.fields.tico.toLowerCase().includes(value))

    console.log(searchResult);
     this.setState({ monuments: searchResult });
 
  })
  .catch((err) => console.log(err));

  apiHandler.
  getMuseumsList()
  .then((dataMuseums) => {
    //  console.log(dataMuseums.museumsRes);
    let searchArr = dataMuseums.museumsRes ;
    let searchResult = searchArr.filter((museum)=>museum.fields.nom_du_musee.toLowerCase().includes(value))

    console.log(searchResult);
     this.setState({ museums: searchResult });
  })
  .catch((error) => {
    console.log(error);
  });

 }




  render() {
    if (this.state.monuments === null || this.state.museums === null ) {
      return <div>Loading...</div>;}

    return (
   
<div>

<div>
  <input placeholder="Search" value={this.state.monuments.monumentsRes || this.state.museums.museumsRes}  onChange={this.searchPlaces} type="text"/> 
</div>

 <div> 

<table>
          <thead>
          <tr>
            <th>Name</th>
            <th>Google Maps Direction</th>
            <th>Detail</th>
          </tr>
          </thead>
          <tbody>
          {this.state.monuments.map((monument) => (
          <tr key={monument._id}>
            <td>{monument.fields.tico} </td>
            <td><a href={`https://www.google.com/maps/dir//${monument.fields.coordonnees_ban}`}>{monument.fields.coordonnees_ban}</a></td>
            <td> <button><Link to={`/places/monument/${monument._id}`}> Detail</Link></button>  </td>
          </tr>))}
          {this.state.museums.map((museum) => (
              <tr key={museum._id}>
              <td>{museum.fields.nom_du_musee} </td>
              <td><a href={`https://www.google.com/maps/dir//${museum.fields.coordonnees_finales}`}>{museum.fields.coordonnees_finales}</a></td>
              <td> <button><Link to={`/places/museum/${museum._id}`}> Detail</Link></button>  </td>
            </tr>
            ))}
          </tbody>
        </table>
</div>

 </div>       
    )
  }
}


export default TourismPlaces;