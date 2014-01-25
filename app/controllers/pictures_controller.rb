class PicturesController < ApplicationController
  expose :pictures, strategy: VerifiableStrategy
  expose :picture, attributes: :picture_params

  respond_to :json

  def destroy
    authorize! :delete, picture
    picture.destroy
    render json: 'ok'
  end

  def reorder
    render json: 'ok'
  end

  def upload
    authorize!(:upload, Picture)
    self.picture = pictures.create(image: params[:image])
    render 'picture'
  end

  private

  def picture_params
    # TODO get rid of permit!
    params.require(:picture).permit!
  end
end