set :stage, :production
  server '192.241.146.154', user: 'deploy', roles: %w{web app}

