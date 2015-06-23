/*!
 * Hud:Sun Media
 * Fredie J. May.9.15:Sat v1
 */
 /*
   
*/

   

var hudsun = (function ($) {
  // Variables - Variables available throughout the scope of this object
  // -------------------------------------------------------------------

var _scrollLoc_,
    _windowHeight_,
    _windowWidth_,
    _boxWidth_,
    _boxWidthPercent_,
    _blogBlock_,
    _blogBoxHeight_,
    _heroSlider_,
    _workSlider_,
    _aboutSlider_,
    _logoHolder_,
    animationsActive = false,
    _currentNavbutton_,
    _navMovingto_,
    _locationWork_,
    _docuHeight_,
    _mobileMenuOpen_ = false,
    _workOffset_,
    _rollOver_,
    _rollOut_,
    _formName_,
    _formEmail_,
    _formMessage_,
    _postOpen_ = false,
    _totalBlogPost_
    _totalBlogViewing_ = 0,
    _lessPost_ = false,
    _blogHeight_= 0;
    



    //FEED URLS
var wpHome = "http://www.hudsunmedia.co/wp-json/",
    wpWork = 'http://www.hudsunmedia.co/wp-json/work/',
    wpAbout = 'http://www.hudsunmedia.co/wp-json/about/',
    wpBlog = 'http://www.hudsunmedia.co/wp-json/blog/';


var wpWorkDescriptions = [],
    wpWorkVideos = [],
    wpWorkSeeMore = [],
    wpWorkTitles = [],

    wpBlogTitles = [],
    wpBlogImages = [],
    wpBlogVideos = [],
    wpBlogDescriptions = [],
    wpBlogDates = [];
    
  // Init - Anything you want to happen onLoad (usually event bindings)
  // -------------------------------------------------------------------
  var init = function () {
     
    



    //content
    _windowHeight_ = $( window ).height()-$('#nav').outerHeight();
    _windowWidth_ = $( window ).width(); 
    
    
   


    
    
    //$( '.indi-slide' ).css({height:_windowHeight_,width:"auto"});

    var imgSlideWidth = $('.indi-slide img').width();
    var imgSlideWidthHolder = $( '.swipe-wrap' ).width();
    var imgSlideOffset = (Math.abs(imgSlideWidth-imgSlideWidthHolder));
   // alert(imgSlideWidth +" "+imgSlideOffset+" "+imgSlideWidthHolder);

   /**/
   if(_windowWidth_ < 1025 && _windowWidth_ > 768){
          $( '.indi-slide img' ).each(function(){
            //$( this ).css({left:-1*(imgSlideOffset)});
          });
    }

    if( _windowWidth_ > 768){
        _boxWidth_ = $( window ).width()/4;
        _boxWidthPercent_ = (_boxWidth_/$( window ).width())*100;
        $( '#the-heroes' ).css({height:_windowHeight_}); // setting height of heroes
        $( '#video-one' ).css({height:(_windowHeight_*1.25),top:-(_windowHeight_*.15),width:"inherit"});
        $( '#the-heroes,#the-heroes #slide-1,#the-heroes #slide-2,#the-heroes #slide-3,#the-heroes #slide-4' ).css({height:_windowHeight_});
        $( "#the-work" ).css({height:_boxWidth_*2}); //setting height of work panel
    }else if( _windowWidth_ < 769){
      _boxWidth_ = $( window ).width()/2;
      _boxWidthPercent_ = (_boxWidth_/$( window ).width())*100;
      $( "#the-work" ).css({height:_boxWidth_*4}); //setting height of work panel
    }
    /**/ 
    /*sliders*/
     
    _heroSlider_ = new Swipe(document.getElementById('hero-slider'), {
      startSlide: 0,
      speed: 500,
      draggable: true,
      continuous: true,
      disableScroll: false,
      stopPropagation: false,
      callback: function(index, elem) {
        TweenLite.to("#the-heroes .slide-dots .dot", .5, {scale:1, ease:Back.easeOut}); 
        TweenLite.to("#the-heroes .slide-dots #dot-"+index, .5, {scale:1.75, ease:Back.easeOut}); 
        TweenLite.set("#the-heroes .slide-dots .dot", {"border":"0px solid #ff3333","background":"#aeaeae"});
        TweenLite.set("#the-heroes .slide-dots #dot-"+index, {"border":"2px solid #ff3333","background":"none"});

        if(index >0){
            _heroVideo_.pauseVideo();
            _heroOffslide_ = true;
          
        }else{
            _heroVideo_.playVideo();
            _heroOffslide_ = false;
        }

      },
      transitionEnd: function(index, elem) {
      }
    });
    $( '#the-heroes #btn-arrow-right' ).on('click',function(){_heroSlider_.next()});
    $( '#the-heroes #btn-arrow-left' ).on('click',function(){_heroSlider_.prev()});

      $( '#the-heroes .arrow, #the-about .arrow, #the-work .arrow' ).on('mouseover',function(){
          $( this ).find('.bg-color').css({"background":"#ff3333",opacity:1});
      }).on('mouseleave',function(){
          $( this ).find('.bg-color').css({"background":"#ffffff",opacity:.5});
      })

    $( '#the-heroes .slide-dots .dot' ).on('click',function(){
          var _slideTo_ = Number($( this ).attr('data-dot'));
          _heroSlider_.slide(_slideTo_);
    });




    _aboutSlider_ = new Swipe(document.getElementById('about-slider'), {
      startSlide: 0,
      speed: 500,
      draggable: true,
      continuous: true,
      disableScroll: false,
      stopPropagation: false,
      callback: function(indexA, elem) {
        TweenLite.to("#the-about .slide-dots .dot", .5, {scale:1, ease:Back.easeOut}); 
        TweenLite.to("#the-about .slide-dots #dot-"+indexA, .5, {scale:1.75, ease:Back.easeOut}); 
        TweenLite.set("#the-about .slide-dots .dot", {"border":"0px solid #ff3333","background":"#aeaeae"});
        TweenLite.set("#the-about .slide-dots #dot-"+indexA, {"border":"2px solid #ff3333","background":"none"});
      },
      transitionEnd: function(index, elem) {}
    });
    $( '#the-about #btn-about-arrow-right' ).on('click',function(){_aboutSlider_.next()});
    $( '#the-about #btn-about-arrow-left' ).on('click',function(){_aboutSlider_.prev()});
     //_heroSlider_.next();
    $( '#the-about .slide-dots .dot' ).on('click',function(){
          var _slideTo_ = Number($( this ).attr('data-dot'));
          _aboutSlider_.slide(_slideTo_);
    });


    _workSlider_ = new Swipe(document.getElementById('work-slider'), {
      startSlide: 0,
      speed: 500,
      draggable: true,
      continuous: false,
      disableScroll: false,
      stopPropagation: false,
      callback: function(index, elem) {
      
        TweenLite.to("#the-work .slide-dots .dot", .5, {scale:1, ease:Back.easeOut}); 
        TweenLite.to("#the-work .slide-dots #work-dot-"+index, .5, {scale:1.75, ease:Back.easeOut}); 
        TweenLite.set("#the-work .slide-dots .dot", {"border":"0px solid #ff3333","background":"#aeaeae"});
        TweenLite.set("#the-work .slide-dots #work-dot-"+index, {"border":"2px solid #ff3333","background":"none"});

      },
      transitionEnd: function(index, elem) {}
    });
    $( '#the-work #btn-work-arrow-right' ).on('click',function(){_workSlider_.next()});
    $( '#the-work #btn-work-arrow-left' ).on('click',function(){_workSlider_.prev()});
    
    

     //_heroSlider_.next();
    $( '#the-work .slide-dots .dot' ).on('click',function(){
          var _slideTo_ = Number($( this ).attr('data-dot'));
          _workSlider_.slide(_slideTo_);
    });

   // TweenLite.ticker.fps(30);// frameRate
    
    
    $( "#the-work .box" ).css({height:_boxWidth_,width:_boxWidthPercent_+"%"}); //setting box
    //$( "#the-work .box .ro-color p" ).each(function(){// centering labels on work tiles
         //centerObjects(".ro-color", this);
    //});
    TweenLite.set("#the-work .box .ro-color p", {scale:1.5});
    TweenLite.set(".slide-dots #dot-0", {scale:1.75,"border":"2px solid #ff3333","background":"none"});
    
  
    
   
     /*------------------------*/
     /*------------------------*/





    $( window ).resize(function(){
      
       _windowHeight_ = $( window ).height()-$('#nav').outerHeight(); 
       _windowWidth_ = $( window ).width(); 
      $( '#the-heroes,#the-heroes #slide-1,#the-heroes #slide-2,#the-heroes #slide-3,#the-heroes #slide-4' ).css({height:_windowHeight_});
      /*------------------------*/
     
      if( _windowWidth_ > 768){
         _boxWidth_ = $( window ).width()/4;
         $( "#the-work" ).css({height:_boxWidth_*2});
         $( '#video-one' ).css({height:(_windowHeight_*1.25),top:-(_windowHeight_*.15),width:"inherit"});
      }else if( _windowWidth_ < 769){
         $( '#video-one' ).css({height:$( '#the-heroes' ).height(),top:0});
         _boxWidth_ = $( window ).width()/2;
         $( "#the-work" ).css({height:_boxWidth_*4});
         //alert(0)
         

      }
      /*------------------------*/
      _boxWidthPercent_ = (_boxWidth_/$( window ).width())*100;
      /*------------------------*/
      $( "#the-work .box" ).css({height:_boxWidth_,width:_boxWidthPercent_+"%"});
      /*------------------------*/
      /*
      $( "#the-work .box .ro-color p" ).each(function(){
       centerObjects(".box", this);
      });
      */
      /*------------------------*/

       _blogBoxHeight_ = $( '#the-blog .section .blog-block .blog-image' ).outerHeight();
       $( '#the-blog .section .blog-block .blog-summary' ).css({height:_blogBoxHeight_});
       /*------------------------*/
        /*
        $( "#the-offices .office p" ).each(function(){
         centerObjects(".office", this);
        });
        */
        /*------------------------*/
       // 
        /*------------------------*/


        /*------------------------*/
        if(_windowWidth_ < 1025 && _windowWidth_ > 768){
          $( '.indi-slide img' ).each(function(){
            //$( this ).css({left:-1*(imgSlideOffset)});
          });
        }
        
    });

 


/* WINDOW SCROLL : BEGIN */

	$( window ).scroll(function(){

		_scrollLoc_ = $( window ).scrollTop();
   //_workOffset_ = $( '#the-work' ).offset().top;
		
    
			if( _scrollLoc_ > 1){

				$( " #nav ").css({"position":"fixed"});
        $( " #nav .section-bg ").stop().animate({opacity:.95},125);
				

			}else{
				$( " #nav ").css({"position":"absolute"});
        $( " #nav .section-bg ").stop().animate({opacity:1},125);
				
			}

      
           
        
      
  
	});

	

/* WINDOW SCROLL : END*/

/*
imagesLoaded( '#the-offices .office', function() {
  $( "#the-offices .office p" ).each(function(){// centering labels on work tiles
         centerObjects(".office", this);
    });
});
  
  */
     
    
 wpFeeds();
getWorkFeed();

};




  // FUNCTIONS
  // ===================================================================
  // ===================================================================
  // ===================================================================
  var centerObjects = function( theContainer, theTarget){

    TweenLite.to(theTarget, 0, {
              top:($( theContainer ).height()-$( theTarget ).height())/2,
              left:($( theContainer ).width()-$( theTarget ).width())/2,
              ease:Quint.easeOut});   
  }



  function youtube_parser(url){
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    var match = url.match(regExp);
    if (match&&match[7].length==11){
        return match[7];
    }else{
        console.log("NO YOUTUBE URL");
    }
  }








  var workDisplay = function( theBox ){
    

     var overlayTitle = wpWorkTitles[theBox.attr('data-block')],
     overlayDesc = wpWorkDescriptions[theBox.attr('data-block')],
     overlayVideo = youtube_parser(wpWorkVideos[theBox.attr('data-block')]),
     seeMoreLink = wpWorkSeeMore[theBox.attr('data-block')];

    
     if(seeMoreLink != "no see more video link"){

       $( '.video-overlay .content .see-more-btn' ).attr('href',seeMoreLink);
       $( '.video-overlay .content .see-more-btn' ).addClass('active-see-more');
     }
   


     
     $( ".video-overlay" ).scrollTop( 0 );
     $( '.video-overlay .content h2' ).html(overlayTitle);
     $( '.video-overlay .content .video-description' ).html(overlayDesc);

      $( '.video-bg-color' ).css({"visibility":"visible",height:$(document).height()});     

     $('.video-overlay').css({"visibility":"visible"});
     $('.video-bg-color').stop().animate({opacity:.75});
    $('.video-overlay').stop().animate({opacity:1},function(){
       youtubeLoadWork(overlayVideo,'work-video');
    });
    $('body,html').css({"overflow":"hidden"});
     
    //
      //alert(theBox.index());

  }


var workingBlockClicking = function(){
  

      /* WORK BLOCKS*/
      /*
  $( "#the-work .box .ro-color p" ).each(function(){// centering labels on work tiles
             centerObjects(".box", $(this));
            });
          */    
  $( '#the-work .box' ).on('mouseover',function(){
      $( this ).find('img').addClass('contrast-me');
    // $( this ).find('.ro-color').css({opacity:.7});
      $( this ).find('img').css({opacity:.25});
      TweenLite.to( $( this ).find('img') , .5, {scale:1.25, delay:0,ease:Sine.easeOut});
      TweenLite.to( $( this ).find('.ro-color p') , .8, {opacity:1,scale:1, delay:0,ease:Back.easeOut});
      //centerObjects(".box", $(this));


  }).on('mouseleave',function(){
      $( this ).find('img').removeClass('contrast-me');
      //$( this ).find('.ro-color').css({opacity:.0});
      $( this ).find('img').css({opacity:1});
      TweenLite.to( $( this ).find('img') , .6, {scale:1, delay:0,ease:Sine.easeIn});
      TweenLite.to( $( this ).find('.ro-color p') , .8, {opacity:0,scale:1.5, delay:0,ease:Back.easeOut});
  }).on('click',function(){

      workDisplay($( this ));
      
  });

  

}

var aboutBlockClicking = function(){
  

    
   _windowWidth_ = $( window ).width(); 

   if( _windowWidth_ < 737){

   }else{
          $( '#about-slide-2 .staff-box' ).on('mouseover',function(){
          $( this ).find('img').addClass('contrast-me');
        // $( this ).find('.ro-color').css({opacity:.7});
          $( this ).find('img').css({opacity:.25});
          TweenLite.to( $( this ).find('img') , .5, {scale:1.25, delay:0,ease:Sine.easeOut});
          TweenLite.to( $( this ).find('.ro-color p') , .8, {opacity:1,scale:1, delay:0,ease:Back.easeOut});

          }).on('mouseleave',function(){
              $( this ).find('img').removeClass('contrast-me');
              //$( this ).find('.ro-color').css({opacity:.0});
              $( this ).find('img').css({opacity:1});
              TweenLite.to( $( this ).find('img') , .6, {scale:1, delay:0,ease:Sine.easeIn});
              TweenLite.to( $( this ).find('.ro-color p') , .8, {opacity:0,scale:1.5, delay:0,ease:Back.easeOut});
          });
   }

  
     
  

  

}


var blogBlockClicking = function(){

      imagesLoaded( '.blog-block', function() {
        TweenLite.to( $( '.blog-block' ) , .8, {opacity:1,delay:0,ease:Sine.easeOut});
    });
     //$( '.blog-block' ).stop().animate({opacity:1});

    $( '.blog-block' ).on('mouseover',function(){
    _blogBlock_ = this ;
   
    
    $( _blogBlock_ ).find('.blog-summary .ro-color').css({opacity:1});
    $( _blogBlock_ ).find('.blog-summary').css({color:"#ffffff"});
    $( _blogBlock_ ).find('.blog-summary,.blog-summary a').css({color:"#ffffff","border-color":"#ffffff"});
    TweenLite.to( $( _blogBlock_ ).find('.blog-image img') , .7, {scale:1.125, delay:0,ease:Sine.easeOut});

  }).on('mouseleave',function(){
    $( _blogBlock_ ).find('.blog-summary .ro-color').css({opacity:0});
    $( _blogBlock_ ).find('.blog-summary').css({color:"#3c3c3c"});
    $( _blogBlock_ ).find('.blog-summary,.blog-summary a').css({color:"#3c3c3c","border-color":"#3c3c3c"});
    TweenLite.to( $( _blogBlock_ ).find('.blog-image img') , .7, {scale:1, delay:0,ease:Sine.easeOut});
  }).on('click',function(){
   
    blogPosts($( _blogBlock_ ).attr('data-post-number'));
    

});




  $( '.post-back-btn' ).on('click',function(){
      TweenLite.to( $( '#the-individual-posts' ) , .6, {left:"-100%", delay:0,ease:Sine.easeOut});
      TweenLite.to( $( '.post-back-btn' ) , .4, {left:-80, delay:0,ease:Sine.easeOut});
      $('body,html').css({"overflow":"auto"});
      _postOpen_  = false;
  })

}


var blogPosts = function( blogPostId ){
 

  $( '#the-individual-posts .section .post-image' ).html('<img src="'+wpBlogImages[blogPostId]+'" alt="'+wpBlogTitles[blogPostId]+'"/>');
  $( '#the-individual-posts .section .date' ).html(wpBlogDates[blogPostId]);
  $( '#the-individual-posts .section h2' ).html(wpBlogTitles[blogPostId]);
  $( '#the-individual-posts .section .copy' ).html(wpBlogDescriptions[blogPostId]);


  imagesLoaded( '#the-individual-posts .section .post-image', function() {
    _postOpen_  = true;
   
    TweenLite.to( $( '#the-individual-posts' ) , .8, {left:"0%", delay:0,ease:Sine.easeOut,onComplete:function(){
      $('body,html').css({"overflow":"hidden"});
    }});
    TweenLite.to( $( '.post-back-btn' ) , .7, {left:20, delay:1,ease:Sine.easeOut});

});
  /*
  wpBlogTitles = [],
    wpBlogImages = [],
    wpBlogVideos = [],
    wpBlogDescriptions = [],
    wpBlogDates = [];
  */


  


}

var formSubmission = function(){


                 $.ajax({
                    method: 'POST',
                    url: 'http://www.hudsunmedia.co/wp-json/send-contact/',
                    data: $('form').serialize()
                    
                  })
                  .done(function (data) {
                    if (data.success) {

                      console.log('success');
                      
                    }
                    else {
                      
                      console.log('error : data not sent')
                    }
                  })
                  .fail(function () {
                    
                  })
                  .always(function () {
                    
                  });




}


  // ===================================================================
  // ===================================================================
  // ===================================================================
    // ===================================================================
  // ===================================================================
  // ===================================================================
    // ===================================================================
  // ===================================================================
  // ===================================================================
    // ===================================================================
  // ===================================================================
  // ===================================================================

var wpFeeds = function(){

  //home
  $.getJSON(wpHome, function(result){
    format: "json"

        $.each(result, function(wpHomeLabel, wpHomeValue){
        // console.log(wpHomeLabel+" : "+wpHomeValue);

            switch (wpHomeLabel) {
        case "reel":
              _longReel_ = youtube_parser(wpHomeValue[0].long_video);
              _shortReel_ = youtube_parser(wpHomeValue[0].short_video);
               youtubeLoadOne( _shortReel_ , "video-one" );
        break;
        case "slides":
              
              for (var homeSlides = 0; homeSlides < wpHomeValue.length; homeSlides++) {
                  
                  $("#the-heroes #hero-slider #slide-"+(homeSlides+1)).attr('data-block',(wpHomeValue[homeSlides].work_pairing-1));
                  $("#the-heroes #hero-slider #slide-"+(homeSlides+1)).find('img').attr('src',wpHomeValue[homeSlides].image_slide);
              }
        break;
        case "who_we_are":
             var topLine = wpHomeValue.substr(0, 17);
             var botline = wpHomeValue.substr(17, (wpHomeValue.length+1));
            
             $('#the-callout h1').html(topLine+'<span>'+botline+'</span>');
            break;
        case "where_we_work":
             var topLine = wpHomeValue.substr(0, 20);
             var botline = wpHomeValue.substr(20, (wpHomeValue.length+1));
             $('#the-callout p').html(topLine+'<span>'+botline+'</span>');
            break;
        case "cta_text":
             $('#the-callout a').html(wpHomeValue);
            break;
        
      }

        })

       
    }).done(function() {
      
    
    
  })




}
/*

  

*/

  var getWorkFeed = function(){
    
    $.getJSON(wpWork, function(result){
      format: "json"
          $.each(result, function(wpWorkLabel, wpWorkValue){
            //console.log(wpWorkValue);
             
              switch (wpWorkLabel) {
          case "work":
               for (var boxed = 0; boxed < wpWorkValue.length; boxed++) {

                  //console.log(wpWorkValue[boxed].name);
                  //console.log(wpWorkValue[boxed].background);
                  //console.log(wpWorkValue[boxed].youtube);
                  //console.log(wpWorkValue[boxed].description);
                  //console.log(wpWorkValue[boxed].see_more_link);

                  wpWorkDescriptions.push(wpWorkValue[boxed].description);
                  wpWorkTitles.push(wpWorkValue[boxed].name);
                  if(wpWorkValue[boxed].youtube == ""){
                    wpWorkVideos.push("no video");
                    
                  }else{
                    wpWorkVideos.push(wpWorkValue[boxed].youtube); 
                  }
                  if(wpWorkValue[boxed].see_more_link == ""){
                    wpWorkSeeMore.push("no see more video link");
                  }else{
                    wpWorkSeeMore.push(wpWorkValue[boxed].see_more_link);
                  }
                  
                  var workBox = '<div class="box" data-block="'+boxed+'">'+
                    '<div class="ro-color"><p>'+wpWorkValue[boxed].name+'</p></div>'+
                    '<img class="saturate-me" src="'+wpWorkValue[boxed].background+'"/></div>';
                  
                  if( boxed < 8){
                    $( '#the-work #work-slider .swipe-wrap #work-slide-0' ).append(workBox);
                  }else{
                   // $( '#the-work #work-slider .swipe-wrap #work-slide-1' ).append(workBox);
                  }
                  

             
               };
              break;
          case "clients":
              
                //console.log(wpWorkValue.length);
                for (var l = 0; l < wpWorkValue.length; l++) {
                  //console.log(wpWorkValue[l].logo);

                  _logoHolder_ = '<div id="logo-'+l+'" class="logo-set"><img src="'+wpWorkValue[l].logo+'"/></div>';
                  $('#the-client-logo .section').append(_logoHolder_);
                };
                
              break;
          
          
        }

          });
         
      }).done(function() {
          
        TweenLite.to( $(  "#the-work .box"  ) , 0, {
              height:_boxWidth_,
              width:_boxWidthPercent_+"%",
              delay:.0,ease:Sine.easeOut,onComplete:function(){

                TweenLite.to( $(  "#the-work .box"  ) , .25, {
                  opacity:1,
                  delay:.0
                });
              }

              });
        
            

            workingBlockClicking();
            getAboutFeed();

      });
  }

  var getAboutFeed = function(){
    $.getJSON(wpAbout, function(result){
      format: "json"
          $.each(result, function(wpAboutLabel, wpAboutValue){
             //console.log(wpAboutLabel);
             
              switch (wpAboutLabel) {

          case "sliders":
              //console.log(wpAboutValue);
              for (var slided = 0; slided < wpAboutValue.length; slided++) {
                 // console.log(wpAboutValue[slided].heading);
                  $('#about-slider #about-slide-'+slided+' h2').html(wpAboutValue[slided].heading);

                  if(slided == 0){
                   
                    $('#about-slider #about-slide-'+slided+' #about-hudson-image').html('<img src="'+wpAboutValue[slided].image+'"/>');
                    $('#about-slider #about-slide-'+slided+' #about-hudson-copy').html(wpAboutValue[slided].text);

                  }

                  if(slided == wpAboutValue.length-1){
                   // console.log(wpAboutValue[slided].people);

                    for (var team = 0; team < wpAboutValue[slided].people.length; team++) {
                          
                         // console.log(wpAboutValue[slided].people[team].headshot)
                         // console.log(wpAboutValue[slided].people[team].name);
                         // console.log(wpAboutValue[slided].people[team].title)

                          var staffBox = '<div class="staff-box" data-block="'+team+'">'+
                                        '<div class="ro-color"><p><span class="name">'+wpAboutValue[slided].people[team].name+'</span>'+
                                        '<span class="role">'+wpAboutValue[slided].people[team].title+'</span></p></div>'+
                                        '<img class="saturate-me" src="'+wpAboutValue[slided].people[team].headshot+'"/></div>';

                          $( '#about-slide-2 .staff-holder' ).append(staffBox);


                    };

                  }


                  
              }
              
              break;
          case "services":
             // console.log(wpAboutValue);
                
              break;
          
          
        }

          });
         
      }).done(function() {
          
        
        
            aboutBlockClicking();
            getBlogFeed();
          

      });
  }

var getBlogFeed = function(){
  _windowWidth_ = $( window ).width(); 
    $.getJSON(wpBlog, function(result){
      format: "json"
          $.each(result, function(wpBlogLabel, wpBlogValue){
              _totalBlogPost_ = wpBlogValue;
             for (var blogbox = 0; blogbox < wpBlogValue.length; blogbox++) {
               

                wpBlogTitles.push(wpBlogValue[blogbox].title);
                wpBlogDates.push(wpBlogValue[blogbox].date);
                wpBlogImages.push(wpBlogValue[blogbox].thumbnail);
                wpBlogDescriptions.push(wpBlogValue[blogbox].content);


                if(wpBlogValue[blogbox].youtube == ""){
                  wpBlogVideos.push("no video");
                }else{
                  wpBlogVideos.push(wpBlogValue[blogbox].youtube);
                }
                if( _windowWidth_ > 768 ) {
                  var blogPost = '<div class="blog-block" data-post-number="'+blogbox+'">'+
                                '<div class="blog-image">'+
                                '<img src="'+wpBlogValue[blogbox].thumbnail+'" alt="'+wpBlogValue[blogbox].title+'"/></div>'+
                                '<div class="blog-summary">'+
                                '<p class="date">'+wpBlogValue[blogbox].date+'</p>'+
                                '<h2>'+wpBlogValue[blogbox].title+'</h2>'+
                                '<a href="javascript:void(0);" class="read-more" data-post"'+blogbox+'">read more</a>'+
                                '<div class="ro-color"></div></div></div>';
                }else{
                  var blogPost = '<div class="blog-block" data-post-number="'+blogbox+'">'+
                                '<div class="blog-image"></div>'+
                                '<div class="blog-summary">'+
                                '<p class="date">'+wpBlogValue[blogbox].date+'</p>'+
                                '<h2>'+wpBlogValue[blogbox].title+'</h2>'+
                                '<a href="javascript:void(0);" class="read-more" data-post"'+blogbox+'">read more</a>'+
                                '<div class="ro-color"></div></div></div>';
                }
                

                if( blogbox < 3){
                  $( '#the-blog #blog-post-holder' ).append(blogPost);
                  _totalBlogViewing_++;
                }
                

             }
            
            
          });
         
      }).done(function(wpBlogValue) {
          
        console.log(_totalBlogPost_.length+' '+_totalBlogViewing_);
        
        blogBlockClicking();  

      });
}


var additionalPost = function( postStart, postEnd , postNum ){
    windowWidth_ = $( window ).width();
    if( _windowWidth_ < 415 ) {
      var blockHeight = ($('#the-blog .section .blog-block').height()*postNum)+(5*postNum);
    }else{
      var blockHeight = ($('#the-blog .section .blog-block').height()*postNum)+(50*postNum);
    }
    
    
    for (var blogbox = postStart; blogbox < postEnd; blogbox++) {
          if( _windowWidth_ > 768 ) {
            var blogPost = '<div class="blog-block" data-post-number="'+blogbox+'">'+
                                    '<div class="blog-image">'+
                                    '<img src="'+wpBlogImages[blogbox]+'" alt="'+wpBlogTitles[blogbox]+'"/></div>'+
                                    '<div class="blog-summary">'+
                                    '<p class="date">'+wpBlogDates[blogbox]+'</p>'+
                                    '<h2>'+wpBlogTitles[blogbox]+'</h2>'+
                                    '<a href="javascript:void(0)" class="read-more" data-post"'+blogbox+'">read more</a>'+
                                    '<div class="ro-color"></div></div></div>';
          }else{
            var blogPost = '<div class="blog-block" data-post-number="'+blogbox+'">'+
                                    '<div class="blog-image"></div>'+
                                    '<div class="blog-summary">'+
                                    '<p class="date">'+wpBlogDates[blogbox]+'</p>'+
                                    '<h2>'+wpBlogTitles[blogbox]+'</h2>'+
                                    '<a href="javascript:void(0)" class="read-more" data-post"'+blogbox+'">read more</a>'+
                                    '<div class="ro-color"></div></div></div>';
          }
          


       
         $( '#the-blog #blog-post-holder' ).append(blogPost);
          _totalBlogViewing_++;
          blogBlockClicking();

        
        

    }
         _scrollLoc_ = $( window ).scrollTop();
         if( !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
                      TweenLite.to($( '#the-blog' ), 1, {height:"+="+(blockHeight), ease:Sine.easeOut});
          TweenLite.to(window, 1, {scrollTo:{y:_scrollLoc_+(blockHeight)}, ease:Sine.easeOut,onComplete:function(){
            if((_totalBlogPost_.length-_totalBlogViewing_) == 0){
                TweenMax.to($( '#the-blog .more-post-btn p' ), .5, {autoAlpha:0, ease:Sine.easeOut});
            }
          }});
         }else{

                    TweenLite.to($( '#the-blog' ), 1, {height:"+="+(blockHeight), ease:Sine.easeOut});
          TweenLite.to(window, 1, {scrollTo:{y:_scrollLoc_+(blockHeight)}, ease:Sine.easeOut,onComplete:function(){
            if((_totalBlogPost_.length-_totalBlogViewing_) == 0){
                TweenMax.to($( '#the-blog .more-post-btn p' ), .5, {autoAlpha:0, ease:Sine.easeOut});
            }
          }});


         }


   

}




  // ===================================================================
  // ===================================================================
  // ===================================================================
    // ===================================================================
  // ===================================================================
  // ===================================================================
    // ===================================================================
  // ===================================================================
  // ===================================================================
    // ===================================================================
  // ===================================================================
  // ===================================================================


  // CLICKING
  // ===================================================================
    /*------------------------*/
  
  $('#nav .section a,#the-callout a').on('click',function(event){
    event.preventDefault();
    _currentNavbutton_ = $( this );
    _scrollLoc_ = $( window ).scrollTop();
    _navMovingto_ = "#"+_currentNavbutton_.attr('data-section');
    _docuHeight_ = $( document ).height();
    _workOffset_ = $( _navMovingto_ ).offset();
    var working = $('#the-work').offset();
    var postOpenDelay;
    if(_postOpen_){
       postOpenDelay = 150;
       $( '.post-back-btn' ).click();
    }else{
       postOpenDelay = 0;
    }
    
   
    setTimeout(function(){

        if( _scrollLoc_ == 00 && _navMovingto_ == "#the-work"){
        TweenLite.to(window, 2, {scrollTo:{y:_workOffset_.top-($('#the-heroes').height()*.78)}, ease:Sine.easeOut});
        }else if( _scrollLoc_ == 0){
          TweenLite.to(window, 2, {scrollTo:{y:_workOffset_.top-($('#the-heroes').height()*1.07)}, ease:Sine.easeOut});
        }
        else if(_navMovingto_ == "#the-heroes"){
          TweenLite.to(window, 2, {scrollTo:{y:0}, ease:Sine.easeOut});
        }
        else if(_navMovingto_ == "#the-about-callout"){
          _aboutSlider_.slide(0);
          TweenLite.to(window, 2, {scrollTo:{y:$('#the-about').offset().top-($('#the-heroes').height()*1.15)}, ease:Sine.easeOut});
        }
        
        else if(_scrollLoc_ !=0){
          TweenLite.to(window, 2, {scrollTo:{y:_workOffset_.top-65}, ease:Sine.easeOut});
        }


       }, postOpenDelay);



   // alert($(document).height()); 
   
    
  });

$('#slide-1,#slide-2,#slide-3').on('click',function(){
  workDisplay($( this ));
});



  


$('.video-overlay').on('click',function(){
        $('body,html').css({"overflow":"auto"});
        
        $('.video-overlay,.video-bg-color').stop().animate({opacity:0},function(){
          $('.video-overlay,.video-bg-color').css({"visibility":"hidden"});
          $('.video-bg-color').css({height:0});
            _workVideo_.pauseVideo();
            _workVideo_.destroy();
            $( '.video-overlay .content .see-more-btn' ).removeClass('active-see-more');
        });
});
  /*------------------------*/
  /*------------------------*/
  /*------------------------*/
  /* BLOG BLOCKS*/

     
      //prev() 
  //
/*------------------------*/
  /*------------------------*/
  /*------------------------*/
  $('.office').on('mouseover',function(){
      $( this ).find('img').css({opacity:.25});
      TweenLite.to( $( this ).find('img') , .5, {scale:1.25, delay:0,ease:Sine.easeOut});
  }).on('mouseleave',function(){
      $( this ).find('img').css({opacity:1});
      TweenLite.to( $( this ).find('img') , .6, {scale:1, delay:0,ease:Sine.easeIn});
  }).on('click',function(){
    var whichOffice = $( this ).attr('id');
      if(whichOffice =="nyc-office"){
        window.open('https://www.google.com/maps/place/200+Varick+St,+New+York,+NY+10014/@40.7281648,-74.0051398,17z/data=!3m1!4b1!4m2!3m1!1s0x89c2598d61662fc3:0x574579678a5346e4', '_blank');
      }else{
        window.open('https://www.google.com/maps/place/8800+Sunset+Blvd,+West+Hollywood,+CA+90069/@34.0903333,-118.3832903,17z/data=!3m1!4b1!4m2!3m1!1s0x80c2bea36e74e283:0x1e542963131171e', '_blank');
      }
  })
 


  $( '.burger' ).on('click',function(){
    if(_mobileMenuOpen_ == false){
      _mobileMenuOpen_ = true;
      TweenLite.to( $( '#mobile-menu' ) , .5, {height:"100%", delay:0,ease:Sine.easeIn});
      TweenLite.to( $( '#mobile-menu .bg-color' ) , .25, {opacity:1, delay:0,ease:Sine.easeIn});
      TweenLite.to( $( '#mobile-menu #bar-1' ) , .35, {top:10,rotation:45, delay:0,ease:Sine.easeIn});
      TweenLite.to( $( '#mobile-menu #bar-2' ) , .35, {rotation:-225, delay:0,ease:Sine.easeIn});
      TweenLite.to( $( '#mobile-menu #bar-3' ) , .35, {top:-10,rotation:-45, delay:0,ease:Sine.easeIn});

      $('#mobile-menu .links').css({"visibility":"visible"});
      TweenMax.staggerTo($('#mobile-menu .links a'), .35, {opacity:1,ease:Sine.easeIn}, 0.2);

      $('#mobile-menu .content .burger .bar').css({"background":"#000000"});
      $( '#mobile-menu .content #home img' ).attr('src','img/hm-logo-black.png');
      
    }else{
      _mobileMenuOpen_ = false;
      TweenLite.to( $( '#mobile-menu' ) , .25, {height:100, delay:0,ease:Sine.easeIn});
      TweenLite.to( $( '#mobile-menu .bg-color' ) , .5, {opacity:0, delay:0,ease:Sine.easeIn});
      TweenLite.to( $( '#mobile-menu #bar-1' ) , .35, {top:0,rotation:0, delay:0,ease:Sine.easeIn});
      TweenLite.to( $( '#mobile-menu #bar-2' ) , .35, {rotation:0, delay:0,ease:Sine.easeIn});
      TweenLite.to( $( '#mobile-menu #bar-3' ) , .35, {top:0,rotation:0, delay:0,ease:Sine.easeIn});
      $( '#mobile-menu .content #home img' ).attr('src','img/hm-logoB.png');
      $('#mobile-menu .content .burger .bar').css({"background":"#cc3333"});
      TweenMax.staggerTo($('#mobile-menu .links a'), .15, {opacity:0,ease:Sine.easeIn}, 0.1);
    }
      
  });


  $('.social-follow a').on('mouseover',function(){
      _rollOver_ = $( this ).attr('data-ro');
      _rollOut_ = $( this ).find('img').attr('src');
      $( this ).find('img').attr('src','img/'+_rollOver_);
  }).on('mouseleave',function(){
      $( this ).find('img').attr('src',_rollOut_);
  });



$('#mobile-menu #home').on('click',function(event){
  event.preventDefault();
  if(_mobileMenuOpen_ == true){
    $( '.burger' ).click();
  }
  TweenLite.to(window, 1.5, {scrollTo:{y:0}, ease:Sine.easeOut});
  if(_postOpen_  == true){
    $( '.post-back-btn' ).click();
  }
})
$('#mobile-menu .links a').on('click',function(event){
  event.preventDefault();
  var goingTo = "#"+$( this ).attr('data-section');
  TweenLite.to(window, 1.5, {scrollTo:{y:$(goingTo).offset().top}, ease:Sine.easeOut});
  $( '.burger' ).click();
  if(_postOpen_  == true){
    $( '.post-back-btn' ).click();
  }
});




/* MORE BLOG POST BUTTON : BEGIN */
$( '#the-blog .more-post-btn .section p' ).on('click',function(){

    var blogDifference = (_totalBlogPost_.length-1)-(_totalBlogViewing_-1);
    var nextSet = _totalBlogViewing_+3;

    if(!_lessPost_){
      _lessPost_ = true;
      _blogSectionHeight_ = $('#the-blog').outerHeight();
     
      TweenMax.to($('#less-post'), .5, {autoAlpha:1, ease:Sine.easeOut});
    }

   if(blogDifference < 3){
       if(blogDifference != 0){
         additionalPost( _totalBlogViewing_ , (_totalBlogViewing_+blogDifference) , blogDifference);
       }
       

   }
   else{
        additionalPost( _totalBlogViewing_ , nextSet , 3);
   }

});
/* MORE BLOG POST BUTTON : END */


/* LESS BLOG BUTTON */
$('#less-post').on('click', function(){

  console.log(_totalBlogPost_.length+' '+_totalBlogViewing_);


  TweenLite.to(window, .5, {scrollTo:{y:$( '#the-blog' ).offset().top-65}, ease:Sine.easeOut});
  TweenMax.to($( '#the-blog' ), .5, {height:_blogSectionHeight_, ease:Sine.easeOut,onComplete:function(){

    $('#the-blog .section .blog-block').each(function(index){
      if( index > 2 ){
        $( this ).remove();
      }
      
    });
    _totalBlogViewing_ = 3;
    
    TweenMax.to($( '#less-post' ), .5, {autoAlpha:0, ease:Sine.easeOut});
    TweenMax.to($( '#the-blog .more-post-btn .section p' ), .5, {autoAlpha:1, ease:Sine.easeOut});
    _lessPost_ = false;
  }});
});


$('#ContactForm').submit(function(e){

    e.preventDefault();
    $form = $(this);
    $.ajax( {
      
      method: "POST",
      url: $form.attr('action'),
      data: { 
        hm_name: $('input[name=hm_name]').val(), 
        hm_email: $('input[name=hm_email]').val(), 
        hm_message: $('textarea[name=hm_message]').val() 
      } 
  
      });
  });





  // CLEANUP
  // ===================================================================

  // Return - Which variables and objects to make available publicly
  // -------------------------------------------------------------------
  return {
    init              : init
  };
})(jQuery);


$(document).ready(function () {    hudsun.init();    });

  









