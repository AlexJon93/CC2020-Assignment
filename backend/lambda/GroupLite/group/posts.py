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

def create_post(event, context):
    """ Creates Post based on details given in the post request """

    # check connection to DB is valid
    if conn is None:
        return connection_error()

    # check that post not empty
    if event.get('body') is None:
        return format_response(404, {"error":"post request is empty"})
    request = json.loads(event['body'])

    # check that request has required values
    missing_vals = check_missing("post_content", "post_user", "post_group", request=request)
    if missing_vals is not None:
        return format_response(400, {"errors": missing_vals})

    try:
        with conn.cursor() as cur:
            cur.execute(
                "create table if not exists Post( "+
                    "PostID int auto_increment NOT NULL, "+
                    "PostContent text NOT NULL," +
                    "PostUser int NOT NULL," +
                    "PostGroup int NOT NULL," +
                    "CreatedAt datetime NOT NULL," +
                    "foreign key(PostUser) references Member(MemberID)," +
                    "foreign key(PostGroup) references MemberGroup(GroupID)," +
                    "primary key(PostID))"
            )
            cur.execute("insert into Post(PostContent, PostUser, PostGroup, CreatedAt) "+
                "values(\'{}\', {}, {}, \'{}\')".format(request['post_content'], request['post_user'], request['post_group'], datetime.now()))
            conn.commit()
    except pymysql.IntegrityError as e:
        print(e)
        return format_response(400, {'error': repr(e)})

    # returns success statuscode if created
    return format_response(200)

def get_users_posts(event, context):
    """ Returns list of all posts made by given user """

    # check connection to DB valid
    if conn is None:
        return connection_error()

    # confirm user_id is passed via query
    if event.get('queryStringParameters') is not None and event.get('queryStringParameters').get('user_id') is not None:
        user_id = event["queryStringParameters"]["user_id"]
        body = { 'user id': user_id, 'posts': [] }
        try:
            with conn.cursor() as curr:
                curr.execute('select PostID, PostContent, PostUser, PostGroup, CreatedAt from Post where PostUser = {}'.format(user_id))
                for row in curr:
                    row['CreatedAt'] = str(row['CreatedAt'])
                    body['posts'].append(row)
                conn.commit()
                return format_response(200, body) 
        except pymysql.MySQLError as e:
            print(e)
            return format_response(500)
    else:
        return format_response(400)

def get_post(event, context):
    """ Returns post data from given post id """

    # check connection to DB valid
    if conn is None:
        return connection_error()

    # confirm user_id is passed via query
    if event.get('queryStringParameters') is not None and event.get('queryStringParameters').get('post_id') is not None:
        post_id = event["queryStringParameters"]["post_id"]
        body = { }
        try:
            with conn.cursor() as curr:
                curr.execute('select PostID, PostContent, PostUser, PostGroup, CreatedAt from Post where PostID = {}'.format(post_id))
                post = curr.fetchone()
                post['CreatedAt'] = str(post['CreatedAt'])
                body = post
                conn.commit()
                return format_response(200, body) 
        except pymysql.MySQLError as e:
            print(e)
            return format_response(500)
    else:
        return format_response(400)

def get_group_posts(event, context):
    """ Returns list of all posts made in given group """

    # check connection to DB valid
    if conn is None:
        return connection_error()

    # confirm user_id is passed via query
    if event.get('queryStringParameters') is not None and event.get('queryStringParameters').get('group_id') is not None:
        group_id = event["queryStringParameters"]["group_id"]
        body = { 'group id': group_id, 'posts': [] }
        try:
            with conn.cursor() as curr:
                curr.execute('select PostID, PostContent, PostUser, PostGroup, CreatedAt from Post where PostGroup = {}'.format(group_id))
                for row in curr:
                    row['CreatedAt'] = str(row['CreatedAt'])
                    body['posts'].append(row)
                conn.commit()
                return format_response(200, body) 
        except pymysql.MySQLError as e:
            print(e)
            return format_response(500)
    else:
        return format_response(400)