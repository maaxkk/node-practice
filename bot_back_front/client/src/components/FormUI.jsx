import React, { useState } from 'react';
import AdService from '../service/AdService.js';

function FormUi() {
    const [adData, setAdData] = useState({
        mainImg: null,
        additionalImg: [],
    });

    function handleChange(e) {
        const {name, value} = e.target;
        setAdData(prev => ({...prev, [name]: value}))
    }

    function handleMainImage(e) {
        setAdData(prev =>
            ({...prev, mainImg: e.target.files[0]}))
    }

    function handleAdditionalImg(e) {
        setAdData(prev =>
            ({...prev,  additionalImg: [...prev['additionalImg'], e.target.files[0]] }))
    }

    function handleSubmit(e) {
        e.preventDefault();
        createAd();
    }

    async function createAd() {
        const formData = new FormData();
        formData.append('title', adData.title);
        formData.append('description', adData.description);
        formData.append('mainImg', adData.mainImg);
        // adData.additionalImg.forEach(file => formData.append('additionalImg', file));

        try {
            await AdService.create(formData);
        } catch (error) {
            console.error("Error creating ad:", error.response.data);
        }
    }

    console.log(adData);

    return (
        <form onSubmit={handleSubmit} encType='multipart/form-data' className={'login__form'}>
            <h1 className="login__title">Create ad</h1>
            <input
                type="text"
                className="login__input login__username"
                required={true}
                name="title"
                placeholder="Title"
                value={adData['title']}
                onChange={handleChange}
            />
            <textarea name="description"
                      className="validate[required,length[10,240]] feedback-input"
                      id="comment"
                      value={adData['description']}
                      placeholder="Description"
                      onChange={handleChange}
            ></textarea>
            <p className={'post__mainImgTitle'}>Main image*</p>
            <input className={'post__fileInput'} onChange={handleMainImage} required={true} name={'mainImg'} type="file" />
            <p className={'post__additionalImgTitle'}>Additional images</p>
            <input className={'post__fileInput'} onChange={handleAdditionalImg} name={'additionalImg'} type="file" />
            <input className={'post__fileInput'} onChange={handleAdditionalImg} name={'additionalImg'} type="file" />
            <input className={'post__fileInput'} onChange={handleAdditionalImg} name={'additionalImg'} type="file" />
            <input className={'post__fileInput'} onChange={handleAdditionalImg} name={'additionalImg'} type="file" />
            <input className={'post__fileInput'} onChange={handleAdditionalImg} name={'additionalImg'} type="file" />
            <input className={'post__fileInput'} onChange={handleAdditionalImg} name={'additionalImg'} type="file" />
            <input className={'post__fileInput'} onChange={handleAdditionalImg} name={'additionalImg'} type="file" />
            <input
                type="submit"
                className="login__submit"
                value="Post"
            />
        </form>
    );
}

export default FormUi;