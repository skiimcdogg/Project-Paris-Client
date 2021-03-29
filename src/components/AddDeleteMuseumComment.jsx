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
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { content } = this.state;
    const id = this.props.id;
  
  apiHandler
  .addCommentMuseum(id,{ content })
    .then((data) => {
      console.log({ content });
      this.setState({ comments:[ content,...this.state.comments]});
      console.log(this.state.comments);
      // window.location.reload();
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
        {/* <div>
          <label for="ratestar">rate:</label>
            <select>
            <option value="rating">--Rate this place--</option>
              <option onChange={this.handleChange} name="rating" value="0">0</option>
              <option onChange={this.handleChange} name="rating" value="1">1</option>
              <option onChange={this.handleChange} name="rating" value="2">2</option>
              <option onChange={this.handleChange} name="rating" value="3">3</option>
              <option onChange={this.handleChange} name="rating" value="4">4</option>
              <option onChange={this.handleChange} name="rating" value="5">5</option>
            </select>
          </div> */}
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