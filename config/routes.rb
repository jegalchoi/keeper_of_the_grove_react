Rails.application.routes.draw do

  defaults format: :json do
    resources :users do
      get '/plants', to: 'plants#authorized_index'
      get '/plants/:id', to: 'plants#authorized_show'
      delete '/plants/:id', to: 'plants#destroy'
    end

    resources :plants, only: [:create, :show, :index, :update, :destroy]

    post :login, to: 'sessions#create'
    delete :logout, to: 'sessions#destroy'
    get :logged_in, to: 'sessions#is_logged_in?'
    
    resources :users, only: [:create, :show, :index, :update, :destroy]
  
  end
  
end
