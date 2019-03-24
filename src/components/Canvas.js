import React, { Component } from 'react';

export default class Canvas extends Component{

    constructor(props){
        super(props);
        this.state = {
            drawing: false,
        }
        this.canvas = React.createRef();
    }

    shouldComponentUpdate(props, state){
        if (props.clear){
            this.canvasContext.clear();
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
    }

    disableDraw(event){
        this.setState({ drawing: false });
    }
    
    triggerDraw(event){
        var loc = this.calcPath(event);

        this.canvasContext.beginPath();
        this.canvasContext.moveTo(loc.x, loc.y);

        this.setState({
            drawing: true
        });
    }

    onDrag(event){
    if (this.state.drawing){
        var loc = this.calcPath(event);

        this.canvasContext.lineTo(loc.x, loc.y);
        this.canvasContext.stroke();
        }
    }

    calcPath(event){
    var loc = this.canvasContext.bounds;
    return {
        x: event.clientX - loc.x,
        y: event.clientY - loc.y
        }
    }

    render(){
        return (
            <canvas ref={ this.canvas } 
            onMouseLeave={e => this.disableDraw(e)}
            onMouseDown={e => this.triggerDraw(e)}
            onMouseMove={e => this.onDrag(e)}
            onMouseUp={e => this.disableDraw(e)}
            width={this.props.window.x} height={this.props.window.y} style={{'position': "absolute"}}/>
        )
    }

}