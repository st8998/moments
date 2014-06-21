# Tell slim to ignore angularjs expressions in templates like this:
# p {{some.value}}
# https://github.com/slim-template/slim/pull/434
Slim::Engine.set_default_options :attr_delims => {'(' => ')', '[' => ']'}

# Rails.application.assets.register_engine('.slim', Slim::Template)