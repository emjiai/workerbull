@echo off
echo Stopping any running Next.js servers...
taskkill /f /im node.exe

echo Clearing Next.js cache...
rmdir /s /q .next

echo Restarting the Next.js server...
npm run dev
