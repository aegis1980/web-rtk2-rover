@echo off
net stop mosquitto
set "WORKING_DIR=%cd%"
c:
cd "c:\program files\mosquitto"
.\mosquitto -v -c %WORKING_DIR%\mosquitto.conf
pause