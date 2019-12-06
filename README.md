# FavoTube（音声認識システム搭載型 動画管理・視聴アプリ）

[![Image from Gyazo](https://i.gyazo.com/f3a9bae184d6575960ed114cbd6dd960.gif)](https://gyazo.com/f3a9bae184d6575960ed114cbd6dd960)

## What(これは何？)

<p>お気に入りのYoutube動画を登録して検索・再生できるアプリです。動画リストのキーワード欄をクリックするほか、キーワードを音声入力することでも自動再生が可能です。</p>
マイク付きのイヤホンやヘッドホンを装着すれば遠隔からでも操作ができるため、簡易的な音楽プレーヤーとしても使用可能です。パソコンを開いておけば別の部屋で家事などの作業をしていても音楽が楽しめます。

## Why(なぜ作ったのか？)

* 好きなYoutube動画をできる限り少ないステップで視聴できるアプリを作りたかったため
* お菓子を食べていたり保湿クリームを塗ったりしている時でも、PCを汚さずに動画を見たかったため
* 技術的にAPIに触れてみたかったため

## 搭載機能

* ユーザー登録・編集
* 動画登録・編集・削除
* キーワード、動画タイトル、動画メモによるインクリメンタルサーチ
* 動画再生（キーワードクリック or キーワード音声入力）
* 音声入力（「ストップ」）による

## 使用言語・ツール

* HTML(Haml)
* CSS(SCSS)
* Ruby on Rails 
* jQuery
* MySQL
* Heroku

## 自動再生までの仕組み

まず、好きなYoutube動画を登録します。キーワードは音声入力にすることで、再生時の音声入力との認識ミスを無くしています。

[![Image from Gyazo](https://i.gyazo.com/0c0d0255548acc00fae9c3666542537b.gif)](https://gyazo.com/0c0d0255548acc00fae9c3666542537b)

自動再生はAjax(非同期通信）で行なっています。「WebSpeechAPI」を用いることで音声入力での再生を実現しました。

```js
$(document).on('turbolinks:load', function(){
  var speech = new webkitSpeechRecognition();
  speech.lang = "ja";
  
  $(window).on('load', function(){
    // 再生画面でのみ音声認識を起動
    if(location.pathname == "/" || "/videos#display__info"){
      speech.start();
    // 終了・起動をループさせ常に音声認識を行う
      speech.onend = () => {
        speech.start();
      }
    }
  });
  
  speech.addEventListener('result', function(e){
    // 音声認識結果を変数に大移入
    var script = e.results[0][0].transcript;
    // 音声が「ストップ」だった際は、再生を停止する 
    if(script == 'ストップ'){
      VideoStop();
    //音声認識結果をアクションに送信
    }else{
      $.ajax({
        type: 'GET',
        url: '',
        data: { keyword: script },
        dataType: 'json'
      })
      .done(function(data){
        VideoStart(data);
      })
    }
  });

});

```

```rb
  def index
    # 送信されたキーワードを含むビデオ（レコード)を取得
    @video = current_user.videos.find_by(word: "#{params[:keyword]}")
    respond_to do |format|
      format.html
      format.json
    end
  end
```
```js
function VideoStart(video){
  // 動画のurlをYoutubeの埋め込みタグに挿入
  var html = `<iframe width="100%" height="100%" src="${video.url}?autoplay=1" allow="autoplay" frameborder="0" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" allow="autoplay" allowfullscreen></iframe>`
  // 上記のタグをページの画面部分に挿入
  $("#display").html(html);
}
```

## 開発中の課題・問題

* 動画が自動再生されない
* 音声ワードとデータベースの連携の仕方がわからない
* 登録・更新後に遷移した再生ページでAjaxが動かない
* インクリメンタルサーチ後にクリック再生ができない
* インクリメンタルサーチ後の再生で自動スクロールしない
* 全てのカラムを対象としたインクリメンタルサーチの方法がわからない
* 作成、更新、削除後の遷移先をページの特定の位置にしたい
* link_toでトップ画面にリダイレクトするとAJaxが動かない
* 検索後に検索欄を空欄にした時、検索開始前の表記に戻したい
などなど・・・。

企画から開発まで通して行った初めてのアプリということで様々な問題に突き当たりました。
しかし、デバッグツールでエラー内容をつぶさに確認する、少しでも思いついたことがあればトライしてみるなど、あらゆる可能性を探ることで解決することができました。