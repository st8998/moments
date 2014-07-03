class Indexer
    include Celluloid

    def self.client
      @client ||= Elasticsearch::Client.new host: Rails.application.config.elastic_server
    end

    def self.process(object, operation)
      index = object.class.index_name
      doc_type = object.class.document_type

        case operation.to_s
          when /index/
            self.client.index index: index, type: doc_type, id: object.id, body: object.as_indexed_json
          when /delete/
            self.client.delete index: index, type: doc_type, id: object.id
          else raise ArgumentError, 'Uknown operation!'
        end
    end
end

module Indexable
  extend ActiveSupport::Concern

  def as_indexed_json(options={})
    as_json(options)
  end

  included do
    after_save { Indexer.process(self, :index) }
    after_destroy { Indexer.process(self, :delete) }
  end
end
