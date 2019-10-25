// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require activestorage
//= require turbolinks
//= require_tree .
var startbtn = $("#start-btn"); 

function VideoStart(video){
  var html = `<iframe width="100%" height="100%" src="${video.url}?autoplay=1" allow="autoplay" frameborder="0" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" allow="autoplay" allowfullscreen></iframe>`
  $("#display").html(html);
  $(startbtn).css('display', 'none');
  ScrollToTop();
}

function ScrollToTop(){
$('html').animate({scrollTop:0});
}

function VideoStop(){
  var html= ` <p id="display__msg">Video has been stopped...</p>
              <div id="display__info">⬇️ Choose a Keyword! ⬇️</div>`
  $("#display").html(html);
}