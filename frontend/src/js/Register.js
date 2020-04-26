import '../App.css'
import React                from 'react';
import Form                 from 'react-bootstrap/Form';
import Button               from 'react-bootstrap/Button';
import Card                 from 'react-bootstrap/Card';
import { registerUser }     from "./actions/index";
import UserList             from './UserList';
import { connect }          from 'react-redux';

function mapDispatchToProps(dispatch) {
    return {
        registerUser: userDetails => dispatch(registerUser(userDetails)) 
    };
}

class ConnectedRegistrationForm extends React.Component {

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
        return (
            <div>
                <Form className="form-signin center-text align-middle" onSubmit={this.handleSubmit}>
                    <Card className="form-card" >
                        <Card.Body>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control id="email" type="email" placeholder="Enter email" onChange={this.handleChange} />
                                    <Form.Text className="text-muted">
                                        We'll never share your email with anyone else.
                                    </Form.Text>
                                </Form.Group>

                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control id="password" type="password" placeholder="Password" onChange={this.handleChange}/>
                                    <Form.Control id="passwordConfirm" type="passwordConfirm" placeholder="Password (confirm)" onChange={this.handleChange}/>
                                </Form.Group>
                                <Button variant="primary" type="submit">
                                    Submit
                                </Button>
                        </Card.Body>
                    </Card>
                    <Form.Text className="text-muted">
                        <a href="/login">Already have an account? Login</a><br/>
                    </Form.Text>
                </Form>
                <h1>List of Users</h1>
                <UserList/>
            </div> 
        );
    }
}

const RegistrationForm = connect(
    null,
    mapDispatchToProps
)(ConnectedRegistrationForm);

export default RegistrationForm;