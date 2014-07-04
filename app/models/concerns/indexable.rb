class Indexer
  include Celluloid

  def client
    @@client ||= Elasticsearch::Client.new host: Rails.application.config.elastic_server
  end

  def process(object, operation)
    index = object.class.index_name
    doc_type = object.class.document_type

    case operation
      when :index
        client.index index: index, type: doc_type, id: object.id, body: object.as_indexed_json
      when :delete
        client.delete index: index, type: doc_type, id: object.id
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
    after_save {
      future = Indexer.pool.future.process(self, :index)
      if Rails.application.config.elastic_synchronous_indexing
        future.value
      end
    }
    after_destroy {
      future = Indexer.pool.future.process(self, :delete)
      if Rails.application.config.elastic_synchronous_indexing
        future.value
      end
    }
  end
end
