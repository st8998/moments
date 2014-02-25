class PicturesController < ApplicationController
  expose :pictures, strategy: VerifiableStrategy
  expose :picture

  respond_to :json

  def update
    authorize!(:update, Picture)

    @picture = Picture.find(params[:id])
    @picture.update_attributes(params.require(:picture).permit(:description))

    render 'picture'
  end

  def upload
    authorize!(:upload, Picture)
    @picture = pictures.create(image: params[:image])
    render 'picture'
  end
end