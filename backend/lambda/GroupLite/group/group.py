import json
import pymysql
import os

from misc import *

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

def create_group(event, context):
    """ Creates group based on details given in post request """

    # checks that connection to DB is valid
    if conn is None:
        return connection_error()

    # check body in request
    if event.get('body') is None:
        return format_response(404, {"error":"post request is empty"})
    request = json.loads(event['body'])

    # check that request has required value
    if request.get('group_name') is None:
        return format_response(400, {"errors": ["Missing parameter: GroupName"] })

    # create table if does not exist and add new group
    try:
        with conn.cursor() as cur:
            cur.execute("create table if not exists MemberGroup ( GroupID int auto_increment NOT NULL, GroupName varchar(255) NOT NULL UNIQUE, PRIMARY KEY (GroupID) )")
            cur.execute("insert into MemberGroup (GroupName) values (\'{}\')".format(request.get('group_name')))
            conn.commit()
    except pymysql.MySQLError as e:
        print(e)
        return { "statusCode": 500 }
    except pymysql.IntegrityError as e:
        print(e)
        return format_response(400, {'error': str(e)})

    # returns success statuscode if created
    return { "statusCode": 200 }

def get_group(event, context):
    """ Returns either all groups in DB or group related to given id """

    # checks that connection to DB is valid
    if conn is None:
        return connection_error()

    # check call is for specific id
    if event.get('queryStringParameters') is not None and event.get('queryStringParameters').get('group_id') is not None:
        group_id = event['queryStringParameters']['group_id']
        body = { }
        with conn.cursor() as curr:
            curr.execute("select GroupID, GroupName from MemberGroup where GroupID={}".format(group_id))
            body = curr.fetchone()
            conn.commit()
    
    # returns full list of groups if not for specific group
    else:
        body = { "groups": [] }
        with conn.cursor() as curr:
            curr.execute("select GroupID, GroupName from MemberGroup")
            for row in curr:
                body['groups'].append(row)

    return format_response(200, body)