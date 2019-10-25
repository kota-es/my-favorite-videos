$(document).on('turbolinks:load', function(){
  var btn = $("button"); 
  var speech = new webkitSpeechRecognition();

  speech.lang = "ja";
  
  $(window).on('load', function(){
    if(location.href == "http://localhost:3000/" || "http://localhost:3000/videos#info"){
      speech.start();

      speech.onend = () => {
        speech.start();
      }
    }
  });
  
  speech.addEventListener('result', function(e){
    var script = e.results[0][0].transcript;
    console.log(script);
    
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
    // if(text == '白日')getVideo('<iframe width="100%" height="98%" src="https://www.youtube.com/embed/ony539T074w?autoplay=1" allow="autoplay" frameborder="0" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" allow="autoplay" allowfullscreen></iframe>');
    // if(text == 'レモン')getVideo('<iframe width="100%" height="98%" src="https://www.youtube.com/embed/SX_ViT4Ra7k?autoplay=1" allow="autoplay" frameborder="0" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>');
    // if(text == '無感情')getVideo('<iframe width="100%" height="98%" src="https://www.youtube.com/embed/5DjFpPSuGR0?autoplay=1" allow="autoplay" frameborder="0" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>');
    // if(text == 'pretender')getVideo('<iframe width="100%" height="98%" src="https://www.youtube.com/embed/TQ8WlA2GXbk?autoplay=1" allow="autoplay" frameborder="0" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>');
    // if(text == '宝島')getVideo('<iframe width="100%" height="98%" src="https://www.youtube.com/embed/LIlZCmETvsY?autoplay=1" allow="autoplay" frameborder="0" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>');
    // if(text == 'Wake Me Up')getVideo('<iframe width="100%" height="98%" src="https://www.youtube.com/embed/IcrbM1l_BoI?autoplay=1" allow="autoplay" frameborder="0" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>');

  // function getVideo(tag){
  //   content.innerHTML = tag;
  //   $(btn).css('display', 'none');
  //   $('body, html').animate({scrollTop:0});
  // };
