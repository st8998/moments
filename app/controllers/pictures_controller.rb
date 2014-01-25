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
    params.require(:pictures).each.with_index do |id, i|
      pictures.where(id: id).update_all(pos: i)
    end

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