# time updates can be handled by a python process -- C++ would be efficient but simplicity over efficien>
# this process will be started by the main process and will run in the background

import schedule
from datetime import datetime as dt
# s library to send sql commands to the database
import pyodbc
import time

def request():
        # create a connection to the database
        conn = pyodbc.connect(
        'DRIVER={ODBC Driver 17 for SQL Server};'
        'SERVER=tcp:aos-database.database.windows.net;'
        'DATABASE=AOS_Database;'
        'UID=aosadmin;'
        'PWD=AOSpassword!'
        )
        time = dt.now().strftime('%Y-%m-%d %H:%M:%S')
        cursor = conn.cursor()
        cursor.execute("INSERT INTO time (t) VALUES (?)", time)
        '''
        results = cursor.fetchall()
        for row in results:
                print(row)
        '''

        conn.commit()
        cursor.close()
        conn.close()

schedule.every(1).seconds.do(request)

while True:
        schedule.run_pending()
        