import json
import os
import pymysql
import jwt

from pymysql import MySQLError

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

def login(event, context):
    """ Logs user in if posted details valid """

    # Check that connection to DB is valid
    if conn is None:
        return connection_error()

    # Check post request body not empty
    if event.get('body') is None:
        return format_response(400, {"error":"post request is empty"})

    # Check request contains all required fields
    request = json.loads(event['body'])
    missing_params = check_missing('email', 'password', request=request)

    if missing_params is not None:
        return format_response(400, {"errors": missing_params})

    # Get user from DB
    user = None
    try:
        with conn.cursor() as cur:
            cur.execute("select * from User where Email=\'{}\'".format(request.get('email')))
            user = cur.fetchone()
            conn.commit()
    except MySQLError as e:
        print(e)
        return { "statusCode": 500 }

    # check user was returned
    if user is None:
        return format_response(404, {"error":"No such user found"})

    # check password valid
    salt = int(user.get('PassSalt')).to_bytes(16, byteorder='big')
    pass_hash = get_hash(request.get('password'), salt)
    if pass_hash == user.get('PasswordHash'):
        payload = {
            'user_id': user.get('UserID')
        }
        token = jwt.encode(payload, os.environ['TOKEN_SECRET'], algorithm='HS256')
        return format_response(200, {"token": token.decode('utf-8')})
    else:
        return format_response(404, {"error":"invalid username/password"})
