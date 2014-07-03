namespace :elastic do
  task :export => :environment do
    Moment.import
    Place.import
  end
end
