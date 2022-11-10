
import React, { Component } from 'react'

class Form extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
        username: '',
        comments: "",
        topic: "me"
      }
    //   below is a class property
      this.handleUsernameChange = (e) => {
         this.setState({
            username : e.target.value
            
         })
      }
      this.handleCommentsChange = (e) => {
          this.setState({
              comments : e.target.value
          })
      }
      this.handleTopicChange = (e) =>{
          this.setState({
              topic : e.target.value
          })
      }
      this.handleFormSubmit = (e) =>{
   alert(`${this.state.comments} ${this.state.topic} ${this.state.username}`)
          e.preventDefault()
      }
    }
  render() {
    return (
        <form onSubmit={this.handleFormSubmit}>
        <div>
            <label>Username</label>
            <input type="text" value={this.state.username} onChange={this.handleUsernameChange}></input>
        </div>
        <div>
            <label>
                comments
            </label>
            <textarea value={this.state.comments} onChange={this.handleCommentsChange}></textarea>
        </div>
        <div>
            <label>
                Topic
            </label>
            <select value={this.state.topic} onChange={this.handleTopicChange}>
                <option value="me">me</option>
                <option value="you">you</option>
                <option value="them">them</option>
            </select>
        </div>
        <div>
            <button type='submit'>Submit</button>
        </div>
        </form>
        
    )
  }
}

export default Form