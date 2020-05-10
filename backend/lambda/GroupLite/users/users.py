import json
import boto3
import pymysql

from users import rds_config
from botocore.exceptions import ClientError
from botocore.exceptions import ParamValidationError

rds_host = "grouplite-db.clidohi5pcdd.us-east-1.rds.amazonaws.com"
name = rds_config.db_username
password = rds_config.db_password
db_name = rds_config.db_name

# try to connect to mysql db
try:
    conn = pymysql.connect(rds_host, user=name, passwd=password, db=db_name)
except pymysql.MySQLError as e:
    conn = None
    print(e)


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
    # check that connection to db valid
    if conn is None:
        return connection_error()

    # check that post request body is not empty
    if event['body'] is None:
        return { "statusCode": 404, "body": json.dumps({"error":"post request is empty"}) }

    # check that the request contains all required fields
    request = json.loads(event['body'])
    missing = {'username', 'email', 'password'} - set(request.keys())
    if not len(missing) == 0:
        missing_params = ['Missing parameter: {}'.format(val) for val in missing]
        return { "statusCode": 400, "body": json.dumps({"errors": missing_params}) }

    print()

    cognito = boto3.client('cognito-idp')
    try:
        # submit sign up request to AWS
        signup_response = cognito.sign_up(
            ClientId='56pl5bqsphd2j6e2phi8f4ioqi',
            Username=request.get('email'),
            Password=request.get('password'),
            UserAttributes=[
                {
                    'Name': 'email',
                    'Value': request.get('email')
                },
                {
                    'Name': 'preferred_username',
                    'Value': request.get('username')
                }
            ]  
        )
    except ClientError as error:
        return { "statusCode": 400, "body": json.dumps(error.response['Error']) }
    except ParamValidationError as error:
        return { "statusCode": 400, "body": json.dumps("Invalid Params passed") }

    # create user in database
    with conn.cursor() as cur:
        cur.execute("create table if not exists User ( UserID int auto_increment NOT NULL, Username varchar(255) NOT NULL, Email varchar(255) NOT NULL, PRIMARY KEY (UserID))")
        cur.execute('insert into User (Username, Email) values (\'{}\', \'{}\')'.format(request.get('username'), request.get('email')))
        conn.commit()

    # returns success statuscode if created
    return { "statusCode": 200 }

def connection_error():
    body = { "message": "issue connecting to db" }
    response = { "statusCode": 404, "body": json.dumps(body) }
    return response