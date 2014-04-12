class PhotosController < ApplicationController
  expose(:photo, strategy: VerifiableStrategy, attributes: :photo_params)

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

  private

  PERMITTED_ATTRIBUTES = [:image, :description]

  def photo_params
    params.require(:photo).permit(*PERMITTED_ATTRIBUTES)
  end
end
