import React from 'react';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import UserIcon from './images/user-icon.png';

function Post(props) {
    return(
        <Card className="post">
            <Card.Body>
                <Card.Title>
                    <Image src={UserIcon} roundedCircle/>
                    {props.user}
                </Card.Title>
                {props.text}
            </Card.Body>
        </Card>
    )
}

export default Post;