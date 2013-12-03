class MomentsController < ApplicationController
  layout 'map'

  respond_to :html

  expose :moments
  expose :moment

end
