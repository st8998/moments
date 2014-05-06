class MomentsController < ApplicationController
  expose :moments
  expose :moment, attributes: :moment_params

  def index
    if request.format.json?
      @moments = moments
      render 'moment'
    else
      render 'index'
    end
  end

  def create
    authorize!(:create, Moment)
    moment.save

    render 'moment'
  end

  def update
    authorize!(:update, moment)
    moment.save

    render 'moment'
  end

  def destroy
    authorize!(:delete, moment)
    moment.destroy
    render nothing: true
  end

  private

  PERMITTED_ATTRIBUTES = [
      :description,
      {photos: []}
  ]

  def moment_params
    moment_attrs = params.require(:moment).permit(*PERMITTED_ATTRIBUTES)

    if photos = moment_attrs.delete(:photos)
      moment_attrs[:photo_set] = {photos: photos, account: current_account}
    end

    moment_attrs
  end
end
