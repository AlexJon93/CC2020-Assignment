import json
import pymysql
import os

from datetime import datetime
from misc import *
from request import *

conn = db_connect()

def add_attendance(event, context):
    """ Creates Attendance based on details given in the post request """

    outcome, request = check_post("event_id", "event_attendee", conn=conn, event=event)
    if outcome is False:
        return request

    create_req = '''create table if not exists Attending(
                    EventID int NOT NULL, AttendeeID int NOT NULL, 
                    primary key(EventID, AttendeeID), 
                    foreign key(EventID) references Event(EventID), 
                    foreign key(AttendeeID) references Member(MemberID))'''

    insert_req = "insert into Attending(EventID, AttendeeID) values({}, {})".format(request['event_id'], request['event_attendee'])

    return post(create_req, insert_req, conn)

def get_attending(event, context):
    """ Returns list of all events a user is attending """

    # check connection to DB valid
    if conn is None:
        return connection_error()

    # confirm user_id is passed via query
    if event.get('queryStringParameters') is not None and event.get('queryStringParameters').get('user_id') is not None:
        req = 'select EventID from Attending where AttendeeID = {}'.format(event["queryStringParameters"]["user_id"])
        response = get(req, conn, 'events')
        return response

    return format_response(400)

def get_event_attendees(event, context):
    """ Returns list of all users attending a given event """

    # check connection to DB valid
    if conn is None:
        return connection_error()

    # confirm user_id is passed via query
    if event.get('queryStringParameters') is not None and event.get('queryStringParameters').get('event_id') is not None:
        req = 'select AttendeeID from Attending where EventID = {}'.format(event["queryStringParameters"]["event_id"])
        response = get(req, conn, 'attendees')
        return response

    return format_response(400)