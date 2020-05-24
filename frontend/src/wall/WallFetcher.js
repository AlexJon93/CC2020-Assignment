import store from '../redux/store'; 
import { setGroupID, setGroupName, addPost, addPosterName, setLoading, setIsMember, addGroupMember } from "../redux/actions";
import { sendRequest } from "../helpers";
import docCookies from 'doc-cookies';

export default class WallFetcher {
    constructor(GroupID) {
        this.GroupID = GroupID;

        this.groupNameRequest = new XMLHttpRequest();
        this.groupNameRequest.onreadystatechange = this.groupNameResponseHandler;

        this.postsRequest = new XMLHttpRequest();
        this.postsRequest.onreadystatechange = this.postsResponseHandler;

        this.groupMembsRequest = new XMLHttpRequest();
        this.groupMembsRequest.onreadystatechange = this.groupMembsResponseHandler;
    }

    // Start the request chain
    fetch = () => {

        // Set the groupid
        store.dispatch(setGroupID(this.GroupID));

        const  params = { group_id: this.GroupID };
        // Get the name of the group
        sendRequest(this.groupNameRequest, "GET", "/group", params);
        // Get posts for the group
        sendRequest(this.postsRequest, "GET", "/group/posts", params);
        // Get members for the group
        sendRequest(this.groupMembsRequest, "GET", "/group/members", params);
    }

    groupNameResponseHandler = () => {
        // Dispatch name of group
        if (this.groupNameRequest.readyState === XMLHttpRequest.DONE &&
            this.groupNameRequest.status === 200) {

            const groupJSON = JSON.parse(this.groupNameRequest.responseText);
            console.log(groupJSON);
            store.dispatch(setGroupName(groupJSON.GroupName));
        }

    }

    postsResponseHandler = () => {
        if (this.postsRequest.readyState === XMLHttpRequest.DONE &&
            this.postsRequest.status === 200) {

            const postsJSON = JSON.parse(this.postsRequest.responseText);
            const posts = postsJSON.posts;        
            
            // Dispatch posts
            for (const post of posts) {
                store.dispatch(addPost(post));

                // Request names for each post
                let request = new XMLHttpRequest();

                // Dispatch on response
                request.onreadystatechange = () => {
                    if (request.readyState === XMLHttpRequest.DONE && request.status === 200) {
                        let userJSON = JSON.parse(request.responseText);
                        store.dispatch(addPosterName(userJSON.MemberID, userJSON.Username));
                    }
                }
                var params = {user_id: post.PostUser};
                sendRequest(request, "GET", "/user", params);
            }
            // Set loading to false
            store.dispatch(setLoading(false));
        }
    }

    groupMembsResponseHandler = () => {
        if (this.groupMembsRequest.readyState === XMLHttpRequest.DONE) {
            
            if (this.groupMembsRequest.status === 200) {

                const membersJSON = JSON.parse(this.groupMembsRequest.responseText);
                const myId = docCookies.getItem('id');

                const isMember = membersJSON.members.some(member => {
                    console.log(member.MemberID);
                    return member.MemberID == myId;
                });
                store.dispatch(setIsMember(isMember));


                // Get names for all the members and push it to the store
                for (const member of membersJSON.members) {
                    let request = new XMLHttpRequest();

                    request.onreadystatechange = () => {
                        // Add {UserID, Username} to the members list 
                        if (request.readyState === XMLHttpRequest.DONE) {

                            if (request.status === 200) {
                                const memberJSON = JSON.parse(request.responseText);
                                const {Email, ...memberToAdd} = memberJSON;
                                store.dispatch(addGroupMember(memberToAdd));
                            }
                        }
                    }

                    sendRequest(request, "GET", "/user", {user_id: member.MemberID});
                }
            }
            else {
                console.log("Couldn't get members");
                console.log(this.groupNameRequest.response);
            }
        } 
    }
}
