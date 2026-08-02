@echo off
title LIYA AI Assistant Launcher
color 0A
setlocal enabledelayedexpansion

echo ========================================================
echo               LIYA AI ASSISTANT LAUNCHER
echo ========================================================
echo.

set "ROOT_DIR=%~dp0"
if "%ROOT_DIR:~-1%"=="\" set "ROOT_DIR=%ROOT_DIR:~0,-1%"

:: 1. Check & Copy .env file if missing
if not exist "%ROOT_DIR%\.env" (
    if exist "%ROOT_DIR%\.env.example" (
        echo [INFO] .env missing. Creating .env from .env.example...
        copy "%ROOT_DIR%\.env.example" "%ROOT_DIR%\.env" >nul
    )
)

:: 2. Check & Auto-Install Root Frontend Dependencies
if not exist "%ROOT_DIR%\node_modules" (
    echo [SETUP] Installing Frontend Dependencies (npm install)...
    cd /d "%ROOT_DIR%"
    call npm install
    echo.
)

:: 3. Check & Auto-Install Backend Dependencies
if not exist "%ROOT_DIR%\backend\node_modules" (
    echo [SETUP] Installing Backend Dependencies (npm install in backend)...
    cd /d "%ROOT_DIR%\backend"
    call npm install
    echo.
)

:: 4. Start Servers
echo [1/3] Starting LIYA Backend Server...
start "LIYA Backend Server" /min cmd /k "cd /d "%ROOT_DIR%\backend" && npm run dev"

echo [2/3] Starting LIYA Frontend Server...
start "LIYA Frontend Server" /min cmd /k "cd /d "%ROOT_DIR%" && npm run dev"

echo [3/3] Waiting for servers to initialize...
timeout /t 5 /nobreak >nul

echo.
echo Opening LIYA AI Assistant in your default browser...
start http://localhost:5173

echo.
echo ========================================================
echo   LIYA AI Assistant is now running successfully!
echo   Browser opened: http://localhost:5173
echo ========================================================
echo.
echo Note: Do not close the minimized server windows while using the application.
echo.
pause
