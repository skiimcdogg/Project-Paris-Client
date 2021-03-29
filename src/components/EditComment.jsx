import React, { Component } from 'react'
import apiHandler from '../api/apiHandler';

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
    const comId = this.props.id
    const { content,rating } = this.state;

    apiHandler
    .editComment(comId,{ content,rating })
    .then(() => {
      // this.setState({ comments:[{content:[...this.state.comments]}]});
      window.location.reload();

    })
    .catch((err) => console.log(err));
  }

  render() {
    return (
      <div>
    <input type="text" name="content" value={this.state.content} onChange={this.handleChange}/>
    <div>
          <label for="ratestar">rate:</label>
            <select value={this.state.rating} onChange={this.getRate}>
              <option name="rating" value="1">1</option>
              <option name="rating" value="2">2</option>
              <option name="rating" value="3">3</option>
              <option name="rating" value='4'>4</option>
              <option name="rating" value="5" >5</option>
            </select>
          </div>
  <button onClick={this.editComment}>modify</button>
      </div>
    )
  }
}

export default EditComment;