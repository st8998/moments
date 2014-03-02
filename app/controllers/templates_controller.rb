class TemplatesController < ApplicationController

  prepend_view_path Rails.root.join('app/assets/javascripts')

  layout false

  def template
    template = lookup_context.find_template(params[:path])

    if stale?(last_modified: template.updated_at.utc)
      render params.require(:path)
    end
 end
end
