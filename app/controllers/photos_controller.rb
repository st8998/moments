class PhotosController < ApplicationController
  expose(:photo, strategy: VerifiableStrategy, attributes: :photo_params)

  before_action :ensure_user

  def create
    photo.save
    render 'photo'
  end
  alias_method :update, :create

  def destroy
    photo.destroy
    render nothing: true
  end

  private

  def photo_params
    params.require(:photo).permit(:image, :description)
  end
end
