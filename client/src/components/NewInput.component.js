import React from 'react';

export default function NewInput(props) {
    return (
        <div>
            <label>{props.label}:</label><br></br>
            <input type={props.type} name={props.label} placeholder={props.placeholder} /><br></br>
        </div>
    )
}