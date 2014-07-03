class PlacesController < ApplicationController
  expose :places

  def search
    term = params.require(:term)

    render json: [places.where(name: term).limit(10)]
  end
end
