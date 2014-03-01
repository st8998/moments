ENV["RAILS_ENV"] ||= "test"
require File.expand_path('../../config/environment', __FILE__)
require 'rails/test_help'

require 'mocha/mini_test'

class ActiveSupport::TestCase
  ActiveRecord::Migration.check_pending!

  include FactoryGirl::Syntax::Methods

  fixtures [:accounts, :users]

  def data_root
    Rails.root.join('test/data')
  end
end

class ActionController::TestCase
  def sign_in_as(user_or_anchor)
    user = user_or_anchor.is_a?(User) ? user_or_anchor : users(user_or_anchor)

    @controller.stubs(:current_user).returns(user)
  end
end