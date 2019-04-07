import React, { Component } from 'react';
import { socket } from '../api/Socketio'
export default class Grid extends Component{

    constructor(props){
        super(props);
        this.state = {
            space: this.props.space || 20
        }
        this.grid = React.createRef();
        socket.on( 'ioHideCanvas', () => { this.hideCanvas() })
        socket.on( 'ioShowCanvas', () => { this.showCanvas() })
    }

    componentDidMount(){
        this.ctx = this.grid.current.getContext('2d');
        this.ctx.bounds = this.grid.current.getBoundingClientRect();
        this.ctx.strokeStyle = "#888888";
	    this.ctx.lineWidth = 1;
        this.ctx.lineCap = "round";
        this.ctx.width = window.innerWidth;
        this.ctx.height = window.innerHeight;
        this.renderGrid(this.ctx);
    }

    hideCanvas(){
        this.setState({
            background: '#000000'
        })
    }

    showCanvas(){
        this.setState({
            background: 'none'
        })
    }

    renderGrid(ctx){
        if (!ctx){ return; }
        ctx.bounds = this.grid.current.getBoundingClientRect();
        ctx.clearRect (0, 0, ctx.bounds.width, ctx.bounds.height);
        ctx.lineWidth = 1
        ctx.strokeStyle = "#888888"
        ctx.lineCap = "round"
        ctx.beginPath();
        ctx.moveTo(0, 0);
        for (var i = 0; i <= ctx.bounds.width; i = i + this.props.space){
            ctx.moveTo(i, 0);
            ctx.lineTo(i, ctx.bounds.height);
            ctx.closePath();
            ctx.stroke();
        }
        for (var n = 0; n <=ctx.bounds.height; n = n + this.props.space){
            ctx.moveTo(0, n);
            ctx.lineTo(ctx.bounds.width, n);
            ctx.closePath();
            ctx.stroke();
        }
    }

    

    render(){
        this.renderGrid(this.ctx);
        return (
            <canvas
            width={this.props.window.x}
            height={this.props.window.y}
            style={canvasStyle(this.state)}
            ref={this.grid} ></canvas>
        )
    }
}

const canvasStyle = ( {background} ) => {
    return({
    'border': '1px solid red', 
    'pointerEvents': 'none', 
    'position': 'absolute', 
    'background': background || 'none'
    })}