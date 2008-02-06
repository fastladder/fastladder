@ECHO OFF
IF NOT "%~f0" == "~f0" GOTO :WinNT
@"C:/ruby/bin/ruby.exe" "C:/ruby/bin/sow" %1 %2 %3 %4 %5 %6 %7 %8 %9
GOTO :EOF
:WinNT
"%~dp0ruby.exe" "%~dpn0" %*
