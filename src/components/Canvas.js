import React, { Component } from 'react';
import { socket } from '../api/Socketio';
import { canvasConfig } from '../api/DrawingCanvas';
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

        this.cctx = canvasConfig.init(this.canvas);

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
        this.cctx.moveToRelative(clientX, clientY);
    }

    onDrag( e ){
        if (this.state.drawing){
            socket.emit('host-path-data', { clientX: e.clientX, clientY: e.clientY });
            this.draw( e )
        }
    }

    draw( { clientX, clientY } ){
        this.cctx.lineToRelative( clientX, clientY );
        this.cctx.stroke();
    }

    render(){
        return (
            <canvas ref={ this.canvas } 
            onPointerLeave={e => this.penUp(e)}
            onPointerDown={e => this.penDown(e)}
            onPointerMove={e => this.onDrag(e)}
            onPointerUp={e => this.penUp(e)}
            width={this.props.window.x} height={this.props.window.y} style={{'position': "absolute"}}/>
        )
    }

}