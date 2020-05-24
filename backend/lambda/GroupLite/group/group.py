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

    create_req = ''' create table if not exists MemberGroup (
        GroupID int auto_increment NOT NULL, 
        GroupName varchar(255) NOT NULL UNIQUE, 
        PRIMARY KEY (GroupID) ) '''

    insert_req = 'insert into MemberGroup (GroupName) values (\'{}\')'.format(request.get('group_name'))

    # returns success statuscode if created
    return post(create_req, insert_req, conn)

def get_group(event, context):
    """ Returns either all groups in DB or group related to given id """

    # checks that connection to DB is valid
    if conn is None:
        return connection_error()
    
    base = "select GroupID, GroupName from MemberGroup"

    # returns full list of groups if not for specific group
    if event.get('queryStringParameters') is None:
        req = base
        response = get(req, conn, 'groups')
        return response

    # check call is for specific group via id
    elif event.get('queryStringParameters').get('group_id') is not None:
        req = base + " where GroupID={}".format(event['queryStringParameters']['group_id'])
        response = get(req, conn)
        return response

    # check call is for specific group via name
    elif event.get('queryStringParameters').get('group_name') is not None:
        req = base + " where GroupName=\'{}\'".format(event['queryStringParameters']['group_name'])
        response = get(req, conn)
        return response

    return format_response(400)

def delete_group(event, context):
    '''Deletes Group from DB'''

    outcome, request = check_post('group_id', conn=conn, event=event)
    if outcome is False:
        return request

    return delete('MemberGroup', 'GroupID = {}'.format(request['group_id']), conn)