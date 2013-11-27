# this project developing moment

Moment.find_or_create_by(title: 'Момент зарождения проекта "Moments"') do |model|
  model.description = 'Сижу на ковре, подаренным Вовкой. Играет Влади & Каста Ясно!. Ольга рисует чайники и любит кнедлика. Медленно, но верно проект приобреат призрачные очертания.'
  model.date = Time.parse('2013-11-27 22:55:03 +0400')

  model.lat = '53.21651837219011'
  model.lng = '50.15031337738037'
end