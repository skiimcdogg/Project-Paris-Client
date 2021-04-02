import React, { Component } from 'react'
import apiHandler from '../api/apiHandler';
import { withUser } from "../components/Auth/withUser";
import './../styles/Comment.css'

class EditComment extends Component {

  state = {
    formVisible: false,
    content :"",
    rating:"",
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
    this.setState({ rating: ratingValue });
  }

  handleDisplayForm = () => {
    this.setState({ formVisible: !this.state.formVisible });
  };

  editComment =(event)=>{
    const comId = event.target.value;
    const { content,rating } = this.state;

    apiHandler
    .editComment(comId,{ content,rating })
    .then((data) => {
      console.log(data);
      this.setState({data});
      window.location.reload();

    })
    .catch((err) => console.log(err));
    this.setState({
      content: '',
      rating:'',
    });
  }

  render() {
  console.log(this.props.useId)
  console.log(this.props.id)
    return (
      <div>
        <button className="btn05" onClick={this.handleDisplayForm}>
          <span>edit</span>
        </button>
      {this.state.formVisible && this.props.context.isLoggedIn && this.props.context.user._id === this.props.userId && (
         <div className="comment-container" key={this.props.userId}>
           <h2>Edit your comment</h2>
         <input type="text" name="content" value={this.state.content} onChange={this.handleChange}/>
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
             </div>
             {/* <label for="ratestar">rate:</label>
            <select value={this.state.rating} onChange={this.getRate}>
            <option name="rating" >Evaluate</option>
              <option name="rating" value="1">1</option>
              <option name="rating" value="2">2</option>
              <option name="rating" value="3">3</option>
              <option name="rating" value='4'>4</option>
              <option name="rating" value="5" >5</option>
            </select> */}
                    <button className="btn04" value={this.props.id} onClick={this.editComment}><span>modify</span></button> 
         </div>
            )}
       </div>
    )
  }
}

export default withUser(EditComment);