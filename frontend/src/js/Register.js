import React from 'react';
import '../App.css'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function Register() {
    return (
        <div>
            <Form className="form-signin center-text align-middle">
                <Card className="form-card" >
                    <Card.Body>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" />
                                <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                                </Form.Text>
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" />
                                <Form.Control type="passwordConfirm" placeholder="Password (confirm)" />
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
        </div> 
    );
}

export default Register;