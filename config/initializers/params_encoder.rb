module ParamsEncoder
  def normalize_options!
    encode_id!
    super
  end

  def encode_id!
    @options.fetch(:encode, []).each do |param|
      if @options[param]
        @options[param] = Base64.urlsafe_encode64(@options[param].to_s)
      end
    end
  end
end

ActionDispatch::Routing::RouteSet::Generator.send(:prepend, ParamsEncoder)
