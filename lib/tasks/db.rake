namespace :db do
  task :clear_uploads do
    FileUtils.rm_r(Dragonfly.app.datastore.root_path, force: true)
  end

  Rake::Task["db:drop"].enhance [:clear_uploads]
end
