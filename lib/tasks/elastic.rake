namespace :elastic do
  task :export => :environment do
    exported = Moment.find_each.map { |m| m.exporter.future.run }
    exported.each { |m| puts m.value }
  end
end
