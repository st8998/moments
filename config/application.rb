require File.expand_path('../boot', __FILE__)

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(:default, Rails.env)

module Moments
  class Application < Rails::Application
    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.

    # Set Time.zone default to the specified zone and make Active Record auto-convert to this zone.
    # Run "rake -D time" for a list of tasks for finding time zone names. Default is UTC.
    config.time_zone = 'UTC'

    # The default locale is :en and all translations from config/locales/*.rb,yml are auto loaded.
    # config.i18n.load_path += Dir[Rails.root.join('my', 'locales', '*.{rb,yml}').to_s]
    # config.i18n.default_locale = :de

    config.quiet_assets = true

    config.active_record.observers = []
    config.active_record.schema_format = :sql

    config.autoload_paths += ['lib']

    # Disable for all serializers (except ArraySerializer)
    ActiveModel::Serializer.root = false
    # Disable for ArraySerializer
    ActiveModel::ArraySerializer.root = false

    # Elastic search config
    config.elastic_server = 'localhost:9200'
    config.elastic_synchronous_indexing = false
  end
end
