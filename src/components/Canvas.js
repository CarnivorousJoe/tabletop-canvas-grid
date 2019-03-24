import React, { Component } from 'react';
import io from 'socket.io-client';

export default class Canvas extends Component{

    constructor(props){
        super(props);
        this.state = {
            drawing: false,
        }
        this.canvas = React.createRef();
        this.socket = io('http://localhost:8080');
    }

    shouldComponentUpdate(props, state){
        if (props.clear){
            this.canvasContext.clear();
            return false;
        }
        this.canvasContext.bounds = this.canvas.current.getBoundingClientRect();
        return true;
    }

    componentDidMount(){
        this.canvasContext = this.canvas.current.getContext('2d');
        this.canvasContext.bounds = this.canvas.current.getBoundingClientRect();

        this.canvasContext.strokeStyle = "#000000";
	    this.canvasContext.lineWidth = 1;
        this.canvasContext.lineCap = "round";
        this.canvasContext.width = window.innerWidth;
        this.canvasContext.height = window.innerHeight;
        this.canvasContext.clear = function() {
            this.clearRect (0, 0, this.bounds.width, this.bounds.height);
        }

        this.socket.on('ioPenDown', (coordinates) => this.penDown(coordinates))
        this.socket.on('ioPenUp', () => this.penUp())
        this.socket.on('drawing', (coordinates) => this.draw(coordinates))

    }

    penUp(){
        if (this.state.drawing){
            this.setState({ drawing: false }, () => this.socket.emit('penUp'));
        }
    }
    
    penDown( {clientX, clientY} ){
        var path = this.calcPath(clientX, clientY);
        if (!this.state.drawing){
            this.setState({
                drawing: true
            }, () => this.socket.emit('penDown', {clientX: clientX, clientY: clientY}));
            this.canvasContext.beginPath();
            this.canvasContext.moveTo(path.x, path.y);
        }
    }

    onDrag( {clientX, clientY} ){
        if (this.state.drawing){
            var path = this.calcPath(clientX, clientY);
            this.socket.emit('drawing', {clientX: path.x, clientY: path.y} )
        }
    }

    draw( {clientX, clientY} ){
        var path = this.calcPath(clientX, clientY);
        console.log(path);
        this.canvasContext.lineTo(path.x, path.y);
        this.canvasContext.stroke();
    }

    calcPath( x, y ){
        var canvasBounds = this.canvasContext.bounds;
        return {
            x: x - canvasBounds.left,
            y: y - canvasBounds.top
        }
    }

    render(){
        return (
            <canvas ref={ this.canvas } 
            onMouseLeave={e => this.penUp(e)}
            onMouseDown={e => this.penDown(e)}
            onMouseMove={e => this.onDrag(e)}
            onMouseUp={e => this.penUp(e)}
            width={this.props.window.x} height={this.props.window.y} style={{'position': "absolute"}}/>
        )
    }

}