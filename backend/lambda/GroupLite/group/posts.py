import json
import pymysql
import os

from datetime import datetime
from misc import *
from request import *

conn = db_connect()

def create_post(event, context):
    """ Creates Post based on details given in the post request """

    outcome, request = check_post("post_content", "post_user", "post_group", conn=conn, event=event)
    if outcome is False:
        return request

    create_req = '''create table if not exists Post( 
                    PostID int auto_increment NOT NULL,
                    PostContent text NOT NULL,
                    PostUser int NOT NULL,
                    PostGroup int NOT NULL,
                    CreatedAt datetime NOT NULL,
                    foreign key(PostUser) references Member(MemberID),
                    foreign key(PostGroup) references MemberGroup(GroupID),
                    primary key(PostID))'''

    insert_req = "insert into Post(PostContent, PostUser, PostGroup, CreatedAt) values(\'{}\', {}, {}, \'{}\')".format(
        request['post_content'], request['post_user'], request['post_group'], datetime.now())

    return post(create_req, insert_req, conn)

def get_users_posts(event, context):
    """ Returns list of all posts made by given user """

    # check connection to DB valid
    if conn is None:
        return connection_error()

    # confirm user_id is passed via query
    if event.get('queryStringParameters') is not None and event.get('queryStringParameters').get('user_id') is not None:
        req = 'select PostID, PostContent, PostUser, PostGroup, date_format(CreatedAt, \'%Y-%m-%d %T.%f\') as CreatedAt from Post where PostUser = {}'.format(event["queryStringParameters"]["user_id"])
        response = get(req, conn, 'posts')
        return response

    return format_response(400)

def get_post(event, context):
    """ Returns post data from given post id """

    # check connection to DB valid
    if conn is None:
        return connection_error()

    # confirm user_id is passed via query
    if event.get('queryStringParameters') is not None and event.get('queryStringParameters').get('post_id') is not None:
        req = 'select PostID, PostContent, PostUser, PostGroup, date_format(CreatedAt, \'%Y-%m-%d %T.%f\') as CreatedAt from Post where PostID = {}'.format(event["queryStringParameters"]["post_id"])
        response = get(req, conn)
        return response

    return format_response(400)

def get_group_posts(event, context):
    """ Returns list of all posts made in given group """

    # check connection to DB valid
    if conn is None:
        return connection_error()

    # confirm user_id is passed via query
    if event.get('queryStringParameters') is not None and event.get('queryStringParameters').get('group_id') is not None:
        req = 'select PostID, PostContent, PostUser, PostGroup, date_format(CreatedAt, \'%Y-%m-%d %T.%f\') as CreatedAt from Post where PostGroup = {}'.format(event["queryStringParameters"]["group_id"])
        response = get(req, conn, 'posts')
        return response

    return format_response(400)