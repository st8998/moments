class PhotostreamController < ApplicationController
  def index
    photostream
  end

  def add
    photostream.add(params.require(:picture_id))
    @picture = Picture.find(params.require(:picture_id))
    render 'pictures/picture'
  end

  def remove
    photostream.remove(params.require(:picture_id))
    render json: 'ok'
  end

  private

  def photostream
    @photostream ||= PicturesSet.find_or_create_by(key: 'photostream')
  end
end
