class PicturesSet < ActiveRecord::Base
  has_many :pictures, as: :owner do
    def ordered
      configuration = proxy_association.owner.configuration

      if configuration && configuration.key?('order')
        order_values = configuration['order'].map.with_index {|id, i| "(#{i}, #{id})" }

        joins("INNER JOIN (VALUES #{order_values.join(',')}) as _conf_order(index, id) ON _conf_order.id = pictures.id").
            order('_conf_order.index')
      else
        self
      end
    end
  end
  belongs_to :owner, polymorphic: true

  serialize :configuration, JSON
end
