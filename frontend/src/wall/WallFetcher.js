import store from '../redux/store'; 
import { setGroupID, setGroupName, addPost, addPosterName, setLoading } from "../redux/actions";
import { sendRequest } from "../helpers";

export default class WallFetcher {
    constructor(GroupID) {
        this.GroupID = GroupID;

        this.groupNameRequest = new XMLHttpRequest();
        this.groupNameRequest.onreadystatechange = this.groupNameResponseHandler;

        this.postsRequest = new XMLHttpRequest();
        this.postsRequest.onreadystatechange = this.postsResponseHandler;
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
    }

    groupNameResponseHandler = () => {
        // Dispatch name of group
        if (this.groupNameRequest.readyState === XMLHttpRequest.DONE &&
            this.groupNameRequest.status === 200) {

            const groupJSON = JSON.parse(this.groupNameRequest.responseText);
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
                var request = new XMLHttpRequest();

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
}