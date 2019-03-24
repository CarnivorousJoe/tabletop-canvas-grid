import React, { Component } from 'react'
import styled  from 'styled-components'

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
            <div style={FlyoutStyle(this.state)} onMouseEnter={() => this.expand()} onMouseLeave={() => this.contract()}>
                <FlyoutTab />
                <OptionsWrapper>
                    {this.props.children}
                </OptionsWrapper>
            </div>
        )
    }
}

const FlyoutTab = styled.div`
    clip-path: polygon(0 35%, 100% 0, 100% 100%, 0 65%);
    display: inline-block;
    width: 25px;
    height: 60px;
    background: #1b1b1b;
`

const OptionsWrapper = styled.div`
    background-color: #1b1b1b;
    display: flex;
    flex-direction: column;
    position: relative;
`

const FlyoutStyle = ({ expanded }) => {
    return {
        'display':      'flex',
        'width':        'auto',
        'position':     'fixed',
        'right':        expanded ? 0 : -135,
        'top':          0,
        'bottom':       0,
        'margin':       'auto',
        'height':       'fit-content',
        'padding':      '22px 0px',
        'borderRadius':     '4px'
    }
}