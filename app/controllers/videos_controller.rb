class VideosController < ApplicationController
  def index
    @videos = current_user.videos.all.order("created_at DESC")
  end

  def new
    @video = Video.new
  end

  def create
    current_user.videos.create(video_params)
    redirect_to root_path
  end

  def edit
    @video = Video.find(params[:id])
  end

  def update
    video = Video.find(params[:id])
    video.update(video_params)
    redirect_to root_path
  end

  private

  def video_params
    params.require(:video).permit(:word, :title, :url, :note)
  end

end