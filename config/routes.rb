Rails.application.routes.draw do

  namespace :api do
    namespace :v1 do
      # resources :plants, only: [:index, :show, :create, :update, :destroy]
      get 'plants/index'
      post 'plants/create'
      get '/show/:id', to: 'plants#show'
      delete '/destroy/:id', to: 'plants#destroy'
      post '/update/:id', to: 'plants#update'
    end
  end

  post :login, to: 'sessions#create'
  delete :logout, to: 'sessions#destroy'
  get :logged_in, to: 'sessions#is_logged_in?'
  
  resources :users, only: [:create, :show, :index, :update, :destroy]
  
end
