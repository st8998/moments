class PhotosController < ApplicationController
  expose :photos
  expose :photo

  PERMITTED_ATTRIBUTES = [:image, :description]

  def index
    render json: photos.where.not(moment_id: nil).order(:date.desc)
  end

  def increase_views_count
    photo.increment_with_sql!(:views_count)
    render nothing: true
  end

  def create
    authorize!(:create, Photo)
    photo.save
    render json: photo
  end

  def update
    authorize!(:update, photo)
    photo.save
    render json: photo
  end

  def destroy
    authorize!(:delete, photo)
    photo.destroy
    render nothing: true
  end
end
