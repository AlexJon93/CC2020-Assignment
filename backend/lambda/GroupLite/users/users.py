import json
import boto3
import pymysql

from users import rds_config
from botocore.exceptions import ClientError

rds_host = "grouplite-db.clidohi5pcdd.us-east-1.rds.amazonaws.com"
name = rds_config.db_username
password = rds_config.db_password
db_name = rds_config.db_name

# try:
#     conn = pymysql.connect(rds_host, user=name, passwd=password, db=db_name)
# except pymysql.MySQLError as e:
#     conn = None
#     print(e)


def get_user(event, context):
    if conn is None:
        return connection_error()

    body = {
        "message": "success!",
        "users": {}
    }

    with conn.cursor() as cur:
        cur.execute("select * from User")
        pos = 0
        for row in cur:
            body["users"][pos] = row
            pos += 1
    
    response = {
        "statusCode": 200,
        "body": json.dumps(body)
    }

    return response

def post_user(event, context):
    # if conn is None:
    #     return connection_error()

    if event['body'] is None:
        return { "statusCode": 404, "body": json.dumps({"error":"body is null"}) }

    request = json.loads(event['body'])
    cognito = boto3.client('cognito-idp')

    try:
        signup_response = cognito.sign_up(
            ClientId='56pl5bqsphd2j6e2phi8f4ioqi',
            Username=request['email'],
            Password=request['password'],
            UserAttributes=[
                {
                    'Name': 'email',
                    'Value': request['email']
                },
                {
                    'Name': 'preferred_username',
                    'Value': request['username']
                }
            ]  
        )
    except ClientError as error:
        return { "statusCode": 400, "body": json.dumps(error.response['Error']) }

    # with conn.cursor() as cur:
    #     cur.execute("create table if not exists User ( UserID int NOT NULL, Name varchar(255) NOT NULL, PasswordHash varchar(255) NOT NULL, PRIMARY KEY (UserID))")
    #     cur.execute('insert into User (UserID, Name, PasswordHash) values (1, "AlexJ", "AKUHDUUY12374")')
    #     conn.commit()

    # body = {
    #     "message": "success!"
    # }

    response = {
        "statusCode": 200,
        "body": json.dumps(request['username'])
    }

    return response

def connection_error():
    body = { "message": "issue connecting to db" }
    response = { "statusCode": 404, "body": json.dumps(body) }
    return response