import React from 'react';
import GroupFormView from './GroupFormView';
import {sendRequest} from '../helpers';

export default class GroupForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            group_name: "" 
        };

        this.submitReq = new XMLHttpRequest();
        this.submitReq.onreadystatechange = this.submitResponseHandler;
    }

    submitResponseHandler = () => {
        if (this.submitReq.readyState === XMLHttpRequest.DONE && this.submitReq.status === 200) {
            window.location.reload();
        }
    } 
    
    changeHandler = (event) => {
        this.setState({[event.target.id]: event.target.value});
    }
    
    submitHandler = event => {
        event.preventDefault();
        console.log(this.state.group_name)
        sendRequest(this.submitReq, "POST", "/group", this.state);

    }

    render() {
        return <GroupFormView onChange={this.changeHandler} onSubmit={this.submitHandler}/>
    }
}