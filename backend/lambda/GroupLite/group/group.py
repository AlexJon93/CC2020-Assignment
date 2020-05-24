import json
import pymysql
import os

from misc import *
from request import *

conn = db_connect()

def create_group(event, context):
    """ Creates group based on details given in post request """

    outcome, request = check_post('group_name', conn=conn, event=event)
    if outcome is False:
        return request

    # create table if does not exist and add new group
    try:
        with conn.cursor() as cur:
            cur.execute("create table if not exists MemberGroup ( GroupID int auto_increment NOT NULL, GroupName varchar(255) NOT NULL UNIQUE, PRIMARY KEY (GroupID) )")
            cur.execute("insert into MemberGroup (GroupName) values (\'{}\')".format(request.get('group_name')))
            conn.commit()
    except pymysql.MySQLError as e:
        print(e)
        return format_response(500)
    except pymysql.IntegrityError as e:
        print(e)
        return format_response(400, {'error': str(e)})

    # returns success statuscode if created
    return format_response(200)

def get_group(event, context):
    """ Returns either all groups in DB or group related to given id """

    # checks that connection to DB is valid
    if conn is None:
        return connection_error()
    
    # returns full list of groups if not for specific group
    if event.get('queryStringParameters') is None:
        body = { "groups": [] }
        with conn.cursor() as curr:
            curr.execute("select GroupID, GroupName from MemberGroup")
            for row in curr:
                body['groups'].append(row)

    # check call is for specific group via id
    elif event.get('queryStringParameters').get('group_id') is not None:
        group_id = event['queryStringParameters']['group_id']
        body = { }
        with conn.cursor() as curr:
            curr.execute("select GroupID, GroupName from MemberGroup where GroupID={}".format(group_id))
            body = curr.fetchone()
            conn.commit()

    # check call is for specific group via name
    elif event.get('queryStringParameters').get('group_name') is not None:
        group_name = event['queryStringParameters']['group_name']
        body = { }
        with conn.cursor() as curr:
            curr.execute("select GroupID, GroupName from MemberGroup where GroupName=\'{}\'".format(group_name))
            body = curr.fetchone()
            conn.commit()

    return format_response(200, body)