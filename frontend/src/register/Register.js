import '../App.css'
import React                from 'react';
import RegisterView         from './RegisterView';

class RegistrationForm extends React.Component {

    constructor(props) {
        super(props); 

        this.state = {
            email: "",
            password: "",
            passwordConfirm:  ""
        };
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const newUser = {
            email: this.state.email,
            password: this.state.password
        };
        this.props.registerUser({newUser});
        console.log("Submitted!");
    }

    handleChange = (event) => {
        this.setState({ [event.target.id]: event.target.value });
        console.log(this.state);
    }

    render() {
        return <RegisterView handleChange={this.handleChange} handleSubmit={this.handleSubmit}/>
    }
}
export default RegistrationForm;