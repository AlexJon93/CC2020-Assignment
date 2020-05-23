import React from 'react';
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';
import {Col, Row, Container} from 'react-bootstrap';
import {sendRequest} from '../helpers';


class Post extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            name: null
        };
    }

    render() {
        return(
            <Card className="post">
                <Card.Body >
                    <Card.Title >
                        <Container>
                            <Row>
                                <Col style={{ textAlign: "left" }}>
                                    {this.props.UserName}
                                </Col>
                                <Col style={{ textAlign: "right" }}>
                                    {this.props.CreatedAt}
                                </Col>
                            </Row>    
                        </Container>
                    </Card.Title>
                        {this.props.PostContent}
                </Card.Body>
            </Card>
        )
    }
}

Post.propTypes = {
    PostID: PropTypes.number.isRequired,
    PostContent: PropTypes.string.isRequired,
    PostUser: PropTypes.number.isRequired,
    CreatedAt: PropTypes.string.isRequired
};
export default Post;