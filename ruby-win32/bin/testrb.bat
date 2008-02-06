@echo off
if not "%~f0" == "~f0" goto WinNT
ruby -Sx C:/LAN/ruby-1.8.6-p111/bin/testrb.bat %1 %2 %3 %4 %5 %6 %7 %8 %9
goto endofruby
:WinNT
"%~d0%~p0ruby" -x "%~f0" %*
goto endofruby
#!/bin/ruby
require 'test/unit'
(r = Test::Unit::AutoRunner.new(true)).process_args(ARGV) or
  abort r.options.banner + " tests..."
exit r.run
__END__
:endofruby
