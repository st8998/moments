class PhotosController < ApplicationController
  expose :photo

  PERMITTED_ATTRIBUTES = [:image, :description]

  def create
    authorize!(:create, Photo)
    photo.save
    render 'photo'
  end

  def update
    photo.save
    render 'photo'
  end

  def destroy
    photo.destroy
    render nothing: true
  end
end
