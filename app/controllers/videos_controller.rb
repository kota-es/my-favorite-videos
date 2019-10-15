class VideosController < ApplicationController
  def index
    @videos = current_user.videos.all.order("created_at DESC")
    @video = current_user.videos.find_by(word: "#{params[:keyword]}")
    respond_to do |format|
      format.html
      format.json
    end
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

  def destroy
    video = Video.find(params[:id])
    video.destroy
    redirect_to root_path
  end

  def search
    @videos = current_user.videos.where('word LIKE(?) OR title LIKE(?) OR note LIKE(?)', "%#{params[:keyword]}%", "%#{params[:keyword]}%", "%#{params[:keyword]}%").order("created_at DESC")
    respond_to do |format|
      format.html
      format.json
    end
  end

  private

  def video_params
    params.require(:video).permit(:word, :title, :url, :note)
  end

end