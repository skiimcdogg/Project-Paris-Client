import React, { Component } from 'react'
import EditComment from './EditComment';
import apiHandler from '../api/apiHandler';
import { withUser } from "../components/Auth/withUser";
import Rating from './Rating';

class AddDeleteMonumentComment extends Component {

  state = {
    comments: [],
    content :"",
    rating:"",
  }

  componentDidMount(){
  apiHandler
  .getComments()
  .then((data) => {
    const thisMonumentComment = data.filter((monument)=>{
      if(this.props.id ===monument.placeMonument) return monument   
    }) 
    this.setState({ comments: thisMonumentComment});
  })
  .catch((err) => console.log(err));
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { content,rating} = this.state;
    const id = this.props.id;
  
  apiHandler
  .addCommentMonument(id,{ content,rating })
    .then((data) => {
      this.setState({ comments:[data,...this.state.comments]});
    })
    .catch((err) => console.log(err));
    
    this.setState({
      content: '',
      rating:"",
    });
  }

  getRate =(event)=>{
    const ratingValue = event.target.value;
    this.setState({ rating: ratingValue, });
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
          <div>
          <h2>Add a comment</h2>
          <input name="content" type="text" value={this.state.content} onChange={this.handleChange}/>
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
          </div>
           
        )}      
       
          {this.state.comments.map((comment) => (
            
             <div key={comment._id}>
             <h3>All comments from visitors</h3>
             <h4>user: {comment.user.firstName} {comment.user.lastName}</h4>
             <p>comment: {comment.content}</p>
             <h4>rate:</h4> <Rating>{comment.rating}</Rating>
            
            
             {this.props.context.isLoggedIn && this.props.context.user._id === comment.user._id && (
                <div>
                  <EditComment 
                id={comment._id} 
                userId={comment.user._id}/>
                <button value={comment._id} onClick={this.deleteComment}>x</button>
                </div>
             )}
         
         </div>
        ))}
      </div>
    )
  }
}

export default  withUser(AddDeleteMonumentComment);