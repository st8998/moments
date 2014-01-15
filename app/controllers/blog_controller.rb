class BlogController < ApplicationController

  before_action do
    if !(cookies[:dakey] && Account.exists?(key: cookies[:dakey]))
      cookies.permanent[:dakey] = {value: Account.create_demo.key, path: '/blog'}
    end
  end

  def article
    render "blog/#{params[:article_key]}"
  end

end
