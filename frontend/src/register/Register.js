import '../App.css'
import React                from 'react';
import RegisterView         from './RegisterView';
import {Redirect}           from 'react-router-dom';
import {sendRequest}        from '../helpers';

class RegistrationForm extends React.Component {

    constructor(props) {
        super(props); 

        this.state = {
            email: "",
            username: "",
            password: "",
            redirect: false
        };

        this.request = new XMLHttpRequest();
        this.request.onreadystatechange = this.responseHandler;
    }

    responseHandler = () => {
        if (this.request.readyState === XMLHttpRequest.DONE) {

            if (this.request.status === 200) {
                
               this.setState({redirect: true});
            }
            else {
                alert("Could not register");
            }
        }
    }
    handleSubmit = (event) => {
        event.preventDefault();

        const {redirect, ...params} = this.state;
        sendRequest(this.request, "POST", "/user", params);
    }

    handleChange = (event) => {
        this.setState({ [event.target.id]: event.target.value });
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to="/login"/>
        }
        return <RegisterView handleChange={this.handleChange} handleSubmit={this.handleSubmit}/>
    }
}
export default RegistrationForm;