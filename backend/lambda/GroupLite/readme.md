# API Documentation

Root Url for the API is: https://zgq12eeko2.execute-api.us-east-1.amazonaws.com/dev/

All calls go to that url e.g. https://zgq12eeko2.execute-api.us-east-1.amazonaws.com/dev/login

In the following documentation the root url will not be provided and only the route specific url details will be provided. e.g. /login from the previous example

**Authentication**

All calls to the API, excluding the login and signup routes, require a session token to be passed via the Authorization Header. Session tokens can be generated from the login route by providing valid user details. 

Session tokens expire after three hours and a new session token will need to be generated.

# Routes

Links to Route documentation:
* [Login](docs/login.md)
* [Users](docs/users.md)
* [Groups](docs/groups.md)
* [Posts](docs/posts.md)
* [Events](docs/events.md)