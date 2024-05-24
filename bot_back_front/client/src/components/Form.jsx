import {useState} from 'react';
import axios from 'axios';

function Form() {
    const [advertise, setAdvertise] = useState({
        imgSrc: '',
        description: '',
    })
    function handleChange(e) {
        const {value, name} = e.target;
        setAdvertise(prev => ({...prev, [name]: value}))
    }

    async function createAd() {
        await axios.post('api/ads', {imgSrc: advertise.imgSrc, description: advertise.description})
        console.log('here')
    }

    function handleSubmit(e) {
        e.preventDefault();
        createAd();
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={advertise.imgSrc} name={'imgSrc'} onChange={handleChange}/>
            <textarea value={advertise.description} onChange={handleChange} name={'description'}/>
            <input type="submit" value={'Submit'}/>
        </form>
    );
}

export default Form;