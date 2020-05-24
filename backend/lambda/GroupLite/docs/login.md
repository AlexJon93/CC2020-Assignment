# Login
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