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

  editComment =(event)=>{
    const comId = this.props.id
    const { content } = this.state;

    apiHandler
    .editComment(comId,{ content })
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
            <select>
            <option value="rating">--Rate this place--</option>
              <option name="rating" value="0">0</option>
              <option name="rating" value="1">1</option>
              <option name="rating" value="2">2</option>
              <option name="rating" value="3">3</option>
              <option name="rating" value="4">4</option>
              <option name="rating" value="5">5</option>
            </select>
          </div>
  <button onClick={this.editComment}>modify</button>
      </div>
    )
  }
}

export default EditComment;