import json
import os
import pymysql

from urllib import parse

from misc import *
from request import *

conn = db_connect()

def get_users(event, context):
    """ Returns either all users in DB or single user in query """

    # check that connection to db valid
    if conn is None:
        return connection_error()

    # check if call is for specific user via id
    if event.get("queryStringParameters") is not None and event.get("queryStringParameters").get("user_id") is not None:
        user_id = event["queryStringParameters"]["user_id"]
        # executes query to get user and adds to the response body
        with conn.cursor() as cur:
            cur.execute("select MemberID, Username, Email from Member where MemberID={}".format(user_id))
            body = cur.fetchone()
            conn.commit()

    # check if call is for specific user via email
    elif event.get("queryStringParameters") is not None and event.get("queryStringParameters").get("user_email") is not None:
        user_email = event["queryStringParameters"]["user_email"]
        # executes query to get user and adds to the response body
        with conn.cursor() as cur:
            cur.execute("select MemberID, Username, Email from Member where Email=\'{}\'".format(user_email))
            body = cur.fetchone()
            conn.commit()

    # check if call is for all users
    elif event.get("queryStringParameters") is None:
        body = { "users": [] }
        # executes get all query and then iterates through response, adding to the response body
        with conn.cursor() as cur:
            cur.execute("select MemberID, Username, Email from Member")
            for row in cur:
                body["users"].append(row)

    # return error if invalid request
    else:
        return format_response(400, {"error": "Invalid request"})

    return format_response(200, body)

def post_user(event, context):
    """ Creates User from details in post request """

    outcome, request = check_post('email', 'username', 'password', conn=conn, event=event)
    if outcome is False:
        return request

    # generate salt followed by password hash
    salt = os.urandom(16)
    pass_hash = get_hash(request.get('password'), salt)

    # convert salt to storable format
    db_salt = int.from_bytes(salt, byteorder='big')

    # create user in database
    try:
        with conn.cursor() as cur:
            cur.execute("create table if not exists Member ( MemberID int auto_increment NOT NULL, PasswordHash varchar(255) NOT NULL, "+
                        " PassSalt varchar(255) NOT NULL, Username varchar(255) NOT NULL, Email varchar(255) NOT NULL UNIQUE, PRIMARY KEY (MemberID))")
            cur.execute("insert into Member (Username, Email, PasswordHash, PassSalt)"+
                        " values (\'{}\', \'{}\', \'{}\', \'{}\')".format(request.get('username'), request.get('email'), pass_hash, db_salt))
            conn.commit()
    except pymysql.IntegrityError as e:
        print(e)
        return format_response(400, {'error': repr(e)})

    # returns success statuscode if created
    return format_response(200)