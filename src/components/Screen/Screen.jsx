import React from 'react';
import { Textfit } from 'react-textfit'
import './Screen.css'

function Screen(props){
    return(
        <Textfit className='screen' mode='single' max={70}>
            {props.value}
        </Textfit>
    )
}

export default Screen;