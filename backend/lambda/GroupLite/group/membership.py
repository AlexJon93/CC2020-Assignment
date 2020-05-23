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

def get_group_members(event, context):
    """ Returns list of all members of a given group """

    # check connection to DB valid
    if conn is None:
        return connection_error()
    
    # confirm user_id is passed via query
    if event.get('queryStringParameters') is not None and event.get('queryStringParameters').get('group_id') is not None:
        user_id = event["queryStringParameters"]["group_id"]
        body = { 'group id': user_id, 'members': [] }
        try:
            with conn.cursor() as curr:
                curr.execute('select MemberID from Membership where GroupID = \'{}\''.format(user_id))
                for row in curr:
                    body['members'].append(row)
                conn.commit()
                return format_response(200, body) 
        except pymysql.MySQLError as e:
            print(e)
            return { 'statusCode': 500 }
    else:
        return { 'statusCode': 400 }

def add_membership(event, context):
    """ Adds given user to a given group based on ids in post request """

    # check connection to DB valid
    if conn is None:
        return connection_error()

    # check request is not empty
    if event.get('body') is None:
        return format_response(404, {"error":"post request is empty"})
    request = json.loads(event['body'])

    # check request contains required values
    missing_vals = check_missing('user_id', 'group_id', request=request)
    if missing_vals is not None:
        return format_response(400, {"errors": missing_vals})

    try:
        # add user to group
        with conn.cursor() as curr:
            curr.execute("create table if not exists Membership ( MemberID int, GroupID int, primary key(MemberID, GroupID), "+
                "foreign key(MemberID) references Member(MemberID), "+
                "foreign key(GroupID) references MemberGroup(GroupID) )"
            )
            curr.execute("insert into Membership(MemberID, GroupID) values({}, {})".format(request.get('user_id'), request.get('group_id')))
            conn.commit()
    except pymysql.MySQLError as e:
        print(e)
        return format_response(400, {"error": repr(e)})

    return { 'statusCode': 200 }