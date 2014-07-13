# config valid only for Capistrano 3.1
lock '>=3.1.0'

set :application, 'moments'
set :repo_url, 'git@github.com:st8998/moments.git'

set :user, 'deploy'

# Default branch is :master
# ask :branch, proc { `git rev-parse --abbrev-ref HEAD`.chomp }

# Default deploy_to directory is /var/www/my_app
# set :deploy_to, '/var/www/my_app'

# Default value for :scm is :git
# set :scm, :git

# Default value for :format is :pretty
# set :format, :pretty

# Default value for :log_level is :debug
set :log_level, :info

# Default value for :pty is false
# set :pty, true

# Default value for :linked_files is []
# set :linked_files, %w{config/database.yml}

# Default value for linked_dirs is []
set :linked_dirs, %w{log tmp/pids tmp/cache tmp/sockets public/assets public/system}
# set :linked_dirs, %w{bin log tmp/pids tmp/cache tmp/sockets vendor/bundle public/system}

# Default value for default_env is {}
# set :default_env, { path: "/opt/ruby/bin:$PATH" }

# Default value for keep_releases is 5
# set :keep_releases, 5

SSHKit.config.output = $stdout

set :bower_flags, '--quiet'
set :bower_roles, :all

namespace :assets do
  desc 'Precompile assets locally and then rsync to web servers'
  task :precompile do
    on roles(:web) do
      rsync_host = host.to_s # this needs to be done outside run_locally in order for host to exist
      run_locally do
        with rails_env: fetch(:stage) do
          execute :bundle, 'exec rake assets:precompile'
        end
        execute "rsync -av -e ssh --delete ./public/assets/ #{fetch(:user)}@#{rsync_host}:#{shared_path}/public/assets/"
        execute "rm -rf public/assets"
        # execute "rm -rf tmp/cache/assets" # in case you are not seeing changes
      end
    end
  end
end

namespace :db do
  task :seed do
    on roles(:web) do
      within release_path do
        with rails_env: fetch(:stage) do
          execute :rake, "db:seed"
        end
      end
    end
  end
end

namespace :deploy do
  desc 'Uploads secrets.yml'
  task :upload_secrets do
    on roles(:web) do
      upload! './config/secrets.yml', "#{release_path}/config/secrets.yml"
    end
  end

  desc 'Restart application'
  task :restart do
    on roles(:all), in: :sequence do
      # Your restart mechanism here, for example:
      # execute :touch, release_path.join('tmp/restart.txt')
      execute 'sudo restart moments'
    end
  end

  after :updated, 'deploy:upload_secrets'

  after :updated, 'assets:precompile'

  after :publishing, :restart
end
