class ContentsController < ApplicationController
  before_filter :login_required
  layout false
end
