$(document).ready(function(){

$('.fancybox').fancybox({
		openEffect  : 'elastic',
		closeEffect	: 'elastic',
		helpers : {
			title : {
					type : 'inside'
					},
			overlay : {
						locked : false ,
						css : {
							'background' : 'rgba(0,0,0,0.95)'
								}
						}
        
				}
			
	}
); 


$('.fancybox-media').fancybox({
		openEffect  : 'none',
		closeEffect : 'none',
		helpers : {
			media : {},
			title:{ type : 'inside'}
		}
	});
	
    $('div.bgParallax').each(function(){
    var $obj = $(this);
     
    $(window).scroll(function() {
    var yPos = -($(window).scrollTop() / $obj.data('speed'));
     
    var bgpos = '50% '+ yPos + 'px';
     
    $obj.css('background-position', bgpos );
     
    });
          
           });
		   


$('#menu1').animate({"opacity" :1});

$('#menu1').hover(function(){
$(this).css('background', '#00bfa8');
$(this).stop().animate({"opacity":.7 },500);

}, 

function(){
$(this).animate({"opacity":1}, 500);
$(this).css('background', '#ededed');
});
$("#menu1").click(function (){
                    $('html, body').animate({
                        scrollTop: $("#home").offset().top
                    }, 1000);
	
});


$('#menu2').animate({"opacity" :1});

$('#menu2').hover(function(){
$(this).css('background', '#00bfa8');
$(this).stop().animate({"opacity":.7 },500);

}, 

function(){
$(this).animate({"opacity":1}, 500);
$(this).css('background', '#ededed');
});
		
$("#menu2").click(function (){
               
			   
                    $('html, body').animate({
                        scrollTop: $("#jobs").offset().top
                    }, 1000);
		
              
            });
			


$('#menu3').animate({ 
"opacity" :1
});

$('#menu3').hover(function(){
$(this).css('background', '#00bfa8');
$(this).stop().animate({"opacity":.7 },500);

}, 

function(){
$(this).animate({"opacity":1}, 500);
$(this).css('background', '#ededed');
});
				$("#menu3").click(function (){
               
			   
                    $('html, body').animate({
                        scrollTop: $("#facul").offset().top
                    }, 1000);
			
            });
			

$('#menu4').animate({ 
"opacity" :1
});

$('#menu4').hover(function(){
$(this).css('background', '#00bfa8');
$(this).stop().animate({"opacity":.7 },500);

}, 

function(){
$(this).animate({"opacity":1}, 500);
$(this).css('background', '#ededed');
});
				$("#menu4").click(function (){
               
			   
                    $('html, body').animate({
                        scrollTop: $("#pics").offset().top
                    }, 1000);
				
            });
			
			
$('#menu5').animate({ 
"opacity" :1
});

$('#menu5').hover(function(){
$(this).css('background', '#00bfa8');
$(this).stop().animate({"opacity":.7 },500);

}, 

function(){
$(this).animate({"opacity":1}, 500);
$(this).css('background', '#ededed');
});
				$("#menu5").click(function (){
               
			   
                    $('html, body').animate({
                        scrollTop: $("#callme").offset().top
                    }, 1000);
				$('#menu4').css('background', '#ededed');
				});
              

			   			

});


$(window).scroll(function() {

    if ($(this).scrollTop()>20)
     {
        $('.help').fadeOut(500);
     }
    else
     {
      $('.help').fadeIn(500);
     }
	 

 });