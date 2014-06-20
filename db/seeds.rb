# st8998 account
account = Account.find_or_create_by(key: 'st8998')

# base users
User.find_or_create_by(name: 'Иван Ефремов') do |model|
  model.password = 'joppadriller'

  model.email = 'ivan@moments.com'
  model.account = account
  model.avatar = File.open(Rails.root.join('db/data/userpic.jpg'))
end

User.find_or_create_by(name: 'Ольга Ефремова') do |model|
  model.password = 'joppadriller'

  model.email = 'olga@moments.com'
  model.account = account
  model.avatar = File.open(Rails.root.join('db/data/olga_userpic.jpg'))
end

# this project developing moment
#Moment.find_or_create_by(title: 'Момент зарождения проекта "Moments"') do |model|
#  model.description = 'Сижу на ковре, подаренным Вовкой. Играет Влади & Каста Ясно!. Ольга рисует чайники и любит кнедлика. Медленно, но верно проект приобреат призрачные очертания.'
#  model.date = Time.parse('2013-11-27 22:55:03 +0400')
#
#  model.lat = 53.21651837219011
#  model.lng = 50.15031337738037
#
#  model.pictures.build(file: File.open(Rails.root.join('db/data/201311272259-DSC03771.jpg')))
#  model.pictures.build(file: File.open(Rails.root.join('db/data/201311272301-DSC03788.jpg')))
#end
#
#Moment.find_or_create_by(title: 'Дурю на работе') do |model|
#  model.description = 'Купил пучеглаз и дурю на работе...'
#  model.date = Time.parse('2013-10-24 20:55:03 +0400')
#
#  model.lat = 53.20346531907318
#  model.lng = 50.14474779367447
#
#  model.pictures.build(file: File.open(Rails.root.join('db/data/20131024-DSC00500.jpg')))
#end
#
## several places for coordinates tests
#Moment.find_or_create_by(title: 'Фабрика кухня') do |model|
#  model.lat = 53.21559325595109
#  model.lng = 50.14881670475006
#end
#
#Moment.find_or_create_by(title: 'ЗИМ') do |model|
#  model.lat = 53.21682031552692
#  model.lng = 50.1472932100296
#end
#
#Moment.find_or_create_by(title: 'Звезда') do |model|
#  model.lat = 53.216232487707614
#  model.lng = 50.14655292034149
#end
#
