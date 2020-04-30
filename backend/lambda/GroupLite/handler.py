import json


def hello(event, context):
    body = {
        "message": "Hello There!"
    }

    response = {
        "statusCode": 200,
        "body": json.dumps(body)
    }

    return response