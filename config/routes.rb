Fastladder::Application.routes.draw do
  match 'api/config/load' => 'api/config#getter'
  match 'api/config/save' => 'api/config#setter'

  match 'api/:action' => 'api'
  match 'subscribe/*url' => 'subscribe#confirm', as: :subscribe, format: false
  match 'about/*url' => 'about#index', as: :about, format: false
  match 'user/:login_name/:action' => 'user'
  match 'user/:login_name' => 'user#index'
  match 'icon/:feed' => 'icon#get'
  match 'favicon/:feed' => 'icon#get'

  post 'import/finish' => 'import#finish'
  post 'import/fetch' => 'import#fetch'
  match 'import/' => 'import#index'

  resource :members, only: :create
  get 'signup' => 'members#new', as: :sign_up

  resource :session, only: :create
  get 'login'  => 'sessions#new',     as: :login
  get 'logout' => 'sessions#destroy', as: :logout

  root to: 'reader#welcome'

  match 'reader' => 'reader#index'
  match 'contents/guide' => 'contents#guide'
  match 'contents/config' => 'contents#configure'
  match 'api/pin/:action' => 'api/pin'
  match 'api/feed/:action' => 'api/feed'
  match 'api/folder/:action' => 'api/folder'

  match 'import' => 'import#index'

  match 'account' => 'account#index'
  match 'password' => 'account#password'

  match 'rpc/:action' => 'rpc'

  get 'utility/bookmarklet' => "utility/bookmarklet#index"

  match ':controller(/:action(/:id))(.:format)'

end
