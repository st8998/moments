class MomentsController < ApplicationController
  expose :moments
  expose :moment, attributes: :moment_params

  def index
    if request.format.json?
      # render json: moments.root.includes(:photos, :author, sub_moments: [:photos, :author]).order(:date.desc)
      render json: moments.root.select(:id, :updated_at).order(:date.desc)
    end
  end

  def create
    if moment.parent_id
      authorize!(:create_sub_moment, moment.parent)
    else
      authorize!(:create, Moment)
    end
    moment.author = current_user
    moment.save

    render json: moment
  end

  def update
    authorize!(:update, moment)
    moment.touch
    moment.save

    render json: moment
  end

  def destroy
    authorize!(:delete, moment)
    moment.destroy
    render nothing: true
  end

  private

  PERMITTED_ATTRIBUTES = [
      :date,
      :description,
      :parent_id,
      {photos: [:id, :position]},
      {place: [:id, :name, :lat, :lng, :country, :administrative_area_level_2,
          :administrative_area_level_1, :locality, :route, :street_number, :postal_code]}
  ]

  def moment_params
    params.require(:moment).permit(*PERMITTED_ATTRIBUTES)
  end
end
