import './App.css'
import React    from 'react'
import Form     from 'react-bootstrap/Form';
import Button   from 'react-bootstrap/Button';
import Card     from 'react-bootstrap/Card';

function Login() {
    return (
        <div>
            <Form className="form-signin center-text align-middle">
                <Card className="form-card" >
                    <Card.Body>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" />
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                    </Card.Body>
                </Card>
                <Form.Text className="text-muted">
                    <a href="/register">Register a new account</a><br/>
                </Form.Text>
            </Form>
        </div>
    );
}
export default Login;