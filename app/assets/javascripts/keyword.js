$(document).on('turbolinks:load', function(){
  var btn = $(".video-form__field__btn") 
  var input = $("#video_word")
  var speech = new webkitSpeechRecognition();
  speech.lang = "ja";

  $(btn).on("click", function(){
    $(input).val(""); 
    $(btn).text("設定したいキーワードを音声入力してください")
    speech.start();
  });

  speech.addEventListener('result', function(e){
    var script = e.results[0][0].transcript;
    console.log(script);
    $(input).val(script);
    $(btn).text('♪やり直す場合はクリック♪');
  });
  
  speech.onsoundstart = () => {
    $(btn).text('聞き取り中...♪');
  };
  

});