class PicturesController < ApplicationController
  respond_to :json

  expose :picture, attributes: :picture_params
  expose :pictures

  def create
    if picture.save
      render 'api/picture'
    end
  end

  def show
    render 'api/picture'
  end

  def destroy
    if picture.destroy
      render nothing: true
    end
  end

  private

  def picture_params
    params.require(:picture).permit(:image)
  end
end
