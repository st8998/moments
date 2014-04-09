class MomentsController < ApplicationController
  expose(:moments, strategy: VerifiableStrategy)
  expose(:moment, strategy: VerifiableStrategy)

  private

  def moment_params
    params.require(:moment)
  end
end
