class PicturesController < ApplicationController
  expose :pictures, strategy: VerifiableStrategy
  expose :picture

  respond_to :json

  def upload
    authorize!(:upload, Picture)
    self.picture = pictures.create(image: params[:image])
    render 'picture'
  end
end