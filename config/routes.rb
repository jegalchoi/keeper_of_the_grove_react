Rails.application.routes.draw do

    resources :users, only: [:create, :show, :index, :update, :destroy]

    root to: redirect('/')
  
end
