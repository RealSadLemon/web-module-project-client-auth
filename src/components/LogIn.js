import React from "react";
import axios from 'axios';
import { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";

const initialFormState = {
    username: '',
    password: ''
}

const LogIn = (props) => {
    const [formState, setFormState] = useState(initialFormState);
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        if(!!localStorage.getItem('token'))localStorage.removeItem('token');
        props.changeLoggedIn(!!localStorage.getItem('token'));
    }, [])

    const handleChange = (e) => {
        e.preventDefault();
        setFormState({
            ...formState,
            [e.target.name]: e.target.value
        })
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const loginObj = {
            ...formState
        }
        axios.post('http://localhost:9000/api/login', loginObj)
            .then(res => {
                localStorage.setItem('token', res.data.token);
                setFormState(initialFormState);
                setErrors([]);
                props.changeLoggedIn(!!localStorage.getItem('token'));
            })
            .catch(err => {console.log(err)})

    };

    return( props.loggedIn ? <Redirect to="/friendlist" /> : 
        <div className="login-form">
        {errors.length <= 1 ? errors.map(error => {
            return(
                <p>{error}</p>
            )
        }) : ''}
        <form onSubmit={handleSubmit}>
            LOGIN
            <label>USERNAME
                <input name="username" type={'text'} value={formState.username} onChange={handleChange} />
            </label>
            <label>PASSWORD
                <input name="password" type={'password'} value={formState.password} onChange={handleChange} />
            </label>
            <button>SUBMIT</button>
        </form>
        </div>
    )
}

export default LogIn;