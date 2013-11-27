class MomentsController < ApplicationController
  layout :layout

  respond_to :html, :json

  expose :moments
  expose :moment

  private

  def layout
    if request.headers['X-PJAX']
      false
    else
      'map'
    end
  end
end
