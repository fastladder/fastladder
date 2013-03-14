Fastladder::Application.routes.draw do
  match 'api/config/load' => 'api/config#getter'
  match 'api/config/save' => 'api/config#setter'

  match 'api/:action' => 'api'
  match 'subscribe/:url' => 'subscribe#confirm'
  match 'import/:url' => 'import#fetch'
  match 'about/:url' => 'about#index'
  match 'user/:login_name/:action' => 'user'
  match 'user/:login_name' => 'user#index'
  match 'icon/:feed' => 'icon#get'
  match 'favicon/:feed' => 'icon#get'

  resource :members
  match 'signup' => 'members#new', as: :sign_up

  resource :session
  match 'login' => 'sessions#new', as: :login
  match 'logout' => 'sessions#destroy'

  root to: 'reader#welcome'

  match 'reader' => 'reader#index'
  match 'contents/guide' => 'contents#guide'
  match 'contents/config' => 'contents#configure'
  match 'api/pin/all' => 'api/pin#all'
  match 'api/feed/discover' => 'api/feed#discover'
  match 'api/feed/subscribe' => 'api/feed#subscribe'

  match 'import' => 'import#index'

  match ':controller(/:action(/:id))(.:format)'

end
