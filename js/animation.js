// NEED TO CHANGE SO THIS IS NOT TRIGGER ON TOUCH DEVICES SCROLL FUNCTION 


function animationSetting(){
	animationsActive = true;
	
	
	var callout_ani = new TimelineMax({paused:true});
	//callout_ani.to($("#the-callout"), 25, {css:{marginTop:"-=100%"}}, 0 );
	callout_ani.to($("#the-heroes"), 20, {height:0}, 0 );

	
	var work_ani = new TimelineMax({paused:true});
	work_ani.from($("#the-work"), 20, {top:"-=250px"}, 0 );

/*
	var service_ani = new TimelineMax({paused:true});
	service_ani.to($("#the-about"), 20, {height:"-=50px"}, 0 );

	
	var office_ani = new TimelineMax({paused:true});
	office_ani.to($("#the-blog"), 20, {height:0}, 0 );
	*/
	

	$(window).scroll(function(){


		/* SCROLLING ANIMATION SYNC FUNCTION : BEGIN */
		var getVert = $(this).scrollTop();

		//_scrollLoc_ = $(window).scrollTop();
		//console.log(getVert+"<-- SCROLL SPOT ");
		var getHor = $(this).scrollLeft();
			
		function scrollTween(startPoint, endPoint, tweenName, type)	
		{
			var progressNumber;
			if(type == 'vertical')
			{
				progressNumber = (1 / (endPoint - startPoint)) * (getVert - startPoint);
			}
			else if (type == 'horizontal')
			{
				progressNumber = (1 / (endPoint - startPoint)) * (getHor - startPoint);
			}
			if (progressNumber >= 0 && progressNumber <= 1)
			{
				tweenName.progress(progressNumber);
			}
			else if(progressNumber < 0)
			{
				tweenName.progress(0);
			}
			else if(progressNumber > 1)
			{
				tweenName.progress(1);
			}
		}

		/* SCROLLING ANIMATION SYNC FUNCTION : BEGIN */

		/*  INDIVIDUAL ANIMATIONS  CALLED */
		if(_windowWidth_ > 700){
			
			var callout = $("#the-callout").offset();
			var service = $("#the-about").offset();
			//var office  = $("#the-offices").offset();
   
			scrollTween(0, 900, callout_ani, 'vertical');
			scrollTween(0, 900, work_ani, 'vertical');
			//scrollTween((service.top-100), 5000, service_ani, 'vertical');
			//scrollTween((office.top-700), 8000, office_ani, 'vertical');
			
		}else{
			
		}
		

		
		
	
		
});
		

}

_windowWidth_ = $( window ).width(); 
if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
 		


		



	}
else{


		 if( _windowWidth_ > 700 ){
		 	animationsActive = true;
		 	
 	/* GRID ANIMATION : BEGIN*/
 			animationSetting();
 		

/* SECTION 5 : END */
 
			}







}