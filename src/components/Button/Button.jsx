import React from "react";
import './button.css'

function Button(props){
    return(
        <button className={props.styles} onClick={props.clicked}>{props.value}</button>
    )
}

export default Button;