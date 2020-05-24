import React from 'react';
import PropTypes from 'prop-types';
import Listing from './Listing.js';
import Table from 'react-bootstrap/Table';

const GroupListView = ({groups}) => {

    var listings;
    if (groups != undefined) {
        listings = groups.map(group => <Listing {...group}/>); 
    }
    return (
        <Table>
            <thead>
                <tr>
                    <th>Group Name</th>
                </tr>
            </thead>
            <tbody>
                {groups ? listings : <tr><td>No Groups</td></tr>}
            </tbody>
        </Table> 
    );
}


GroupListView.propTypes = {
    groups: PropTypes.array
};
export default GroupListView;