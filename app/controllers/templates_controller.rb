class TemplatesController < ApplicationController
  skip_before_filter :ensure_account

  prepend_view_path Rails.root.join('app/assets/javascripts')

  layout false

  def template
    if request.format == :html
      render params.require(:path)
    else
      render status: :forbidden, text: 'Only html templates are permitted'
    end
  end
end
