import {sendRequest} from '../helpers';
import docCookies from 'doc-cookies';
import store from '../redux/store';
import {setUser, addGroup} from '../redux/actions';

export default class ProfileFetcher {
    constructor(Email) {
        this.Email = Email;

        this.userRequest = new XMLHttpRequest();
        this.userRequest.onreadystatechange = this.userResponseHandler;

        this.groupsRequest = new XMLHttpRequest();
        this.groupsRequest.onreadystatechange = this.groupsResponseHandler;
    }

    fetch = () => {
        // Get user details
        const params = {user_email: this.Email};
        sendRequest(this.userRequest, "GET", "/user", params);
    }
    
    userResponseHandler = () => {
        if (this.userRequest.readyState === XMLHttpRequest.DONE &&
            this.userRequest.status === 200) {

            const userJSON = JSON.parse(this.userRequest.responseText);
            // Set user cookies (id)
            docCookies.setItem('id', userJSON.MemberID);
            
            // Dispatch user details
            store.dispatch(setUser(userJSON));

            // Use userId to request user groups
            sendRequest(this.groupsRequest, "GET", "/user/groups", {user_id: userJSON.MemberID});
            }
    }

    groupsResponseHandler = () => {
        if (this.groupsRequest.readyState === XMLHttpRequest.DONE &&
            this.groupsRequest.status === 200) {
            
            const groupsJSON = JSON.parse(this.groupsRequest.responseText);
            console.log(groupsJSON);
            
            // Fetch name for each id
            for (const group of groupsJSON.groups) {
                console.log("THE GROUP", group);
                let request = new XMLHttpRequest();
                request.onreadystatechange = () => {
                   if (request.readyState === XMLHttpRequest.DONE) {

                        if (request.status === 200) {
                            console.log("Success");
                            const groupJSON = JSON.parse(request.responseText);
                            store.dispatch(addGroup(groupJSON));
                        }
                        else {
                            console.log("Group fetch failed for groupid " + group.GroupID);
                        }
                   } 
                }
                sendRequest(request, "GET", "/group", {group_id: group.GroupID});
                console.log("Request sent for " + group.GroupID);
            }
            store.dispatch(setUser({loading: false}));
        }
    }
}