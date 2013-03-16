Fastladder::Application.routes.draw do
  match 'api/config/load' => 'api/config#getter'
  match 'api/config/save' => 'api/config#setter'

  match 'api/:action' => 'api'
  match 'subscribe/:url' => 'subscribe#confirm'
  match 'import/finish' => 'import#finish'
  match 'import/:url' => 'import#fetch'
  match 'about/*url' => 'about#index'
  match 'user/:login_name/:action' => 'user'
  match 'user/:login_name' => 'user#index'
  match 'icon/:feed' => 'icon#get'
  match 'favicon/:feed' => 'icon#get'

  resource :members, only: :create
  match 'signup' => 'members#new', as: :sign_up

  resource :session, only: :create
  match 'login'  => 'sessions#new',     as: :login
  match 'logout' => 'sessions#destroy', as: :logout

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

  match ':controller(/:action(/:id))(.:format)'

end
