import React, { Component } from 'react'
import EditComment from './EditComment.jsx';
import apiHandler from '../api/apiHandler';
import { withUser } from "../components/Auth/withUser";
import Rating from './Rating';
import './../styles/Comment.css'

class AddDeleteMuseumComment extends Component {

  state = {
    comments: [],
    content :"",
    rating:"",
  }

  getComments=()=>{
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

  componentDidMount(){
  this.getComments();
    }

    componentDidUpdate(prevProps, prevState){
  
      if (prevProps.id !== this.props.id ){
        this.getComments();
      }
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
        {this.props.context.isLoggedIn &&(  
        <div className="comment-container">
          <h2>Add a comment</h2>
          <input name="content" type="text" value={this.state.content} onChange={this.handleChange}></input>
        <div className="rate">
        <input onChange={this.getRate} type="radio" id="star5" name="rating" value="5" />
        <label for="star5" title="text">5 stars</label>
        <input onChange={this.getRate} type="radio" id="star4" name="rating" value="4" />
        <label for="star4" title="text">4 stars</label>
        <input onChange={this.getRate} type="radio" id="star3" name="rating" value="3" />
        <label for="star3" title="text">3 stars</label>
        <input onChange={this.getRate} type="radio" id="star2" name="rating" value="2" />
        <label for="star2" title="text">2 stars</label>
        <input onChange={this.getRate} type="radio" id="star1" name="rating" value="1" />
        <label for="star1" title="text">1 star</label>
          {/* <label for="ratestar">rate:</label>
            <select value={this.state.rating} onChange={this.getRate}>
            <option name="rating" >Evaluate</option>
              <option name="rating" value="1">1</option>
              <option name="rating" value="2">2</option>
              <option name="rating" value="3">3</option>
              <option name="rating" value='4'>4</option>
              <option name="rating" value="5" >5</option>
            </select> */}
          </div>
          <button className="btn04" onClick={this.handleSubmit} ><span>add</span></button>
        </div>)}
  
        <h3>All comments from visitors</h3>
          {this.state.comments.map((comment) => (
             <div key={comment._id}>
             
             <h4>user: {comment.user.firstName} {comment.user.lastName}</h4>
             <p>comment: {comment.content}</p>
             <h4>rate:</h4> <Rating>{comment.rating}</Rating>
             
             {this.props.context.isLoggedIn && this.props.context.user._id === comment.user._id && (
               <div >
               <EditComment  
               id={comment._id} 
               userId={comment.user._id}/>
             <button className="delete-btn" value={comment._id} onClick={this.deleteComment}>???</button>
             </div>)}
         </div>  ))}
      </div>
    )
  }
}

export default withUser(AddDeleteMuseumComment);