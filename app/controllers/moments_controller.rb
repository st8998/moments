class MomentsController < ApplicationController
  expose(:moments, strategy: VerifiableStrategy)
  expose(:moment, strategy: VerifiableStrategy, attributes: :moment_params)

  def create
    moment.account = current_account
    moment.photo_set.account = current_account

    authorize!(:create, Moment)
    moment.save
    render 'moment'
  end

  private

  def moment_params
    params.require(:moment).permit!
  end
end
