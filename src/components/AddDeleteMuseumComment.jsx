import React, { Component } from 'react'
import EditComment from './EditComment.jsx';
import apiHandler from '../api/apiHandler';

class AddDeleteMuseumComment extends Component {


  state = {
    comments: [],
    content :"",
    rating:"0",
  }

  componentDidMount(){
    apiHandler.
    getComments()
    .then((data) => {
      console.log(data);
      const thisMuseumComment = data.filter((museum)=>{
        if(this.props.id ===museum.placeMuseum) return museum
      })
      console.log(thisMuseumComment);
      this.setState({ comments: thisMuseumComment});
    })
    .catch((err) => console.log(err));
    }


  handleChange = (event) => {
    const { name, value } = event.target;
    console.log({ name, value });
    this.setState({
      [name]: value,
    });
  };

  getRate =(event)=>{
    const ratingValue = event.target.value;
    console.log(ratingValue);
    console.log(event.target.value);
    this.setState({ rating: ratingValue, });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { content,rating } = this.state;
    const id = this.props.id;
  
  apiHandler
  .addCommentMuseum(id,{ content,rating })
    .then((data) => {
      console.log({ content });
      this.setState({ comments:[  content,rating ,...this.state.comments]});
      console.log(this.state.comments);
      window.location.reload();
    })
    .catch((err) => console.log(err));
    
    this.setState({
      content: '',
    });
  }


  deleteComment =(event)=>{
    
    const comId = event.target.value;
    
    apiHandler
    .deleteComment(comId)
    .then(() => {
      // this.setState({ comments:[{content:[...this.state.comments]}]});
      console.log("pourquoi rafraichi pas");
    })
    .catch((err) => console.log(err));
    
    window.location.reload();
    }

    


  render() {
    // if (this.state.comments === undefined) {
    //   return <div>Loading...</div>;}
    console.log("mount");
    return (
      
      <div>
        <input name="content" type="text" value={this.state.content} onChange={this.handleChange}></input>
        <div>
          <label for="ratestar">rate:</label>
            <select value={this.state.rating} onChange={this.getRate}>
              <option name="rating" value="0">0</option>
              <option name="rating" value="1">1</option>
              <option name="rating" value="2">2</option>
              <option name="rating" value="3">3</option>
              <option name="rating" value='4'>4</option>
              <option name="rating" value="5" >5</option>
            </select>
          </div>
        <button onClick={this.handleSubmit} >add</button>
        
          {this.state.comments.map((comment) => (
             <div key={comment._id}>
             <h3>All comments from visitors</h3>
             <h4>user:{comment.user} </h4>
             <p>comment:{comment.content}</p>
             <h2>your rate: {comment.rating}</h2>  
             <EditComment id={comment._id}/>
             <button value={comment._id} onClick={this.deleteComment}>x</button>
         </div>  ))}
      </div>
    )
  }
}

export default AddDeleteMuseumComment;