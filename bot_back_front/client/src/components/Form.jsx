import {useState} from 'react';
import axios from 'axios';
import FormUI from './FormUI.jsx';

function Form() {
    const [advertise, setAdvertise] = useState({
        imgSrc: '',
        description: '',
    })
    function handleChange(e) {
        const {value, name} = e.target;
        setAdvertise(prev => ({...prev, [name]: value}))
    }

    return (
        <FormUI/>
    );
}

export default Form;