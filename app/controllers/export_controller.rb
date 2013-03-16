require 'cgi'
require 'time'

class ExportController < ApplicationController
  before_filter :login
  def opml
    @opml = []
    @sites = []
    render :xml => @member.export('opml')
  end
end
