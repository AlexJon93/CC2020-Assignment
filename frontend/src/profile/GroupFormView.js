import React from 'react';
import PropTypes from 'prop-types';
import {Card, Form, Button} from 'react-bootstrap';

const GroupFormView = ({onChange, onSubmit}) => {
    return (
        <Form>
            <Card style={{width: 300}}>
                <Form.Group controlId="group_name">
                    <Form.Label>Group Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter group name"
                        onChange={onChange}
                    />
                </Form.Group>
                <Button type="submit" onClick={onSubmit} >Create new group</Button>
            </Card>
        </Form>
    )
}

GroupFormView.propTypes = {
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
}
export default GroupFormView;