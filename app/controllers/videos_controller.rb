class VideosController < ApplicationController

  before_action :set_video, only: [:edit, :update, :destroy]

  def index
    @title = "トップページ｜FavoTube"
    @videos = current_user.videos.recent
    gon.videos_length = @videos.length
    gon.user_name = current_user.name
    @video = current_user.videos.find_by(word: "#{params[:keyword]}")
    respond_to do |format|
      format.html
      format.json
    end
  end

  def new
    @title = "動画登録｜FavoTube"
    @video = Video.new
  end

  def create
    @video = Video.new(video_params)
    if @video.save
      flash[:notice] = "キーワード「#{@video.word}」の動画を登録しました"
      redirect_to "/videos#display__info"
    else
      render 'new'
    end
  end

  def edit
    @title = "動画情報編集｜FavoTube"
  end

  def update
      if @video.update(video_params) 
        flash[:notice] = "キーワード「#{@video.word}」の動画情報を更新しました"
        redirect_to "/videos#display__info"
      else
        render :edit
      end
  end

  def destroy
    @video.delete
    flash[:notice] = "キーワード「#{@video.word}」の動画を削除しました"
    redirect_to "/videos#display__info"
  end

  def search
    @videos = current_user.videos.where('word LIKE(?) OR title LIKE(?) OR note LIKE(?)', "%#{params[:keyword]}%", "%#{params[:keyword]}%", "%#{params[:keyword]}%").recent
    respond_to do |format|
      format.html
      format.json
    end
  end

  private

  def video_params
    params.require(:video).permit(:word, :title, :url, :note).merge(user_id: current_user.id)
  end

  protected
  
  def set_video
    @video = Video.find(params[:id])
  end

end