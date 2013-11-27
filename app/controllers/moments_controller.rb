class MomentsController < ApplicationController
  layout 'map'

  respond_to :html, :json

  expose :moments
  expose :moment

  def index
  end
end
