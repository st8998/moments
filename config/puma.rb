#!/usr/bin/env puma

# Store the pid of the server in the file at “path”.
#
pidfile '/var/www/moments/shared/tmp/pids/unicorn.pid'

threads 4, 16

bind 'unix:///var/www/moments/shared/tmp/sockets/moments.sock'
