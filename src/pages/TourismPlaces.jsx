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

  axios
  .get(`http://localhost:4000/api/places/search?q=${value}`)
  .then((all) => {
   console.log(all);
    // let searchArr = beers.data ;
    // let searchResult = searchArr.filter((beer)=>beer.name.toLowerCase().includes(value))

    // console.log(searchResult);
    //  this.setState({ beers: searchResult });
  })
  .catch((error) => {
    console.log(error);
  });
//  apiHandler.
//  getSearchList
//  .get()
//  .then((allDB) => {
// console.log( allDB);
//    let searchArr = monument ;
//    let searchResult = searchArr.filter((monu)=>monu.tico.toLowerCase().includes(value))

//    console.log(searchResult);
//     this.setState({ beers: searchResult });
//  })
//  .catch((error) => {
//    console.log(error);
//  });
 }




  render() {
    if (this.state.monuments === null || this.state.museums === null ) {
      return <div>Loading...</div>;}

    return (
   
<div>

<div>
  <input placeholder="Search"  onChange={this.searchPlaces} type="text"/> 
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