import React, { Component } from 'react';
import Grid from './components/Grid';
import Canvas from './components/Canvas';
import OptionsPicker from './components/OptionsPicker';

import { socket } from './api/Socketio'
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      window: {
        x: window.innerWidth,
        y: window.innerHeight
      },
      space: 60,
      hidden: false 
    }
    socket.on('ioSetDimensions', (dimensions) => {
      this.setState({
        window: dimensions
      })
    })
  }

  toggleCanvas(){
    this.setState({
      hidden: !this.state.hidden
    }, () => socket.emit('hideCanvas', this.state.hidden))
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
    socket.emit('setDimensions', {x: window.innerWidth, y: window.innerHeight})
  }

  //<Grid window={this.state.window} space={this.state.space} />

  render() {
    return (
      <Container>
        <Canvas clear={this.state.clear} window={this.state.window} />    
        <OptionsPicker>
          <input type="range" value={this.state.space} min="60" max="200"onChange={(e) => this.setState({space: parseInt(e.target.value)})}/>
          <button onClick={() => this.clearCanvas()} > Clear </button>
          <button onClick={() => this.setBounds()} > Set Screen </button>
          <button onClick={() => this.toggleCanvas()} > { this.state.hidden ? 'Show Canvas' : 'Hide Canvas' } </button>
        </OptionsPicker>
      </Container>
    );
  }
}

const Container = (props) => <div>{props.children}</div>;

export default App;
