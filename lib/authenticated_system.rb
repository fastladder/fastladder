module AuthenticatedSystem
  protected
    # Returns true or false if the user is logged in.
    # Preloads @current_member with the user model if they're logged in.
    def logged_in?
      current_member != :false
    end
    
    # Accesses the current member from the session.  Set it to :false if login fails
    # so that future calls do not hit the database.
    def current_member
      @current_user ||= (login_from_session || login_from_basic_auth || login_from_cookie || :false)
    end
    
    # Store the given member in the session.
    def current_member=(new_member)
      session[:member] = (new_member.nil? || new_member.is_a?(Symbol)) ? nil : new_member.id
      @current_member = new_member
    end
    
    # Check if the member is authorized
    #
    # Override this method in your controllers if you want to restrict access
    # to only a few actions or if you want to check if the member
    # has the correct rights.
    #
    # Example:
    #
    #  # only allow nonbobs
    #  def authorized?
    #    current_member.username != "bob"
    #  end
    def authorized?
      logged_in?
    end

    # Filter method to enforce a login requirement.
    #
    # To require logins for all actions, use this in your controllers:
    #
    #   before_filter :login_required
    #
    # To require logins for specific actions, use this in your controllers:
    #
    #   before_filter :login_required, :only => [ :edit, :update ]
    #
    # To skip this in a subclassed controller:
    #
    #   skip_before_filter :login_required
    #
    def login_required
      authorized? || access_denied
    end

    # Redirect as appropriate when an access request fails.
    #
    # The default action is to redirect to the login screen.
    #
    # Override this method in your controllers if you want to have special
    # behavior in case the member is not authorized
    # to access the requested action.  For example, a popup window might
    # simply close itself.
    def access_denied
      respond_to do |accepts|
        accepts.html do
          store_location
          redirect_to :controller => '/session', :action => 'new'
        end
        accepts.xml do
          headers["Status"]           = "Unauthorized"
          headers["WWW-Authenticate"] = %(Basic realm="Web Password")
          render :text => "Could't authenticate you", :status => '401 Unauthorized'
        end
      end
      false
    end  
    
    # Store the URI of the current request in the session.
    #
    # We can return to this location by calling #redirect_back_or_default.
    def store_location
      session[:return_to] = request.request_uri
    end
    
    # Redirect to the URI stored by the most recent store_location call or
    # to the passed default.
    def redirect_back_or_default(default)
      redirect_to(session[:return_to] || default)
      session[:return_to] = nil
    end
    
    # Inclusion hook to make #current_member and #logged_in?
    # available as ActionView helper methods.
    def self.included(base)
      base.send :helper_method, :current_member, :logged_in?
    end

    # Called from #current_user.  First attempt to login by the user id stored in the session.
    def login_from_session
      self.current_member = Member.find_by_id(session[:member]) if session[:member]
    end

    # Called from #current_user.  Now, attempt to login by basic authentication information.
    def login_from_basic_auth
      username, passwd = get_auth_data
      self.current_member = Member.authenticate(username, passwd) if username && passwd
    end

    # Called from #current_user.  Finaly, attempt to login by an expiring token in the cookie.
    def login_from_cookie      
      member = cookies[:auth_token] && Member.find_by_remember_token(cookies[:auth_token])
      if member && member.remember_token?
        member.remember_me
        cookies[:auth_token] = { :value => member.remember_token, :expires => member.remember_token_expires_at }
        self.current_member = member
      end
    end

  private
    @@http_auth_headers = %w(X-HTTP_AUTHORIZATION HTTP_AUTHORIZATION Authorization)
    # gets BASIC auth info
    def get_auth_data
      auth_key  = @@http_auth_headers.detect { |h| request.env.has_key?(h) }
      auth_data = request.env[auth_key].to_s.split unless auth_key.blank?
      return auth_data && auth_data[0] == 'Basic' ? Base64.decode64(auth_data[1]).split(':')[0..1] : [nil, nil] 
    end
end
