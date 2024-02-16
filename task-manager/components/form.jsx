import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { toggle } from '../redux/changeSlice';

function Form() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = (event) => {
        event.preventDefault();
        if (title && description) {
            axios.post("http://localhost:5000/post", { title: title, description: description }).then(response => {
                console.log(response.data)
                dispatch(toggle())
            }).catch(error => console.log(error));
        } else {
            alert('Please fill in all the fields');
        }
    };
    return (
        <div>
            <fieldset>
                <legend>Add a task</legend>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="title">Title : </label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        name="title"
                        placeholder="Task title"
                    />{' '}
                    <br /> <br />
                    <label htmlFor="description">Description : </label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        name="title"
                        placeholder="Task description"
                    />
                    <br /> <br />
                    <input type="submit" value="Add" />
                </form>
            </fieldset>
        </div>
    );
}

export default Form;
