import React from 'react';
import 'whatwg-fetch';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      message: '',
      author: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const {name, value} = e.target;
    this.setState({
      [name]: value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const newMessage = {
      message: this.state.message,
      author: this.state.author,
    }
    fetch('/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newMessage),
    })
    .then(response => {
      if(response.status !== 201) {
        return console.error(response.status);
      }
      return response.json()
    })
    .then(response => {
      this.setState({
        message: '',
        author: '',
        messages: [...this.state.messages, response],
      });
    })
    
  }

  render() {
    const messages = this.state.messages.map(message => {
      return (
        <div key={message._id}>
          <p>{message.author}</p>
          <p>{message.message}</p>
        </div>
      )
    });
    return (
      <div>
        <section data-role="messages">
          {messages}
        </section>
        <form action="/messages" method="post" data-role="message-form">
          <label htmlFor="author">Your name:</label>
          <input type="text" id="author" name="author" onChange={this.handleChange}/>

          <label htmlFor="message">Your message:</label>
          <input type="text" id="message" name="message" onChange={this.handleChange}/>

          <input type="submit" onClick={this.handleSubmit}/>
        </form>
      </div>
    );
  }
}
