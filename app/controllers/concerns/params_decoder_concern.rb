module ParamsDecoderConcern
  extend ActiveSupport::Concern

  included do
    before_action :decode_params
  end

  private

  def decode_params
    params.fetch(:encode, []).each do |param|
      if params[param]
        params[param] = params[param].to_i(36)
      end
    end
  end
end