require 'rails_helper'

describe 'user signup', :type => :request do
  describe 'create a user', :type => :request do
    before do
      post '/users', :params => { :user => { username: 'jay_test', email: 'jay_test@email.com', password: '1234', password_confirmation: '1234'}}
    end

    it 'returns a created status' do
      expect(response.content_type).to eq('application/json; charset=utf-8')
      expect(JSON.parse(response.body)['status']).to eq('created')
    end
  end

  describe 'fail to create a user', :type => :request do
    before do
      post '/users', :params => { :user => { username: '', email: 'jay_test@email.com', password: '1234', password_confirmation: '1234'}}
    end

    it 'returns a 500 error' do
      expect(response.content_type).to eq('application/json; charset=utf-8')
      expect(JSON.parse(response.body)['status']).to eq(500)
    end
  end
end

describe 'edit user account', :type => :request do
  describe 'edit a user', :type => :request do
    before do
      post '/users', :params => { :user => { username: 'jay_test', email: 'jay_test@email.com', password: '1234', password_confirmation: '1234'}}
      post '/login', :params => { :user => { username: 'jay_test', password: '1234'} }
      patch "/users/#{User.find_by(username: 'jay_test').id}", :params => { :user => { username: 'jay_test', email: 'jay_test@email.com', password: '12345', password_confirmation: '12345'}}
    end

    it 'returns an updated status' do
      expect(response.content_type).to eq('application/json; charset=utf-8')
      expect(JSON.parse(response.body)['status']).to eq('updated')
    end
  end

  describe 'fail to edit a user', :type => :request do
    before do
      post '/users', :params => { :user => { username: 'jay_test', email: 'jay_test@email.com', password: '1234', password_confirmation: '1234'}}
      post '/users', :params => { :user => { username: 'jay_test2', email: 'jay_test2@email.com', password: '1234', password_confirmation: '1234'}}
      post '/login', :params => { :user => { username: 'jay_test', password: '1234'} }
      patch "/users/#{User.find_by(username: 'jay_test').id}", :params => { :user => { username: 'jay_test2', email: 'jay_test@email.com', password: '1234', password_confirmation: '1234'}}
    end

    it 'returns a 401 error' do
      expect(response.content_type).to eq('application/json; charset=utf-8')
      expect(JSON.parse(response.body)['status']).to eq(401)
    end
  end

  describe 'fail to find user', :type => :request do
    before do
      post '/users', :params => { :user => { username: 'jay_test', email: 'jay_test@email.com', password: '1234', password_confirmation: '1234'}}
      post '/users', :params => { :user => { username: 'jay_test2', email: 'jay_test2@email.com', password: '1234', password_confirmation: '1234'}}
      post '/login', :params => { :user => { username: 'jay_test', password: '1234'} }
      patch "/users/10", :params => { :user => { username: 'jay_test2', email: 'jay_test@email.com', password: '1234', password_confirmation: '1234'}}
    end

    it 'returns a 400 error' do
      expect(response.content_type).to eq('application/json; charset=utf-8')
      expect(JSON.parse(response.body)['status']).to eq(400)
    end
  end
end

describe 'delete user account', :type => :request do
  describe 'delete a user', :type => :request do
    before do
      post '/users', :params => { :user => { username: 'jay_test', email: 'jay_test@email.com', password: '1234', password_confirmation: '1234'}}
      post '/login', :params => { :user => { username: 'jay_test', password: '1234'} }
      delete "/users/#{User.find_by(username: 'jay_test').id}"
    end

    it 'returns an destroyed status' do
      expect(response.content_type).to eq('application/json; charset=utf-8')
      expect(JSON.parse(response.body)['status']).to eq('destroyed')
    end
  end

  describe 'fail to find user', :type => :request do
    before do
      post '/users', :params => { :user => { username: 'jay_test', email: 'jay_test@email.com', password: '1234', password_confirmation: '1234'}}
      post '/login', :params => { :user => { username: 'jay_test', password: '1234'} }
      delete "/users/10"
    end

    it 'returns a 400 error' do
      expect(response.content_type).to eq('application/json; charset=utf-8')
      expect(JSON.parse(response.body)['status']).to eq(400)
    end
  end
end

describe 'user login', :type => :request do
  describe 'login a user', :type => :request do
    before do
      post '/users', :params => { :user => { username: 'jay_test', email: 'jay_test@email.com', password: '1234', password_confirmation: '1234'}}
      post '/login', :params => { :user => { username: 'jay_test', password: '1234'} }
    end

    it 'returns a logged_in status of true' do
      expect(response.content_type).to eq('application/json; charset=utf-8')
      expect(JSON.parse(response.body)['logged_in']).to eq(true)
    end
  end

  describe 'fail to login a user', :type => :request do
    before do
      post '/users', :params => { :user => { username: 'jay_test', email: 'jay_test@email.com', password: '1234', password_confirmation: '1234'}}
      post '/login', :params => { :user => { username: 'jay_test', password: '12345'} }
    end

    it 'returns a 401 error' do
      expect(response.content_type).to eq('application/json; charset=utf-8')
      expect(JSON.parse(response.body)['status']).to eq(401)
    end
  end  
end

describe 'user logout', :type => :request do
  describe 'logout a user', :type => :request do
    before do
      post '/users', :params => { :user => { username: 'jay_test', email: 'jay_test@email.com', password: '1234', password_confirmation: '1234'}}
      post '/login', :params => { :user => { username: 'jay_test', password: '1234'} }
      delete '/logout'

    end

    it 'returns a logged_in status of false' do
      expect(response.content_type).to eq('application/json; charset=utf-8')
      expect(JSON.parse(response.body)['logged_in']).to eq(false)
    end
  end
end

describe 'user logged in?', :type => :request do
  describe 'user is logged in', :type => :request do
    before do
      post '/users', :params => { :user => { username: 'jay_test', email: 'jay_test@email.com', password: '1234', password_confirmation: '1234'}}
      post '/login', :params => { :user => { username: 'jay_test', password: '1234'} }
      get '/logged_in'
    end

    it 'returns a logged_in status of true' do
      expect(response.content_type).to eq('application/json; charset=utf-8')
      expect(JSON.parse(response.body)['logged_in']).to eq(true)
    end
  end

  describe 'user is logged out', :type => :request do
    before do
      post '/users', :params => { :user => { username: 'jay_test', email: 'jay_test@email.com', password: '1234', password_confirmation: '1234'}}
      post '/login', :params => { :user => { username: 'jay_test', password: '1234'} }
      delete '/logout'
      get '/logged_in'
    end

    it 'returns a logged_in status of false' do
      expect(response.content_type).to eq('application/json; charset=utf-8')
      expect(JSON.parse(response.body)['logged_in']).to eq(false)
    end
  end
end