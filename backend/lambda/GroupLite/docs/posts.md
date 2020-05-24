# Posts

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

***Delete Post***

Deletes given post from database
* URL: /group/posts
* Method: DELETE
* Post Request:
    ```json
    {
        "post_id": 1
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
