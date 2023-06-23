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
        
'''
/// GLI UPGRADE POTREBBERO AVERE DEI REQUIREMENTS IN UN JSON CHE VIENE CONTROLLATO SIA IN BACKEND CHE IN FRONTEND PER AGGIORNARE
/// I BOTTONI IN REAL TIME DI COLORI DIVERSI SE LE RICHIESTE SONO SODDISFATTE O MENO,
/// IL CLICK DEVE TRIGGERARE DATA INTERFACE E A SUA VOLTA QUESTO DEVE AGGIUNGERE LA ACTION CON I DATI DI DURATA E FINE IN CACHE E DATABASE
/// IL DATO IN CACHE PUò ESSERE USATO PER AGGIORNARE DEI COUNTDOWN IN FRONTEND
/// VA STABILITO IL MECCANISMO DI CANCELLAZIONE DELLA ACTION IN CACHE, IL TIME DAEMON CONTROLLERà ANCHE CON USER OFFLINE OGNI X SECONDI
/// SE CI SONO AZIONI GIà TERMINATE PRIMA CHE IL DAEMON SI ACC0RGA E L'UTENTE è ONLINE L'AGGIORNAMENTO DEVE ESSERE FATTO IN QUEL MOMENTO
/// E LA ACTION RIMOSSA DA CACHE E DATABASE ---> HOW??
'''