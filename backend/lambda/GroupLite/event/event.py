import json
import pymysql
import os

from datetime import datetime
from misc import *
from request import *

conn = db_connect()

def create_event(event, context):
    """ Creates Event based on details given in the post request """

    outcome, request = check_post("event_title", "event_creator", "event_group", conn=conn, event=event)
    if outcome is False:
        return request

    create_req = '''create table if not exists Event( 
                    EventID int auto_increment NOT NULL,
                    EventTitle varchar(255) NOT NULL, 
                    EventCreator int NOT NULL, EventGroup int NOT NULL, 
                    EventDate datetime, EventLocation varchar(255),
                    foreign key(EventCreator) references Member(MemberID), 
                    foreign key(EventGroup) references MemberGroup(GroupID), 
                    primary key(EventID))'''

    # check for and insert optional values
    insert_cols = "insert into Event(EventTitle, EventCreator, EventGroup"
    insert_vals = ") values(\'{}\', {}, {}".format(request['event_title'], request['event_creator'], request['event_group'])

    if request.get('event_date') is not None:
        insert_cols += ", EventDate"
        insert_vals += ", \'{}\'".format(request['event_date'])

    if request.get('event_location') is not None:
        insert_cols += ", EventLocation"
        insert_vals += ", \'{}\'".format(request['event_location'])

    insert_req = insert_cols + insert_vals + ")"

    return post(create_req, insert_req, conn)

def delete_event(event, context):
    """Deletes given event from DB"""

    outcome, request = check_post('event_id', conn=conn, event=event)
    if outcome is False:
        return request

    return delete('Event', 'EventID = {}'.format(request['event_id']), conn)

def get_event(event, context):
    """ Returns event data from given event id """

    # check connection to DB valid
    if conn is None:
        return connection_error()

    # confirm event_id is passed via query
    if event.get('queryStringParameters') is not None and event.get('queryStringParameters').get('event_id') is not None:
        req = ('select EventID, EventTitle, EventCreator, EventGroup, date_format(EventDate, \'%Y-%m-%d %T\') as EventDate, EventLocation from Event '
        'where EventID = {}'.format(event["queryStringParameters"]["event_id"]))
        response = get(req, conn)
        return response

    return format_response(400)

def get_group_events(event, context):
    """ Returns list of all events in a given group """

    # check connection to DB valid
    if conn is None:
        return connection_error()

    # confirm group_id is passed via query
    if event.get('queryStringParameters') is not None and event.get('queryStringParameters').get('group_id') is not None:
        req = ('select EventID, EventTitle, EventCreator, EventGroup, date_format(EventDate, \'%Y-%m-%d %T\') as EventDate, EventLocation from Event'
        ' where EventGroup = {}'.format(event["queryStringParameters"]["group_id"]))
        response = get(req, conn, 'events')
        return response

    return format_response(400)

def get_users_events(event, context):
    """ Returns list of all events created by a given user """

    # check connection to DB valid
    if conn is None:
        return connection_error()

    # confirm group_id is passed via query
    if event.get('queryStringParameters') is not None and event.get('queryStringParameters').get('user_id') is not None:
        req = 'select EventID, EventTitle, EventCreator, EventGroup, date_format(EventDate, \'%Y-%m-%d %T\') as EventDate, EventLocation from Event where EventCreator = {}'.format(event["queryStringParameters"]["user_id"])
        response = get(req, conn, 'events')
        return response

    return format_response(400)