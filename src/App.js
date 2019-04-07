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

    socket.on('resize-canvas', (dimensions) => {
      this.resizeCanvas({...dimensions})
    })

    socket.on('set-spacing', (spacing) => {
      this.setState({space: spacing})
    })
  }

  toggleCanvas(){
    this.setState({
      hidden: !this.state.hidden
    }, () => socket.emit('maybe-hide-canvas', this.state.hidden))
  }

  clearCanvas(){
    this.setState({clear: true}, () => this.setState({clear: false}))
  }

  setBounds(){
    let dimensions = {x: window.innerWidth, y: window.innerHeight}
    this.resizeCanvas(dimensions)
    socket.emit('set-canvas-dimensions', dimensions)
  }

  resizeCanvas({x, y}){
    this.setState({
      window: {
        x: x,
        y: y
      }
    })
  }

  setGridSpacing( e ){
    let spacing = parseInt(e.target.value);
    socket.emit('set-grid-spacing', spacing);
    this.setState({space: spacing});
  }

  render() {
    return (
      <Container>
        <Grid window={this.state.window} space={this.state.space} />
        <Canvas clear={this.state.clear} window={this.state.window} />
        <OptionsPicker>
          <input type="range" value={this.state.space} min="60" max="200" onChange={(e) => this.setGridSpacing( e )}/>
          <button onClick={() => this.clearCanvas()} > Clear </button>
          <button onClick={() => this.setBounds()} > Set Screen </button>
          <button onClick={() => this.toggleCanvas()} > { this.state.hidden ? 'Show Canvas' : 'Hide Canvas' } </button>
        </OptionsPicker>
      </Container>
    );
  }
}

const Container = (props) => <div style={{touchAction: 'none'}} >{props.children}</div>;

export default App;
