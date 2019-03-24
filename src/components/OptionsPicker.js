import React, { Component } from 'react'

export default class OptionsPicker extends Component{
    constructor(props){
        super(props)
        this.state = {
            expanded: true
        }
    }

    expand(){
        this.setState({
            expanded: true
        })
    }

    contract(){
        this.setState({
            expanded: false
        })
    }

    render(){
        return (
            <div style={FlyoutStyle(this.state)} onMouseLeave={() => this.contract()}>
                <FlyoutTab onMouseEnter={() => this.expand()}/>
                <div style={{'position': 'relative'}}>
                {this.props.children}
                </div>
            </div>
        )
    }
}

const FlyoutTab = (props) => <div style={tabStyle} ></div>
const tabStyle = {
    'clipPath': 'polygon(0 35%, 100% 0, 100% 100%, 0 65%)'
}

const FlyoutStyle = ({ expanded }) => {
    return {
        'width':        300,
        'position':     'fixed',
        'right':        expanded ? 0 : -200,
        'top':          0,
        'bottom':       0,
        'margin':       'auto',
        'width':        'auto',
        'height':       'fit-content',
        'padding':      '22px 0px',
        'backgroundColor': 'black',
        'borderRadius':     '4px'
    }
}