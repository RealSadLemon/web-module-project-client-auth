import React, { useEffect, useState } from "react";
import axios from 'axios';
import axiosWithAuth from './customAxios';
import { Redirect } from "react-router-dom";

const FriendsList = (props) => {
    const [friendsList, setFriendsList] = useState([])
    
    useEffect(()=> {
        axiosWithAuth().get('http://localhost:9000/api/friends')
            .then(res => {
                console.log(res.data)
                setFriendsList([
                    ...friendsList,
                    ...res.data
                ])
            })
            .catch(err => {console.log({...err}.response.headers)})
    }, [])

    return( props.loggedIn ? <Redirect to="/login" /> : 
        <div className="friends-list">
            <h2>FRIENDS LIST</h2>
            {friendsList.map((friend)=> {
                return <p key={friend.id} >{`- ${friend.name} - ${friend.email}`}</p>
            })}
        </div>
    )
}

export default FriendsList;