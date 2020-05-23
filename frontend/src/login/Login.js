import React from 'react';
import LoginView from './LoginView';
import { addToken } from '../redux/actions'
import { connect } from 'react-redux';
import { URL } from '../constants/API';
import docCookies from 'doc-cookies';
import { Redirect } from "react-router-dom";
import { setUser } from "../redux/actions";
import { EMAIL, TOKEN } from '../constants/cookies';

class ConnectedLogin extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            redirect: false
        }
        this.request = new XMLHttpRequest();
        this.request.onreadystatechange = this.responseHandler;
    }

    responseHandler = () => {
        if (this.request.readyState === XMLHttpRequest.DONE && this.request.status === 200) {

            const jsonResponse = JSON.parse(this.request.responseText); 
            docCookies.setItem(TOKEN, jsonResponse.token);
            docCookies.setItem(EMAIL, this.state.email);
            this.setState({redirect: true});
        }
    }

    onChangeHandler = event => {
        this.setState({[event.target.id]: event.target.value});
    }

    onClickHandler = event => {
        event.preventDefault();

        this.request.open("POST", URL + "/login");
        console.log(this.state);

        const {redirect, ...params} = this.state;
        console.log(params);
        this.request.send(JSON.stringify(params));
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to="/profile"/> 
        }
        return (
            <div>
                <LoginView onSubmitHandler={this.onClickHandler} onChangeHandler={this.onChangeHandler}/>
            </div>
        );
    }
}

export default ConnectedLogin;
