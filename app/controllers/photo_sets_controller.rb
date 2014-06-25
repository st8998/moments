class PhotoSetsController < ApplicationController
  def photos
    if params[:key] == 'all'
      render json: Photo.accessible_by(current_ability).where.not(moment_id: nil).order(:date.desc)
    end
  end
end
