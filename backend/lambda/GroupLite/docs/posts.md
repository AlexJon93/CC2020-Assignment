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
        "post_group": 1,
        "image": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAlgA..." //optional base64 encoded image
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

***Get Image***

Returns Image from S3 Bucket from the given image_id
* URL: /image?image_id={id}
* Method: GET
* URL Parameter: {id} - string value
* Success Response
    ```json
    {
        "image":"UFsRXR2VWhVSUlGSkNpNEFVa1NZcUlRa1FTb2dob2RrVlVjRVJSVVVFRzhpZ..." //returns utf-8 encoded copy of image
    }
    ```
* Image will need to be encoded into base64 byte representation before being displayed

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
                "ImageID": "1-2020-05-24 23:18:50.627366",
                "CreatedAt": "2020-05-23 20:46:46"
            },
            {
                "PostID": 2,
                "PostContent": "This is another post",
                "PostUser": 1,
                "PostGroup": 5,
                "ImageID": null,
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
        "ImageID": "1-2020-05-24 23:18:50.627366",
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
                "ImageID": "1-2020-05-24 23:18:50.627366",
                "CreatedAt": "2020-05-23 20:46:46"
            },
            {
                "PostID": 2,
                "PostContent": "This is another post",
                "PostUser": 2,
                "PostGroup": 1,
                "ImageID": null,
                "CreatedAt": "2020-05-23 20:46:46"
            }
        ]
    }
    ```
