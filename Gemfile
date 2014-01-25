ruby '2.1.0'

source 'https://rubygems.org'

gem 'rails', '~> 4.1.0.beta1'

# database
gem 'pg'

# view
gem 'sass-rails', '~> 4.0.0'
gem 'uglifier', '>= 1.3.0'
gem 'slim'
gem 'rabl'
gem 'oj' # used with rabl
gem 'react-rails'
gem 'jquery-rails'
gem 'fotoramajs'

# infrastructure
gem 'bcrypt-ruby', '~> 3.0.0'
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
  gem 'minitest-spec-rails'
end

group :development do
  gem 'spring'
  gem 'thin'
  gem 'quiet_assets'
end
