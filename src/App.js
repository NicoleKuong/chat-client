import React from "react";

import "./App.css";

//event source to connect to stream

class App extends React.Component {
  stream = new EventSource("http://localhost:4000/stream");

  componentDidMount() {
    this.stream.onmessage = function(event) {
      console.log("event test:", event);
      const { data } = event;
      console.log("data test", data);
      const parsed = JSON.parse(data);
      console.log("parsed test", parsed);
    };
  }
  render() {
    return <div>Hello</div>;
  }
}

export default App;
