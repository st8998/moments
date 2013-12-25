class PicturesEndpoint < Grape::API
  namespace '/:account_key/pictures' do
    helpers do
      def pictures
        Account.find_by(key: params[:account_key]).pictures
      end
    end

    get do
      present pictures, with: PictureEntity
    end

    params do
      requires :id, type: Integer, desc: 'Picture id'
    end

    route_param :id do
      get do
        present pictures.find(params[:id]), with: PictureEntity
      end
      delete do
        pictures.where(id: params[:id]).destroy_all
        'ok'
      end
    end

    params do
      requires :image
    end
    post 'upload' do
      present pictures.create(image: params[:image]), with: PictureEntity
    end
  end
end