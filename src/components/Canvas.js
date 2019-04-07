import React, { Component } from 'react';
import { socket } from '../api/Socketio';
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
        this.cctx = this.canvas.current.getContext('2d');
        this.cctx.bounds = this.canvas.current.getBoundingClientRect();
        this.cctx.strokeStyle = "#000000";
	    this.cctx.lineWidth = 1;
        this.cctx.lineCap = "round";
        this.cctx.width = window.innerWidth;
        this.cctx.height = window.innerHeight;
        
        this.cctx.clear = function() {
            this.clearRect (0, 0, this.bounds.width, this.bounds.height);
        }

        socket.on('path-data', ( args ) => {
            if (!this.state.drawing){
                this.penDown(args);
            }
            if (args === false){
                this.stopDraw();
                return;
            }
            this.draw( args );
        })

    }

    penUp(){
        this.stopDraw();
        socket.emit('host-path-data', false );
    }

    stopDraw(){
        this.setState( { drawing: false } );
    }
    
    penDown( { clientX, clientY } ){
        this.setState( { drawing: true } );
        this.cctx.beginPath();
        this.cctx.moveTo(clientX, clientY);
    }

    onDrag( e ){
        if (this.state.drawing){
            socket.emit('host-path-data', { clientX: e.clientX, clientY: e.clientY });
            this.draw( e )
        }
    }

    draw( { clientX, clientY } ){
        this.cctx.lineTo( clientX, clientY );
        this.cctx.stroke();
    }

    calcPath( x, y ){

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