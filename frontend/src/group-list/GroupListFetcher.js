import {sendRequest} from '../helpers';

export default class GroupListFetcher {
    constructor() {
        this.request = new XMLHttpRequest();
        this.request.onreadystatechange = this.responseHandler;
    }

    fetch = () => {
        sendRequest(this.request, "GET", "/group", null);
    }

    responseHandler = () => {
        if (this.request.readyState === XMLHttpRequest.DONE) {

            if (this.request.status === 200) {
                const groupsJSON = JSON.parse(this.request.responseText);
                this.setState({groups: groupsJSON.groups});
            }
            else {
                this.setState({invalidSession: true});
            }
        }
    }

}