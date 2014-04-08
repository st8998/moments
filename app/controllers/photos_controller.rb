class PhotosController < ApplicationController
  expose(:photo, strategy: VerifiableStrategy, attributes: :photo_params)

  before_action :ensure_user

  def create
    photo.save
    render 'photo'
  end

  private

  def photo_params
    puts 'photo params'
    params.require(:photo).permit(:image, :description)
  end

end
