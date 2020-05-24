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
        req = 'select MemberID from Membership where GroupID = \'{}\''.format(event["queryStringParameters"]["group_id"])
        response = get(req, conn)
        return response

    return format_response(400)

def get_user_groups(event, context):
    """ Returns list of all groups a member of """

    # check connection to DB valid
    if conn is None:
        return connection_error()

    # confirm user_id is passed via query
    if event.get('queryStringParameters') is not None and event.get('queryStringParameters').get('user_id') is not None:
        req = 'select m.GroupID, GroupName from Membership m join MemberGroup g on m.GroupID = g.GroupID where MemberID = {}'.format(
            event["queryStringParameters"]["user_id"])
        response = get(req, conn, 'groups')
        return response

    return format_response(400)

def add_membership(event, context):
    """ Adds given user to a given group based on ids in post request """

    outcome, request = check_post('user_id', 'group_id', conn=conn, event=event)
    if outcome is False:
        return request

    create_req = '''create table if not exists Membership ( 
        MemberID int, GroupID int, primary key(MemberID, GroupID),
        foreign key(MemberID) references Member(MemberID),
        foreign key(GroupID) references MemberGroup(GroupID) )
    '''
    insert_req = "insert into Membership(MemberID, GroupID) values({}, {})".format(request.get('user_id'), request.get('group_id'))

    return post(create_req, insert_req, conn)