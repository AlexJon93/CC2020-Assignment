# API Documentation

Root Url for the API is: https://zgq12eeko2.execute-api.us-east-1.amazonaws.com/dev/

All calls go to that url e.g. https://zgq12eeko2.execute-api.us-east-1.amazonaws.com/dev/login

In the following documentation the root url will not be provided and only the route specific url details will be provided. e.g. /login from the previous example

**Authentication**

All calls to the API, excluding the login and signup routes, require a session token to be passed via the Authorization Header. Session tokens can be generated from the login route by providing valid user details. 

Session tokens expire after three hours and a new session token will need to be generated.

# Routes

**Login**
--
***Login***

Returns session token in JSON response
* URL: /login
* Method: POST
* Post Request:
    ```json
    {
        "email": "example@email.com",
        "password": "password123"
    }
    ```
* Success Response:
    ```json
    {
        "token": "header.payload.signature"
    }
    ```

**Users**
--
***Get User(s)***

Returns JSON data about either a single user or all users

* URL: 
    * /user - returns all users
    * /user?user_id={id} - returns user from given id
    * /user?user_email={email} - returns user from given email
* Method: GET
* URL Param: 
    * {id} = integer value
    * {email} = string value
* Success Response:
    * single user:
        ```json 
        {
            "MemberID" : 2,
            "Username" : "exampleuser",
            "Email" : "example@email.com"
        } 
        ```
    * all users:
        ```json
        {
            "users": [
                {
                    "MemberID": 1,
                    "Username": "exampleuser",
                    "Email": "example@email.com"
                },
                {
                    "MemberID": 2,
                    "Username": "anotheruser",
                    "Email": "another@email.com"
                }
            ]
        }
        ```

***Create User***

Creates user in database from given details
* URL: /user
* Method: POST
* Post Request:
    ```json
    {
        "email": "example@email.com",
        "username": "exampleuser",
        "password": "password123"
    }
    ```
* Success Response: 
    * Status Code : 200
    * No JSON returned

**Groups**
--

***Get Group(s)***

Returns JSON data about either a single group or all groups
* URL: 
    * /group - returns all groups
    * /group?group_id={id} - returns group from given id
* Method: GET
* URL Parameter: {id} = integer value
* Success Response
    *   Single Group:
        ```json 
        { 
            "GroupID": 1, 
            "GroupName": "Example Group" 
        } 
        ```

    *   All Groups:

        ```json
        {
            "groups": [ 
                { 
                    "GroupID": 1, 
                    "GroupName": "Example Group" 
                }, 
                {
                    "GroupID": 2, 
                    "GroupName": "Another Group" 
                } 
            ]
        }
        ```
***Create Group***

Creates group in database from given details
* URL: /group
* Method: POST
* Post Request:
    ```json
    {
        "group_name": "Example Group"
    }
    ```
* Success Response: 
    * Status Code : 200
    * No JSON returned

***Get Members***

Returns JSON data of all members in group
* URL: /group/members?group_id={id}
* Method: GET
* URL Parameter: {id} = integer value
* Success Response
    ```json
    {
        "group id": "1",
        "members": [
            {
                "MemberID": 1
            },
            {
                "MemberID": 5
            }
        ]
    }
    ```

***Join Group***

Creates Membership relation between given user and group
* URL: /group/members
* Method: POST
* Post Request:
    ```json
    {
        "group_id": 1,
        "user_id": 1
    }
    ```
* Success Response
    * Status Code: 200
    * No JSON Response