import json
import os
import pymysql

from misc import connection_error
from misc import get_hash
from misc import check_missing
from misc import format_response

rds_host = os.environ['RDS_HOST']
name = os.environ['DB_USERNAME']
password = os.environ['DB_PASS']
db_name = os.environ['DB_NAME']

# try to connect to mysql db
try:
    conn = pymysql.connect(rds_host, user=name, passwd=password, db=db_name, cursorclass=pymysql.cursors.DictCursor)
except pymysql.MySQLError as e:
    conn = None
    print(e)


def get_users(event, context):
    """ Returns list of all users in DB """

    # check that connection to db valid
    if conn is None:
        return connection_error()

    # intialising the body of the reponse, to add returned users
    body = {
        "message": "success!",
        "users": {}
    }

    # executes get all query and then iterates through response, adding to the response body
    with conn.cursor() as cur:
        cur.execute("select * from User")
        for row in cur:
            body["users"][row.get('UserID')] = row

    return format_response(200, body)

def post_user(event, context):
    """ Creates User from details in post request """

    # check that connection to db valid
    if conn is None:
        return connection_error()

    # check that post request body is not empty
    if event.get('body') is None:
        return format_response(404, {"error":"post request is empty"})

    # check that the request contains all required fields
    request = json.loads(event['body'])
    missing_params = check_missing('username', 'email', 'password', request=request)
    
    if missing_params is not None:
        return format_response(400, {"errors": missing_params})

    # generate salt followed by password hash
    salt = os.urandom(16)
    pass_hash = get_hash(request.get('password'), salt)

    # convert salt to storable format
    db_salt = int.from_bytes(salt, byteorder='big')

    # create user in database
    with conn.cursor() as cur:
        cur.execute("create table if not exists User ( UserID int auto_increment NOT NULL, PasswordHash varchar(255) NOT NULL, "+
                    " PassSalt varchar(255) NOT NULL, Username varchar(255) NOT NULL, Email varchar(255) NOT NULL, PRIMARY KEY (UserID))")
        cur.execute("insert into User (Username, Email, PasswordHash, PassSalt)"+
                    " values (\'{}\', \'{}\', \'{}\', \'{}\')".format(request.get('username'), request.get('email'), pass_hash, db_salt))
        conn.commit()

    # returns success statuscode if created
    return { "statusCode": 200 }