class PhotosController < ApplicationController
  expose :photos
  expose :photo

  PERMITTED_ATTRIBUTES = [:image, :description]

  def index
    render json: photos.order(:date.desc)
  end

  def create
    authorize!(:create, Photo)
    photo.save
    render json: photo
  end

  def update
    photo.save
    render json: photo
  end

  def destroy
    photo.destroy
    render nothing: true
  end
end
