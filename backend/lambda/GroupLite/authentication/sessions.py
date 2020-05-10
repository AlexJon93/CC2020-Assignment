import json
import boto3
import logging
import signal

logger = logging.getLogger()
logger.setLevel('DEBUG')

from contextlib import contextmanager
from botocore.exceptions import ClientError

def login(event, context):
    logger.info('## EVENT')
    logger.info(event)

    # checks post body not empty
    logger.debug('Checking post request not empty')
    if event['body'] is None:
        logger.error('Post request was empty')
        return { "statusCode": 404, "body": json.dumps({"error":"post request is empty"}) }
    logger.debug('Post request not empty')

    # check that the request contains all required fields
    logger.debug('Checking post request contains required paramaters')
    request = json.loads(event['body'])
    missing = {'email', 'password'} - set(request.keys())
    if not len(missing) == 0:
        logger.error('Missing some paramaters in the request')
        missing_params = ['Missing parameter: {}'.format(val) for val in missing]
        return { "statusCode": 400, "body": json.dumps({"errors": missing_params}) }
    logger.debug('Post request contains required paramaters')

    cognito = boto3.client('cognito-idp')
    try:
        # submit sign in request to AWS
        logger.debug('Submitting sign in request to AWS')
        with timeout(1):
            try:
                auth_response = cognito.admin_initiate_auth(
                    AuthFlow='ADMIN_USER_PASSWORD_AUTH',
                    AuthParameters={
                        'USERNAME': request.get('email'),
                        'PASSWORD': request.get('password')
                    },
                    ClientId='56pl5bqsphd2j6e2phi8f4ioqi',
                    UserPoolId='us-east-1_a84YtxjfS'
                )
            except TimeoutError as error:
                logger.error('Cognito request timed out')
                return { "statusCode": 500, "body": json.dumps({"error": "Timeout"}) }
        logger.info('## LOGIN RESPONSE')
        logger.info(auth_response)
    except ClientError as error:
        logger.error('There was an issue with the request')
        return { "statusCode": 400, "body": json.dumps(error.response['Error']) }
    
    logger.debug('No issue with cognito login')

    # return session token on success
    logger.debug('Returning request token')
    return {"body": json.dumps({"session_token": auth_response.get('AuthenticationResult').get('AccessToken')})}

@contextmanager
def timeout(time):
    signal.signal(signal.SIGALRM, raise_timeout)
    signal.alarm(time)

    try:
        yield
    except TimeoutError:
        print('function timed out')
        pass
    finally:
        signal.signal(signal.SIGALRM, signal.SIG_IGN)
    

def raise_timeout(signum, frame):
    raise TimeoutError