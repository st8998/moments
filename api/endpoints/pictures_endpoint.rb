class PicturesEndpoint < Grape::API
  namespace 'pictures' do
    get do
      present Picture.all, with: PictureEntity
    end

    params do
      requires :id, type: Integer, desc: 'Picture id'
    end

    route_param :id do
      get do
        present Picture.find(params[:id]), with: PictureEntity
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
      present Picture.create(image: params[:image]), with: PictureEntity
    end
  end
end