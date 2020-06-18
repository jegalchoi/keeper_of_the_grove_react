if Rails.env === 'production'
  Rails.application.config.session_store :cookie_store, key: '_grove_guardian', domain: 'groveguardian.club'
else
  Rails.application.config.session_store :cookie_store, key: '_grove_guardian'
end