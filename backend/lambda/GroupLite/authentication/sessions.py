import json
import os
import pymysql
import jwt

from datetime import datetime, timedelta
from misc import *
from request import *

conn = db_connect()

def login(event, context):
    """ Logs user in if posted details valid """

    outcome, request = check_post('email', 'password', conn=conn, event=event)
    if outcome is False:
        return request

    # Get user from DB
    user = None
    try:
        with conn.cursor() as cur:
            cur.execute("select MemberID, PassSalt, PasswordHash from Member where Email=\'{}\'".format(request.get('email')))
            user = cur.fetchone()
            conn.commit()
    except pymysql.MySQLError as e:
        print(e)
        return format_response(500)

    # check user was returned
    if user is None:
        return format_response(404, {"error":"invalid username/password"})

    # check password valid
    salt = int(user.get('PassSalt')).to_bytes(16, byteorder='big')
    pass_hash = get_hash(request.get('password'), salt)
    if pass_hash == user.get('PasswordHash'):
        payload = {
            'user_id': user.get('MemberID'),
            'exp': datetime.utcnow() + timedelta(hours=3)
        }
        token = jwt.encode(payload, os.environ['TOKEN_SECRET'], algorithm='HS256')
        return format_response(200, {"token": token.decode('utf-8')})
    else:
        return format_response(404, {"error":"invalid username/password"})


def auth(event, context):
    """ Used to protect api endpoints """

    # get token from authorization header
    token = event.get('authorizationToken')

    # decode token and check validity
    try:
        decoded = jwt.decode(token, os.environ['TOKEN_SECRET'], algorithms='HS256')
        if decoded.get('user_id') is not None:
            return get_policy('Allow')
    except (jwt.DecodeError, jwt.ExpiredSignatureError) as e:
        print(e)
        return get_policy('Deny', {"error": "invalid token"})

    return get_policy('Deny')

def get_policy(effect, context={}):
    ''' Generates authorization response '''

    return { 
        "principalId": "user",
        "policyDocument": {
            "Version": "2012-10-17",
            "Statement": [
                {
                    "Action":"execute-api:Invoke",
                    "Effect": effect,
                    "Resource": '*'
                }
            ]
        },
        "context" : context
     }