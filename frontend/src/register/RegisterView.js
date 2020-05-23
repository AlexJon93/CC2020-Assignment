import React        from 'react';
import PropTypes    from 'prop-types';
import Form         from 'react-bootstrap/Form';
import Card         from 'react-bootstrap/Card';
import Button       from 'react-bootstrap/Button';

const RegisterView = ({handleChange, handleSubmit}) => {
    return (
        <div>
            <Form className="form-signin center-text align-middle" onSubmit={this.handleSubmit}>
                <Card className="form-card" >
                    <Card.Body>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control id="email" type="email" placeholder="Enter email" onChange={this.handleChange} />
                                <Form.Label>Email address confirm</Form.Label>
                                <Form.Control id="emailConfirm" type="email" placeholder="Confirm email" onChange={this.handleChange} />
                                <Form.Text className="text-muted">
                                    We'll never share your email with anyone else.
                                </Form.Text>
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control id="password" type="password" placeholder="Password" onChange={this.handleChange}/>
                                <Form.Control id="passwordConfirm" type="password" placeholder="Password (confirm)" onChange={this.handleChange}/>
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

RegisterView.propTypes = {
    handleChange: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired
};
export default RegisterView;