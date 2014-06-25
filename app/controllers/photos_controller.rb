class PhotosController < ApplicationController
  expose :photos
  expose :photo

  PERMITTED_ATTRIBUTES = [:image, :description]

  def index
    render json: photos.where.not(moment_id: nil).order(:date.desc)
  end

  def create
    authorize!(:create, Photo)
    photo.save
    render json: photo
  end

  def update
    authorize!(:update, Photo)
    photo.save
    render json: photo
  end

  def destroy
    authorize!(:delete, Photo)
    photo.destroy
    render nothing: true
  end
end
