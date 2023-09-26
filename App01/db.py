import re

import pymysql
import logging
import ssl
logger = logging.getLogger(__name__)


def connect(ip, port, database, username, password):
    try:
        port = int(port)
        ctx = ssl.create_default_context()
        ctx.check_hostname = False
        ctx.verify_mode = ssl.VerifyMode.CERT_NONE
        db = pymysql.connect(host=ip,
                             user=username,
                             password=password,
                             database=database,
                             port=port,
                             charset='utf8',
                             ssl=ctx)
        logger.info("Created database connection to " + str(database))
        return db
    except Exception as e:
        logger.error("Failed to create database connection, reason: " + str(e))
        return None


def disconnect(connection):
    logger.info("Closing database connection...")

    try:
        logger.info("Database connection closed.")
        connection.close()
    except Exception as e:
        logger.error("Failed to close database connection.")


def check_insert_privileges(ip, port, database, username, password):
    logger.info("Checking privileges for connection...")
    db = connect(ip, port, database, username, password)
    result = {'success': False, 'msg': ''}

    if db is None:
        result['msg'] = "Failed to create connection to database, please check if credentials are correct."
        return result

    try:
        cursor = db.cursor()
        cursor.execute('SHOW GRANTS FOR CURRENT_USER')
        privileges = str(cursor.fetchall())
        logger.info('User privileges: ', privileges)
        cursor.close()
        if re.search('ALL|CREATE|DROP|EXECUTE|UPDATE|ROUTINE|EVENT|TRIGGER', privileges) is not None:
            result['msg'] = "User account has too many privileges. Warn user and try to make a new account?"
            return result
        elif re.search('INSERT', privileges) is None:
            result['msg'] = "Insufficient privileges for this MySQL account. " \
                         "Please ask your database administrator to add 'INSERT' privilege to your account."
            return result
        else:
            result['success'] = True
            result['msg'] = "Successfully connected. User account has correct privileges."

    except Exception as e:
        logger.error(e)
    finally:
        return result


def check_root_privileges(ip, port, database, username, password):
    logger.info("Checking privileges for connection...")
    db = connect(ip, port, database, username, password)
    result = {'success': False, 'msg': ''}

    if db is None:
        result['msg'] = "Failed to create connection to database, please check if credentials are correct."
        return result

    try:
        cursor = db.cursor()
        cursor.execute('SHOW GRANTS FOR CURRENT_USER')
        privileges = str(cursor.fetchall())
        logger.info('User privileges: ', privileges)
        cursor.close()

        if re.search('ALL', privileges) is not None:
            result['success'] = True
            result['msg'] = "Successfully connected. User account has correct privileges."
        elif re.search("CREATE", privileges) is not None\
                and re.search("INSERT", privileges) is not None\
                and re.search("CREATE USER", privileges) is not None\
                and re.search("RELOAD", privileges) is not None\
                and re.search("GRANT", privileges) is not None:
            result['success'] = True
            result['msg'] = "Successfully connected. User account has correct privileges."
        else:
            result['success'] = False
            result['msg'] = "Insufficient privileges for this MySQL account. " \
                         "Please use a root account or ask your database administrator" \
                         " to add 'ALL' privilege to your account."

        disconnect(db)
    except Exception as e:
        logger.error(e)
    finally:
        return result


def read_sql_file(path):
    with open(path, "r") as sql_file:
        ret = sql_file.read().split(';')
        ret.pop()
        return ret


def batchSqlExecute(cursor, sql_queries):
    for each in sql_queries.split(";"):
        cursor.execute(each + ";")


def init_database(ip, port, database, root_username, root_password, insert_username, insert_password, require_ssl):
    res = check_root_privileges(ip, port, database, root_username, root_password)
    if not res['success']:
        return res

    db = connect(ip, port, database, root_username, root_password)
    try:
        db_init_sql = read_sql_file('App01/db-init.sql')
        cursor = db.cursor()
        for each in db_init_sql:
            cursor.execute(each + ';')
        cursor.close()
        logger.info("Initialized database")
    except Exception as e:
        res['success'] = False
        res['msg'] = "Failed to initialize database, reason: " + str(e)
        logger.error(res['msg'])
        return res

    try:
        if require_ssl:
            createUserSql = """
                CREATE USER IF NOT EXISTS '{insertUsername}'@'localhost' IDENTIFIED BY '{insertPassword}';
                CREATE USER IF NOT EXISTS '{insertUsername}'@'%' IDENTIFIED BY '{insertPassword}';
                GRANT INSERT ON {database}.* TO '{insertUsername}'@'localhost';
                GRANT INSERT ON {database}.* TO '{insertUsername}'@'%';
                ALTER USER '{insertUsername}'@'%' REQUIRE SSL;
             flush privileges;"""\
                .format(insertUsername=insert_username, insertPassword=insert_password, database=database)
        else:
            createUserSql = """
                CREATE USER IF NOT EXISTS '{insertUsername}'@'localhost' IDENTIFIED BY '{insertPassword}';
                CREATE USER IF NOT EXISTS '{insertUsername}'@'%' IDENTIFIED BY '{insertPassword}';
                GRANT INSERT ON {database}.* TO '{insertUsername}'@'localhost';
                GRANT INSERT ON {database}.* TO '{insertUsername}'@'%';
                flush privileges;""" \
                .format(insertUsername=insert_username, insertPassword=insert_password, database=database)
        logger.info(createUserSql)

        cursor = db.cursor()
        for each in createUserSql.split(";"):
            if each == "":
                continue
            cursor.execute(each + ";")
        cursor.close()
        logger.info("Created INSERT-only user")
    except Exception as e:
        res['success'] = False
        res['msg'] = "Failed to create INSERT-only user, reason: " + str(e)
        logger.error(res['msg'])
        return res

    disconnect(db)
    return res
