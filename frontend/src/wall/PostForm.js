import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function PostForm(props) {
    return (
        <Form className="form-post">
            <Card className="post-form post">
                <Card.Body>
                    <Card.Title>
                        Write a new post
                    </Card.Title>
                    <textarea class="post-text"/>
                    <Button variant="primary" type="submit" className="submit-button">
                        Submit
                    </Button>
                </Card.Body>
            </Card>
        </Form>
    );
}

export default PostForm;