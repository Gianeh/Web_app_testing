# this is the first file that the server calls on startup
# needed dependecies for time_daemon are installed with following commands
apt-get install pip -y
pip install datetime
pip install schedule
pip install pyodbc
python3 /home/site/wwwroot/on_startup/time_daemon.py