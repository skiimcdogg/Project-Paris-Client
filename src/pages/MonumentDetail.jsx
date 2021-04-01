import React, { Component } from 'react'
import apiHandler from '../api/apiHandler';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl' // NEW
import "mapbox-gl/src/css/mapbox-gl.css"; //NEW
import { Link,withRouter } from "react-router-dom";
import AddDeleteMonumentComment from './../components/AddDeleteMonumentComment';
import Favorites from "../components/Favorites";
import { withUser } from "../components/Auth/withUser";

// mapboxgl.workerClass = require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default; 
// Inform your Mapbox token (https://www.mapbox.com/account/)
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN; // NEW

 class MonumentDetail extends Component {

  state = {
    Monument:null,
  }

  mapDomRef = React.createRef(null) // NEW
  map =React.createRef(null).current //NEW
  marker = React.createRef(null).current //NEW

  getMonument(){
  
    const id = this.props.match.params.id;
    apiHandler
    .getMonument(id)
    .then((data) => {
      console.log(data.monumentsRes);
      this.setState({ Monument: data.monumentsRes});
      const [lng,lat] = this.state.Monument.fields.coordonnees_ban; // NEW
      this.initMap(lng,lat) // NEW
    })
    .catch((err) => console.log(err));
  
  
  
  }
  
    componentDidMount(){
      this.getMonument();
  
    }
  
  
  
    componentDidUpdate(prevProps, prevState){
      if (prevProps.match.params.id!==this.props.match.params.id ){
        this.getMonument();
      }
    
    }


initMap = (lng,lat) => {
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

    if (this.state.Monument === null ) {
      return <div>Loading...</div>;}

    return (
      <div className='col-7' key={this.state.Monument._id}>
        <h1>{this.state.Monument.fields.tico}</h1>
        <h3> Adress: <br/> {this.state.Monument.fields.wadrs}</h3>
        {this.props.context.isLoggedIn &&(<Favorites />)}
        <div ref={this.mapDomRef} style={{height: 400, width: "100%"}}></div>
        <AddDeleteMonumentComment id={this.props.match.params.id}/>
        <Link to="/places">Back to list</Link>
      </div>
    )
  }
}


export default  withRouter(withUser(MonumentDetail));