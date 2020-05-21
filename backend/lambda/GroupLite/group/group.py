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

    if request.get('GroupName') is None:
        return format_response(400, {"errors": ["Missing parameter: GroupName"] })

    try:
        with conn.cursor() as cur:
            cur.execute("create table if not exists UserGroup ( GroupID int auto_increment NOT NULL, GroupName varchar(255) NOT NULL, PRIMARY KEY (GroupID) )")
            cur.execute("insert into UserGroup (GroupName) values (\'{}\')".format(request.get('GroupName')))
            conn.commit()
    except pymysql.MySQLError as e:
        print(e)
        return { "statusCode": 500 }

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
        body = { "group": {} }
        with conn.cursor() as curr:
            curr.execute("select GroupID, GroupName from UserGroup where GroupID={}".format(group_id))
            body['group'] = curr.fetchone()
            conn.commit()
    
    else:
        body = { "groups": [] }
        with conn.cursor() as curr:
            curr.execute("select GroupID, GroupName from UserGroup")
            for row in curr:
                body['groups'].append(row)

    return format_response(200, body)