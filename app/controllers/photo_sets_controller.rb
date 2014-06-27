class PhotoSetsController < ApplicationController
  def photos
    case params[:key]
    when 'all' then
      render json: Photo.accessible_by(current_ability).where.not(moment_id: nil).order(:date.desc)
    when 'top_100' then
      render json: Photo.accessible_by(current_ability).where.not(moment_id: nil).order(:views_count.desc, :date.desc).limit(100)
    when /moment\/(\d+)/ then
      render json: Moment.find($1).photo_set
    end
  end
end
