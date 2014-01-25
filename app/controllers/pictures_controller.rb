class PicturesController < ApplicationController
  expose :pictures_set, strategy: VerifiableStrategy
  expose :pictures, strategy: VerifiableStrategy
  expose :picture, attributes: :picture_params

  respond_to :json

  def destroy
    authorize! :delete, picture
    picture.destroy
    render json: 'ok'
  end

  def reorder
    authorize!(:reorder, PicturesSet)
    pictures_set.configuration.order = params.require(:order)
    pictures_set.save

    render json: 'ok'
  end

  def upload
    authorize!(:upload, Picture)
    self.picture = pictures.create(image: params[:image])
    render 'picture'
  end

  private

  def picture_params
    params.require(:picture)
  end
end