class TemplatesController < ApplicationController
  skip_before_action :ensure_account

  respond_to :js, :html

  prepend_view_path Rails.root.join('app/assets/javascripts')

  layout false

  def angular_templates
    if stale?(last_modified: Rails.root.mtime)
      expires_in 365.day, public: true

      render 'template/angular_templates'
    end
  end

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
