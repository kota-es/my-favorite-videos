$(document).on('turbolinks:load', function(){
  var speech = new webkitSpeechRecognition();
  speech.lang = "ja";
  
  $(window).on('load', function(){
    if(location.pathname == "/" || "/videos#display__info"){
      speech.start();

      speech.onend = () => {
        speech.start();
      }
    }
  });
  
  speech.addEventListener('result', function(e){
    var script = e.results[0][0].transcript;  
    if(script == 'ストップ'){
      VideoStop();
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
