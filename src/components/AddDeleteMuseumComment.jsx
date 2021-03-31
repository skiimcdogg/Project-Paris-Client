import React, { Component } from 'react'
import EditComment from './EditComment.jsx';
import apiHandler from '../api/apiHandler';

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
      console.log(data);
      console.log({data,...this.state.comments});
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
   
      console.log(commentDB);
      const copyArray = this.state.comments;
      const filterdArr = copyArray.filter((comment) => { 
        console.log(comment);
        const deleteId = commentDB._id
       return comment._id !== deleteId}
      ) 
      this.setState({ comments:filterdArr});
      console.log("pourquoi rafraichi pas");
    })
    .catch((err) => console.log(err));
  
    }

    


  render() {

  
    return (
      
      <div>
        <input name="content" type="text" value={this.state.content} onChange={this.handleChange}></input>
        <button onClick={this.handleSubmit} >add</button>
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
       
        
          {this.state.comments.map((comment) => (
             <div key={comment._id}>
             <h3>All comments from visitors</h3>
             <h4>user:{comment.user.firstName}{comment.user.lastName}</h4>
             <p>comment:{comment.content}</p>
             <h2>your rate: {comment.rating}</h2>  
             <EditComment content={this.state.content} rating={this.state.rating} comArray={this.state.comments}  id={comment._id}/>
             <button value={comment._id} onClick={this.deleteComment}>x</button>
         </div>  ))}
      </div>
    )
  }
}

export default AddDeleteMuseumComment;