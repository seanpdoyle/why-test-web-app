class App extends React.Component {
  render() {
    return (
      <form action="/messages" method="post" data-role="message-form">
      <label for="author">Your name:</label>
      <input id="author" name="author" />

      <label for="message">Your message:</label>
      <input id="message" name="message" />

      <input type="submit">
      </form>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
