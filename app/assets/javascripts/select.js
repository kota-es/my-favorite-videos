$(document).on('turbolinks:load', function(){

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
      VideoStart(data);
    })
    .fail(function(){
      alert("error")
    });
  });

});