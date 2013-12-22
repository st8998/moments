class BlogController < ApplicationController

  def article
    render "blog/#{params[:article_key]}"
  end

end
