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
      $('#display').html(html);
      $(startbtn).css('display', 'none');
      ScrollToTop();
    })
    .fail(function(){
      alert("error")
    });
  });

});