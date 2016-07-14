Rails.application.routes.draw do
  
  root 'application#home'

  get "/defaultsite" => redirect("/home")
  
  get 'home', to: 'application#home'

  
end
