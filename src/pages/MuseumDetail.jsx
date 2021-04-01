import React, { Component } from 'react'
import apiHandler from '../api/apiHandler';
import { Link,withRouter } from "react-router-dom";
import mapboxgl from 'mapbox-gl/dist/mapbox-gl' // NEW
import "mapbox-gl/src/css/mapbox-gl.css"; //NEW
import AddDeleteMuseumComment from './../components/AddDeleteMuseumComment';
import Favorites from "../components/Favorites";
import { withUser } from "../components/Auth/withUser";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN; // NEW


 class MuseumDetail extends Component {

    state = {
   
    Museum:null,
  }

  mapDomRef = React.createRef(null) // NEW
  map =React.createRef(null).current //NEW
  marker = React.createRef(null).current //NEW

  getMuseum(){

    const id = this.props.match.params.id;

    apiHandler
    .getMuseum(id)
    .then((data) => {
      console.log(data.museumsRes);
      this.setState({ Museum: data.museumsRes});
      const [lng,lat] = this.state.Museum.fields.coordonnees_finales; // NEW
      this.initMap(lng,lat) // NEW

    })
    .catch((err) => console.log(err));
  }


  componentDidMount(){
      this.getMuseum();
}


  componentDidUpdate(prevProps, prevState){
    console.log("I am upodating, look at my beautiful props changing !", this.props.match.params.id, "what do i do with this ?")

    if (prevProps.match.params.id !== this.props.match.params.id ){
      this.getMuseum();
    }
  }




initMap = (lat,lng) => {
  // NEW METHOD
  // Embed the map where "mapDomRef" is defined in the render
  this.map = new mapboxgl.Map({
    container: this.mapDomRef.current,
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [lng,lat],
    zoom: 15,
  })

  // Add zoom control on the top right corner
  this.map.addControl(new mapboxgl.NavigationControl())

  // Create a marker on the map with the coordinates ([lng, lat])
  this.marker = new mapboxgl.Marker({ color: 'red' })
    .setLngLat([lng,lat])
    .addTo(this.map)
}



  render() {
      if ( this.state.Museum === null ) {
      return <div>Loading...</div>;}
    return (
      <div>
         <h1>{this.state.Museum.fields.nom_du_musee}</h1>
        <h3> Adress:<br/>  {this.state.Museum.fields.adr}</h3>
        <p>Ouverture:<br/> {this.state.Museum.fields.periode_ouverture}</p>
        <p>Fermeture annuelle:  <br/> {this.state.Museum.fields.fermeture_annuelle}</p>
        {this.props.context.isLoggedIn &&(<Favorites />)}
        <div ref={this.mapDomRef} style={{height: 400, width: "100%"}}></div>
        <AddDeleteMuseumComment id={this.props.match.params.id}/>
        <Link to="/places">Back to list</Link>
      </div>
    )
  }
}

export default withRouter(withUser(MuseumDetail));