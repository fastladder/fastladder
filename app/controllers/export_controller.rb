class ExportController < ApplicationController
  before_filter :login_required

  def opml
    @opml = []
    @sites = []
    render :xml => @member.export('opml')
  end
end
