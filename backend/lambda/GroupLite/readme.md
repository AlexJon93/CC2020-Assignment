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
    * /group?group_name={name} - returns group from given group name
* Method: GET
* URL Parameter: 
    * {id} = integer value
    * {name} = string value
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

***Get Users' Groups***

Returns JSON Data of all groups a given user is a member of
* URL: /user/groups?user_id={id}
* Method: GET
* URL Parameter: {id} - integer value
* Success Response
    ```json
    {
        "user id": "1",
        "groups": [
            {
                "GroupID": 1
            },
            {
                "GroupID": 5
            }
        ]
    }
    ```

**Posts**
--

***Create Post***

Creates post in database from given details
* URL: /group/posts
* Method: POST
* Post Request:
    ```json
    {
        "post_content": "This is a test post",
        "post_user": 1,
        "post_group": 1
    }
    ```
* Success Response:
    * Status Code: 200
    * No JSON Response

***Get Users' Posts***

Returns JSON Data of all posts from a given user
* URL: /user/posts?user_id={id}
* Method: GET
* URL Parameter: {id} - integer value
* Success Response:
    ```json
    {
        "user id": 1,
        "posts" [
            {
                "PostID": 1,
                "PostContent": "This is a test post",
                "PostUser": 1,
                "PostGroup": 1,
                "CreatedAt": "2020-05-23 20:46:46"
            },
            {
                "PostID": 2,
                "PostContent": "This is another post",
                "PostUser": 1,
                "PostGroup": 5,
                "CreatedAt": "2020-05-23 20:46:46"
            }
        ]
    }
    ```

***Get Post***

Returns JSON Data of a post from a given post id
* URL: /posts?post_id={id}
* Method: GET
* URL Parameter: {id} - integer value
* Success Response:
    ```json
    {
        "PostID": 1,
        "PostContent": "This is a test post",
        "PostUser": 1,
        "PostGroup": 1,
        "CreatedAt": "2020-05-23 20:46:46"
    }
    ```

***Get Groups' Posts***

Returns JSON Data of all posts from in a given group
* URL: /group/posts?user_id={id}
* Method: GET
* URL Parameter: {id} - integer value
* Success Response:
    ```json
    {
        "group id": 1,
        "posts" [
            {
                "PostID": 1,
                "PostContent": "This is a test post",
                "PostUser": 1,
                "PostGroup": 1,
                "CreatedAt": "2020-05-23 20:46:46"
            },
            {
                "PostID": 2,
                "PostContent": "This is another post",
                "PostUser": 2,
                "PostGroup": 1,
                "CreatedAt": "2020-05-23 20:46:46"
            }
        ]
    }
    ```

**Events**
--

***Create Event***

Creates event in database from given details
* URL: /event
* Method: POST
* Post Request:
    ```json
    {
        "event_title": "My Birthday",
        "event_creator": 1,
        "event_group": 1,
        "event_date": "2020-06-06 18:30", //optional
        "event_location": "123 Fake St" //optional
    }
    ```
* Success Response:
    * Status Code: 200
    * No JSON Response

***Get Event***

Returns JSON Data of an event from a given event id
* URL: /event?event_id={id}
* Method: GET
* URL Parameter: {id} = integer value
* Success Response:
    ```json
    {
        //optional values return null if not specified
        "EventID": 1,
        "EventTitle": "My Birthday",
        "EventCreator": 1,
        "EventGroup": 1,
        "EventDate": "2020-06-06 18:30:00",
        "EventLocation": "123 Fake St"
    }
    ```

***Get Group Events***

Returns JSON Data of all events in a given group
* URL: /group/events?group_id={id}
* Method: GET
* URL Parameter: {id} = integer value
* Success Response:
    ```json
    {
        "group id": "1",
        "events": [
            {
                "EventID": 1,
                "EventTitle": "My Birthday",
                "EventCreator": 1,
                "EventGroup": 1,
                "EventDate": "2020-06-06 18:30:00",
                "EventLocation": "123 Fake St"
            },
            {
                "EventID": 2,
                "EventTitle": "My Wedding",
                "EventCreator": 5,
                "EventGroup": 1,
                "EventDate": "2020-20-06 18:30:00",
                "EventLocation": "456 AnotherFake St"
            }
        ]
    }
    ```

***Get Users Events***

Returns JSON Data of all events created by a given user
* URL: /user/events?user_id=1
* Method: GET
* URL Parameter: {id} = integer value
* Success Response:
    ```json
    {
        "user id": "1",
        "events": [
            {
                "EventID": 1,
                "EventTitle": "My Birthday",
                "EventCreator": 1,
                "EventGroup": 1,
                "EventDate": "2020-06-06 18:30:00",
                "EventLocation": "123 Fake St"
            },
            {
                "EventID": 2,
                "EventTitle": "My Wedding",
                "EventCreator": 1,
                "EventGroup": 5,
                "EventDate": "2020-20-06 18:30:00",
                "EventLocation": "456 AnotherFake St"
            }
        ]
    }
    ```

***Add Attendance***

Creates attendance relation between given user and event
* URL: /event/attend
* Method: POST
* Post Request:
    ```json
    {
        "event_id": 1,
        "event_attendee": 1
    }
    ```
* Success Response:
    * Status Code: 200
    * No JSON Response

***Get Attending***

Returns JSON Data of all events a user is attending
* URL: /user/events/attend?user_id={id}
* Method: GET
* URL Parameter: {id} = integer value
* Success Response:
    ```json
    {
        "user id": "1",
        "events": [
            {
                "EventID": 1
            },
            {
                "EventID": 5
            }
        ]
    }
    ```

***Get Event Attendees***

Returns JSON Data of all users attending a given event
* URL: /event/attend?event_id={id}
* Method: GET
* URL Parameter: {id} = integer value
* Success Response:
    ```json
    {
        "event id": "1",
        "attendees": [
            {
                "AttendeeID": 1
            },
            {
                "AttendeeID": 5
            }
        ]
    }
    ```