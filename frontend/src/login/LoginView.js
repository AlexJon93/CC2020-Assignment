import React    from 'react'
import Form     from 'react-bootstrap/Form';
import Button   from 'react-bootstrap/Button';
import Card     from 'react-bootstrap/Card';
import PropTypes from 'prop-types';

const LoginView = ({onSubmitHandler, onChangeHandler}) => {
    return (
        <div>
            <Form className="form-signin center-text align-middle">
                <Card className="form-card" >
                    <Card.Body>
                            <Form.Group controlId="email">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control 
                                    type="email" 
                                    placeholder="Enter email" 
                                    onChange={onChangeHandler}
                                />
                            </Form.Group>

                            <Form.Group controlId="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" onChange={onChangeHandler}/>
                            </Form.Group>
                            <Button variant="primary" type="submit" onClick={onSubmitHandler}>
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

LoginView.propTypes = {
    onSubmitHandler: PropTypes.func.isRequired,
    onChangeHandler: PropTypes.func.isRequired
};
export default LoginView;