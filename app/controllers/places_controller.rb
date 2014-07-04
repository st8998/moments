class PlacesController < ApplicationController
  expose :places

  def search
    term = params.require(:term)

    el_places = Place.search query: {
        match: {
          _all: {
            query: "#{term}",
            operator: 'and',
            prefix_length: 2,
            fuzziness: 0.005
          }
        }
      }
      
    render json: el_places.records.limit(10)
  end
end
