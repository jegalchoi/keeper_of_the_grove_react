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