Rails.application.routes.draw do
  # --------------------------------------------------------------------------------
  # api/*
  # --------------------------------------------------------------------------------
  namespace :api do
    namespace :pin do
      post :all
      post :add
      post :remove
      post :clear
    end

    namespace :feed do
      match :discover, via: [:get, :post]
      post :subscribe
      post :unsubscribe
      match :subscribed, via: [:get, :post]
      post :update
      post :move
      post :set_rate
      post :set_notify
      post :set_public
      post :add_tags
      post :remove_tags
      post :fetch_favicon
    end

    namespace :folder do
      post :create
      post :delete
      post :update
    end

    namespace :config do
      match :load, action: :getter, via: [:post, :get]
      post  :save, action: :setter
    end

    %w(all unread touch_all touch item_count unread_count crawl).each do |name|
      match name, via: [:get, :post]
    end

    %w[subs lite_subs error_subs folders].each do |name|
      post name
    end
  end

  # other API call routes to blank page
  match 'api/*_' => 'application#nothing', via: [:post, :get]

  # --------------------------------------------------------------------------------
  # other pages
  # --------------------------------------------------------------------------------
  get 'subscribe', to: 'subscribe#index', as: :subscribe_index
  get 'subscribe/*url', to: 'subscribe#confirm', as: :subscribe, format: false
  post 'subscribe/*url', to: 'subscribe#subscribe', format: false
  get 'about/*url' => 'about#index', as: :about, format: false
  get 'user/:login_name' => 'user#index', as: 'user'
  get 'icon/*feed' => 'icon#get'
  get 'favicon/*feed' => 'icon#get'

  resource :members, only: :create
  get 'signup' => 'members#new', as: :sign_up

  resource :session, only: :create
  get 'login'  => 'sessions#new',     as: :login
  get 'logout' => 'sessions#destroy', as: :logout

  root to: 'reader#welcome'

  get 'reader' => 'reader#index'
  get 'contents/guide' => 'contents#guide'
  get 'contents/config' => 'contents#configure'
  get 'share', to: 'share#index', as: 'share'

  get 'import', to: 'import#index'
  post 'import', to: 'import#fetch'
  get 'import/*url', to: 'import#fetch', format: false
  post 'import/finish', to: 'import#finish'
  get 'export/opml', to: 'export#opml', as: 'export'

  get 'account', to: 'account#index', as: 'account_index'
  get 'account/:action', controller: 'account', as: 'account'

  match 'rpc/:action' => 'rpc', via: [:post, :get]

  get 'utility/bookmarklet' => "utility/bookmarklet#index"

  match ':controller(/:action(/:id))(.:format)', via: [:post, :get]
end
