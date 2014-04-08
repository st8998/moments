class VerifiableStrategy < DecentExposure::StrongParametersStrategy
  delegate :current_ability, :to => :controller

  def model
    super.accessible_by(current_ability)
  end
end