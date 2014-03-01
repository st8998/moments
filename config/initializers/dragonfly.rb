require 'dragonfly'

class Dragonfly::Content
  def exifr
    @exifr ||= EXIFR::JPEG.new(file)
  end
end

# Configure
Dragonfly.app.configure do
  plugin :imagemagick

  protect_from_dos_attacks true
  secret Rails.application.secrets.dragonfly

  url_format "/media/:job/:name"

  datastore :file,
    root_path: Rails.root.join('public/system/dragonfly', Rails.env),
    server_root: Rails.root.join('public')

  fetch_file_whitelist [              # List of allowed file paths when using fetch_file (strings or regexps)
      /app\/assets\/images/,
      /public/
  ]

  analyser :iso do |content|
    content.exifr.iso_speed_ratings
  end

  analyser :exposure_time do |content|
    content.exifr.exposure_time.to_s
  end

  analyser :aperture_value do |content|
    content.exifr.aperture_value
  end

  analyser :focal_length do |content|
    content.exifr.focal_length_in_35mm_film
  end
end

# Logger
Dragonfly.logger = Rails.logger

# Mount as middleware
Rails.application.middleware.use Dragonfly::Middleware
