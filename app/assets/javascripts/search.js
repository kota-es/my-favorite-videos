$(document).on('turbolinks:load', function(){
  var box = $("#search-box"); 
  var startbtn = $("#start-btn"); 

  function appendVideoTitle(video){
    var html = `<tr class="video-content">
                  <td class="word">${video.word}</td>
                  <td class="title">${video.title}</td>
                  <td class="note">${video.note}</td>
                  <td class="delete"><form class="button_to" method="post" action="/videos/${video.id}"><input type="hidden" name="_method" value="delete"><input type="submit" value="DELETE"><input type="hidden" name="authenticity_token" value="oYvcuT87c0SZfsl/wUk4k6yJ/6lKa23fUNaho4S+Db5+jgIhyTtAWvm+URjpCXdn6x9a3/o8uPBN2uCHPbKJ7g=="></form></td>
                  <td class="edit"><form class="button_to" method="get" action="/videos/${video.id}/edit"><input type="submit" value="EDIT"></form></td>
                </tr>`
    
    $('tbody').append(html);
  }

  function NoMatchTitle(info){
    var html = `<tr class="video-content">
                  <td colspan="5">${info}</td>
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
      if (videos.length !== 0){
        videos.forEach(function(video){
          appendVideoTitle(video);
        });
      }
      else{
        NoMatchTitle('該当する動画はありません')
        console.log("なし")
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
      $('#content').html(html);
      $(startbtn).css('display', 'none');
      ScrollToTop();
    })
    .fail(function(){
      alert("error")
    });
  });

});