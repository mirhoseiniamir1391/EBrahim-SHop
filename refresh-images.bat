@echo off
cd /d "%~dp0"
py -3 generate_gallery.py
if errorlevel 1 python generate_gallery.py
echo.
pause
