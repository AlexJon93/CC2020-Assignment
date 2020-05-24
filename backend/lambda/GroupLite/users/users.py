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

    # check if call is for all users
    if event.get("queryStringParameters") is None:
        req = "select MemberID, Username, Email from Member"
        response = get(req, conn, 'users')
        return response

    # check if call is for specific user via id
    elif event.get("queryStringParameters").get("user_id") is not None:
        req = "select MemberID, Username, Email from Member where MemberID={}".format(event["queryStringParameters"]["user_id"])
        response = get(req, conn)
        return response

    # check if call is for specific user via email
    elif event.get("queryStringParameters").get("user_email") is not None:
        req = "select MemberID, Username, Email from Member where Email=\'{}\'".format(event["queryStringParameters"]["user_email"])
        response = get(req, conn)
        return response

    # return error if invalid
    return format_response(400)

def post_user(event, context):
    """ Creates User from details in post request """

    # verify valid post request
    outcome, request = check_post('email', 'username', 'password', conn=conn, event=event)
    if outcome is False:
        return request

    # generate salt followed by password hash
    salt = os.urandom(16)
    pass_hash = get_hash(request.get('password'), salt)

    # convert salt to storable format
    db_salt = int.from_bytes(salt, byteorder='big')

    # create user in database
    create_req = '''create table if not exists Member ( 
        MemberID int auto_increment NOT NULL, 
        PasswordHash varchar(255) NOT NULL, 
        PassSalt varchar(255) NOT NULL, 
        Username varchar(255) NOT NULL, 
        Email varchar(255) NOT NULL UNIQUE, 
        PRIMARY KEY (MemberID) )'''

    insert_req = "insert into Member (Username, Email, PasswordHash, PassSalt) values (\'{}\', \'{}\', \'{}\', \'{}\')".format(
        request.get('username'), request.get('email'), pass_hash, db_salt
    )

    # returns success statuscode if created
    return post(create_req, insert_req, conn)