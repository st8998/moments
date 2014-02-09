class PhotostreamController < ApplicationController
  def index
    photostream
  end

  def add
    photostream.add(params.require(:picture_id))
    render json: 'ok'
  end

  def remove
    photostream.remove(params.require(:picture_id))
  end

  private

  def photostream
    @photostream ||= PicturesSet.find_or_create_by(key: 'photostream')
  end
end
