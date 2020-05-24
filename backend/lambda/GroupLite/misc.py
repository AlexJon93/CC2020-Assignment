import json

from hashlib import sha256

def connection_error():
    """ Returns a json response if connection issue with DB """

    body = { "message": "issue connecting to db" }
    return format_response(404, body)

def get_hash(val, salt):
    """ Generates hash string from given value and salt """

    hashed = sha256(val.encode() + salt)
    return hashed.hexdigest()

def check_missing(*req_vals, request):
    """ Checks that request contains all requested values """
    
    missing = set(req_vals) - set(request.keys())
    if not len(missing) == 0:
        return ['Missing parameter: {}'.format(val) for val in missing]
    else:
        return None

def format_response(status, body = {}):
    """ Returns a formatted JSON response """
    try:
        return {
            "statusCode": status,
            "headers": {
                "content-type": "application/json",
                "Access-Control-Allow-Origin": '*'
            },
            "body": json.dumps(body)
        }
    except Exception as e:
        print(e)
        return format_response(500)
