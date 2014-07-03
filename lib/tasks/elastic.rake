namespace :elastic do
  task :export => :environment do
    Moment.import
  end
end
