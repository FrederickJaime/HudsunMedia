



var _heroVideo_,
    _heroPause_,
    _heroOffslide_ = false,
    _workVideo_,
    _heroReel_ = false,
    _shortReel_,
    _longReel_;
 
function youtubeLoadOne(_video_source_ , _video_holder_){

            _heroVideo_ = new YT.Player(_video_holder_, {
            height: '100%',
            width: '100%',
            videoId: _video_source_,
            playerVars: { 'autoplay': 0,'controls':0,'playsinline':1,'showinfo':0,'rel':0},
            events: {
              'onReady': onPlayerReady,
              'onStateChange': onPlayerOneStateChange
               }
            });


              $( window ).scroll(function(){

                _heroPause_ = $( window ).scrollTop();
                
                if( _heroPause_ > 250){
                       if( !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
                          _heroVideo_.pauseVideo();
                        }
                      

                  }else{
                        if( !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
                              if(_heroOffslide_ == false){
                            _heroVideo_.playVideo();
                              }
                        }
                    
                    
                   
                  }
                 

                   
              
              });
               $( '#btn-reel' ).on('click',function(){
                  if(_heroReel_ == false){
                     _heroReel_ = true;
                     $( this ).css({"display":"none"});
                     $( this ).find('img').css({"display":"none"});
                     _heroVideo_.loadVideoById(_longReel_); 
                  }else{
                    
                  }
                 
               });

                 

           function onPlayerReady(event) {
              //event.target.playVideo();
              
              if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
              }else{
                event.target.playVideo();
              }
  
            }
             

           function onPlayerOneStateChange(event) {
              if (event.data == YT.PlayerState.PLAYING) {
               // console.log(player.getCurrentTime());
                console.log('playing');
                
              }

              else if(event.data == YT.PlayerState.ENDED){
                  if(_heroReel_ == true){
                    _heroReel_ = false;
                    $( '#btn-reel img,#btn-reel' ).css({"display":"block"});
                    
                    _heroVideo_.loadVideoById(_shortReel_);
                  }else{
                    _heroVideo_.playVideo();
                  }
                  
                  //$( "#"+_video_holder_ ).parent().find('.poster').css({"visibility":"visible"});
                 // playerOne.pauseVideo();
                 // playerOne.destroy();
                //  clearInterval(iOne);
                 
        
              }
      }


}

 function youtubeLoadWork(_video_source_ , _video_holder_){

            _workVideo_ = new YT.Player(_video_holder_, {
            height: '100%',
            width: '100%',
            videoId: _video_source_,
            playerVars: { 'autoplay': 0,'controls':1,'playsinline':1,'showinfo':0,'rel':0,'iv_load_policy':3},
            events: {
              'onReady': onPlayerReady,
              'onStateChange': onPlayerOneStateChange
               }
            });

            function onPlayerReady(event) {
              //event.target.playVideo();
              
              if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
              }else{
                event.target.playVideo();
              }

              
              
            }




            function onPlayerOneStateChange(event) {
                  if (event.data == YT.PlayerState.PLAYING) {
                   // console.log(player.getCurrentTime());
                    console.log('playing');
                    
                  }

                  else if(event.data == YT.PlayerState.ENDED){
                    
                     
            
                  }
              }


              
         

 }  

      function onYouTubeIframeAPIReady() {
          // function called on APIReady
          
          
          console.log('yt API Ready');
         
      }