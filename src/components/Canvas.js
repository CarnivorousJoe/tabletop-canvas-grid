import React, { Component } from 'react';
import { socket } from './api';
export default class Canvas extends Component{

    constructor( props ){
        super(props);
        this.state = {
            drawing: false,
        }
        this.canvas = React.createRef();
    }

    shouldComponentUpdate( props ){
        if (props.clear){
            socket.emit('clear');
            return false;
        }
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

        socket.on('ioPenDown', ( coordinates ) => this.penDown( coordinates ))
        socket.on('ioPenUp', () => this.penUp())
        socket.on('drawing', ( coordinates ) => this.draw( coordinates ))
        socket.on('clear', () => { this.canvasContext.clear() })
    }

    penUp(){
        if (this.state.drawing){
            this.setState( { drawing: false }, () => socket.emit('penUp') );
        }
    }
    
    penDown( {clientX, clientY} ){
        this.canvasContext.bounds = this.canvas.current.getBoundingClientRect();
        var path = this.calcPath(clientX, clientY);
        if (!this.state.drawing){
            this.setState({
                drawing: true
            }, () => socket.emit( 'penDown', {clientX: path.x, clientY: path.y} ));
            this.canvasContext.beginPath();
            this.canvasContext.moveTo( path.x, path.y );
        }
    }

    onDrag( {clientX, clientY} ){
        if (this.state.drawing){
            var path = this.calcPath(clientX, clientY);
            socket.emit('drawing', {clientX: path.x, clientY: path.y} )
        }
    }

    draw( {clientX, clientY} ){
        this.canvasContext.lineTo(clientX, clientY);
        this.canvasContext.stroke();
    }

    calcPath( x, y ){
        var canvasBounds = this.canvas.current.getBoundingClientRect();
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