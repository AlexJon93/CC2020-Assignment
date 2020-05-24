import React from 'react';
import {Table} from 'react-bootstrap';
import PropTypes from 'prop-types';

const WallEventsView = props => {
    return (
        <Table>
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Location</th>
                    <th>Event</th>
                    <th>Creator</th>
                </tr>
            </thead>
        </Table>
    );
}

WallEventsView.propTypes = {
    events: PropTypes.array
};
export default WallEventsView;