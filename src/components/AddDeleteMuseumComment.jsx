import React, { Component } from 'react'
import EditComment from './EditComment.jsx';
import apiHandler from '../api/apiHandler';
import { withUser } from "../components/Auth/withUser";
import Rating from './Rating';

class AddDeleteMuseumComment extends Component {

  state = {
    comments: [],
    content :"",
    rating:"",
  }

  componentDidMount(){
    apiHandler
    .getComments()
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
      this.setState({ comments:[data,...this.state.comments]});
    })
    .catch((err) => console.log(err));
    
    this.setState({
      content: '',
      rating:'',
    });
  }

  deleteComment =(event)=>{
    
    const comId = event.target.value;
    
    apiHandler
    .deleteComment(comId)
    .then((commentDB) => {
      const copyArray = this.state.comments;
      const filterdArr = copyArray.filter((comment) => { 
        const deleteId = commentDB._id
       return comment._id !== deleteId}
      ) 
      this.setState({ comments:filterdArr});
    })
    .catch((err) => console.log(err));
    }

  render() {
  
    return (
      
      <div>
        {this.props.context.isLoggedIn &&(  <div>
          <h2>Add a comment</h2>
          <input name="content" type="text" value={this.state.content} onChange={this.handleChange}></input>
        <div>
          <label for="ratestar">rate:</label>
            <select value={this.state.rating} onChange={this.getRate}>
            <option name="rating" >Evaluate</option>
              <option name="rating" value="1">1</option>
              <option name="rating" value="2">2</option>
              <option name="rating" value="3">3</option>
              <option name="rating" value='4'>4</option>
              <option name="rating" value="5" >5</option>
            </select>
          </div>
          <button onClick={this.handleSubmit} >add</button>
        </div>)}
  
        
          {this.state.comments.map((comment) => (
             <div key={comment._id}>
             <h3>All comments from visitors</h3>
             <h4>user: {comment.user.firstName} {comment.user.lastName}</h4>
             <p>comment: {comment.content}</p>
             <h4>rate:</h4> <Rating>{comment.rating}</Rating>
             <EditComment  
             id={comment._id} 
             userId={comment.user._id}/>
             {this.props.context.isLoggedIn && this.props.context.user._id === comment.user._id && (
             <button value={comment._id} onClick={this.deleteComment}>x</button>)}
         </div>  ))}
      </div>
    )
  }
}

export default withUser(AddDeleteMuseumComment);