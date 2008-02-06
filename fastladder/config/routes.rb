ActionController::Routing::Routes.draw do |map|
  # The priority is based upon order of creation: first created -> highest priority.

  # Sample of regular route:
  #   map.connect 'products/:id', :controller => 'catalog', :action => 'view'
  # Keep in mind you can assign values other than :controller and :action
  map.connect "api/config/load", :controller => "api/config", :action => "get"
  map.connect "api/config/save", :controller => "api/config", :action => "put"

  map.connect "/api/:action", :controller => "api"
  map.connect "/:controller/:action", :requirements =>{:controller => /api\/\w+/}
  map.connect "/subscribe/:url", 
      :controller => "subscribe", :action => "confirm", :requirements =>{:url => /https?.+/}
  map.connect "/import/:url", 
      :controller => "import", :action => "fetch", :requirements =>{:url => /https?.+/}
  map.connect "/about/:url", 
      :controller => "about", :action => "index", :requirements =>{:url => /https?.+/}
  map.connect "/user/:login_name/:action", 
      :controller => "user"
  map.connect "/user/:login_name", 
      :controller => "user", :action => "index"
  map.connect "/icon/*feed", :controller => "icon", :action => "get"
  map.connect "/favicon/*feed", :controller => "icon", :action => "get"

  # Sample of named route:
  #   map.purchase 'products/:id/purchase', :controller => 'catalog', :action => 'purchase'
  # This route can be invoked with purchase_url(:id => product.id)

  # Sample resource route (maps HTTP verbs to controller actions automatically):
  #   map.resources :products
  map.resources :members
  map.signup "signup", :controller => "members", :action => "new"

  map.resource :session
  map.login "login", :controller => "sessions", :action => "new"
  map.logout "logout", :controller => "sessions", :action => "destroy"

  # Sample resource route with options:
  #   map.resources :products, :member => { :short => :get, :toggle => :post }, :collection => { :sold => :get }

  # Sample resource route with sub-resources:
  #   map.resources :products, :has_many => [ :comments, :sales ], :has_one => :seller

  # Sample resource route within a namespace:
  #   map.namespace :admin do |admin|
  #     # Directs /admin/products/* to Admin::ProductsController (app/controllers/admin/products_controller.rb)
  #     admin.resources :products
  #   end

  # You can have the root of your site routed with map.root -- just remember to delete public/index.html.
  map.root :controller => "reader", :action => "welcome"

  # See how all your routes lay out with "rake routes"

  # Install the default routes as the lowest priority.
  map.connect ':controller/:action/:id'
  map.connect ':controller/:action/:id.:format'
end
