class MomentsController < ApplicationController
  expose :moments
  expose :moment, attributes: :moment_params

  def index
    if request.format.json?
      render json: moments.root.includes(:photos, :author, :sub_moments).order(:date.desc)
    end
  end

  def create
    authorize!(:create, Moment)
    moment.author = current_user
    moment.save

    render json: moment
  end

  def update
    authorize!(:update, moment)
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
      {photos: [:id]}
  ]

  def moment_params
    params.require(:moment).permit(*PERMITTED_ATTRIBUTES)
  end
end
