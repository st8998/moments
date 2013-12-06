module ParamsEncoder
  def normalize_options!
    encode_id!
    super
  end

  def encode_id!
    @options.fetch(:encode, []).each do |param|
      if @options[param]
        if @options[param].is_a?(Fixnum)
          @options[param] = @options[param].to_s(36)
        else
          raise ArgumentError, 'This feature is working only with Fixnum arguments'
        end
      end
    end
  end
end

ActionDispatch::Routing::RouteSet::Generator.send(:prepend, ParamsEncoder)
