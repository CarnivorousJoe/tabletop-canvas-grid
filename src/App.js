import React, { Component } from 'react';
import Grid from './components/Grid';
import Canvas from './components/Canvas';
import OptionsPicker from './components/OptionsPicker';
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
  }

  setArgs(pkg){
    this.setState({
      args: pkg
    })
  }

  render() {
    return (
      <Container>
        <Canvas window={this.state.window} args={this.state.args || null} />
        <Grid window={this.state.window} space={this.state.space} />
        <OptionsPicker>
          <input type="range" value={this.state.space} min="60" max="200"onChange={(e) => this.setState({space: parseInt(e.target.value)})}/>
        </OptionsPicker>
      </Container>
    );
  }
}

const Container = (props) => <div>{props.children}</div>;

export default App;
