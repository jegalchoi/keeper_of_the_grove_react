Rails.application.routes.draw do
  get '*path', to: "application#fallback_index_html", constraints: -> (request) do
    !request.xhr? && request.format.html?
  end
  defaults format: :json do
    namespace :api do
      namespace :v1 do
        resources :users do
          get '/plants', to: 'plants#authorized_index'
          get '/plants/:id', to: 'plants#authorized_show'
          delete '/plants/:id', to: 'plants#destroy'
          patch '/plants/:id', to: 'plants#update'
        end

        resources :plants, only: [:index, :create, :show]

        resources :images, only: [:create, :show, :destroy]
      end
    end

    post :login, to: 'sessions#create'
    delete :logout, to: 'sessions#destroy'
    get :logged_in, to: 'sessions#is_logged_in?'
    
    resources :users, only: [:show, :create, :update, :destroy]

  end
  
  root to: redirect('/')
  
end
