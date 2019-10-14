$(document).on('turbolinks:load', function(){
  var startbtn = $("#start-btn"); 

  $(".word").on("click", function(e){
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
      $('body, html').animate({scrollTop:0});
    })
    .fail(function(){
      alert("error")
    });
  });

});