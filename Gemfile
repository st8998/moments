ruby '2.1.1'

source 'https://rubygems.org'

gem 'rails', '>= 4.1.0.beta1'

# database
gem 'pg'
gem 'eel', git: 'https://github.com/StrangeMood/eel.git'

# view
gem 'sass-rails'
gem 'uglifier'
gem 'bootstrap-sass'
gem 'slim'
gem 'rabl'
gem 'oj' # used with rabl
gem 'jquery-rails'
gem 'fotoramajs'

# infrastructure
gem 'bcrypt-ruby'
gem 'sucker_punch'
gem 'rails-observers'
gem 'elasticsearch'
gem 'dragonfly'

# controller
gem 'cancan'
gem 'decent_exposure',
    git: 'https://github.com/st8998/decent_exposure.git',
    branch: 'edge-rails-fix'

# monitoring
gem 'newrelic_rpm'

group :doc do
  # bundle exec rake doc:rails generates the API under doc/api.
  gem 'sdoc', require: false
end

group :test do
  gem 'mocha'
  gem 'factory_girl_rails'
end

group :development do
  gem 'spring'
  gem 'thin'
  gem 'quiet_assets'
end
