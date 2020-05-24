import os
import pymysql

from misc import *

def db_connect():
    """ Attempts to create connection to the DB """

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

    return conn

def check_post(*params, conn, event):
    """ Checks validity of post request """

    # check that connection to db valid
    if conn is None:
        return (False, connection_error())

    # check that post request body is not empty
    if event.get('body') is None:
        return (False, format_response(404, {"error":"post request is empty"}))
    request = json.loads(event['body'])

    # check that post request contains all required values
    missing_params = check_missing(*params, request=request)
    if missing_params is not None:
        return (False, format_response(400, {"errors": missing_params}))

    return (True, request)

def post(create_query, insert_query, conn):
    """Connects to and executes post requests to the DB """

    try:
        with conn.cursor() as cur:
            cur.execute(create_query)
            cur.execute(insert_query)
            conn.commit()
    except pymysql.IntegrityError as e:
        print(e)
        return format_response(400, {'error': repr(e)})
    except (pymysql.MySQLError, Exception) as e:
        print(e)
        return format_response(500)

    return format_response(200)

def get(get_query, conn, multiple=None):
    """Connects to and executes get requests in the DB"""

    try:
        if multiple is not None:
            result = { multiple: [] }
            with conn.cursor() as curr:
                curr.execute(get_query)
                for row in curr:
                    result[multiple].append(row)

        else:
            with conn.cursor() as cur:
                    cur.execute(get_query)
                    result = cur.fetchone()
                    conn.commit()
    except (pymysql.MySQLError, Exception) as e:
        print(e)
        return format_response(500)

    return format_response(200, result)

def delete(table, row_id, conn):
    """Connects to and executes delete requests in the DB"""

    try:
        with conn.cursor() as cur:
            query = 'delete from {} where {}'.format(table, row_id)
            cur.execute(query)
            conn.commit()
    except pymysql.IntegrityError as e:
        print(e)
        return format_response(400, {'error': repr(e)})
    except (pymysql.MySQLError, Exception) as e:
        print(e)
        return format_response(500)

    return format_response(200)