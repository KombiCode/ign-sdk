class HomeController < ApplicationController
  def index
  end

  def terms
  end

  def privacy
  end

  def init
    render json: {
      ignApiKey01: "#{Rails.application.credentials.ign[:api_key_01]}",
      ignApiKey02: "#{Rails.application.credentials.ign[:api_key_02]}"
    }
  end
end
