import React, { Component } from 'react'
import socketIOClient from 'socket.io-client'
import uuid from 'uuid'

class App extends Component {
  constructor() {
    super()
    
    this.state = {
      userId: uuid(),
      counter: 0,
      log: [],
      endpoint: "http://localhost:4001",
    };
  }
  
  send = () => {
    const socket = socketIOClient(this.state.endpoint)  
    this.setState({ counter: this.state.counter + 1 });
    socket.emit('increaseCounter', {userId: this.state.userId}) 
  }

  render() {
    const socket = socketIOClient(this.state.endpoint)
    
    socket.on('counterHasBeenIncreased', (data) => {
      
      console.log(data);

      const newLog = {
          userId: data.userId,
          action: 'counter++ up to ' + data.counter,
      };

      this.setState(prevState => ({
        counter: data.counter,
        log: [...prevState.log, newLog] 
      }));
    });

    return (
      <div>
        <h4>uuid: {this.state.userId}</h4>
        <h1>Counter: { this.state.counter }</h1>
        <button onClick={() => this.send()}>counter++</button>
        <h4>Log</h4>
        <pre>
          {this.state.log.map((oneLineLog, index) => 
            <div key={index}>
              user: {oneLineLog.userId === this.state.userId ? 'you' :  oneLineLog.userId}, action: {oneLineLog.action}
            </div>
          )}
        </pre>
      </div>
    )
  }
}

export default App;