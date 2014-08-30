ruby '2.1.2'

source 'https://rubygems.org'

gem 'rails', '>= 4.2.0.beta1'

# database
gem 'pg'
gem 'eel'

# view
gem 'sass-rails', '>= 5.0.0.beta1'
gem 'coffee-rails'
gem 'uglifier'
gem 'ngmin-rails'
gem 'slim'
gem 'fotoramajs'

gem 'active_model_serializers', '~> 0.8.0'
gem 'oj'

gem 'neat'

# infrastructure
gem 'bcrypt-ruby'
gem 'celluloid'
gem 'rails-observers'
gem 'dragonfly'
gem 'dragonfly-s3_data_store'
gem 'redis-rails'

# jpeg metadata extractors
gem 'exifr'
gem 'xmp', git: 'https://github.com/st8998/xmp.git'

# controller
gem 'responders'
gem 'cancan'
gem 'decent_exposure'

# monitoring
gem 'newrelic_rpm'

gem 'puma'

group :doc do
  # bundle exec rake doc:rails generates the API under doc/api.
  gem 'sdoc', require: false
end

group :test do
  gem 'mocha'
  gem 'factory_girl_rails'
  gem 'trafaret'
end

group :development do
  gem 'spring'
  gem 'quiet_assets'

  gem 'capistrano', require: false
  gem 'capistrano-rails', require: false
  gem 'capistrano-bower', require: false
  gem 'capistrano-bundler', require: false
end
