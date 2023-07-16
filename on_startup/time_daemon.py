# time updates can be handled by a python process -- C++ would be efficient but simplicity over efficiency
# this process will be started by the main process and will run in the background

import schedule
from datetime import datetime as dt
# s library to send sql commands to the database
import pyodbc
import time

# define a global connection to the database
def connect():
        CONNECTION = pyodbc.connect(
        'DRIVER={ODBC Driver 17 for SQL Server};'
        'SERVER=tcp:ageofstronghold.database.windows.net;'
        'DATABASE=AgeofStronghold-database;'
        'UID=AOSAdmin;'
        'PWD=AOSPassword!'
        )
        return CONNECTION


def build_select_query(table, column, condition = ""):
        query = "SELECT " + column + " FROM " + table + " WHERE " + condition
        return query

def build_insert_query(table, column, value):
        query = "INSERT INTO " + table + " (" + column + ") VALUES (" + value + ")"
        return query

def build_update_query(table, columns, values, condition):
        query = "UPDATE " + table + " SET "
        for i in range(len(columns)):
                query += columns[i] + " = " + values[i] + ", "
        query = query[:-2]
        query += " WHERE " + condition
        return query

def build_delete_query(table, condition):
        query = "DELETE FROM " + table + " WHERE " + condition
        return query

def request(query):

        cursor = connect().cursor()
        cursor.execute(query)

        # if query includes a select statement, return the result
        if query[:6] == "SELECT":
                result = cursor.fetchall()
                cursor.close()
                CONNECTION.commit()
                CONNECTION.close()
                return result

        CONNECTION.commit()
        cursor.close()
        CONNECTION.close()

def update_upgrade_events():
        # this function should query the database for every upgrade event of every user (user_id) and check if completion is due
        # if so it should update the structures table accordingly using level field in the events table
        query = build_select_query("events", "*", "event_type = 'upgrade'")

def update_resource_events():
        # this function should query the database for every resource event of every user (user_id) and check if completion is due
        # if so it should update the resources table accordingly using ammount field in the requirements json file

def update_training_events():
        # this function should query the database for every training event of every user (user_id) and check if completion is due
        # if so it should update the troops table accordingly using the event_type field in the events table and adding 1 to the corresponding troop type
schedule.every(1).seconds.do(request)

while True:
        schedule.run_pending()
        
        time.sleep(1)