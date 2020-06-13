$(document).ready(function(){
	
    $("#zoom").click(function(){

        $('.book').css('transform','scale(1.2)');
             $('.book').css('-webkit-transform','scale(1.2)');
			$('.book').css('-webkit-transform-origin','0 0');
			$('.book').css('-moz-transform','scale(1.2)');
			$('.book').css('-moz-transform-origin','0 0');
			$('.book').css('-o-transform','scale(1.2)');
			$('.book').css('-o-transform-origin','0 0');
			$('.book').css('-ms-transform','scale(1.2)');
            $('.book').css('-ms-transform-origin','0 0');
            $('.book').css('left','-8%');
            
			$('.button_zoom').css('margin-top','10%');
			$('#footer').css('margin-top','30%');
        
      });
      
      $("#zoomout").click(function(){

$('.book').css('transform','scale(1)');
     $('.book').css('-webkit-transform','scale(1)');
    $('.book').css('-webkit-transform-origin','0 0');
    $('.book').css('-moz-transform','scale(0)');
    $('.book').css('-moz-transform-origin','0 0');
    $('.book').css('-o-transform','scale(0)');
    $('.book').css('-o-transform-origin','0 0');
    $('.book').css('-ms-transform','scale(0)');
    $('.book').css('-ms-transform-origin','0 0');
    $('.book').css('left','0%');
    $('.button_zoom').css('margin-top','0%');
    $('#footer').css('margin-top','15%');

});
        
  });
