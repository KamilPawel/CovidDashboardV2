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
        setTextBox(`New Cases: ${props.data[0]} New Deaths: ${props.data[1]}`)
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
