import React from 'react';
import PropTypes from 'prop-types';
import Listing from './Listing.js';
import Table from 'react-bootstrap/Table';

const GroupListView = ({groups}) => {
    const listings = groups.map(group => <Listing {...group}/>); 
    return (
       <Table>
           <thead>
               <tr>
                   <th>Group Name</th>
                   <th>Members</th>
               </tr>
           </thead>
           <tbody>
               {listings}
           </tbody>
       </Table> 
    );
}

GroupListView.propTypes = {
    groups: PropTypes.array.isRequired
};
export default GroupListView;