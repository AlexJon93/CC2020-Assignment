import json
import boto3

def login(event, context):
    cognito = boto3.client('cognito-idp')
    auth_response = cognito.initiate_auth(
        AuthFlow='USER_PASSWORD_AUTH',
        AuthParameters={
            'USERNAME':'alex.jon.jarvis@gmail.com',
            'PASSWORD':'Password21!'
        },
        ClientId='56pl5bqsphd2j6e2phi8f4ioqi'
    )

    return json.dumps(auth_response['Session'])