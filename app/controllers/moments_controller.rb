class MomentsController < ApplicationController
  expose :moments
  expose :moment, attributes: :moment_params

  def index
    if request.format.json?
      render json: moments.includes(:photos).order(:created_at.desc)
    end
  end

  def create
    authorize!(:create, Moment)
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
      :description,
      {photos: [:id]}
  ]

  def moment_params
    params.require(:moment).permit(*PERMITTED_ATTRIBUTES)
  end
end
