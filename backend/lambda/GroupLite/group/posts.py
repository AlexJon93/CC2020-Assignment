import json
import pymysql
import os
import base64

from datetime import datetime
from misc import *
from request import *

conn = db_connect()

def create_post(event, context):
    """ Creates Post based on details given in the post request """

    outcome, request = check_post("post_content", "post_user", "post_group", conn=conn, event=event)
    if outcome is False:
        return request

    insert_req = "insert into Post(PostContent, PostUser, PostGroup, CreatedAt) values(\'{}\', {}, {}, \'{}\')".format(
        request['post_content'], request['post_user'], request['post_group'], datetime.now())

    if request.get('image') is not None:
        image_id = handle_image(request['image'], request['post_user'])
        insert_req = "insert into Post(PostContent, PostUser, PostGroup, CreatedAt, ImageID) values(\'{}\', {}, {}, \'{}\', \'{}\')".format(
                        request['post_content'], request['post_user'], request['post_group'], datetime.now(), image_id)

    create_req = '''create table if not exists Post( 
                    PostID int auto_increment NOT NULL,
                    PostContent text NOT NULL,
                    PostUser int NOT NULL,
                    PostGroup int NOT NULL,
                    CreatedAt datetime NOT NULL,
                    ImageID varchar(255),
                    foreign key(PostUser) references Member(MemberID),
                    foreign key(PostGroup) references MemberGroup(GroupID),
                    primary key(PostID))'''

    return post(create_req, insert_req, conn)


def delete_post(event, context):
    """ Deletes given post from DB """

    outcome, request = check_post('post_id', conn=conn, event=event)
    if outcome is False:
        return request

    return delete('Post', 'PostID = {}'.format(request['post_id']), conn)

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

def get_image(event, context):
    """Return Base64 encoded image"""

    if event.get('queryStringParameters') is not None and event.get('queryStringParameters').get('image_id') is not None:
        response = down_image(event['queryStringParameters']['image_id'])
        data = base64.b64encode(response)
        image = data.decode('utf-8')
        return format_response(200, {"image": image})

    return format_response(400)