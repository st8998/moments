worker_processes 1

working_directory '/var/www/current'

listen '/var/www/current/tmp/sockets/unicorn.sock'
pid '/var/www/current/tmp/pids/unicorn.pid'

# stderr_path 'log/unicorn.log'
# stdout_path 'log/unicorn.log'

timeout 60

preload_app true

before_fork do |server, worker|
  ActiveRecord::Base.connection.disconnect! if defined?(ActiveRecord::Base)
end
 
after_fork do |server, worker|
  ActiveRecord::Base.establish_connection if defined?(ActiveRecord::Base)
end
