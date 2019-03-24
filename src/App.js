import React, { Component } from 'react';
import Grid from './components/Grid';
import Canvas from './components/Canvas';
import OptionsPicker from './components/OptionsPicker';
import io from 'socket.io-client';

import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      window: {
        x: window.innerWidth,
        y: window.innerHeight
      },
      space: 60 
    }
    this.socket = io('http://localhost:8080');
    this.socket.on('ioSetDimensions', (dimensions) => {
      this.setState({
        window: dimensions
      })
    })
  }

  actions(action){
    switch (action){
      case 'clear':
        this.clearCanvas();
    }
  }

  clearCanvas(){
    this.setState({clear: true}, () => this.setState({clear: false}))
  }

  setBounds(){
    this.setState({
      window: {
        x: window.innerWidth,
        y: window.innerHeight
      }
    })
    this.socket.emit('setDimensions', {x: window.innerWidth, y: window.innerHeight})
  }

  render() {
    return (
      <Container>
        <Canvas clear={this.state.clear} window={this.state.window} />
        <Grid window={this.state.window} space={this.state.space} />
        <OptionsPicker>
          <input type="range" value={this.state.space} min="60" max="200"onChange={(e) => this.setState({space: parseInt(e.target.value)})}/>
          <button onClick={() => this.clearCanvas()} > Clear </button>
          <button onClick={() => this.setBounds()} > Set Screen </button>
        </OptionsPicker>
      </Container>
    );
  }
}

const Container = (props) => <div>{props.children}</div>;

export default App;
