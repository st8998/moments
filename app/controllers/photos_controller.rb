class PhotosController < ApplicationController
  expose(:photo, strategy: VerifiableStrategy, attributes: :photo_params)

  def create
    authorize!(:create, Photo)
    photo.save
    render_rabl(photo, 'photos/photo')
  end

  def update
    photo.save
    render_rabl(photo, 'photos/photo')
  end

  def destroy
    photo.destroy
    render nothing: true
  end

  private

  def photo_params
    params.require(:photo).permit(:image, :description)
  end
end
