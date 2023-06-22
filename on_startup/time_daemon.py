# time updates can be handled by a python process -- C++ would be efficient but simplicity over efficiency
# this process will be started by the main process and will run in the background

import time
from datetime import datetime as dt
# s library to send sql commands to the database
import pyodbc


# create a connection to the database
conn = pyodbc.connect(
    'DRIVER={ODBC Driver 17 for SQL Server};'
    'SERVER=tcp:aos-database.database.windows.net,1433;'
    'DATABASE=yourdatabase;'
    'UID=aosadmin;'
    'PWD=AOSpassword!'
    )

cursor = conn.cursor()
cursor.execute("SELECT * FROM users")

results = cursor.fetchall()
for row in results:
    print(row)

cursor.close()
conn.close()