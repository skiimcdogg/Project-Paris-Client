import React from "react";
import parisVideo from '../components/video/parisVideo.mp4';
import "../styles/Home.css";

class Home extends React.Component {
  render() {
    return (
    
      <div className="video-container" >
     <h1 class="fade-in01">Find your Paris</h1>

    
          <video autoPlay loop muted>
        <source src={parisVideo} type='video/mp4'/>
        </video>
       

      </div>
      
   
    );
  }
}

export default Home;
