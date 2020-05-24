import React        from 'react';
import PropTypes    from 'prop-types';
import Form         from 'react-bootstrap/Form';
import Card         from 'react-bootstrap/Card';
import Button       from 'react-bootstrap/Button';

const RegisterView = ({handleChange, handleSubmit}) => {
    return (
        <div>
            <Form className="form-signin center-text align-middle" >
                <Card className="form-card" >
                    <Card.Body>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control id="email" type="email" placeholder="Enter email" onChange={handleChange} />
                                <Form.Text className="text-muted">
                                    We'll never share your email with anyone else.
                                </Form.Text>
                            </Form.Group>

                            <Form.Group controlId="formUsername">
                                <Form.Label>Username</Form.Label>
                                <Form.Control id="username" type="text" placeholder="Enter username" onChange={handleChange} />
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control id="password" type="password" placeholder="Password" onChange={handleChange}/>
                            </Form.Group>
                            <Button variant="primary" type="submit" onClick={handleSubmit}>
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

RegisterView.propTypes = {
    handleChange: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired
};
export default RegisterView;