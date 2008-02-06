
SHELL = /bin/sh

#### Start of system configuration section. ####

srcdir = .
topdir = C:/ruby/lib/ruby/1.8/i386-mswin32
hdrdir = $(topdir)
VPATH = $(srcdir);$(topdir);$(hdrdir)

DESTDIR = C:
prefix = $(DESTDIR)/ruby
exec_prefix = $(prefix)
sitedir = $(prefix)/lib/ruby/site_ruby
rubylibdir = $(libdir)/ruby/$(ruby_version)
archdir = $(rubylibdir)/$(arch)
sbindir = $(exec_prefix)/sbin
datadir = $(prefix)/share
includedir = $(prefix)/include
infodir = $(prefix)/info
sysconfdir = $(prefix)/etc
mandir = $(prefix)/man
libdir = $(exec_prefix)/lib
sharedstatedir = $(DESTDIR)/etc
oldincludedir = $(DESTDIR)/usr/include
sitearchdir = $(sitelibdir)/$(sitearch)
localstatedir = $(DESTDIR)/var
bindir = $(exec_prefix)/bin
sitelibdir = $(sitedir)/$(ruby_version)
libexecdir = $(exec_prefix)/libexec

CC = cl -nologo
LIBRUBY = $(RUBY_SO_NAME).lib
LIBRUBY_A = $(RUBY_SO_NAME)-static.lib
LIBRUBYARG_SHARED = $(LIBRUBY)
LIBRUBYARG_STATIC = $(LIBRUBY_A)

RUBY_EXTCONF_H = 
CFLAGS= /Ox /EHsc /MT /W3 /nologo /TC
INCFLAGS = -I. -IC:/ruby/lib/ruby/1.8/i386-mswin32
CPPFLAGS = /D "HAVE_FREEIMAGE_H" /D "WIN32" /D "_WINDOWS" /D "_MBCS"
CXXFLAGS = $(CFLAGS) 
DLDFLAGS =  -link -incremental:no -opt:ref -opt:icf -dll $(LIBPATH) -def:$(DEFFILE) -implib:$(*F:.so=)-$(arch).lib -pdb:$(*F:.so=)-$(arch).pdb 
LDSHARED = cl -nologo -LD
AR = lib -nologo
EXEEXT = .exe

RUBY_INSTALL_NAME = ruby
RUBY_SO_NAME = msvcrt-ruby18
arch = i386-mswin32
sitearch = i386-msvcrt
ruby_version = 1.8
ruby = C:/ruby/bin/ruby
RUBY = $(ruby:/=\)
RM = $(RUBY) -run -e rm -- -f
MAKEDIRS = @$(RUBY) -run -e mkdir -- -p
INSTALL = @$(RUBY) -run -e install -- -vp
INSTALL_PROG = $(INSTALL) -m 0755
INSTALL_DATA = $(INSTALL) -m 0644
COPY = copy > nul

#### End of system configuration section. ####

preload = 

libpath = . $(libdir)
LIBPATH =  -libpath:"." -libpath:"$(libdir)"
DEFFILE = $(TARGET)-$(arch).def

CLEANFILES = mkmf.log
DISTCLEANFILES = vc*.pdb $(DEFFILE)

extout = 
extout_prefix = 
target_prefix = 
LOCAL_LIBS = 
LIBS = $(LIBRUBYARG_SHARED) freeimage.lib  oldnames.lib user32.lib advapi32.lib ws2_32.lib  
SRCS = image_utils.c
OBJS = image_utils.obj
TARGET = image_utils
DLLIB = $(TARGET).so
EXTSTATIC = 
STATIC_LIB = 

RUBYCOMMONDIR = $(sitedir)$(target_prefix)
RUBYLIBDIR    = $(sitelibdir)$(target_prefix)
RUBYARCHDIR   = $(sitearchdir)$(target_prefix)

TARGET_SO     = $(DLLIB)
CLEANLIBS     = $(TARGET).so $(TARGET).il? $(TARGET).tds $(TARGET).map
CLEANOBJS     = *.obj *.lib *.s[ol] *.pdb *.exp *.bak

all:		$(DLLIB)
static:		$(STATIC_LIB)

clean:
		@-$(RM) $(CLEANLIBS:/=\) $(CLEANOBJS:/=\) $(CLEANFILES:/=\)

distclean:	clean
		@-$(RM) Makefile $(RUBY_EXTCONF_H) conftest.* mkmf.log
		@-$(RM) core ruby$(EXEEXT) *~ $(DISTCLEANFILES:/=\)

realclean:	distclean
install: install-so install-rb

install-so: $(RUBYARCHDIR)
install-so: $(RUBYARCHDIR)/$(DLLIB)
$(RUBYARCHDIR)/$(DLLIB): $(DLLIB)
	$(INSTALL_PROG) $(DLLIB:/=\) $(RUBYARCHDIR:/=\)
install-rb: pre-install-rb install-rb-default
install-rb-default: pre-install-rb-default
pre-install-rb: Makefile
pre-install-rb-default: Makefile
pre-install-rb-default: $(RUBYLIBDIR)/ruby/1.8
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/abbrev.rb
$(RUBYLIBDIR)/ruby/1.8/abbrev.rb: $(srcdir)/lib/ruby/1.8/abbrev.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\abbrev.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/base64.rb
$(RUBYLIBDIR)/ruby/1.8/base64.rb: $(srcdir)/lib/ruby/1.8/base64.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\base64.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/benchmark.rb
$(RUBYLIBDIR)/ruby/1.8/benchmark.rb: $(srcdir)/lib/ruby/1.8/benchmark.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\benchmark.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/cgi-lib.rb
$(RUBYLIBDIR)/ruby/1.8/cgi-lib.rb: $(srcdir)/lib/ruby/1.8/cgi-lib.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\cgi-lib.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/cgi.rb
$(RUBYLIBDIR)/ruby/1.8/cgi.rb: $(srcdir)/lib/ruby/1.8/cgi.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\cgi.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/complex.rb
$(RUBYLIBDIR)/ruby/1.8/complex.rb: $(srcdir)/lib/ruby/1.8/complex.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\complex.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/csv.rb
$(RUBYLIBDIR)/ruby/1.8/csv.rb: $(srcdir)/lib/ruby/1.8/csv.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\csv.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/date.rb
$(RUBYLIBDIR)/ruby/1.8/date.rb: $(srcdir)/lib/ruby/1.8/date.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\date.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/date2.rb
$(RUBYLIBDIR)/ruby/1.8/date2.rb: $(srcdir)/lib/ruby/1.8/date2.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\date2.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/debug.rb
$(RUBYLIBDIR)/ruby/1.8/debug.rb: $(srcdir)/lib/ruby/1.8/debug.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\debug.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/delegate.rb
$(RUBYLIBDIR)/ruby/1.8/delegate.rb: $(srcdir)/lib/ruby/1.8/delegate.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\delegate.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/digest.rb
$(RUBYLIBDIR)/ruby/1.8/digest.rb: $(srcdir)/lib/ruby/1.8/digest.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\digest.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/drb.rb
$(RUBYLIBDIR)/ruby/1.8/drb.rb: $(srcdir)/lib/ruby/1.8/drb.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\drb.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/e2mmap.rb
$(RUBYLIBDIR)/ruby/1.8/e2mmap.rb: $(srcdir)/lib/ruby/1.8/e2mmap.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\e2mmap.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/English.rb
$(RUBYLIBDIR)/ruby/1.8/English.rb: $(srcdir)/lib/ruby/1.8/English.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\English.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/Env.rb
$(RUBYLIBDIR)/ruby/1.8/Env.rb: $(srcdir)/lib/ruby/1.8/Env.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\Env.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/erb.rb
$(RUBYLIBDIR)/ruby/1.8/erb.rb: $(srcdir)/lib/ruby/1.8/erb.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\erb.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/eregex.rb
$(RUBYLIBDIR)/ruby/1.8/eregex.rb: $(srcdir)/lib/ruby/1.8/eregex.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\eregex.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/fileutils.rb
$(RUBYLIBDIR)/ruby/1.8/fileutils.rb: $(srcdir)/lib/ruby/1.8/fileutils.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\fileutils.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/finalize.rb
$(RUBYLIBDIR)/ruby/1.8/finalize.rb: $(srcdir)/lib/ruby/1.8/finalize.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\finalize.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/find.rb
$(RUBYLIBDIR)/ruby/1.8/find.rb: $(srcdir)/lib/ruby/1.8/find.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\find.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/forwardable.rb
$(RUBYLIBDIR)/ruby/1.8/forwardable.rb: $(srcdir)/lib/ruby/1.8/forwardable.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\forwardable.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/ftools.rb
$(RUBYLIBDIR)/ruby/1.8/ftools.rb: $(srcdir)/lib/ruby/1.8/ftools.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\ftools.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/generator.rb
$(RUBYLIBDIR)/ruby/1.8/generator.rb: $(srcdir)/lib/ruby/1.8/generator.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\generator.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/getoptlong.rb
$(RUBYLIBDIR)/ruby/1.8/getoptlong.rb: $(srcdir)/lib/ruby/1.8/getoptlong.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\getoptlong.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/getopts.rb
$(RUBYLIBDIR)/ruby/1.8/getopts.rb: $(srcdir)/lib/ruby/1.8/getopts.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\getopts.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/gserver.rb
$(RUBYLIBDIR)/ruby/1.8/gserver.rb: $(srcdir)/lib/ruby/1.8/gserver.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\gserver.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/importenv.rb
$(RUBYLIBDIR)/ruby/1.8/importenv.rb: $(srcdir)/lib/ruby/1.8/importenv.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\importenv.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/ipaddr.rb
$(RUBYLIBDIR)/ruby/1.8/ipaddr.rb: $(srcdir)/lib/ruby/1.8/ipaddr.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\ipaddr.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/irb.rb
$(RUBYLIBDIR)/ruby/1.8/irb.rb: $(srcdir)/lib/ruby/1.8/irb.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\irb.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/jcode.rb
$(RUBYLIBDIR)/ruby/1.8/jcode.rb: $(srcdir)/lib/ruby/1.8/jcode.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\jcode.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/kconv.rb
$(RUBYLIBDIR)/ruby/1.8/kconv.rb: $(srcdir)/lib/ruby/1.8/kconv.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\kconv.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/logger.rb
$(RUBYLIBDIR)/ruby/1.8/logger.rb: $(srcdir)/lib/ruby/1.8/logger.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\logger.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/mailread.rb
$(RUBYLIBDIR)/ruby/1.8/mailread.rb: $(srcdir)/lib/ruby/1.8/mailread.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\mailread.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/mathn.rb
$(RUBYLIBDIR)/ruby/1.8/mathn.rb: $(srcdir)/lib/ruby/1.8/mathn.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\mathn.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/matrix.rb
$(RUBYLIBDIR)/ruby/1.8/matrix.rb: $(srcdir)/lib/ruby/1.8/matrix.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\matrix.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/md5.rb
$(RUBYLIBDIR)/ruby/1.8/md5.rb: $(srcdir)/lib/ruby/1.8/md5.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\md5.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/mkmf.rb
$(RUBYLIBDIR)/ruby/1.8/mkmf.rb: $(srcdir)/lib/ruby/1.8/mkmf.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\mkmf.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/monitor.rb
$(RUBYLIBDIR)/ruby/1.8/monitor.rb: $(srcdir)/lib/ruby/1.8/monitor.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\monitor.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/multi-tk.rb
$(RUBYLIBDIR)/ruby/1.8/multi-tk.rb: $(srcdir)/lib/ruby/1.8/multi-tk.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\multi-tk.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/mutex_m.rb
$(RUBYLIBDIR)/ruby/1.8/mutex_m.rb: $(srcdir)/lib/ruby/1.8/mutex_m.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\mutex_m.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/observer.rb
$(RUBYLIBDIR)/ruby/1.8/observer.rb: $(srcdir)/lib/ruby/1.8/observer.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\observer.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/open-uri.rb
$(RUBYLIBDIR)/ruby/1.8/open-uri.rb: $(srcdir)/lib/ruby/1.8/open-uri.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\open-uri.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/open3.rb
$(RUBYLIBDIR)/ruby/1.8/open3.rb: $(srcdir)/lib/ruby/1.8/open3.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\open3.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/openssl.rb
$(RUBYLIBDIR)/ruby/1.8/openssl.rb: $(srcdir)/lib/ruby/1.8/openssl.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\openssl.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/optparse.rb
$(RUBYLIBDIR)/ruby/1.8/optparse.rb: $(srcdir)/lib/ruby/1.8/optparse.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\optparse.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/ostruct.rb
$(RUBYLIBDIR)/ruby/1.8/ostruct.rb: $(srcdir)/lib/ruby/1.8/ostruct.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\ostruct.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/parsearg.rb
$(RUBYLIBDIR)/ruby/1.8/parsearg.rb: $(srcdir)/lib/ruby/1.8/parsearg.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\parsearg.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/parsedate.rb
$(RUBYLIBDIR)/ruby/1.8/parsedate.rb: $(srcdir)/lib/ruby/1.8/parsedate.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\parsedate.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/pathname.rb
$(RUBYLIBDIR)/ruby/1.8/pathname.rb: $(srcdir)/lib/ruby/1.8/pathname.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\pathname.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/ping.rb
$(RUBYLIBDIR)/ruby/1.8/ping.rb: $(srcdir)/lib/ruby/1.8/ping.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\ping.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/pp.rb
$(RUBYLIBDIR)/ruby/1.8/pp.rb: $(srcdir)/lib/ruby/1.8/pp.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\pp.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/prettyprint.rb
$(RUBYLIBDIR)/ruby/1.8/prettyprint.rb: $(srcdir)/lib/ruby/1.8/prettyprint.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\prettyprint.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/profile.rb
$(RUBYLIBDIR)/ruby/1.8/profile.rb: $(srcdir)/lib/ruby/1.8/profile.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\profile.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/profiler.rb
$(RUBYLIBDIR)/ruby/1.8/profiler.rb: $(srcdir)/lib/ruby/1.8/profiler.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\profiler.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/pstore.rb
$(RUBYLIBDIR)/ruby/1.8/pstore.rb: $(srcdir)/lib/ruby/1.8/pstore.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\pstore.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/rational.rb
$(RUBYLIBDIR)/ruby/1.8/rational.rb: $(srcdir)/lib/ruby/1.8/rational.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\rational.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/readbytes.rb
$(RUBYLIBDIR)/ruby/1.8/readbytes.rb: $(srcdir)/lib/ruby/1.8/readbytes.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\readbytes.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/remote-tk.rb
$(RUBYLIBDIR)/ruby/1.8/remote-tk.rb: $(srcdir)/lib/ruby/1.8/remote-tk.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\remote-tk.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/resolv-replace.rb
$(RUBYLIBDIR)/ruby/1.8/resolv-replace.rb: $(srcdir)/lib/ruby/1.8/resolv-replace.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\resolv-replace.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/resolv.rb
$(RUBYLIBDIR)/ruby/1.8/resolv.rb: $(srcdir)/lib/ruby/1.8/resolv.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\resolv.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/rss.rb
$(RUBYLIBDIR)/ruby/1.8/rss.rb: $(srcdir)/lib/ruby/1.8/rss.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\rss.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/rubyunit.rb
$(RUBYLIBDIR)/ruby/1.8/rubyunit.rb: $(srcdir)/lib/ruby/1.8/rubyunit.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\rubyunit.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/scanf.rb
$(RUBYLIBDIR)/ruby/1.8/scanf.rb: $(srcdir)/lib/ruby/1.8/scanf.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\scanf.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/set.rb
$(RUBYLIBDIR)/ruby/1.8/set.rb: $(srcdir)/lib/ruby/1.8/set.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\set.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/sha1.rb
$(RUBYLIBDIR)/ruby/1.8/sha1.rb: $(srcdir)/lib/ruby/1.8/sha1.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\sha1.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/shell.rb
$(RUBYLIBDIR)/ruby/1.8/shell.rb: $(srcdir)/lib/ruby/1.8/shell.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\shell.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/shellwords.rb
$(RUBYLIBDIR)/ruby/1.8/shellwords.rb: $(srcdir)/lib/ruby/1.8/shellwords.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\shellwords.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/singleton.rb
$(RUBYLIBDIR)/ruby/1.8/singleton.rb: $(srcdir)/lib/ruby/1.8/singleton.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\singleton.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/sync.rb
$(RUBYLIBDIR)/ruby/1.8/sync.rb: $(srcdir)/lib/ruby/1.8/sync.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\sync.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tcltk.rb
$(RUBYLIBDIR)/ruby/1.8/tcltk.rb: $(srcdir)/lib/ruby/1.8/tcltk.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tcltk.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tempfile.rb
$(RUBYLIBDIR)/ruby/1.8/tempfile.rb: $(srcdir)/lib/ruby/1.8/tempfile.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tempfile.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/thread.rb
$(RUBYLIBDIR)/ruby/1.8/thread.rb: $(srcdir)/lib/ruby/1.8/thread.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\thread.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/thwait.rb
$(RUBYLIBDIR)/ruby/1.8/thwait.rb: $(srcdir)/lib/ruby/1.8/thwait.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\thwait.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/time.rb
$(RUBYLIBDIR)/ruby/1.8/time.rb: $(srcdir)/lib/ruby/1.8/time.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\time.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/timeout.rb
$(RUBYLIBDIR)/ruby/1.8/timeout.rb: $(srcdir)/lib/ruby/1.8/timeout.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\timeout.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tk.rb
$(RUBYLIBDIR)/ruby/1.8/tk.rb: $(srcdir)/lib/ruby/1.8/tk.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tk.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkafter.rb
$(RUBYLIBDIR)/ruby/1.8/tkafter.rb: $(srcdir)/lib/ruby/1.8/tkafter.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkafter.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkbgerror.rb
$(RUBYLIBDIR)/ruby/1.8/tkbgerror.rb: $(srcdir)/lib/ruby/1.8/tkbgerror.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkbgerror.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkcanvas.rb
$(RUBYLIBDIR)/ruby/1.8/tkcanvas.rb: $(srcdir)/lib/ruby/1.8/tkcanvas.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkcanvas.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkclass.rb
$(RUBYLIBDIR)/ruby/1.8/tkclass.rb: $(srcdir)/lib/ruby/1.8/tkclass.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkclass.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkconsole.rb
$(RUBYLIBDIR)/ruby/1.8/tkconsole.rb: $(srcdir)/lib/ruby/1.8/tkconsole.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkconsole.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkdialog.rb
$(RUBYLIBDIR)/ruby/1.8/tkdialog.rb: $(srcdir)/lib/ruby/1.8/tkdialog.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkdialog.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkentry.rb
$(RUBYLIBDIR)/ruby/1.8/tkentry.rb: $(srcdir)/lib/ruby/1.8/tkentry.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkentry.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkfont.rb
$(RUBYLIBDIR)/ruby/1.8/tkfont.rb: $(srcdir)/lib/ruby/1.8/tkfont.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkfont.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkmacpkg.rb
$(RUBYLIBDIR)/ruby/1.8/tkmacpkg.rb: $(srcdir)/lib/ruby/1.8/tkmacpkg.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkmacpkg.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkmenubar.rb
$(RUBYLIBDIR)/ruby/1.8/tkmenubar.rb: $(srcdir)/lib/ruby/1.8/tkmenubar.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkmenubar.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkmngfocus.rb
$(RUBYLIBDIR)/ruby/1.8/tkmngfocus.rb: $(srcdir)/lib/ruby/1.8/tkmngfocus.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkmngfocus.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkpalette.rb
$(RUBYLIBDIR)/ruby/1.8/tkpalette.rb: $(srcdir)/lib/ruby/1.8/tkpalette.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkpalette.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkscrollbox.rb
$(RUBYLIBDIR)/ruby/1.8/tkscrollbox.rb: $(srcdir)/lib/ruby/1.8/tkscrollbox.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkscrollbox.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tktext.rb
$(RUBYLIBDIR)/ruby/1.8/tktext.rb: $(srcdir)/lib/ruby/1.8/tktext.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tktext.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkvirtevent.rb
$(RUBYLIBDIR)/ruby/1.8/tkvirtevent.rb: $(srcdir)/lib/ruby/1.8/tkvirtevent.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkvirtevent.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkwinpkg.rb
$(RUBYLIBDIR)/ruby/1.8/tkwinpkg.rb: $(srcdir)/lib/ruby/1.8/tkwinpkg.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkwinpkg.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tmpdir.rb
$(RUBYLIBDIR)/ruby/1.8/tmpdir.rb: $(srcdir)/lib/ruby/1.8/tmpdir.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tmpdir.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tracer.rb
$(RUBYLIBDIR)/ruby/1.8/tracer.rb: $(srcdir)/lib/ruby/1.8/tracer.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tracer.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tsort.rb
$(RUBYLIBDIR)/ruby/1.8/tsort.rb: $(srcdir)/lib/ruby/1.8/tsort.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tsort.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/un.rb
$(RUBYLIBDIR)/ruby/1.8/un.rb: $(srcdir)/lib/ruby/1.8/un.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\un.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/uri.rb
$(RUBYLIBDIR)/ruby/1.8/uri.rb: $(srcdir)/lib/ruby/1.8/uri.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\uri.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/weakref.rb
$(RUBYLIBDIR)/ruby/1.8/weakref.rb: $(srcdir)/lib/ruby/1.8/weakref.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\weakref.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/webrick.rb
$(RUBYLIBDIR)/ruby/1.8/webrick.rb: $(srcdir)/lib/ruby/1.8/webrick.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\webrick.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/yaml.rb
$(RUBYLIBDIR)/ruby/1.8/yaml.rb: $(srcdir)/lib/ruby/1.8/yaml.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\yaml.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/1.8/bigdecimal
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/bigdecimal/jacobian.rb
$(RUBYLIBDIR)/ruby/1.8/bigdecimal/jacobian.rb: $(srcdir)/lib/ruby/1.8/bigdecimal/jacobian.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\bigdecimal\jacobian.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/bigdecimal/ludcmp.rb
$(RUBYLIBDIR)/ruby/1.8/bigdecimal/ludcmp.rb: $(srcdir)/lib/ruby/1.8/bigdecimal/ludcmp.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\bigdecimal\ludcmp.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/bigdecimal/math.rb
$(RUBYLIBDIR)/ruby/1.8/bigdecimal/math.rb: $(srcdir)/lib/ruby/1.8/bigdecimal/math.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\bigdecimal\math.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/bigdecimal/newton.rb
$(RUBYLIBDIR)/ruby/1.8/bigdecimal/newton.rb: $(srcdir)/lib/ruby/1.8/bigdecimal/newton.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\bigdecimal\newton.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/bigdecimal/util.rb
$(RUBYLIBDIR)/ruby/1.8/bigdecimal/util.rb: $(srcdir)/lib/ruby/1.8/bigdecimal/util.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\bigdecimal\util.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/1.8/cgi/session
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/cgi/session/pstore.rb
$(RUBYLIBDIR)/ruby/1.8/cgi/session/pstore.rb: $(srcdir)/lib/ruby/1.8/cgi/session/pstore.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\cgi\session\pstore.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/1.8/cgi
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/cgi/session.rb
$(RUBYLIBDIR)/ruby/1.8/cgi/session.rb: $(srcdir)/lib/ruby/1.8/cgi/session.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\cgi\session.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/1.8/date
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/date/format.rb
$(RUBYLIBDIR)/ruby/1.8/date/format.rb: $(srcdir)/lib/ruby/1.8/date/format.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\date\format.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/1.8/digest
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/digest/sha2.rb
$(RUBYLIBDIR)/ruby/1.8/digest/sha2.rb: $(srcdir)/lib/ruby/1.8/digest/sha2.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\digest\sha2.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/1.8/dl
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/dl/import.rb
$(RUBYLIBDIR)/ruby/1.8/dl/import.rb: $(srcdir)/lib/ruby/1.8/dl/import.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\dl\import.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/dl/struct.rb
$(RUBYLIBDIR)/ruby/1.8/dl/struct.rb: $(srcdir)/lib/ruby/1.8/dl/struct.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\dl\struct.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/dl/types.rb
$(RUBYLIBDIR)/ruby/1.8/dl/types.rb: $(srcdir)/lib/ruby/1.8/dl/types.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\dl\types.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/dl/win32.rb
$(RUBYLIBDIR)/ruby/1.8/dl/win32.rb: $(srcdir)/lib/ruby/1.8/dl/win32.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\dl\win32.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/1.8/drb
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/drb/acl.rb
$(RUBYLIBDIR)/ruby/1.8/drb/acl.rb: $(srcdir)/lib/ruby/1.8/drb/acl.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\drb\acl.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/drb/drb.rb
$(RUBYLIBDIR)/ruby/1.8/drb/drb.rb: $(srcdir)/lib/ruby/1.8/drb/drb.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\drb\drb.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/drb/eq.rb
$(RUBYLIBDIR)/ruby/1.8/drb/eq.rb: $(srcdir)/lib/ruby/1.8/drb/eq.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\drb\eq.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/drb/extserv.rb
$(RUBYLIBDIR)/ruby/1.8/drb/extserv.rb: $(srcdir)/lib/ruby/1.8/drb/extserv.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\drb\extserv.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/drb/extservm.rb
$(RUBYLIBDIR)/ruby/1.8/drb/extservm.rb: $(srcdir)/lib/ruby/1.8/drb/extservm.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\drb\extservm.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/drb/gw.rb
$(RUBYLIBDIR)/ruby/1.8/drb/gw.rb: $(srcdir)/lib/ruby/1.8/drb/gw.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\drb\gw.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/drb/invokemethod.rb
$(RUBYLIBDIR)/ruby/1.8/drb/invokemethod.rb: $(srcdir)/lib/ruby/1.8/drb/invokemethod.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\drb\invokemethod.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/drb/observer.rb
$(RUBYLIBDIR)/ruby/1.8/drb/observer.rb: $(srcdir)/lib/ruby/1.8/drb/observer.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\drb\observer.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/drb/ssl.rb
$(RUBYLIBDIR)/ruby/1.8/drb/ssl.rb: $(srcdir)/lib/ruby/1.8/drb/ssl.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\drb\ssl.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/drb/timeridconv.rb
$(RUBYLIBDIR)/ruby/1.8/drb/timeridconv.rb: $(srcdir)/lib/ruby/1.8/drb/timeridconv.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\drb\timeridconv.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/drb/unix.rb
$(RUBYLIBDIR)/ruby/1.8/drb/unix.rb: $(srcdir)/lib/ruby/1.8/drb/unix.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\drb\unix.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/1.8/i386-mswin32
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/i386-mswin32/rbconfig.rb
$(RUBYLIBDIR)/ruby/1.8/i386-mswin32/rbconfig.rb: $(srcdir)/lib/ruby/1.8/i386-mswin32/rbconfig.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\i386-mswin32\rbconfig.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/1.8/io
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/io/nonblock.rb
$(RUBYLIBDIR)/ruby/1.8/io/nonblock.rb: $(srcdir)/lib/ruby/1.8/io/nonblock.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\io\nonblock.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/1.8/irb/cmd
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/irb/cmd/chws.rb
$(RUBYLIBDIR)/ruby/1.8/irb/cmd/chws.rb: $(srcdir)/lib/ruby/1.8/irb/cmd/chws.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\irb\cmd\chws.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/irb/cmd/fork.rb
$(RUBYLIBDIR)/ruby/1.8/irb/cmd/fork.rb: $(srcdir)/lib/ruby/1.8/irb/cmd/fork.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\irb\cmd\fork.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/irb/cmd/help.rb
$(RUBYLIBDIR)/ruby/1.8/irb/cmd/help.rb: $(srcdir)/lib/ruby/1.8/irb/cmd/help.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\irb\cmd\help.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/irb/cmd/load.rb
$(RUBYLIBDIR)/ruby/1.8/irb/cmd/load.rb: $(srcdir)/lib/ruby/1.8/irb/cmd/load.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\irb\cmd\load.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/irb/cmd/nop.rb
$(RUBYLIBDIR)/ruby/1.8/irb/cmd/nop.rb: $(srcdir)/lib/ruby/1.8/irb/cmd/nop.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\irb\cmd\nop.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/irb/cmd/pushws.rb
$(RUBYLIBDIR)/ruby/1.8/irb/cmd/pushws.rb: $(srcdir)/lib/ruby/1.8/irb/cmd/pushws.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\irb\cmd\pushws.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/irb/cmd/subirb.rb
$(RUBYLIBDIR)/ruby/1.8/irb/cmd/subirb.rb: $(srcdir)/lib/ruby/1.8/irb/cmd/subirb.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\irb\cmd\subirb.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/1.8/irb
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/irb/completion.rb
$(RUBYLIBDIR)/ruby/1.8/irb/completion.rb: $(srcdir)/lib/ruby/1.8/irb/completion.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\irb\completion.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/irb/context.rb
$(RUBYLIBDIR)/ruby/1.8/irb/context.rb: $(srcdir)/lib/ruby/1.8/irb/context.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\irb\context.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/irb/extend-command.rb
$(RUBYLIBDIR)/ruby/1.8/irb/extend-command.rb: $(srcdir)/lib/ruby/1.8/irb/extend-command.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\irb\extend-command.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/irb/frame.rb
$(RUBYLIBDIR)/ruby/1.8/irb/frame.rb: $(srcdir)/lib/ruby/1.8/irb/frame.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\irb\frame.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/irb/help.rb
$(RUBYLIBDIR)/ruby/1.8/irb/help.rb: $(srcdir)/lib/ruby/1.8/irb/help.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\irb\help.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/irb/init.rb
$(RUBYLIBDIR)/ruby/1.8/irb/init.rb: $(srcdir)/lib/ruby/1.8/irb/init.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\irb\init.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/irb/input-method.rb
$(RUBYLIBDIR)/ruby/1.8/irb/input-method.rb: $(srcdir)/lib/ruby/1.8/irb/input-method.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\irb\input-method.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/irb/locale.rb
$(RUBYLIBDIR)/ruby/1.8/irb/locale.rb: $(srcdir)/lib/ruby/1.8/irb/locale.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\irb\locale.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/irb/notifier.rb
$(RUBYLIBDIR)/ruby/1.8/irb/notifier.rb: $(srcdir)/lib/ruby/1.8/irb/notifier.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\irb\notifier.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/irb/output-method.rb
$(RUBYLIBDIR)/ruby/1.8/irb/output-method.rb: $(srcdir)/lib/ruby/1.8/irb/output-method.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\irb\output-method.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/irb/ruby-lex.rb
$(RUBYLIBDIR)/ruby/1.8/irb/ruby-lex.rb: $(srcdir)/lib/ruby/1.8/irb/ruby-lex.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\irb\ruby-lex.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/irb/ruby-token.rb
$(RUBYLIBDIR)/ruby/1.8/irb/ruby-token.rb: $(srcdir)/lib/ruby/1.8/irb/ruby-token.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\irb\ruby-token.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/irb/slex.rb
$(RUBYLIBDIR)/ruby/1.8/irb/slex.rb: $(srcdir)/lib/ruby/1.8/irb/slex.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\irb\slex.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/irb/version.rb
$(RUBYLIBDIR)/ruby/1.8/irb/version.rb: $(srcdir)/lib/ruby/1.8/irb/version.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\irb\version.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/irb/workspace.rb
$(RUBYLIBDIR)/ruby/1.8/irb/workspace.rb: $(srcdir)/lib/ruby/1.8/irb/workspace.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\irb\workspace.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/irb/ws-for-case-2.rb
$(RUBYLIBDIR)/ruby/1.8/irb/ws-for-case-2.rb: $(srcdir)/lib/ruby/1.8/irb/ws-for-case-2.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\irb\ws-for-case-2.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/irb/xmp.rb
$(RUBYLIBDIR)/ruby/1.8/irb/xmp.rb: $(srcdir)/lib/ruby/1.8/irb/xmp.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\irb\xmp.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/1.8/irb/ext
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/irb/ext/change-ws.rb
$(RUBYLIBDIR)/ruby/1.8/irb/ext/change-ws.rb: $(srcdir)/lib/ruby/1.8/irb/ext/change-ws.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\irb\ext\change-ws.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/irb/ext/history.rb
$(RUBYLIBDIR)/ruby/1.8/irb/ext/history.rb: $(srcdir)/lib/ruby/1.8/irb/ext/history.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\irb\ext\history.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/irb/ext/loader.rb
$(RUBYLIBDIR)/ruby/1.8/irb/ext/loader.rb: $(srcdir)/lib/ruby/1.8/irb/ext/loader.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\irb\ext\loader.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/irb/ext/math-mode.rb
$(RUBYLIBDIR)/ruby/1.8/irb/ext/math-mode.rb: $(srcdir)/lib/ruby/1.8/irb/ext/math-mode.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\irb\ext\math-mode.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/irb/ext/multi-irb.rb
$(RUBYLIBDIR)/ruby/1.8/irb/ext/multi-irb.rb: $(srcdir)/lib/ruby/1.8/irb/ext/multi-irb.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\irb\ext\multi-irb.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/irb/ext/save-history.rb
$(RUBYLIBDIR)/ruby/1.8/irb/ext/save-history.rb: $(srcdir)/lib/ruby/1.8/irb/ext/save-history.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\irb\ext\save-history.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/irb/ext/tracer.rb
$(RUBYLIBDIR)/ruby/1.8/irb/ext/tracer.rb: $(srcdir)/lib/ruby/1.8/irb/ext/tracer.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\irb\ext\tracer.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/irb/ext/use-loader.rb
$(RUBYLIBDIR)/ruby/1.8/irb/ext/use-loader.rb: $(srcdir)/lib/ruby/1.8/irb/ext/use-loader.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\irb\ext\use-loader.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/irb/ext/workspaces.rb
$(RUBYLIBDIR)/ruby/1.8/irb/ext/workspaces.rb: $(srcdir)/lib/ruby/1.8/irb/ext/workspaces.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\irb\ext\workspaces.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/1.8/irb/lc
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/irb/lc/error.rb
$(RUBYLIBDIR)/ruby/1.8/irb/lc/error.rb: $(srcdir)/lib/ruby/1.8/irb/lc/error.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\irb\lc\error.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/1.8/irb/lc/ja
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/irb/lc/ja/error.rb
$(RUBYLIBDIR)/ruby/1.8/irb/lc/ja/error.rb: $(srcdir)/lib/ruby/1.8/irb/lc/ja/error.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\irb\lc\ja\error.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/1.8/net
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/net/ftp.rb
$(RUBYLIBDIR)/ruby/1.8/net/ftp.rb: $(srcdir)/lib/ruby/1.8/net/ftp.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\net\ftp.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/net/ftptls.rb
$(RUBYLIBDIR)/ruby/1.8/net/ftptls.rb: $(srcdir)/lib/ruby/1.8/net/ftptls.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\net\ftptls.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/net/http.rb
$(RUBYLIBDIR)/ruby/1.8/net/http.rb: $(srcdir)/lib/ruby/1.8/net/http.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\net\http.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/net/https.rb
$(RUBYLIBDIR)/ruby/1.8/net/https.rb: $(srcdir)/lib/ruby/1.8/net/https.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\net\https.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/net/imap.rb
$(RUBYLIBDIR)/ruby/1.8/net/imap.rb: $(srcdir)/lib/ruby/1.8/net/imap.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\net\imap.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/net/pop.rb
$(RUBYLIBDIR)/ruby/1.8/net/pop.rb: $(srcdir)/lib/ruby/1.8/net/pop.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\net\pop.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/net/protocol.rb
$(RUBYLIBDIR)/ruby/1.8/net/protocol.rb: $(srcdir)/lib/ruby/1.8/net/protocol.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\net\protocol.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/net/smtp.rb
$(RUBYLIBDIR)/ruby/1.8/net/smtp.rb: $(srcdir)/lib/ruby/1.8/net/smtp.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\net\smtp.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/net/telnet.rb
$(RUBYLIBDIR)/ruby/1.8/net/telnet.rb: $(srcdir)/lib/ruby/1.8/net/telnet.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\net\telnet.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/net/telnets.rb
$(RUBYLIBDIR)/ruby/1.8/net/telnets.rb: $(srcdir)/lib/ruby/1.8/net/telnets.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\net\telnets.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/1.8/openssl
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/openssl/bn.rb
$(RUBYLIBDIR)/ruby/1.8/openssl/bn.rb: $(srcdir)/lib/ruby/1.8/openssl/bn.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\openssl\bn.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/openssl/buffering.rb
$(RUBYLIBDIR)/ruby/1.8/openssl/buffering.rb: $(srcdir)/lib/ruby/1.8/openssl/buffering.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\openssl\buffering.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/openssl/cipher.rb
$(RUBYLIBDIR)/ruby/1.8/openssl/cipher.rb: $(srcdir)/lib/ruby/1.8/openssl/cipher.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\openssl\cipher.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/openssl/digest.rb
$(RUBYLIBDIR)/ruby/1.8/openssl/digest.rb: $(srcdir)/lib/ruby/1.8/openssl/digest.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\openssl\digest.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/openssl/ssl.rb
$(RUBYLIBDIR)/ruby/1.8/openssl/ssl.rb: $(srcdir)/lib/ruby/1.8/openssl/ssl.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\openssl\ssl.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/openssl/x509.rb
$(RUBYLIBDIR)/ruby/1.8/openssl/x509.rb: $(srcdir)/lib/ruby/1.8/openssl/x509.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\openssl\x509.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/1.8/optparse
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/optparse/date.rb
$(RUBYLIBDIR)/ruby/1.8/optparse/date.rb: $(srcdir)/lib/ruby/1.8/optparse/date.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\optparse\date.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/optparse/shellwords.rb
$(RUBYLIBDIR)/ruby/1.8/optparse/shellwords.rb: $(srcdir)/lib/ruby/1.8/optparse/shellwords.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\optparse\shellwords.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/optparse/time.rb
$(RUBYLIBDIR)/ruby/1.8/optparse/time.rb: $(srcdir)/lib/ruby/1.8/optparse/time.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\optparse\time.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/optparse/uri.rb
$(RUBYLIBDIR)/ruby/1.8/optparse/uri.rb: $(srcdir)/lib/ruby/1.8/optparse/uri.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\optparse\uri.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/optparse/version.rb
$(RUBYLIBDIR)/ruby/1.8/optparse/version.rb: $(srcdir)/lib/ruby/1.8/optparse/version.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\optparse\version.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/1.8/racc
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/racc/parser.rb
$(RUBYLIBDIR)/ruby/1.8/racc/parser.rb: $(srcdir)/lib/ruby/1.8/racc/parser.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\racc\parser.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/1.8/rdoc
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/rdoc/code_objects.rb
$(RUBYLIBDIR)/ruby/1.8/rdoc/code_objects.rb: $(srcdir)/lib/ruby/1.8/rdoc/code_objects.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\rdoc\code_objects.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/rdoc/diagram.rb
$(RUBYLIBDIR)/ruby/1.8/rdoc/diagram.rb: $(srcdir)/lib/ruby/1.8/rdoc/diagram.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\rdoc\diagram.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/rdoc/options.rb
$(RUBYLIBDIR)/ruby/1.8/rdoc/options.rb: $(srcdir)/lib/ruby/1.8/rdoc/options.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\rdoc\options.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/rdoc/rdoc.rb
$(RUBYLIBDIR)/ruby/1.8/rdoc/rdoc.rb: $(srcdir)/lib/ruby/1.8/rdoc/rdoc.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\rdoc\rdoc.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/rdoc/template.rb
$(RUBYLIBDIR)/ruby/1.8/rdoc/template.rb: $(srcdir)/lib/ruby/1.8/rdoc/template.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\rdoc\template.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/rdoc/tokenstream.rb
$(RUBYLIBDIR)/ruby/1.8/rdoc/tokenstream.rb: $(srcdir)/lib/ruby/1.8/rdoc/tokenstream.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\rdoc\tokenstream.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/rdoc/usage.rb
$(RUBYLIBDIR)/ruby/1.8/rdoc/usage.rb: $(srcdir)/lib/ruby/1.8/rdoc/usage.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\rdoc\usage.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/1.8/rdoc/dot
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/rdoc/dot/dot.rb
$(RUBYLIBDIR)/ruby/1.8/rdoc/dot/dot.rb: $(srcdir)/lib/ruby/1.8/rdoc/dot/dot.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\rdoc\dot\dot.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/1.8/rdoc/generators
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/rdoc/generators/chm_generator.rb
$(RUBYLIBDIR)/ruby/1.8/rdoc/generators/chm_generator.rb: $(srcdir)/lib/ruby/1.8/rdoc/generators/chm_generator.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\rdoc\generators\chm_generator.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/rdoc/generators/html_generator.rb
$(RUBYLIBDIR)/ruby/1.8/rdoc/generators/html_generator.rb: $(srcdir)/lib/ruby/1.8/rdoc/generators/html_generator.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\rdoc\generators\html_generator.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/rdoc/generators/ri_generator.rb
$(RUBYLIBDIR)/ruby/1.8/rdoc/generators/ri_generator.rb: $(srcdir)/lib/ruby/1.8/rdoc/generators/ri_generator.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\rdoc\generators\ri_generator.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/rdoc/generators/xml_generator.rb
$(RUBYLIBDIR)/ruby/1.8/rdoc/generators/xml_generator.rb: $(srcdir)/lib/ruby/1.8/rdoc/generators/xml_generator.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\rdoc\generators\xml_generator.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/1.8/rdoc/generators/template/chm
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/rdoc/generators/template/chm/chm.rb
$(RUBYLIBDIR)/ruby/1.8/rdoc/generators/template/chm/chm.rb: $(srcdir)/lib/ruby/1.8/rdoc/generators/template/chm/chm.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\rdoc\generators\template\chm\chm.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/1.8/rdoc/generators/template/html
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/rdoc/generators/template/html/hefss.rb
$(RUBYLIBDIR)/ruby/1.8/rdoc/generators/template/html/hefss.rb: $(srcdir)/lib/ruby/1.8/rdoc/generators/template/html/hefss.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\rdoc\generators\template\html\hefss.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/rdoc/generators/template/html/html.rb
$(RUBYLIBDIR)/ruby/1.8/rdoc/generators/template/html/html.rb: $(srcdir)/lib/ruby/1.8/rdoc/generators/template/html/html.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\rdoc\generators\template\html\html.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/rdoc/generators/template/html/kilmer.rb
$(RUBYLIBDIR)/ruby/1.8/rdoc/generators/template/html/kilmer.rb: $(srcdir)/lib/ruby/1.8/rdoc/generators/template/html/kilmer.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\rdoc\generators\template\html\kilmer.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/rdoc/generators/template/html/old_html.rb
$(RUBYLIBDIR)/ruby/1.8/rdoc/generators/template/html/old_html.rb: $(srcdir)/lib/ruby/1.8/rdoc/generators/template/html/old_html.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\rdoc\generators\template\html\old_html.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/rdoc/generators/template/html/one_page_html.rb
$(RUBYLIBDIR)/ruby/1.8/rdoc/generators/template/html/one_page_html.rb: $(srcdir)/lib/ruby/1.8/rdoc/generators/template/html/one_page_html.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\rdoc\generators\template\html\one_page_html.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/1.8/rdoc/generators/template/xml
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/rdoc/generators/template/xml/rdf.rb
$(RUBYLIBDIR)/ruby/1.8/rdoc/generators/template/xml/rdf.rb: $(srcdir)/lib/ruby/1.8/rdoc/generators/template/xml/rdf.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\rdoc\generators\template\xml\rdf.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/rdoc/generators/template/xml/xml.rb
$(RUBYLIBDIR)/ruby/1.8/rdoc/generators/template/xml/xml.rb: $(srcdir)/lib/ruby/1.8/rdoc/generators/template/xml/xml.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\rdoc\generators\template\xml\xml.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/1.8/rdoc/markup/sample
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/rdoc/markup/sample/rdoc2latex.rb
$(RUBYLIBDIR)/ruby/1.8/rdoc/markup/sample/rdoc2latex.rb: $(srcdir)/lib/ruby/1.8/rdoc/markup/sample/rdoc2latex.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\rdoc\markup\sample\rdoc2latex.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/rdoc/markup/sample/sample.rb
$(RUBYLIBDIR)/ruby/1.8/rdoc/markup/sample/sample.rb: $(srcdir)/lib/ruby/1.8/rdoc/markup/sample/sample.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\rdoc\markup\sample\sample.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/1.8/rdoc/markup/simple_markup
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/rdoc/markup/simple_markup/fragments.rb
$(RUBYLIBDIR)/ruby/1.8/rdoc/markup/simple_markup/fragments.rb: $(srcdir)/lib/ruby/1.8/rdoc/markup/simple_markup/fragments.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\rdoc\markup\simple_markup\fragments.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/rdoc/markup/simple_markup/inline.rb
$(RUBYLIBDIR)/ruby/1.8/rdoc/markup/simple_markup/inline.rb: $(srcdir)/lib/ruby/1.8/rdoc/markup/simple_markup/inline.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\rdoc\markup\simple_markup\inline.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/rdoc/markup/simple_markup/lines.rb
$(RUBYLIBDIR)/ruby/1.8/rdoc/markup/simple_markup/lines.rb: $(srcdir)/lib/ruby/1.8/rdoc/markup/simple_markup/lines.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\rdoc\markup\simple_markup\lines.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/rdoc/markup/simple_markup/preprocess.rb
$(RUBYLIBDIR)/ruby/1.8/rdoc/markup/simple_markup/preprocess.rb: $(srcdir)/lib/ruby/1.8/rdoc/markup/simple_markup/preprocess.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\rdoc\markup\simple_markup\preprocess.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/rdoc/markup/simple_markup/to_flow.rb
$(RUBYLIBDIR)/ruby/1.8/rdoc/markup/simple_markup/to_flow.rb: $(srcdir)/lib/ruby/1.8/rdoc/markup/simple_markup/to_flow.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\rdoc\markup\simple_markup\to_flow.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/rdoc/markup/simple_markup/to_html.rb
$(RUBYLIBDIR)/ruby/1.8/rdoc/markup/simple_markup/to_html.rb: $(srcdir)/lib/ruby/1.8/rdoc/markup/simple_markup/to_html.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\rdoc\markup\simple_markup\to_html.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/rdoc/markup/simple_markup/to_latex.rb
$(RUBYLIBDIR)/ruby/1.8/rdoc/markup/simple_markup/to_latex.rb: $(srcdir)/lib/ruby/1.8/rdoc/markup/simple_markup/to_latex.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\rdoc\markup\simple_markup\to_latex.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/1.8/rdoc/markup
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/rdoc/markup/simple_markup.rb
$(RUBYLIBDIR)/ruby/1.8/rdoc/markup/simple_markup.rb: $(srcdir)/lib/ruby/1.8/rdoc/markup/simple_markup.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\rdoc\markup\simple_markup.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/1.8/rdoc/markup/test
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/rdoc/markup/test/AllTests.rb
$(RUBYLIBDIR)/ruby/1.8/rdoc/markup/test/AllTests.rb: $(srcdir)/lib/ruby/1.8/rdoc/markup/test/AllTests.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\rdoc\markup\test\AllTests.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/rdoc/markup/test/TestInline.rb
$(RUBYLIBDIR)/ruby/1.8/rdoc/markup/test/TestInline.rb: $(srcdir)/lib/ruby/1.8/rdoc/markup/test/TestInline.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\rdoc\markup\test\TestInline.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/rdoc/markup/test/TestParse.rb
$(RUBYLIBDIR)/ruby/1.8/rdoc/markup/test/TestParse.rb: $(srcdir)/lib/ruby/1.8/rdoc/markup/test/TestParse.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\rdoc\markup\test\TestParse.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/1.8/rdoc/parsers
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/rdoc/parsers/parserfactory.rb
$(RUBYLIBDIR)/ruby/1.8/rdoc/parsers/parserfactory.rb: $(srcdir)/lib/ruby/1.8/rdoc/parsers/parserfactory.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\rdoc\parsers\parserfactory.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/rdoc/parsers/parse_c.rb
$(RUBYLIBDIR)/ruby/1.8/rdoc/parsers/parse_c.rb: $(srcdir)/lib/ruby/1.8/rdoc/parsers/parse_c.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\rdoc\parsers\parse_c.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/rdoc/parsers/parse_f95.rb
$(RUBYLIBDIR)/ruby/1.8/rdoc/parsers/parse_f95.rb: $(srcdir)/lib/ruby/1.8/rdoc/parsers/parse_f95.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\rdoc\parsers\parse_f95.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/rdoc/parsers/parse_rb.rb
$(RUBYLIBDIR)/ruby/1.8/rdoc/parsers/parse_rb.rb: $(srcdir)/lib/ruby/1.8/rdoc/parsers/parse_rb.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\rdoc\parsers\parse_rb.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/rdoc/parsers/parse_simple.rb
$(RUBYLIBDIR)/ruby/1.8/rdoc/parsers/parse_simple.rb: $(srcdir)/lib/ruby/1.8/rdoc/parsers/parse_simple.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\rdoc\parsers\parse_simple.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/1.8/rdoc/ri
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/rdoc/ri/ri_cache.rb
$(RUBYLIBDIR)/ruby/1.8/rdoc/ri/ri_cache.rb: $(srcdir)/lib/ruby/1.8/rdoc/ri/ri_cache.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\rdoc\ri\ri_cache.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/rdoc/ri/ri_descriptions.rb
$(RUBYLIBDIR)/ruby/1.8/rdoc/ri/ri_descriptions.rb: $(srcdir)/lib/ruby/1.8/rdoc/ri/ri_descriptions.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\rdoc\ri\ri_descriptions.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/rdoc/ri/ri_display.rb
$(RUBYLIBDIR)/ruby/1.8/rdoc/ri/ri_display.rb: $(srcdir)/lib/ruby/1.8/rdoc/ri/ri_display.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\rdoc\ri\ri_display.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/rdoc/ri/ri_driver.rb
$(RUBYLIBDIR)/ruby/1.8/rdoc/ri/ri_driver.rb: $(srcdir)/lib/ruby/1.8/rdoc/ri/ri_driver.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\rdoc\ri\ri_driver.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/rdoc/ri/ri_formatter.rb
$(RUBYLIBDIR)/ruby/1.8/rdoc/ri/ri_formatter.rb: $(srcdir)/lib/ruby/1.8/rdoc/ri/ri_formatter.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\rdoc\ri\ri_formatter.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/rdoc/ri/ri_options.rb
$(RUBYLIBDIR)/ruby/1.8/rdoc/ri/ri_options.rb: $(srcdir)/lib/ruby/1.8/rdoc/ri/ri_options.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\rdoc\ri\ri_options.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/rdoc/ri/ri_paths.rb
$(RUBYLIBDIR)/ruby/1.8/rdoc/ri/ri_paths.rb: $(srcdir)/lib/ruby/1.8/rdoc/ri/ri_paths.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\rdoc\ri\ri_paths.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/rdoc/ri/ri_reader.rb
$(RUBYLIBDIR)/ruby/1.8/rdoc/ri/ri_reader.rb: $(srcdir)/lib/ruby/1.8/rdoc/ri/ri_reader.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\rdoc\ri\ri_reader.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/rdoc/ri/ri_util.rb
$(RUBYLIBDIR)/ruby/1.8/rdoc/ri/ri_util.rb: $(srcdir)/lib/ruby/1.8/rdoc/ri/ri_util.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\rdoc\ri\ri_util.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/rdoc/ri/ri_writer.rb
$(RUBYLIBDIR)/ruby/1.8/rdoc/ri/ri_writer.rb: $(srcdir)/lib/ruby/1.8/rdoc/ri/ri_writer.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\rdoc\ri\ri_writer.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/1.8/rexml
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/rexml/attlistdecl.rb
$(RUBYLIBDIR)/ruby/1.8/rexml/attlistdecl.rb: $(srcdir)/lib/ruby/1.8/rexml/attlistdecl.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\rexml\attlistdecl.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/rexml/attribute.rb
$(RUBYLIBDIR)/ruby/1.8/rexml/attribute.rb: $(srcdir)/lib/ruby/1.8/rexml/attribute.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\rexml\attribute.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/rexml/cdata.rb
$(RUBYLIBDIR)/ruby/1.8/rexml/cdata.rb: $(srcdir)/lib/ruby/1.8/rexml/cdata.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\rexml\cdata.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/rexml/child.rb
$(RUBYLIBDIR)/ruby/1.8/rexml/child.rb: $(srcdir)/lib/ruby/1.8/rexml/child.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\rexml\child.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/rexml/comment.rb
$(RUBYLIBDIR)/ruby/1.8/rexml/comment.rb: $(srcdir)/lib/ruby/1.8/rexml/comment.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\rexml\comment.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/rexml/doctype.rb
$(RUBYLIBDIR)/ruby/1.8/rexml/doctype.rb: $(srcdir)/lib/ruby/1.8/rexml/doctype.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\rexml\doctype.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/rexml/document.rb
$(RUBYLIBDIR)/ruby/1.8/rexml/document.rb: $(srcdir)/lib/ruby/1.8/rexml/document.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\rexml\document.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/rexml/element.rb
$(RUBYLIBDIR)/ruby/1.8/rexml/element.rb: $(srcdir)/lib/ruby/1.8/rexml/element.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\rexml\element.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/rexml/encoding.rb
$(RUBYLIBDIR)/ruby/1.8/rexml/encoding.rb: $(srcdir)/lib/ruby/1.8/rexml/encoding.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\rexml\encoding.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/rexml/entity.rb
$(RUBYLIBDIR)/ruby/1.8/rexml/entity.rb: $(srcdir)/lib/ruby/1.8/rexml/entity.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\rexml\entity.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/rexml/functions.rb
$(RUBYLIBDIR)/ruby/1.8/rexml/functions.rb: $(srcdir)/lib/ruby/1.8/rexml/functions.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\rexml\functions.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/rexml/instruction.rb
$(RUBYLIBDIR)/ruby/1.8/rexml/instruction.rb: $(srcdir)/lib/ruby/1.8/rexml/instruction.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\rexml\instruction.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/rexml/namespace.rb
$(RUBYLIBDIR)/ruby/1.8/rexml/namespace.rb: $(srcdir)/lib/ruby/1.8/rexml/namespace.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\rexml\namespace.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/rexml/node.rb
$(RUBYLIBDIR)/ruby/1.8/rexml/node.rb: $(srcdir)/lib/ruby/1.8/rexml/node.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\rexml\node.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/rexml/output.rb
$(RUBYLIBDIR)/ruby/1.8/rexml/output.rb: $(srcdir)/lib/ruby/1.8/rexml/output.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\rexml\output.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/rexml/parent.rb
$(RUBYLIBDIR)/ruby/1.8/rexml/parent.rb: $(srcdir)/lib/ruby/1.8/rexml/parent.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\rexml\parent.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/rexml/parseexception.rb
$(RUBYLIBDIR)/ruby/1.8/rexml/parseexception.rb: $(srcdir)/lib/ruby/1.8/rexml/parseexception.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\rexml\parseexception.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/rexml/quickpath.rb
$(RUBYLIBDIR)/ruby/1.8/rexml/quickpath.rb: $(srcdir)/lib/ruby/1.8/rexml/quickpath.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\rexml\quickpath.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/rexml/rexml.rb
$(RUBYLIBDIR)/ruby/1.8/rexml/rexml.rb: $(srcdir)/lib/ruby/1.8/rexml/rexml.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\rexml\rexml.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/rexml/sax2listener.rb
$(RUBYLIBDIR)/ruby/1.8/rexml/sax2listener.rb: $(srcdir)/lib/ruby/1.8/rexml/sax2listener.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\rexml\sax2listener.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/rexml/source.rb
$(RUBYLIBDIR)/ruby/1.8/rexml/source.rb: $(srcdir)/lib/ruby/1.8/rexml/source.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\rexml\source.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/rexml/streamlistener.rb
$(RUBYLIBDIR)/ruby/1.8/rexml/streamlistener.rb: $(srcdir)/lib/ruby/1.8/rexml/streamlistener.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\rexml\streamlistener.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/rexml/syncenumerator.rb
$(RUBYLIBDIR)/ruby/1.8/rexml/syncenumerator.rb: $(srcdir)/lib/ruby/1.8/rexml/syncenumerator.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\rexml\syncenumerator.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/rexml/text.rb
$(RUBYLIBDIR)/ruby/1.8/rexml/text.rb: $(srcdir)/lib/ruby/1.8/rexml/text.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\rexml\text.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/rexml/xmldecl.rb
$(RUBYLIBDIR)/ruby/1.8/rexml/xmldecl.rb: $(srcdir)/lib/ruby/1.8/rexml/xmldecl.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\rexml\xmldecl.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/rexml/xmltokens.rb
$(RUBYLIBDIR)/ruby/1.8/rexml/xmltokens.rb: $(srcdir)/lib/ruby/1.8/rexml/xmltokens.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\rexml\xmltokens.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/rexml/xpath.rb
$(RUBYLIBDIR)/ruby/1.8/rexml/xpath.rb: $(srcdir)/lib/ruby/1.8/rexml/xpath.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\rexml\xpath.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/rexml/xpath_parser.rb
$(RUBYLIBDIR)/ruby/1.8/rexml/xpath_parser.rb: $(srcdir)/lib/ruby/1.8/rexml/xpath_parser.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\rexml\xpath_parser.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/1.8/rexml/dtd
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/rexml/dtd/attlistdecl.rb
$(RUBYLIBDIR)/ruby/1.8/rexml/dtd/attlistdecl.rb: $(srcdir)/lib/ruby/1.8/rexml/dtd/attlistdecl.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\rexml\dtd\attlistdecl.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/rexml/dtd/dtd.rb
$(RUBYLIBDIR)/ruby/1.8/rexml/dtd/dtd.rb: $(srcdir)/lib/ruby/1.8/rexml/dtd/dtd.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\rexml\dtd\dtd.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/rexml/dtd/elementdecl.rb
$(RUBYLIBDIR)/ruby/1.8/rexml/dtd/elementdecl.rb: $(srcdir)/lib/ruby/1.8/rexml/dtd/elementdecl.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\rexml\dtd\elementdecl.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/rexml/dtd/entitydecl.rb
$(RUBYLIBDIR)/ruby/1.8/rexml/dtd/entitydecl.rb: $(srcdir)/lib/ruby/1.8/rexml/dtd/entitydecl.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\rexml\dtd\entitydecl.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/rexml/dtd/notationdecl.rb
$(RUBYLIBDIR)/ruby/1.8/rexml/dtd/notationdecl.rb: $(srcdir)/lib/ruby/1.8/rexml/dtd/notationdecl.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\rexml\dtd\notationdecl.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/1.8/rexml/encodings
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/rexml/encodings/CP-1252.rb
$(RUBYLIBDIR)/ruby/1.8/rexml/encodings/CP-1252.rb: $(srcdir)/lib/ruby/1.8/rexml/encodings/CP-1252.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\rexml\encodings\CP-1252.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/rexml/encodings/EUC-JP.rb
$(RUBYLIBDIR)/ruby/1.8/rexml/encodings/EUC-JP.rb: $(srcdir)/lib/ruby/1.8/rexml/encodings/EUC-JP.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\rexml\encodings\EUC-JP.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/rexml/encodings/ICONV.rb
$(RUBYLIBDIR)/ruby/1.8/rexml/encodings/ICONV.rb: $(srcdir)/lib/ruby/1.8/rexml/encodings/ICONV.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\rexml\encodings\ICONV.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/rexml/encodings/ISO-8859-1.rb
$(RUBYLIBDIR)/ruby/1.8/rexml/encodings/ISO-8859-1.rb: $(srcdir)/lib/ruby/1.8/rexml/encodings/ISO-8859-1.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\rexml\encodings\ISO-8859-1.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/rexml/encodings/ISO-8859-15.rb
$(RUBYLIBDIR)/ruby/1.8/rexml/encodings/ISO-8859-15.rb: $(srcdir)/lib/ruby/1.8/rexml/encodings/ISO-8859-15.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\rexml\encodings\ISO-8859-15.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/rexml/encodings/SHIFT-JIS.rb
$(RUBYLIBDIR)/ruby/1.8/rexml/encodings/SHIFT-JIS.rb: $(srcdir)/lib/ruby/1.8/rexml/encodings/SHIFT-JIS.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\rexml\encodings\SHIFT-JIS.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/rexml/encodings/SHIFT_JIS.rb
$(RUBYLIBDIR)/ruby/1.8/rexml/encodings/SHIFT_JIS.rb: $(srcdir)/lib/ruby/1.8/rexml/encodings/SHIFT_JIS.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\rexml\encodings\SHIFT_JIS.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/rexml/encodings/UNILE.rb
$(RUBYLIBDIR)/ruby/1.8/rexml/encodings/UNILE.rb: $(srcdir)/lib/ruby/1.8/rexml/encodings/UNILE.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\rexml\encodings\UNILE.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/rexml/encodings/US-ASCII.rb
$(RUBYLIBDIR)/ruby/1.8/rexml/encodings/US-ASCII.rb: $(srcdir)/lib/ruby/1.8/rexml/encodings/US-ASCII.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\rexml\encodings\US-ASCII.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/rexml/encodings/UTF-16.rb
$(RUBYLIBDIR)/ruby/1.8/rexml/encodings/UTF-16.rb: $(srcdir)/lib/ruby/1.8/rexml/encodings/UTF-16.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\rexml\encodings\UTF-16.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/rexml/encodings/UTF-8.rb
$(RUBYLIBDIR)/ruby/1.8/rexml/encodings/UTF-8.rb: $(srcdir)/lib/ruby/1.8/rexml/encodings/UTF-8.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\rexml\encodings\UTF-8.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/1.8/rexml/formatters
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/rexml/formatters/default.rb
$(RUBYLIBDIR)/ruby/1.8/rexml/formatters/default.rb: $(srcdir)/lib/ruby/1.8/rexml/formatters/default.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\rexml\formatters\default.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/rexml/formatters/pretty.rb
$(RUBYLIBDIR)/ruby/1.8/rexml/formatters/pretty.rb: $(srcdir)/lib/ruby/1.8/rexml/formatters/pretty.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\rexml\formatters\pretty.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/rexml/formatters/transitive.rb
$(RUBYLIBDIR)/ruby/1.8/rexml/formatters/transitive.rb: $(srcdir)/lib/ruby/1.8/rexml/formatters/transitive.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\rexml\formatters\transitive.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/1.8/rexml/light
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/rexml/light/node.rb
$(RUBYLIBDIR)/ruby/1.8/rexml/light/node.rb: $(srcdir)/lib/ruby/1.8/rexml/light/node.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\rexml\light\node.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/1.8/rexml/parsers
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/rexml/parsers/baseparser.rb
$(RUBYLIBDIR)/ruby/1.8/rexml/parsers/baseparser.rb: $(srcdir)/lib/ruby/1.8/rexml/parsers/baseparser.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\rexml\parsers\baseparser.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/rexml/parsers/lightparser.rb
$(RUBYLIBDIR)/ruby/1.8/rexml/parsers/lightparser.rb: $(srcdir)/lib/ruby/1.8/rexml/parsers/lightparser.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\rexml\parsers\lightparser.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/rexml/parsers/pullparser.rb
$(RUBYLIBDIR)/ruby/1.8/rexml/parsers/pullparser.rb: $(srcdir)/lib/ruby/1.8/rexml/parsers/pullparser.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\rexml\parsers\pullparser.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/rexml/parsers/sax2parser.rb
$(RUBYLIBDIR)/ruby/1.8/rexml/parsers/sax2parser.rb: $(srcdir)/lib/ruby/1.8/rexml/parsers/sax2parser.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\rexml\parsers\sax2parser.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/rexml/parsers/streamparser.rb
$(RUBYLIBDIR)/ruby/1.8/rexml/parsers/streamparser.rb: $(srcdir)/lib/ruby/1.8/rexml/parsers/streamparser.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\rexml\parsers\streamparser.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/rexml/parsers/treeparser.rb
$(RUBYLIBDIR)/ruby/1.8/rexml/parsers/treeparser.rb: $(srcdir)/lib/ruby/1.8/rexml/parsers/treeparser.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\rexml\parsers\treeparser.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/rexml/parsers/ultralightparser.rb
$(RUBYLIBDIR)/ruby/1.8/rexml/parsers/ultralightparser.rb: $(srcdir)/lib/ruby/1.8/rexml/parsers/ultralightparser.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\rexml\parsers\ultralightparser.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/rexml/parsers/xpathparser.rb
$(RUBYLIBDIR)/ruby/1.8/rexml/parsers/xpathparser.rb: $(srcdir)/lib/ruby/1.8/rexml/parsers/xpathparser.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\rexml\parsers\xpathparser.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/1.8/rexml/validation
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/rexml/validation/relaxng.rb
$(RUBYLIBDIR)/ruby/1.8/rexml/validation/relaxng.rb: $(srcdir)/lib/ruby/1.8/rexml/validation/relaxng.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\rexml\validation\relaxng.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/rexml/validation/validation.rb
$(RUBYLIBDIR)/ruby/1.8/rexml/validation/validation.rb: $(srcdir)/lib/ruby/1.8/rexml/validation/validation.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\rexml\validation\validation.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/rexml/validation/validationexception.rb
$(RUBYLIBDIR)/ruby/1.8/rexml/validation/validationexception.rb: $(srcdir)/lib/ruby/1.8/rexml/validation/validationexception.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\rexml\validation\validationexception.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/1.8/rinda
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/rinda/rinda.rb
$(RUBYLIBDIR)/ruby/1.8/rinda/rinda.rb: $(srcdir)/lib/ruby/1.8/rinda/rinda.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\rinda\rinda.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/rinda/ring.rb
$(RUBYLIBDIR)/ruby/1.8/rinda/ring.rb: $(srcdir)/lib/ruby/1.8/rinda/ring.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\rinda\ring.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/rinda/tuplespace.rb
$(RUBYLIBDIR)/ruby/1.8/rinda/tuplespace.rb: $(srcdir)/lib/ruby/1.8/rinda/tuplespace.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\rinda\tuplespace.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/1.8/rss
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/rss/0.9.rb
$(RUBYLIBDIR)/ruby/1.8/rss/0.9.rb: $(srcdir)/lib/ruby/1.8/rss/0.9.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\rss\0.9.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/rss/1.0.rb
$(RUBYLIBDIR)/ruby/1.8/rss/1.0.rb: $(srcdir)/lib/ruby/1.8/rss/1.0.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\rss\1.0.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/rss/2.0.rb
$(RUBYLIBDIR)/ruby/1.8/rss/2.0.rb: $(srcdir)/lib/ruby/1.8/rss/2.0.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\rss\2.0.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/rss/content.rb
$(RUBYLIBDIR)/ruby/1.8/rss/content.rb: $(srcdir)/lib/ruby/1.8/rss/content.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\rss\content.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/rss/converter.rb
$(RUBYLIBDIR)/ruby/1.8/rss/converter.rb: $(srcdir)/lib/ruby/1.8/rss/converter.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\rss\converter.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/rss/dublincore.rb
$(RUBYLIBDIR)/ruby/1.8/rss/dublincore.rb: $(srcdir)/lib/ruby/1.8/rss/dublincore.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\rss\dublincore.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/rss/image.rb
$(RUBYLIBDIR)/ruby/1.8/rss/image.rb: $(srcdir)/lib/ruby/1.8/rss/image.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\rss\image.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/rss/maker.rb
$(RUBYLIBDIR)/ruby/1.8/rss/maker.rb: $(srcdir)/lib/ruby/1.8/rss/maker.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\rss\maker.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/rss/parser.rb
$(RUBYLIBDIR)/ruby/1.8/rss/parser.rb: $(srcdir)/lib/ruby/1.8/rss/parser.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\rss\parser.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/rss/rexmlparser.rb
$(RUBYLIBDIR)/ruby/1.8/rss/rexmlparser.rb: $(srcdir)/lib/ruby/1.8/rss/rexmlparser.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\rss\rexmlparser.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/rss/rss.rb
$(RUBYLIBDIR)/ruby/1.8/rss/rss.rb: $(srcdir)/lib/ruby/1.8/rss/rss.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\rss\rss.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/rss/syndication.rb
$(RUBYLIBDIR)/ruby/1.8/rss/syndication.rb: $(srcdir)/lib/ruby/1.8/rss/syndication.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\rss\syndication.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/rss/taxonomy.rb
$(RUBYLIBDIR)/ruby/1.8/rss/taxonomy.rb: $(srcdir)/lib/ruby/1.8/rss/taxonomy.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\rss\taxonomy.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/rss/trackback.rb
$(RUBYLIBDIR)/ruby/1.8/rss/trackback.rb: $(srcdir)/lib/ruby/1.8/rss/trackback.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\rss\trackback.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/rss/utils.rb
$(RUBYLIBDIR)/ruby/1.8/rss/utils.rb: $(srcdir)/lib/ruby/1.8/rss/utils.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\rss\utils.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/rss/xml-stylesheet.rb
$(RUBYLIBDIR)/ruby/1.8/rss/xml-stylesheet.rb: $(srcdir)/lib/ruby/1.8/rss/xml-stylesheet.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\rss\xml-stylesheet.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/rss/xmlparser.rb
$(RUBYLIBDIR)/ruby/1.8/rss/xmlparser.rb: $(srcdir)/lib/ruby/1.8/rss/xmlparser.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\rss\xmlparser.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/rss/xmlscanner.rb
$(RUBYLIBDIR)/ruby/1.8/rss/xmlscanner.rb: $(srcdir)/lib/ruby/1.8/rss/xmlscanner.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\rss\xmlscanner.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/1.8/rss/maker
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/rss/maker/0.9.rb
$(RUBYLIBDIR)/ruby/1.8/rss/maker/0.9.rb: $(srcdir)/lib/ruby/1.8/rss/maker/0.9.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\rss\maker\0.9.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/rss/maker/1.0.rb
$(RUBYLIBDIR)/ruby/1.8/rss/maker/1.0.rb: $(srcdir)/lib/ruby/1.8/rss/maker/1.0.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\rss\maker\1.0.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/rss/maker/2.0.rb
$(RUBYLIBDIR)/ruby/1.8/rss/maker/2.0.rb: $(srcdir)/lib/ruby/1.8/rss/maker/2.0.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\rss\maker\2.0.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/rss/maker/base.rb
$(RUBYLIBDIR)/ruby/1.8/rss/maker/base.rb: $(srcdir)/lib/ruby/1.8/rss/maker/base.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\rss\maker\base.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/rss/maker/content.rb
$(RUBYLIBDIR)/ruby/1.8/rss/maker/content.rb: $(srcdir)/lib/ruby/1.8/rss/maker/content.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\rss\maker\content.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/rss/maker/dublincore.rb
$(RUBYLIBDIR)/ruby/1.8/rss/maker/dublincore.rb: $(srcdir)/lib/ruby/1.8/rss/maker/dublincore.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\rss\maker\dublincore.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/rss/maker/image.rb
$(RUBYLIBDIR)/ruby/1.8/rss/maker/image.rb: $(srcdir)/lib/ruby/1.8/rss/maker/image.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\rss\maker\image.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/rss/maker/syndication.rb
$(RUBYLIBDIR)/ruby/1.8/rss/maker/syndication.rb: $(srcdir)/lib/ruby/1.8/rss/maker/syndication.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\rss\maker\syndication.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/rss/maker/taxonomy.rb
$(RUBYLIBDIR)/ruby/1.8/rss/maker/taxonomy.rb: $(srcdir)/lib/ruby/1.8/rss/maker/taxonomy.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\rss\maker\taxonomy.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/rss/maker/trackback.rb
$(RUBYLIBDIR)/ruby/1.8/rss/maker/trackback.rb: $(srcdir)/lib/ruby/1.8/rss/maker/trackback.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\rss\maker\trackback.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/1.8/runit
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/runit/assert.rb
$(RUBYLIBDIR)/ruby/1.8/runit/assert.rb: $(srcdir)/lib/ruby/1.8/runit/assert.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\runit\assert.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/runit/error.rb
$(RUBYLIBDIR)/ruby/1.8/runit/error.rb: $(srcdir)/lib/ruby/1.8/runit/error.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\runit\error.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/runit/testcase.rb
$(RUBYLIBDIR)/ruby/1.8/runit/testcase.rb: $(srcdir)/lib/ruby/1.8/runit/testcase.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\runit\testcase.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/runit/testresult.rb
$(RUBYLIBDIR)/ruby/1.8/runit/testresult.rb: $(srcdir)/lib/ruby/1.8/runit/testresult.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\runit\testresult.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/runit/testsuite.rb
$(RUBYLIBDIR)/ruby/1.8/runit/testsuite.rb: $(srcdir)/lib/ruby/1.8/runit/testsuite.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\runit\testsuite.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/runit/topublic.rb
$(RUBYLIBDIR)/ruby/1.8/runit/topublic.rb: $(srcdir)/lib/ruby/1.8/runit/topublic.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\runit\topublic.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/1.8/runit/cui
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/runit/cui/testrunner.rb
$(RUBYLIBDIR)/ruby/1.8/runit/cui/testrunner.rb: $(srcdir)/lib/ruby/1.8/runit/cui/testrunner.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\runit\cui\testrunner.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/1.8/shell
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/shell/builtin-command.rb
$(RUBYLIBDIR)/ruby/1.8/shell/builtin-command.rb: $(srcdir)/lib/ruby/1.8/shell/builtin-command.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\shell\builtin-command.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/shell/command-processor.rb
$(RUBYLIBDIR)/ruby/1.8/shell/command-processor.rb: $(srcdir)/lib/ruby/1.8/shell/command-processor.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\shell\command-processor.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/shell/error.rb
$(RUBYLIBDIR)/ruby/1.8/shell/error.rb: $(srcdir)/lib/ruby/1.8/shell/error.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\shell\error.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/shell/filter.rb
$(RUBYLIBDIR)/ruby/1.8/shell/filter.rb: $(srcdir)/lib/ruby/1.8/shell/filter.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\shell\filter.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/shell/process-controller.rb
$(RUBYLIBDIR)/ruby/1.8/shell/process-controller.rb: $(srcdir)/lib/ruby/1.8/shell/process-controller.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\shell\process-controller.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/shell/system-command.rb
$(RUBYLIBDIR)/ruby/1.8/shell/system-command.rb: $(srcdir)/lib/ruby/1.8/shell/system-command.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\shell\system-command.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/shell/version.rb
$(RUBYLIBDIR)/ruby/1.8/shell/version.rb: $(srcdir)/lib/ruby/1.8/shell/version.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\shell\version.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/1.8/soap
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/soap/attachment.rb
$(RUBYLIBDIR)/ruby/1.8/soap/attachment.rb: $(srcdir)/lib/ruby/1.8/soap/attachment.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\soap\attachment.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/soap/baseData.rb
$(RUBYLIBDIR)/ruby/1.8/soap/baseData.rb: $(srcdir)/lib/ruby/1.8/soap/baseData.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\soap\baseData.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/soap/element.rb
$(RUBYLIBDIR)/ruby/1.8/soap/element.rb: $(srcdir)/lib/ruby/1.8/soap/element.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\soap\element.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/soap/generator.rb
$(RUBYLIBDIR)/ruby/1.8/soap/generator.rb: $(srcdir)/lib/ruby/1.8/soap/generator.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\soap\generator.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/soap/httpconfigloader.rb
$(RUBYLIBDIR)/ruby/1.8/soap/httpconfigloader.rb: $(srcdir)/lib/ruby/1.8/soap/httpconfigloader.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\soap\httpconfigloader.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/soap/mapping.rb
$(RUBYLIBDIR)/ruby/1.8/soap/mapping.rb: $(srcdir)/lib/ruby/1.8/soap/mapping.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\soap\mapping.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/soap/marshal.rb
$(RUBYLIBDIR)/ruby/1.8/soap/marshal.rb: $(srcdir)/lib/ruby/1.8/soap/marshal.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\soap\marshal.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/soap/mimemessage.rb
$(RUBYLIBDIR)/ruby/1.8/soap/mimemessage.rb: $(srcdir)/lib/ruby/1.8/soap/mimemessage.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\soap\mimemessage.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/soap/netHttpClient.rb
$(RUBYLIBDIR)/ruby/1.8/soap/netHttpClient.rb: $(srcdir)/lib/ruby/1.8/soap/netHttpClient.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\soap\netHttpClient.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/soap/parser.rb
$(RUBYLIBDIR)/ruby/1.8/soap/parser.rb: $(srcdir)/lib/ruby/1.8/soap/parser.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\soap\parser.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/soap/processor.rb
$(RUBYLIBDIR)/ruby/1.8/soap/processor.rb: $(srcdir)/lib/ruby/1.8/soap/processor.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\soap\processor.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/soap/property.rb
$(RUBYLIBDIR)/ruby/1.8/soap/property.rb: $(srcdir)/lib/ruby/1.8/soap/property.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\soap\property.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/soap/soap.rb
$(RUBYLIBDIR)/ruby/1.8/soap/soap.rb: $(srcdir)/lib/ruby/1.8/soap/soap.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\soap\soap.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/soap/streamHandler.rb
$(RUBYLIBDIR)/ruby/1.8/soap/streamHandler.rb: $(srcdir)/lib/ruby/1.8/soap/streamHandler.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\soap\streamHandler.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/soap/wsdlDriver.rb
$(RUBYLIBDIR)/ruby/1.8/soap/wsdlDriver.rb: $(srcdir)/lib/ruby/1.8/soap/wsdlDriver.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\soap\wsdlDriver.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/1.8/soap/encodingstyle
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/soap/encodingstyle/aspDotNetHandler.rb
$(RUBYLIBDIR)/ruby/1.8/soap/encodingstyle/aspDotNetHandler.rb: $(srcdir)/lib/ruby/1.8/soap/encodingstyle/aspDotNetHandler.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\soap\encodingstyle\aspDotNetHandler.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/soap/encodingstyle/handler.rb
$(RUBYLIBDIR)/ruby/1.8/soap/encodingstyle/handler.rb: $(srcdir)/lib/ruby/1.8/soap/encodingstyle/handler.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\soap\encodingstyle\handler.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/soap/encodingstyle/literalHandler.rb
$(RUBYLIBDIR)/ruby/1.8/soap/encodingstyle/literalHandler.rb: $(srcdir)/lib/ruby/1.8/soap/encodingstyle/literalHandler.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\soap\encodingstyle\literalHandler.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/soap/encodingstyle/soapHandler.rb
$(RUBYLIBDIR)/ruby/1.8/soap/encodingstyle/soapHandler.rb: $(srcdir)/lib/ruby/1.8/soap/encodingstyle/soapHandler.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\soap\encodingstyle\soapHandler.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/1.8/soap/header
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/soap/header/handler.rb
$(RUBYLIBDIR)/ruby/1.8/soap/header/handler.rb: $(srcdir)/lib/ruby/1.8/soap/header/handler.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\soap\header\handler.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/soap/header/handlerset.rb
$(RUBYLIBDIR)/ruby/1.8/soap/header/handlerset.rb: $(srcdir)/lib/ruby/1.8/soap/header/handlerset.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\soap\header\handlerset.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/soap/header/simplehandler.rb
$(RUBYLIBDIR)/ruby/1.8/soap/header/simplehandler.rb: $(srcdir)/lib/ruby/1.8/soap/header/simplehandler.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\soap\header\simplehandler.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/1.8/soap/mapping
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/soap/mapping/factory.rb
$(RUBYLIBDIR)/ruby/1.8/soap/mapping/factory.rb: $(srcdir)/lib/ruby/1.8/soap/mapping/factory.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\soap\mapping\factory.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/soap/mapping/mapping.rb
$(RUBYLIBDIR)/ruby/1.8/soap/mapping/mapping.rb: $(srcdir)/lib/ruby/1.8/soap/mapping/mapping.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\soap\mapping\mapping.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/soap/mapping/registry.rb
$(RUBYLIBDIR)/ruby/1.8/soap/mapping/registry.rb: $(srcdir)/lib/ruby/1.8/soap/mapping/registry.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\soap\mapping\registry.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/soap/mapping/rubytypeFactory.rb
$(RUBYLIBDIR)/ruby/1.8/soap/mapping/rubytypeFactory.rb: $(srcdir)/lib/ruby/1.8/soap/mapping/rubytypeFactory.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\soap\mapping\rubytypeFactory.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/soap/mapping/typeMap.rb
$(RUBYLIBDIR)/ruby/1.8/soap/mapping/typeMap.rb: $(srcdir)/lib/ruby/1.8/soap/mapping/typeMap.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\soap\mapping\typeMap.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/soap/mapping/wsdlencodedregistry.rb
$(RUBYLIBDIR)/ruby/1.8/soap/mapping/wsdlencodedregistry.rb: $(srcdir)/lib/ruby/1.8/soap/mapping/wsdlencodedregistry.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\soap\mapping\wsdlencodedregistry.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/soap/mapping/wsdlliteralregistry.rb
$(RUBYLIBDIR)/ruby/1.8/soap/mapping/wsdlliteralregistry.rb: $(srcdir)/lib/ruby/1.8/soap/mapping/wsdlliteralregistry.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\soap\mapping\wsdlliteralregistry.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/1.8/soap/rpc
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/soap/rpc/cgistub.rb
$(RUBYLIBDIR)/ruby/1.8/soap/rpc/cgistub.rb: $(srcdir)/lib/ruby/1.8/soap/rpc/cgistub.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\soap\rpc\cgistub.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/soap/rpc/driver.rb
$(RUBYLIBDIR)/ruby/1.8/soap/rpc/driver.rb: $(srcdir)/lib/ruby/1.8/soap/rpc/driver.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\soap\rpc\driver.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/soap/rpc/element.rb
$(RUBYLIBDIR)/ruby/1.8/soap/rpc/element.rb: $(srcdir)/lib/ruby/1.8/soap/rpc/element.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\soap\rpc\element.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/soap/rpc/httpserver.rb
$(RUBYLIBDIR)/ruby/1.8/soap/rpc/httpserver.rb: $(srcdir)/lib/ruby/1.8/soap/rpc/httpserver.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\soap\rpc\httpserver.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/soap/rpc/proxy.rb
$(RUBYLIBDIR)/ruby/1.8/soap/rpc/proxy.rb: $(srcdir)/lib/ruby/1.8/soap/rpc/proxy.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\soap\rpc\proxy.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/soap/rpc/router.rb
$(RUBYLIBDIR)/ruby/1.8/soap/rpc/router.rb: $(srcdir)/lib/ruby/1.8/soap/rpc/router.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\soap\rpc\router.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/soap/rpc/rpc.rb
$(RUBYLIBDIR)/ruby/1.8/soap/rpc/rpc.rb: $(srcdir)/lib/ruby/1.8/soap/rpc/rpc.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\soap\rpc\rpc.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/soap/rpc/soaplet.rb
$(RUBYLIBDIR)/ruby/1.8/soap/rpc/soaplet.rb: $(srcdir)/lib/ruby/1.8/soap/rpc/soaplet.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\soap\rpc\soaplet.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/soap/rpc/standaloneServer.rb
$(RUBYLIBDIR)/ruby/1.8/soap/rpc/standaloneServer.rb: $(srcdir)/lib/ruby/1.8/soap/rpc/standaloneServer.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\soap\rpc\standaloneServer.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/1.8/test/unit
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/test/unit/assertionfailederror.rb
$(RUBYLIBDIR)/ruby/1.8/test/unit/assertionfailederror.rb: $(srcdir)/lib/ruby/1.8/test/unit/assertionfailederror.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\test\unit\assertionfailederror.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/test/unit/assertions.rb
$(RUBYLIBDIR)/ruby/1.8/test/unit/assertions.rb: $(srcdir)/lib/ruby/1.8/test/unit/assertions.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\test\unit\assertions.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/test/unit/autorunner.rb
$(RUBYLIBDIR)/ruby/1.8/test/unit/autorunner.rb: $(srcdir)/lib/ruby/1.8/test/unit/autorunner.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\test\unit\autorunner.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/test/unit/collector.rb
$(RUBYLIBDIR)/ruby/1.8/test/unit/collector.rb: $(srcdir)/lib/ruby/1.8/test/unit/collector.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\test\unit\collector.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/test/unit/error.rb
$(RUBYLIBDIR)/ruby/1.8/test/unit/error.rb: $(srcdir)/lib/ruby/1.8/test/unit/error.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\test\unit\error.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/test/unit/failure.rb
$(RUBYLIBDIR)/ruby/1.8/test/unit/failure.rb: $(srcdir)/lib/ruby/1.8/test/unit/failure.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\test\unit\failure.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/test/unit/testcase.rb
$(RUBYLIBDIR)/ruby/1.8/test/unit/testcase.rb: $(srcdir)/lib/ruby/1.8/test/unit/testcase.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\test\unit\testcase.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/test/unit/testresult.rb
$(RUBYLIBDIR)/ruby/1.8/test/unit/testresult.rb: $(srcdir)/lib/ruby/1.8/test/unit/testresult.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\test\unit\testresult.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/test/unit/testsuite.rb
$(RUBYLIBDIR)/ruby/1.8/test/unit/testsuite.rb: $(srcdir)/lib/ruby/1.8/test/unit/testsuite.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\test\unit\testsuite.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/1.8/test/unit/collector
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/test/unit/collector/dir.rb
$(RUBYLIBDIR)/ruby/1.8/test/unit/collector/dir.rb: $(srcdir)/lib/ruby/1.8/test/unit/collector/dir.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\test\unit\collector\dir.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/test/unit/collector/objectspace.rb
$(RUBYLIBDIR)/ruby/1.8/test/unit/collector/objectspace.rb: $(srcdir)/lib/ruby/1.8/test/unit/collector/objectspace.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\test\unit\collector\objectspace.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/1.8/test/unit/ui/console
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/test/unit/ui/console/testrunner.rb
$(RUBYLIBDIR)/ruby/1.8/test/unit/ui/console/testrunner.rb: $(srcdir)/lib/ruby/1.8/test/unit/ui/console/testrunner.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\test\unit\ui\console\testrunner.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/1.8/test/unit/ui/fox
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/test/unit/ui/fox/testrunner.rb
$(RUBYLIBDIR)/ruby/1.8/test/unit/ui/fox/testrunner.rb: $(srcdir)/lib/ruby/1.8/test/unit/ui/fox/testrunner.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\test\unit\ui\fox\testrunner.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/1.8/test/unit/ui/gtk
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/test/unit/ui/gtk/testrunner.rb
$(RUBYLIBDIR)/ruby/1.8/test/unit/ui/gtk/testrunner.rb: $(srcdir)/lib/ruby/1.8/test/unit/ui/gtk/testrunner.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\test\unit\ui\gtk\testrunner.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/1.8/test/unit/ui/gtk2
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/test/unit/ui/gtk2/testrunner.rb
$(RUBYLIBDIR)/ruby/1.8/test/unit/ui/gtk2/testrunner.rb: $(srcdir)/lib/ruby/1.8/test/unit/ui/gtk2/testrunner.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\test\unit\ui\gtk2\testrunner.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/1.8/test/unit/ui
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/test/unit/ui/testrunnermediator.rb
$(RUBYLIBDIR)/ruby/1.8/test/unit/ui/testrunnermediator.rb: $(srcdir)/lib/ruby/1.8/test/unit/ui/testrunnermediator.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\test\unit\ui\testrunnermediator.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/test/unit/ui/testrunnerutilities.rb
$(RUBYLIBDIR)/ruby/1.8/test/unit/ui/testrunnerutilities.rb: $(srcdir)/lib/ruby/1.8/test/unit/ui/testrunnerutilities.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\test\unit\ui\testrunnerutilities.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/1.8/test/unit/ui/tk
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/test/unit/ui/tk/testrunner.rb
$(RUBYLIBDIR)/ruby/1.8/test/unit/ui/tk/testrunner.rb: $(srcdir)/lib/ruby/1.8/test/unit/ui/tk/testrunner.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\test\unit\ui\tk\testrunner.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/1.8/test/unit/util
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/test/unit/util/backtracefilter.rb
$(RUBYLIBDIR)/ruby/1.8/test/unit/util/backtracefilter.rb: $(srcdir)/lib/ruby/1.8/test/unit/util/backtracefilter.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\test\unit\util\backtracefilter.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/test/unit/util/observable.rb
$(RUBYLIBDIR)/ruby/1.8/test/unit/util/observable.rb: $(srcdir)/lib/ruby/1.8/test/unit/util/observable.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\test\unit\util\observable.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/test/unit/util/procwrapper.rb
$(RUBYLIBDIR)/ruby/1.8/test/unit/util/procwrapper.rb: $(srcdir)/lib/ruby/1.8/test/unit/util/procwrapper.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\test\unit\util\procwrapper.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/1.8/test
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/test/unit.rb
$(RUBYLIBDIR)/ruby/1.8/test/unit.rb: $(srcdir)/lib/ruby/1.8/test/unit.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\test\unit.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tk
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tk/after.rb
$(RUBYLIBDIR)/ruby/1.8/tk/after.rb: $(srcdir)/lib/ruby/1.8/tk/after.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tk\after.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tk/autoload.rb
$(RUBYLIBDIR)/ruby/1.8/tk/autoload.rb: $(srcdir)/lib/ruby/1.8/tk/autoload.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tk\autoload.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tk/bgerror.rb
$(RUBYLIBDIR)/ruby/1.8/tk/bgerror.rb: $(srcdir)/lib/ruby/1.8/tk/bgerror.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tk\bgerror.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tk/bindtag.rb
$(RUBYLIBDIR)/ruby/1.8/tk/bindtag.rb: $(srcdir)/lib/ruby/1.8/tk/bindtag.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tk\bindtag.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tk/button.rb
$(RUBYLIBDIR)/ruby/1.8/tk/button.rb: $(srcdir)/lib/ruby/1.8/tk/button.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tk\button.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tk/canvas.rb
$(RUBYLIBDIR)/ruby/1.8/tk/canvas.rb: $(srcdir)/lib/ruby/1.8/tk/canvas.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tk\canvas.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tk/canvastag.rb
$(RUBYLIBDIR)/ruby/1.8/tk/canvastag.rb: $(srcdir)/lib/ruby/1.8/tk/canvastag.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tk\canvastag.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tk/checkbutton.rb
$(RUBYLIBDIR)/ruby/1.8/tk/checkbutton.rb: $(srcdir)/lib/ruby/1.8/tk/checkbutton.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tk\checkbutton.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tk/clipboard.rb
$(RUBYLIBDIR)/ruby/1.8/tk/clipboard.rb: $(srcdir)/lib/ruby/1.8/tk/clipboard.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tk\clipboard.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tk/clock.rb
$(RUBYLIBDIR)/ruby/1.8/tk/clock.rb: $(srcdir)/lib/ruby/1.8/tk/clock.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tk\clock.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tk/composite.rb
$(RUBYLIBDIR)/ruby/1.8/tk/composite.rb: $(srcdir)/lib/ruby/1.8/tk/composite.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tk\composite.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tk/console.rb
$(RUBYLIBDIR)/ruby/1.8/tk/console.rb: $(srcdir)/lib/ruby/1.8/tk/console.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tk\console.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tk/dialog.rb
$(RUBYLIBDIR)/ruby/1.8/tk/dialog.rb: $(srcdir)/lib/ruby/1.8/tk/dialog.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tk\dialog.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tk/encodedstr.rb
$(RUBYLIBDIR)/ruby/1.8/tk/encodedstr.rb: $(srcdir)/lib/ruby/1.8/tk/encodedstr.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tk\encodedstr.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tk/entry.rb
$(RUBYLIBDIR)/ruby/1.8/tk/entry.rb: $(srcdir)/lib/ruby/1.8/tk/entry.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tk\entry.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tk/event.rb
$(RUBYLIBDIR)/ruby/1.8/tk/event.rb: $(srcdir)/lib/ruby/1.8/tk/event.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tk\event.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tk/font.rb
$(RUBYLIBDIR)/ruby/1.8/tk/font.rb: $(srcdir)/lib/ruby/1.8/tk/font.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tk\font.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tk/frame.rb
$(RUBYLIBDIR)/ruby/1.8/tk/frame.rb: $(srcdir)/lib/ruby/1.8/tk/frame.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tk\frame.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tk/grid.rb
$(RUBYLIBDIR)/ruby/1.8/tk/grid.rb: $(srcdir)/lib/ruby/1.8/tk/grid.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tk\grid.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tk/image.rb
$(RUBYLIBDIR)/ruby/1.8/tk/image.rb: $(srcdir)/lib/ruby/1.8/tk/image.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tk\image.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tk/itemconfig.rb
$(RUBYLIBDIR)/ruby/1.8/tk/itemconfig.rb: $(srcdir)/lib/ruby/1.8/tk/itemconfig.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tk\itemconfig.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tk/itemfont.rb
$(RUBYLIBDIR)/ruby/1.8/tk/itemfont.rb: $(srcdir)/lib/ruby/1.8/tk/itemfont.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tk\itemfont.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tk/kinput.rb
$(RUBYLIBDIR)/ruby/1.8/tk/kinput.rb: $(srcdir)/lib/ruby/1.8/tk/kinput.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tk\kinput.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tk/label.rb
$(RUBYLIBDIR)/ruby/1.8/tk/label.rb: $(srcdir)/lib/ruby/1.8/tk/label.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tk\label.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tk/labelframe.rb
$(RUBYLIBDIR)/ruby/1.8/tk/labelframe.rb: $(srcdir)/lib/ruby/1.8/tk/labelframe.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tk\labelframe.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tk/listbox.rb
$(RUBYLIBDIR)/ruby/1.8/tk/listbox.rb: $(srcdir)/lib/ruby/1.8/tk/listbox.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tk\listbox.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tk/macpkg.rb
$(RUBYLIBDIR)/ruby/1.8/tk/macpkg.rb: $(srcdir)/lib/ruby/1.8/tk/macpkg.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tk\macpkg.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tk/menu.rb
$(RUBYLIBDIR)/ruby/1.8/tk/menu.rb: $(srcdir)/lib/ruby/1.8/tk/menu.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tk\menu.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tk/menubar.rb
$(RUBYLIBDIR)/ruby/1.8/tk/menubar.rb: $(srcdir)/lib/ruby/1.8/tk/menubar.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tk\menubar.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tk/menuspec.rb
$(RUBYLIBDIR)/ruby/1.8/tk/menuspec.rb: $(srcdir)/lib/ruby/1.8/tk/menuspec.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tk\menuspec.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tk/message.rb
$(RUBYLIBDIR)/ruby/1.8/tk/message.rb: $(srcdir)/lib/ruby/1.8/tk/message.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tk\message.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tk/mngfocus.rb
$(RUBYLIBDIR)/ruby/1.8/tk/mngfocus.rb: $(srcdir)/lib/ruby/1.8/tk/mngfocus.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tk\mngfocus.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tk/msgcat.rb
$(RUBYLIBDIR)/ruby/1.8/tk/msgcat.rb: $(srcdir)/lib/ruby/1.8/tk/msgcat.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tk\msgcat.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tk/namespace.rb
$(RUBYLIBDIR)/ruby/1.8/tk/namespace.rb: $(srcdir)/lib/ruby/1.8/tk/namespace.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tk\namespace.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tk/optiondb.rb
$(RUBYLIBDIR)/ruby/1.8/tk/optiondb.rb: $(srcdir)/lib/ruby/1.8/tk/optiondb.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tk\optiondb.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tk/optionobj.rb
$(RUBYLIBDIR)/ruby/1.8/tk/optionobj.rb: $(srcdir)/lib/ruby/1.8/tk/optionobj.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tk\optionobj.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tk/pack.rb
$(RUBYLIBDIR)/ruby/1.8/tk/pack.rb: $(srcdir)/lib/ruby/1.8/tk/pack.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tk\pack.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tk/package.rb
$(RUBYLIBDIR)/ruby/1.8/tk/package.rb: $(srcdir)/lib/ruby/1.8/tk/package.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tk\package.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tk/palette.rb
$(RUBYLIBDIR)/ruby/1.8/tk/palette.rb: $(srcdir)/lib/ruby/1.8/tk/palette.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tk\palette.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tk/panedwindow.rb
$(RUBYLIBDIR)/ruby/1.8/tk/panedwindow.rb: $(srcdir)/lib/ruby/1.8/tk/panedwindow.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tk\panedwindow.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tk/place.rb
$(RUBYLIBDIR)/ruby/1.8/tk/place.rb: $(srcdir)/lib/ruby/1.8/tk/place.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tk\place.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tk/radiobutton.rb
$(RUBYLIBDIR)/ruby/1.8/tk/radiobutton.rb: $(srcdir)/lib/ruby/1.8/tk/radiobutton.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tk\radiobutton.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tk/root.rb
$(RUBYLIBDIR)/ruby/1.8/tk/root.rb: $(srcdir)/lib/ruby/1.8/tk/root.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tk\root.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tk/scale.rb
$(RUBYLIBDIR)/ruby/1.8/tk/scale.rb: $(srcdir)/lib/ruby/1.8/tk/scale.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tk\scale.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tk/scrollable.rb
$(RUBYLIBDIR)/ruby/1.8/tk/scrollable.rb: $(srcdir)/lib/ruby/1.8/tk/scrollable.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tk\scrollable.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tk/scrollbar.rb
$(RUBYLIBDIR)/ruby/1.8/tk/scrollbar.rb: $(srcdir)/lib/ruby/1.8/tk/scrollbar.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tk\scrollbar.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tk/scrollbox.rb
$(RUBYLIBDIR)/ruby/1.8/tk/scrollbox.rb: $(srcdir)/lib/ruby/1.8/tk/scrollbox.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tk\scrollbox.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tk/selection.rb
$(RUBYLIBDIR)/ruby/1.8/tk/selection.rb: $(srcdir)/lib/ruby/1.8/tk/selection.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tk\selection.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tk/spinbox.rb
$(RUBYLIBDIR)/ruby/1.8/tk/spinbox.rb: $(srcdir)/lib/ruby/1.8/tk/spinbox.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tk\spinbox.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tk/tagfont.rb
$(RUBYLIBDIR)/ruby/1.8/tk/tagfont.rb: $(srcdir)/lib/ruby/1.8/tk/tagfont.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tk\tagfont.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tk/text.rb
$(RUBYLIBDIR)/ruby/1.8/tk/text.rb: $(srcdir)/lib/ruby/1.8/tk/text.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tk\text.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tk/textimage.rb
$(RUBYLIBDIR)/ruby/1.8/tk/textimage.rb: $(srcdir)/lib/ruby/1.8/tk/textimage.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tk\textimage.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tk/textmark.rb
$(RUBYLIBDIR)/ruby/1.8/tk/textmark.rb: $(srcdir)/lib/ruby/1.8/tk/textmark.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tk\textmark.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tk/texttag.rb
$(RUBYLIBDIR)/ruby/1.8/tk/texttag.rb: $(srcdir)/lib/ruby/1.8/tk/texttag.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tk\texttag.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tk/textwindow.rb
$(RUBYLIBDIR)/ruby/1.8/tk/textwindow.rb: $(srcdir)/lib/ruby/1.8/tk/textwindow.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tk\textwindow.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tk/timer.rb
$(RUBYLIBDIR)/ruby/1.8/tk/timer.rb: $(srcdir)/lib/ruby/1.8/tk/timer.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tk\timer.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tk/toplevel.rb
$(RUBYLIBDIR)/ruby/1.8/tk/toplevel.rb: $(srcdir)/lib/ruby/1.8/tk/toplevel.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tk\toplevel.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tk/txtwin_abst.rb
$(RUBYLIBDIR)/ruby/1.8/tk/txtwin_abst.rb: $(srcdir)/lib/ruby/1.8/tk/txtwin_abst.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tk\txtwin_abst.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tk/validation.rb
$(RUBYLIBDIR)/ruby/1.8/tk/validation.rb: $(srcdir)/lib/ruby/1.8/tk/validation.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tk\validation.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tk/variable.rb
$(RUBYLIBDIR)/ruby/1.8/tk/variable.rb: $(srcdir)/lib/ruby/1.8/tk/variable.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tk\variable.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tk/virtevent.rb
$(RUBYLIBDIR)/ruby/1.8/tk/virtevent.rb: $(srcdir)/lib/ruby/1.8/tk/virtevent.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tk\virtevent.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tk/winfo.rb
$(RUBYLIBDIR)/ruby/1.8/tk/winfo.rb: $(srcdir)/lib/ruby/1.8/tk/winfo.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tk\winfo.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tk/winpkg.rb
$(RUBYLIBDIR)/ruby/1.8/tk/winpkg.rb: $(srcdir)/lib/ruby/1.8/tk/winpkg.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tk\winpkg.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tk/wm.rb
$(RUBYLIBDIR)/ruby/1.8/tk/wm.rb: $(srcdir)/lib/ruby/1.8/tk/wm.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tk\wm.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tk/xim.rb
$(RUBYLIBDIR)/ruby/1.8/tk/xim.rb: $(srcdir)/lib/ruby/1.8/tk/xim.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tk\xim.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/blt
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/blt/barchart.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/blt/barchart.rb: $(srcdir)/lib/ruby/1.8/tkextlib/blt/barchart.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\blt\barchart.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/blt/bitmap.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/blt/bitmap.rb: $(srcdir)/lib/ruby/1.8/tkextlib/blt/bitmap.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\blt\bitmap.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/blt/busy.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/blt/busy.rb: $(srcdir)/lib/ruby/1.8/tkextlib/blt/busy.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\blt\busy.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/blt/component.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/blt/component.rb: $(srcdir)/lib/ruby/1.8/tkextlib/blt/component.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\blt\component.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/blt/container.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/blt/container.rb: $(srcdir)/lib/ruby/1.8/tkextlib/blt/container.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\blt\container.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/blt/cutbuffer.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/blt/cutbuffer.rb: $(srcdir)/lib/ruby/1.8/tkextlib/blt/cutbuffer.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\blt\cutbuffer.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/blt/dragdrop.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/blt/dragdrop.rb: $(srcdir)/lib/ruby/1.8/tkextlib/blt/dragdrop.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\blt\dragdrop.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/blt/eps.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/blt/eps.rb: $(srcdir)/lib/ruby/1.8/tkextlib/blt/eps.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\blt\eps.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/blt/graph.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/blt/graph.rb: $(srcdir)/lib/ruby/1.8/tkextlib/blt/graph.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\blt\graph.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/blt/htext.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/blt/htext.rb: $(srcdir)/lib/ruby/1.8/tkextlib/blt/htext.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\blt\htext.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/blt/setup.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/blt/setup.rb: $(srcdir)/lib/ruby/1.8/tkextlib/blt/setup.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\blt\setup.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/blt/spline.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/blt/spline.rb: $(srcdir)/lib/ruby/1.8/tkextlib/blt/spline.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\blt\spline.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/blt/stripchart.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/blt/stripchart.rb: $(srcdir)/lib/ruby/1.8/tkextlib/blt/stripchart.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\blt\stripchart.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/blt/table.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/blt/table.rb: $(srcdir)/lib/ruby/1.8/tkextlib/blt/table.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\blt\table.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/blt/tabnotebook.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/blt/tabnotebook.rb: $(srcdir)/lib/ruby/1.8/tkextlib/blt/tabnotebook.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\blt\tabnotebook.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/blt/tabset.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/blt/tabset.rb: $(srcdir)/lib/ruby/1.8/tkextlib/blt/tabset.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\blt\tabset.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/blt/ted.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/blt/ted.rb: $(srcdir)/lib/ruby/1.8/tkextlib/blt/ted.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\blt\ted.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/blt/tile.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/blt/tile.rb: $(srcdir)/lib/ruby/1.8/tkextlib/blt/tile.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\blt\tile.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/blt/tree.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/blt/tree.rb: $(srcdir)/lib/ruby/1.8/tkextlib/blt/tree.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\blt\tree.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/blt/treeview.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/blt/treeview.rb: $(srcdir)/lib/ruby/1.8/tkextlib/blt/treeview.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\blt\treeview.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/blt/unix_dnd.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/blt/unix_dnd.rb: $(srcdir)/lib/ruby/1.8/tkextlib/blt/unix_dnd.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\blt\unix_dnd.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/blt/vector.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/blt/vector.rb: $(srcdir)/lib/ruby/1.8/tkextlib/blt/vector.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\blt\vector.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/blt/watch.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/blt/watch.rb: $(srcdir)/lib/ruby/1.8/tkextlib/blt/watch.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\blt\watch.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/blt/winop.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/blt/winop.rb: $(srcdir)/lib/ruby/1.8/tkextlib/blt/winop.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\blt\winop.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/blt/win_printer.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/blt/win_printer.rb: $(srcdir)/lib/ruby/1.8/tkextlib/blt/win_printer.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\blt\win_printer.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/blt/tile
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/blt/tile/button.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/blt/tile/button.rb: $(srcdir)/lib/ruby/1.8/tkextlib/blt/tile/button.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\blt\tile\button.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/blt/tile/checkbutton.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/blt/tile/checkbutton.rb: $(srcdir)/lib/ruby/1.8/tkextlib/blt/tile/checkbutton.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\blt\tile\checkbutton.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/blt/tile/frame.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/blt/tile/frame.rb: $(srcdir)/lib/ruby/1.8/tkextlib/blt/tile/frame.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\blt\tile\frame.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/blt/tile/label.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/blt/tile/label.rb: $(srcdir)/lib/ruby/1.8/tkextlib/blt/tile/label.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\blt\tile\label.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/blt/tile/radiobutton.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/blt/tile/radiobutton.rb: $(srcdir)/lib/ruby/1.8/tkextlib/blt/tile/radiobutton.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\blt\tile\radiobutton.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/blt/tile/scrollbar.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/blt/tile/scrollbar.rb: $(srcdir)/lib/ruby/1.8/tkextlib/blt/tile/scrollbar.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\blt\tile\scrollbar.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/blt/tile/toplevel.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/blt/tile/toplevel.rb: $(srcdir)/lib/ruby/1.8/tkextlib/blt/tile/toplevel.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\blt\tile\toplevel.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/blt.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/blt.rb: $(srcdir)/lib/ruby/1.8/tkextlib/blt.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\blt.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/bwidget.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/bwidget.rb: $(srcdir)/lib/ruby/1.8/tkextlib/bwidget.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\bwidget.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/ICONS.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/ICONS.rb: $(srcdir)/lib/ruby/1.8/tkextlib/ICONS.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\ICONS.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/itcl.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/itcl.rb: $(srcdir)/lib/ruby/1.8/tkextlib/itcl.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\itcl.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/itk.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/itk.rb: $(srcdir)/lib/ruby/1.8/tkextlib/itk.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\itk.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/iwidgets.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/iwidgets.rb: $(srcdir)/lib/ruby/1.8/tkextlib/iwidgets.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\iwidgets.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/pkg_checker.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/pkg_checker.rb: $(srcdir)/lib/ruby/1.8/tkextlib/pkg_checker.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\pkg_checker.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/setup.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/setup.rb: $(srcdir)/lib/ruby/1.8/tkextlib/setup.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\setup.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/tcllib.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/tcllib.rb: $(srcdir)/lib/ruby/1.8/tkextlib/tcllib.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\tcllib.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/tclx.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/tclx.rb: $(srcdir)/lib/ruby/1.8/tkextlib/tclx.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\tclx.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/tile.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/tile.rb: $(srcdir)/lib/ruby/1.8/tkextlib/tile.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\tile.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/tkDND.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/tkDND.rb: $(srcdir)/lib/ruby/1.8/tkextlib/tkDND.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\tkDND.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/tkHTML.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/tkHTML.rb: $(srcdir)/lib/ruby/1.8/tkextlib/tkHTML.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\tkHTML.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/tkimg.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/tkimg.rb: $(srcdir)/lib/ruby/1.8/tkextlib/tkimg.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\tkimg.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/tktable.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/tktable.rb: $(srcdir)/lib/ruby/1.8/tkextlib/tktable.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\tktable.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/tktrans.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/tktrans.rb: $(srcdir)/lib/ruby/1.8/tkextlib/tktrans.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\tktrans.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/treectrl.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/treectrl.rb: $(srcdir)/lib/ruby/1.8/tkextlib/treectrl.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\treectrl.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/trofs.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/trofs.rb: $(srcdir)/lib/ruby/1.8/tkextlib/trofs.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\trofs.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/version.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/version.rb: $(srcdir)/lib/ruby/1.8/tkextlib/version.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\version.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/vu.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/vu.rb: $(srcdir)/lib/ruby/1.8/tkextlib/vu.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\vu.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/winico.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/winico.rb: $(srcdir)/lib/ruby/1.8/tkextlib/winico.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\winico.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/bwidget
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/bwidget/arrowbutton.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/bwidget/arrowbutton.rb: $(srcdir)/lib/ruby/1.8/tkextlib/bwidget/arrowbutton.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\bwidget\arrowbutton.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/bwidget/bitmap.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/bwidget/bitmap.rb: $(srcdir)/lib/ruby/1.8/tkextlib/bwidget/bitmap.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\bwidget\bitmap.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/bwidget/button.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/bwidget/button.rb: $(srcdir)/lib/ruby/1.8/tkextlib/bwidget/button.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\bwidget\button.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/bwidget/buttonbox.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/bwidget/buttonbox.rb: $(srcdir)/lib/ruby/1.8/tkextlib/bwidget/buttonbox.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\bwidget\buttonbox.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/bwidget/combobox.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/bwidget/combobox.rb: $(srcdir)/lib/ruby/1.8/tkextlib/bwidget/combobox.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\bwidget\combobox.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/bwidget/dialog.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/bwidget/dialog.rb: $(srcdir)/lib/ruby/1.8/tkextlib/bwidget/dialog.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\bwidget\dialog.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/bwidget/dragsite.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/bwidget/dragsite.rb: $(srcdir)/lib/ruby/1.8/tkextlib/bwidget/dragsite.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\bwidget\dragsite.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/bwidget/dropsite.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/bwidget/dropsite.rb: $(srcdir)/lib/ruby/1.8/tkextlib/bwidget/dropsite.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\bwidget\dropsite.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/bwidget/dynamichelp.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/bwidget/dynamichelp.rb: $(srcdir)/lib/ruby/1.8/tkextlib/bwidget/dynamichelp.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\bwidget\dynamichelp.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/bwidget/entry.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/bwidget/entry.rb: $(srcdir)/lib/ruby/1.8/tkextlib/bwidget/entry.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\bwidget\entry.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/bwidget/label.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/bwidget/label.rb: $(srcdir)/lib/ruby/1.8/tkextlib/bwidget/label.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\bwidget\label.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/bwidget/labelentry.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/bwidget/labelentry.rb: $(srcdir)/lib/ruby/1.8/tkextlib/bwidget/labelentry.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\bwidget\labelentry.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/bwidget/labelframe.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/bwidget/labelframe.rb: $(srcdir)/lib/ruby/1.8/tkextlib/bwidget/labelframe.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\bwidget\labelframe.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/bwidget/listbox.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/bwidget/listbox.rb: $(srcdir)/lib/ruby/1.8/tkextlib/bwidget/listbox.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\bwidget\listbox.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/bwidget/mainframe.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/bwidget/mainframe.rb: $(srcdir)/lib/ruby/1.8/tkextlib/bwidget/mainframe.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\bwidget\mainframe.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/bwidget/messagedlg.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/bwidget/messagedlg.rb: $(srcdir)/lib/ruby/1.8/tkextlib/bwidget/messagedlg.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\bwidget\messagedlg.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/bwidget/notebook.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/bwidget/notebook.rb: $(srcdir)/lib/ruby/1.8/tkextlib/bwidget/notebook.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\bwidget\notebook.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/bwidget/pagesmanager.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/bwidget/pagesmanager.rb: $(srcdir)/lib/ruby/1.8/tkextlib/bwidget/pagesmanager.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\bwidget\pagesmanager.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/bwidget/panedwindow.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/bwidget/panedwindow.rb: $(srcdir)/lib/ruby/1.8/tkextlib/bwidget/panedwindow.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\bwidget\panedwindow.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/bwidget/panelframe.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/bwidget/panelframe.rb: $(srcdir)/lib/ruby/1.8/tkextlib/bwidget/panelframe.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\bwidget\panelframe.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/bwidget/passwddlg.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/bwidget/passwddlg.rb: $(srcdir)/lib/ruby/1.8/tkextlib/bwidget/passwddlg.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\bwidget\passwddlg.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/bwidget/progressbar.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/bwidget/progressbar.rb: $(srcdir)/lib/ruby/1.8/tkextlib/bwidget/progressbar.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\bwidget\progressbar.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/bwidget/progressdlg.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/bwidget/progressdlg.rb: $(srcdir)/lib/ruby/1.8/tkextlib/bwidget/progressdlg.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\bwidget\progressdlg.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/bwidget/scrollableframe.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/bwidget/scrollableframe.rb: $(srcdir)/lib/ruby/1.8/tkextlib/bwidget/scrollableframe.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\bwidget\scrollableframe.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/bwidget/scrolledwindow.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/bwidget/scrolledwindow.rb: $(srcdir)/lib/ruby/1.8/tkextlib/bwidget/scrolledwindow.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\bwidget\scrolledwindow.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/bwidget/scrollview.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/bwidget/scrollview.rb: $(srcdir)/lib/ruby/1.8/tkextlib/bwidget/scrollview.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\bwidget\scrollview.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/bwidget/selectcolor.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/bwidget/selectcolor.rb: $(srcdir)/lib/ruby/1.8/tkextlib/bwidget/selectcolor.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\bwidget\selectcolor.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/bwidget/selectfont.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/bwidget/selectfont.rb: $(srcdir)/lib/ruby/1.8/tkextlib/bwidget/selectfont.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\bwidget\selectfont.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/bwidget/separator.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/bwidget/separator.rb: $(srcdir)/lib/ruby/1.8/tkextlib/bwidget/separator.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\bwidget\separator.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/bwidget/setup.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/bwidget/setup.rb: $(srcdir)/lib/ruby/1.8/tkextlib/bwidget/setup.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\bwidget\setup.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/bwidget/spinbox.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/bwidget/spinbox.rb: $(srcdir)/lib/ruby/1.8/tkextlib/bwidget/spinbox.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\bwidget\spinbox.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/bwidget/statusbar.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/bwidget/statusbar.rb: $(srcdir)/lib/ruby/1.8/tkextlib/bwidget/statusbar.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\bwidget\statusbar.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/bwidget/titleframe.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/bwidget/titleframe.rb: $(srcdir)/lib/ruby/1.8/tkextlib/bwidget/titleframe.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\bwidget\titleframe.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/bwidget/tree.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/bwidget/tree.rb: $(srcdir)/lib/ruby/1.8/tkextlib/bwidget/tree.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\bwidget\tree.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/bwidget/widget.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/bwidget/widget.rb: $(srcdir)/lib/ruby/1.8/tkextlib/bwidget/widget.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\bwidget\widget.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/ICONS
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/ICONS/icons.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/ICONS/icons.rb: $(srcdir)/lib/ruby/1.8/tkextlib/ICONS/icons.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\ICONS\icons.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/ICONS/setup.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/ICONS/setup.rb: $(srcdir)/lib/ruby/1.8/tkextlib/ICONS/setup.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\ICONS\setup.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/itcl
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/itcl/incr_tcl.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/itcl/incr_tcl.rb: $(srcdir)/lib/ruby/1.8/tkextlib/itcl/incr_tcl.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\itcl\incr_tcl.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/itcl/setup.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/itcl/setup.rb: $(srcdir)/lib/ruby/1.8/tkextlib/itcl/setup.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\itcl\setup.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/itk
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/itk/incr_tk.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/itk/incr_tk.rb: $(srcdir)/lib/ruby/1.8/tkextlib/itk/incr_tk.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\itk\incr_tk.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/itk/setup.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/itk/setup.rb: $(srcdir)/lib/ruby/1.8/tkextlib/itk/setup.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\itk\setup.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/iwidgets
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/iwidgets/buttonbox.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/iwidgets/buttonbox.rb: $(srcdir)/lib/ruby/1.8/tkextlib/iwidgets/buttonbox.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\iwidgets\buttonbox.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/iwidgets/calendar.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/iwidgets/calendar.rb: $(srcdir)/lib/ruby/1.8/tkextlib/iwidgets/calendar.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\iwidgets\calendar.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/iwidgets/canvasprintbox.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/iwidgets/canvasprintbox.rb: $(srcdir)/lib/ruby/1.8/tkextlib/iwidgets/canvasprintbox.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\iwidgets\canvasprintbox.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/iwidgets/canvasprintdialog.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/iwidgets/canvasprintdialog.rb: $(srcdir)/lib/ruby/1.8/tkextlib/iwidgets/canvasprintdialog.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\iwidgets\canvasprintdialog.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/iwidgets/checkbox.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/iwidgets/checkbox.rb: $(srcdir)/lib/ruby/1.8/tkextlib/iwidgets/checkbox.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\iwidgets\checkbox.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/iwidgets/combobox.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/iwidgets/combobox.rb: $(srcdir)/lib/ruby/1.8/tkextlib/iwidgets/combobox.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\iwidgets\combobox.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/iwidgets/dateentry.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/iwidgets/dateentry.rb: $(srcdir)/lib/ruby/1.8/tkextlib/iwidgets/dateentry.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\iwidgets\dateentry.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/iwidgets/datefield.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/iwidgets/datefield.rb: $(srcdir)/lib/ruby/1.8/tkextlib/iwidgets/datefield.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\iwidgets\datefield.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/iwidgets/dialog.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/iwidgets/dialog.rb: $(srcdir)/lib/ruby/1.8/tkextlib/iwidgets/dialog.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\iwidgets\dialog.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/iwidgets/dialogshell.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/iwidgets/dialogshell.rb: $(srcdir)/lib/ruby/1.8/tkextlib/iwidgets/dialogshell.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\iwidgets\dialogshell.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/iwidgets/disjointlistbox.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/iwidgets/disjointlistbox.rb: $(srcdir)/lib/ruby/1.8/tkextlib/iwidgets/disjointlistbox.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\iwidgets\disjointlistbox.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/iwidgets/entryfield.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/iwidgets/entryfield.rb: $(srcdir)/lib/ruby/1.8/tkextlib/iwidgets/entryfield.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\iwidgets\entryfield.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/iwidgets/extbutton.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/iwidgets/extbutton.rb: $(srcdir)/lib/ruby/1.8/tkextlib/iwidgets/extbutton.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\iwidgets\extbutton.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/iwidgets/extfileselectionbox.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/iwidgets/extfileselectionbox.rb: $(srcdir)/lib/ruby/1.8/tkextlib/iwidgets/extfileselectionbox.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\iwidgets\extfileselectionbox.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/iwidgets/extfileselectiondialog.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/iwidgets/extfileselectiondialog.rb: $(srcdir)/lib/ruby/1.8/tkextlib/iwidgets/extfileselectiondialog.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\iwidgets\extfileselectiondialog.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/iwidgets/feedback.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/iwidgets/feedback.rb: $(srcdir)/lib/ruby/1.8/tkextlib/iwidgets/feedback.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\iwidgets\feedback.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/iwidgets/fileselectionbox.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/iwidgets/fileselectionbox.rb: $(srcdir)/lib/ruby/1.8/tkextlib/iwidgets/fileselectionbox.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\iwidgets\fileselectionbox.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/iwidgets/fileselectiondialog.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/iwidgets/fileselectiondialog.rb: $(srcdir)/lib/ruby/1.8/tkextlib/iwidgets/fileselectiondialog.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\iwidgets\fileselectiondialog.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/iwidgets/finddialog.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/iwidgets/finddialog.rb: $(srcdir)/lib/ruby/1.8/tkextlib/iwidgets/finddialog.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\iwidgets\finddialog.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/iwidgets/hierarchy.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/iwidgets/hierarchy.rb: $(srcdir)/lib/ruby/1.8/tkextlib/iwidgets/hierarchy.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\iwidgets\hierarchy.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/iwidgets/hyperhelp.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/iwidgets/hyperhelp.rb: $(srcdir)/lib/ruby/1.8/tkextlib/iwidgets/hyperhelp.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\iwidgets\hyperhelp.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/iwidgets/labeledframe.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/iwidgets/labeledframe.rb: $(srcdir)/lib/ruby/1.8/tkextlib/iwidgets/labeledframe.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\iwidgets\labeledframe.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/iwidgets/labeledwidget.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/iwidgets/labeledwidget.rb: $(srcdir)/lib/ruby/1.8/tkextlib/iwidgets/labeledwidget.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\iwidgets\labeledwidget.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/iwidgets/mainwindow.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/iwidgets/mainwindow.rb: $(srcdir)/lib/ruby/1.8/tkextlib/iwidgets/mainwindow.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\iwidgets\mainwindow.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/iwidgets/menubar.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/iwidgets/menubar.rb: $(srcdir)/lib/ruby/1.8/tkextlib/iwidgets/menubar.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\iwidgets\menubar.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/iwidgets/messagebox.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/iwidgets/messagebox.rb: $(srcdir)/lib/ruby/1.8/tkextlib/iwidgets/messagebox.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\iwidgets\messagebox.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/iwidgets/messagedialog.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/iwidgets/messagedialog.rb: $(srcdir)/lib/ruby/1.8/tkextlib/iwidgets/messagedialog.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\iwidgets\messagedialog.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/iwidgets/notebook.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/iwidgets/notebook.rb: $(srcdir)/lib/ruby/1.8/tkextlib/iwidgets/notebook.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\iwidgets\notebook.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/iwidgets/optionmenu.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/iwidgets/optionmenu.rb: $(srcdir)/lib/ruby/1.8/tkextlib/iwidgets/optionmenu.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\iwidgets\optionmenu.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/iwidgets/panedwindow.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/iwidgets/panedwindow.rb: $(srcdir)/lib/ruby/1.8/tkextlib/iwidgets/panedwindow.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\iwidgets\panedwindow.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/iwidgets/promptdialog.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/iwidgets/promptdialog.rb: $(srcdir)/lib/ruby/1.8/tkextlib/iwidgets/promptdialog.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\iwidgets\promptdialog.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/iwidgets/pushbutton.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/iwidgets/pushbutton.rb: $(srcdir)/lib/ruby/1.8/tkextlib/iwidgets/pushbutton.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\iwidgets\pushbutton.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/iwidgets/radiobox.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/iwidgets/radiobox.rb: $(srcdir)/lib/ruby/1.8/tkextlib/iwidgets/radiobox.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\iwidgets\radiobox.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/iwidgets/scopedobject.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/iwidgets/scopedobject.rb: $(srcdir)/lib/ruby/1.8/tkextlib/iwidgets/scopedobject.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\iwidgets\scopedobject.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/iwidgets/scrolledcanvas.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/iwidgets/scrolledcanvas.rb: $(srcdir)/lib/ruby/1.8/tkextlib/iwidgets/scrolledcanvas.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\iwidgets\scrolledcanvas.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/iwidgets/scrolledframe.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/iwidgets/scrolledframe.rb: $(srcdir)/lib/ruby/1.8/tkextlib/iwidgets/scrolledframe.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\iwidgets\scrolledframe.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/iwidgets/scrolledhtml.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/iwidgets/scrolledhtml.rb: $(srcdir)/lib/ruby/1.8/tkextlib/iwidgets/scrolledhtml.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\iwidgets\scrolledhtml.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/iwidgets/scrolledlistbox.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/iwidgets/scrolledlistbox.rb: $(srcdir)/lib/ruby/1.8/tkextlib/iwidgets/scrolledlistbox.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\iwidgets\scrolledlistbox.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/iwidgets/scrolledtext.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/iwidgets/scrolledtext.rb: $(srcdir)/lib/ruby/1.8/tkextlib/iwidgets/scrolledtext.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\iwidgets\scrolledtext.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/iwidgets/scrolledwidget.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/iwidgets/scrolledwidget.rb: $(srcdir)/lib/ruby/1.8/tkextlib/iwidgets/scrolledwidget.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\iwidgets\scrolledwidget.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/iwidgets/selectionbox.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/iwidgets/selectionbox.rb: $(srcdir)/lib/ruby/1.8/tkextlib/iwidgets/selectionbox.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\iwidgets\selectionbox.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/iwidgets/selectiondialog.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/iwidgets/selectiondialog.rb: $(srcdir)/lib/ruby/1.8/tkextlib/iwidgets/selectiondialog.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\iwidgets\selectiondialog.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/iwidgets/setup.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/iwidgets/setup.rb: $(srcdir)/lib/ruby/1.8/tkextlib/iwidgets/setup.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\iwidgets\setup.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/iwidgets/shell.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/iwidgets/shell.rb: $(srcdir)/lib/ruby/1.8/tkextlib/iwidgets/shell.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\iwidgets\shell.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/iwidgets/spindate.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/iwidgets/spindate.rb: $(srcdir)/lib/ruby/1.8/tkextlib/iwidgets/spindate.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\iwidgets\spindate.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/iwidgets/spinint.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/iwidgets/spinint.rb: $(srcdir)/lib/ruby/1.8/tkextlib/iwidgets/spinint.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\iwidgets\spinint.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/iwidgets/spinner.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/iwidgets/spinner.rb: $(srcdir)/lib/ruby/1.8/tkextlib/iwidgets/spinner.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\iwidgets\spinner.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/iwidgets/spintime.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/iwidgets/spintime.rb: $(srcdir)/lib/ruby/1.8/tkextlib/iwidgets/spintime.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\iwidgets\spintime.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/iwidgets/tabnotebook.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/iwidgets/tabnotebook.rb: $(srcdir)/lib/ruby/1.8/tkextlib/iwidgets/tabnotebook.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\iwidgets\tabnotebook.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/iwidgets/tabset.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/iwidgets/tabset.rb: $(srcdir)/lib/ruby/1.8/tkextlib/iwidgets/tabset.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\iwidgets\tabset.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/iwidgets/timeentry.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/iwidgets/timeentry.rb: $(srcdir)/lib/ruby/1.8/tkextlib/iwidgets/timeentry.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\iwidgets\timeentry.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/iwidgets/timefield.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/iwidgets/timefield.rb: $(srcdir)/lib/ruby/1.8/tkextlib/iwidgets/timefield.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\iwidgets\timefield.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/iwidgets/toolbar.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/iwidgets/toolbar.rb: $(srcdir)/lib/ruby/1.8/tkextlib/iwidgets/toolbar.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\iwidgets\toolbar.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/iwidgets/watch.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/iwidgets/watch.rb: $(srcdir)/lib/ruby/1.8/tkextlib/iwidgets/watch.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\iwidgets\watch.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/tcllib
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/tcllib/autoscroll.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/tcllib/autoscroll.rb: $(srcdir)/lib/ruby/1.8/tkextlib/tcllib/autoscroll.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\tcllib\autoscroll.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/tcllib/ctext.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/tcllib/ctext.rb: $(srcdir)/lib/ruby/1.8/tkextlib/tcllib/ctext.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\tcllib\ctext.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/tcllib/cursor.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/tcllib/cursor.rb: $(srcdir)/lib/ruby/1.8/tkextlib/tcllib/cursor.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\tcllib\cursor.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/tcllib/datefield.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/tcllib/datefield.rb: $(srcdir)/lib/ruby/1.8/tkextlib/tcllib/datefield.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\tcllib\datefield.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/tcllib/dialog.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/tcllib/dialog.rb: $(srcdir)/lib/ruby/1.8/tkextlib/tcllib/dialog.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\tcllib\dialog.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/tcllib/getstring.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/tcllib/getstring.rb: $(srcdir)/lib/ruby/1.8/tkextlib/tcllib/getstring.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\tcllib\getstring.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/tcllib/history.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/tcllib/history.rb: $(srcdir)/lib/ruby/1.8/tkextlib/tcllib/history.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\tcllib\history.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/tcllib/ico.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/tcllib/ico.rb: $(srcdir)/lib/ruby/1.8/tkextlib/tcllib/ico.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\tcllib\ico.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/tcllib/ip_entry.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/tcllib/ip_entry.rb: $(srcdir)/lib/ruby/1.8/tkextlib/tcllib/ip_entry.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\tcllib\ip_entry.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/tcllib/panelframe.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/tcllib/panelframe.rb: $(srcdir)/lib/ruby/1.8/tkextlib/tcllib/panelframe.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\tcllib\panelframe.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/tcllib/plotchart.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/tcllib/plotchart.rb: $(srcdir)/lib/ruby/1.8/tkextlib/tcllib/plotchart.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\tcllib\plotchart.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/tcllib/ruler.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/tcllib/ruler.rb: $(srcdir)/lib/ruby/1.8/tkextlib/tcllib/ruler.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\tcllib\ruler.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/tcllib/screenruler.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/tcllib/screenruler.rb: $(srcdir)/lib/ruby/1.8/tkextlib/tcllib/screenruler.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\tcllib\screenruler.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/tcllib/scrollwin.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/tcllib/scrollwin.rb: $(srcdir)/lib/ruby/1.8/tkextlib/tcllib/scrollwin.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\tcllib\scrollwin.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/tcllib/setup.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/tcllib/setup.rb: $(srcdir)/lib/ruby/1.8/tkextlib/tcllib/setup.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\tcllib\setup.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/tcllib/style.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/tcllib/style.rb: $(srcdir)/lib/ruby/1.8/tkextlib/tcllib/style.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\tcllib\style.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/tcllib/superframe.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/tcllib/superframe.rb: $(srcdir)/lib/ruby/1.8/tkextlib/tcllib/superframe.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\tcllib\superframe.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/tcllib/swaplist.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/tcllib/swaplist.rb: $(srcdir)/lib/ruby/1.8/tkextlib/tcllib/swaplist.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\tcllib\swaplist.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/tcllib/tablelist.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/tcllib/tablelist.rb: $(srcdir)/lib/ruby/1.8/tkextlib/tcllib/tablelist.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\tcllib\tablelist.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/tcllib/tablelist_core.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/tcllib/tablelist_core.rb: $(srcdir)/lib/ruby/1.8/tkextlib/tcllib/tablelist_core.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\tcllib\tablelist_core.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/tcllib/tablelist_tile.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/tcllib/tablelist_tile.rb: $(srcdir)/lib/ruby/1.8/tkextlib/tcllib/tablelist_tile.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\tcllib\tablelist_tile.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/tcllib/tkpiechart.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/tcllib/tkpiechart.rb: $(srcdir)/lib/ruby/1.8/tkextlib/tcllib/tkpiechart.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\tcllib\tkpiechart.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/tcllib/tooltip.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/tcllib/tooltip.rb: $(srcdir)/lib/ruby/1.8/tkextlib/tcllib/tooltip.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\tcllib\tooltip.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/tcllib/widget.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/tcllib/widget.rb: $(srcdir)/lib/ruby/1.8/tkextlib/tcllib/widget.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\tcllib\widget.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/tclx
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/tclx/setup.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/tclx/setup.rb: $(srcdir)/lib/ruby/1.8/tkextlib/tclx/setup.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\tclx\setup.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/tclx/tclx.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/tclx/tclx.rb: $(srcdir)/lib/ruby/1.8/tkextlib/tclx/tclx.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\tclx\tclx.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/tile
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/tile/dialog.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/tile/dialog.rb: $(srcdir)/lib/ruby/1.8/tkextlib/tile/dialog.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\tile\dialog.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/tile/setup.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/tile/setup.rb: $(srcdir)/lib/ruby/1.8/tkextlib/tile/setup.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\tile\setup.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/tile/sizegrip.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/tile/sizegrip.rb: $(srcdir)/lib/ruby/1.8/tkextlib/tile/sizegrip.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\tile\sizegrip.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/tile/style.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/tile/style.rb: $(srcdir)/lib/ruby/1.8/tkextlib/tile/style.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\tile\style.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/tile/tbutton.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/tile/tbutton.rb: $(srcdir)/lib/ruby/1.8/tkextlib/tile/tbutton.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\tile\tbutton.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/tile/tcheckbutton.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/tile/tcheckbutton.rb: $(srcdir)/lib/ruby/1.8/tkextlib/tile/tcheckbutton.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\tile\tcheckbutton.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/tile/tcombobox.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/tile/tcombobox.rb: $(srcdir)/lib/ruby/1.8/tkextlib/tile/tcombobox.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\tile\tcombobox.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/tile/tentry.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/tile/tentry.rb: $(srcdir)/lib/ruby/1.8/tkextlib/tile/tentry.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\tile\tentry.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/tile/tframe.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/tile/tframe.rb: $(srcdir)/lib/ruby/1.8/tkextlib/tile/tframe.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\tile\tframe.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/tile/tlabel.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/tile/tlabel.rb: $(srcdir)/lib/ruby/1.8/tkextlib/tile/tlabel.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\tile\tlabel.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/tile/tlabelframe.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/tile/tlabelframe.rb: $(srcdir)/lib/ruby/1.8/tkextlib/tile/tlabelframe.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\tile\tlabelframe.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/tile/tmenubutton.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/tile/tmenubutton.rb: $(srcdir)/lib/ruby/1.8/tkextlib/tile/tmenubutton.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\tile\tmenubutton.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/tile/tnotebook.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/tile/tnotebook.rb: $(srcdir)/lib/ruby/1.8/tkextlib/tile/tnotebook.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\tile\tnotebook.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/tile/tpaned.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/tile/tpaned.rb: $(srcdir)/lib/ruby/1.8/tkextlib/tile/tpaned.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\tile\tpaned.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/tile/tprogressbar.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/tile/tprogressbar.rb: $(srcdir)/lib/ruby/1.8/tkextlib/tile/tprogressbar.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\tile\tprogressbar.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/tile/tradiobutton.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/tile/tradiobutton.rb: $(srcdir)/lib/ruby/1.8/tkextlib/tile/tradiobutton.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\tile\tradiobutton.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/tile/treeview.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/tile/treeview.rb: $(srcdir)/lib/ruby/1.8/tkextlib/tile/treeview.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\tile\treeview.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/tile/tscale.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/tile/tscale.rb: $(srcdir)/lib/ruby/1.8/tkextlib/tile/tscale.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\tile\tscale.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/tile/tscrollbar.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/tile/tscrollbar.rb: $(srcdir)/lib/ruby/1.8/tkextlib/tile/tscrollbar.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\tile\tscrollbar.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/tile/tseparator.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/tile/tseparator.rb: $(srcdir)/lib/ruby/1.8/tkextlib/tile/tseparator.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\tile\tseparator.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/tile/tsquare.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/tile/tsquare.rb: $(srcdir)/lib/ruby/1.8/tkextlib/tile/tsquare.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\tile\tsquare.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/tkDND
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/tkDND/setup.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/tkDND/setup.rb: $(srcdir)/lib/ruby/1.8/tkextlib/tkDND/setup.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\tkDND\setup.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/tkDND/shape.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/tkDND/shape.rb: $(srcdir)/lib/ruby/1.8/tkextlib/tkDND/shape.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\tkDND\shape.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/tkDND/tkdnd.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/tkDND/tkdnd.rb: $(srcdir)/lib/ruby/1.8/tkextlib/tkDND/tkdnd.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\tkDND\tkdnd.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/tkHTML
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/tkHTML/htmlwidget.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/tkHTML/htmlwidget.rb: $(srcdir)/lib/ruby/1.8/tkextlib/tkHTML/htmlwidget.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\tkHTML\htmlwidget.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/tkHTML/setup.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/tkHTML/setup.rb: $(srcdir)/lib/ruby/1.8/tkextlib/tkHTML/setup.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\tkHTML\setup.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/tkimg
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/tkimg/bmp.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/tkimg/bmp.rb: $(srcdir)/lib/ruby/1.8/tkextlib/tkimg/bmp.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\tkimg\bmp.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/tkimg/gif.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/tkimg/gif.rb: $(srcdir)/lib/ruby/1.8/tkextlib/tkimg/gif.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\tkimg\gif.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/tkimg/ico.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/tkimg/ico.rb: $(srcdir)/lib/ruby/1.8/tkextlib/tkimg/ico.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\tkimg\ico.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/tkimg/jpeg.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/tkimg/jpeg.rb: $(srcdir)/lib/ruby/1.8/tkextlib/tkimg/jpeg.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\tkimg\jpeg.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/tkimg/pcx.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/tkimg/pcx.rb: $(srcdir)/lib/ruby/1.8/tkextlib/tkimg/pcx.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\tkimg\pcx.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/tkimg/pixmap.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/tkimg/pixmap.rb: $(srcdir)/lib/ruby/1.8/tkextlib/tkimg/pixmap.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\tkimg\pixmap.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/tkimg/png.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/tkimg/png.rb: $(srcdir)/lib/ruby/1.8/tkextlib/tkimg/png.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\tkimg\png.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/tkimg/ppm.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/tkimg/ppm.rb: $(srcdir)/lib/ruby/1.8/tkextlib/tkimg/ppm.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\tkimg\ppm.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/tkimg/ps.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/tkimg/ps.rb: $(srcdir)/lib/ruby/1.8/tkextlib/tkimg/ps.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\tkimg\ps.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/tkimg/setup.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/tkimg/setup.rb: $(srcdir)/lib/ruby/1.8/tkextlib/tkimg/setup.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\tkimg\setup.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/tkimg/sgi.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/tkimg/sgi.rb: $(srcdir)/lib/ruby/1.8/tkextlib/tkimg/sgi.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\tkimg\sgi.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/tkimg/sun.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/tkimg/sun.rb: $(srcdir)/lib/ruby/1.8/tkextlib/tkimg/sun.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\tkimg\sun.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/tkimg/tga.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/tkimg/tga.rb: $(srcdir)/lib/ruby/1.8/tkextlib/tkimg/tga.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\tkimg\tga.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/tkimg/tiff.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/tkimg/tiff.rb: $(srcdir)/lib/ruby/1.8/tkextlib/tkimg/tiff.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\tkimg\tiff.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/tkimg/window.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/tkimg/window.rb: $(srcdir)/lib/ruby/1.8/tkextlib/tkimg/window.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\tkimg\window.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/tkimg/xbm.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/tkimg/xbm.rb: $(srcdir)/lib/ruby/1.8/tkextlib/tkimg/xbm.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\tkimg\xbm.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/tkimg/xpm.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/tkimg/xpm.rb: $(srcdir)/lib/ruby/1.8/tkextlib/tkimg/xpm.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\tkimg\xpm.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/tktable
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/tktable/setup.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/tktable/setup.rb: $(srcdir)/lib/ruby/1.8/tkextlib/tktable/setup.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\tktable\setup.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/tktable/tktable.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/tktable/tktable.rb: $(srcdir)/lib/ruby/1.8/tkextlib/tktable/tktable.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\tktable\tktable.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/tktrans
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/tktrans/setup.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/tktrans/setup.rb: $(srcdir)/lib/ruby/1.8/tkextlib/tktrans/setup.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\tktrans\setup.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/tktrans/tktrans.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/tktrans/tktrans.rb: $(srcdir)/lib/ruby/1.8/tkextlib/tktrans/tktrans.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\tktrans\tktrans.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/treectrl
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/treectrl/setup.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/treectrl/setup.rb: $(srcdir)/lib/ruby/1.8/tkextlib/treectrl/setup.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\treectrl\setup.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/treectrl/tktreectrl.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/treectrl/tktreectrl.rb: $(srcdir)/lib/ruby/1.8/tkextlib/treectrl/tktreectrl.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\treectrl\tktreectrl.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/trofs
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/trofs/setup.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/trofs/setup.rb: $(srcdir)/lib/ruby/1.8/tkextlib/trofs/setup.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\trofs\setup.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/trofs/trofs.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/trofs/trofs.rb: $(srcdir)/lib/ruby/1.8/tkextlib/trofs/trofs.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\trofs\trofs.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/vu
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/vu/bargraph.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/vu/bargraph.rb: $(srcdir)/lib/ruby/1.8/tkextlib/vu/bargraph.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\vu\bargraph.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/vu/charts.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/vu/charts.rb: $(srcdir)/lib/ruby/1.8/tkextlib/vu/charts.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\vu\charts.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/vu/dial.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/vu/dial.rb: $(srcdir)/lib/ruby/1.8/tkextlib/vu/dial.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\vu\dial.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/vu/pie.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/vu/pie.rb: $(srcdir)/lib/ruby/1.8/tkextlib/vu/pie.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\vu\pie.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/vu/setup.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/vu/setup.rb: $(srcdir)/lib/ruby/1.8/tkextlib/vu/setup.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\vu\setup.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/vu/spinbox.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/vu/spinbox.rb: $(srcdir)/lib/ruby/1.8/tkextlib/vu/spinbox.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\vu\spinbox.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/winico
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/winico/setup.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/winico/setup.rb: $(srcdir)/lib/ruby/1.8/tkextlib/winico/setup.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\winico\setup.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/tkextlib/winico/winico.rb
$(RUBYLIBDIR)/ruby/1.8/tkextlib/winico/winico.rb: $(srcdir)/lib/ruby/1.8/tkextlib/winico/winico.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\tkextlib\winico\winico.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/1.8/uri
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/uri/common.rb
$(RUBYLIBDIR)/ruby/1.8/uri/common.rb: $(srcdir)/lib/ruby/1.8/uri/common.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\uri\common.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/uri/ftp.rb
$(RUBYLIBDIR)/ruby/1.8/uri/ftp.rb: $(srcdir)/lib/ruby/1.8/uri/ftp.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\uri\ftp.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/uri/generic.rb
$(RUBYLIBDIR)/ruby/1.8/uri/generic.rb: $(srcdir)/lib/ruby/1.8/uri/generic.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\uri\generic.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/uri/http.rb
$(RUBYLIBDIR)/ruby/1.8/uri/http.rb: $(srcdir)/lib/ruby/1.8/uri/http.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\uri\http.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/uri/https.rb
$(RUBYLIBDIR)/ruby/1.8/uri/https.rb: $(srcdir)/lib/ruby/1.8/uri/https.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\uri\https.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/uri/ldap.rb
$(RUBYLIBDIR)/ruby/1.8/uri/ldap.rb: $(srcdir)/lib/ruby/1.8/uri/ldap.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\uri\ldap.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/uri/mailto.rb
$(RUBYLIBDIR)/ruby/1.8/uri/mailto.rb: $(srcdir)/lib/ruby/1.8/uri/mailto.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\uri\mailto.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/1.8/webrick
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/webrick/accesslog.rb
$(RUBYLIBDIR)/ruby/1.8/webrick/accesslog.rb: $(srcdir)/lib/ruby/1.8/webrick/accesslog.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\webrick\accesslog.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/webrick/cgi.rb
$(RUBYLIBDIR)/ruby/1.8/webrick/cgi.rb: $(srcdir)/lib/ruby/1.8/webrick/cgi.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\webrick\cgi.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/webrick/compat.rb
$(RUBYLIBDIR)/ruby/1.8/webrick/compat.rb: $(srcdir)/lib/ruby/1.8/webrick/compat.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\webrick\compat.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/webrick/config.rb
$(RUBYLIBDIR)/ruby/1.8/webrick/config.rb: $(srcdir)/lib/ruby/1.8/webrick/config.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\webrick\config.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/webrick/cookie.rb
$(RUBYLIBDIR)/ruby/1.8/webrick/cookie.rb: $(srcdir)/lib/ruby/1.8/webrick/cookie.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\webrick\cookie.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/webrick/htmlutils.rb
$(RUBYLIBDIR)/ruby/1.8/webrick/htmlutils.rb: $(srcdir)/lib/ruby/1.8/webrick/htmlutils.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\webrick\htmlutils.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/webrick/httpauth.rb
$(RUBYLIBDIR)/ruby/1.8/webrick/httpauth.rb: $(srcdir)/lib/ruby/1.8/webrick/httpauth.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\webrick\httpauth.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/webrick/httpproxy.rb
$(RUBYLIBDIR)/ruby/1.8/webrick/httpproxy.rb: $(srcdir)/lib/ruby/1.8/webrick/httpproxy.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\webrick\httpproxy.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/webrick/httprequest.rb
$(RUBYLIBDIR)/ruby/1.8/webrick/httprequest.rb: $(srcdir)/lib/ruby/1.8/webrick/httprequest.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\webrick\httprequest.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/webrick/httpresponse.rb
$(RUBYLIBDIR)/ruby/1.8/webrick/httpresponse.rb: $(srcdir)/lib/ruby/1.8/webrick/httpresponse.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\webrick\httpresponse.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/webrick/https.rb
$(RUBYLIBDIR)/ruby/1.8/webrick/https.rb: $(srcdir)/lib/ruby/1.8/webrick/https.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\webrick\https.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/webrick/httpserver.rb
$(RUBYLIBDIR)/ruby/1.8/webrick/httpserver.rb: $(srcdir)/lib/ruby/1.8/webrick/httpserver.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\webrick\httpserver.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/webrick/httpservlet.rb
$(RUBYLIBDIR)/ruby/1.8/webrick/httpservlet.rb: $(srcdir)/lib/ruby/1.8/webrick/httpservlet.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\webrick\httpservlet.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/webrick/httpstatus.rb
$(RUBYLIBDIR)/ruby/1.8/webrick/httpstatus.rb: $(srcdir)/lib/ruby/1.8/webrick/httpstatus.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\webrick\httpstatus.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/webrick/httputils.rb
$(RUBYLIBDIR)/ruby/1.8/webrick/httputils.rb: $(srcdir)/lib/ruby/1.8/webrick/httputils.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\webrick\httputils.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/webrick/httpversion.rb
$(RUBYLIBDIR)/ruby/1.8/webrick/httpversion.rb: $(srcdir)/lib/ruby/1.8/webrick/httpversion.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\webrick\httpversion.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/webrick/log.rb
$(RUBYLIBDIR)/ruby/1.8/webrick/log.rb: $(srcdir)/lib/ruby/1.8/webrick/log.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\webrick\log.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/webrick/server.rb
$(RUBYLIBDIR)/ruby/1.8/webrick/server.rb: $(srcdir)/lib/ruby/1.8/webrick/server.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\webrick\server.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/webrick/ssl.rb
$(RUBYLIBDIR)/ruby/1.8/webrick/ssl.rb: $(srcdir)/lib/ruby/1.8/webrick/ssl.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\webrick\ssl.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/webrick/utils.rb
$(RUBYLIBDIR)/ruby/1.8/webrick/utils.rb: $(srcdir)/lib/ruby/1.8/webrick/utils.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\webrick\utils.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/webrick/version.rb
$(RUBYLIBDIR)/ruby/1.8/webrick/version.rb: $(srcdir)/lib/ruby/1.8/webrick/version.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\webrick\version.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/1.8/webrick/httpauth
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/webrick/httpauth/authenticator.rb
$(RUBYLIBDIR)/ruby/1.8/webrick/httpauth/authenticator.rb: $(srcdir)/lib/ruby/1.8/webrick/httpauth/authenticator.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\webrick\httpauth\authenticator.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/webrick/httpauth/basicauth.rb
$(RUBYLIBDIR)/ruby/1.8/webrick/httpauth/basicauth.rb: $(srcdir)/lib/ruby/1.8/webrick/httpauth/basicauth.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\webrick\httpauth\basicauth.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/webrick/httpauth/digestauth.rb
$(RUBYLIBDIR)/ruby/1.8/webrick/httpauth/digestauth.rb: $(srcdir)/lib/ruby/1.8/webrick/httpauth/digestauth.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\webrick\httpauth\digestauth.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/webrick/httpauth/htdigest.rb
$(RUBYLIBDIR)/ruby/1.8/webrick/httpauth/htdigest.rb: $(srcdir)/lib/ruby/1.8/webrick/httpauth/htdigest.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\webrick\httpauth\htdigest.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/webrick/httpauth/htgroup.rb
$(RUBYLIBDIR)/ruby/1.8/webrick/httpauth/htgroup.rb: $(srcdir)/lib/ruby/1.8/webrick/httpauth/htgroup.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\webrick\httpauth\htgroup.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/webrick/httpauth/htpasswd.rb
$(RUBYLIBDIR)/ruby/1.8/webrick/httpauth/htpasswd.rb: $(srcdir)/lib/ruby/1.8/webrick/httpauth/htpasswd.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\webrick\httpauth\htpasswd.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/webrick/httpauth/userdb.rb
$(RUBYLIBDIR)/ruby/1.8/webrick/httpauth/userdb.rb: $(srcdir)/lib/ruby/1.8/webrick/httpauth/userdb.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\webrick\httpauth\userdb.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/1.8/webrick/httpservlet
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/webrick/httpservlet/abstract.rb
$(RUBYLIBDIR)/ruby/1.8/webrick/httpservlet/abstract.rb: $(srcdir)/lib/ruby/1.8/webrick/httpservlet/abstract.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\webrick\httpservlet\abstract.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/webrick/httpservlet/cgihandler.rb
$(RUBYLIBDIR)/ruby/1.8/webrick/httpservlet/cgihandler.rb: $(srcdir)/lib/ruby/1.8/webrick/httpservlet/cgihandler.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\webrick\httpservlet\cgihandler.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/webrick/httpservlet/cgi_runner.rb
$(RUBYLIBDIR)/ruby/1.8/webrick/httpservlet/cgi_runner.rb: $(srcdir)/lib/ruby/1.8/webrick/httpservlet/cgi_runner.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\webrick\httpservlet\cgi_runner.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/webrick/httpservlet/erbhandler.rb
$(RUBYLIBDIR)/ruby/1.8/webrick/httpservlet/erbhandler.rb: $(srcdir)/lib/ruby/1.8/webrick/httpservlet/erbhandler.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\webrick\httpservlet\erbhandler.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/webrick/httpservlet/filehandler.rb
$(RUBYLIBDIR)/ruby/1.8/webrick/httpservlet/filehandler.rb: $(srcdir)/lib/ruby/1.8/webrick/httpservlet/filehandler.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\webrick\httpservlet\filehandler.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/webrick/httpservlet/prochandler.rb
$(RUBYLIBDIR)/ruby/1.8/webrick/httpservlet/prochandler.rb: $(srcdir)/lib/ruby/1.8/webrick/httpservlet/prochandler.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\webrick\httpservlet\prochandler.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/1.8/win32
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/win32/registry.rb
$(RUBYLIBDIR)/ruby/1.8/win32/registry.rb: $(srcdir)/lib/ruby/1.8/win32/registry.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\win32\registry.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/win32/resolv.rb
$(RUBYLIBDIR)/ruby/1.8/win32/resolv.rb: $(srcdir)/lib/ruby/1.8/win32/resolv.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\win32\resolv.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/1.8/win32ole
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/win32ole/property.rb
$(RUBYLIBDIR)/ruby/1.8/win32ole/property.rb: $(srcdir)/lib/ruby/1.8/win32ole/property.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\win32ole\property.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/1.8/wsdl
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/wsdl/binding.rb
$(RUBYLIBDIR)/ruby/1.8/wsdl/binding.rb: $(srcdir)/lib/ruby/1.8/wsdl/binding.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\wsdl\binding.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/wsdl/data.rb
$(RUBYLIBDIR)/ruby/1.8/wsdl/data.rb: $(srcdir)/lib/ruby/1.8/wsdl/data.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\wsdl\data.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/wsdl/definitions.rb
$(RUBYLIBDIR)/ruby/1.8/wsdl/definitions.rb: $(srcdir)/lib/ruby/1.8/wsdl/definitions.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\wsdl\definitions.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/wsdl/documentation.rb
$(RUBYLIBDIR)/ruby/1.8/wsdl/documentation.rb: $(srcdir)/lib/ruby/1.8/wsdl/documentation.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\wsdl\documentation.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/wsdl/import.rb
$(RUBYLIBDIR)/ruby/1.8/wsdl/import.rb: $(srcdir)/lib/ruby/1.8/wsdl/import.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\wsdl\import.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/wsdl/importer.rb
$(RUBYLIBDIR)/ruby/1.8/wsdl/importer.rb: $(srcdir)/lib/ruby/1.8/wsdl/importer.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\wsdl\importer.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/wsdl/info.rb
$(RUBYLIBDIR)/ruby/1.8/wsdl/info.rb: $(srcdir)/lib/ruby/1.8/wsdl/info.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\wsdl\info.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/wsdl/message.rb
$(RUBYLIBDIR)/ruby/1.8/wsdl/message.rb: $(srcdir)/lib/ruby/1.8/wsdl/message.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\wsdl\message.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/wsdl/operation.rb
$(RUBYLIBDIR)/ruby/1.8/wsdl/operation.rb: $(srcdir)/lib/ruby/1.8/wsdl/operation.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\wsdl\operation.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/wsdl/operationBinding.rb
$(RUBYLIBDIR)/ruby/1.8/wsdl/operationBinding.rb: $(srcdir)/lib/ruby/1.8/wsdl/operationBinding.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\wsdl\operationBinding.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/wsdl/param.rb
$(RUBYLIBDIR)/ruby/1.8/wsdl/param.rb: $(srcdir)/lib/ruby/1.8/wsdl/param.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\wsdl\param.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/wsdl/parser.rb
$(RUBYLIBDIR)/ruby/1.8/wsdl/parser.rb: $(srcdir)/lib/ruby/1.8/wsdl/parser.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\wsdl\parser.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/wsdl/part.rb
$(RUBYLIBDIR)/ruby/1.8/wsdl/part.rb: $(srcdir)/lib/ruby/1.8/wsdl/part.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\wsdl\part.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/wsdl/port.rb
$(RUBYLIBDIR)/ruby/1.8/wsdl/port.rb: $(srcdir)/lib/ruby/1.8/wsdl/port.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\wsdl\port.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/wsdl/portType.rb
$(RUBYLIBDIR)/ruby/1.8/wsdl/portType.rb: $(srcdir)/lib/ruby/1.8/wsdl/portType.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\wsdl\portType.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/wsdl/service.rb
$(RUBYLIBDIR)/ruby/1.8/wsdl/service.rb: $(srcdir)/lib/ruby/1.8/wsdl/service.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\wsdl\service.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/wsdl/types.rb
$(RUBYLIBDIR)/ruby/1.8/wsdl/types.rb: $(srcdir)/lib/ruby/1.8/wsdl/types.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\wsdl\types.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/wsdl/wsdl.rb
$(RUBYLIBDIR)/ruby/1.8/wsdl/wsdl.rb: $(srcdir)/lib/ruby/1.8/wsdl/wsdl.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\wsdl\wsdl.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/1.8/wsdl/soap
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/wsdl/soap/address.rb
$(RUBYLIBDIR)/ruby/1.8/wsdl/soap/address.rb: $(srcdir)/lib/ruby/1.8/wsdl/soap/address.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\wsdl\soap\address.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/wsdl/soap/binding.rb
$(RUBYLIBDIR)/ruby/1.8/wsdl/soap/binding.rb: $(srcdir)/lib/ruby/1.8/wsdl/soap/binding.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\wsdl\soap\binding.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/wsdl/soap/body.rb
$(RUBYLIBDIR)/ruby/1.8/wsdl/soap/body.rb: $(srcdir)/lib/ruby/1.8/wsdl/soap/body.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\wsdl\soap\body.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/wsdl/soap/cgiStubCreator.rb
$(RUBYLIBDIR)/ruby/1.8/wsdl/soap/cgiStubCreator.rb: $(srcdir)/lib/ruby/1.8/wsdl/soap/cgiStubCreator.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\wsdl\soap\cgiStubCreator.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/wsdl/soap/classDefCreator.rb
$(RUBYLIBDIR)/ruby/1.8/wsdl/soap/classDefCreator.rb: $(srcdir)/lib/ruby/1.8/wsdl/soap/classDefCreator.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\wsdl\soap\classDefCreator.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/wsdl/soap/classDefCreatorSupport.rb
$(RUBYLIBDIR)/ruby/1.8/wsdl/soap/classDefCreatorSupport.rb: $(srcdir)/lib/ruby/1.8/wsdl/soap/classDefCreatorSupport.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\wsdl\soap\classDefCreatorSupport.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/wsdl/soap/clientSkeltonCreator.rb
$(RUBYLIBDIR)/ruby/1.8/wsdl/soap/clientSkeltonCreator.rb: $(srcdir)/lib/ruby/1.8/wsdl/soap/clientSkeltonCreator.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\wsdl\soap\clientSkeltonCreator.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/wsdl/soap/complexType.rb
$(RUBYLIBDIR)/ruby/1.8/wsdl/soap/complexType.rb: $(srcdir)/lib/ruby/1.8/wsdl/soap/complexType.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\wsdl\soap\complexType.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/wsdl/soap/data.rb
$(RUBYLIBDIR)/ruby/1.8/wsdl/soap/data.rb: $(srcdir)/lib/ruby/1.8/wsdl/soap/data.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\wsdl\soap\data.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/wsdl/soap/definitions.rb
$(RUBYLIBDIR)/ruby/1.8/wsdl/soap/definitions.rb: $(srcdir)/lib/ruby/1.8/wsdl/soap/definitions.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\wsdl\soap\definitions.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/wsdl/soap/driverCreator.rb
$(RUBYLIBDIR)/ruby/1.8/wsdl/soap/driverCreator.rb: $(srcdir)/lib/ruby/1.8/wsdl/soap/driverCreator.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\wsdl\soap\driverCreator.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/wsdl/soap/element.rb
$(RUBYLIBDIR)/ruby/1.8/wsdl/soap/element.rb: $(srcdir)/lib/ruby/1.8/wsdl/soap/element.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\wsdl\soap\element.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/wsdl/soap/fault.rb
$(RUBYLIBDIR)/ruby/1.8/wsdl/soap/fault.rb: $(srcdir)/lib/ruby/1.8/wsdl/soap/fault.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\wsdl\soap\fault.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/wsdl/soap/header.rb
$(RUBYLIBDIR)/ruby/1.8/wsdl/soap/header.rb: $(srcdir)/lib/ruby/1.8/wsdl/soap/header.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\wsdl\soap\header.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/wsdl/soap/headerfault.rb
$(RUBYLIBDIR)/ruby/1.8/wsdl/soap/headerfault.rb: $(srcdir)/lib/ruby/1.8/wsdl/soap/headerfault.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\wsdl\soap\headerfault.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/wsdl/soap/mappingRegistryCreator.rb
$(RUBYLIBDIR)/ruby/1.8/wsdl/soap/mappingRegistryCreator.rb: $(srcdir)/lib/ruby/1.8/wsdl/soap/mappingRegistryCreator.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\wsdl\soap\mappingRegistryCreator.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/wsdl/soap/methodDefCreator.rb
$(RUBYLIBDIR)/ruby/1.8/wsdl/soap/methodDefCreator.rb: $(srcdir)/lib/ruby/1.8/wsdl/soap/methodDefCreator.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\wsdl\soap\methodDefCreator.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/wsdl/soap/operation.rb
$(RUBYLIBDIR)/ruby/1.8/wsdl/soap/operation.rb: $(srcdir)/lib/ruby/1.8/wsdl/soap/operation.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\wsdl\soap\operation.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/wsdl/soap/servantSkeltonCreator.rb
$(RUBYLIBDIR)/ruby/1.8/wsdl/soap/servantSkeltonCreator.rb: $(srcdir)/lib/ruby/1.8/wsdl/soap/servantSkeltonCreator.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\wsdl\soap\servantSkeltonCreator.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/wsdl/soap/standaloneServerStubCreator.rb
$(RUBYLIBDIR)/ruby/1.8/wsdl/soap/standaloneServerStubCreator.rb: $(srcdir)/lib/ruby/1.8/wsdl/soap/standaloneServerStubCreator.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\wsdl\soap\standaloneServerStubCreator.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/wsdl/soap/wsdl2ruby.rb
$(RUBYLIBDIR)/ruby/1.8/wsdl/soap/wsdl2ruby.rb: $(srcdir)/lib/ruby/1.8/wsdl/soap/wsdl2ruby.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\wsdl\soap\wsdl2ruby.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/1.8/wsdl/xmlSchema
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/wsdl/xmlSchema/all.rb
$(RUBYLIBDIR)/ruby/1.8/wsdl/xmlSchema/all.rb: $(srcdir)/lib/ruby/1.8/wsdl/xmlSchema/all.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\wsdl\xmlSchema\all.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/wsdl/xmlSchema/annotation.rb
$(RUBYLIBDIR)/ruby/1.8/wsdl/xmlSchema/annotation.rb: $(srcdir)/lib/ruby/1.8/wsdl/xmlSchema/annotation.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\wsdl\xmlSchema\annotation.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/wsdl/xmlSchema/any.rb
$(RUBYLIBDIR)/ruby/1.8/wsdl/xmlSchema/any.rb: $(srcdir)/lib/ruby/1.8/wsdl/xmlSchema/any.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\wsdl\xmlSchema\any.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/wsdl/xmlSchema/attribute.rb
$(RUBYLIBDIR)/ruby/1.8/wsdl/xmlSchema/attribute.rb: $(srcdir)/lib/ruby/1.8/wsdl/xmlSchema/attribute.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\wsdl\xmlSchema\attribute.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/wsdl/xmlSchema/choice.rb
$(RUBYLIBDIR)/ruby/1.8/wsdl/xmlSchema/choice.rb: $(srcdir)/lib/ruby/1.8/wsdl/xmlSchema/choice.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\wsdl\xmlSchema\choice.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/wsdl/xmlSchema/complexContent.rb
$(RUBYLIBDIR)/ruby/1.8/wsdl/xmlSchema/complexContent.rb: $(srcdir)/lib/ruby/1.8/wsdl/xmlSchema/complexContent.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\wsdl\xmlSchema\complexContent.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/wsdl/xmlSchema/complexType.rb
$(RUBYLIBDIR)/ruby/1.8/wsdl/xmlSchema/complexType.rb: $(srcdir)/lib/ruby/1.8/wsdl/xmlSchema/complexType.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\wsdl\xmlSchema\complexType.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/wsdl/xmlSchema/content.rb
$(RUBYLIBDIR)/ruby/1.8/wsdl/xmlSchema/content.rb: $(srcdir)/lib/ruby/1.8/wsdl/xmlSchema/content.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\wsdl\xmlSchema\content.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/wsdl/xmlSchema/data.rb
$(RUBYLIBDIR)/ruby/1.8/wsdl/xmlSchema/data.rb: $(srcdir)/lib/ruby/1.8/wsdl/xmlSchema/data.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\wsdl\xmlSchema\data.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/wsdl/xmlSchema/element.rb
$(RUBYLIBDIR)/ruby/1.8/wsdl/xmlSchema/element.rb: $(srcdir)/lib/ruby/1.8/wsdl/xmlSchema/element.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\wsdl\xmlSchema\element.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/wsdl/xmlSchema/enumeration.rb
$(RUBYLIBDIR)/ruby/1.8/wsdl/xmlSchema/enumeration.rb: $(srcdir)/lib/ruby/1.8/wsdl/xmlSchema/enumeration.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\wsdl\xmlSchema\enumeration.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/wsdl/xmlSchema/import.rb
$(RUBYLIBDIR)/ruby/1.8/wsdl/xmlSchema/import.rb: $(srcdir)/lib/ruby/1.8/wsdl/xmlSchema/import.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\wsdl\xmlSchema\import.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/wsdl/xmlSchema/importer.rb
$(RUBYLIBDIR)/ruby/1.8/wsdl/xmlSchema/importer.rb: $(srcdir)/lib/ruby/1.8/wsdl/xmlSchema/importer.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\wsdl\xmlSchema\importer.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/wsdl/xmlSchema/include.rb
$(RUBYLIBDIR)/ruby/1.8/wsdl/xmlSchema/include.rb: $(srcdir)/lib/ruby/1.8/wsdl/xmlSchema/include.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\wsdl\xmlSchema\include.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/wsdl/xmlSchema/length.rb
$(RUBYLIBDIR)/ruby/1.8/wsdl/xmlSchema/length.rb: $(srcdir)/lib/ruby/1.8/wsdl/xmlSchema/length.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\wsdl\xmlSchema\length.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/wsdl/xmlSchema/parser.rb
$(RUBYLIBDIR)/ruby/1.8/wsdl/xmlSchema/parser.rb: $(srcdir)/lib/ruby/1.8/wsdl/xmlSchema/parser.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\wsdl\xmlSchema\parser.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/wsdl/xmlSchema/pattern.rb
$(RUBYLIBDIR)/ruby/1.8/wsdl/xmlSchema/pattern.rb: $(srcdir)/lib/ruby/1.8/wsdl/xmlSchema/pattern.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\wsdl\xmlSchema\pattern.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/wsdl/xmlSchema/schema.rb
$(RUBYLIBDIR)/ruby/1.8/wsdl/xmlSchema/schema.rb: $(srcdir)/lib/ruby/1.8/wsdl/xmlSchema/schema.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\wsdl\xmlSchema\schema.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/wsdl/xmlSchema/sequence.rb
$(RUBYLIBDIR)/ruby/1.8/wsdl/xmlSchema/sequence.rb: $(srcdir)/lib/ruby/1.8/wsdl/xmlSchema/sequence.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\wsdl\xmlSchema\sequence.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/wsdl/xmlSchema/simpleContent.rb
$(RUBYLIBDIR)/ruby/1.8/wsdl/xmlSchema/simpleContent.rb: $(srcdir)/lib/ruby/1.8/wsdl/xmlSchema/simpleContent.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\wsdl\xmlSchema\simpleContent.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/wsdl/xmlSchema/simpleExtension.rb
$(RUBYLIBDIR)/ruby/1.8/wsdl/xmlSchema/simpleExtension.rb: $(srcdir)/lib/ruby/1.8/wsdl/xmlSchema/simpleExtension.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\wsdl\xmlSchema\simpleExtension.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/wsdl/xmlSchema/simpleRestriction.rb
$(RUBYLIBDIR)/ruby/1.8/wsdl/xmlSchema/simpleRestriction.rb: $(srcdir)/lib/ruby/1.8/wsdl/xmlSchema/simpleRestriction.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\wsdl\xmlSchema\simpleRestriction.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/wsdl/xmlSchema/simpleType.rb
$(RUBYLIBDIR)/ruby/1.8/wsdl/xmlSchema/simpleType.rb: $(srcdir)/lib/ruby/1.8/wsdl/xmlSchema/simpleType.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\wsdl\xmlSchema\simpleType.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/wsdl/xmlSchema/unique.rb
$(RUBYLIBDIR)/ruby/1.8/wsdl/xmlSchema/unique.rb: $(srcdir)/lib/ruby/1.8/wsdl/xmlSchema/unique.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\wsdl\xmlSchema\unique.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/wsdl/xmlSchema/xsd2ruby.rb
$(RUBYLIBDIR)/ruby/1.8/wsdl/xmlSchema/xsd2ruby.rb: $(srcdir)/lib/ruby/1.8/wsdl/xmlSchema/xsd2ruby.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\wsdl\xmlSchema\xsd2ruby.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/1.8/xmlrpc
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/xmlrpc/base64.rb
$(RUBYLIBDIR)/ruby/1.8/xmlrpc/base64.rb: $(srcdir)/lib/ruby/1.8/xmlrpc/base64.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\xmlrpc\base64.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/xmlrpc/client.rb
$(RUBYLIBDIR)/ruby/1.8/xmlrpc/client.rb: $(srcdir)/lib/ruby/1.8/xmlrpc/client.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\xmlrpc\client.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/xmlrpc/config.rb
$(RUBYLIBDIR)/ruby/1.8/xmlrpc/config.rb: $(srcdir)/lib/ruby/1.8/xmlrpc/config.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\xmlrpc\config.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/xmlrpc/create.rb
$(RUBYLIBDIR)/ruby/1.8/xmlrpc/create.rb: $(srcdir)/lib/ruby/1.8/xmlrpc/create.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\xmlrpc\create.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/xmlrpc/datetime.rb
$(RUBYLIBDIR)/ruby/1.8/xmlrpc/datetime.rb: $(srcdir)/lib/ruby/1.8/xmlrpc/datetime.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\xmlrpc\datetime.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/xmlrpc/httpserver.rb
$(RUBYLIBDIR)/ruby/1.8/xmlrpc/httpserver.rb: $(srcdir)/lib/ruby/1.8/xmlrpc/httpserver.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\xmlrpc\httpserver.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/xmlrpc/marshal.rb
$(RUBYLIBDIR)/ruby/1.8/xmlrpc/marshal.rb: $(srcdir)/lib/ruby/1.8/xmlrpc/marshal.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\xmlrpc\marshal.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/xmlrpc/parser.rb
$(RUBYLIBDIR)/ruby/1.8/xmlrpc/parser.rb: $(srcdir)/lib/ruby/1.8/xmlrpc/parser.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\xmlrpc\parser.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/xmlrpc/server.rb
$(RUBYLIBDIR)/ruby/1.8/xmlrpc/server.rb: $(srcdir)/lib/ruby/1.8/xmlrpc/server.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\xmlrpc\server.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/xmlrpc/utils.rb
$(RUBYLIBDIR)/ruby/1.8/xmlrpc/utils.rb: $(srcdir)/lib/ruby/1.8/xmlrpc/utils.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\xmlrpc\utils.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/1.8/xsd
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/xsd/charset.rb
$(RUBYLIBDIR)/ruby/1.8/xsd/charset.rb: $(srcdir)/lib/ruby/1.8/xsd/charset.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\xsd\charset.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/xsd/codegen.rb
$(RUBYLIBDIR)/ruby/1.8/xsd/codegen.rb: $(srcdir)/lib/ruby/1.8/xsd/codegen.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\xsd\codegen.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/xsd/datatypes.rb
$(RUBYLIBDIR)/ruby/1.8/xsd/datatypes.rb: $(srcdir)/lib/ruby/1.8/xsd/datatypes.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\xsd\datatypes.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/xsd/datatypes1999.rb
$(RUBYLIBDIR)/ruby/1.8/xsd/datatypes1999.rb: $(srcdir)/lib/ruby/1.8/xsd/datatypes1999.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\xsd\datatypes1999.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/xsd/iconvcharset.rb
$(RUBYLIBDIR)/ruby/1.8/xsd/iconvcharset.rb: $(srcdir)/lib/ruby/1.8/xsd/iconvcharset.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\xsd\iconvcharset.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/xsd/mapping.rb
$(RUBYLIBDIR)/ruby/1.8/xsd/mapping.rb: $(srcdir)/lib/ruby/1.8/xsd/mapping.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\xsd\mapping.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/xsd/namedelements.rb
$(RUBYLIBDIR)/ruby/1.8/xsd/namedelements.rb: $(srcdir)/lib/ruby/1.8/xsd/namedelements.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\xsd\namedelements.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/xsd/ns.rb
$(RUBYLIBDIR)/ruby/1.8/xsd/ns.rb: $(srcdir)/lib/ruby/1.8/xsd/ns.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\xsd\ns.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/xsd/qname.rb
$(RUBYLIBDIR)/ruby/1.8/xsd/qname.rb: $(srcdir)/lib/ruby/1.8/xsd/qname.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\xsd\qname.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/xsd/xmlparser.rb
$(RUBYLIBDIR)/ruby/1.8/xsd/xmlparser.rb: $(srcdir)/lib/ruby/1.8/xsd/xmlparser.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\xsd\xmlparser.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/1.8/xsd/codegen
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/xsd/codegen/classdef.rb
$(RUBYLIBDIR)/ruby/1.8/xsd/codegen/classdef.rb: $(srcdir)/lib/ruby/1.8/xsd/codegen/classdef.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\xsd\codegen\classdef.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/xsd/codegen/commentdef.rb
$(RUBYLIBDIR)/ruby/1.8/xsd/codegen/commentdef.rb: $(srcdir)/lib/ruby/1.8/xsd/codegen/commentdef.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\xsd\codegen\commentdef.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/xsd/codegen/gensupport.rb
$(RUBYLIBDIR)/ruby/1.8/xsd/codegen/gensupport.rb: $(srcdir)/lib/ruby/1.8/xsd/codegen/gensupport.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\xsd\codegen\gensupport.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/xsd/codegen/methoddef.rb
$(RUBYLIBDIR)/ruby/1.8/xsd/codegen/methoddef.rb: $(srcdir)/lib/ruby/1.8/xsd/codegen/methoddef.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\xsd\codegen\methoddef.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/xsd/codegen/moduledef.rb
$(RUBYLIBDIR)/ruby/1.8/xsd/codegen/moduledef.rb: $(srcdir)/lib/ruby/1.8/xsd/codegen/moduledef.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\xsd\codegen\moduledef.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/1.8/xsd/xmlparser
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/xsd/xmlparser/parser.rb
$(RUBYLIBDIR)/ruby/1.8/xsd/xmlparser/parser.rb: $(srcdir)/lib/ruby/1.8/xsd/xmlparser/parser.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\xsd\xmlparser\parser.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/xsd/xmlparser/rexmlparser.rb
$(RUBYLIBDIR)/ruby/1.8/xsd/xmlparser/rexmlparser.rb: $(srcdir)/lib/ruby/1.8/xsd/xmlparser/rexmlparser.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\xsd\xmlparser\rexmlparser.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/xsd/xmlparser/xmlparser.rb
$(RUBYLIBDIR)/ruby/1.8/xsd/xmlparser/xmlparser.rb: $(srcdir)/lib/ruby/1.8/xsd/xmlparser/xmlparser.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\xsd\xmlparser\xmlparser.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/xsd/xmlparser/xmlscanner.rb
$(RUBYLIBDIR)/ruby/1.8/xsd/xmlparser/xmlscanner.rb: $(srcdir)/lib/ruby/1.8/xsd/xmlparser/xmlscanner.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\xsd\xmlparser\xmlscanner.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/1.8/yaml
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/yaml/baseemitter.rb
$(RUBYLIBDIR)/ruby/1.8/yaml/baseemitter.rb: $(srcdir)/lib/ruby/1.8/yaml/baseemitter.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\yaml\baseemitter.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/yaml/basenode.rb
$(RUBYLIBDIR)/ruby/1.8/yaml/basenode.rb: $(srcdir)/lib/ruby/1.8/yaml/basenode.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\yaml\basenode.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/yaml/constants.rb
$(RUBYLIBDIR)/ruby/1.8/yaml/constants.rb: $(srcdir)/lib/ruby/1.8/yaml/constants.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\yaml\constants.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/yaml/dbm.rb
$(RUBYLIBDIR)/ruby/1.8/yaml/dbm.rb: $(srcdir)/lib/ruby/1.8/yaml/dbm.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\yaml\dbm.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/yaml/encoding.rb
$(RUBYLIBDIR)/ruby/1.8/yaml/encoding.rb: $(srcdir)/lib/ruby/1.8/yaml/encoding.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\yaml\encoding.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/yaml/error.rb
$(RUBYLIBDIR)/ruby/1.8/yaml/error.rb: $(srcdir)/lib/ruby/1.8/yaml/error.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\yaml\error.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/yaml/loader.rb
$(RUBYLIBDIR)/ruby/1.8/yaml/loader.rb: $(srcdir)/lib/ruby/1.8/yaml/loader.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\yaml\loader.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/yaml/rubytypes.rb
$(RUBYLIBDIR)/ruby/1.8/yaml/rubytypes.rb: $(srcdir)/lib/ruby/1.8/yaml/rubytypes.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\yaml\rubytypes.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/yaml/store.rb
$(RUBYLIBDIR)/ruby/1.8/yaml/store.rb: $(srcdir)/lib/ruby/1.8/yaml/store.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\yaml\store.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/yaml/stream.rb
$(RUBYLIBDIR)/ruby/1.8/yaml/stream.rb: $(srcdir)/lib/ruby/1.8/yaml/stream.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\yaml\stream.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/yaml/stringio.rb
$(RUBYLIBDIR)/ruby/1.8/yaml/stringio.rb: $(srcdir)/lib/ruby/1.8/yaml/stringio.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\yaml\stringio.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/yaml/syck.rb
$(RUBYLIBDIR)/ruby/1.8/yaml/syck.rb: $(srcdir)/lib/ruby/1.8/yaml/syck.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\yaml\syck.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/yaml/tag.rb
$(RUBYLIBDIR)/ruby/1.8/yaml/tag.rb: $(srcdir)/lib/ruby/1.8/yaml/tag.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\yaml\tag.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/yaml/types.rb
$(RUBYLIBDIR)/ruby/1.8/yaml/types.rb: $(srcdir)/lib/ruby/1.8/yaml/types.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\yaml\types.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/yaml/yamlnode.rb
$(RUBYLIBDIR)/ruby/1.8/yaml/yamlnode.rb: $(srcdir)/lib/ruby/1.8/yaml/yamlnode.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\yaml\yamlnode.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/1.8/yaml/ypath.rb
$(RUBYLIBDIR)/ruby/1.8/yaml/ypath.rb: $(srcdir)/lib/ruby/1.8/yaml/ypath.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\1.8\yaml\ypath.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionmailer-2.0.2
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionmailer-2.0.2/install.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionmailer-2.0.2/install.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionmailer-2.0.2/install.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionmailer-2.0.2\install.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionmailer-2.0.2/lib
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionmailer-2.0.2/lib/actionmailer.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionmailer-2.0.2/lib/actionmailer.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionmailer-2.0.2/lib/actionmailer.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionmailer-2.0.2\lib\actionmailer.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionmailer-2.0.2/lib/action_mailer.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionmailer-2.0.2/lib/action_mailer.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionmailer-2.0.2/lib/action_mailer.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionmailer-2.0.2\lib\action_mailer.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionmailer-2.0.2/lib/action_mailer
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionmailer-2.0.2/lib/action_mailer/adv_attr_accessor.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionmailer-2.0.2/lib/action_mailer/adv_attr_accessor.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionmailer-2.0.2/lib/action_mailer/adv_attr_accessor.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionmailer-2.0.2\lib\action_mailer\adv_attr_accessor.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionmailer-2.0.2/lib/action_mailer/base.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionmailer-2.0.2/lib/action_mailer/base.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionmailer-2.0.2/lib/action_mailer/base.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionmailer-2.0.2\lib\action_mailer\base.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionmailer-2.0.2/lib/action_mailer/helpers.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionmailer-2.0.2/lib/action_mailer/helpers.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionmailer-2.0.2/lib/action_mailer/helpers.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionmailer-2.0.2\lib\action_mailer\helpers.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionmailer-2.0.2/lib/action_mailer/mail_helper.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionmailer-2.0.2/lib/action_mailer/mail_helper.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionmailer-2.0.2/lib/action_mailer/mail_helper.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionmailer-2.0.2\lib\action_mailer\mail_helper.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionmailer-2.0.2/lib/action_mailer/part.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionmailer-2.0.2/lib/action_mailer/part.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionmailer-2.0.2/lib/action_mailer/part.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionmailer-2.0.2\lib\action_mailer\part.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionmailer-2.0.2/lib/action_mailer/part_container.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionmailer-2.0.2/lib/action_mailer/part_container.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionmailer-2.0.2/lib/action_mailer/part_container.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionmailer-2.0.2\lib\action_mailer\part_container.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionmailer-2.0.2/lib/action_mailer/quoting.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionmailer-2.0.2/lib/action_mailer/quoting.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionmailer-2.0.2/lib/action_mailer/quoting.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionmailer-2.0.2\lib\action_mailer\quoting.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionmailer-2.0.2/lib/action_mailer/test_case.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionmailer-2.0.2/lib/action_mailer/test_case.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionmailer-2.0.2/lib/action_mailer/test_case.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionmailer-2.0.2\lib\action_mailer\test_case.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionmailer-2.0.2/lib/action_mailer/test_helper.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionmailer-2.0.2/lib/action_mailer/test_helper.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionmailer-2.0.2/lib/action_mailer/test_helper.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionmailer-2.0.2\lib\action_mailer\test_helper.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionmailer-2.0.2/lib/action_mailer/utils.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionmailer-2.0.2/lib/action_mailer/utils.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionmailer-2.0.2/lib/action_mailer/utils.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionmailer-2.0.2\lib\action_mailer\utils.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionmailer-2.0.2/lib/action_mailer/vendor.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionmailer-2.0.2/lib/action_mailer/vendor.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionmailer-2.0.2/lib/action_mailer/vendor.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionmailer-2.0.2\lib\action_mailer\vendor.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionmailer-2.0.2/lib/action_mailer/version.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionmailer-2.0.2/lib/action_mailer/version.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionmailer-2.0.2/lib/action_mailer/version.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionmailer-2.0.2\lib\action_mailer\version.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionmailer-2.0.2/lib/action_mailer/vendor/text-format-0.6.3/text
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionmailer-2.0.2/lib/action_mailer/vendor/text-format-0.6.3/text/format.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionmailer-2.0.2/lib/action_mailer/vendor/text-format-0.6.3/text/format.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionmailer-2.0.2/lib/action_mailer/vendor/text-format-0.6.3/text/format.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionmailer-2.0.2\lib\action_mailer\vendor\text-format-0.6.3\text\format.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionmailer-2.0.2/lib/action_mailer/vendor/tmail-1.1.0/tmail
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionmailer-2.0.2/lib/action_mailer/vendor/tmail-1.1.0/tmail/address.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionmailer-2.0.2/lib/action_mailer/vendor/tmail-1.1.0/tmail/address.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionmailer-2.0.2/lib/action_mailer/vendor/tmail-1.1.0/tmail/address.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionmailer-2.0.2\lib\action_mailer\vendor\tmail-1.1.0\tmail\address.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionmailer-2.0.2/lib/action_mailer/vendor/tmail-1.1.0/tmail/attachments.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionmailer-2.0.2/lib/action_mailer/vendor/tmail-1.1.0/tmail/attachments.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionmailer-2.0.2/lib/action_mailer/vendor/tmail-1.1.0/tmail/attachments.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionmailer-2.0.2\lib\action_mailer\vendor\tmail-1.1.0\tmail\attachments.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionmailer-2.0.2/lib/action_mailer/vendor/tmail-1.1.0/tmail/base64.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionmailer-2.0.2/lib/action_mailer/vendor/tmail-1.1.0/tmail/base64.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionmailer-2.0.2/lib/action_mailer/vendor/tmail-1.1.0/tmail/base64.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionmailer-2.0.2\lib\action_mailer\vendor\tmail-1.1.0\tmail\base64.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionmailer-2.0.2/lib/action_mailer/vendor/tmail-1.1.0/tmail/compat.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionmailer-2.0.2/lib/action_mailer/vendor/tmail-1.1.0/tmail/compat.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionmailer-2.0.2/lib/action_mailer/vendor/tmail-1.1.0/tmail/compat.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionmailer-2.0.2\lib\action_mailer\vendor\tmail-1.1.0\tmail\compat.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionmailer-2.0.2/lib/action_mailer/vendor/tmail-1.1.0/tmail/config.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionmailer-2.0.2/lib/action_mailer/vendor/tmail-1.1.0/tmail/config.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionmailer-2.0.2/lib/action_mailer/vendor/tmail-1.1.0/tmail/config.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionmailer-2.0.2\lib\action_mailer\vendor\tmail-1.1.0\tmail\config.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionmailer-2.0.2/lib/action_mailer/vendor/tmail-1.1.0/tmail/core_extensions.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionmailer-2.0.2/lib/action_mailer/vendor/tmail-1.1.0/tmail/core_extensions.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionmailer-2.0.2/lib/action_mailer/vendor/tmail-1.1.0/tmail/core_extensions.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionmailer-2.0.2\lib\action_mailer\vendor\tmail-1.1.0\tmail\core_extensions.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionmailer-2.0.2/lib/action_mailer/vendor/tmail-1.1.0/tmail/encode.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionmailer-2.0.2/lib/action_mailer/vendor/tmail-1.1.0/tmail/encode.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionmailer-2.0.2/lib/action_mailer/vendor/tmail-1.1.0/tmail/encode.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionmailer-2.0.2\lib\action_mailer\vendor\tmail-1.1.0\tmail\encode.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionmailer-2.0.2/lib/action_mailer/vendor/tmail-1.1.0/tmail/facade.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionmailer-2.0.2/lib/action_mailer/vendor/tmail-1.1.0/tmail/facade.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionmailer-2.0.2/lib/action_mailer/vendor/tmail-1.1.0/tmail/facade.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionmailer-2.0.2\lib\action_mailer\vendor\tmail-1.1.0\tmail\facade.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionmailer-2.0.2/lib/action_mailer/vendor/tmail-1.1.0/tmail/header.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionmailer-2.0.2/lib/action_mailer/vendor/tmail-1.1.0/tmail/header.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionmailer-2.0.2/lib/action_mailer/vendor/tmail-1.1.0/tmail/header.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionmailer-2.0.2\lib\action_mailer\vendor\tmail-1.1.0\tmail\header.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionmailer-2.0.2/lib/action_mailer/vendor/tmail-1.1.0/tmail/info.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionmailer-2.0.2/lib/action_mailer/vendor/tmail-1.1.0/tmail/info.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionmailer-2.0.2/lib/action_mailer/vendor/tmail-1.1.0/tmail/info.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionmailer-2.0.2\lib\action_mailer\vendor\tmail-1.1.0\tmail\info.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionmailer-2.0.2/lib/action_mailer/vendor/tmail-1.1.0/tmail/interface.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionmailer-2.0.2/lib/action_mailer/vendor/tmail-1.1.0/tmail/interface.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionmailer-2.0.2/lib/action_mailer/vendor/tmail-1.1.0/tmail/interface.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionmailer-2.0.2\lib\action_mailer\vendor\tmail-1.1.0\tmail\interface.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionmailer-2.0.2/lib/action_mailer/vendor/tmail-1.1.0/tmail/loader.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionmailer-2.0.2/lib/action_mailer/vendor/tmail-1.1.0/tmail/loader.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionmailer-2.0.2/lib/action_mailer/vendor/tmail-1.1.0/tmail/loader.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionmailer-2.0.2\lib\action_mailer\vendor\tmail-1.1.0\tmail\loader.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionmailer-2.0.2/lib/action_mailer/vendor/tmail-1.1.0/tmail/mail.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionmailer-2.0.2/lib/action_mailer/vendor/tmail-1.1.0/tmail/mail.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionmailer-2.0.2/lib/action_mailer/vendor/tmail-1.1.0/tmail/mail.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionmailer-2.0.2\lib\action_mailer\vendor\tmail-1.1.0\tmail\mail.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionmailer-2.0.2/lib/action_mailer/vendor/tmail-1.1.0/tmail/mailbox.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionmailer-2.0.2/lib/action_mailer/vendor/tmail-1.1.0/tmail/mailbox.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionmailer-2.0.2/lib/action_mailer/vendor/tmail-1.1.0/tmail/mailbox.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionmailer-2.0.2\lib\action_mailer\vendor\tmail-1.1.0\tmail\mailbox.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionmailer-2.0.2/lib/action_mailer/vendor/tmail-1.1.0/tmail/mbox.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionmailer-2.0.2/lib/action_mailer/vendor/tmail-1.1.0/tmail/mbox.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionmailer-2.0.2/lib/action_mailer/vendor/tmail-1.1.0/tmail/mbox.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionmailer-2.0.2\lib\action_mailer\vendor\tmail-1.1.0\tmail\mbox.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionmailer-2.0.2/lib/action_mailer/vendor/tmail-1.1.0/tmail/net.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionmailer-2.0.2/lib/action_mailer/vendor/tmail-1.1.0/tmail/net.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionmailer-2.0.2/lib/action_mailer/vendor/tmail-1.1.0/tmail/net.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionmailer-2.0.2\lib\action_mailer\vendor\tmail-1.1.0\tmail\net.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionmailer-2.0.2/lib/action_mailer/vendor/tmail-1.1.0/tmail/obsolete.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionmailer-2.0.2/lib/action_mailer/vendor/tmail-1.1.0/tmail/obsolete.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionmailer-2.0.2/lib/action_mailer/vendor/tmail-1.1.0/tmail/obsolete.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionmailer-2.0.2\lib\action_mailer\vendor\tmail-1.1.0\tmail\obsolete.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionmailer-2.0.2/lib/action_mailer/vendor/tmail-1.1.0/tmail/parser.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionmailer-2.0.2/lib/action_mailer/vendor/tmail-1.1.0/tmail/parser.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionmailer-2.0.2/lib/action_mailer/vendor/tmail-1.1.0/tmail/parser.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionmailer-2.0.2\lib\action_mailer\vendor\tmail-1.1.0\tmail\parser.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionmailer-2.0.2/lib/action_mailer/vendor/tmail-1.1.0/tmail/port.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionmailer-2.0.2/lib/action_mailer/vendor/tmail-1.1.0/tmail/port.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionmailer-2.0.2/lib/action_mailer/vendor/tmail-1.1.0/tmail/port.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionmailer-2.0.2\lib\action_mailer\vendor\tmail-1.1.0\tmail\port.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionmailer-2.0.2/lib/action_mailer/vendor/tmail-1.1.0/tmail/quoting.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionmailer-2.0.2/lib/action_mailer/vendor/tmail-1.1.0/tmail/quoting.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionmailer-2.0.2/lib/action_mailer/vendor/tmail-1.1.0/tmail/quoting.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionmailer-2.0.2\lib\action_mailer\vendor\tmail-1.1.0\tmail\quoting.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionmailer-2.0.2/lib/action_mailer/vendor/tmail-1.1.0/tmail/scanner.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionmailer-2.0.2/lib/action_mailer/vendor/tmail-1.1.0/tmail/scanner.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionmailer-2.0.2/lib/action_mailer/vendor/tmail-1.1.0/tmail/scanner.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionmailer-2.0.2\lib\action_mailer\vendor\tmail-1.1.0\tmail\scanner.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionmailer-2.0.2/lib/action_mailer/vendor/tmail-1.1.0/tmail/scanner_r.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionmailer-2.0.2/lib/action_mailer/vendor/tmail-1.1.0/tmail/scanner_r.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionmailer-2.0.2/lib/action_mailer/vendor/tmail-1.1.0/tmail/scanner_r.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionmailer-2.0.2\lib\action_mailer\vendor\tmail-1.1.0\tmail\scanner_r.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionmailer-2.0.2/lib/action_mailer/vendor/tmail-1.1.0/tmail/stringio.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionmailer-2.0.2/lib/action_mailer/vendor/tmail-1.1.0/tmail/stringio.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionmailer-2.0.2/lib/action_mailer/vendor/tmail-1.1.0/tmail/stringio.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionmailer-2.0.2\lib\action_mailer\vendor\tmail-1.1.0\tmail\stringio.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionmailer-2.0.2/lib/action_mailer/vendor/tmail-1.1.0/tmail/tmail.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionmailer-2.0.2/lib/action_mailer/vendor/tmail-1.1.0/tmail/tmail.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionmailer-2.0.2/lib/action_mailer/vendor/tmail-1.1.0/tmail/tmail.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionmailer-2.0.2\lib\action_mailer\vendor\tmail-1.1.0\tmail\tmail.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionmailer-2.0.2/lib/action_mailer/vendor/tmail-1.1.0/tmail/utils.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionmailer-2.0.2/lib/action_mailer/vendor/tmail-1.1.0/tmail/utils.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionmailer-2.0.2/lib/action_mailer/vendor/tmail-1.1.0/tmail/utils.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionmailer-2.0.2\lib\action_mailer\vendor\tmail-1.1.0\tmail\utils.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionmailer-2.0.2/lib/action_mailer/vendor/tmail-1.1.0/tmail/version.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionmailer-2.0.2/lib/action_mailer/vendor/tmail-1.1.0/tmail/version.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionmailer-2.0.2/lib/action_mailer/vendor/tmail-1.1.0/tmail/version.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionmailer-2.0.2\lib\action_mailer\vendor\tmail-1.1.0\tmail\version.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionmailer-2.0.2/lib/action_mailer/vendor/tmail-1.1.0
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionmailer-2.0.2/lib/action_mailer/vendor/tmail-1.1.0/tmail.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionmailer-2.0.2/lib/action_mailer/vendor/tmail-1.1.0/tmail.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionmailer-2.0.2/lib/action_mailer/vendor/tmail-1.1.0/tmail.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionmailer-2.0.2\lib\action_mailer\vendor\tmail-1.1.0\tmail.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionmailer-2.0.2/test
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionmailer-2.0.2/test/abstract_unit.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionmailer-2.0.2/test/abstract_unit.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionmailer-2.0.2/test/abstract_unit.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionmailer-2.0.2\test\abstract_unit.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionmailer-2.0.2/test/delivery_method_test.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionmailer-2.0.2/test/delivery_method_test.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionmailer-2.0.2/test/delivery_method_test.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionmailer-2.0.2\test\delivery_method_test.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionmailer-2.0.2/test/mail_helper_test.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionmailer-2.0.2/test/mail_helper_test.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionmailer-2.0.2/test/mail_helper_test.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionmailer-2.0.2\test\mail_helper_test.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionmailer-2.0.2/test/mail_render_test.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionmailer-2.0.2/test/mail_render_test.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionmailer-2.0.2/test/mail_render_test.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionmailer-2.0.2\test\mail_render_test.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionmailer-2.0.2/test/mail_service_test.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionmailer-2.0.2/test/mail_service_test.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionmailer-2.0.2/test/mail_service_test.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionmailer-2.0.2\test\mail_service_test.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionmailer-2.0.2/test/quoting_test.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionmailer-2.0.2/test/quoting_test.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionmailer-2.0.2/test/quoting_test.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionmailer-2.0.2\test\quoting_test.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionmailer-2.0.2/test/test_helper_test.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionmailer-2.0.2/test/test_helper_test.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionmailer-2.0.2/test/test_helper_test.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionmailer-2.0.2\test\test_helper_test.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionmailer-2.0.2/test/tmail_test.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionmailer-2.0.2/test/tmail_test.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionmailer-2.0.2/test/tmail_test.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionmailer-2.0.2\test\tmail_test.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionmailer-2.0.2/test/url_test.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionmailer-2.0.2/test/url_test.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionmailer-2.0.2/test/url_test.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionmailer-2.0.2\test\url_test.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionmailer-2.0.2/test/fixtures/helpers
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionmailer-2.0.2/test/fixtures/helpers/example_helper.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionmailer-2.0.2/test/fixtures/helpers/example_helper.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionmailer-2.0.2/test/fixtures/helpers/example_helper.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionmailer-2.0.2\test\fixtures\helpers\example_helper.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/install.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/install.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionpack-2.0.2/install.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionpack-2.0.2\install.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/actionpack.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/actionpack.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionpack-2.0.2/lib/actionpack.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionpack-2.0.2\lib\actionpack.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_controller.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_controller.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_controller.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionpack-2.0.2\lib\action_controller.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_pack.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_pack.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_pack.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionpack-2.0.2\lib\action_pack.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_view.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_view.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_view.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionpack-2.0.2\lib\action_view.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_controller/assertions
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_controller/assertions/dom_assertions.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_controller/assertions/dom_assertions.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_controller/assertions/dom_assertions.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionpack-2.0.2\lib\action_controller\assertions\dom_assertions.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_controller/assertions/model_assertions.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_controller/assertions/model_assertions.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_controller/assertions/model_assertions.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionpack-2.0.2\lib\action_controller\assertions\model_assertions.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_controller/assertions/response_assertions.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_controller/assertions/response_assertions.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_controller/assertions/response_assertions.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionpack-2.0.2\lib\action_controller\assertions\response_assertions.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_controller/assertions/routing_assertions.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_controller/assertions/routing_assertions.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_controller/assertions/routing_assertions.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionpack-2.0.2\lib\action_controller\assertions\routing_assertions.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_controller/assertions/selector_assertions.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_controller/assertions/selector_assertions.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_controller/assertions/selector_assertions.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionpack-2.0.2\lib\action_controller\assertions\selector_assertions.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_controller/assertions/tag_assertions.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_controller/assertions/tag_assertions.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_controller/assertions/tag_assertions.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionpack-2.0.2\lib\action_controller\assertions\tag_assertions.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_controller
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_controller/assertions.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_controller/assertions.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_controller/assertions.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionpack-2.0.2\lib\action_controller\assertions.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_controller/base.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_controller/base.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_controller/base.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionpack-2.0.2\lib\action_controller\base.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_controller/benchmarking.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_controller/benchmarking.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_controller/benchmarking.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionpack-2.0.2\lib\action_controller\benchmarking.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_controller/caching.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_controller/caching.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_controller/caching.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionpack-2.0.2\lib\action_controller\caching.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_controller/cgi_ext.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_controller/cgi_ext.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_controller/cgi_ext.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionpack-2.0.2\lib\action_controller\cgi_ext.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_controller/cgi_process.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_controller/cgi_process.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_controller/cgi_process.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionpack-2.0.2\lib\action_controller\cgi_process.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_controller/components.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_controller/components.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_controller/components.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionpack-2.0.2\lib\action_controller\components.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_controller/cookies.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_controller/cookies.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_controller/cookies.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionpack-2.0.2\lib\action_controller\cookies.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_controller/dispatcher.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_controller/dispatcher.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_controller/dispatcher.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionpack-2.0.2\lib\action_controller\dispatcher.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_controller/filters.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_controller/filters.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_controller/filters.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionpack-2.0.2\lib\action_controller\filters.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_controller/flash.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_controller/flash.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_controller/flash.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionpack-2.0.2\lib\action_controller\flash.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_controller/helpers.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_controller/helpers.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_controller/helpers.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionpack-2.0.2\lib\action_controller\helpers.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_controller/http_authentication.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_controller/http_authentication.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_controller/http_authentication.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionpack-2.0.2\lib\action_controller\http_authentication.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_controller/integration.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_controller/integration.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_controller/integration.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionpack-2.0.2\lib\action_controller\integration.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_controller/layout.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_controller/layout.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_controller/layout.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionpack-2.0.2\lib\action_controller\layout.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_controller/mime_responds.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_controller/mime_responds.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_controller/mime_responds.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionpack-2.0.2\lib\action_controller\mime_responds.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_controller/mime_type.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_controller/mime_type.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_controller/mime_type.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionpack-2.0.2\lib\action_controller\mime_type.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_controller/mime_types.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_controller/mime_types.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_controller/mime_types.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionpack-2.0.2\lib\action_controller\mime_types.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_controller/polymorphic_routes.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_controller/polymorphic_routes.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_controller/polymorphic_routes.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionpack-2.0.2\lib\action_controller\polymorphic_routes.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_controller/record_identifier.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_controller/record_identifier.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_controller/record_identifier.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionpack-2.0.2\lib\action_controller\record_identifier.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_controller/request.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_controller/request.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_controller/request.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionpack-2.0.2\lib\action_controller\request.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_controller/request_forgery_protection.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_controller/request_forgery_protection.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_controller/request_forgery_protection.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionpack-2.0.2\lib\action_controller\request_forgery_protection.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_controller/request_profiler.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_controller/request_profiler.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_controller/request_profiler.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionpack-2.0.2\lib\action_controller\request_profiler.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_controller/rescue.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_controller/rescue.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_controller/rescue.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionpack-2.0.2\lib\action_controller\rescue.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_controller/resources.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_controller/resources.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_controller/resources.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionpack-2.0.2\lib\action_controller\resources.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_controller/response.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_controller/response.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_controller/response.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionpack-2.0.2\lib\action_controller\response.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_controller/routing.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_controller/routing.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_controller/routing.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionpack-2.0.2\lib\action_controller\routing.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_controller/routing_optimisation.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_controller/routing_optimisation.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_controller/routing_optimisation.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionpack-2.0.2\lib\action_controller\routing_optimisation.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_controller/session_management.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_controller/session_management.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_controller/session_management.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionpack-2.0.2\lib\action_controller\session_management.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_controller/status_codes.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_controller/status_codes.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_controller/status_codes.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionpack-2.0.2\lib\action_controller\status_codes.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_controller/streaming.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_controller/streaming.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_controller/streaming.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionpack-2.0.2\lib\action_controller\streaming.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_controller/test_case.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_controller/test_case.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_controller/test_case.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionpack-2.0.2\lib\action_controller\test_case.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_controller/test_process.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_controller/test_process.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_controller/test_process.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionpack-2.0.2\lib\action_controller\test_process.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_controller/url_rewriter.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_controller/url_rewriter.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_controller/url_rewriter.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionpack-2.0.2\lib\action_controller\url_rewriter.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_controller/verification.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_controller/verification.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_controller/verification.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionpack-2.0.2\lib\action_controller\verification.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_controller/cgi_ext
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_controller/cgi_ext/cookie.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_controller/cgi_ext/cookie.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_controller/cgi_ext/cookie.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionpack-2.0.2\lib\action_controller\cgi_ext\cookie.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_controller/cgi_ext/query_extension.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_controller/cgi_ext/query_extension.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_controller/cgi_ext/query_extension.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionpack-2.0.2\lib\action_controller\cgi_ext\query_extension.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_controller/cgi_ext/session.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_controller/cgi_ext/session.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_controller/cgi_ext/session.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionpack-2.0.2\lib\action_controller\cgi_ext\session.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_controller/cgi_ext/stdinput.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_controller/cgi_ext/stdinput.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_controller/cgi_ext/stdinput.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionpack-2.0.2\lib\action_controller\cgi_ext\stdinput.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_controller/session
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_controller/session/active_record_store.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_controller/session/active_record_store.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_controller/session/active_record_store.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionpack-2.0.2\lib\action_controller\session\active_record_store.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_controller/session/cookie_store.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_controller/session/cookie_store.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_controller/session/cookie_store.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionpack-2.0.2\lib\action_controller\session\cookie_store.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_controller/session/drb_server.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_controller/session/drb_server.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_controller/session/drb_server.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionpack-2.0.2\lib\action_controller\session\drb_server.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_controller/session/drb_store.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_controller/session/drb_store.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_controller/session/drb_store.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionpack-2.0.2\lib\action_controller\session\drb_store.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_controller/session/mem_cache_store.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_controller/session/mem_cache_store.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_controller/session/mem_cache_store.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionpack-2.0.2\lib\action_controller\session\mem_cache_store.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_controller/vendor/html-scanner/html
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_controller/vendor/html-scanner/html/document.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_controller/vendor/html-scanner/html/document.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_controller/vendor/html-scanner/html/document.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionpack-2.0.2\lib\action_controller\vendor\html-scanner\html\document.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_controller/vendor/html-scanner/html/node.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_controller/vendor/html-scanner/html/node.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_controller/vendor/html-scanner/html/node.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionpack-2.0.2\lib\action_controller\vendor\html-scanner\html\node.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_controller/vendor/html-scanner/html/sanitizer.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_controller/vendor/html-scanner/html/sanitizer.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_controller/vendor/html-scanner/html/sanitizer.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionpack-2.0.2\lib\action_controller\vendor\html-scanner\html\sanitizer.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_controller/vendor/html-scanner/html/selector.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_controller/vendor/html-scanner/html/selector.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_controller/vendor/html-scanner/html/selector.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionpack-2.0.2\lib\action_controller\vendor\html-scanner\html\selector.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_controller/vendor/html-scanner/html/tokenizer.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_controller/vendor/html-scanner/html/tokenizer.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_controller/vendor/html-scanner/html/tokenizer.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionpack-2.0.2\lib\action_controller\vendor\html-scanner\html\tokenizer.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_controller/vendor/html-scanner/html/version.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_controller/vendor/html-scanner/html/version.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_controller/vendor/html-scanner/html/version.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionpack-2.0.2\lib\action_controller\vendor\html-scanner\html\version.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_pack
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_pack/version.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_pack/version.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_pack/version.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionpack-2.0.2\lib\action_pack\version.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_view
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_view/base.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_view/base.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_view/base.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionpack-2.0.2\lib\action_view\base.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_view/compiled_templates.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_view/compiled_templates.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_view/compiled_templates.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionpack-2.0.2\lib\action_view\compiled_templates.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_view/partials.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_view/partials.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_view/partials.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionpack-2.0.2\lib\action_view\partials.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_view/template_error.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_view/template_error.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_view/template_error.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionpack-2.0.2\lib\action_view\template_error.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_view/template_handler.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_view/template_handler.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_view/template_handler.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionpack-2.0.2\lib\action_view\template_handler.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_view/helpers
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_view/helpers/active_record_helper.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_view/helpers/active_record_helper.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_view/helpers/active_record_helper.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionpack-2.0.2\lib\action_view\helpers\active_record_helper.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_view/helpers/asset_tag_helper.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_view/helpers/asset_tag_helper.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_view/helpers/asset_tag_helper.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionpack-2.0.2\lib\action_view\helpers\asset_tag_helper.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_view/helpers/atom_feed_helper.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_view/helpers/atom_feed_helper.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_view/helpers/atom_feed_helper.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionpack-2.0.2\lib\action_view\helpers\atom_feed_helper.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_view/helpers/benchmark_helper.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_view/helpers/benchmark_helper.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_view/helpers/benchmark_helper.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionpack-2.0.2\lib\action_view\helpers\benchmark_helper.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_view/helpers/cache_helper.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_view/helpers/cache_helper.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_view/helpers/cache_helper.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionpack-2.0.2\lib\action_view\helpers\cache_helper.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_view/helpers/capture_helper.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_view/helpers/capture_helper.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_view/helpers/capture_helper.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionpack-2.0.2\lib\action_view\helpers\capture_helper.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_view/helpers/date_helper.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_view/helpers/date_helper.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_view/helpers/date_helper.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionpack-2.0.2\lib\action_view\helpers\date_helper.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_view/helpers/debug_helper.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_view/helpers/debug_helper.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_view/helpers/debug_helper.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionpack-2.0.2\lib\action_view\helpers\debug_helper.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_view/helpers/form_helper.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_view/helpers/form_helper.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_view/helpers/form_helper.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionpack-2.0.2\lib\action_view\helpers\form_helper.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_view/helpers/form_options_helper.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_view/helpers/form_options_helper.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_view/helpers/form_options_helper.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionpack-2.0.2\lib\action_view\helpers\form_options_helper.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_view/helpers/form_tag_helper.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_view/helpers/form_tag_helper.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_view/helpers/form_tag_helper.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionpack-2.0.2\lib\action_view\helpers\form_tag_helper.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_view/helpers/javascript_helper.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_view/helpers/javascript_helper.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_view/helpers/javascript_helper.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionpack-2.0.2\lib\action_view\helpers\javascript_helper.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_view/helpers/number_helper.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_view/helpers/number_helper.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_view/helpers/number_helper.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionpack-2.0.2\lib\action_view\helpers\number_helper.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_view/helpers/prototype_helper.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_view/helpers/prototype_helper.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_view/helpers/prototype_helper.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionpack-2.0.2\lib\action_view\helpers\prototype_helper.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_view/helpers/record_identification_helper.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_view/helpers/record_identification_helper.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_view/helpers/record_identification_helper.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionpack-2.0.2\lib\action_view\helpers\record_identification_helper.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_view/helpers/record_tag_helper.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_view/helpers/record_tag_helper.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_view/helpers/record_tag_helper.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionpack-2.0.2\lib\action_view\helpers\record_tag_helper.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_view/helpers/sanitize_helper.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_view/helpers/sanitize_helper.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_view/helpers/sanitize_helper.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionpack-2.0.2\lib\action_view\helpers\sanitize_helper.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_view/helpers/scriptaculous_helper.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_view/helpers/scriptaculous_helper.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_view/helpers/scriptaculous_helper.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionpack-2.0.2\lib\action_view\helpers\scriptaculous_helper.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_view/helpers/tag_helper.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_view/helpers/tag_helper.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_view/helpers/tag_helper.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionpack-2.0.2\lib\action_view\helpers\tag_helper.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_view/helpers/text_helper.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_view/helpers/text_helper.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_view/helpers/text_helper.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionpack-2.0.2\lib\action_view\helpers\text_helper.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_view/helpers/url_helper.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_view/helpers/url_helper.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_view/helpers/url_helper.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionpack-2.0.2\lib\action_view\helpers\url_helper.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_view/template_handlers
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_view/template_handlers/builder.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_view/template_handlers/builder.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_view/template_handlers/builder.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionpack-2.0.2\lib\action_view\template_handlers\builder.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_view/template_handlers/erb.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_view/template_handlers/erb.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_view/template_handlers/erb.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionpack-2.0.2\lib\action_view\template_handlers\erb.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_view/template_handlers/rjs.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_view/template_handlers/rjs.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_view/template_handlers/rjs.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionpack-2.0.2\lib\action_view\template_handlers\rjs.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/abstract_unit.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/abstract_unit.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionpack-2.0.2/test/abstract_unit.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionpack-2.0.2\test\abstract_unit.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/action_view_test.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/action_view_test.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionpack-2.0.2/test/action_view_test.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionpack-2.0.2\test\action_view_test.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/active_record_unit.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/active_record_unit.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionpack-2.0.2/test/active_record_unit.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionpack-2.0.2\test\active_record_unit.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/testing_sandbox.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/testing_sandbox.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionpack-2.0.2/test/testing_sandbox.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionpack-2.0.2\test\testing_sandbox.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/activerecord
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/activerecord/active_record_store_test.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/activerecord/active_record_store_test.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionpack-2.0.2/test/activerecord/active_record_store_test.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionpack-2.0.2\test\activerecord\active_record_store_test.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/activerecord/render_partial_with_record_identification_test.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/activerecord/render_partial_with_record_identification_test.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionpack-2.0.2/test/activerecord/render_partial_with_record_identification_test.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionpack-2.0.2\test\activerecord\render_partial_with_record_identification_test.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/controller
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/controller/action_pack_assertions_test.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/controller/action_pack_assertions_test.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionpack-2.0.2/test/controller/action_pack_assertions_test.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionpack-2.0.2\test\controller\action_pack_assertions_test.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/controller/addresses_render_test.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/controller/addresses_render_test.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionpack-2.0.2/test/controller/addresses_render_test.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionpack-2.0.2\test\controller\addresses_render_test.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/controller/assert_select_test.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/controller/assert_select_test.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionpack-2.0.2/test/controller/assert_select_test.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionpack-2.0.2\test\controller\assert_select_test.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/controller/base_test.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/controller/base_test.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionpack-2.0.2/test/controller/base_test.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionpack-2.0.2\test\controller\base_test.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/controller/benchmark_test.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/controller/benchmark_test.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionpack-2.0.2/test/controller/benchmark_test.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionpack-2.0.2\test\controller\benchmark_test.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/controller/caching_test.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/controller/caching_test.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionpack-2.0.2/test/controller/caching_test.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionpack-2.0.2\test\controller\caching_test.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/controller/capture_test.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/controller/capture_test.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionpack-2.0.2/test/controller/capture_test.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionpack-2.0.2\test\controller\capture_test.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/controller/cgi_test.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/controller/cgi_test.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionpack-2.0.2/test/controller/cgi_test.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionpack-2.0.2\test\controller\cgi_test.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/controller/components_test.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/controller/components_test.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionpack-2.0.2/test/controller/components_test.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionpack-2.0.2\test\controller\components_test.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/controller/content_type_test.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/controller/content_type_test.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionpack-2.0.2/test/controller/content_type_test.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionpack-2.0.2\test\controller\content_type_test.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/controller/cookie_test.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/controller/cookie_test.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionpack-2.0.2/test/controller/cookie_test.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionpack-2.0.2\test\controller\cookie_test.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/controller/custom_handler_test.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/controller/custom_handler_test.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionpack-2.0.2/test/controller/custom_handler_test.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionpack-2.0.2\test\controller\custom_handler_test.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/controller/dispatcher_test.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/controller/dispatcher_test.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionpack-2.0.2/test/controller/dispatcher_test.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionpack-2.0.2\test\controller\dispatcher_test.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/controller/fake_controllers.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/controller/fake_controllers.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionpack-2.0.2/test/controller/fake_controllers.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionpack-2.0.2\test\controller\fake_controllers.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/controller/fake_models.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/controller/fake_models.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionpack-2.0.2/test/controller/fake_models.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionpack-2.0.2\test\controller\fake_models.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/controller/filters_test.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/controller/filters_test.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionpack-2.0.2/test/controller/filters_test.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionpack-2.0.2\test\controller\filters_test.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/controller/filter_params_test.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/controller/filter_params_test.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionpack-2.0.2/test/controller/filter_params_test.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionpack-2.0.2\test\controller\filter_params_test.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/controller/flash_test.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/controller/flash_test.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionpack-2.0.2/test/controller/flash_test.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionpack-2.0.2\test\controller\flash_test.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/controller/fragment_store_setting_test.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/controller/fragment_store_setting_test.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionpack-2.0.2/test/controller/fragment_store_setting_test.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionpack-2.0.2\test\controller\fragment_store_setting_test.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/controller/helper_test.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/controller/helper_test.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionpack-2.0.2/test/controller/helper_test.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionpack-2.0.2\test\controller\helper_test.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/controller/http_authentication_test.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/controller/http_authentication_test.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionpack-2.0.2/test/controller/http_authentication_test.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionpack-2.0.2\test\controller\http_authentication_test.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/controller/integration_test.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/controller/integration_test.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionpack-2.0.2/test/controller/integration_test.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionpack-2.0.2\test\controller\integration_test.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/controller/layout_test.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/controller/layout_test.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionpack-2.0.2/test/controller/layout_test.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionpack-2.0.2\test\controller\layout_test.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/controller/mime_responds_test.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/controller/mime_responds_test.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionpack-2.0.2/test/controller/mime_responds_test.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionpack-2.0.2\test\controller\mime_responds_test.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/controller/mime_type_test.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/controller/mime_type_test.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionpack-2.0.2/test/controller/mime_type_test.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionpack-2.0.2\test\controller\mime_type_test.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/controller/new_render_test.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/controller/new_render_test.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionpack-2.0.2/test/controller/new_render_test.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionpack-2.0.2\test\controller\new_render_test.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/controller/polymorphic_routes_test.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/controller/polymorphic_routes_test.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionpack-2.0.2/test/controller/polymorphic_routes_test.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionpack-2.0.2\test\controller\polymorphic_routes_test.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/controller/record_identifier_test.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/controller/record_identifier_test.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionpack-2.0.2/test/controller/record_identifier_test.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionpack-2.0.2\test\controller\record_identifier_test.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/controller/redirect_test.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/controller/redirect_test.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionpack-2.0.2/test/controller/redirect_test.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionpack-2.0.2\test\controller\redirect_test.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/controller/render_test.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/controller/render_test.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionpack-2.0.2/test/controller/render_test.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionpack-2.0.2\test\controller\render_test.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/controller/request_forgery_protection_test.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/controller/request_forgery_protection_test.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionpack-2.0.2/test/controller/request_forgery_protection_test.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionpack-2.0.2\test\controller\request_forgery_protection_test.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/controller/request_test.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/controller/request_test.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionpack-2.0.2/test/controller/request_test.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionpack-2.0.2\test\controller\request_test.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/controller/rescue_test.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/controller/rescue_test.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionpack-2.0.2/test/controller/rescue_test.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionpack-2.0.2\test\controller\rescue_test.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/controller/resources_test.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/controller/resources_test.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionpack-2.0.2/test/controller/resources_test.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionpack-2.0.2\test\controller\resources_test.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/controller/routing_test.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/controller/routing_test.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionpack-2.0.2/test/controller/routing_test.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionpack-2.0.2\test\controller\routing_test.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/controller/selector_test.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/controller/selector_test.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionpack-2.0.2/test/controller/selector_test.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionpack-2.0.2\test\controller\selector_test.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/controller/send_file_test.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/controller/send_file_test.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionpack-2.0.2/test/controller/send_file_test.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionpack-2.0.2\test\controller\send_file_test.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/controller/session_fixation_test.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/controller/session_fixation_test.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionpack-2.0.2/test/controller/session_fixation_test.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionpack-2.0.2\test\controller\session_fixation_test.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/controller/session_management_test.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/controller/session_management_test.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionpack-2.0.2/test/controller/session_management_test.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionpack-2.0.2\test\controller\session_management_test.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/controller/test_test.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/controller/test_test.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionpack-2.0.2/test/controller/test_test.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionpack-2.0.2\test\controller\test_test.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/controller/url_rewriter_test.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/controller/url_rewriter_test.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionpack-2.0.2/test/controller/url_rewriter_test.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionpack-2.0.2\test\controller\url_rewriter_test.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/controller/verification_test.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/controller/verification_test.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionpack-2.0.2/test/controller/verification_test.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionpack-2.0.2\test\controller\verification_test.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/controller/view_paths_test.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/controller/view_paths_test.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionpack-2.0.2/test/controller/view_paths_test.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionpack-2.0.2\test\controller\view_paths_test.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/controller/webservice_test.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/controller/webservice_test.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionpack-2.0.2/test/controller/webservice_test.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionpack-2.0.2\test\controller\webservice_test.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/controller/controller_fixtures/app/controllers/admin
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/controller/controller_fixtures/app/controllers/admin/user_controller.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/controller/controller_fixtures/app/controllers/admin/user_controller.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionpack-2.0.2/test/controller/controller_fixtures/app/controllers/admin/user_controller.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionpack-2.0.2\test\controller\controller_fixtures\app\controllers\admin\user_controller.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/controller/controller_fixtures/app/controllers
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/controller/controller_fixtures/app/controllers/user_controller.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/controller/controller_fixtures/app/controllers/user_controller.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionpack-2.0.2/test/controller/controller_fixtures/app/controllers/user_controller.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionpack-2.0.2\test\controller\controller_fixtures\app\controllers\user_controller.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/controller/controller_fixtures/vendor/plugins/bad_plugin/lib
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/controller/controller_fixtures/vendor/plugins/bad_plugin/lib/plugin_controller.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/controller/controller_fixtures/vendor/plugins/bad_plugin/lib/plugin_controller.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionpack-2.0.2/test/controller/controller_fixtures/vendor/plugins/bad_plugin/lib/plugin_controller.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionpack-2.0.2\test\controller\controller_fixtures\vendor\plugins\bad_plugin\lib\plugin_controller.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/controller/deprecation
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/controller/deprecation/deprecated_base_methods_test.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/controller/deprecation/deprecated_base_methods_test.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionpack-2.0.2/test/controller/deprecation/deprecated_base_methods_test.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionpack-2.0.2\test\controller\deprecation\deprecated_base_methods_test.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/controller/html-scanner
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/controller/html-scanner/document_test.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/controller/html-scanner/document_test.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionpack-2.0.2/test/controller/html-scanner/document_test.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionpack-2.0.2\test\controller\html-scanner\document_test.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/controller/html-scanner/node_test.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/controller/html-scanner/node_test.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionpack-2.0.2/test/controller/html-scanner/node_test.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionpack-2.0.2\test\controller\html-scanner\node_test.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/controller/html-scanner/sanitizer_test.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/controller/html-scanner/sanitizer_test.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionpack-2.0.2/test/controller/html-scanner/sanitizer_test.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionpack-2.0.2\test\controller\html-scanner\sanitizer_test.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/controller/html-scanner/tag_node_test.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/controller/html-scanner/tag_node_test.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionpack-2.0.2/test/controller/html-scanner/tag_node_test.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionpack-2.0.2\test\controller\html-scanner\tag_node_test.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/controller/html-scanner/text_node_test.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/controller/html-scanner/text_node_test.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionpack-2.0.2/test/controller/html-scanner/text_node_test.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionpack-2.0.2\test\controller\html-scanner\text_node_test.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/controller/html-scanner/tokenizer_test.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/controller/html-scanner/tokenizer_test.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionpack-2.0.2/test/controller/html-scanner/tokenizer_test.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionpack-2.0.2\test\controller\html-scanner\tokenizer_test.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/controller/session
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/controller/session/cookie_store_test.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/controller/session/cookie_store_test.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionpack-2.0.2/test/controller/session/cookie_store_test.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionpack-2.0.2\test\controller\session\cookie_store_test.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/controller/session/mem_cache_store_test.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/controller/session/mem_cache_store_test.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionpack-2.0.2/test/controller/session/mem_cache_store_test.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionpack-2.0.2\test\controller\session\mem_cache_store_test.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/fixtures
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/fixtures/company.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/fixtures/company.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionpack-2.0.2/test/fixtures/company.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionpack-2.0.2\test\fixtures\company.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/fixtures/developer.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/fixtures/developer.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionpack-2.0.2/test/fixtures/developer.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionpack-2.0.2\test\fixtures\developer.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/fixtures/project.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/fixtures/project.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionpack-2.0.2/test/fixtures/project.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionpack-2.0.2\test\fixtures\project.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/fixtures/reply.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/fixtures/reply.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionpack-2.0.2/test/fixtures/reply.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionpack-2.0.2\test\fixtures\reply.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/fixtures/topic.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/fixtures/topic.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionpack-2.0.2/test/fixtures/topic.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionpack-2.0.2\test\fixtures\topic.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/fixtures/helpers
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/fixtures/helpers/abc_helper.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/fixtures/helpers/abc_helper.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionpack-2.0.2/test/fixtures/helpers/abc_helper.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionpack-2.0.2\test\fixtures\helpers\abc_helper.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/fixtures/helpers/fun
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/fixtures/helpers/fun/games_helper.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/fixtures/helpers/fun/games_helper.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionpack-2.0.2/test/fixtures/helpers/fun/games_helper.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionpack-2.0.2\test\fixtures\helpers\fun\games_helper.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/fixtures/helpers/fun/pdf_helper.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/fixtures/helpers/fun/pdf_helper.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionpack-2.0.2/test/fixtures/helpers/fun/pdf_helper.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionpack-2.0.2\test\fixtures\helpers\fun\pdf_helper.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/template
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/template/active_record_helper_test.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/template/active_record_helper_test.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionpack-2.0.2/test/template/active_record_helper_test.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionpack-2.0.2\test\template\active_record_helper_test.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/template/asset_tag_helper_test.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/template/asset_tag_helper_test.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionpack-2.0.2/test/template/asset_tag_helper_test.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionpack-2.0.2\test\template\asset_tag_helper_test.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/template/atom_feed_helper_test.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/template/atom_feed_helper_test.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionpack-2.0.2/test/template/atom_feed_helper_test.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionpack-2.0.2\test\template\atom_feed_helper_test.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/template/benchmark_helper_test.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/template/benchmark_helper_test.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionpack-2.0.2/test/template/benchmark_helper_test.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionpack-2.0.2\test\template\benchmark_helper_test.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/template/compiled_templates_test.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/template/compiled_templates_test.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionpack-2.0.2/test/template/compiled_templates_test.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionpack-2.0.2\test\template\compiled_templates_test.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/template/date_helper_test.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/template/date_helper_test.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionpack-2.0.2/test/template/date_helper_test.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionpack-2.0.2\test\template\date_helper_test.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/template/erb_util_test.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/template/erb_util_test.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionpack-2.0.2/test/template/erb_util_test.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionpack-2.0.2\test\template\erb_util_test.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/template/form_helper_test.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/template/form_helper_test.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionpack-2.0.2/test/template/form_helper_test.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionpack-2.0.2\test\template\form_helper_test.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/template/form_options_helper_test.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/template/form_options_helper_test.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionpack-2.0.2/test/template/form_options_helper_test.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionpack-2.0.2\test\template\form_options_helper_test.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/template/form_tag_helper_test.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/template/form_tag_helper_test.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionpack-2.0.2/test/template/form_tag_helper_test.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionpack-2.0.2\test\template\form_tag_helper_test.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/template/javascript_helper_test.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/template/javascript_helper_test.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionpack-2.0.2/test/template/javascript_helper_test.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionpack-2.0.2\test\template\javascript_helper_test.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/template/number_helper_test.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/template/number_helper_test.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionpack-2.0.2/test/template/number_helper_test.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionpack-2.0.2\test\template\number_helper_test.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/template/prototype_helper_test.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/template/prototype_helper_test.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionpack-2.0.2/test/template/prototype_helper_test.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionpack-2.0.2\test\template\prototype_helper_test.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/template/sanitize_helper_test.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/template/sanitize_helper_test.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionpack-2.0.2/test/template/sanitize_helper_test.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionpack-2.0.2\test\template\sanitize_helper_test.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/template/scriptaculous_helper_test.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/template/scriptaculous_helper_test.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionpack-2.0.2/test/template/scriptaculous_helper_test.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionpack-2.0.2\test\template\scriptaculous_helper_test.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/template/tag_helper_test.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/template/tag_helper_test.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionpack-2.0.2/test/template/tag_helper_test.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionpack-2.0.2\test\template\tag_helper_test.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/template/text_helper_test.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/template/text_helper_test.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionpack-2.0.2/test/template/text_helper_test.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionpack-2.0.2\test\template\text_helper_test.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/template/url_helper_test.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/template/url_helper_test.rb: $(srcdir)/lib/ruby/gems/1.8/gems/actionpack-2.0.2/test/template/url_helper_test.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\actionpack-2.0.2\test\template\url_helper_test.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/install.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/install.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activerecord-2.0.2/install.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activerecord-2.0.2\install.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/lib
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/lib/activerecord.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/lib/activerecord.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activerecord-2.0.2/lib/activerecord.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activerecord-2.0.2\lib\activerecord.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/lib/active_record.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/lib/active_record.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activerecord-2.0.2/lib/active_record.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activerecord-2.0.2\lib\active_record.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/lib/active_record
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/lib/active_record/aggregations.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/lib/active_record/aggregations.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activerecord-2.0.2/lib/active_record/aggregations.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activerecord-2.0.2\lib\active_record\aggregations.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/lib/active_record/associations.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/lib/active_record/associations.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activerecord-2.0.2/lib/active_record/associations.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activerecord-2.0.2\lib\active_record\associations.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/lib/active_record/attribute_methods.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/lib/active_record/attribute_methods.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activerecord-2.0.2/lib/active_record/attribute_methods.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activerecord-2.0.2\lib\active_record\attribute_methods.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/lib/active_record/base.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/lib/active_record/base.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activerecord-2.0.2/lib/active_record/base.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activerecord-2.0.2\lib\active_record\base.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/lib/active_record/calculations.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/lib/active_record/calculations.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activerecord-2.0.2/lib/active_record/calculations.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activerecord-2.0.2\lib\active_record\calculations.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/lib/active_record/callbacks.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/lib/active_record/callbacks.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activerecord-2.0.2/lib/active_record/callbacks.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activerecord-2.0.2\lib\active_record\callbacks.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/lib/active_record/fixtures.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/lib/active_record/fixtures.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activerecord-2.0.2/lib/active_record/fixtures.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activerecord-2.0.2\lib\active_record\fixtures.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/lib/active_record/migration.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/lib/active_record/migration.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activerecord-2.0.2/lib/active_record/migration.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activerecord-2.0.2\lib\active_record\migration.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/lib/active_record/observer.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/lib/active_record/observer.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activerecord-2.0.2/lib/active_record/observer.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activerecord-2.0.2\lib\active_record\observer.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/lib/active_record/query_cache.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/lib/active_record/query_cache.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activerecord-2.0.2/lib/active_record/query_cache.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activerecord-2.0.2\lib\active_record\query_cache.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/lib/active_record/reflection.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/lib/active_record/reflection.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activerecord-2.0.2/lib/active_record/reflection.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activerecord-2.0.2\lib\active_record\reflection.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/lib/active_record/schema.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/lib/active_record/schema.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activerecord-2.0.2/lib/active_record/schema.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activerecord-2.0.2\lib\active_record\schema.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/lib/active_record/schema_dumper.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/lib/active_record/schema_dumper.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activerecord-2.0.2/lib/active_record/schema_dumper.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activerecord-2.0.2\lib\active_record\schema_dumper.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/lib/active_record/serialization.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/lib/active_record/serialization.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activerecord-2.0.2/lib/active_record/serialization.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activerecord-2.0.2\lib\active_record\serialization.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/lib/active_record/timestamp.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/lib/active_record/timestamp.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activerecord-2.0.2/lib/active_record/timestamp.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activerecord-2.0.2\lib\active_record\timestamp.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/lib/active_record/transactions.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/lib/active_record/transactions.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activerecord-2.0.2/lib/active_record/transactions.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activerecord-2.0.2\lib\active_record\transactions.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/lib/active_record/validations.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/lib/active_record/validations.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activerecord-2.0.2/lib/active_record/validations.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activerecord-2.0.2\lib\active_record\validations.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/lib/active_record/version.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/lib/active_record/version.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activerecord-2.0.2/lib/active_record/version.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activerecord-2.0.2\lib\active_record\version.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/lib/active_record/associations
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/lib/active_record/associations/association_collection.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/lib/active_record/associations/association_collection.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activerecord-2.0.2/lib/active_record/associations/association_collection.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activerecord-2.0.2\lib\active_record\associations\association_collection.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/lib/active_record/associations/association_proxy.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/lib/active_record/associations/association_proxy.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activerecord-2.0.2/lib/active_record/associations/association_proxy.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activerecord-2.0.2\lib\active_record\associations\association_proxy.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/lib/active_record/associations/belongs_to_association.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/lib/active_record/associations/belongs_to_association.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activerecord-2.0.2/lib/active_record/associations/belongs_to_association.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activerecord-2.0.2\lib\active_record\associations\belongs_to_association.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/lib/active_record/associations/belongs_to_polymorphic_association.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/lib/active_record/associations/belongs_to_polymorphic_association.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activerecord-2.0.2/lib/active_record/associations/belongs_to_polymorphic_association.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activerecord-2.0.2\lib\active_record\associations\belongs_to_polymorphic_association.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/lib/active_record/associations/has_and_belongs_to_many_association.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/lib/active_record/associations/has_and_belongs_to_many_association.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activerecord-2.0.2/lib/active_record/associations/has_and_belongs_to_many_association.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activerecord-2.0.2\lib\active_record\associations\has_and_belongs_to_many_association.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/lib/active_record/associations/has_many_association.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/lib/active_record/associations/has_many_association.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activerecord-2.0.2/lib/active_record/associations/has_many_association.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activerecord-2.0.2\lib\active_record\associations\has_many_association.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/lib/active_record/associations/has_many_through_association.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/lib/active_record/associations/has_many_through_association.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activerecord-2.0.2/lib/active_record/associations/has_many_through_association.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activerecord-2.0.2\lib\active_record\associations\has_many_through_association.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/lib/active_record/associations/has_one_association.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/lib/active_record/associations/has_one_association.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activerecord-2.0.2/lib/active_record/associations/has_one_association.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activerecord-2.0.2\lib\active_record\associations\has_one_association.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/lib/active_record/connection_adapters/abstract
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/lib/active_record/connection_adapters/abstract/connection_specification.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/lib/active_record/connection_adapters/abstract/connection_specification.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activerecord-2.0.2/lib/active_record/connection_adapters/abstract/connection_specification.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activerecord-2.0.2\lib\active_record\connection_adapters\abstract\connection_specification.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/lib/active_record/connection_adapters/abstract/database_statements.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/lib/active_record/connection_adapters/abstract/database_statements.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activerecord-2.0.2/lib/active_record/connection_adapters/abstract/database_statements.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activerecord-2.0.2\lib\active_record\connection_adapters\abstract\database_statements.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/lib/active_record/connection_adapters/abstract/query_cache.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/lib/active_record/connection_adapters/abstract/query_cache.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activerecord-2.0.2/lib/active_record/connection_adapters/abstract/query_cache.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activerecord-2.0.2\lib\active_record\connection_adapters\abstract\query_cache.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/lib/active_record/connection_adapters/abstract/quoting.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/lib/active_record/connection_adapters/abstract/quoting.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activerecord-2.0.2/lib/active_record/connection_adapters/abstract/quoting.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activerecord-2.0.2\lib\active_record\connection_adapters\abstract\quoting.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/lib/active_record/connection_adapters/abstract/schema_definitions.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/lib/active_record/connection_adapters/abstract/schema_definitions.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activerecord-2.0.2/lib/active_record/connection_adapters/abstract/schema_definitions.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activerecord-2.0.2\lib\active_record\connection_adapters\abstract\schema_definitions.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/lib/active_record/connection_adapters/abstract/schema_statements.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/lib/active_record/connection_adapters/abstract/schema_statements.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activerecord-2.0.2/lib/active_record/connection_adapters/abstract/schema_statements.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activerecord-2.0.2\lib\active_record\connection_adapters\abstract\schema_statements.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/lib/active_record/connection_adapters
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/lib/active_record/connection_adapters/abstract_adapter.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/lib/active_record/connection_adapters/abstract_adapter.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activerecord-2.0.2/lib/active_record/connection_adapters/abstract_adapter.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activerecord-2.0.2\lib\active_record\connection_adapters\abstract_adapter.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/lib/active_record/connection_adapters/mysql_adapter.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/lib/active_record/connection_adapters/mysql_adapter.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activerecord-2.0.2/lib/active_record/connection_adapters/mysql_adapter.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activerecord-2.0.2\lib\active_record\connection_adapters\mysql_adapter.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/lib/active_record/connection_adapters/postgresql_adapter.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/lib/active_record/connection_adapters/postgresql_adapter.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activerecord-2.0.2/lib/active_record/connection_adapters/postgresql_adapter.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activerecord-2.0.2\lib\active_record\connection_adapters\postgresql_adapter.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/lib/active_record/connection_adapters/sqlite3_adapter.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/lib/active_record/connection_adapters/sqlite3_adapter.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activerecord-2.0.2/lib/active_record/connection_adapters/sqlite3_adapter.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activerecord-2.0.2\lib\active_record\connection_adapters\sqlite3_adapter.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/lib/active_record/connection_adapters/sqlite_adapter.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/lib/active_record/connection_adapters/sqlite_adapter.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activerecord-2.0.2/lib/active_record/connection_adapters/sqlite_adapter.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activerecord-2.0.2\lib\active_record\connection_adapters\sqlite_adapter.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/lib/active_record/locking
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/lib/active_record/locking/optimistic.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/lib/active_record/locking/optimistic.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activerecord-2.0.2/lib/active_record/locking/optimistic.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activerecord-2.0.2\lib\active_record\locking\optimistic.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/lib/active_record/locking/pessimistic.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/lib/active_record/locking/pessimistic.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activerecord-2.0.2/lib/active_record/locking/pessimistic.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activerecord-2.0.2\lib\active_record\locking\pessimistic.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/lib/active_record/serializers
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/lib/active_record/serializers/json_serializer.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/lib/active_record/serializers/json_serializer.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activerecord-2.0.2/lib/active_record/serializers/json_serializer.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activerecord-2.0.2\lib\active_record\serializers\json_serializer.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/lib/active_record/serializers/xml_serializer.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/lib/active_record/serializers/xml_serializer.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activerecord-2.0.2/lib/active_record/serializers/xml_serializer.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activerecord-2.0.2\lib\active_record\serializers\xml_serializer.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/lib/active_record/vendor
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/lib/active_record/vendor/db2.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/lib/active_record/vendor/db2.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activerecord-2.0.2/lib/active_record/vendor/db2.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activerecord-2.0.2\lib\active_record\vendor\db2.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/lib/active_record/vendor/mysql.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/lib/active_record/vendor/mysql.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activerecord-2.0.2/lib/active_record/vendor/mysql.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activerecord-2.0.2\lib\active_record\vendor\mysql.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/aaa_create_tables_test.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/aaa_create_tables_test.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activerecord-2.0.2/test/aaa_create_tables_test.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activerecord-2.0.2\test\aaa_create_tables_test.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/abstract_unit.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/abstract_unit.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activerecord-2.0.2/test/abstract_unit.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activerecord-2.0.2\test\abstract_unit.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/active_schema_test_mysql.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/active_schema_test_mysql.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activerecord-2.0.2/test/active_schema_test_mysql.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activerecord-2.0.2\test\active_schema_test_mysql.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/adapter_test.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/adapter_test.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activerecord-2.0.2/test/adapter_test.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activerecord-2.0.2\test\adapter_test.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/adapter_test_sqlserver.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/adapter_test_sqlserver.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activerecord-2.0.2/test/adapter_test_sqlserver.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activerecord-2.0.2\test\adapter_test_sqlserver.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/aggregations_test.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/aggregations_test.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activerecord-2.0.2/test/aggregations_test.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activerecord-2.0.2\test\aggregations_test.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/ar_schema_test.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/ar_schema_test.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activerecord-2.0.2/test/ar_schema_test.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activerecord-2.0.2\test\ar_schema_test.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/associations_test.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/associations_test.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activerecord-2.0.2/test/associations_test.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activerecord-2.0.2\test\associations_test.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/association_inheritance_reload.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/association_inheritance_reload.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activerecord-2.0.2/test/association_inheritance_reload.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activerecord-2.0.2\test\association_inheritance_reload.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/attribute_methods_test.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/attribute_methods_test.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activerecord-2.0.2/test/attribute_methods_test.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activerecord-2.0.2\test\attribute_methods_test.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/base_test.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/base_test.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activerecord-2.0.2/test/base_test.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activerecord-2.0.2\test\base_test.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/binary_test.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/binary_test.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activerecord-2.0.2/test/binary_test.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activerecord-2.0.2\test\binary_test.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/calculations_test.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/calculations_test.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activerecord-2.0.2/test/calculations_test.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activerecord-2.0.2\test\calculations_test.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/callbacks_test.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/callbacks_test.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activerecord-2.0.2/test/callbacks_test.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activerecord-2.0.2\test\callbacks_test.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/class_inheritable_attributes_test.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/class_inheritable_attributes_test.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activerecord-2.0.2/test/class_inheritable_attributes_test.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activerecord-2.0.2\test\class_inheritable_attributes_test.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/column_alias_test.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/column_alias_test.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activerecord-2.0.2/test/column_alias_test.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activerecord-2.0.2\test\column_alias_test.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/connection_test_firebird.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/connection_test_firebird.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activerecord-2.0.2/test/connection_test_firebird.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activerecord-2.0.2\test\connection_test_firebird.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/connection_test_mysql.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/connection_test_mysql.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activerecord-2.0.2/test/connection_test_mysql.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activerecord-2.0.2\test\connection_test_mysql.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/copy_table_test_sqlite.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/copy_table_test_sqlite.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activerecord-2.0.2/test/copy_table_test_sqlite.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activerecord-2.0.2\test\copy_table_test_sqlite.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/datatype_test_postgresql.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/datatype_test_postgresql.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activerecord-2.0.2/test/datatype_test_postgresql.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activerecord-2.0.2\test\datatype_test_postgresql.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/date_time_test.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/date_time_test.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activerecord-2.0.2/test/date_time_test.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activerecord-2.0.2\test\date_time_test.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/defaults_test.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/defaults_test.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activerecord-2.0.2/test/defaults_test.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activerecord-2.0.2\test\defaults_test.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/default_test_firebird.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/default_test_firebird.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activerecord-2.0.2/test/default_test_firebird.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activerecord-2.0.2\test\default_test_firebird.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/deprecated_finder_test.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/deprecated_finder_test.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activerecord-2.0.2/test/deprecated_finder_test.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activerecord-2.0.2\test\deprecated_finder_test.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/finder_test.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/finder_test.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activerecord-2.0.2/test/finder_test.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activerecord-2.0.2\test\finder_test.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures_test.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures_test.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures_test.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activerecord-2.0.2\test\fixtures_test.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/inheritance_test.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/inheritance_test.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activerecord-2.0.2/test/inheritance_test.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activerecord-2.0.2\test\inheritance_test.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/json_serialization_test.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/json_serialization_test.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activerecord-2.0.2/test/json_serialization_test.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activerecord-2.0.2\test\json_serialization_test.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/lifecycle_test.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/lifecycle_test.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activerecord-2.0.2/test/lifecycle_test.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activerecord-2.0.2\test\lifecycle_test.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/locking_test.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/locking_test.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activerecord-2.0.2/test/locking_test.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activerecord-2.0.2\test\locking_test.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/method_scoping_test.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/method_scoping_test.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activerecord-2.0.2/test/method_scoping_test.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activerecord-2.0.2\test\method_scoping_test.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/migration_test.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/migration_test.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activerecord-2.0.2/test/migration_test.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activerecord-2.0.2\test\migration_test.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/migration_test_firebird.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/migration_test_firebird.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activerecord-2.0.2/test/migration_test_firebird.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activerecord-2.0.2\test\migration_test_firebird.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/mixin_test.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/mixin_test.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activerecord-2.0.2/test/mixin_test.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activerecord-2.0.2\test\mixin_test.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/modules_test.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/modules_test.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activerecord-2.0.2/test/modules_test.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activerecord-2.0.2\test\modules_test.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/multiple_db_test.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/multiple_db_test.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activerecord-2.0.2/test/multiple_db_test.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activerecord-2.0.2\test\multiple_db_test.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/pk_test.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/pk_test.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activerecord-2.0.2/test/pk_test.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activerecord-2.0.2\test\pk_test.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/query_cache_test.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/query_cache_test.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activerecord-2.0.2/test/query_cache_test.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activerecord-2.0.2\test\query_cache_test.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/readonly_test.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/readonly_test.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activerecord-2.0.2/test/readonly_test.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activerecord-2.0.2\test\readonly_test.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/reflection_test.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/reflection_test.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activerecord-2.0.2/test/reflection_test.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activerecord-2.0.2\test\reflection_test.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/reserved_word_test_mysql.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/reserved_word_test_mysql.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activerecord-2.0.2/test/reserved_word_test_mysql.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activerecord-2.0.2\test\reserved_word_test_mysql.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/schema_authorization_test_postgresql.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/schema_authorization_test_postgresql.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activerecord-2.0.2/test/schema_authorization_test_postgresql.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activerecord-2.0.2\test\schema_authorization_test_postgresql.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/schema_dumper_test.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/schema_dumper_test.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activerecord-2.0.2/test/schema_dumper_test.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activerecord-2.0.2\test\schema_dumper_test.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/schema_test_postgresql.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/schema_test_postgresql.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activerecord-2.0.2/test/schema_test_postgresql.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activerecord-2.0.2\test\schema_test_postgresql.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/serialization_test.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/serialization_test.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activerecord-2.0.2/test/serialization_test.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activerecord-2.0.2\test\serialization_test.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/synonym_test_oracle.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/synonym_test_oracle.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activerecord-2.0.2/test/synonym_test_oracle.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activerecord-2.0.2\test\synonym_test_oracle.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/table_name_test_sqlserver.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/table_name_test_sqlserver.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activerecord-2.0.2/test/table_name_test_sqlserver.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activerecord-2.0.2\test\table_name_test_sqlserver.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/threaded_connections_test.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/threaded_connections_test.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activerecord-2.0.2/test/threaded_connections_test.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activerecord-2.0.2\test\threaded_connections_test.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/transactions_test.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/transactions_test.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activerecord-2.0.2/test/transactions_test.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activerecord-2.0.2\test\transactions_test.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/unconnected_test.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/unconnected_test.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activerecord-2.0.2/test/unconnected_test.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activerecord-2.0.2\test\unconnected_test.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/validations_test.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/validations_test.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activerecord-2.0.2/test/validations_test.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activerecord-2.0.2\test\validations_test.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/xml_serialization_test.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/xml_serialization_test.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activerecord-2.0.2/test/xml_serialization_test.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activerecord-2.0.2\test\xml_serialization_test.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/associations
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/associations/callbacks_test.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/associations/callbacks_test.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activerecord-2.0.2/test/associations/callbacks_test.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activerecord-2.0.2\test\associations\callbacks_test.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/associations/cascaded_eager_loading_test.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/associations/cascaded_eager_loading_test.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activerecord-2.0.2/test/associations/cascaded_eager_loading_test.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activerecord-2.0.2\test\associations\cascaded_eager_loading_test.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/associations/eager_singularization_test.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/associations/eager_singularization_test.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activerecord-2.0.2/test/associations/eager_singularization_test.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activerecord-2.0.2\test\associations\eager_singularization_test.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/associations/eager_test.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/associations/eager_test.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activerecord-2.0.2/test/associations/eager_test.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activerecord-2.0.2\test\associations\eager_test.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/associations/extension_test.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/associations/extension_test.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activerecord-2.0.2/test/associations/extension_test.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activerecord-2.0.2\test\associations\extension_test.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/associations/inner_join_association_test.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/associations/inner_join_association_test.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activerecord-2.0.2/test/associations/inner_join_association_test.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activerecord-2.0.2\test\associations\inner_join_association_test.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/associations/join_model_test.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/associations/join_model_test.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activerecord-2.0.2/test/associations/join_model_test.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activerecord-2.0.2\test\associations\join_model_test.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/connections/native_db2
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/connections/native_db2/connection.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/connections/native_db2/connection.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activerecord-2.0.2/test/connections/native_db2/connection.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activerecord-2.0.2\test\connections\native_db2\connection.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/connections/native_firebird
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/connections/native_firebird/connection.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/connections/native_firebird/connection.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activerecord-2.0.2/test/connections/native_firebird/connection.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activerecord-2.0.2\test\connections\native_firebird\connection.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/connections/native_frontbase
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/connections/native_frontbase/connection.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/connections/native_frontbase/connection.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activerecord-2.0.2/test/connections/native_frontbase/connection.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activerecord-2.0.2\test\connections\native_frontbase\connection.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/connections/native_mysql
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/connections/native_mysql/connection.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/connections/native_mysql/connection.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activerecord-2.0.2/test/connections/native_mysql/connection.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activerecord-2.0.2\test\connections\native_mysql\connection.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/connections/native_openbase
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/connections/native_openbase/connection.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/connections/native_openbase/connection.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activerecord-2.0.2/test/connections/native_openbase/connection.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activerecord-2.0.2\test\connections\native_openbase\connection.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/connections/native_oracle
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/connections/native_oracle/connection.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/connections/native_oracle/connection.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activerecord-2.0.2/test/connections/native_oracle/connection.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activerecord-2.0.2\test\connections\native_oracle\connection.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/connections/native_postgresql
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/connections/native_postgresql/connection.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/connections/native_postgresql/connection.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activerecord-2.0.2/test/connections/native_postgresql/connection.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activerecord-2.0.2\test\connections\native_postgresql\connection.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/connections/native_sqlite
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/connections/native_sqlite/connection.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/connections/native_sqlite/connection.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activerecord-2.0.2/test/connections/native_sqlite/connection.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activerecord-2.0.2\test\connections\native_sqlite\connection.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/connections/native_sqlite3
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/connections/native_sqlite3/connection.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/connections/native_sqlite3/connection.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activerecord-2.0.2/test/connections/native_sqlite3/connection.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activerecord-2.0.2\test\connections\native_sqlite3\connection.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/connections/native_sqlite3/in_memory_connection.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/connections/native_sqlite3/in_memory_connection.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activerecord-2.0.2/test/connections/native_sqlite3/in_memory_connection.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activerecord-2.0.2\test\connections\native_sqlite3\in_memory_connection.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/connections/native_sybase
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/connections/native_sybase/connection.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/connections/native_sybase/connection.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activerecord-2.0.2/test/connections/native_sybase/connection.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activerecord-2.0.2\test\connections\native_sybase\connection.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures/author.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures/author.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures/author.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activerecord-2.0.2\test\fixtures\author.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures/auto_id.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures/auto_id.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures/auto_id.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activerecord-2.0.2\test\fixtures\auto_id.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures/binary.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures/binary.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures/binary.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activerecord-2.0.2\test\fixtures\binary.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures/book.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures/book.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures/book.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activerecord-2.0.2\test\fixtures\book.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures/categorization.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures/categorization.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures/categorization.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activerecord-2.0.2\test\fixtures\categorization.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures/category.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures/category.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures/category.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activerecord-2.0.2\test\fixtures\category.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures/citation.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures/citation.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures/citation.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activerecord-2.0.2\test\fixtures\citation.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures/column_name.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures/column_name.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures/column_name.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activerecord-2.0.2\test\fixtures\column_name.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures/comment.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures/comment.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures/comment.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activerecord-2.0.2\test\fixtures\comment.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures/company.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures/company.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures/company.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activerecord-2.0.2\test\fixtures\company.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures/company_in_module.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures/company_in_module.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures/company_in_module.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activerecord-2.0.2\test\fixtures\company_in_module.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures/computer.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures/computer.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures/computer.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activerecord-2.0.2\test\fixtures\computer.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures/contact.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures/contact.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures/contact.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activerecord-2.0.2\test\fixtures\contact.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures/course.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures/course.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures/course.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activerecord-2.0.2\test\fixtures\course.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures/customer.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures/customer.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures/customer.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activerecord-2.0.2\test\fixtures\customer.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures/default.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures/default.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures/default.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activerecord-2.0.2\test\fixtures\default.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures/developer.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures/developer.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures/developer.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activerecord-2.0.2\test\fixtures\developer.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures/edge.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures/edge.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures/edge.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activerecord-2.0.2\test\fixtures\edge.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures/entrant.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures/entrant.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures/entrant.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activerecord-2.0.2\test\fixtures\entrant.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures/item.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures/item.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures/item.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activerecord-2.0.2\test\fixtures\item.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures/joke.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures/joke.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures/joke.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activerecord-2.0.2\test\fixtures\joke.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures/keyboard.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures/keyboard.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures/keyboard.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activerecord-2.0.2\test\fixtures\keyboard.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures/legacy_thing.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures/legacy_thing.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures/legacy_thing.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activerecord-2.0.2\test\fixtures\legacy_thing.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures/matey.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures/matey.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures/matey.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activerecord-2.0.2\test\fixtures\matey.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures/minimalistic.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures/minimalistic.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures/minimalistic.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activerecord-2.0.2\test\fixtures\minimalistic.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures/mixed_case_monkey.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures/mixed_case_monkey.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures/mixed_case_monkey.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activerecord-2.0.2\test\fixtures\mixed_case_monkey.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures/movie.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures/movie.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures/movie.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activerecord-2.0.2\test\fixtures\movie.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures/order.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures/order.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures/order.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activerecord-2.0.2\test\fixtures\order.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures/parrot.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures/parrot.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures/parrot.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activerecord-2.0.2\test\fixtures\parrot.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures/person.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures/person.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures/person.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activerecord-2.0.2\test\fixtures\person.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures/pirate.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures/pirate.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures/pirate.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activerecord-2.0.2\test\fixtures\pirate.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures/post.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures/post.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures/post.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activerecord-2.0.2\test\fixtures\post.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures/project.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures/project.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures/project.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activerecord-2.0.2\test\fixtures\project.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures/reader.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures/reader.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures/reader.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activerecord-2.0.2\test\fixtures\reader.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures/reply.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures/reply.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures/reply.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activerecord-2.0.2\test\fixtures\reply.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures/ship.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures/ship.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures/ship.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activerecord-2.0.2\test\fixtures\ship.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures/subject.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures/subject.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures/subject.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activerecord-2.0.2\test\fixtures\subject.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures/subscriber.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures/subscriber.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures/subscriber.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activerecord-2.0.2\test\fixtures\subscriber.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures/tag.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures/tag.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures/tag.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activerecord-2.0.2\test\fixtures\tag.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures/tagging.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures/tagging.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures/tagging.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activerecord-2.0.2\test\fixtures\tagging.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures/task.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures/task.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures/task.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activerecord-2.0.2\test\fixtures\task.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures/topic.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures/topic.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures/topic.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activerecord-2.0.2\test\fixtures\topic.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures/treasure.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures/treasure.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures/treasure.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activerecord-2.0.2\test\fixtures\treasure.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures/vertex.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures/vertex.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures/vertex.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activerecord-2.0.2\test\fixtures\vertex.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures/db_definitions
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures/db_definitions/schema.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures/db_definitions/schema.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures/db_definitions/schema.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activerecord-2.0.2\test\fixtures\db_definitions\schema.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures/db_definitions/schema2.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures/db_definitions/schema2.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures/db_definitions/schema2.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activerecord-2.0.2\test\fixtures\db_definitions\schema2.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures/migrations
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures/migrations/1_people_have_last_names.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures/migrations/1_people_have_last_names.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures/migrations/1_people_have_last_names.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activerecord-2.0.2\test\fixtures\migrations\1_people_have_last_names.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures/migrations/2_we_need_reminders.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures/migrations/2_we_need_reminders.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures/migrations/2_we_need_reminders.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activerecord-2.0.2\test\fixtures\migrations\2_we_need_reminders.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures/migrations/3_innocent_jointable.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures/migrations/3_innocent_jointable.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures/migrations/3_innocent_jointable.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activerecord-2.0.2\test\fixtures\migrations\3_innocent_jointable.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures/migrations_with_decimal
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures/migrations_with_decimal/1_give_me_big_numbers.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures/migrations_with_decimal/1_give_me_big_numbers.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures/migrations_with_decimal/1_give_me_big_numbers.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activerecord-2.0.2\test\fixtures\migrations_with_decimal\1_give_me_big_numbers.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures/migrations_with_duplicate
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures/migrations_with_duplicate/1_people_have_last_names.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures/migrations_with_duplicate/1_people_have_last_names.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures/migrations_with_duplicate/1_people_have_last_names.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activerecord-2.0.2\test\fixtures\migrations_with_duplicate\1_people_have_last_names.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures/migrations_with_duplicate/2_we_need_reminders.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures/migrations_with_duplicate/2_we_need_reminders.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures/migrations_with_duplicate/2_we_need_reminders.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activerecord-2.0.2\test\fixtures\migrations_with_duplicate\2_we_need_reminders.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures/migrations_with_duplicate/3_foo.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures/migrations_with_duplicate/3_foo.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures/migrations_with_duplicate/3_foo.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activerecord-2.0.2\test\fixtures\migrations_with_duplicate\3_foo.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures/migrations_with_duplicate/3_innocent_jointable.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures/migrations_with_duplicate/3_innocent_jointable.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures/migrations_with_duplicate/3_innocent_jointable.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activerecord-2.0.2\test\fixtures\migrations_with_duplicate\3_innocent_jointable.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures/migrations_with_missing_versions
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures/migrations_with_missing_versions/1000_people_have_middle_names.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures/migrations_with_missing_versions/1000_people_have_middle_names.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures/migrations_with_missing_versions/1000_people_have_middle_names.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activerecord-2.0.2\test\fixtures\migrations_with_missing_versions\1000_people_have_middle_names.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures/migrations_with_missing_versions/1_people_have_last_names.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures/migrations_with_missing_versions/1_people_have_last_names.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures/migrations_with_missing_versions/1_people_have_last_names.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activerecord-2.0.2\test\fixtures\migrations_with_missing_versions\1_people_have_last_names.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures/migrations_with_missing_versions/3_we_need_reminders.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures/migrations_with_missing_versions/3_we_need_reminders.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures/migrations_with_missing_versions/3_we_need_reminders.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activerecord-2.0.2\test\fixtures\migrations_with_missing_versions\3_we_need_reminders.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures/migrations_with_missing_versions/4_innocent_jointable.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures/migrations_with_missing_versions/4_innocent_jointable.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures/migrations_with_missing_versions/4_innocent_jointable.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activerecord-2.0.2\test\fixtures\migrations_with_missing_versions\4_innocent_jointable.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activeresource-2.0.2/lib
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activeresource-2.0.2/lib/activeresource.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activeresource-2.0.2/lib/activeresource.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activeresource-2.0.2/lib/activeresource.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activeresource-2.0.2\lib\activeresource.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activeresource-2.0.2/lib/active_resource.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activeresource-2.0.2/lib/active_resource.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activeresource-2.0.2/lib/active_resource.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activeresource-2.0.2\lib\active_resource.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activeresource-2.0.2/lib/active_resource
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activeresource-2.0.2/lib/active_resource/base.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activeresource-2.0.2/lib/active_resource/base.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activeresource-2.0.2/lib/active_resource/base.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activeresource-2.0.2\lib\active_resource\base.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activeresource-2.0.2/lib/active_resource/connection.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activeresource-2.0.2/lib/active_resource/connection.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activeresource-2.0.2/lib/active_resource/connection.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activeresource-2.0.2\lib\active_resource\connection.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activeresource-2.0.2/lib/active_resource/custom_methods.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activeresource-2.0.2/lib/active_resource/custom_methods.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activeresource-2.0.2/lib/active_resource/custom_methods.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activeresource-2.0.2\lib\active_resource\custom_methods.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activeresource-2.0.2/lib/active_resource/formats.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activeresource-2.0.2/lib/active_resource/formats.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activeresource-2.0.2/lib/active_resource/formats.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activeresource-2.0.2\lib\active_resource\formats.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activeresource-2.0.2/lib/active_resource/http_mock.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activeresource-2.0.2/lib/active_resource/http_mock.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activeresource-2.0.2/lib/active_resource/http_mock.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activeresource-2.0.2\lib\active_resource\http_mock.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activeresource-2.0.2/lib/active_resource/validations.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activeresource-2.0.2/lib/active_resource/validations.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activeresource-2.0.2/lib/active_resource/validations.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activeresource-2.0.2\lib\active_resource\validations.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activeresource-2.0.2/lib/active_resource/version.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activeresource-2.0.2/lib/active_resource/version.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activeresource-2.0.2/lib/active_resource/version.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activeresource-2.0.2\lib\active_resource\version.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activeresource-2.0.2/lib/active_resource/formats
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activeresource-2.0.2/lib/active_resource/formats/json_format.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activeresource-2.0.2/lib/active_resource/formats/json_format.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activeresource-2.0.2/lib/active_resource/formats/json_format.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activeresource-2.0.2\lib\active_resource\formats\json_format.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activeresource-2.0.2/lib/active_resource/formats/xml_format.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activeresource-2.0.2/lib/active_resource/formats/xml_format.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activeresource-2.0.2/lib/active_resource/formats/xml_format.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activeresource-2.0.2\lib\active_resource\formats\xml_format.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activeresource-2.0.2/test
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activeresource-2.0.2/test/abstract_unit.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activeresource-2.0.2/test/abstract_unit.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activeresource-2.0.2/test/abstract_unit.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activeresource-2.0.2\test\abstract_unit.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activeresource-2.0.2/test/authorization_test.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activeresource-2.0.2/test/authorization_test.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activeresource-2.0.2/test/authorization_test.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activeresource-2.0.2\test\authorization_test.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activeresource-2.0.2/test/base_errors_test.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activeresource-2.0.2/test/base_errors_test.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activeresource-2.0.2/test/base_errors_test.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activeresource-2.0.2\test\base_errors_test.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activeresource-2.0.2/test/base_test.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activeresource-2.0.2/test/base_test.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activeresource-2.0.2/test/base_test.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activeresource-2.0.2\test\base_test.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activeresource-2.0.2/test/connection_test.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activeresource-2.0.2/test/connection_test.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activeresource-2.0.2/test/connection_test.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activeresource-2.0.2\test\connection_test.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activeresource-2.0.2/test/format_test.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activeresource-2.0.2/test/format_test.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activeresource-2.0.2/test/format_test.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activeresource-2.0.2\test\format_test.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activeresource-2.0.2/test/setter_trap.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activeresource-2.0.2/test/setter_trap.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activeresource-2.0.2/test/setter_trap.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activeresource-2.0.2\test\setter_trap.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activeresource-2.0.2/test/base
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activeresource-2.0.2/test/base/custom_methods_test.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activeresource-2.0.2/test/base/custom_methods_test.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activeresource-2.0.2/test/base/custom_methods_test.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activeresource-2.0.2\test\base\custom_methods_test.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activeresource-2.0.2/test/base/equality_test.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activeresource-2.0.2/test/base/equality_test.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activeresource-2.0.2/test/base/equality_test.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activeresource-2.0.2\test\base\equality_test.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activeresource-2.0.2/test/base/load_test.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activeresource-2.0.2/test/base/load_test.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activeresource-2.0.2/test/base/load_test.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activeresource-2.0.2\test\base\load_test.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activeresource-2.0.2/test/fixtures
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activeresource-2.0.2/test/fixtures/beast.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activeresource-2.0.2/test/fixtures/beast.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activeresource-2.0.2/test/fixtures/beast.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activeresource-2.0.2\test\fixtures\beast.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activeresource-2.0.2/test/fixtures/person.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activeresource-2.0.2/test/fixtures/person.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activeresource-2.0.2/test/fixtures/person.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activeresource-2.0.2\test\fixtures\person.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activeresource-2.0.2/test/fixtures/street_address.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activeresource-2.0.2/test/fixtures/street_address.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activeresource-2.0.2/test/fixtures/street_address.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activeresource-2.0.2\test\fixtures\street_address.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/activesupport.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/activesupport.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activesupport-2.0.2/lib/activesupport.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activesupport-2.0.2\lib\activesupport.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activesupport-2.0.2\lib\active_support.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/basic_object.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/basic_object.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/basic_object.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activesupport-2.0.2\lib\active_support\basic_object.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/buffered_logger.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/buffered_logger.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/buffered_logger.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activesupport-2.0.2\lib\active_support\buffered_logger.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/clean_logger.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/clean_logger.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/clean_logger.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activesupport-2.0.2\lib\active_support\clean_logger.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activesupport-2.0.2\lib\active_support\core_ext.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/dependencies.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/dependencies.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/dependencies.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activesupport-2.0.2\lib\active_support\dependencies.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/deprecation.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/deprecation.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/deprecation.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activesupport-2.0.2\lib\active_support\deprecation.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/duration.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/duration.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/duration.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activesupport-2.0.2\lib\active_support\duration.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/inflections.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/inflections.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/inflections.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activesupport-2.0.2\lib\active_support\inflections.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/inflector.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/inflector.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/inflector.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activesupport-2.0.2\lib\active_support\inflector.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/json.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/json.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/json.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activesupport-2.0.2\lib\active_support\json.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/multibyte.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/multibyte.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/multibyte.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activesupport-2.0.2\lib\active_support\multibyte.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/option_merger.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/option_merger.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/option_merger.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activesupport-2.0.2\lib\active_support\option_merger.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/ordered_options.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/ordered_options.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/ordered_options.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activesupport-2.0.2\lib\active_support\ordered_options.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/testing.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/testing.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/testing.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activesupport-2.0.2\lib\active_support\testing.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/test_case.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/test_case.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/test_case.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activesupport-2.0.2\lib\active_support\test_case.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/vendor.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/vendor.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/vendor.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activesupport-2.0.2\lib\active_support\vendor.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/version.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/version.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/version.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activesupport-2.0.2\lib\active_support\version.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/whiny_nil.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/whiny_nil.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/whiny_nil.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activesupport-2.0.2\lib\active_support\whiny_nil.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/array
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/array/access.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/array/access.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/array/access.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activesupport-2.0.2\lib\active_support\core_ext\array\access.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/array/conversions.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/array/conversions.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/array/conversions.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activesupport-2.0.2\lib\active_support\core_ext\array\conversions.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/array/extract_options.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/array/extract_options.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/array/extract_options.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activesupport-2.0.2\lib\active_support\core_ext\array\extract_options.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/array/grouping.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/array/grouping.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/array/grouping.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activesupport-2.0.2\lib\active_support\core_ext\array\grouping.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/array/random_access.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/array/random_access.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/array/random_access.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activesupport-2.0.2\lib\active_support\core_ext\array\random_access.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/array.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/array.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/array.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activesupport-2.0.2\lib\active_support\core_ext\array.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/bigdecimal.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/bigdecimal.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/bigdecimal.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activesupport-2.0.2\lib\active_support\core_ext\bigdecimal.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/blank.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/blank.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/blank.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activesupport-2.0.2\lib\active_support\core_ext\blank.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/cgi.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/cgi.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/cgi.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activesupport-2.0.2\lib\active_support\core_ext\cgi.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/class.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/class.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/class.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activesupport-2.0.2\lib\active_support\core_ext\class.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/date.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/date.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/date.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activesupport-2.0.2\lib\active_support\core_ext\date.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/date_time.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/date_time.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/date_time.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activesupport-2.0.2\lib\active_support\core_ext\date_time.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/duplicable.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/duplicable.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/duplicable.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activesupport-2.0.2\lib\active_support\core_ext\duplicable.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/enumerable.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/enumerable.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/enumerable.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activesupport-2.0.2\lib\active_support\core_ext\enumerable.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/exception.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/exception.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/exception.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activesupport-2.0.2\lib\active_support\core_ext\exception.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/file.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/file.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/file.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activesupport-2.0.2\lib\active_support\core_ext\file.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/float.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/float.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/float.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activesupport-2.0.2\lib\active_support\core_ext\float.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/hash.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/hash.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/hash.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activesupport-2.0.2\lib\active_support\core_ext\hash.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/integer.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/integer.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/integer.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activesupport-2.0.2\lib\active_support\core_ext\integer.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/kernel.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/kernel.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/kernel.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activesupport-2.0.2\lib\active_support\core_ext\kernel.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/load_error.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/load_error.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/load_error.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activesupport-2.0.2\lib\active_support\core_ext\load_error.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/logger.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/logger.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/logger.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activesupport-2.0.2\lib\active_support\core_ext\logger.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/module.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/module.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/module.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activesupport-2.0.2\lib\active_support\core_ext\module.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/name_error.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/name_error.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/name_error.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activesupport-2.0.2\lib\active_support\core_ext\name_error.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/numeric.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/numeric.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/numeric.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activesupport-2.0.2\lib\active_support\core_ext\numeric.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/object.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/object.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/object.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activesupport-2.0.2\lib\active_support\core_ext\object.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/pathname.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/pathname.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/pathname.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activesupport-2.0.2\lib\active_support\core_ext\pathname.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/proc.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/proc.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/proc.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activesupport-2.0.2\lib\active_support\core_ext\proc.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/range.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/range.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/range.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activesupport-2.0.2\lib\active_support\core_ext\range.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/string.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/string.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/string.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activesupport-2.0.2\lib\active_support\core_ext\string.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/symbol.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/symbol.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/symbol.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activesupport-2.0.2\lib\active_support\core_ext\symbol.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/test.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/test.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/test.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activesupport-2.0.2\lib\active_support\core_ext\test.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/time.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/time.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/time.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activesupport-2.0.2\lib\active_support\core_ext\time.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/bigdecimal
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/bigdecimal/conversions.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/bigdecimal/conversions.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/bigdecimal/conversions.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activesupport-2.0.2\lib\active_support\core_ext\bigdecimal\conversions.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/cgi
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/cgi/escape_skipping_slashes.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/cgi/escape_skipping_slashes.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/cgi/escape_skipping_slashes.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activesupport-2.0.2\lib\active_support\core_ext\cgi\escape_skipping_slashes.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/class
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/class/attribute_accessors.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/class/attribute_accessors.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/class/attribute_accessors.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activesupport-2.0.2\lib\active_support\core_ext\class\attribute_accessors.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/class/delegating_attributes.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/class/delegating_attributes.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/class/delegating_attributes.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activesupport-2.0.2\lib\active_support\core_ext\class\delegating_attributes.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/class/inheritable_attributes.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/class/inheritable_attributes.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/class/inheritable_attributes.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activesupport-2.0.2\lib\active_support\core_ext\class\inheritable_attributes.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/class/removal.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/class/removal.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/class/removal.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activesupport-2.0.2\lib\active_support\core_ext\class\removal.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/date
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/date/behavior.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/date/behavior.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/date/behavior.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activesupport-2.0.2\lib\active_support\core_ext\date\behavior.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/date/calculations.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/date/calculations.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/date/calculations.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activesupport-2.0.2\lib\active_support\core_ext\date\calculations.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/date/conversions.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/date/conversions.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/date/conversions.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activesupport-2.0.2\lib\active_support\core_ext\date\conversions.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/date_time
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/date_time/calculations.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/date_time/calculations.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/date_time/calculations.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activesupport-2.0.2\lib\active_support\core_ext\date_time\calculations.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/date_time/conversions.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/date_time/conversions.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/date_time/conversions.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activesupport-2.0.2\lib\active_support\core_ext\date_time\conversions.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/float
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/float/rounding.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/float/rounding.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/float/rounding.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activesupport-2.0.2\lib\active_support\core_ext\float\rounding.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/hash
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/hash/conversions.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/hash/conversions.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/hash/conversions.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activesupport-2.0.2\lib\active_support\core_ext\hash\conversions.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/hash/diff.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/hash/diff.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/hash/diff.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activesupport-2.0.2\lib\active_support\core_ext\hash\diff.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/hash/except.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/hash/except.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/hash/except.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activesupport-2.0.2\lib\active_support\core_ext\hash\except.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/hash/indifferent_access.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/hash/indifferent_access.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/hash/indifferent_access.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activesupport-2.0.2\lib\active_support\core_ext\hash\indifferent_access.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/hash/keys.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/hash/keys.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/hash/keys.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activesupport-2.0.2\lib\active_support\core_ext\hash\keys.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/hash/reverse_merge.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/hash/reverse_merge.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/hash/reverse_merge.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activesupport-2.0.2\lib\active_support\core_ext\hash\reverse_merge.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/hash/slice.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/hash/slice.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/hash/slice.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activesupport-2.0.2\lib\active_support\core_ext\hash\slice.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/integer
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/integer/even_odd.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/integer/even_odd.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/integer/even_odd.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activesupport-2.0.2\lib\active_support\core_ext\integer\even_odd.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/integer/inflections.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/integer/inflections.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/integer/inflections.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activesupport-2.0.2\lib\active_support\core_ext\integer\inflections.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/kernel
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/kernel/agnostics.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/kernel/agnostics.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/kernel/agnostics.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activesupport-2.0.2\lib\active_support\core_ext\kernel\agnostics.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/kernel/daemonizing.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/kernel/daemonizing.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/kernel/daemonizing.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activesupport-2.0.2\lib\active_support\core_ext\kernel\daemonizing.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/kernel/debugger.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/kernel/debugger.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/kernel/debugger.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activesupport-2.0.2\lib\active_support\core_ext\kernel\debugger.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/kernel/reporting.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/kernel/reporting.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/kernel/reporting.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activesupport-2.0.2\lib\active_support\core_ext\kernel\reporting.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/kernel/requires.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/kernel/requires.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/kernel/requires.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activesupport-2.0.2\lib\active_support\core_ext\kernel\requires.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/module
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/module/aliasing.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/module/aliasing.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/module/aliasing.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activesupport-2.0.2\lib\active_support\core_ext\module\aliasing.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/module/attribute_accessors.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/module/attribute_accessors.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/module/attribute_accessors.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activesupport-2.0.2\lib\active_support\core_ext\module\attribute_accessors.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/module/attr_accessor_with_default.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/module/attr_accessor_with_default.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/module/attr_accessor_with_default.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activesupport-2.0.2\lib\active_support\core_ext\module\attr_accessor_with_default.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/module/attr_internal.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/module/attr_internal.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/module/attr_internal.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activesupport-2.0.2\lib\active_support\core_ext\module\attr_internal.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/module/delegation.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/module/delegation.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/module/delegation.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activesupport-2.0.2\lib\active_support\core_ext\module\delegation.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/module/inclusion.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/module/inclusion.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/module/inclusion.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activesupport-2.0.2\lib\active_support\core_ext\module\inclusion.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/module/introspection.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/module/introspection.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/module/introspection.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activesupport-2.0.2\lib\active_support\core_ext\module\introspection.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/module/loading.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/module/loading.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/module/loading.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activesupport-2.0.2\lib\active_support\core_ext\module\loading.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/numeric
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/numeric/bytes.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/numeric/bytes.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/numeric/bytes.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activesupport-2.0.2\lib\active_support\core_ext\numeric\bytes.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/numeric/time.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/numeric/time.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/numeric/time.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activesupport-2.0.2\lib\active_support\core_ext\numeric\time.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/object
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/object/conversions.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/object/conversions.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/object/conversions.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activesupport-2.0.2\lib\active_support\core_ext\object\conversions.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/object/extending.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/object/extending.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/object/extending.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activesupport-2.0.2\lib\active_support\core_ext\object\extending.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/object/instance_variables.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/object/instance_variables.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/object/instance_variables.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activesupport-2.0.2\lib\active_support\core_ext\object\instance_variables.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/object/misc.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/object/misc.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/object/misc.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activesupport-2.0.2\lib\active_support\core_ext\object\misc.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/pathname
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/pathname/clean_within.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/pathname/clean_within.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/pathname/clean_within.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activesupport-2.0.2\lib\active_support\core_ext\pathname\clean_within.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/range
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/range/blockless_step.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/range/blockless_step.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/range/blockless_step.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activesupport-2.0.2\lib\active_support\core_ext\range\blockless_step.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/range/conversions.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/range/conversions.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/range/conversions.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activesupport-2.0.2\lib\active_support\core_ext\range\conversions.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/range/include_range.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/range/include_range.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/range/include_range.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activesupport-2.0.2\lib\active_support\core_ext\range\include_range.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/range/overlaps.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/range/overlaps.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/range/overlaps.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activesupport-2.0.2\lib\active_support\core_ext\range\overlaps.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/string
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/string/access.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/string/access.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/string/access.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activesupport-2.0.2\lib\active_support\core_ext\string\access.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/string/conversions.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/string/conversions.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/string/conversions.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activesupport-2.0.2\lib\active_support\core_ext\string\conversions.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/string/inflections.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/string/inflections.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/string/inflections.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activesupport-2.0.2\lib\active_support\core_ext\string\inflections.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/string/iterators.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/string/iterators.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/string/iterators.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activesupport-2.0.2\lib\active_support\core_ext\string\iterators.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/string/starts_ends_with.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/string/starts_ends_with.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/string/starts_ends_with.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activesupport-2.0.2\lib\active_support\core_ext\string\starts_ends_with.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/string/unicode.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/string/unicode.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/string/unicode.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activesupport-2.0.2\lib\active_support\core_ext\string\unicode.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/string/xchar.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/string/xchar.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/string/xchar.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activesupport-2.0.2\lib\active_support\core_ext\string\xchar.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/test/unit
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/test/unit/assertions.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/test/unit/assertions.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/test/unit/assertions.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activesupport-2.0.2\lib\active_support\core_ext\test\unit\assertions.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/time
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/time/behavior.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/time/behavior.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/time/behavior.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activesupport-2.0.2\lib\active_support\core_ext\time\behavior.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/time/calculations.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/time/calculations.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/time/calculations.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activesupport-2.0.2\lib\active_support\core_ext\time\calculations.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/time/conversions.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/time/conversions.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/time/conversions.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activesupport-2.0.2\lib\active_support\core_ext\time\conversions.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/json
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/json/decoding.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/json/decoding.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/json/decoding.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activesupport-2.0.2\lib\active_support\json\decoding.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/json/encoding.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/json/encoding.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/json/encoding.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activesupport-2.0.2\lib\active_support\json\encoding.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/json/variable.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/json/variable.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/json/variable.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activesupport-2.0.2\lib\active_support\json\variable.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/json/encoders
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/json/encoders/date.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/json/encoders/date.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/json/encoders/date.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activesupport-2.0.2\lib\active_support\json\encoders\date.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/json/encoders/date_time.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/json/encoders/date_time.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/json/encoders/date_time.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activesupport-2.0.2\lib\active_support\json\encoders\date_time.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/json/encoders/enumerable.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/json/encoders/enumerable.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/json/encoders/enumerable.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activesupport-2.0.2\lib\active_support\json\encoders\enumerable.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/json/encoders/false_class.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/json/encoders/false_class.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/json/encoders/false_class.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activesupport-2.0.2\lib\active_support\json\encoders\false_class.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/json/encoders/hash.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/json/encoders/hash.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/json/encoders/hash.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activesupport-2.0.2\lib\active_support\json\encoders\hash.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/json/encoders/nil_class.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/json/encoders/nil_class.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/json/encoders/nil_class.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activesupport-2.0.2\lib\active_support\json\encoders\nil_class.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/json/encoders/numeric.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/json/encoders/numeric.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/json/encoders/numeric.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activesupport-2.0.2\lib\active_support\json\encoders\numeric.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/json/encoders/object.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/json/encoders/object.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/json/encoders/object.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activesupport-2.0.2\lib\active_support\json\encoders\object.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/json/encoders/regexp.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/json/encoders/regexp.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/json/encoders/regexp.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activesupport-2.0.2\lib\active_support\json\encoders\regexp.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/json/encoders/string.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/json/encoders/string.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/json/encoders/string.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activesupport-2.0.2\lib\active_support\json\encoders\string.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/json/encoders/symbol.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/json/encoders/symbol.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/json/encoders/symbol.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activesupport-2.0.2\lib\active_support\json\encoders\symbol.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/json/encoders/time.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/json/encoders/time.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/json/encoders/time.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activesupport-2.0.2\lib\active_support\json\encoders\time.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/json/encoders/true_class.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/json/encoders/true_class.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/json/encoders/true_class.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activesupport-2.0.2\lib\active_support\json\encoders\true_class.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/multibyte
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/multibyte/chars.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/multibyte/chars.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/multibyte/chars.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activesupport-2.0.2\lib\active_support\multibyte\chars.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/multibyte/generators
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/multibyte/generators/generate_tables.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/multibyte/generators/generate_tables.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/multibyte/generators/generate_tables.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activesupport-2.0.2\lib\active_support\multibyte\generators\generate_tables.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/multibyte/handlers
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/multibyte/handlers/passthru_handler.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/multibyte/handlers/passthru_handler.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/multibyte/handlers/passthru_handler.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activesupport-2.0.2\lib\active_support\multibyte\handlers\passthru_handler.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/multibyte/handlers/utf8_handler.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/multibyte/handlers/utf8_handler.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/multibyte/handlers/utf8_handler.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activesupport-2.0.2\lib\active_support\multibyte\handlers\utf8_handler.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/multibyte/handlers/utf8_handler_proc.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/multibyte/handlers/utf8_handler_proc.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/multibyte/handlers/utf8_handler_proc.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activesupport-2.0.2\lib\active_support\multibyte\handlers\utf8_handler_proc.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/testing
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/testing/default.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/testing/default.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/testing/default.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activesupport-2.0.2\lib\active_support\testing\default.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/values
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/values/time_zone.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/values/time_zone.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/values/time_zone.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activesupport-2.0.2\lib\active_support\values\time_zone.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/vendor/builder-2.1.2
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/vendor/builder-2.1.2/blankslate.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/vendor/builder-2.1.2/blankslate.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/vendor/builder-2.1.2/blankslate.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activesupport-2.0.2\lib\active_support\vendor\builder-2.1.2\blankslate.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/vendor/builder-2.1.2/builder.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/vendor/builder-2.1.2/builder.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/vendor/builder-2.1.2/builder.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activesupport-2.0.2\lib\active_support\vendor\builder-2.1.2\builder.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/vendor/builder-2.1.2/builder
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/vendor/builder-2.1.2/builder/blankslate.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/vendor/builder-2.1.2/builder/blankslate.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/vendor/builder-2.1.2/builder/blankslate.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activesupport-2.0.2\lib\active_support\vendor\builder-2.1.2\builder\blankslate.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/vendor/builder-2.1.2/builder/css.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/vendor/builder-2.1.2/builder/css.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/vendor/builder-2.1.2/builder/css.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activesupport-2.0.2\lib\active_support\vendor\builder-2.1.2\builder\css.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/vendor/builder-2.1.2/builder/xchar.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/vendor/builder-2.1.2/builder/xchar.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/vendor/builder-2.1.2/builder/xchar.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activesupport-2.0.2\lib\active_support\vendor\builder-2.1.2\builder\xchar.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/vendor/builder-2.1.2/builder/xmlbase.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/vendor/builder-2.1.2/builder/xmlbase.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/vendor/builder-2.1.2/builder/xmlbase.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activesupport-2.0.2\lib\active_support\vendor\builder-2.1.2\builder\xmlbase.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/vendor/builder-2.1.2/builder/xmlevents.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/vendor/builder-2.1.2/builder/xmlevents.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/vendor/builder-2.1.2/builder/xmlevents.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activesupport-2.0.2\lib\active_support\vendor\builder-2.1.2\builder\xmlevents.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/vendor/builder-2.1.2/builder/xmlmarkup.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/vendor/builder-2.1.2/builder/xmlmarkup.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/vendor/builder-2.1.2/builder/xmlmarkup.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activesupport-2.0.2\lib\active_support\vendor\builder-2.1.2\builder\xmlmarkup.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/vendor/xml-simple-1.0.11
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/vendor/xml-simple-1.0.11/xmlsimple.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/vendor/xml-simple-1.0.11/xmlsimple.rb: $(srcdir)/lib/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/vendor/xml-simple-1.0.11/xmlsimple.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\activesupport-2.0.2\lib\active_support\vendor\xml-simple-1.0.11\xmlsimple.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/cgi_multipart_eof_fix-2.5.0/lib
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/cgi_multipart_eof_fix-2.5.0/lib/cgi_multipart_eof_fix.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/cgi_multipart_eof_fix-2.5.0/lib/cgi_multipart_eof_fix.rb: $(srcdir)/lib/ruby/gems/1.8/gems/cgi_multipart_eof_fix-2.5.0/lib/cgi_multipart_eof_fix.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\cgi_multipart_eof_fix-2.5.0\lib\cgi_multipart_eof_fix.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/cgi_multipart_eof_fix-2.5.0/test
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/cgi_multipart_eof_fix-2.5.0/test/test_cgi_multipart_eof_fix.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/cgi_multipart_eof_fix-2.5.0/test/test_cgi_multipart_eof_fix.rb: $(srcdir)/lib/ruby/gems/1.8/gems/cgi_multipart_eof_fix-2.5.0/test/test_cgi_multipart_eof_fix.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\cgi_multipart_eof_fix-2.5.0\test\test_cgi_multipart_eof_fix.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/feed-normalizer-1.4.0/lib
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/feed-normalizer-1.4.0/lib/feed-normalizer.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/feed-normalizer-1.4.0/lib/feed-normalizer.rb: $(srcdir)/lib/ruby/gems/1.8/gems/feed-normalizer-1.4.0/lib/feed-normalizer.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\feed-normalizer-1.4.0\lib\feed-normalizer.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/feed-normalizer-1.4.0/lib/html-cleaner.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/feed-normalizer-1.4.0/lib/html-cleaner.rb: $(srcdir)/lib/ruby/gems/1.8/gems/feed-normalizer-1.4.0/lib/html-cleaner.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\feed-normalizer-1.4.0\lib\html-cleaner.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/feed-normalizer-1.4.0/lib/structures.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/feed-normalizer-1.4.0/lib/structures.rb: $(srcdir)/lib/ruby/gems/1.8/gems/feed-normalizer-1.4.0/lib/structures.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\feed-normalizer-1.4.0\lib\structures.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/feed-normalizer-1.4.0/lib/parsers
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/feed-normalizer-1.4.0/lib/parsers/rss.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/feed-normalizer-1.4.0/lib/parsers/rss.rb: $(srcdir)/lib/ruby/gems/1.8/gems/feed-normalizer-1.4.0/lib/parsers/rss.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\feed-normalizer-1.4.0\lib\parsers\rss.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/feed-normalizer-1.4.0/lib/parsers/simple-rss.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/feed-normalizer-1.4.0/lib/parsers/simple-rss.rb: $(srcdir)/lib/ruby/gems/1.8/gems/feed-normalizer-1.4.0/lib/parsers/simple-rss.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\feed-normalizer-1.4.0\lib\parsers\simple-rss.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/feed-normalizer-1.4.0/test
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/feed-normalizer-1.4.0/test/test_all.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/feed-normalizer-1.4.0/test/test_all.rb: $(srcdir)/lib/ruby/gems/1.8/gems/feed-normalizer-1.4.0/test/test_all.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\feed-normalizer-1.4.0\test\test_all.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/feed-normalizer-1.4.0/test/test_feednormalizer.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/feed-normalizer-1.4.0/test/test_feednormalizer.rb: $(srcdir)/lib/ruby/gems/1.8/gems/feed-normalizer-1.4.0/test/test_feednormalizer.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\feed-normalizer-1.4.0\test\test_feednormalizer.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/feed-normalizer-1.4.0/test/test_htmlcleaner.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/feed-normalizer-1.4.0/test/test_htmlcleaner.rb: $(srcdir)/lib/ruby/gems/1.8/gems/feed-normalizer-1.4.0/test/test_htmlcleaner.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\feed-normalizer-1.4.0\test\test_htmlcleaner.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/gem_plugin-0.2.3/lib
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/gem_plugin-0.2.3/lib/gem_plugin.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/gem_plugin-0.2.3/lib/gem_plugin.rb: $(srcdir)/lib/ruby/gems/1.8/gems/gem_plugin-0.2.3/lib/gem_plugin.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\gem_plugin-0.2.3\lib\gem_plugin.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/gem_plugin-0.2.3/resources/lib/project
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/gem_plugin-0.2.3/resources/lib/project/init.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/gem_plugin-0.2.3/resources/lib/project/init.rb: $(srcdir)/lib/ruby/gems/1.8/gems/gem_plugin-0.2.3/resources/lib/project/init.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\gem_plugin-0.2.3\resources\lib\project\init.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/gem_plugin-0.2.3
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/gem_plugin-0.2.3/setup.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/gem_plugin-0.2.3/setup.rb: $(srcdir)/lib/ruby/gems/1.8/gems/gem_plugin-0.2.3/setup.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\gem_plugin-0.2.3\setup.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/gem_plugin-0.2.3/test
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/gem_plugin-0.2.3/test/test_plugins.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/gem_plugin-0.2.3/test/test_plugins.rb: $(srcdir)/lib/ruby/gems/1.8/gems/gem_plugin-0.2.3/test/test_plugins.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\gem_plugin-0.2.3\test\test_plugins.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/hoe-1.4.0/lib
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/hoe-1.4.0/lib/hoe.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/hoe-1.4.0/lib/hoe.rb: $(srcdir)/lib/ruby/gems/1.8/gems/hoe-1.4.0/lib/hoe.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\hoe-1.4.0\lib\hoe.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/hoe-1.4.0/test
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/hoe-1.4.0/test/test_hoe.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/hoe-1.4.0/test/test_hoe.rb: $(srcdir)/lib/ruby/gems/1.8/gems/hoe-1.4.0/test/test_hoe.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\hoe-1.4.0\test\test_hoe.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/hpricot-0.6-x86-mswin32/ext/hpricot_scan
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/hpricot-0.6-x86-mswin32/ext/hpricot_scan/extconf.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/hpricot-0.6-x86-mswin32/ext/hpricot_scan/extconf.rb: $(srcdir)/lib/ruby/gems/1.8/gems/hpricot-0.6-x86-mswin32/ext/hpricot_scan/extconf.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\hpricot-0.6-x86-mswin32\ext\hpricot_scan\extconf.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/hpricot-0.6-x86-mswin32/extras
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/hpricot-0.6-x86-mswin32/extras/mingw-rbconfig.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/hpricot-0.6-x86-mswin32/extras/mingw-rbconfig.rb: $(srcdir)/lib/ruby/gems/1.8/gems/hpricot-0.6-x86-mswin32/extras/mingw-rbconfig.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\hpricot-0.6-x86-mswin32\extras\mingw-rbconfig.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/hpricot-0.6-x86-mswin32/lib/hpricot
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/hpricot-0.6-x86-mswin32/lib/hpricot/blankslate.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/hpricot-0.6-x86-mswin32/lib/hpricot/blankslate.rb: $(srcdir)/lib/ruby/gems/1.8/gems/hpricot-0.6-x86-mswin32/lib/hpricot/blankslate.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\hpricot-0.6-x86-mswin32\lib\hpricot\blankslate.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/hpricot-0.6-x86-mswin32/lib/hpricot/builder.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/hpricot-0.6-x86-mswin32/lib/hpricot/builder.rb: $(srcdir)/lib/ruby/gems/1.8/gems/hpricot-0.6-x86-mswin32/lib/hpricot/builder.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\hpricot-0.6-x86-mswin32\lib\hpricot\builder.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/hpricot-0.6-x86-mswin32/lib/hpricot/elements.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/hpricot-0.6-x86-mswin32/lib/hpricot/elements.rb: $(srcdir)/lib/ruby/gems/1.8/gems/hpricot-0.6-x86-mswin32/lib/hpricot/elements.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\hpricot-0.6-x86-mswin32\lib\hpricot\elements.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/hpricot-0.6-x86-mswin32/lib/hpricot/htmlinfo.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/hpricot-0.6-x86-mswin32/lib/hpricot/htmlinfo.rb: $(srcdir)/lib/ruby/gems/1.8/gems/hpricot-0.6-x86-mswin32/lib/hpricot/htmlinfo.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\hpricot-0.6-x86-mswin32\lib\hpricot\htmlinfo.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/hpricot-0.6-x86-mswin32/lib/hpricot/inspect.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/hpricot-0.6-x86-mswin32/lib/hpricot/inspect.rb: $(srcdir)/lib/ruby/gems/1.8/gems/hpricot-0.6-x86-mswin32/lib/hpricot/inspect.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\hpricot-0.6-x86-mswin32\lib\hpricot\inspect.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/hpricot-0.6-x86-mswin32/lib/hpricot/modules.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/hpricot-0.6-x86-mswin32/lib/hpricot/modules.rb: $(srcdir)/lib/ruby/gems/1.8/gems/hpricot-0.6-x86-mswin32/lib/hpricot/modules.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\hpricot-0.6-x86-mswin32\lib\hpricot\modules.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/hpricot-0.6-x86-mswin32/lib/hpricot/parse.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/hpricot-0.6-x86-mswin32/lib/hpricot/parse.rb: $(srcdir)/lib/ruby/gems/1.8/gems/hpricot-0.6-x86-mswin32/lib/hpricot/parse.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\hpricot-0.6-x86-mswin32\lib\hpricot\parse.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/hpricot-0.6-x86-mswin32/lib/hpricot/tag.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/hpricot-0.6-x86-mswin32/lib/hpricot/tag.rb: $(srcdir)/lib/ruby/gems/1.8/gems/hpricot-0.6-x86-mswin32/lib/hpricot/tag.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\hpricot-0.6-x86-mswin32\lib\hpricot\tag.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/hpricot-0.6-x86-mswin32/lib/hpricot/tags.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/hpricot-0.6-x86-mswin32/lib/hpricot/tags.rb: $(srcdir)/lib/ruby/gems/1.8/gems/hpricot-0.6-x86-mswin32/lib/hpricot/tags.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\hpricot-0.6-x86-mswin32\lib\hpricot\tags.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/hpricot-0.6-x86-mswin32/lib/hpricot/traverse.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/hpricot-0.6-x86-mswin32/lib/hpricot/traverse.rb: $(srcdir)/lib/ruby/gems/1.8/gems/hpricot-0.6-x86-mswin32/lib/hpricot/traverse.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\hpricot-0.6-x86-mswin32\lib\hpricot\traverse.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/hpricot-0.6-x86-mswin32/lib/hpricot/xchar.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/hpricot-0.6-x86-mswin32/lib/hpricot/xchar.rb: $(srcdir)/lib/ruby/gems/1.8/gems/hpricot-0.6-x86-mswin32/lib/hpricot/xchar.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\hpricot-0.6-x86-mswin32\lib\hpricot\xchar.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/hpricot-0.6-x86-mswin32/lib
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/hpricot-0.6-x86-mswin32/lib/hpricot.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/hpricot-0.6-x86-mswin32/lib/hpricot.rb: $(srcdir)/lib/ruby/gems/1.8/gems/hpricot-0.6-x86-mswin32/lib/hpricot.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\hpricot-0.6-x86-mswin32\lib\hpricot.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/hpricot-0.6-x86-mswin32/test
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/hpricot-0.6-x86-mswin32/test/load_files.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/hpricot-0.6-x86-mswin32/test/load_files.rb: $(srcdir)/lib/ruby/gems/1.8/gems/hpricot-0.6-x86-mswin32/test/load_files.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\hpricot-0.6-x86-mswin32\test\load_files.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/hpricot-0.6-x86-mswin32/test/test_alter.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/hpricot-0.6-x86-mswin32/test/test_alter.rb: $(srcdir)/lib/ruby/gems/1.8/gems/hpricot-0.6-x86-mswin32/test/test_alter.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\hpricot-0.6-x86-mswin32\test\test_alter.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/hpricot-0.6-x86-mswin32/test/test_builder.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/hpricot-0.6-x86-mswin32/test/test_builder.rb: $(srcdir)/lib/ruby/gems/1.8/gems/hpricot-0.6-x86-mswin32/test/test_builder.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\hpricot-0.6-x86-mswin32\test\test_builder.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/hpricot-0.6-x86-mswin32/test/test_parser.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/hpricot-0.6-x86-mswin32/test/test_parser.rb: $(srcdir)/lib/ruby/gems/1.8/gems/hpricot-0.6-x86-mswin32/test/test_parser.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\hpricot-0.6-x86-mswin32\test\test_parser.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/hpricot-0.6-x86-mswin32/test/test_paths.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/hpricot-0.6-x86-mswin32/test/test_paths.rb: $(srcdir)/lib/ruby/gems/1.8/gems/hpricot-0.6-x86-mswin32/test/test_paths.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\hpricot-0.6-x86-mswin32\test\test_paths.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/hpricot-0.6-x86-mswin32/test/test_preserved.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/hpricot-0.6-x86-mswin32/test/test_preserved.rb: $(srcdir)/lib/ruby/gems/1.8/gems/hpricot-0.6-x86-mswin32/test/test_preserved.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\hpricot-0.6-x86-mswin32\test\test_preserved.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/hpricot-0.6-x86-mswin32/test/test_xml.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/hpricot-0.6-x86-mswin32/test/test_xml.rb: $(srcdir)/lib/ruby/gems/1.8/gems/hpricot-0.6-x86-mswin32/test/test_xml.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\hpricot-0.6-x86-mswin32\test\test_xml.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/htmlentities-4.0.0/lib/htmlentities
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/htmlentities-4.0.0/lib/htmlentities/html4.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/htmlentities-4.0.0/lib/htmlentities/html4.rb: $(srcdir)/lib/ruby/gems/1.8/gems/htmlentities-4.0.0/lib/htmlentities/html4.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\htmlentities-4.0.0\lib\htmlentities\html4.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/htmlentities-4.0.0/lib/htmlentities/legacy.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/htmlentities-4.0.0/lib/htmlentities/legacy.rb: $(srcdir)/lib/ruby/gems/1.8/gems/htmlentities-4.0.0/lib/htmlentities/legacy.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\htmlentities-4.0.0\lib\htmlentities\legacy.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/htmlentities-4.0.0/lib/htmlentities/string.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/htmlentities-4.0.0/lib/htmlentities/string.rb: $(srcdir)/lib/ruby/gems/1.8/gems/htmlentities-4.0.0/lib/htmlentities/string.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\htmlentities-4.0.0\lib\htmlentities\string.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/htmlentities-4.0.0/lib/htmlentities/xhtml1.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/htmlentities-4.0.0/lib/htmlentities/xhtml1.rb: $(srcdir)/lib/ruby/gems/1.8/gems/htmlentities-4.0.0/lib/htmlentities/xhtml1.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\htmlentities-4.0.0\lib\htmlentities\xhtml1.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/htmlentities-4.0.0/lib
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/htmlentities-4.0.0/lib/htmlentities.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/htmlentities-4.0.0/lib/htmlentities.rb: $(srcdir)/lib/ruby/gems/1.8/gems/htmlentities-4.0.0/lib/htmlentities.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\htmlentities-4.0.0\lib\htmlentities.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/htmlentities-4.0.0/test
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/htmlentities-4.0.0/test/entities_test.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/htmlentities-4.0.0/test/entities_test.rb: $(srcdir)/lib/ruby/gems/1.8/gems/htmlentities-4.0.0/test/entities_test.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\htmlentities-4.0.0\test\entities_test.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/htmlentities-4.0.0/test/html4_test.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/htmlentities-4.0.0/test/html4_test.rb: $(srcdir)/lib/ruby/gems/1.8/gems/htmlentities-4.0.0/test/html4_test.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\htmlentities-4.0.0\test\html4_test.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/htmlentities-4.0.0/test/legacy_test.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/htmlentities-4.0.0/test/legacy_test.rb: $(srcdir)/lib/ruby/gems/1.8/gems/htmlentities-4.0.0/test/legacy_test.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\htmlentities-4.0.0\test\legacy_test.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/htmlentities-4.0.0/test/roundtrip_test.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/htmlentities-4.0.0/test/roundtrip_test.rb: $(srcdir)/lib/ruby/gems/1.8/gems/htmlentities-4.0.0/test/roundtrip_test.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\htmlentities-4.0.0\test\roundtrip_test.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/htmlentities-4.0.0/test/string_test.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/htmlentities-4.0.0/test/string_test.rb: $(srcdir)/lib/ruby/gems/1.8/gems/htmlentities-4.0.0/test/string_test.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\htmlentities-4.0.0\test\string_test.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/htmlentities-4.0.0/test/test_all.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/htmlentities-4.0.0/test/test_all.rb: $(srcdir)/lib/ruby/gems/1.8/gems/htmlentities-4.0.0/test/test_all.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\htmlentities-4.0.0\test\test_all.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/htmlentities-4.0.0/test/xhtml1_test.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/htmlentities-4.0.0/test/xhtml1_test.rb: $(srcdir)/lib/ruby/gems/1.8/gems/htmlentities-4.0.0/test/xhtml1_test.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\htmlentities-4.0.0\test\xhtml1_test.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/image_science-1.1.3-x86-mswin32
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/image_science-1.1.3-x86-mswin32/bench.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/image_science-1.1.3-x86-mswin32/bench.rb: $(srcdir)/lib/ruby/gems/1.8/gems/image_science-1.1.3-x86-mswin32/bench.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\image_science-1.1.3-x86-mswin32\bench.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/image_science-1.1.3-x86-mswin32/lib
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/image_science-1.1.3-x86-mswin32/lib/image_science.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/image_science-1.1.3-x86-mswin32/lib/image_science.rb: $(srcdir)/lib/ruby/gems/1.8/gems/image_science-1.1.3-x86-mswin32/lib/image_science.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\image_science-1.1.3-x86-mswin32\lib\image_science.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/image_science-1.1.3-x86-mswin32/test
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/image_science-1.1.3-x86-mswin32/test/test_image_science.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/image_science-1.1.3-x86-mswin32/test/test_image_science.rb: $(srcdir)/lib/ruby/gems/1.8/gems/image_science-1.1.3-x86-mswin32/test/test_image_science.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\image_science-1.1.3-x86-mswin32\test\test_image_science.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/mongrel-1.1.3-x86-mswin32/examples
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/mongrel-1.1.3-x86-mswin32/examples/builder.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/mongrel-1.1.3-x86-mswin32/examples/builder.rb: $(srcdir)/lib/ruby/gems/1.8/gems/mongrel-1.1.3-x86-mswin32/examples/builder.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\mongrel-1.1.3-x86-mswin32\examples\builder.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/mongrel-1.1.3-x86-mswin32/examples/mongrel_simple_ctrl.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/mongrel-1.1.3-x86-mswin32/examples/mongrel_simple_ctrl.rb: $(srcdir)/lib/ruby/gems/1.8/gems/mongrel-1.1.3-x86-mswin32/examples/mongrel_simple_ctrl.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\mongrel-1.1.3-x86-mswin32\examples\mongrel_simple_ctrl.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/mongrel-1.1.3-x86-mswin32/examples/mongrel_simple_service.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/mongrel-1.1.3-x86-mswin32/examples/mongrel_simple_service.rb: $(srcdir)/lib/ruby/gems/1.8/gems/mongrel-1.1.3-x86-mswin32/examples/mongrel_simple_service.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\mongrel-1.1.3-x86-mswin32\examples\mongrel_simple_service.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/mongrel-1.1.3-x86-mswin32/examples/random_thrash.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/mongrel-1.1.3-x86-mswin32/examples/random_thrash.rb: $(srcdir)/lib/ruby/gems/1.8/gems/mongrel-1.1.3-x86-mswin32/examples/random_thrash.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\mongrel-1.1.3-x86-mswin32\examples\random_thrash.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/mongrel-1.1.3-x86-mswin32/examples/simpletest.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/mongrel-1.1.3-x86-mswin32/examples/simpletest.rb: $(srcdir)/lib/ruby/gems/1.8/gems/mongrel-1.1.3-x86-mswin32/examples/simpletest.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\mongrel-1.1.3-x86-mswin32\examples\simpletest.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/mongrel-1.1.3-x86-mswin32/examples/webrick_compare.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/mongrel-1.1.3-x86-mswin32/examples/webrick_compare.rb: $(srcdir)/lib/ruby/gems/1.8/gems/mongrel-1.1.3-x86-mswin32/examples/webrick_compare.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\mongrel-1.1.3-x86-mswin32\examples\webrick_compare.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/mongrel-1.1.3-x86-mswin32/examples/camping
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/mongrel-1.1.3-x86-mswin32/examples/camping/blog.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/mongrel-1.1.3-x86-mswin32/examples/camping/blog.rb: $(srcdir)/lib/ruby/gems/1.8/gems/mongrel-1.1.3-x86-mswin32/examples/camping/blog.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\mongrel-1.1.3-x86-mswin32\examples\camping\blog.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/mongrel-1.1.3-x86-mswin32/examples/camping/tepee.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/mongrel-1.1.3-x86-mswin32/examples/camping/tepee.rb: $(srcdir)/lib/ruby/gems/1.8/gems/mongrel-1.1.3-x86-mswin32/examples/camping/tepee.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\mongrel-1.1.3-x86-mswin32\examples\camping\tepee.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/mongrel-1.1.3-x86-mswin32/ext/http11
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/mongrel-1.1.3-x86-mswin32/ext/http11/extconf.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/mongrel-1.1.3-x86-mswin32/ext/http11/extconf.rb: $(srcdir)/lib/ruby/gems/1.8/gems/mongrel-1.1.3-x86-mswin32/ext/http11/extconf.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\mongrel-1.1.3-x86-mswin32\ext\http11\extconf.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/mongrel-1.1.3-x86-mswin32/lib/mongrel
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/mongrel-1.1.3-x86-mswin32/lib/mongrel/camping.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/mongrel-1.1.3-x86-mswin32/lib/mongrel/camping.rb: $(srcdir)/lib/ruby/gems/1.8/gems/mongrel-1.1.3-x86-mswin32/lib/mongrel/camping.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\mongrel-1.1.3-x86-mswin32\lib\mongrel\camping.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/mongrel-1.1.3-x86-mswin32/lib/mongrel/cgi.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/mongrel-1.1.3-x86-mswin32/lib/mongrel/cgi.rb: $(srcdir)/lib/ruby/gems/1.8/gems/mongrel-1.1.3-x86-mswin32/lib/mongrel/cgi.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\mongrel-1.1.3-x86-mswin32\lib\mongrel\cgi.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/mongrel-1.1.3-x86-mswin32/lib/mongrel/command.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/mongrel-1.1.3-x86-mswin32/lib/mongrel/command.rb: $(srcdir)/lib/ruby/gems/1.8/gems/mongrel-1.1.3-x86-mswin32/lib/mongrel/command.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\mongrel-1.1.3-x86-mswin32\lib\mongrel\command.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/mongrel-1.1.3-x86-mswin32/lib/mongrel/configurator.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/mongrel-1.1.3-x86-mswin32/lib/mongrel/configurator.rb: $(srcdir)/lib/ruby/gems/1.8/gems/mongrel-1.1.3-x86-mswin32/lib/mongrel/configurator.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\mongrel-1.1.3-x86-mswin32\lib\mongrel\configurator.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/mongrel-1.1.3-x86-mswin32/lib/mongrel/const.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/mongrel-1.1.3-x86-mswin32/lib/mongrel/const.rb: $(srcdir)/lib/ruby/gems/1.8/gems/mongrel-1.1.3-x86-mswin32/lib/mongrel/const.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\mongrel-1.1.3-x86-mswin32\lib\mongrel\const.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/mongrel-1.1.3-x86-mswin32/lib/mongrel/debug.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/mongrel-1.1.3-x86-mswin32/lib/mongrel/debug.rb: $(srcdir)/lib/ruby/gems/1.8/gems/mongrel-1.1.3-x86-mswin32/lib/mongrel/debug.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\mongrel-1.1.3-x86-mswin32\lib\mongrel\debug.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/mongrel-1.1.3-x86-mswin32/lib/mongrel/gems.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/mongrel-1.1.3-x86-mswin32/lib/mongrel/gems.rb: $(srcdir)/lib/ruby/gems/1.8/gems/mongrel-1.1.3-x86-mswin32/lib/mongrel/gems.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\mongrel-1.1.3-x86-mswin32\lib\mongrel\gems.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/mongrel-1.1.3-x86-mswin32/lib/mongrel/handlers.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/mongrel-1.1.3-x86-mswin32/lib/mongrel/handlers.rb: $(srcdir)/lib/ruby/gems/1.8/gems/mongrel-1.1.3-x86-mswin32/lib/mongrel/handlers.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\mongrel-1.1.3-x86-mswin32\lib\mongrel\handlers.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/mongrel-1.1.3-x86-mswin32/lib/mongrel/header_out.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/mongrel-1.1.3-x86-mswin32/lib/mongrel/header_out.rb: $(srcdir)/lib/ruby/gems/1.8/gems/mongrel-1.1.3-x86-mswin32/lib/mongrel/header_out.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\mongrel-1.1.3-x86-mswin32\lib\mongrel\header_out.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/mongrel-1.1.3-x86-mswin32/lib/mongrel/http_request.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/mongrel-1.1.3-x86-mswin32/lib/mongrel/http_request.rb: $(srcdir)/lib/ruby/gems/1.8/gems/mongrel-1.1.3-x86-mswin32/lib/mongrel/http_request.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\mongrel-1.1.3-x86-mswin32\lib\mongrel\http_request.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/mongrel-1.1.3-x86-mswin32/lib/mongrel/http_response.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/mongrel-1.1.3-x86-mswin32/lib/mongrel/http_response.rb: $(srcdir)/lib/ruby/gems/1.8/gems/mongrel-1.1.3-x86-mswin32/lib/mongrel/http_response.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\mongrel-1.1.3-x86-mswin32\lib\mongrel\http_response.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/mongrel-1.1.3-x86-mswin32/lib/mongrel/init.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/mongrel-1.1.3-x86-mswin32/lib/mongrel/init.rb: $(srcdir)/lib/ruby/gems/1.8/gems/mongrel-1.1.3-x86-mswin32/lib/mongrel/init.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\mongrel-1.1.3-x86-mswin32\lib\mongrel\init.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/mongrel-1.1.3-x86-mswin32/lib/mongrel/rails.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/mongrel-1.1.3-x86-mswin32/lib/mongrel/rails.rb: $(srcdir)/lib/ruby/gems/1.8/gems/mongrel-1.1.3-x86-mswin32/lib/mongrel/rails.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\mongrel-1.1.3-x86-mswin32\lib\mongrel\rails.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/mongrel-1.1.3-x86-mswin32/lib/mongrel/stats.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/mongrel-1.1.3-x86-mswin32/lib/mongrel/stats.rb: $(srcdir)/lib/ruby/gems/1.8/gems/mongrel-1.1.3-x86-mswin32/lib/mongrel/stats.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\mongrel-1.1.3-x86-mswin32\lib\mongrel\stats.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/mongrel-1.1.3-x86-mswin32/lib/mongrel/tcphack.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/mongrel-1.1.3-x86-mswin32/lib/mongrel/tcphack.rb: $(srcdir)/lib/ruby/gems/1.8/gems/mongrel-1.1.3-x86-mswin32/lib/mongrel/tcphack.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\mongrel-1.1.3-x86-mswin32\lib\mongrel\tcphack.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/mongrel-1.1.3-x86-mswin32/lib/mongrel/uri_classifier.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/mongrel-1.1.3-x86-mswin32/lib/mongrel/uri_classifier.rb: $(srcdir)/lib/ruby/gems/1.8/gems/mongrel-1.1.3-x86-mswin32/lib/mongrel/uri_classifier.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\mongrel-1.1.3-x86-mswin32\lib\mongrel\uri_classifier.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/mongrel-1.1.3-x86-mswin32/lib
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/mongrel-1.1.3-x86-mswin32/lib/mongrel.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/mongrel-1.1.3-x86-mswin32/lib/mongrel.rb: $(srcdir)/lib/ruby/gems/1.8/gems/mongrel-1.1.3-x86-mswin32/lib/mongrel.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\mongrel-1.1.3-x86-mswin32\lib\mongrel.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/mongrel-1.1.3-x86-mswin32
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/mongrel-1.1.3-x86-mswin32/setup.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/mongrel-1.1.3-x86-mswin32/setup.rb: $(srcdir)/lib/ruby/gems/1.8/gems/mongrel-1.1.3-x86-mswin32/setup.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\mongrel-1.1.3-x86-mswin32\setup.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/mongrel-1.1.3-x86-mswin32/test
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/mongrel-1.1.3-x86-mswin32/test/testhelp.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/mongrel-1.1.3-x86-mswin32/test/testhelp.rb: $(srcdir)/lib/ruby/gems/1.8/gems/mongrel-1.1.3-x86-mswin32/test/testhelp.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\mongrel-1.1.3-x86-mswin32\test\testhelp.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/mongrel-1.1.3-x86-mswin32/test/test_cgi_wrapper.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/mongrel-1.1.3-x86-mswin32/test/test_cgi_wrapper.rb: $(srcdir)/lib/ruby/gems/1.8/gems/mongrel-1.1.3-x86-mswin32/test/test_cgi_wrapper.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\mongrel-1.1.3-x86-mswin32\test\test_cgi_wrapper.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/mongrel-1.1.3-x86-mswin32/test/test_command.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/mongrel-1.1.3-x86-mswin32/test/test_command.rb: $(srcdir)/lib/ruby/gems/1.8/gems/mongrel-1.1.3-x86-mswin32/test/test_command.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\mongrel-1.1.3-x86-mswin32\test\test_command.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/mongrel-1.1.3-x86-mswin32/test/test_conditional.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/mongrel-1.1.3-x86-mswin32/test/test_conditional.rb: $(srcdir)/lib/ruby/gems/1.8/gems/mongrel-1.1.3-x86-mswin32/test/test_conditional.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\mongrel-1.1.3-x86-mswin32\test\test_conditional.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/mongrel-1.1.3-x86-mswin32/test/test_configurator.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/mongrel-1.1.3-x86-mswin32/test/test_configurator.rb: $(srcdir)/lib/ruby/gems/1.8/gems/mongrel-1.1.3-x86-mswin32/test/test_configurator.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\mongrel-1.1.3-x86-mswin32\test\test_configurator.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/mongrel-1.1.3-x86-mswin32/test/test_debug.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/mongrel-1.1.3-x86-mswin32/test/test_debug.rb: $(srcdir)/lib/ruby/gems/1.8/gems/mongrel-1.1.3-x86-mswin32/test/test_debug.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\mongrel-1.1.3-x86-mswin32\test\test_debug.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/mongrel-1.1.3-x86-mswin32/test/test_handlers.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/mongrel-1.1.3-x86-mswin32/test/test_handlers.rb: $(srcdir)/lib/ruby/gems/1.8/gems/mongrel-1.1.3-x86-mswin32/test/test_handlers.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\mongrel-1.1.3-x86-mswin32\test\test_handlers.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/mongrel-1.1.3-x86-mswin32/test/test_http11.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/mongrel-1.1.3-x86-mswin32/test/test_http11.rb: $(srcdir)/lib/ruby/gems/1.8/gems/mongrel-1.1.3-x86-mswin32/test/test_http11.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\mongrel-1.1.3-x86-mswin32\test\test_http11.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/mongrel-1.1.3-x86-mswin32/test/test_redirect_handler.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/mongrel-1.1.3-x86-mswin32/test/test_redirect_handler.rb: $(srcdir)/lib/ruby/gems/1.8/gems/mongrel-1.1.3-x86-mswin32/test/test_redirect_handler.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\mongrel-1.1.3-x86-mswin32\test\test_redirect_handler.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/mongrel-1.1.3-x86-mswin32/test/test_request_progress.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/mongrel-1.1.3-x86-mswin32/test/test_request_progress.rb: $(srcdir)/lib/ruby/gems/1.8/gems/mongrel-1.1.3-x86-mswin32/test/test_request_progress.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\mongrel-1.1.3-x86-mswin32\test\test_request_progress.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/mongrel-1.1.3-x86-mswin32/test/test_response.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/mongrel-1.1.3-x86-mswin32/test/test_response.rb: $(srcdir)/lib/ruby/gems/1.8/gems/mongrel-1.1.3-x86-mswin32/test/test_response.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\mongrel-1.1.3-x86-mswin32\test\test_response.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/mongrel-1.1.3-x86-mswin32/test/test_stats.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/mongrel-1.1.3-x86-mswin32/test/test_stats.rb: $(srcdir)/lib/ruby/gems/1.8/gems/mongrel-1.1.3-x86-mswin32/test/test_stats.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\mongrel-1.1.3-x86-mswin32\test\test_stats.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/mongrel-1.1.3-x86-mswin32/test/test_uriclassifier.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/mongrel-1.1.3-x86-mswin32/test/test_uriclassifier.rb: $(srcdir)/lib/ruby/gems/1.8/gems/mongrel-1.1.3-x86-mswin32/test/test_uriclassifier.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\mongrel-1.1.3-x86-mswin32\test\test_uriclassifier.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/mongrel-1.1.3-x86-mswin32/test/test_ws.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/mongrel-1.1.3-x86-mswin32/test/test_ws.rb: $(srcdir)/lib/ruby/gems/1.8/gems/mongrel-1.1.3-x86-mswin32/test/test_ws.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\mongrel-1.1.3-x86-mswin32\test\test_ws.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/mongrel-1.1.3-x86-mswin32/tools
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/mongrel-1.1.3-x86-mswin32/tools/trickletest.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/mongrel-1.1.3-x86-mswin32/tools/trickletest.rb: $(srcdir)/lib/ruby/gems/1.8/gems/mongrel-1.1.3-x86-mswin32/tools/trickletest.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\mongrel-1.1.3-x86-mswin32\tools\trickletest.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/mongrel_service-0.3.4-x86-mswin32/lib/mongrel_service
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/mongrel_service-0.3.4-x86-mswin32/lib/mongrel_service/init.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/mongrel_service-0.3.4-x86-mswin32/lib/mongrel_service/init.rb: $(srcdir)/lib/ruby/gems/1.8/gems/mongrel_service-0.3.4-x86-mswin32/lib/mongrel_service/init.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\mongrel_service-0.3.4-x86-mswin32\lib\mongrel_service\init.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/mongrel_service-0.3.4-x86-mswin32/tools
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/mongrel_service-0.3.4-x86-mswin32/tools/freebasic.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/mongrel_service-0.3.4-x86-mswin32/tools/freebasic.rb: $(srcdir)/lib/ruby/gems/1.8/gems/mongrel_service-0.3.4-x86-mswin32/tools/freebasic.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\mongrel_service-0.3.4-x86-mswin32\tools\freebasic.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/opml-1.0.0/lib
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/opml-1.0.0/lib/opml.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/opml-1.0.0/lib/opml.rb: $(srcdir)/lib/ruby/gems/1.8/gems/opml-1.0.0/lib/opml.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\opml-1.0.0\lib\opml.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/opml-1.0.0/spec
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/opml-1.0.0/spec/opml_spec.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/opml-1.0.0/spec/opml_spec.rb: $(srcdir)/lib/ruby/gems/1.8/gems/opml-1.0.0/spec/opml_spec.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\opml-1.0.0\spec\opml_spec.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/builtin/rails_info/rails
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/builtin/rails_info/rails/info.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/builtin/rails_info/rails/info.rb: $(srcdir)/lib/ruby/gems/1.8/gems/rails-2.0.2/builtin/rails_info/rails/info.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\rails-2.0.2\builtin\rails_info\rails\info.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/builtin/rails_info/rails/info_controller.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/builtin/rails_info/rails/info_controller.rb: $(srcdir)/lib/ruby/gems/1.8/gems/rails-2.0.2/builtin/rails_info/rails/info_controller.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\rails-2.0.2\builtin\rails_info\rails\info_controller.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/builtin/rails_info/rails/info_helper.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/builtin/rails_info/rails/info_helper.rb: $(srcdir)/lib/ruby/gems/1.8/gems/rails-2.0.2/builtin/rails_info/rails/info_helper.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\rails-2.0.2\builtin\rails_info\rails\info_helper.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/builtin/rails_info
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/builtin/rails_info/rails_info_controller.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/builtin/rails_info/rails_info_controller.rb: $(srcdir)/lib/ruby/gems/1.8/gems/rails-2.0.2/builtin/rails_info/rails_info_controller.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\rails-2.0.2\builtin\rails_info\rails_info_controller.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/configs/initializers
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/configs/initializers/inflections.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/configs/initializers/inflections.rb: $(srcdir)/lib/ruby/gems/1.8/gems/rails-2.0.2/configs/initializers/inflections.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\rails-2.0.2\configs\initializers\inflections.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/configs/initializers/mime_types.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/configs/initializers/mime_types.rb: $(srcdir)/lib/ruby/gems/1.8/gems/rails-2.0.2/configs/initializers/mime_types.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\rails-2.0.2\configs\initializers\mime_types.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/configs
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/configs/routes.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/configs/routes.rb: $(srcdir)/lib/ruby/gems/1.8/gems/rails-2.0.2/configs/routes.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\rails-2.0.2\configs\routes.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/dispatches
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/dispatches/dispatch.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/dispatches/dispatch.rb: $(srcdir)/lib/ruby/gems/1.8/gems/rails-2.0.2/dispatches/dispatch.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\rails-2.0.2\dispatches\dispatch.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/environments
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/environments/boot.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/environments/boot.rb: $(srcdir)/lib/ruby/gems/1.8/gems/rails-2.0.2/environments/boot.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\rails-2.0.2\environments\boot.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/environments/development.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/environments/development.rb: $(srcdir)/lib/ruby/gems/1.8/gems/rails-2.0.2/environments/development.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\rails-2.0.2\environments\development.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/environments/environment.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/environments/environment.rb: $(srcdir)/lib/ruby/gems/1.8/gems/rails-2.0.2/environments/environment.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\rails-2.0.2\environments\environment.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/environments/production.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/environments/production.rb: $(srcdir)/lib/ruby/gems/1.8/gems/rails-2.0.2/environments/production.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\rails-2.0.2\environments\production.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/environments/test.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/environments/test.rb: $(srcdir)/lib/ruby/gems/1.8/gems/rails-2.0.2/environments/test.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\rails-2.0.2\environments\test.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/helpers
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/helpers/application.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/helpers/application.rb: $(srcdir)/lib/ruby/gems/1.8/gems/rails-2.0.2/helpers/application.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\rails-2.0.2\helpers\application.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/helpers/application_helper.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/helpers/application_helper.rb: $(srcdir)/lib/ruby/gems/1.8/gems/rails-2.0.2/helpers/application_helper.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\rails-2.0.2\helpers\application_helper.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/helpers/test_helper.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/helpers/test_helper.rb: $(srcdir)/lib/ruby/gems/1.8/gems/rails-2.0.2/helpers/test_helper.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\rails-2.0.2\helpers\test_helper.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/code_statistics.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/code_statistics.rb: $(srcdir)/lib/ruby/gems/1.8/gems/rails-2.0.2/lib/code_statistics.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\rails-2.0.2\lib\code_statistics.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/commands.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/commands.rb: $(srcdir)/lib/ruby/gems/1.8/gems/rails-2.0.2/lib/commands.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\rails-2.0.2\lib\commands.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/console_app.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/console_app.rb: $(srcdir)/lib/ruby/gems/1.8/gems/rails-2.0.2/lib/console_app.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\rails-2.0.2\lib\console_app.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/console_sandbox.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/console_sandbox.rb: $(srcdir)/lib/ruby/gems/1.8/gems/rails-2.0.2/lib/console_sandbox.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\rails-2.0.2\lib\console_sandbox.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/console_with_helpers.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/console_with_helpers.rb: $(srcdir)/lib/ruby/gems/1.8/gems/rails-2.0.2/lib/console_with_helpers.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\rails-2.0.2\lib\console_with_helpers.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/dispatcher.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/dispatcher.rb: $(srcdir)/lib/ruby/gems/1.8/gems/rails-2.0.2/lib/dispatcher.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\rails-2.0.2\lib\dispatcher.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/fcgi_handler.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/fcgi_handler.rb: $(srcdir)/lib/ruby/gems/1.8/gems/rails-2.0.2/lib/fcgi_handler.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\rails-2.0.2\lib\fcgi_handler.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/initializer.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/initializer.rb: $(srcdir)/lib/ruby/gems/1.8/gems/rails-2.0.2/lib/initializer.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\rails-2.0.2\lib\initializer.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator.rb: $(srcdir)/lib/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\rails-2.0.2\lib\rails_generator.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/railties_path.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/railties_path.rb: $(srcdir)/lib/ruby/gems/1.8/gems/rails-2.0.2/lib/railties_path.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\rails-2.0.2\lib\railties_path.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/rubyprof_ext.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/rubyprof_ext.rb: $(srcdir)/lib/ruby/gems/1.8/gems/rails-2.0.2/lib/rubyprof_ext.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\rails-2.0.2\lib\rubyprof_ext.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/ruby_version_check.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/ruby_version_check.rb: $(srcdir)/lib/ruby/gems/1.8/gems/rails-2.0.2/lib/ruby_version_check.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\rails-2.0.2\lib\ruby_version_check.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/source_annotation_extractor.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/source_annotation_extractor.rb: $(srcdir)/lib/ruby/gems/1.8/gems/rails-2.0.2/lib/source_annotation_extractor.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\rails-2.0.2\lib\source_annotation_extractor.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/test_help.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/test_help.rb: $(srcdir)/lib/ruby/gems/1.8/gems/rails-2.0.2/lib/test_help.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\rails-2.0.2\lib\test_help.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/webrick_server.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/webrick_server.rb: $(srcdir)/lib/ruby/gems/1.8/gems/rails-2.0.2/lib/webrick_server.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\rails-2.0.2\lib\webrick_server.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/commands
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/commands/about.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/commands/about.rb: $(srcdir)/lib/ruby/gems/1.8/gems/rails-2.0.2/lib/commands/about.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\rails-2.0.2\lib\commands\about.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/commands/console.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/commands/console.rb: $(srcdir)/lib/ruby/gems/1.8/gems/rails-2.0.2/lib/commands/console.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\rails-2.0.2\lib\commands\console.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/commands/destroy.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/commands/destroy.rb: $(srcdir)/lib/ruby/gems/1.8/gems/rails-2.0.2/lib/commands/destroy.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\rails-2.0.2\lib\commands\destroy.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/commands/generate.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/commands/generate.rb: $(srcdir)/lib/ruby/gems/1.8/gems/rails-2.0.2/lib/commands/generate.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\rails-2.0.2\lib\commands\generate.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/commands/plugin.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/commands/plugin.rb: $(srcdir)/lib/ruby/gems/1.8/gems/rails-2.0.2/lib/commands/plugin.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\rails-2.0.2\lib\commands\plugin.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/commands/runner.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/commands/runner.rb: $(srcdir)/lib/ruby/gems/1.8/gems/rails-2.0.2/lib/commands/runner.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\rails-2.0.2\lib\commands\runner.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/commands/server.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/commands/server.rb: $(srcdir)/lib/ruby/gems/1.8/gems/rails-2.0.2/lib/commands/server.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\rails-2.0.2\lib\commands\server.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/commands/update.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/commands/update.rb: $(srcdir)/lib/ruby/gems/1.8/gems/rails-2.0.2/lib/commands/update.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\rails-2.0.2\lib\commands\update.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/commands/performance
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/commands/performance/benchmarker.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/commands/performance/benchmarker.rb: $(srcdir)/lib/ruby/gems/1.8/gems/rails-2.0.2/lib/commands/performance/benchmarker.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\rails-2.0.2\lib\commands\performance\benchmarker.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/commands/performance/profiler.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/commands/performance/profiler.rb: $(srcdir)/lib/ruby/gems/1.8/gems/rails-2.0.2/lib/commands/performance/profiler.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\rails-2.0.2\lib\commands\performance\profiler.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/commands/performance/request.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/commands/performance/request.rb: $(srcdir)/lib/ruby/gems/1.8/gems/rails-2.0.2/lib/commands/performance/request.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\rails-2.0.2\lib\commands\performance\request.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/commands/process
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/commands/process/inspector.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/commands/process/inspector.rb: $(srcdir)/lib/ruby/gems/1.8/gems/rails-2.0.2/lib/commands/process/inspector.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\rails-2.0.2\lib\commands\process\inspector.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/commands/process/reaper.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/commands/process/reaper.rb: $(srcdir)/lib/ruby/gems/1.8/gems/rails-2.0.2/lib/commands/process/reaper.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\rails-2.0.2\lib\commands\process\reaper.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/commands/process/spawner.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/commands/process/spawner.rb: $(srcdir)/lib/ruby/gems/1.8/gems/rails-2.0.2/lib/commands/process/spawner.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\rails-2.0.2\lib\commands\process\spawner.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/commands/process/spinner.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/commands/process/spinner.rb: $(srcdir)/lib/ruby/gems/1.8/gems/rails-2.0.2/lib/commands/process/spinner.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\rails-2.0.2\lib\commands\process\spinner.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/commands/servers
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/commands/servers/base.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/commands/servers/base.rb: $(srcdir)/lib/ruby/gems/1.8/gems/rails-2.0.2/lib/commands/servers/base.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\rails-2.0.2\lib\commands\servers\base.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/commands/servers/lighttpd.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/commands/servers/lighttpd.rb: $(srcdir)/lib/ruby/gems/1.8/gems/rails-2.0.2/lib/commands/servers/lighttpd.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\rails-2.0.2\lib\commands\servers\lighttpd.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/commands/servers/mongrel.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/commands/servers/mongrel.rb: $(srcdir)/lib/ruby/gems/1.8/gems/rails-2.0.2/lib/commands/servers/mongrel.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\rails-2.0.2\lib\commands\servers\mongrel.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/commands/servers/webrick.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/commands/servers/webrick.rb: $(srcdir)/lib/ruby/gems/1.8/gems/rails-2.0.2/lib/commands/servers/webrick.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\rails-2.0.2\lib\commands\servers\webrick.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/rails/plugin
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/rails/plugin/loader.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/rails/plugin/loader.rb: $(srcdir)/lib/ruby/gems/1.8/gems/rails-2.0.2/lib/rails/plugin/loader.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\rails-2.0.2\lib\rails\plugin\loader.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/rails/plugin/locator.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/rails/plugin/locator.rb: $(srcdir)/lib/ruby/gems/1.8/gems/rails-2.0.2/lib/rails/plugin/locator.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\rails-2.0.2\lib\rails\plugin\locator.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/rails
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/rails/plugin.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/rails/plugin.rb: $(srcdir)/lib/ruby/gems/1.8/gems/rails-2.0.2/lib/rails/plugin.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\rails-2.0.2\lib\rails\plugin.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/rails/version.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/rails/version.rb: $(srcdir)/lib/ruby/gems/1.8/gems/rails-2.0.2/lib/rails/version.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\rails-2.0.2\lib\rails\version.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/base.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/base.rb: $(srcdir)/lib/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/base.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\rails-2.0.2\lib\rails_generator\base.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/commands.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/commands.rb: $(srcdir)/lib/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/commands.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\rails-2.0.2\lib\rails_generator\commands.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/generated_attribute.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/generated_attribute.rb: $(srcdir)/lib/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/generated_attribute.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\rails-2.0.2\lib\rails_generator\generated_attribute.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/lookup.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/lookup.rb: $(srcdir)/lib/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/lookup.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\rails-2.0.2\lib\rails_generator\lookup.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/manifest.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/manifest.rb: $(srcdir)/lib/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/manifest.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\rails-2.0.2\lib\rails_generator\manifest.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/options.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/options.rb: $(srcdir)/lib/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/options.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\rails-2.0.2\lib\rails_generator\options.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/scripts.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/scripts.rb: $(srcdir)/lib/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/scripts.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\rails-2.0.2\lib\rails_generator\scripts.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/secret_key_generator.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/secret_key_generator.rb: $(srcdir)/lib/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/secret_key_generator.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\rails-2.0.2\lib\rails_generator\secret_key_generator.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/simple_logger.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/simple_logger.rb: $(srcdir)/lib/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/simple_logger.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\rails-2.0.2\lib\rails_generator\simple_logger.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/spec.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/spec.rb: $(srcdir)/lib/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/spec.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\rails-2.0.2\lib\rails_generator\spec.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/generators/applications/app
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/generators/applications/app/app_generator.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/generators/applications/app/app_generator.rb: $(srcdir)/lib/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/generators/applications/app/app_generator.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\rails-2.0.2\lib\rails_generator\generators\applications\app\app_generator.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/generators/components/controller
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/generators/components/controller/controller_generator.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/generators/components/controller/controller_generator.rb: $(srcdir)/lib/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/generators/components/controller/controller_generator.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\rails-2.0.2\lib\rails_generator\generators\components\controller\controller_generator.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/generators/components/controller/templates
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/generators/components/controller/templates/controller.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/generators/components/controller/templates/controller.rb: $(srcdir)/lib/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/generators/components/controller/templates/controller.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\rails-2.0.2\lib\rails_generator\generators\components\controller\templates\controller.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/generators/components/controller/templates/functional_test.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/generators/components/controller/templates/functional_test.rb: $(srcdir)/lib/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/generators/components/controller/templates/functional_test.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\rails-2.0.2\lib\rails_generator\generators\components\controller\templates\functional_test.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/generators/components/controller/templates/helper.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/generators/components/controller/templates/helper.rb: $(srcdir)/lib/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/generators/components/controller/templates/helper.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\rails-2.0.2\lib\rails_generator\generators\components\controller\templates\helper.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/generators/components/integration_test
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/generators/components/integration_test/integration_test_generator.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/generators/components/integration_test/integration_test_generator.rb: $(srcdir)/lib/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/generators/components/integration_test/integration_test_generator.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\rails-2.0.2\lib\rails_generator\generators\components\integration_test\integration_test_generator.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/generators/components/integration_test/templates
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/generators/components/integration_test/templates/integration_test.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/generators/components/integration_test/templates/integration_test.rb: $(srcdir)/lib/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/generators/components/integration_test/templates/integration_test.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\rails-2.0.2\lib\rails_generator\generators\components\integration_test\templates\integration_test.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/generators/components/mailer
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/generators/components/mailer/mailer_generator.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/generators/components/mailer/mailer_generator.rb: $(srcdir)/lib/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/generators/components/mailer/mailer_generator.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\rails-2.0.2\lib\rails_generator\generators\components\mailer\mailer_generator.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/generators/components/mailer/templates
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/generators/components/mailer/templates/mailer.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/generators/components/mailer/templates/mailer.rb: $(srcdir)/lib/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/generators/components/mailer/templates/mailer.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\rails-2.0.2\lib\rails_generator\generators\components\mailer\templates\mailer.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/generators/components/mailer/templates/unit_test.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/generators/components/mailer/templates/unit_test.rb: $(srcdir)/lib/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/generators/components/mailer/templates/unit_test.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\rails-2.0.2\lib\rails_generator\generators\components\mailer\templates\unit_test.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/generators/components/migration
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/generators/components/migration/migration_generator.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/generators/components/migration/migration_generator.rb: $(srcdir)/lib/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/generators/components/migration/migration_generator.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\rails-2.0.2\lib\rails_generator\generators\components\migration\migration_generator.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/generators/components/migration/templates
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/generators/components/migration/templates/migration.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/generators/components/migration/templates/migration.rb: $(srcdir)/lib/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/generators/components/migration/templates/migration.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\rails-2.0.2\lib\rails_generator\generators\components\migration\templates\migration.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/generators/components/model
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/generators/components/model/model_generator.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/generators/components/model/model_generator.rb: $(srcdir)/lib/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/generators/components/model/model_generator.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\rails-2.0.2\lib\rails_generator\generators\components\model\model_generator.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/generators/components/model/templates
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/generators/components/model/templates/migration.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/generators/components/model/templates/migration.rb: $(srcdir)/lib/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/generators/components/model/templates/migration.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\rails-2.0.2\lib\rails_generator\generators\components\model\templates\migration.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/generators/components/model/templates/model.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/generators/components/model/templates/model.rb: $(srcdir)/lib/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/generators/components/model/templates/model.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\rails-2.0.2\lib\rails_generator\generators\components\model\templates\model.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/generators/components/model/templates/unit_test.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/generators/components/model/templates/unit_test.rb: $(srcdir)/lib/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/generators/components/model/templates/unit_test.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\rails-2.0.2\lib\rails_generator\generators\components\model\templates\unit_test.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/generators/components/observer
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/generators/components/observer/observer_generator.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/generators/components/observer/observer_generator.rb: $(srcdir)/lib/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/generators/components/observer/observer_generator.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\rails-2.0.2\lib\rails_generator\generators\components\observer\observer_generator.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/generators/components/observer/templates
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/generators/components/observer/templates/observer.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/generators/components/observer/templates/observer.rb: $(srcdir)/lib/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/generators/components/observer/templates/observer.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\rails-2.0.2\lib\rails_generator\generators\components\observer\templates\observer.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/generators/components/observer/templates/unit_test.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/generators/components/observer/templates/unit_test.rb: $(srcdir)/lib/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/generators/components/observer/templates/unit_test.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\rails-2.0.2\lib\rails_generator\generators\components\observer\templates\unit_test.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/generators/components/plugin
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/generators/components/plugin/plugin_generator.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/generators/components/plugin/plugin_generator.rb: $(srcdir)/lib/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/generators/components/plugin/plugin_generator.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\rails-2.0.2\lib\rails_generator\generators\components\plugin\plugin_generator.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/generators/components/plugin/templates
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/generators/components/plugin/templates/generator.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/generators/components/plugin/templates/generator.rb: $(srcdir)/lib/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/generators/components/plugin/templates/generator.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\rails-2.0.2\lib\rails_generator\generators\components\plugin\templates\generator.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/generators/components/plugin/templates/init.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/generators/components/plugin/templates/init.rb: $(srcdir)/lib/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/generators/components/plugin/templates/init.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\rails-2.0.2\lib\rails_generator\generators\components\plugin\templates\init.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/generators/components/plugin/templates/install.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/generators/components/plugin/templates/install.rb: $(srcdir)/lib/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/generators/components/plugin/templates/install.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\rails-2.0.2\lib\rails_generator\generators\components\plugin\templates\install.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/generators/components/plugin/templates/plugin.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/generators/components/plugin/templates/plugin.rb: $(srcdir)/lib/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/generators/components/plugin/templates/plugin.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\rails-2.0.2\lib\rails_generator\generators\components\plugin\templates\plugin.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/generators/components/plugin/templates/uninstall.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/generators/components/plugin/templates/uninstall.rb: $(srcdir)/lib/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/generators/components/plugin/templates/uninstall.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\rails-2.0.2\lib\rails_generator\generators\components\plugin\templates\uninstall.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/generators/components/plugin/templates/unit_test.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/generators/components/plugin/templates/unit_test.rb: $(srcdir)/lib/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/generators/components/plugin/templates/unit_test.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\rails-2.0.2\lib\rails_generator\generators\components\plugin\templates\unit_test.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/generators/components/resource
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/generators/components/resource/resource_generator.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/generators/components/resource/resource_generator.rb: $(srcdir)/lib/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/generators/components/resource/resource_generator.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\rails-2.0.2\lib\rails_generator\generators\components\resource\resource_generator.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/generators/components/resource/templates
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/generators/components/resource/templates/controller.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/generators/components/resource/templates/controller.rb: $(srcdir)/lib/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/generators/components/resource/templates/controller.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\rails-2.0.2\lib\rails_generator\generators\components\resource\templates\controller.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/generators/components/resource/templates/functional_test.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/generators/components/resource/templates/functional_test.rb: $(srcdir)/lib/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/generators/components/resource/templates/functional_test.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\rails-2.0.2\lib\rails_generator\generators\components\resource\templates\functional_test.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/generators/components/resource/templates/helper.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/generators/components/resource/templates/helper.rb: $(srcdir)/lib/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/generators/components/resource/templates/helper.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\rails-2.0.2\lib\rails_generator\generators\components\resource\templates\helper.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/generators/components/scaffold
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/generators/components/scaffold/scaffold_generator.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/generators/components/scaffold/scaffold_generator.rb: $(srcdir)/lib/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/generators/components/scaffold/scaffold_generator.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\rails-2.0.2\lib\rails_generator\generators\components\scaffold\scaffold_generator.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/generators/components/scaffold/templates
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/generators/components/scaffold/templates/controller.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/generators/components/scaffold/templates/controller.rb: $(srcdir)/lib/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/generators/components/scaffold/templates/controller.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\rails-2.0.2\lib\rails_generator\generators\components\scaffold\templates\controller.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/generators/components/scaffold/templates/functional_test.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/generators/components/scaffold/templates/functional_test.rb: $(srcdir)/lib/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/generators/components/scaffold/templates/functional_test.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\rails-2.0.2\lib\rails_generator\generators\components\scaffold\templates\functional_test.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/generators/components/scaffold/templates/helper.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/generators/components/scaffold/templates/helper.rb: $(srcdir)/lib/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/generators/components/scaffold/templates/helper.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\rails-2.0.2\lib\rails_generator\generators\components\scaffold\templates\helper.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/generators/components/session_migration
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/generators/components/session_migration/session_migration_generator.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/generators/components/session_migration/session_migration_generator.rb: $(srcdir)/lib/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/generators/components/session_migration/session_migration_generator.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\rails-2.0.2\lib\rails_generator\generators\components\session_migration\session_migration_generator.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/generators/components/session_migration/templates
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/generators/components/session_migration/templates/migration.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/generators/components/session_migration/templates/migration.rb: $(srcdir)/lib/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/generators/components/session_migration/templates/migration.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\rails-2.0.2\lib\rails_generator\generators\components\session_migration\templates\migration.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/scripts
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/scripts/destroy.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/scripts/destroy.rb: $(srcdir)/lib/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/scripts/destroy.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\rails-2.0.2\lib\rails_generator\scripts\destroy.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/scripts/generate.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/scripts/generate.rb: $(srcdir)/lib/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/scripts/generate.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\rails-2.0.2\lib\rails_generator\scripts\generate.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/scripts/update.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/scripts/update.rb: $(srcdir)/lib/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/scripts/update.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\rails-2.0.2\lib\rails_generator\scripts\update.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/tasks
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/tasks/rails.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/tasks/rails.rb: $(srcdir)/lib/ruby/gems/1.8/gems/rails-2.0.2/lib/tasks/rails.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\rails-2.0.2\lib\tasks\rails.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rake-0.8.1/doc
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rake-0.8.1/doc/jamis.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rake-0.8.1/doc/jamis.rb: $(srcdir)/lib/ruby/gems/1.8/gems/rake-0.8.1/doc/jamis.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\rake-0.8.1\doc\jamis.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rake-0.8.1
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rake-0.8.1/install.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rake-0.8.1/install.rb: $(srcdir)/lib/ruby/gems/1.8/gems/rake-0.8.1/install.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\rake-0.8.1\install.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rake-0.8.1/lib/rake
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rake-0.8.1/lib/rake/classic_namespace.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rake-0.8.1/lib/rake/classic_namespace.rb: $(srcdir)/lib/ruby/gems/1.8/gems/rake-0.8.1/lib/rake/classic_namespace.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\rake-0.8.1\lib\rake\classic_namespace.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rake-0.8.1/lib/rake/clean.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rake-0.8.1/lib/rake/clean.rb: $(srcdir)/lib/ruby/gems/1.8/gems/rake-0.8.1/lib/rake/clean.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\rake-0.8.1\lib\rake\clean.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rake-0.8.1/lib/rake/gempackagetask.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rake-0.8.1/lib/rake/gempackagetask.rb: $(srcdir)/lib/ruby/gems/1.8/gems/rake-0.8.1/lib/rake/gempackagetask.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\rake-0.8.1\lib\rake\gempackagetask.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rake-0.8.1/lib/rake/packagetask.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rake-0.8.1/lib/rake/packagetask.rb: $(srcdir)/lib/ruby/gems/1.8/gems/rake-0.8.1/lib/rake/packagetask.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\rake-0.8.1\lib\rake\packagetask.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rake-0.8.1/lib/rake/rake_test_loader.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rake-0.8.1/lib/rake/rake_test_loader.rb: $(srcdir)/lib/ruby/gems/1.8/gems/rake-0.8.1/lib/rake/rake_test_loader.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\rake-0.8.1\lib\rake\rake_test_loader.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rake-0.8.1/lib/rake/rdoctask.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rake-0.8.1/lib/rake/rdoctask.rb: $(srcdir)/lib/ruby/gems/1.8/gems/rake-0.8.1/lib/rake/rdoctask.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\rake-0.8.1\lib\rake\rdoctask.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rake-0.8.1/lib/rake/ruby182_test_unit_fix.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rake-0.8.1/lib/rake/ruby182_test_unit_fix.rb: $(srcdir)/lib/ruby/gems/1.8/gems/rake-0.8.1/lib/rake/ruby182_test_unit_fix.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\rake-0.8.1\lib\rake\ruby182_test_unit_fix.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rake-0.8.1/lib/rake/runtest.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rake-0.8.1/lib/rake/runtest.rb: $(srcdir)/lib/ruby/gems/1.8/gems/rake-0.8.1/lib/rake/runtest.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\rake-0.8.1\lib\rake\runtest.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rake-0.8.1/lib/rake/tasklib.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rake-0.8.1/lib/rake/tasklib.rb: $(srcdir)/lib/ruby/gems/1.8/gems/rake-0.8.1/lib/rake/tasklib.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\rake-0.8.1\lib\rake\tasklib.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rake-0.8.1/lib/rake/testtask.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rake-0.8.1/lib/rake/testtask.rb: $(srcdir)/lib/ruby/gems/1.8/gems/rake-0.8.1/lib/rake/testtask.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\rake-0.8.1\lib\rake\testtask.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rake-0.8.1/lib/rake/contrib
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rake-0.8.1/lib/rake/contrib/compositepublisher.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rake-0.8.1/lib/rake/contrib/compositepublisher.rb: $(srcdir)/lib/ruby/gems/1.8/gems/rake-0.8.1/lib/rake/contrib/compositepublisher.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\rake-0.8.1\lib\rake\contrib\compositepublisher.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rake-0.8.1/lib/rake/contrib/ftptools.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rake-0.8.1/lib/rake/contrib/ftptools.rb: $(srcdir)/lib/ruby/gems/1.8/gems/rake-0.8.1/lib/rake/contrib/ftptools.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\rake-0.8.1\lib\rake\contrib\ftptools.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rake-0.8.1/lib/rake/contrib/publisher.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rake-0.8.1/lib/rake/contrib/publisher.rb: $(srcdir)/lib/ruby/gems/1.8/gems/rake-0.8.1/lib/rake/contrib/publisher.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\rake-0.8.1\lib\rake\contrib\publisher.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rake-0.8.1/lib/rake/contrib/rubyforgepublisher.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rake-0.8.1/lib/rake/contrib/rubyforgepublisher.rb: $(srcdir)/lib/ruby/gems/1.8/gems/rake-0.8.1/lib/rake/contrib/rubyforgepublisher.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\rake-0.8.1\lib\rake\contrib\rubyforgepublisher.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rake-0.8.1/lib/rake/contrib/sshpublisher.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rake-0.8.1/lib/rake/contrib/sshpublisher.rb: $(srcdir)/lib/ruby/gems/1.8/gems/rake-0.8.1/lib/rake/contrib/sshpublisher.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\rake-0.8.1\lib\rake\contrib\sshpublisher.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rake-0.8.1/lib/rake/contrib/sys.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rake-0.8.1/lib/rake/contrib/sys.rb: $(srcdir)/lib/ruby/gems/1.8/gems/rake-0.8.1/lib/rake/contrib/sys.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\rake-0.8.1\lib\rake\contrib\sys.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rake-0.8.1/lib/rake/loaders
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rake-0.8.1/lib/rake/loaders/makefile.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rake-0.8.1/lib/rake/loaders/makefile.rb: $(srcdir)/lib/ruby/gems/1.8/gems/rake-0.8.1/lib/rake/loaders/makefile.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\rake-0.8.1\lib\rake\loaders\makefile.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rake-0.8.1/lib
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rake-0.8.1/lib/rake.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rake-0.8.1/lib/rake.rb: $(srcdir)/lib/ruby/gems/1.8/gems/rake-0.8.1/lib/rake.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\rake-0.8.1\lib\rake.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rake-0.8.1/test
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rake-0.8.1/test/capture_stdout.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rake-0.8.1/test/capture_stdout.rb: $(srcdir)/lib/ruby/gems/1.8/gems/rake-0.8.1/test/capture_stdout.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\rake-0.8.1\test\capture_stdout.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rake-0.8.1/test/filecreation.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rake-0.8.1/test/filecreation.rb: $(srcdir)/lib/ruby/gems/1.8/gems/rake-0.8.1/test/filecreation.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\rake-0.8.1\test\filecreation.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rake-0.8.1/test/functional.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rake-0.8.1/test/functional.rb: $(srcdir)/lib/ruby/gems/1.8/gems/rake-0.8.1/test/functional.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\rake-0.8.1\test\functional.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rake-0.8.1/test/rake_test_setup.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rake-0.8.1/test/rake_test_setup.rb: $(srcdir)/lib/ruby/gems/1.8/gems/rake-0.8.1/test/rake_test_setup.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\rake-0.8.1\test\rake_test_setup.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rake-0.8.1/test/reqfile.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rake-0.8.1/test/reqfile.rb: $(srcdir)/lib/ruby/gems/1.8/gems/rake-0.8.1/test/reqfile.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\rake-0.8.1\test\reqfile.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rake-0.8.1/test/reqfile2.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rake-0.8.1/test/reqfile2.rb: $(srcdir)/lib/ruby/gems/1.8/gems/rake-0.8.1/test/reqfile2.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\rake-0.8.1\test\reqfile2.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rake-0.8.1/test/session_functional.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rake-0.8.1/test/session_functional.rb: $(srcdir)/lib/ruby/gems/1.8/gems/rake-0.8.1/test/session_functional.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\rake-0.8.1\test\session_functional.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rake-0.8.1/test/shellcommand.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rake-0.8.1/test/shellcommand.rb: $(srcdir)/lib/ruby/gems/1.8/gems/rake-0.8.1/test/shellcommand.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\rake-0.8.1\test\shellcommand.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rake-0.8.1/test/test_application.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rake-0.8.1/test/test_application.rb: $(srcdir)/lib/ruby/gems/1.8/gems/rake-0.8.1/test/test_application.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\rake-0.8.1\test\test_application.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rake-0.8.1/test/test_clean.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rake-0.8.1/test/test_clean.rb: $(srcdir)/lib/ruby/gems/1.8/gems/rake-0.8.1/test/test_clean.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\rake-0.8.1\test\test_clean.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rake-0.8.1/test/test_definitions.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rake-0.8.1/test/test_definitions.rb: $(srcdir)/lib/ruby/gems/1.8/gems/rake-0.8.1/test/test_definitions.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\rake-0.8.1\test\test_definitions.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rake-0.8.1/test/test_earlytime.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rake-0.8.1/test/test_earlytime.rb: $(srcdir)/lib/ruby/gems/1.8/gems/rake-0.8.1/test/test_earlytime.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\rake-0.8.1\test\test_earlytime.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rake-0.8.1/test/test_extension.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rake-0.8.1/test/test_extension.rb: $(srcdir)/lib/ruby/gems/1.8/gems/rake-0.8.1/test/test_extension.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\rake-0.8.1\test\test_extension.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rake-0.8.1/test/test_filelist.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rake-0.8.1/test/test_filelist.rb: $(srcdir)/lib/ruby/gems/1.8/gems/rake-0.8.1/test/test_filelist.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\rake-0.8.1\test\test_filelist.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rake-0.8.1/test/test_fileutils.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rake-0.8.1/test/test_fileutils.rb: $(srcdir)/lib/ruby/gems/1.8/gems/rake-0.8.1/test/test_fileutils.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\rake-0.8.1\test\test_fileutils.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rake-0.8.1/test/test_file_creation_task.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rake-0.8.1/test/test_file_creation_task.rb: $(srcdir)/lib/ruby/gems/1.8/gems/rake-0.8.1/test/test_file_creation_task.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\rake-0.8.1\test\test_file_creation_task.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rake-0.8.1/test/test_file_task.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rake-0.8.1/test/test_file_task.rb: $(srcdir)/lib/ruby/gems/1.8/gems/rake-0.8.1/test/test_file_task.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\rake-0.8.1\test\test_file_task.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rake-0.8.1/test/test_ftp.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rake-0.8.1/test/test_ftp.rb: $(srcdir)/lib/ruby/gems/1.8/gems/rake-0.8.1/test/test_ftp.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\rake-0.8.1\test\test_ftp.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rake-0.8.1/test/test_invocation_chain.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rake-0.8.1/test/test_invocation_chain.rb: $(srcdir)/lib/ruby/gems/1.8/gems/rake-0.8.1/test/test_invocation_chain.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\rake-0.8.1\test\test_invocation_chain.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rake-0.8.1/test/test_makefile_loader.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rake-0.8.1/test/test_makefile_loader.rb: $(srcdir)/lib/ruby/gems/1.8/gems/rake-0.8.1/test/test_makefile_loader.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\rake-0.8.1\test\test_makefile_loader.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rake-0.8.1/test/test_multitask.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rake-0.8.1/test/test_multitask.rb: $(srcdir)/lib/ruby/gems/1.8/gems/rake-0.8.1/test/test_multitask.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\rake-0.8.1\test\test_multitask.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rake-0.8.1/test/test_namespace.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rake-0.8.1/test/test_namespace.rb: $(srcdir)/lib/ruby/gems/1.8/gems/rake-0.8.1/test/test_namespace.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\rake-0.8.1\test\test_namespace.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rake-0.8.1/test/test_package_task.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rake-0.8.1/test/test_package_task.rb: $(srcdir)/lib/ruby/gems/1.8/gems/rake-0.8.1/test/test_package_task.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\rake-0.8.1\test\test_package_task.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rake-0.8.1/test/test_pathmap.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rake-0.8.1/test/test_pathmap.rb: $(srcdir)/lib/ruby/gems/1.8/gems/rake-0.8.1/test/test_pathmap.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\rake-0.8.1\test\test_pathmap.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rake-0.8.1/test/test_rake.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rake-0.8.1/test/test_rake.rb: $(srcdir)/lib/ruby/gems/1.8/gems/rake-0.8.1/test/test_rake.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\rake-0.8.1\test\test_rake.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rake-0.8.1/test/test_require.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rake-0.8.1/test/test_require.rb: $(srcdir)/lib/ruby/gems/1.8/gems/rake-0.8.1/test/test_require.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\rake-0.8.1\test\test_require.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rake-0.8.1/test/test_rules.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rake-0.8.1/test/test_rules.rb: $(srcdir)/lib/ruby/gems/1.8/gems/rake-0.8.1/test/test_rules.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\rake-0.8.1\test\test_rules.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rake-0.8.1/test/test_tasks.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rake-0.8.1/test/test_tasks.rb: $(srcdir)/lib/ruby/gems/1.8/gems/rake-0.8.1/test/test_tasks.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\rake-0.8.1\test\test_tasks.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rake-0.8.1/test/test_task_arguments.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rake-0.8.1/test/test_task_arguments.rb: $(srcdir)/lib/ruby/gems/1.8/gems/rake-0.8.1/test/test_task_arguments.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\rake-0.8.1\test\test_task_arguments.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rake-0.8.1/test/test_task_manager.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rake-0.8.1/test/test_task_manager.rb: $(srcdir)/lib/ruby/gems/1.8/gems/rake-0.8.1/test/test_task_manager.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\rake-0.8.1\test\test_task_manager.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rake-0.8.1/test/test_test_task.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rake-0.8.1/test/test_test_task.rb: $(srcdir)/lib/ruby/gems/1.8/gems/rake-0.8.1/test/test_test_task.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\rake-0.8.1\test\test_test_task.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rake-0.8.1/test/test_top_level_functions.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rake-0.8.1/test/test_top_level_functions.rb: $(srcdir)/lib/ruby/gems/1.8/gems/rake-0.8.1/test/test_top_level_functions.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\rake-0.8.1\test\test_top_level_functions.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rake-0.8.1/test/contrib
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rake-0.8.1/test/contrib/testsys.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rake-0.8.1/test/contrib/testsys.rb: $(srcdir)/lib/ruby/gems/1.8/gems/rake-0.8.1/test/contrib/testsys.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\rake-0.8.1\test\contrib\testsys.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rake-0.8.1/test/data/rakelib
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rake-0.8.1/test/data/rakelib/test1.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rake-0.8.1/test/data/rakelib/test1.rb: $(srcdir)/lib/ruby/gems/1.8/gems/rake-0.8.1/test/data/rakelib/test1.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\rake-0.8.1\test\data\rakelib\test1.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rake-0.8.1/test/data/rbext
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rake-0.8.1/test/data/rbext/rakefile.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rake-0.8.1/test/data/rbext/rakefile.rb: $(srcdir)/lib/ruby/gems/1.8/gems/rake-0.8.1/test/data/rbext/rakefile.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\rake-0.8.1\test\data\rbext\rakefile.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rfeedfinder-0.9.11/lib/rfeedfinder
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rfeedfinder-0.9.11/lib/rfeedfinder/version.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rfeedfinder-0.9.11/lib/rfeedfinder/version.rb: $(srcdir)/lib/ruby/gems/1.8/gems/rfeedfinder-0.9.11/lib/rfeedfinder/version.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\rfeedfinder-0.9.11\lib\rfeedfinder\version.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rfeedfinder-0.9.11/lib
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rfeedfinder-0.9.11/lib/rfeedfinder.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rfeedfinder-0.9.11/lib/rfeedfinder.rb: $(srcdir)/lib/ruby/gems/1.8/gems/rfeedfinder-0.9.11/lib/rfeedfinder.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\rfeedfinder-0.9.11\lib\rfeedfinder.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rfeedfinder-0.9.11
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rfeedfinder-0.9.11/setup.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rfeedfinder-0.9.11/setup.rb: $(srcdir)/lib/ruby/gems/1.8/gems/rfeedfinder-0.9.11/setup.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\rfeedfinder-0.9.11\setup.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rfeedfinder-0.9.11/test
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rfeedfinder-0.9.11/test/test_helper.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rfeedfinder-0.9.11/test/test_helper.rb: $(srcdir)/lib/ruby/gems/1.8/gems/rfeedfinder-0.9.11/test/test_helper.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\rfeedfinder-0.9.11\test\test_helper.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rfeedfinder-0.9.11/test/test_rfeedfinder.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rfeedfinder-0.9.11/test/test_rfeedfinder.rb: $(srcdir)/lib/ruby/gems/1.8/gems/rfeedfinder-0.9.11/test/test_rfeedfinder.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\rfeedfinder-0.9.11\test\test_rfeedfinder.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rubyforge-0.4.4/lib/http-access2
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rubyforge-0.4.4/lib/http-access2/cookie.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rubyforge-0.4.4/lib/http-access2/cookie.rb: $(srcdir)/lib/ruby/gems/1.8/gems/rubyforge-0.4.4/lib/http-access2/cookie.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\rubyforge-0.4.4\lib\http-access2\cookie.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rubyforge-0.4.4/lib/http-access2/http.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rubyforge-0.4.4/lib/http-access2/http.rb: $(srcdir)/lib/ruby/gems/1.8/gems/rubyforge-0.4.4/lib/http-access2/http.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\rubyforge-0.4.4\lib\http-access2\http.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rubyforge-0.4.4/lib
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rubyforge-0.4.4/lib/http-access2.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rubyforge-0.4.4/lib/http-access2.rb: $(srcdir)/lib/ruby/gems/1.8/gems/rubyforge-0.4.4/lib/http-access2.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\rubyforge-0.4.4\lib\http-access2.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rubyforge-0.4.4/lib/rubyforge.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rubyforge-0.4.4/lib/rubyforge.rb: $(srcdir)/lib/ruby/gems/1.8/gems/rubyforge-0.4.4/lib/rubyforge.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\rubyforge-0.4.4\lib\rubyforge.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rubyforge-0.4.4/test
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/rubyforge-0.4.4/test/test_rubyforge.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rubyforge-0.4.4/test/test_rubyforge.rb: $(srcdir)/lib/ruby/gems/1.8/gems/rubyforge-0.4.4/test/test_rubyforge.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\rubyforge-0.4.4\test\test_rubyforge.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/RubyInline-3.6.5/demo
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/RubyInline-3.6.5/demo/fastmath.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/RubyInline-3.6.5/demo/fastmath.rb: $(srcdir)/lib/ruby/gems/1.8/gems/RubyInline-3.6.5/demo/fastmath.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\RubyInline-3.6.5\demo\fastmath.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/RubyInline-3.6.5/demo/hello.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/RubyInline-3.6.5/demo/hello.rb: $(srcdir)/lib/ruby/gems/1.8/gems/RubyInline-3.6.5/demo/hello.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\RubyInline-3.6.5\demo\hello.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/RubyInline-3.6.5
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/RubyInline-3.6.5/example.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/RubyInline-3.6.5/example.rb: $(srcdir)/lib/ruby/gems/1.8/gems/RubyInline-3.6.5/example.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\RubyInline-3.6.5\example.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/RubyInline-3.6.5/example2.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/RubyInline-3.6.5/example2.rb: $(srcdir)/lib/ruby/gems/1.8/gems/RubyInline-3.6.5/example2.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\RubyInline-3.6.5\example2.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/RubyInline-3.6.5/lib
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/RubyInline-3.6.5/lib/inline.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/RubyInline-3.6.5/lib/inline.rb: $(srcdir)/lib/ruby/gems/1.8/gems/RubyInline-3.6.5/lib/inline.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\RubyInline-3.6.5\lib\inline.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/RubyInline-3.6.5/test
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/RubyInline-3.6.5/test/test_inline.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/RubyInline-3.6.5/test/test_inline.rb: $(srcdir)/lib/ruby/gems/1.8/gems/RubyInline-3.6.5/test/test_inline.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\RubyInline-3.6.5\test\test_inline.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/RubyInline-3.6.5/tutorial
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/RubyInline-3.6.5/tutorial/example1.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/RubyInline-3.6.5/tutorial/example1.rb: $(srcdir)/lib/ruby/gems/1.8/gems/RubyInline-3.6.5/tutorial/example1.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\RubyInline-3.6.5\tutorial\example1.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/RubyInline-3.6.5/tutorial/example2.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/RubyInline-3.6.5/tutorial/example2.rb: $(srcdir)/lib/ruby/gems/1.8/gems/RubyInline-3.6.5/tutorial/example2.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\RubyInline-3.6.5\tutorial\example2.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/simple-rss-1.1/lib
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/simple-rss-1.1/lib/simple-rss.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/simple-rss-1.1/lib/simple-rss.rb: $(srcdir)/lib/ruby/gems/1.8/gems/simple-rss-1.1/lib/simple-rss.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\simple-rss-1.1\lib\simple-rss.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/simple-rss-1.1/test/base
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/simple-rss-1.1/test/base/base_test.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/simple-rss-1.1/test/base/base_test.rb: $(srcdir)/lib/ruby/gems/1.8/gems/simple-rss-1.1/test/base/base_test.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\simple-rss-1.1\test\base\base_test.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/simple-rss-1.1/test
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/simple-rss-1.1/test/test_helper.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/simple-rss-1.1/test/test_helper.rb: $(srcdir)/lib/ruby/gems/1.8/gems/simple-rss-1.1/test/test_helper.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\simple-rss-1.1\test\test_helper.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/sqlite3-ruby-1.2.1-x86-mswin32/doc/faq
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/sqlite3-ruby-1.2.1-x86-mswin32/doc/faq/faq.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/sqlite3-ruby-1.2.1-x86-mswin32/doc/faq/faq.rb: $(srcdir)/lib/ruby/gems/1.8/gems/sqlite3-ruby-1.2.1-x86-mswin32/doc/faq/faq.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\sqlite3-ruby-1.2.1-x86-mswin32\doc\faq\faq.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/sqlite3-ruby-1.2.1-x86-mswin32/ext/sqlite3_api
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/sqlite3-ruby-1.2.1-x86-mswin32/ext/sqlite3_api/extconf.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/sqlite3-ruby-1.2.1-x86-mswin32/ext/sqlite3_api/extconf.rb: $(srcdir)/lib/ruby/gems/1.8/gems/sqlite3-ruby-1.2.1-x86-mswin32/ext/sqlite3_api/extconf.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\sqlite3-ruby-1.2.1-x86-mswin32\ext\sqlite3_api\extconf.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/sqlite3-ruby-1.2.1-x86-mswin32/lib/sqlite3
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/sqlite3-ruby-1.2.1-x86-mswin32/lib/sqlite3/constants.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/sqlite3-ruby-1.2.1-x86-mswin32/lib/sqlite3/constants.rb: $(srcdir)/lib/ruby/gems/1.8/gems/sqlite3-ruby-1.2.1-x86-mswin32/lib/sqlite3/constants.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\sqlite3-ruby-1.2.1-x86-mswin32\lib\sqlite3\constants.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/sqlite3-ruby-1.2.1-x86-mswin32/lib/sqlite3/database.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/sqlite3-ruby-1.2.1-x86-mswin32/lib/sqlite3/database.rb: $(srcdir)/lib/ruby/gems/1.8/gems/sqlite3-ruby-1.2.1-x86-mswin32/lib/sqlite3/database.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\sqlite3-ruby-1.2.1-x86-mswin32\lib\sqlite3\database.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/sqlite3-ruby-1.2.1-x86-mswin32/lib/sqlite3/errors.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/sqlite3-ruby-1.2.1-x86-mswin32/lib/sqlite3/errors.rb: $(srcdir)/lib/ruby/gems/1.8/gems/sqlite3-ruby-1.2.1-x86-mswin32/lib/sqlite3/errors.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\sqlite3-ruby-1.2.1-x86-mswin32\lib\sqlite3\errors.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/sqlite3-ruby-1.2.1-x86-mswin32/lib/sqlite3/pragmas.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/sqlite3-ruby-1.2.1-x86-mswin32/lib/sqlite3/pragmas.rb: $(srcdir)/lib/ruby/gems/1.8/gems/sqlite3-ruby-1.2.1-x86-mswin32/lib/sqlite3/pragmas.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\sqlite3-ruby-1.2.1-x86-mswin32\lib\sqlite3\pragmas.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/sqlite3-ruby-1.2.1-x86-mswin32/lib/sqlite3/resultset.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/sqlite3-ruby-1.2.1-x86-mswin32/lib/sqlite3/resultset.rb: $(srcdir)/lib/ruby/gems/1.8/gems/sqlite3-ruby-1.2.1-x86-mswin32/lib/sqlite3/resultset.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\sqlite3-ruby-1.2.1-x86-mswin32\lib\sqlite3\resultset.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/sqlite3-ruby-1.2.1-x86-mswin32/lib/sqlite3/statement.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/sqlite3-ruby-1.2.1-x86-mswin32/lib/sqlite3/statement.rb: $(srcdir)/lib/ruby/gems/1.8/gems/sqlite3-ruby-1.2.1-x86-mswin32/lib/sqlite3/statement.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\sqlite3-ruby-1.2.1-x86-mswin32\lib\sqlite3\statement.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/sqlite3-ruby-1.2.1-x86-mswin32/lib/sqlite3/translator.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/sqlite3-ruby-1.2.1-x86-mswin32/lib/sqlite3/translator.rb: $(srcdir)/lib/ruby/gems/1.8/gems/sqlite3-ruby-1.2.1-x86-mswin32/lib/sqlite3/translator.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\sqlite3-ruby-1.2.1-x86-mswin32\lib\sqlite3\translator.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/sqlite3-ruby-1.2.1-x86-mswin32/lib/sqlite3/value.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/sqlite3-ruby-1.2.1-x86-mswin32/lib/sqlite3/value.rb: $(srcdir)/lib/ruby/gems/1.8/gems/sqlite3-ruby-1.2.1-x86-mswin32/lib/sqlite3/value.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\sqlite3-ruby-1.2.1-x86-mswin32\lib\sqlite3\value.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/sqlite3-ruby-1.2.1-x86-mswin32/lib/sqlite3/version.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/sqlite3-ruby-1.2.1-x86-mswin32/lib/sqlite3/version.rb: $(srcdir)/lib/ruby/gems/1.8/gems/sqlite3-ruby-1.2.1-x86-mswin32/lib/sqlite3/version.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\sqlite3-ruby-1.2.1-x86-mswin32\lib\sqlite3\version.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/sqlite3-ruby-1.2.1-x86-mswin32/lib/sqlite3/driver/dl
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/sqlite3-ruby-1.2.1-x86-mswin32/lib/sqlite3/driver/dl/api.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/sqlite3-ruby-1.2.1-x86-mswin32/lib/sqlite3/driver/dl/api.rb: $(srcdir)/lib/ruby/gems/1.8/gems/sqlite3-ruby-1.2.1-x86-mswin32/lib/sqlite3/driver/dl/api.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\sqlite3-ruby-1.2.1-x86-mswin32\lib\sqlite3\driver\dl\api.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/sqlite3-ruby-1.2.1-x86-mswin32/lib/sqlite3/driver/dl/driver.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/sqlite3-ruby-1.2.1-x86-mswin32/lib/sqlite3/driver/dl/driver.rb: $(srcdir)/lib/ruby/gems/1.8/gems/sqlite3-ruby-1.2.1-x86-mswin32/lib/sqlite3/driver/dl/driver.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\sqlite3-ruby-1.2.1-x86-mswin32\lib\sqlite3\driver\dl\driver.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/sqlite3-ruby-1.2.1-x86-mswin32/lib/sqlite3/driver/native
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/sqlite3-ruby-1.2.1-x86-mswin32/lib/sqlite3/driver/native/driver.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/sqlite3-ruby-1.2.1-x86-mswin32/lib/sqlite3/driver/native/driver.rb: $(srcdir)/lib/ruby/gems/1.8/gems/sqlite3-ruby-1.2.1-x86-mswin32/lib/sqlite3/driver/native/driver.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\sqlite3-ruby-1.2.1-x86-mswin32\lib\sqlite3\driver\native\driver.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/sqlite3-ruby-1.2.1-x86-mswin32/lib
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/sqlite3-ruby-1.2.1-x86-mswin32/lib/sqlite3.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/sqlite3-ruby-1.2.1-x86-mswin32/lib/sqlite3.rb: $(srcdir)/lib/ruby/gems/1.8/gems/sqlite3-ruby-1.2.1-x86-mswin32/lib/sqlite3.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\sqlite3-ruby-1.2.1-x86-mswin32\lib\sqlite3.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/sqlite3-ruby-1.2.1-x86-mswin32/test
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/sqlite3-ruby-1.2.1-x86-mswin32/test/bm.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/sqlite3-ruby-1.2.1-x86-mswin32/test/bm.rb: $(srcdir)/lib/ruby/gems/1.8/gems/sqlite3-ruby-1.2.1-x86-mswin32/test/bm.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\sqlite3-ruby-1.2.1-x86-mswin32\test\bm.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/sqlite3-ruby-1.2.1-x86-mswin32/test/mocks.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/sqlite3-ruby-1.2.1-x86-mswin32/test/mocks.rb: $(srcdir)/lib/ruby/gems/1.8/gems/sqlite3-ruby-1.2.1-x86-mswin32/test/mocks.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\sqlite3-ruby-1.2.1-x86-mswin32\test\mocks.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/sqlite3-ruby-1.2.1-x86-mswin32/test/native-vs-dl.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/sqlite3-ruby-1.2.1-x86-mswin32/test/native-vs-dl.rb: $(srcdir)/lib/ruby/gems/1.8/gems/sqlite3-ruby-1.2.1-x86-mswin32/test/native-vs-dl.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\sqlite3-ruby-1.2.1-x86-mswin32\test\native-vs-dl.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/sqlite3-ruby-1.2.1-x86-mswin32/test/tc_database.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/sqlite3-ruby-1.2.1-x86-mswin32/test/tc_database.rb: $(srcdir)/lib/ruby/gems/1.8/gems/sqlite3-ruby-1.2.1-x86-mswin32/test/tc_database.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\sqlite3-ruby-1.2.1-x86-mswin32\test\tc_database.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/sqlite3-ruby-1.2.1-x86-mswin32/test/tc_errors.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/sqlite3-ruby-1.2.1-x86-mswin32/test/tc_errors.rb: $(srcdir)/lib/ruby/gems/1.8/gems/sqlite3-ruby-1.2.1-x86-mswin32/test/tc_errors.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\sqlite3-ruby-1.2.1-x86-mswin32\test\tc_errors.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/sqlite3-ruby-1.2.1-x86-mswin32/test/tc_integration.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/sqlite3-ruby-1.2.1-x86-mswin32/test/tc_integration.rb: $(srcdir)/lib/ruby/gems/1.8/gems/sqlite3-ruby-1.2.1-x86-mswin32/test/tc_integration.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\sqlite3-ruby-1.2.1-x86-mswin32\test\tc_integration.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/sqlite3-ruby-1.2.1-x86-mswin32/test/tests.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/sqlite3-ruby-1.2.1-x86-mswin32/test/tests.rb: $(srcdir)/lib/ruby/gems/1.8/gems/sqlite3-ruby-1.2.1-x86-mswin32/test/tests.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\sqlite3-ruby-1.2.1-x86-mswin32\test\tests.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/sqlite3-ruby-1.2.1-x86-mswin32/test/driver/dl
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/sqlite3-ruby-1.2.1-x86-mswin32/test/driver/dl/tc_driver.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/sqlite3-ruby-1.2.1-x86-mswin32/test/driver/dl/tc_driver.rb: $(srcdir)/lib/ruby/gems/1.8/gems/sqlite3-ruby-1.2.1-x86-mswin32/test/driver/dl/tc_driver.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\sqlite3-ruby-1.2.1-x86-mswin32\test\driver\dl\tc_driver.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/win32-service-0.5.2-x86-mswin32/test
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/win32-service-0.5.2-x86-mswin32/test/tc_daemon.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/win32-service-0.5.2-x86-mswin32/test/tc_daemon.rb: $(srcdir)/lib/ruby/gems/1.8/gems/win32-service-0.5.2-x86-mswin32/test/tc_daemon.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\win32-service-0.5.2-x86-mswin32\test\tc_daemon.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/gems/1.8/gems/win32-service-0.5.2-x86-mswin32/test/tc_service.rb
$(RUBYLIBDIR)/ruby/gems/1.8/gems/win32-service-0.5.2-x86-mswin32/test/tc_service.rb: $(srcdir)/lib/ruby/gems/1.8/gems/win32-service-0.5.2-x86-mswin32/test/tc_service.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\gems\1.8\gems\win32-service-0.5.2-x86-mswin32\test\tc_service.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/site_ruby/1.8/rbconfig
install-rb-default: $(RUBYLIBDIR)/ruby/site_ruby/1.8/rbconfig/datadir.rb
$(RUBYLIBDIR)/ruby/site_ruby/1.8/rbconfig/datadir.rb: $(srcdir)/lib/ruby/site_ruby/1.8/rbconfig/datadir.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\site_ruby\1.8\rbconfig\datadir.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/site_ruby/1.8/rubygems
install-rb-default: $(RUBYLIBDIR)/ruby/site_ruby/1.8/rubygems/builder.rb
$(RUBYLIBDIR)/ruby/site_ruby/1.8/rubygems/builder.rb: $(srcdir)/lib/ruby/site_ruby/1.8/rubygems/builder.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\site_ruby\1.8\rubygems\builder.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/site_ruby/1.8/rubygems/command.rb
$(RUBYLIBDIR)/ruby/site_ruby/1.8/rubygems/command.rb: $(srcdir)/lib/ruby/site_ruby/1.8/rubygems/command.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\site_ruby\1.8\rubygems\command.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/site_ruby/1.8/rubygems/command_manager.rb
$(RUBYLIBDIR)/ruby/site_ruby/1.8/rubygems/command_manager.rb: $(srcdir)/lib/ruby/site_ruby/1.8/rubygems/command_manager.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\site_ruby\1.8\rubygems\command_manager.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/site_ruby/1.8/rubygems/config_file.rb
$(RUBYLIBDIR)/ruby/site_ruby/1.8/rubygems/config_file.rb: $(srcdir)/lib/ruby/site_ruby/1.8/rubygems/config_file.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\site_ruby\1.8\rubygems\config_file.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/site_ruby/1.8/rubygems/custom_require.rb
$(RUBYLIBDIR)/ruby/site_ruby/1.8/rubygems/custom_require.rb: $(srcdir)/lib/ruby/site_ruby/1.8/rubygems/custom_require.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\site_ruby\1.8\rubygems\custom_require.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/site_ruby/1.8/rubygems/defaults.rb
$(RUBYLIBDIR)/ruby/site_ruby/1.8/rubygems/defaults.rb: $(srcdir)/lib/ruby/site_ruby/1.8/rubygems/defaults.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\site_ruby\1.8\rubygems\defaults.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/site_ruby/1.8/rubygems/dependency.rb
$(RUBYLIBDIR)/ruby/site_ruby/1.8/rubygems/dependency.rb: $(srcdir)/lib/ruby/site_ruby/1.8/rubygems/dependency.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\site_ruby\1.8\rubygems\dependency.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/site_ruby/1.8/rubygems/dependency_installer.rb
$(RUBYLIBDIR)/ruby/site_ruby/1.8/rubygems/dependency_installer.rb: $(srcdir)/lib/ruby/site_ruby/1.8/rubygems/dependency_installer.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\site_ruby\1.8\rubygems\dependency_installer.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/site_ruby/1.8/rubygems/dependency_list.rb
$(RUBYLIBDIR)/ruby/site_ruby/1.8/rubygems/dependency_list.rb: $(srcdir)/lib/ruby/site_ruby/1.8/rubygems/dependency_list.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\site_ruby\1.8\rubygems\dependency_list.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/site_ruby/1.8/rubygems/doc_manager.rb
$(RUBYLIBDIR)/ruby/site_ruby/1.8/rubygems/doc_manager.rb: $(srcdir)/lib/ruby/site_ruby/1.8/rubygems/doc_manager.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\site_ruby\1.8\rubygems\doc_manager.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/site_ruby/1.8/rubygems/exceptions.rb
$(RUBYLIBDIR)/ruby/site_ruby/1.8/rubygems/exceptions.rb: $(srcdir)/lib/ruby/site_ruby/1.8/rubygems/exceptions.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\site_ruby\1.8\rubygems\exceptions.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/site_ruby/1.8/rubygems/ext.rb
$(RUBYLIBDIR)/ruby/site_ruby/1.8/rubygems/ext.rb: $(srcdir)/lib/ruby/site_ruby/1.8/rubygems/ext.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\site_ruby\1.8\rubygems\ext.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/site_ruby/1.8/rubygems/format.rb
$(RUBYLIBDIR)/ruby/site_ruby/1.8/rubygems/format.rb: $(srcdir)/lib/ruby/site_ruby/1.8/rubygems/format.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\site_ruby\1.8\rubygems\format.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/site_ruby/1.8/rubygems/gem_openssl.rb
$(RUBYLIBDIR)/ruby/site_ruby/1.8/rubygems/gem_openssl.rb: $(srcdir)/lib/ruby/site_ruby/1.8/rubygems/gem_openssl.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\site_ruby\1.8\rubygems\gem_openssl.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/site_ruby/1.8/rubygems/gem_open_uri.rb
$(RUBYLIBDIR)/ruby/site_ruby/1.8/rubygems/gem_open_uri.rb: $(srcdir)/lib/ruby/site_ruby/1.8/rubygems/gem_open_uri.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\site_ruby\1.8\rubygems\gem_open_uri.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/site_ruby/1.8/rubygems/gem_path_searcher.rb
$(RUBYLIBDIR)/ruby/site_ruby/1.8/rubygems/gem_path_searcher.rb: $(srcdir)/lib/ruby/site_ruby/1.8/rubygems/gem_path_searcher.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\site_ruby\1.8\rubygems\gem_path_searcher.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/site_ruby/1.8/rubygems/gem_runner.rb
$(RUBYLIBDIR)/ruby/site_ruby/1.8/rubygems/gem_runner.rb: $(srcdir)/lib/ruby/site_ruby/1.8/rubygems/gem_runner.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\site_ruby\1.8\rubygems\gem_runner.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/site_ruby/1.8/rubygems/indexer.rb
$(RUBYLIBDIR)/ruby/site_ruby/1.8/rubygems/indexer.rb: $(srcdir)/lib/ruby/site_ruby/1.8/rubygems/indexer.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\site_ruby\1.8\rubygems\indexer.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/site_ruby/1.8/rubygems/installer.rb
$(RUBYLIBDIR)/ruby/site_ruby/1.8/rubygems/installer.rb: $(srcdir)/lib/ruby/site_ruby/1.8/rubygems/installer.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\site_ruby\1.8\rubygems\installer.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/site_ruby/1.8/rubygems/install_update_options.rb
$(RUBYLIBDIR)/ruby/site_ruby/1.8/rubygems/install_update_options.rb: $(srcdir)/lib/ruby/site_ruby/1.8/rubygems/install_update_options.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\site_ruby\1.8\rubygems\install_update_options.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/site_ruby/1.8/rubygems/local_remote_options.rb
$(RUBYLIBDIR)/ruby/site_ruby/1.8/rubygems/local_remote_options.rb: $(srcdir)/lib/ruby/site_ruby/1.8/rubygems/local_remote_options.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\site_ruby\1.8\rubygems\local_remote_options.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/site_ruby/1.8/rubygems/old_format.rb
$(RUBYLIBDIR)/ruby/site_ruby/1.8/rubygems/old_format.rb: $(srcdir)/lib/ruby/site_ruby/1.8/rubygems/old_format.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\site_ruby\1.8\rubygems\old_format.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/site_ruby/1.8/rubygems/open-uri.rb
$(RUBYLIBDIR)/ruby/site_ruby/1.8/rubygems/open-uri.rb: $(srcdir)/lib/ruby/site_ruby/1.8/rubygems/open-uri.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\site_ruby\1.8\rubygems\open-uri.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/site_ruby/1.8/rubygems/package.rb
$(RUBYLIBDIR)/ruby/site_ruby/1.8/rubygems/package.rb: $(srcdir)/lib/ruby/site_ruby/1.8/rubygems/package.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\site_ruby\1.8\rubygems\package.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/site_ruby/1.8/rubygems/platform.rb
$(RUBYLIBDIR)/ruby/site_ruby/1.8/rubygems/platform.rb: $(srcdir)/lib/ruby/site_ruby/1.8/rubygems/platform.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\site_ruby\1.8\rubygems\platform.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/site_ruby/1.8/rubygems/remote_fetcher.rb
$(RUBYLIBDIR)/ruby/site_ruby/1.8/rubygems/remote_fetcher.rb: $(srcdir)/lib/ruby/site_ruby/1.8/rubygems/remote_fetcher.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\site_ruby\1.8\rubygems\remote_fetcher.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/site_ruby/1.8/rubygems/requirement.rb
$(RUBYLIBDIR)/ruby/site_ruby/1.8/rubygems/requirement.rb: $(srcdir)/lib/ruby/site_ruby/1.8/rubygems/requirement.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\site_ruby\1.8\rubygems\requirement.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/site_ruby/1.8/rubygems/require_paths_builder.rb
$(RUBYLIBDIR)/ruby/site_ruby/1.8/rubygems/require_paths_builder.rb: $(srcdir)/lib/ruby/site_ruby/1.8/rubygems/require_paths_builder.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\site_ruby\1.8\rubygems\require_paths_builder.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/site_ruby/1.8/rubygems/rubygems_version.rb
$(RUBYLIBDIR)/ruby/site_ruby/1.8/rubygems/rubygems_version.rb: $(srcdir)/lib/ruby/site_ruby/1.8/rubygems/rubygems_version.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\site_ruby\1.8\rubygems\rubygems_version.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/site_ruby/1.8/rubygems/security.rb
$(RUBYLIBDIR)/ruby/site_ruby/1.8/rubygems/security.rb: $(srcdir)/lib/ruby/site_ruby/1.8/rubygems/security.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\site_ruby\1.8\rubygems\security.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/site_ruby/1.8/rubygems/server.rb
$(RUBYLIBDIR)/ruby/site_ruby/1.8/rubygems/server.rb: $(srcdir)/lib/ruby/site_ruby/1.8/rubygems/server.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\site_ruby\1.8\rubygems\server.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/site_ruby/1.8/rubygems/source_index.rb
$(RUBYLIBDIR)/ruby/site_ruby/1.8/rubygems/source_index.rb: $(srcdir)/lib/ruby/site_ruby/1.8/rubygems/source_index.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\site_ruby\1.8\rubygems\source_index.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/site_ruby/1.8/rubygems/source_info_cache.rb
$(RUBYLIBDIR)/ruby/site_ruby/1.8/rubygems/source_info_cache.rb: $(srcdir)/lib/ruby/site_ruby/1.8/rubygems/source_info_cache.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\site_ruby\1.8\rubygems\source_info_cache.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/site_ruby/1.8/rubygems/source_info_cache_entry.rb
$(RUBYLIBDIR)/ruby/site_ruby/1.8/rubygems/source_info_cache_entry.rb: $(srcdir)/lib/ruby/site_ruby/1.8/rubygems/source_info_cache_entry.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\site_ruby\1.8\rubygems\source_info_cache_entry.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/site_ruby/1.8/rubygems/specification.rb
$(RUBYLIBDIR)/ruby/site_ruby/1.8/rubygems/specification.rb: $(srcdir)/lib/ruby/site_ruby/1.8/rubygems/specification.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\site_ruby\1.8\rubygems\specification.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/site_ruby/1.8/rubygems/timer.rb
$(RUBYLIBDIR)/ruby/site_ruby/1.8/rubygems/timer.rb: $(srcdir)/lib/ruby/site_ruby/1.8/rubygems/timer.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\site_ruby\1.8\rubygems\timer.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/site_ruby/1.8/rubygems/uninstaller.rb
$(RUBYLIBDIR)/ruby/site_ruby/1.8/rubygems/uninstaller.rb: $(srcdir)/lib/ruby/site_ruby/1.8/rubygems/uninstaller.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\site_ruby\1.8\rubygems\uninstaller.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/site_ruby/1.8/rubygems/user_interaction.rb
$(RUBYLIBDIR)/ruby/site_ruby/1.8/rubygems/user_interaction.rb: $(srcdir)/lib/ruby/site_ruby/1.8/rubygems/user_interaction.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\site_ruby\1.8\rubygems\user_interaction.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/site_ruby/1.8/rubygems/validator.rb
$(RUBYLIBDIR)/ruby/site_ruby/1.8/rubygems/validator.rb: $(srcdir)/lib/ruby/site_ruby/1.8/rubygems/validator.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\site_ruby\1.8\rubygems\validator.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/site_ruby/1.8/rubygems/version.rb
$(RUBYLIBDIR)/ruby/site_ruby/1.8/rubygems/version.rb: $(srcdir)/lib/ruby/site_ruby/1.8/rubygems/version.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\site_ruby\1.8\rubygems\version.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/site_ruby/1.8/rubygems/version_option.rb
$(RUBYLIBDIR)/ruby/site_ruby/1.8/rubygems/version_option.rb: $(srcdir)/lib/ruby/site_ruby/1.8/rubygems/version_option.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\site_ruby\1.8\rubygems\version_option.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/site_ruby/1.8/rubygems/commands
install-rb-default: $(RUBYLIBDIR)/ruby/site_ruby/1.8/rubygems/commands/build_command.rb
$(RUBYLIBDIR)/ruby/site_ruby/1.8/rubygems/commands/build_command.rb: $(srcdir)/lib/ruby/site_ruby/1.8/rubygems/commands/build_command.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\site_ruby\1.8\rubygems\commands\build_command.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/site_ruby/1.8/rubygems/commands/cert_command.rb
$(RUBYLIBDIR)/ruby/site_ruby/1.8/rubygems/commands/cert_command.rb: $(srcdir)/lib/ruby/site_ruby/1.8/rubygems/commands/cert_command.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\site_ruby\1.8\rubygems\commands\cert_command.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/site_ruby/1.8/rubygems/commands/check_command.rb
$(RUBYLIBDIR)/ruby/site_ruby/1.8/rubygems/commands/check_command.rb: $(srcdir)/lib/ruby/site_ruby/1.8/rubygems/commands/check_command.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\site_ruby\1.8\rubygems\commands\check_command.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/site_ruby/1.8/rubygems/commands/cleanup_command.rb
$(RUBYLIBDIR)/ruby/site_ruby/1.8/rubygems/commands/cleanup_command.rb: $(srcdir)/lib/ruby/site_ruby/1.8/rubygems/commands/cleanup_command.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\site_ruby\1.8\rubygems\commands\cleanup_command.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/site_ruby/1.8/rubygems/commands/contents_command.rb
$(RUBYLIBDIR)/ruby/site_ruby/1.8/rubygems/commands/contents_command.rb: $(srcdir)/lib/ruby/site_ruby/1.8/rubygems/commands/contents_command.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\site_ruby\1.8\rubygems\commands\contents_command.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/site_ruby/1.8/rubygems/commands/dependency_command.rb
$(RUBYLIBDIR)/ruby/site_ruby/1.8/rubygems/commands/dependency_command.rb: $(srcdir)/lib/ruby/site_ruby/1.8/rubygems/commands/dependency_command.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\site_ruby\1.8\rubygems\commands\dependency_command.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/site_ruby/1.8/rubygems/commands/environment_command.rb
$(RUBYLIBDIR)/ruby/site_ruby/1.8/rubygems/commands/environment_command.rb: $(srcdir)/lib/ruby/site_ruby/1.8/rubygems/commands/environment_command.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\site_ruby\1.8\rubygems\commands\environment_command.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/site_ruby/1.8/rubygems/commands/fetch_command.rb
$(RUBYLIBDIR)/ruby/site_ruby/1.8/rubygems/commands/fetch_command.rb: $(srcdir)/lib/ruby/site_ruby/1.8/rubygems/commands/fetch_command.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\site_ruby\1.8\rubygems\commands\fetch_command.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/site_ruby/1.8/rubygems/commands/generate_index_command.rb
$(RUBYLIBDIR)/ruby/site_ruby/1.8/rubygems/commands/generate_index_command.rb: $(srcdir)/lib/ruby/site_ruby/1.8/rubygems/commands/generate_index_command.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\site_ruby\1.8\rubygems\commands\generate_index_command.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/site_ruby/1.8/rubygems/commands/help_command.rb
$(RUBYLIBDIR)/ruby/site_ruby/1.8/rubygems/commands/help_command.rb: $(srcdir)/lib/ruby/site_ruby/1.8/rubygems/commands/help_command.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\site_ruby\1.8\rubygems\commands\help_command.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/site_ruby/1.8/rubygems/commands/install_command.rb
$(RUBYLIBDIR)/ruby/site_ruby/1.8/rubygems/commands/install_command.rb: $(srcdir)/lib/ruby/site_ruby/1.8/rubygems/commands/install_command.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\site_ruby\1.8\rubygems\commands\install_command.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/site_ruby/1.8/rubygems/commands/list_command.rb
$(RUBYLIBDIR)/ruby/site_ruby/1.8/rubygems/commands/list_command.rb: $(srcdir)/lib/ruby/site_ruby/1.8/rubygems/commands/list_command.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\site_ruby\1.8\rubygems\commands\list_command.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/site_ruby/1.8/rubygems/commands/lock_command.rb
$(RUBYLIBDIR)/ruby/site_ruby/1.8/rubygems/commands/lock_command.rb: $(srcdir)/lib/ruby/site_ruby/1.8/rubygems/commands/lock_command.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\site_ruby\1.8\rubygems\commands\lock_command.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/site_ruby/1.8/rubygems/commands/mirror_command.rb
$(RUBYLIBDIR)/ruby/site_ruby/1.8/rubygems/commands/mirror_command.rb: $(srcdir)/lib/ruby/site_ruby/1.8/rubygems/commands/mirror_command.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\site_ruby\1.8\rubygems\commands\mirror_command.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/site_ruby/1.8/rubygems/commands/outdated_command.rb
$(RUBYLIBDIR)/ruby/site_ruby/1.8/rubygems/commands/outdated_command.rb: $(srcdir)/lib/ruby/site_ruby/1.8/rubygems/commands/outdated_command.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\site_ruby\1.8\rubygems\commands\outdated_command.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/site_ruby/1.8/rubygems/commands/pristine_command.rb
$(RUBYLIBDIR)/ruby/site_ruby/1.8/rubygems/commands/pristine_command.rb: $(srcdir)/lib/ruby/site_ruby/1.8/rubygems/commands/pristine_command.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\site_ruby\1.8\rubygems\commands\pristine_command.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/site_ruby/1.8/rubygems/commands/query_command.rb
$(RUBYLIBDIR)/ruby/site_ruby/1.8/rubygems/commands/query_command.rb: $(srcdir)/lib/ruby/site_ruby/1.8/rubygems/commands/query_command.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\site_ruby\1.8\rubygems\commands\query_command.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/site_ruby/1.8/rubygems/commands/rdoc_command.rb
$(RUBYLIBDIR)/ruby/site_ruby/1.8/rubygems/commands/rdoc_command.rb: $(srcdir)/lib/ruby/site_ruby/1.8/rubygems/commands/rdoc_command.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\site_ruby\1.8\rubygems\commands\rdoc_command.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/site_ruby/1.8/rubygems/commands/search_command.rb
$(RUBYLIBDIR)/ruby/site_ruby/1.8/rubygems/commands/search_command.rb: $(srcdir)/lib/ruby/site_ruby/1.8/rubygems/commands/search_command.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\site_ruby\1.8\rubygems\commands\search_command.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/site_ruby/1.8/rubygems/commands/server_command.rb
$(RUBYLIBDIR)/ruby/site_ruby/1.8/rubygems/commands/server_command.rb: $(srcdir)/lib/ruby/site_ruby/1.8/rubygems/commands/server_command.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\site_ruby\1.8\rubygems\commands\server_command.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/site_ruby/1.8/rubygems/commands/sources_command.rb
$(RUBYLIBDIR)/ruby/site_ruby/1.8/rubygems/commands/sources_command.rb: $(srcdir)/lib/ruby/site_ruby/1.8/rubygems/commands/sources_command.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\site_ruby\1.8\rubygems\commands\sources_command.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/site_ruby/1.8/rubygems/commands/specification_command.rb
$(RUBYLIBDIR)/ruby/site_ruby/1.8/rubygems/commands/specification_command.rb: $(srcdir)/lib/ruby/site_ruby/1.8/rubygems/commands/specification_command.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\site_ruby\1.8\rubygems\commands\specification_command.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/site_ruby/1.8/rubygems/commands/uninstall_command.rb
$(RUBYLIBDIR)/ruby/site_ruby/1.8/rubygems/commands/uninstall_command.rb: $(srcdir)/lib/ruby/site_ruby/1.8/rubygems/commands/uninstall_command.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\site_ruby\1.8\rubygems\commands\uninstall_command.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/site_ruby/1.8/rubygems/commands/unpack_command.rb
$(RUBYLIBDIR)/ruby/site_ruby/1.8/rubygems/commands/unpack_command.rb: $(srcdir)/lib/ruby/site_ruby/1.8/rubygems/commands/unpack_command.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\site_ruby\1.8\rubygems\commands\unpack_command.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/site_ruby/1.8/rubygems/commands/update_command.rb
$(RUBYLIBDIR)/ruby/site_ruby/1.8/rubygems/commands/update_command.rb: $(srcdir)/lib/ruby/site_ruby/1.8/rubygems/commands/update_command.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\site_ruby\1.8\rubygems\commands\update_command.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/site_ruby/1.8/rubygems/commands/which_command.rb
$(RUBYLIBDIR)/ruby/site_ruby/1.8/rubygems/commands/which_command.rb: $(srcdir)/lib/ruby/site_ruby/1.8/rubygems/commands/which_command.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\site_ruby\1.8\rubygems\commands\which_command.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/site_ruby/1.8/rubygems/digest
install-rb-default: $(RUBYLIBDIR)/ruby/site_ruby/1.8/rubygems/digest/digest_adapter.rb
$(RUBYLIBDIR)/ruby/site_ruby/1.8/rubygems/digest/digest_adapter.rb: $(srcdir)/lib/ruby/site_ruby/1.8/rubygems/digest/digest_adapter.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\site_ruby\1.8\rubygems\digest\digest_adapter.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/site_ruby/1.8/rubygems/digest/md5.rb
$(RUBYLIBDIR)/ruby/site_ruby/1.8/rubygems/digest/md5.rb: $(srcdir)/lib/ruby/site_ruby/1.8/rubygems/digest/md5.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\site_ruby\1.8\rubygems\digest\md5.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/site_ruby/1.8/rubygems/digest/sha1.rb
$(RUBYLIBDIR)/ruby/site_ruby/1.8/rubygems/digest/sha1.rb: $(srcdir)/lib/ruby/site_ruby/1.8/rubygems/digest/sha1.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\site_ruby\1.8\rubygems\digest\sha1.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/site_ruby/1.8/rubygems/digest/sha2.rb
$(RUBYLIBDIR)/ruby/site_ruby/1.8/rubygems/digest/sha2.rb: $(srcdir)/lib/ruby/site_ruby/1.8/rubygems/digest/sha2.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\site_ruby\1.8\rubygems\digest\sha2.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/site_ruby/1.8/rubygems/ext
install-rb-default: $(RUBYLIBDIR)/ruby/site_ruby/1.8/rubygems/ext/builder.rb
$(RUBYLIBDIR)/ruby/site_ruby/1.8/rubygems/ext/builder.rb: $(srcdir)/lib/ruby/site_ruby/1.8/rubygems/ext/builder.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\site_ruby\1.8\rubygems\ext\builder.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/site_ruby/1.8/rubygems/ext/configure_builder.rb
$(RUBYLIBDIR)/ruby/site_ruby/1.8/rubygems/ext/configure_builder.rb: $(srcdir)/lib/ruby/site_ruby/1.8/rubygems/ext/configure_builder.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\site_ruby\1.8\rubygems\ext\configure_builder.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/site_ruby/1.8/rubygems/ext/ext_conf_builder.rb
$(RUBYLIBDIR)/ruby/site_ruby/1.8/rubygems/ext/ext_conf_builder.rb: $(srcdir)/lib/ruby/site_ruby/1.8/rubygems/ext/ext_conf_builder.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\site_ruby\1.8\rubygems\ext\ext_conf_builder.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/site_ruby/1.8/rubygems/ext/rake_builder.rb
$(RUBYLIBDIR)/ruby/site_ruby/1.8/rubygems/ext/rake_builder.rb: $(srcdir)/lib/ruby/site_ruby/1.8/rubygems/ext/rake_builder.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\site_ruby\1.8\rubygems\ext\rake_builder.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/site_ruby/1.8/rubygems/indexer
install-rb-default: $(RUBYLIBDIR)/ruby/site_ruby/1.8/rubygems/indexer/abstract_index_builder.rb
$(RUBYLIBDIR)/ruby/site_ruby/1.8/rubygems/indexer/abstract_index_builder.rb: $(srcdir)/lib/ruby/site_ruby/1.8/rubygems/indexer/abstract_index_builder.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\site_ruby\1.8\rubygems\indexer\abstract_index_builder.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/site_ruby/1.8/rubygems/indexer/marshal_index_builder.rb
$(RUBYLIBDIR)/ruby/site_ruby/1.8/rubygems/indexer/marshal_index_builder.rb: $(srcdir)/lib/ruby/site_ruby/1.8/rubygems/indexer/marshal_index_builder.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\site_ruby\1.8\rubygems\indexer\marshal_index_builder.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/site_ruby/1.8/rubygems/indexer/master_index_builder.rb
$(RUBYLIBDIR)/ruby/site_ruby/1.8/rubygems/indexer/master_index_builder.rb: $(srcdir)/lib/ruby/site_ruby/1.8/rubygems/indexer/master_index_builder.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\site_ruby\1.8\rubygems\indexer\master_index_builder.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/site_ruby/1.8/rubygems/indexer/quick_index_builder.rb
$(RUBYLIBDIR)/ruby/site_ruby/1.8/rubygems/indexer/quick_index_builder.rb: $(srcdir)/lib/ruby/site_ruby/1.8/rubygems/indexer/quick_index_builder.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\site_ruby\1.8\rubygems\indexer\quick_index_builder.rb $(@D:/=\)
pre-install-rb-default: $(RUBYLIBDIR)/ruby/site_ruby/1.8
install-rb-default: $(RUBYLIBDIR)/ruby/site_ruby/1.8/rubygems.rb
$(RUBYLIBDIR)/ruby/site_ruby/1.8/rubygems.rb: $(srcdir)/lib/ruby/site_ruby/1.8/rubygems.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\site_ruby\1.8\rubygems.rb $(@D:/=\)
install-rb-default: $(RUBYLIBDIR)/ruby/site_ruby/1.8/ubygems.rb
$(RUBYLIBDIR)/ruby/site_ruby/1.8/ubygems.rb: $(srcdir)/lib/ruby/site_ruby/1.8/ubygems.rb
	$(INSTALL_DATA) $(srcdir:/=\)\lib\ruby\site_ruby\1.8\ubygems.rb $(@D:/=\)
$(RUBYARCHDIR):
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/1.8:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/1.8/bigdecimal:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/1.8/cgi/session:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/1.8/cgi:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/1.8/date:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/1.8/digest:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/1.8/dl:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/1.8/drb:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/1.8/i386-mswin32:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/1.8/io:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/1.8/irb/cmd:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/1.8/irb:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/1.8/irb/ext:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/1.8/irb/lc:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/1.8/irb/lc/ja:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/1.8/net:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/1.8/openssl:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/1.8/optparse:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/1.8/racc:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/1.8/rdoc:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/1.8/rdoc/dot:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/1.8/rdoc/generators:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/1.8/rdoc/generators/template/chm:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/1.8/rdoc/generators/template/html:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/1.8/rdoc/generators/template/xml:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/1.8/rdoc/markup/sample:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/1.8/rdoc/markup/simple_markup:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/1.8/rdoc/markup:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/1.8/rdoc/markup/test:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/1.8/rdoc/parsers:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/1.8/rdoc/ri:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/1.8/rexml:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/1.8/rexml/dtd:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/1.8/rexml/encodings:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/1.8/rexml/formatters:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/1.8/rexml/light:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/1.8/rexml/parsers:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/1.8/rexml/validation:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/1.8/rinda:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/1.8/rss:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/1.8/rss/maker:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/1.8/runit:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/1.8/runit/cui:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/1.8/shell:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/1.8/soap:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/1.8/soap/encodingstyle:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/1.8/soap/header:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/1.8/soap/mapping:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/1.8/soap/rpc:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/1.8/test/unit:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/1.8/test/unit/collector:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/1.8/test/unit/ui/console:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/1.8/test/unit/ui/fox:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/1.8/test/unit/ui/gtk:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/1.8/test/unit/ui/gtk2:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/1.8/test/unit/ui:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/1.8/test/unit/ui/tk:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/1.8/test/unit/util:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/1.8/test:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/1.8/tk:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/1.8/tkextlib/blt:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/1.8/tkextlib/blt/tile:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/1.8/tkextlib:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/1.8/tkextlib/bwidget:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/1.8/tkextlib/ICONS:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/1.8/tkextlib/itcl:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/1.8/tkextlib/itk:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/1.8/tkextlib/iwidgets:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/1.8/tkextlib/tcllib:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/1.8/tkextlib/tclx:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/1.8/tkextlib/tile:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/1.8/tkextlib/tkDND:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/1.8/tkextlib/tkHTML:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/1.8/tkextlib/tkimg:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/1.8/tkextlib/tktable:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/1.8/tkextlib/tktrans:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/1.8/tkextlib/treectrl:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/1.8/tkextlib/trofs:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/1.8/tkextlib/vu:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/1.8/tkextlib/winico:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/1.8/uri:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/1.8/webrick:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/1.8/webrick/httpauth:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/1.8/webrick/httpservlet:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/1.8/win32:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/1.8/win32ole:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/1.8/wsdl:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/1.8/wsdl/soap:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/1.8/wsdl/xmlSchema:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/1.8/xmlrpc:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/1.8/xsd:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/1.8/xsd/codegen:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/1.8/xsd/xmlparser:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/1.8/yaml:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionmailer-2.0.2:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionmailer-2.0.2/lib:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionmailer-2.0.2/lib/action_mailer:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionmailer-2.0.2/lib/action_mailer/vendor/text-format-0.6.3/text:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionmailer-2.0.2/lib/action_mailer/vendor/tmail-1.1.0/tmail:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionmailer-2.0.2/lib/action_mailer/vendor/tmail-1.1.0:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionmailer-2.0.2/test:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionmailer-2.0.2/test/fixtures/helpers:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_controller/assertions:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_controller:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_controller/cgi_ext:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_controller/session:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_controller/vendor/html-scanner/html:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_pack:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_view:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_view/helpers:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/lib/action_view/template_handlers:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/activerecord:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/controller:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/controller/controller_fixtures/app/controllers/admin:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/controller/controller_fixtures/app/controllers:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/controller/controller_fixtures/vendor/plugins/bad_plugin/lib:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/controller/deprecation:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/controller/html-scanner:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/controller/session:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/fixtures:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/fixtures/helpers:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/fixtures/helpers/fun:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/actionpack-2.0.2/test/template:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/lib:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/lib/active_record:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/lib/active_record/associations:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/lib/active_record/connection_adapters/abstract:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/lib/active_record/connection_adapters:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/lib/active_record/locking:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/lib/active_record/serializers:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/lib/active_record/vendor:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/associations:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/connections/native_db2:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/connections/native_firebird:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/connections/native_frontbase:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/connections/native_mysql:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/connections/native_openbase:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/connections/native_oracle:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/connections/native_postgresql:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/connections/native_sqlite:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/connections/native_sqlite3:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/connections/native_sybase:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures/db_definitions:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures/migrations:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures/migrations_with_decimal:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures/migrations_with_duplicate:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activerecord-2.0.2/test/fixtures/migrations_with_missing_versions:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activeresource-2.0.2/lib:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activeresource-2.0.2/lib/active_resource:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activeresource-2.0.2/lib/active_resource/formats:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activeresource-2.0.2/test:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activeresource-2.0.2/test/base:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activeresource-2.0.2/test/fixtures:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/array:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/bigdecimal:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/cgi:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/class:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/date:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/date_time:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/float:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/hash:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/integer:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/kernel:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/module:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/numeric:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/object:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/pathname:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/range:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/string:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/test/unit:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/core_ext/time:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/json:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/json/encoders:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/multibyte:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/multibyte/generators:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/multibyte/handlers:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/testing:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/values:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/vendor/builder-2.1.2:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/vendor/builder-2.1.2/builder:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/activesupport-2.0.2/lib/active_support/vendor/xml-simple-1.0.11:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/cgi_multipart_eof_fix-2.5.0/lib:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/cgi_multipart_eof_fix-2.5.0/test:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/feed-normalizer-1.4.0/lib:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/feed-normalizer-1.4.0/lib/parsers:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/feed-normalizer-1.4.0/test:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/gem_plugin-0.2.3/lib:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/gem_plugin-0.2.3/resources/lib/project:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/gem_plugin-0.2.3:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/gem_plugin-0.2.3/test:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/hoe-1.4.0/lib:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/hoe-1.4.0/test:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/hpricot-0.6-x86-mswin32/ext/hpricot_scan:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/hpricot-0.6-x86-mswin32/extras:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/hpricot-0.6-x86-mswin32/lib/hpricot:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/hpricot-0.6-x86-mswin32/lib:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/hpricot-0.6-x86-mswin32/test:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/htmlentities-4.0.0/lib/htmlentities:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/htmlentities-4.0.0/lib:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/htmlentities-4.0.0/test:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/image_science-1.1.3-x86-mswin32:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/image_science-1.1.3-x86-mswin32/lib:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/image_science-1.1.3-x86-mswin32/test:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/mongrel-1.1.3-x86-mswin32/examples:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/mongrel-1.1.3-x86-mswin32/examples/camping:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/mongrel-1.1.3-x86-mswin32/ext/http11:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/mongrel-1.1.3-x86-mswin32/lib/mongrel:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/mongrel-1.1.3-x86-mswin32/lib:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/mongrel-1.1.3-x86-mswin32:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/mongrel-1.1.3-x86-mswin32/test:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/mongrel-1.1.3-x86-mswin32/tools:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/mongrel_service-0.3.4-x86-mswin32/lib/mongrel_service:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/mongrel_service-0.3.4-x86-mswin32/tools:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/opml-1.0.0/lib:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/opml-1.0.0/spec:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/builtin/rails_info/rails:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/builtin/rails_info:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/configs/initializers:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/configs:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/dispatches:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/environments:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/helpers:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/commands:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/commands/performance:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/commands/process:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/commands/servers:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/rails/plugin:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/rails:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/generators/applications/app:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/generators/components/controller:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/generators/components/controller/templates:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/generators/components/integration_test:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/generators/components/integration_test/templates:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/generators/components/mailer:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/generators/components/mailer/templates:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/generators/components/migration:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/generators/components/migration/templates:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/generators/components/model:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/generators/components/model/templates:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/generators/components/observer:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/generators/components/observer/templates:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/generators/components/plugin:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/generators/components/plugin/templates:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/generators/components/resource:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/generators/components/resource/templates:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/generators/components/scaffold:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/generators/components/scaffold/templates:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/generators/components/session_migration:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/generators/components/session_migration/templates:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/rails_generator/scripts:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rails-2.0.2/lib/tasks:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rake-0.8.1/doc:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rake-0.8.1:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rake-0.8.1/lib/rake:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rake-0.8.1/lib/rake/contrib:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rake-0.8.1/lib/rake/loaders:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rake-0.8.1/lib:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rake-0.8.1/test:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rake-0.8.1/test/contrib:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rake-0.8.1/test/data/rakelib:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rake-0.8.1/test/data/rbext:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rfeedfinder-0.9.11/lib/rfeedfinder:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rfeedfinder-0.9.11/lib:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rfeedfinder-0.9.11:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rfeedfinder-0.9.11/test:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rubyforge-0.4.4/lib/http-access2:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rubyforge-0.4.4/lib:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/rubyforge-0.4.4/test:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/RubyInline-3.6.5/demo:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/RubyInline-3.6.5:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/RubyInline-3.6.5/lib:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/RubyInline-3.6.5/test:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/RubyInline-3.6.5/tutorial:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/simple-rss-1.1/lib:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/simple-rss-1.1/test/base:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/simple-rss-1.1/test:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/sqlite3-ruby-1.2.1-x86-mswin32/doc/faq:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/sqlite3-ruby-1.2.1-x86-mswin32/ext/sqlite3_api:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/sqlite3-ruby-1.2.1-x86-mswin32/lib/sqlite3:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/sqlite3-ruby-1.2.1-x86-mswin32/lib/sqlite3/driver/dl:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/sqlite3-ruby-1.2.1-x86-mswin32/lib/sqlite3/driver/native:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/sqlite3-ruby-1.2.1-x86-mswin32/lib:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/sqlite3-ruby-1.2.1-x86-mswin32/test:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/sqlite3-ruby-1.2.1-x86-mswin32/test/driver/dl:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/gems/1.8/gems/win32-service-0.5.2-x86-mswin32/test:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/site_ruby/1.8/rbconfig:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/site_ruby/1.8/rubygems:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/site_ruby/1.8/rubygems/commands:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/site_ruby/1.8/rubygems/digest:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/site_ruby/1.8/rubygems/ext:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/site_ruby/1.8/rubygems/indexer:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/ruby/site_ruby/1.8:
	$(MAKEDIRS) $@

site-install: site-install-so site-install-rb
site-install-so: install-so
site-install-rb: install-rb

.SUFFIXES: .c .m .cc .cxx .cpp .obj

{$(srcdir)}.cc{}.obj:
	$(CXX) $(INCFLAGS) $(CXXFLAGS) $(CPPFLAGS) -c -Tp$(<:\=/)

{$(topdir)}.cc{}.obj:
	$(CXX) $(INCFLAGS) $(CXXFLAGS) $(CPPFLAGS) -c -Tp$(<:\=/)

{$(hdrdir)}.cc{}.obj:
	$(CXX) $(INCFLAGS) $(CXXFLAGS) $(CPPFLAGS) -c -Tp$(<:\=/)

.cc.obj:
	$(CXX) $(INCFLAGS) $(CXXFLAGS) $(CPPFLAGS) -c -Tp$(<:\=/)

{$(srcdir)}.cxx{}.obj:
	$(CXX) $(INCFLAGS) $(CXXFLAGS) $(CPPFLAGS) -c -Tp$(<:\=/)

{$(topdir)}.cxx{}.obj:
	$(CXX) $(INCFLAGS) $(CXXFLAGS) $(CPPFLAGS) -c -Tp$(<:\=/)

{$(hdrdir)}.cxx{}.obj:
	$(CXX) $(INCFLAGS) $(CXXFLAGS) $(CPPFLAGS) -c -Tp$(<:\=/)

.cxx.obj:
	$(CXX) $(INCFLAGS) $(CXXFLAGS) $(CPPFLAGS) -c -Tp$(<:\=/)

{$(srcdir)}.cpp{}.obj:
	$(CXX) $(INCFLAGS) $(CXXFLAGS) $(CPPFLAGS) -c -Tp$(<:\=/)

{$(topdir)}.cpp{}.obj:
	$(CXX) $(INCFLAGS) $(CXXFLAGS) $(CPPFLAGS) -c -Tp$(<:\=/)

{$(hdrdir)}.cpp{}.obj:
	$(CXX) $(INCFLAGS) $(CXXFLAGS) $(CPPFLAGS) -c -Tp$(<:\=/)

.cpp.obj:
	$(CXX) $(INCFLAGS) $(CXXFLAGS) $(CPPFLAGS) -c -Tp$(<:\=/)

{$(srcdir)}.c{}.obj:
	$(CC) $(INCFLAGS) $(CFLAGS) $(CPPFLAGS) -c -Tc$(<:\=/)

{$(topdir)}.c{}.obj:
	$(CC) $(INCFLAGS) $(CFLAGS) $(CPPFLAGS) -c -Tc$(<:\=/)

{$(hdrdir)}.c{}.obj:
	$(CC) $(INCFLAGS) $(CFLAGS) $(CPPFLAGS) -c -Tc$(<:\=/)

.c.obj:
	$(CC) $(INCFLAGS) $(CFLAGS) $(CPPFLAGS) -c -Tc$(<:\=/)

$(DLLIB): $(DEFFILE) $(OBJS)
	@-$(RM) $@
	$(LDSHARED) -Fe$(@) $(OBJS) $(LIBS) $(LOCAL_LIBS) $(DLDFLAGS)



$(DEFFILE): 
	$(RUBY) -e "puts 'EXPORTS', 'Init_$(TARGET)'"  > $@

$(OBJS): {.;$(srcdir);$(topdir);$(hdrdir)}ruby.h {.;$(srcdir);$(topdir);$(hdrdir)}defines.h
