import React from 'react';
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = (props) => {
    const {component: Component, ...rest} = props;
    console.log("props", props)
    console.log("rest", rest)
    return <Route 
        {...rest} 
        render={(props) => {
            if (localStorage.getItem("token")) {
                //if user is authenticated - return the component
                return <Component {...props} />
            } else {
                //if user is not authenticated - redirect
                return <Redirect to="/" />
            }
        }}
    />
}

export default PrivateRoute;