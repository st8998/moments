module API
  module Cookies
    class GrapeCookieConverter
      def read(request)
        @_cookie_jar = ActionDispatch::Cookies::CookieJar.build(request)
      end

      def write(header)
        @_cookie_jar.write(header)
      end

      delegate :[], :[]=, :signed, :encrypted, :permanent, to: :@_cookie_jar
    end

    def cookies
      @_cookies ||= GrapeCookieConverter.new
    end
  end
end