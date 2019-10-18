$(document).on('turbolinks:load', function(){
  var box = $("#search-box"); 
  var startbtn = $("#start-btn"); 

  function appendVideoTitle(video){
    var html = `<tr class="video-content">
                  <td class="word">${video.word}</td>
                  <td class="title">${video.title}</td>
                  <td class="note">${video.note}</td>
                  <td><form class="button_to" method="post" action="/videos/${video.id}"><input type="hidden" name="_method" value="delet"><input data-confirm="The White Stripes - 'Seven Nation Army'を削除します。よろしいですか？" class="t-btn delete" type="submit" value="削除"><input type="hidden" name="authenticity_token" value="VPfAhVXPegolqCbaFB5nq8TVb3Ayl3qtXYaRsCWtz6+OgHzqwGaAPseRme0XMslOlEBOPhrAsQBMaWTf0J5JjQ=="></form></td>
                  <td><form class="button_to" method="get" action="/videos/${video.id}/edit"><input class="t-btn edit" type="submit" value="編集"></form></td>
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
      var html = buildHTML(data);
      $('#display').html(html);
      $(startbtn).css('display', 'none');
      ScrollToTop();
    })
    .fail(function(){
      alert("error")
    });
  });

});