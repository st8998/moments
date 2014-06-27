module IncrementWithSql
  def increment_with_sql!(attribute, by = 1)
    raise ArgumentError("Invalid attribute: #{attribute}") unless attribute_names.include?(attribute.to_s)
    self.class.where(id: id).update_all("#{attribute} = CASE WHEN #{attribute} IS NULL THEN 0 ELSE #{attribute} END + #{by}")
  end
end