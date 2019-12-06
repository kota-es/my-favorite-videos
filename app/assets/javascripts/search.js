$(document).on('turbolinks:load', function(){
  var box = $("#search-box"); 

  function appendVideoTitle(video){
    var html = `<tr class="video-content">
                  <td class="word">${video.word}</td>
                  <td class="title">${video.title}</td>
                  <td class="note">${video.note}</td>
                  <td><a data-confirm="${video.title}を削除します。よろしいですか？" class="t-btn delete" rel="nofollow" data-method="delete" href="/videos/${video.id}">削除</a></td>
                  <td><a class="t-btn edit" data-method="get" href="/videos/${video.id}/edit">編集</a></td>
                </tr>`

    $('tbody').append(html);
  }

  function NoMatchTitle(info){
    var html = `<tr class="video-content">
                  <td id="notitle-msg" colspan="5">${info}</td>
                </tr>`
    $('tbody').append(html);
  }
  
  $(box).on("keyup", function(){
    var input = $(box).val();
    console.log(input)
  
    $.ajax({
      type: 'GET',
      url: '/videos/search',
      data: { keyword: input },
      dataType: 'json'
    })

    .done(function(videos){
      $(".video-content").empty();
      if ($(box).val() == ""){
        $("#title-count").text(gon.user_name + " さんの動画登録数：" + gon.videos_length + "件") 
        videos.forEach(function(video){
          appendVideoTitle(video);
        });
      }
      else if (videos.length !== 0){
        $("#title-count").text("検索結果：" + videos.length + "件見つかりました。")
        videos.forEach(function(video){
          appendVideoTitle(video);
        });
      }
      else{
        $("#title-count").text("検索結果：0件")
        NoMatchTitle('該当する動画はありません')
      }
    })
    .fail(function(){
      alert('動画検索に失敗しました')
    })
  });

  $('tbody').on('click','.word', function(e){
    e.preventDefault();
    var word = $(this).text();
    console.log(word)
    
    $.ajax({
      type: 'GET',
      url: '',
      data: { keyword: word },
      dataType: 'json'
    })

    .done(function(data){
      VideoStart(data);
    })
    .fail(function(){
      alert("error")
    });
  });

});