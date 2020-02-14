import React from "react";
import "./App.css";

class App extends React.Component {
  state = {
    messages: [],
    value: ""
  };
  stream = new EventSource("http://localhost:4000/stream");

  componentDidMount() {
    //event source to connect to stream
    this.stream.onmessage = event => {
      console.log("event test:", event);
      const { data } = event;
      console.log("data test", data);
      const action = JSON.parse(data);
      console.log("action test", action);

      const { type, payload } = action;

      if (type === "ALL_MESSAGES") {
        //messages returns an array, replace the whole array
        this.setState({ messages: payload });
      }
      if (type === "ONE_MESSAGE") {
        // message return a single object, add it to the array
        const messages = [...this.state.messages, payload];
        this.setState({ messages });
      }
    };
  }

  onSubmit = event => {
    event.preventDefault();
    console.log("value test", this.state.value);
  };

  onChange = event => {
    const { value } = event.target;
    this.setState({ value });
  };

  clear = () => {
    this.setState({ value: "" }); //clear the form
  };

  render() {
    console.log("render state test:", this.state);
    const paragraphs = this.state.messages.map(
      message => <p key={message.id}>{message.text}</p> //show which of data
    );
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <input
            onChange={this.onChange}
            type="text"
            value={this.state.value}
          />
          <button>submit</button>
          <button onClick={this.clear}>Clear</button>
        </form>
        {paragraphs}
      </div>
    );
  }
}

export default App;
