require 'net/http'
require 'uri'

module Elastic::Exportable

  class ElasticExporter
    include Celluloid

    def initialize(target)
      @target = target
    end

    def run
      repr = @target.elastic_export
      params = ActiveSupport::JSON.encode repr

      uri = URI("http://localhost:9200/moments/moment/" + repr[:id].to_s)
      Net::HTTP.start(uri.host, uri.port) do |http|
        request = Net::HTTP::Put.new uri
        request.body = params

        response = http.request request
      end
    end
  end

  def exporter
    @_exporter ||= ElasticExporter.new(self)
    @_exporter
  end
end
