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
  namespace :subscribe do
    get '', action: :index, as: :index
    get '*url', action: :confirm, format: false
    post '*url', action: :subscribe, format: false, as: nil
  end

  namespace :about do
    get '*url', action: :index, format: false
  end

  namespace :user do
    get ':login_name', action: :index
  end

  namespace :favicon do
    get '*feed', action: :get
  end

  resource :members, only: :create
  get 'signup', to: 'members#new', as: :sign_up

  resource :session, only: :create
  get 'login', to: 'sessions#new',     as: :login
  get 'logout', to: 'sessions#destroy', as: :logout

  root to: 'reader#welcome'

  get 'reader', to: 'reader#index'

  namespace :contents do
    get :guide
    get :config, action: :configure
    get :manage
  end

  get 'share', to: 'share#index', as: 'share'

  namespace :import do
    get '', action: :index
    post '', action: :fetch
    get '*url', action: :fetch, format: false
    post :finish
  end

  namespace :export do
    get :opml, as: ''
  end

  namespace :account do
    get '', action: :index, as: :index
    %w[apikey backup password share].each do |name|
      get name
    end
    post 'apikey'
  end

  namespace :rpc do
    %w[update_feed check_digest update_feeds export].each do |name|
      match name, via: [:post, :get]
    end
  end

  namespace :utility do
    namespace :bookmarklet do
      get '', action: :index
    end
  end
end
