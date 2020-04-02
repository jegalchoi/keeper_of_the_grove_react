module AuthFeaturesHelper
  def create_user(username, email, password)
    visit 'http://localhost:3000/signup'
    page.fill_in 'username', with: username
    page.fill_in 'email', with: email
    page.fill_in 'password', with: password
    page.fill_in 'password_confirmation', with: password
    click_button  "Create Account"
  end

  def login_user(username, password)
    visit 'http://localhost:3000/login'
    page.fill_in 'username', with: username
    page.fill_in 'password', with: password
    click_button "Log In"
  end
end