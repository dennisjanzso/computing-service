import React, { useState, useEffect } from "react";
import FormBuilder from './formBuilder';
import Preloader from './preloader';



function ServiceWrapper (props) {
    const [state, setState] = useState({
        formSent: false,
        responseRecv: false
    })

    function sendForm () {
        setState({formSent: true});
    }

    function renderService () {
        if (state.responseRecv) {
            return <p>resp</p>
        } 
        else if (state.formSent) {
            return <div style={{
                'display': 'block',
                'margin': 'auto',
                'margin-top': 'auto',
                'width': '7%',
                'margin-top': '3em'}}><Preloader progressInfo="Processing" /></div>
        } else {
            return <FormBuilder id={props.id} sender={sendForm}/>
        }
    }

    return(
        renderService()
    );
}

export default ServiceWrapper;