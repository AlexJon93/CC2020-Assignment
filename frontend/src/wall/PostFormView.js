import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function PostFormView(props) {
    return (
        <Form className="form-post">
            <Card className="post-form post">
                <Card.Body>
                    <Card.Title>
                        Write a new post
                    </Card.Title>
                    <Form.Group controlId="post_content">
                        <Form.Control as="textarea" rows="3" onChange={props.onChange}/>
                    </Form.Group>
                    <Button variant="primary" type="submit" className="submit-button" onClick={props.onSubmit}>
                        Submit
                    </Button>
                </Card.Body>
            </Card>
        </Form>
    );
}

export default PostFormView;