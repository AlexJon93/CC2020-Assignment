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

    try:
        with conn.cursor() as cur:
            cur.execute(
                "create table if not exists Attending( "+
                    "EventID int NOT NULL, "+
                    "AttendeeID int NOT NULL, " +
                    "primary key(EventID, AttendeeID), "
                    "foreign key(EventID) references Event(EventID), " +
                    "foreign key(AttendeeID) references Member(MemberID))"
            )
            cur.execute("insert into Attending(EventID, AttendeeID) values({}, {})".format(request['event_id'], request['event_attendee']))
            conn.commit()
    except pymysql.IntegrityError as e:
        print(e)
        return format_response(400, {'error': repr(e)})

    # returns success statuscode if created
    return format_response(200)

def get_attending(event, context):
    """ Returns list of all events a user is attending """

    # check connection to DB valid
    if conn is None:
        return connection_error()

    # confirm user_id is passed via query
    if event.get('queryStringParameters') is not None and event.get('queryStringParameters').get('user_id') is not None:
        user_id = event["queryStringParameters"]["user_id"]
        body = { 'user id': user_id, 'events': [] }
        try:
            with conn.cursor() as curr:
                curr.execute('select EventID from Attending where AttendeeID = {}'.format(user_id))
                for row in curr:
                    body['events'].append(row)
                conn.commit()
                return format_response(200, body) 
        except pymysql.MySQLError as e:
            print(e)
            return format_response(500)
    else:
        return format_response(400)

def get_event_attendees(event, context):
    """ Returns list of all users attending a given event """

    # check connection to DB valid
    if conn is None:
        return connection_error()

    # confirm user_id is passed via query
    if event.get('queryStringParameters') is not None and event.get('queryStringParameters').get('event_id') is not None:
        event_id = event["queryStringParameters"]["event_id"]
        body = { 'event id': event_id, 'attendees': [] }
        try:
            with conn.cursor() as curr:
                curr.execute('select AttendeeID from Attending where EventID = {}'.format(event_id))
                for row in curr:
                    body['attendees'].append(row)
                conn.commit()
                return format_response(200, body) 
        except pymysql.MySQLError as e:
            print(e)
            return format_response(500)
    else:
        return format_response(400)