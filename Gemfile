ruby '2.1.2'

source 'https://rubygems.org'

gem 'rails', '>= 4.1.4'

# database
gem 'pg'
gem 'eel'

# view
gem 'sass-rails'
gem 'coffee-rails'
gem 'uglifier'
gem 'ngmin-rails'
gem 'slim'
gem 'jquery-rails'
gem 'fotoramajs'

gem 'active_model_serializers'
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
gem 'xmp'

# controller
gem 'cancan'
gem 'decent_exposure'

# monitoring
gem 'newrelic_rpm'

# elastic
# gem 'elasticsearch-model'

gem 'puma'

group :doc do
  # bundle exec rake doc:rails generates the API under doc/api.
  gem 'sdoc', require: false
end

group :test do
  gem 'mocha'
  gem 'factory_girl_rails'
  gem 'hash_validator'
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
