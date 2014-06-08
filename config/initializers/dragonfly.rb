require 'dragonfly'

class Dragonfly::Content
  def exif
    @exif ||= EXIFR::JPEG.new(file)
  end
  def xmp
    @xmp ||= XMP.parse(exif)
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

  analyser :date do |content|
    content.exif.date_time_original
  end

  analyser :iso do |content|
    content.exif.iso_speed_ratings
  end

  analyser :exposure_time do |content|
    content.exif.exposure_time.to_s
  end

  analyser :aperture_value do |content|
    content.exif.aperture_value
  end

  analyser :focal_length do |content|
    content.exif.focal_length_in_35mm_film
  end

  analyser :keywords do |content|
    if content.xmp && content.xmp.dc.respond_to?(:subject)
      content.xmp.dc.subject
    end
  end
end

# Logger
Dragonfly.logger = Rails.logger

# Mount as middleware
Rails.application.middleware.use Dragonfly::Middleware
