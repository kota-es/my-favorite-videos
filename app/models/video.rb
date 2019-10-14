class Video < ApplicationRecord
  belongs_to :user

  def video_count
    if current_user.videos.length > 0
      @count = current_user.videos.length
    else
      @count = "0"
    end 
  end
end