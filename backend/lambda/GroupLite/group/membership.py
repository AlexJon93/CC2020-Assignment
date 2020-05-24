import json
import pymysql
import os

from misc import *
from request import *

conn = db_connect()

def get_group_members(event, context):
    """ Returns list of all members of a given group """

    # check connection to DB valid
    if conn is None:
        return connection_error()
    
    # confirm group_id is passed via query
    if event.get('queryStringParameters') is not None and event.get('queryStringParameters').get('group_id') is not None:
        group_id = event["queryStringParameters"]["group_id"]
        body = { 'group id': group_id, 'members': [] }
        try:
            with conn.cursor() as curr:
                curr.execute('select MemberID from Membership where GroupID = \'{}\''.format(group_id))
                for row in curr:
                    body['members'].append(row)
                conn.commit()
                return format_response(200, body) 
        except pymysql.MySQLError as e:
            print(e)
            return format_response(500)
    else:
        return format_response(400)

def get_user_groups(event, context):
    """ Returns list of all groups a member of """

    # check connection to DB valid
    if conn is None:
        return connection_error()

    # confirm user_id is passed via query
    if event.get('queryStringParameters') is not None and event.get('queryStringParameters').get('user_id') is not None:
        user_id = event["queryStringParameters"]["user_id"]
        body = { 'user id': user_id, 'groups': [] }
        try:
            with conn.cursor() as curr:
                curr.execute('select GroupID from Membership where MemberID = \'{}\''.format(user_id))
                for row in curr:
                    body['groups'].append(row)
                conn.commit()
                return format_response(200, body) 
        except pymysql.MySQLError as e:
            print(e)
            return format_response(500)
    else:
        return format_response(400)

def add_membership(event, context):
    """ Adds given user to a given group based on ids in post request """

    outcome, request = check_post('user_id', 'group_id', conn=conn, event=event)
    if outcome is False:
        return request

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

    return format_response(200)