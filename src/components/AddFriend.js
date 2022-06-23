import React, {useState} from "react";
import axiosWithAuth from "./customAxios";
import { Redirect } from "react-router-dom";

const initialFormState = {
    friendName: '',
    friendEmail: ''
}

const AddFriend = (props) => {
    const [formState, setFormState] = useState(initialFormState);
    const [errors, setErrors] = useState([]);

    const handleChange = (e) => {
        e.preventDefault();
        setFormState({
            ...formState,
            [e.target.name]: e.target.value
        })
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const friendObj = {
            id: new Date().getTime(),
            name: formState.friendName,
            age: 40,
            email: formState.friendEmail
        }
        axiosWithAuth().post('http://localhost:9000/api/friends', friendObj)
            .then(res=> setFormState(initialFormState))
            .catch(err=> console.log(err))
    };

    return( props.loggedIn ? <Redirect to="/login" /> : 
        <div className="add-friend">
        {errors.length <= 1 ? errors.map(error => {
            return(
                <p>{error}</p>
            )
        }) : ''}
        <form onSubmit={handleSubmit}>
            ADD FRIEND
            <label>FRIEND NAME
                <input name="friendName" type={'text'} value={formState.friendName} onChange={handleChange} />
            </label>
            <label>FRIEND EMAIL
                <input name="friendEmail" type={'text'} value={formState.friendEmail} onChange={handleChange} />
            </label>
            <button>SUBMIT</button>
        </form>
        </div>
    )
}

export default AddFriend