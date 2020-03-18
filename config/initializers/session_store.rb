if Rails.env === 'production'
  Rails.application.config.session_store :cookie_store, key: '_rails-react-test3'
else
  Rails.application.config.session_store :cookie_store, key: '_rails-react-test3'
end