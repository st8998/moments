class TemplatesController < ApplicationController

  prepend_view_path Rails.root.join('app/assets/javascripts')

  layout false

  def template
    render params.require(:path)
  end
end
