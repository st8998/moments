#!/usr/bin/env puma

# Store the pid of the server in the file at “path”.
#
pidfile '/var/www/moments/shared/tmp/pids/puma.pid'

stdout_redirect '/var/www/moments/shared/log/puma_stdout',
    '/var/www/moments/shared/log/puma_stderr', true

threads 2, 8

bind 'unix:///var/www/moments/shared/tmp/sockets/moments.sock'
