class PicturesEndpoint < Grape::API
  namespace '/:account_key/pictures' do
    helpers do
      def pictures
        @pictures ||= Picture.accessible_by(current_ability)
      end
      def picture
        @picture ||= pictures.find(params[:id])
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
        authorize! :show, picture
        present picture, with: PictureEntity
      end
      delete do
        authorize! :delete, picture
        picture.destroy
        'ok'
      end
    end

    params do
      requires :image
    end
    post 'upload' do
      authorize! :upload, Picture
      present pictures.create(image: params[:image]), with: PictureEntity
    end
  end
end