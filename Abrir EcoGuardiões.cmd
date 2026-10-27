@echo off
setlocal
cd /d "%~dp0"

echo ========================================================
echo   Iniciando EcoGuardioes (Plataforma ODS 4, 6, 7 e 13)
echo ========================================================
echo Mantenha esta janela aberta enquanto estiver navegando.
node serve.js
pause
