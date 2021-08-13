/*
import React from 'react'
import { useState } from 'react'
const Circle = (props) => {

    const [textBox, setTextBox] = useState('')
    const [textBox2, setTextBox2] = useState('')
    const [textBoxColour, setTextBoxColour] = useState({
        background: 'yellow',
        width: String(props.radious) + 'px',
        height: String(props.radious) + 'px',
        fontSize: '12px'

    })

    const circleStyle = {
        background: props.colour,
        border: `3px solid ${props.colour.replace('a', '')}`,
        borderRadius: '50%',
        width: String(props.radious) + 'px',
        height: String(props.radious) + 'px',
    

    }



    const handleEnter = () => {
        console.log(props.data)
        setTextBox(`New Cases: ${props.data[0]}, New Deaths: ${props.data[1]}`)
        setTextBoxColour({
            background: 'blue'
        })
    }
    
    const handleLeave = () => {
        setTextBox('')
        setTextBox2('')
        setTextBoxColour({
            background: 'none'
        })
    }

    return (
        <div>
            <span>{textBox2}</span>
            <div style = {circleStyle} onMouseEnter = {handleEnter} onMouseLeave = {handleLeave}>
            </div>
            <span>{textBox}</span>

        </div>
    )
    
}

export default Circle
*/
import React, { Component } from 'react'

export class Circle extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            circleStyle: {
                background: props.colour,
                border: `3px solid ${props.colour.replace('a', '')}`,
                borderRadius: '50%',
                width: String(props.radious) + 'px',
                height: String(props.radious) + 'px',
            },
            title: '',
            textbox: '',
            textbox2: '',
            textboxBackground: 'none'
        }
    }
    

    handleEnter = () => {
        this.setState({
            textbox: 'something',
            textbox2: 'eodklf',
        })
    }
    
    handleLeave = () => {
        this.setState({
            textbox: '',
            textbox2: '',
            textboxBackground: 'none'

        })
    }


    render() {
        return (
        <div>
            <span>{this.state.textbox2}</span>
            <div style = {this.state.circleStyle} onMouseEnter = {this.handleEnter} onMouseLeave = {this.handleLeave}>
            </div>
            <span>{this.state.textbox}</span>

        </div>
        )
    }
}
export default Circle
