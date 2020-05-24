# Users

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
