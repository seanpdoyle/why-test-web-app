import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <form action="/messages" method="post" data-role="message-form">
        <label for="author">Your name:</label>
        <input type="text" id="author" name="author" />

        <label for="message">Your message:</label>
        <input type="text" id="message" name="message" />

        <input type="submit" />
      </form>
    );
  }
}

export default App;
