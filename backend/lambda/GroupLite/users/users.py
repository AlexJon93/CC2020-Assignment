import json
import os
import boto3
import pymysql

from botocore.exceptions import ClientError
from botocore.exceptions import ParamValidationError

rds_host = os.environ['RDS_HOST']
name = os.environ['DB_USERNAME']
password = os.environ['DB_PASS']
db_name = os.environ['DB_NAME']

# try to connect to mysql db
try:
    conn = pymysql.connect(rds_host, user=name, passwd=password, db=db_name)
except pymysql.MySQLError as e:
    conn = None
    print(e)


def get_user(event, context):
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
        pos = 0
        for row in cur:
            body["users"][pos] = row
            pos += 1

    # creates and returns successful response
    response = {
        "statusCode": 200,
        "body": json.dumps(body)
    }

    return response

def post_user(event, context):
    # check that connection to db valid
    if conn is None:
        return connection_error()

    # check that post request body is not empty
    if event.get('body') is None:
        return { "statusCode": 404, "body": json.dumps({"error":"post request is empty"}) }

    # check that the request contains all required fields
    request = json.loads(event['body'])
    missing = {'username', 'email', 'password'} - set(request.keys())
    if not len(missing) == 0:
        missing_params = ['Missing parameter: {}'.format(val) for val in missing]
        return { "statusCode": 400, "body": json.dumps({"errors": missing_params}) }

    

    # create user in database
    with conn.cursor() as cur:
        cur.execute("create table if not exists User ( UserID int auto_increment NOT NULL, PasswordHash varchar(255) NOT NULL, Username varchar(255) NOT NULL, Email varchar(255) NOT NULL, PRIMARY KEY (UserID))")
        cur.execute('insert into User (Username, Email) values (\'{}\', \'{}\')'.format(request.get('username'), request.get('email')))
        conn.commit()

    # returns success statuscode if created
    return { "statusCode": 200 }

def connection_error():
    body = { "message": "issue connecting to db" }
    response = { "statusCode": 404, "body": json.dumps(body) }
    return response