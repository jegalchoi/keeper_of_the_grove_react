Rails.application.routes.draw do
  defaults format: :json do
    namespace :api do
      namespace :v1 do
        resources :users, only: [:show, :create, :update, :destroy]

        resources :users do
          get '/plants', to: 'plants#authorized_index'
          get '/plants/:id', to: 'plants#authorized_show'
          delete '/plants/:id', to: 'plants#destroy'
          patch '/plants/:id', to: 'plants#update'
        end

        resources :plants, only: [:index, :create, :show]

        resources :images, only: [:create, :show, :destroy]

        post :login, to: 'sessions#create'
        delete :logout, to: 'sessions#destroy'
        get :logged_in, to: 'sessions#is_logged_in?'
      end
    end
  end
  
  root to: redirect('/')
  
end
