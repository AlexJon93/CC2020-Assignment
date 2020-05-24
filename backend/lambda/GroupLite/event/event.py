import json
import pymysql
import os

from datetime import datetime
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

def create_event(event, context):
    """ Creates Event based on details given in the post request """

    # check connection to DB is valid
    if conn is None:
        return connection_error()

    # check that post not empty
    if event.get('body') is None:
        return format_response(404, {"error":"post request is empty"})
    request = json.loads(event['body'])

    # check that request has required values
    missing_vals = check_missing("event_title", "event_creator", "event_group", request=request)
    if missing_vals is not None:
        return format_response(400, {"errors": missing_vals})

    # check for and insert optional values
    insert_cols = "insert into Event(EventTitle, EventCreator, EventGroup"
    insert_vals = ") values(\'{}\', {}, {}".format(request['event_title'], request['event_creator'], request['event_group'])

    if request.get('event_date') is not None:
        insert_cols += ", EventDate"
        insert_vals += ", \'{}\'".format(request['event_date'])

    if request.get('event_location') is not None:
        insert_cols += ", EventLocation"
        insert_vals += ", \'{}\'".format(request['event_location'])

    insert = insert_cols + insert_vals + ")"

    # run sql commands
    try:
        with conn.cursor() as cur:
            cur.execute(
                "create table if not exists Event( "+
                    "EventID int auto_increment NOT NULL, "+
                    "EventTitle varchar(255) NOT NULL, " +
                    "EventCreator int NOT NULL, " +
                    "EventGroup int NOT NULL, " +
                    "EventDate datetime, " +
                    "EventLocation varchar(255), "+
                    "foreign key(EventCreator) references Member(MemberID), " +
                    "foreign key(EventGroup) references MemberGroup(GroupID), " +
                    "primary key(EventID))"
            )
            cur.execute(insert)
            conn.commit()
    except pymysql.IntegrityError as e:
        print(e)
        return format_response(400, {'error': repr(e)})

    # returns success statuscode if created
    return format_response(200)

def get_event(event, context):
    """ Returns event data from given event id """

    # check connection to DB valid
    if conn is None:
        return connection_error()

    # confirm event_id is passed via query
    if event.get('queryStringParameters') is not None and event.get('queryStringParameters').get('event_id') is not None:
        event_id = event["queryStringParameters"]["event_id"]
        body = { }
        # execute query and if successful return event
        try:
            with conn.cursor() as curr:
                curr.execute('select EventID, EventTitle, EventCreator, EventGroup, EventDate, EventLocation from Event where EventID = {}'.format(event_id))
                event = curr.fetchone()
                event['EventDate'] = str(event['EventDate'])
                body = event
                conn.commit()
                return format_response(200, body) 
        except pymysql.MySQLError as e:
            print(e)
            return format_response(500)
    else:
        return format_response(400)

def get_group_events(event, context):
    """ Returns list of all events in a given group """

    # check connection to DB valid
    if conn is None:
        return connection_error()

    # confirm group_id is passed via query
    if event.get('queryStringParameters') is not None and event.get('queryStringParameters').get('group_id') is not None:
        group_id = event["queryStringParameters"]["group_id"]
        body = { 'group id': group_id, 'events': [] }
        # execute query and if successful return events
        try:
            with conn.cursor() as curr:
                curr.execute('select EventID, EventTitle, EventCreator, EventGroup, EventDate, EventLocation from Event where EventGroup = {}'.format(group_id))
                for row in curr:
                    row['EventDate'] = str(row['EventDate'])
                    body['events'].append(row)
                conn.commit()
                return format_response(200, body) 
        except pymysql.MySQLError as e:
            print(e)
            return format_response(500)
    else:
        return format_response(400)

def get_users_events(event, context):
    """ Returns list of all events created by a given user """

    # check connection to DB valid
    if conn is None:
        return connection_error()

    # confirm group_id is passed via query
    if event.get('queryStringParameters') is not None and event.get('queryStringParameters').get('user_id') is not None:
        user_id = event["queryStringParameters"]["user_id"]
        body = { 'user id': user_id, 'events': [] }
        # execute query and if successful return events
        try:
            with conn.cursor() as curr:
                curr.execute('select EventID, EventTitle, EventCreator, EventGroup, EventDate, EventLocation from Event where EventCreator = {}'.format(user_id))
                for row in curr:
                    row['EventDate'] = str(row['EventDate'])
                    body['events'].append(row)
                conn.commit()
                return format_response(200, body) 
        except pymysql.MySQLError as e:
            print(e)
            return format_response(500)
    else:
        return format_response(400)