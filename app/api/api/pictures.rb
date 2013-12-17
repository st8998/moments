module API
  class Pictures < Grape::API
    resource :pictures do
      get do
        present Picture.all, with: API::Entities::Picture
      end

      params do
        requires :id, type: Integer, desc: 'Picture id'
      end

      route_param :id do
        get do
          present Picture.find(params[:id]), with: API::Entities::Picture
        end
        delete do
          Picture.find(params[:id]).destroy
          'ok'
        end
      end

      params do
        requires :image
      end
      post 'upload' do
        present Picture.create(image: params[:image]), with: API::Entities::Picture
      end
    end
  end
end