class TemplatesController < ApplicationController
  skip_before_filter :ensure_account

  prepend_view_path Rails.root.join('app/assets/javascripts')

  layout false

  def template
    if request.format == :html
      template_path = params.require(:path)

      if stale?(last_modified: File.new("app/assets/javascripts/#{template_path}.html.slim").mtime)
        render template_path
      end
    else
      render status: :forbidden, text: 'Only html templates are permitted'
    end
  end
end
