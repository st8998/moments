namespace :db do
  task :drop_search_index do
    client = Elasticsearch::Client.new(log: true)

    %w[moments].each do |index|
      if client.indices.exists(index: index)
        client.indices.delete(index: index)
      end
    end
  end

  Rake::Task["db:drop"].enhance [:drop_search_index]
end
