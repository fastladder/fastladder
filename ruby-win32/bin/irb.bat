@echo off
if not "%~f0" == "~f0" goto WinNT
ruby -Sx C:/LAN/ruby-1.8.6-p111/bin/irb.bat %1 %2 %3 %4 %5 %6 %7 %8 %9
goto endofruby
:WinNT
"%~d0%~p0ruby" -x "%~f0" %*
goto endofruby
#!/bin/ruby
#
#   irb.rb - intaractive ruby
#   	$Release Version: 0.9.5 $
#   	$Revision: 11708 $
#   	$Date: 2007-02-13 08:01:19 +0900 (Tue, 13 Feb 2007) $
#   	by Keiju ISHITSUKA(keiju@ruby-lang.org)
#

require "irb"

if __FILE__ == $0
  IRB.start(__FILE__)
else
  # check -e option
  if /^-e$/ =~ $0
    IRB.start(__FILE__)
  else
    IRB.setup(__FILE__)
  end
end
__END__
:endofruby
