# this project developing moment
Moment.find_or_create_by(title: 'Момент зарождения проекта "Moments"') do |model|
  model.description = 'Сижу на ковре, подаренным Вовкой. Играет Влади & Каста Ясно!. Ольга рисует чайники и любит кнедлика. Медленно, но верно проект приобреат призрачные очертания.'
  model.date = Time.parse('2013-11-27 22:55:03 +0400')

  model.lat = '53.21651837219011'
  model.lng = '50.15031337738037'
end

# several places for coordinates tests
Moment.find_or_create_by(title: 'Фабрика кухня') do |model|
  model.lat = '53.21559325595109'
  model.lng = '50.14881670475006'
end

Moment.find_or_create_by(title: 'ЗИМ') do |model|
  model.lat = '53.21682031552692'
  model.lng = '50.1472932100296'
end

Moment.find_or_create_by(title: 'Звезда') do |model|
  model.lat = '53.216232487707614'
  model.lng = '50.14655292034149'
end

