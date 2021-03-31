import React, { Component } from 'react'
import apiHandler from '../api/apiHandler';
import { withUser } from "../components/Auth/withUser";

class EditComment extends Component {

  state = {
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
    this.setState({ rating: ratingValue, });
  }



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
       
      {this.props.context.isLoggedIn && this.props.context.user._id === this.props.userId && (
         <div key={this.props.userId}>
         <input type="text" name="content" value={this.state.content} onChange={this.handleChange}/>
                  <label for="ratestar">rate:</label>
                    <select value={this.state.rating} onChange={this.getRate}>
                      <option name="rating" >Evaluate</option>
                      <option name="rating" value="1">1</option>
                      <option name="rating" value="2">2</option>
                      <option name="rating" value="3">3</option>
                      <option name="rating" value='4'>4</option>
                      <option name="rating" value="5" >5</option>
                    </select>
                    <button value={this.props.id} onClick={this.editComment}>modify</button> 
         </div>
            )}
       </div>
    )
  }
}

export default withUser(EditComment);