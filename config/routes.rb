Rails.application.routes.draw do

  namespace :api do
    namespace :v1 do
      resources :plants, only: [:index, :show, :create, :update, :destroy]
    end
  end

  post :login, to: 'sessions#create'
  delete :logout, to: 'sessions#destroy'
  get :logged_in, to: 'sessions#is_logged_in?'
  
  resources :users, only: [:create, :show, :index, :update, :destroy]
  
end
