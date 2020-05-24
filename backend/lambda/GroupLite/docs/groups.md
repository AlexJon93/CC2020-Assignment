# Groups

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

***Leave Group***
Deletes Membership relation between given user and group
* URL: /group/members
* Method: DELETE
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
                "GroupID": 1,
                "GroupName": "Example Group"
            },
            {
                "GroupID": 5,
                "GroupName": "Another Group"
            }
        ]
    }
    ```
