/*  TABLE OF CONTENT
    1. Common function
    2. Initialing
*/
/*================================================================*/
/*  1. Common function
/*================================================================*/
paceOptions = {
    elements: true
};
var trackIndex=0;
var sfApp={
    scrollTimer:null,    
    formatDate:function(date){
        return moment(date).fromNow();
    },       
    nextPost:function(){          
        if($('.next-post').length){
            var page = 0;
            var isNext=false;            
            var result = new Array();
            var $nextPostContainer = $('.next-post');
            var currentUrl = $nextPostContainer.data('current-url');
            if(currentUrl != ''){
                var timeout = setInterval(function(){
                    page=page+1;
                    var ajaxUrl=sfThemeOptions.global.rootUrl+'/rss/'+page+'/';
                    if(page==1){
                        ajaxUrl=sfThemeOptions.global.rootUrl+'/rss/';
                    }
                    $.ajax({
                        type: 'GET',
                        url: ajaxUrl,
                        dataType: "xml",
                        success: function(xml) {
                            if($(xml).length){                                                           
                                $('item', xml).each( function() {                                    
                                    var itemUrl=$(this).find('link').eq(0).text();
                                    if(isNext){                                          
                                        result['link'] = itemUrl;
                                        result['title'] = $(this).find('title').eq(0).text();
                                        result['pubDate'] = sfApp.formatDate( new Date($(this).find('pubDate').eq(0).text()));                                        
                                        var $desc = $($(this).find('description').eq(0).text());                                          
                                        if($desc.first().is('iframe')){
                                            var $iframeEl=$desc.first();
                                            var frameSrc=$desc.first().attr('src');
                                            if(frameSrc.indexOf('youtube.com')>=0){
                                                var regExp=/youtube(-nocookie)?\.com\/(embed|v)\/([\w_-]+)/;
                                                var youtubeId ='';
                                                var regResult= frameSrc.match(regExp);                                                
                                                if(regResult[3] != 'undefined' && regResult[3]!=''){
                                                    result['background'] = 'http://i3.ytimg.com/vi/'+regResult[3]+'/0.jpg';     
                                                    result['cssClass'] = 'video-post';                                   
                                                }   
                                            }
                                            else if(frameSrc.indexOf('vimeo.com')>=0){                                                      
                                                var regExp = /video\/(\d+)/;                                                
                                                var regResult= frameSrc.match(regExp);
                                                if(regResult[1] != 'undefined' && regResult[1] != ''){
                                                    var vimeoUrl='http://vimeo.com/api/v2/video/'+regResult[1]+'.json';
                                                    console.log(vimeoUrl);
                                                    $.ajax({
                                                        type: 'GET',
                                                        url: vimeoUrl,
                                                        dataType: "json",
                                                        success: function(vimeoResult) {
                                                            if(vimeoResult.length){
                                                                $nextPostContainer.css('background-image', 'url("'+vimeoResult[0].thumbnail_large+'")');                                                    
                                                                $nextPostContainer.addClass('video-post');
                                                                var htmlStr='<div class="next-post-wrap">\
                                                                                <div class="next-label">Next Story</div>\
                                                                                <h2 class="post-title"><a href="'+result['link']+'">'+result['title']+'</a></h2>\
                                                                                <div class="post-meta">'+result['pubDate']+'</div>\
                                                                                <div class="next-arrow"><a href="'+result['link']+'"><i class="fa fa-angle-double-down"></i></a></div>\
                                                                            </div>';
                                                                $nextPostContainer.html(htmlStr);   
                                                            }
                                                        }
                                                    });
                                                }
                                            }
                                        }                                        
                                        else if($desc.has('img[alt*="image-post"]').length){
                                            var $backgroundEl = $desc.find('img[alt*="image-post"]');
                                            if($backgroundEl.length){
                                                result['cssClass'] = $backgroundEl.attr('alt');
                                                result['background'] = $backgroundEl.attr('src');
                                            }
                                        }                                        
                                        else if($desc.has('a[href*="youtube.com"]').length){                                            
                                            var $videoEl=$desc.find('a[href*="youtube.com"]');
                                            if($videoEl.length){
                                                var videoUrl=$videoEl.attr('href');
                                                if(videoUrl!=''){
                                                    var youtubeId = videoUrl.match(/[\\?&]v=([^&#]*)/)[1];
                                                    if(youtubeId!=''){
                                                        result['background'] = 'http://i3.ytimg.com/vi/'+youtubeId+'/0.jpg';
                                                        result['cssClass'] = 'video-post';
                                                    }
                                                }
                                            }
                                        }                                        
                                        else if($desc.has('a[href*="vimeo.com"]').length){                                                                            
                                            var $vimeoVideoEl=$desc.find('a[href*="vimeo.com"]');
                                            var vimeoVideoUrl=$vimeoVideoEl.attr('href');                                            
                                            var regExp = /vimeo.com\/(\d+)/;
                                            var vimeoId ='';
                                            var regResult= vimeoVideoUrl.match(regExp);
                                            if(regResult[1] != 'undefined' && regResult[1] != '') {                                                
                                                var vimeoUrl='http://vimeo.com/api/v2/video/'+regResult[1]+'.json';                                                
                                                $.ajax({
                                                    type: 'GET',
                                                    url: vimeoUrl,
                                                    dataType: "json",
                                                    success: function(vimeoResult) {                                                        
                                                        if(vimeoResult.length && vimeoResult[0].thumbnail_large != ''){
                                                            $nextPostContainer.css('background-image', 'url("'+vimeoResult[0].thumbnail_large+'")');                                                    
                                                            $nextPostContainer.addClass('video-post');
                                                            var htmlStr='<div class="next-post-wrap">\
                                                                            <div class="next-label">Next Story</div>\
                                                                            <h2 class="post-title"><a href="'+result['link']+'">'+result['title']+'</a></h2>\
                                                                            <div class="post-meta">'+result['pubDate']+'</div>\
                                                                            <div class="next-arrow"><a href="'+result['link']+'"><i class="fa fa-angle-double-down"></i></a></div>\
                                                                        </div>';
                                                            $nextPostContainer.html(htmlStr);                                                            
                                                        }
                                                    }
                                                });
                                            }
                                        }
                                        if(result['link'] != undefined){                                            
                                            if(result['background'] != undefined && result['background'] != ''){                                                
                                                $nextPostContainer.css('background-image', 'url("'+result['background']+'")');
                                            }
                                            if(result['cssClass'] != undefined && result['cssClass'] != ''){
                                                $nextPostContainer.addClass(result['cssClass']);
                                            }
                                            var htmlStr='<div class="next-post-wrap">\
                                                            <div class="next-label">Next Story</div>\
                                                            <h2 class="post-title"><a href="'+result['link']+'">'+result['title']+'</a></h2>\
                                                            <div class="post-meta">'+result['pubDate']+'</div>\
                                                            <div class="next-arrow"><a href="'+result['link']+'"><i class="fa fa-angle-double-down"></i></a></div>\
                                                        </div>';
                                            $nextPostContainer.html(htmlStr);
                                        }                                        
                                        clearInterval(timeout);                                        
                                        return false;                     
                                    }
                                    else if(currentUrl == itemUrl){
                                        isNext = true;                                        
                                    }                                    
                                });
                            }
                        }
                    });
                }, 2000);                                
            }
        }
    },
    formatBlogAjax:function($newElements){
        if($newElements.length && ( $('body').is('.post-template') || 
            ( $('body').attr('data-post-mode')=='multimedia' && ( $('body').is('.home-template') || $('body').is('.archive-template') || $('body').is('.tag-template') ) ) ) ){        
            jQuery.each($newElements,function( i, val ){
                var $this=jQuery(val);
                var $postHeader=$this.find('.post-header');
                var $postContent=$this.find('.post-content');
                // Image Post
                if($postContent.has('img[alt*="image-post"]').length){
                    var $backgroundEl=$postContent.find('img[alt*="image-post"]');
                    $postHeader.addClass($backgroundEl.attr('alt'));
                    $postHeader.css('background-image', 'url("'+$backgroundEl.attr('src')+'")');                        
                }
                // Video Post By LINK
                else if($postContent.has('a[href*="youtube.com"]').length){
                    var $videoEl=$postContent.find('a[href*="youtube.com"]');
                    if($videoEl.length){
                        var videoUrl=$videoEl.attr('href');
                        if(videoUrl!=''){
                            $postHeader.addClass('has-background video-post');
                            var $line = $postHeader.find('.line');
                            if(sfApp.isMobile()){
                                $postHeader.addClass('mobile');
                                var youtubeId = videoUrl.match(/[\\?&]v=([^&#]*)/)[1];
                                if(youtubeId!=''){
                                    $postHeader.css('background-image', 'url("'+'http://i3.ytimg.com/vi/'+youtubeId+'/0.jpg'+'")'); 
                                    $line.html('<a class="video-playback youtube" href="'+videoUrl+'" data-toggle="tooltip" data-placement="right" title="Try me!"></a>');
                                    $('.video-playback',$line).tooltip();                                    
                                    var $videoPlayback=$line.find('.video-playback');
                                    $videoPlayback.magnificPopup({                                            
                                        type: 'iframe',
                                        mainClass: 'mfp-fade',
                                        removalDelay: 160,
                                        preloader: false,
                                        fixedContentPos: false
                                    });
                                }
                            }
                            else{
                                var videoData="{videoURL:'"+videoUrl+"',containment:'self',showControls:true,startAt:0,mute:false,autoPlay:false,loop:false,opacity:1,quality:'highres'}";
                                $postHeader.append('<div class="video player"></div>');
                                var $video=$postHeader.find('.video');
                                $video.data("property",videoData);
                                $video.mb_YTPlayer();
                                $video.on("YTPStart",function(){                                     
                                    $postHeader.addClass('playing');
                                });
                                $video.on("YTPPause",function(){
                                    $postHeader.removeClass('playing');
                                });
                                $video.on("YTPEnd",function(){
                                    $postHeader.removeClass('playing');
                                });                                    
                                $line.html('<a class="video-playback youtube" href="javascript:;" data-toggle="tooltip" data-placement="right" title="Try me!"></a>');
                                $('.video-playback',$line).tooltip();                                    
                            }
                        }
                    }
                } 
                // Video Post By iframe                   
                else if($postContent.has('iframe[src^="//www.youtube.com"]').length){                        
                    var $videoEl=$postContent.find('iframe[src^="//www.youtube.com"]');
                    var regExp=/youtube(-nocookie)?\.com\/(embed|v)\/([\w_-]+)/;                        
                    var regResult= $videoEl.attr('src').match(regExp);
                    if(regResult[3] != undefined && regResult[3]!=''){
                        $postHeader.addClass('has-background video-post');
                        var $line = $postHeader.find('.line');
                        if(sfApp.isMobile()){
                            $postHeader.addClass('mobile');
                            $postHeader.css('background-image', 'url("'+'http://i3.ytimg.com/vi/'+regResult[3]+'/0.jpg'+'")'); 
                            $line.html('<a class="video-playback youtube" href="http://www.youtube.com/watch?v='+videoUrl+'" data-toggle="tooltip" data-placement="right" title="Try me!"></a>');
                            $('.video-playback',$line).tooltip();                                    
                            var $videoPlayback=$line.find('.video-playback');
                            $videoPlayback.magnificPopup({                                            
                                type: 'iframe',
                                mainClass: 'mfp-fade',
                                removalDelay: 160,
                                preloader: false,
                                fixedContentPos: false
                            });
                        }
                        else{
                            var videoUrl='http://www.youtube.com/watch?v='+regResult[3];                                
                            var videoData="{videoURL:'"+videoUrl+"', containment:'self',showControls:true, startAt:0,mute:false,autoPlay:false,loop:false, opacity:1,quality:'highres'}";
                            $postHeader.append('<div class="video player"></div>');
                            var $video=$postHeader.find('.video');
                            $video.data("property",videoData);
                            $video.mb_YTPlayer();
                            $video.on("YTPStart",function(){                                     
                                $postHeader.addClass('playing');
                            });
                            $video.on("YTPPause",function(){
                                $postHeader.removeClass('playing');
                            });
                            $video.on("YTPEnd",function(){
                                $postHeader.removeClass('playing');
                            });                                
                            $line.html('<a class="video-playback youtube" href="javascript:;" data-toggle="tooltip" data-placement="right" title="Try me!"></a>');
                            $('.video-playback',$line).tooltip();                                    
                        }
                    }
                }
                // Vimeo Video Post By link
                else if($postContent.has('a[href*="vimeo.com"]').length){
                    var $vimeoVideoEl=$postContent.find('a[href*="vimeo.com"]');
                    var vimeoVideoUrl=$vimeoVideoEl.attr('href');
                    // get vimeo thumnail
                    var regExp = /vimeo.com\/(\d+)/;
                    var vimeoId ='';
                    var regResult= vimeoVideoUrl.match(regExp);
                    if(regResult.length)
                        vimeoId=regResult[1];
                    if(vimeoId!=''){
                        var vimeoUrl='http://vimeo.com/api/v2/video/'+vimeoId+'.json';
                        $.ajax({
                            type: 'GET',
                            url: vimeoUrl,
                            dataType: "json",
                            success: function(result) {
                                if(result.length){
                                    $postHeader.addClass('has-background video-post vimeo');
                                    $postHeader.css('background-image', 'url("'+result[0].thumbnail_large+'")');
                                    var $line = $postHeader.find('.line');
                                    $line.html('<a class="video-playback vimeo" href="'+vimeoVideoUrl+'" data-toggle="tooltip" data-placement="right" title="Try me!"></a>');
                                    $('.video-playback',$line).tooltip();                                    
                                    var $videoPlayback=$line.find('.video-playback');
                                    $videoPlayback.magnificPopup({                                            
                                        type: 'iframe',
                                        mainClass: 'mfp-fade',
                                        removalDelay: 160,
                                        preloader: false,
                                        fixedContentPos: false
                                    });                                        
                                }
                            }
                        });
                    }
                }
                // Vimeo Video Post By iframe
                else if($postContent.has('iframe[src^="//player.vimeo.com"]').length){
                    var $vimeoVideoEl=$postContent.find('iframe[src^="//player.vimeo.com"]');
                    var vimeoVideoUrl=$vimeoVideoEl.attr('src');
                    // get vimeo thumnail
                    var regExp = /video\/(\d+)/;
                    var vimeoId ='';
                    var regResult= vimeoVideoUrl.match(regExp);
                    if(regResult!=null)
                        vimeoId=regResult[1];                        
                    if(vimeoId!=''){
                        var vimeoUrl='http://vimeo.com/api/v2/video/'+vimeoId+'.json';
                        $.ajax({
                            type: 'GET',
                            url: vimeoUrl,
                            dataType: "json",
                            success: function(result) {
                                if(result.length){
                                    $postHeader.addClass('has-background video-post vimeo');
                                    $postHeader.css('background-image', 'url("'+result[0].thumbnail_large+'")');
                                    var $line = $postHeader.find('.line');
                                    $line.html('<a class="video-playback vimeo" href="https://vimeo.com/'+vimeoId+'" data-toggle="tooltip" data-placement="right" title="Try me!"></a>');
                                    $('.video-playback',$line).tooltip();                                    
                                    var $videoPlayback=$line.find('.video-playback');
                                    $videoPlayback.magnificPopup({                                            
                                        type: 'iframe',
                                        mainClass: 'mfp-fade',
                                        removalDelay: 160,
                                        preloader: false,
                                        fixedContentPos: false
                                    });                                        
                                }
                            }
                        });
                    }
                }
                // Audio Post By Link
                else if($postContent.has('a[href*="soundcloud.com"]').length){
                    var $audioEl=$postContent.find('a[href*="soundcloud.com"]');
                    $postHeader.append('<div class="audio sc-player"></div>');
                    var $audio=$postHeader.find('.audio');
                    $audioEl.appendTo($audio);
                    $postHeader.addClass('has-background audio-post');                        
                    $audio.scPlayer({
                        randomize: true
                    });
                    var $line = $postHeader.find('.line');
                    $line.html('<a class="audio-playback" href="javascript:;" data-toggle="tooltip" data-placement="right" title="Try me!"></a>');
                    $('.audio-playback',$line).tooltip();
                }
                // Audio Post By iframe
                else if($postContent.has('iframe[src^="https://w.soundcloud.com"]').length){
                    var $audioEl=$postContent.find('iframe[src^="https://w.soundcloud.com"]');
                    var regExp =/soundcloud.com\/tracks\/(\d+)/;
                    var soundcloudUrl = '';
                    var regResult= $audioEl.attr('src').match(regExp);                        
                    if(regResult.length && regResult[1]!=''){                            
                        $postHeader.append('<div class="audio sc-player"><a href="http://api.soundcloud.com/tracks/'+regResult[1]+'"></a></div>');
                        var $audio=$postHeader.find('.audio');
                        $postHeader.addClass('has-background audio-post');
                        $audio.scPlayer({                     
                            randomize: true
                        });
                        var $line = $postHeader.find('.line');
                        $line.html('<a class="audio-playback" href="javascript:;" data-toggle="tooltip" data-placement="right" title="Try me!"></a>');
                        $('.audio-playback',$line).tooltip();
                    }
                }                    
                $this.addClass('formated');
            });            
        }
        return $newElements;
    },
    formatBlog:function(){        
        if($('.post').length && ( $('body').is('.post-template') || 
            ( $('body').attr('data-post-mode')=='multimedia' && ( $('body').is('.home-template') || $('body').is('.archive-template') || $('body').is('.tag-template') ) ) ) ){
            $('.post').imagesLoaded(function(){
                $('.post:not(.formated)').each(function() {
                    var $this=$(this);
                    var $postHeader=$this.find('.post-header');
                    var $postContent=$this.find('.post-content');
                    var $line = $postHeader.find('.line');                    
                    // Video Post By LINK
                    if($postContent.has('a[href*="youtube.com"]').length){
                        var $videoEl=$postContent.find('a[href*="youtube.com"]');
                        if($videoEl.length){
                            var videoUrl=$videoEl.attr('href');
                            if(videoUrl!=''){
                                $postHeader.addClass('has-background video-post');                                
                                if(sfApp.isMobile()){
                                    $postHeader.addClass('mobile');
                                    var youtubeId = videoUrl.match(/[\\?&]v=([^&#]*)/)[1];
                                    if(youtubeId!=''){
                                        $postHeader.css('background-image', 'url("'+'http://i3.ytimg.com/vi/'+youtubeId+'/0.jpg'+'")');                                         
                                        $line.html('<a class="video-playback youtube" href="'+videoUrl+'" data-toggle="tooltip" data-placement="right" title="Try me!"></a>');
                                        $line.addClass('has-icon');
                                        $('.video-playback',$line).tooltip();
                                        var $videoPlayback=$line.find('.video-playback');
                                        $videoPlayback.magnificPopup({                                            
                                            type: 'iframe',
                                            mainClass: 'mfp-fade',
                                            removalDelay: 160,
                                            preloader: false,
                                            fixedContentPos: false
                                        });
                                    }
                                }
                                else{
                                    var videoData="{videoURL:'"+videoUrl+"',containment:'self',showControls:true,startAt:0,mute:false,autoPlay:false,loop:false,opacity:1,quality:'highres'}";
                                    $postHeader.append('<div class="video player"></div>');
                                    var $video=$postHeader.find('.video');
                                    $video.data("property",videoData);
                                    $video.mb_YTPlayer();
                                    $video.on("YTPStart",function(){                                     
                                        $postHeader.addClass('playing');
                                    });
                                    $video.on("YTPPause",function(){
                                        $postHeader.removeClass('playing');
                                    });
                                    $video.on("YTPEnd",function(){
                                        $postHeader.removeClass('playing');
                                    });                                    
                                    $line.html('<a class="video-playback youtube" href="javascript:;" data-toggle="tooltip" data-placement="right" title="Try me!"></a>');
                                    $line.addClass('has-icon');
                                    $('.video-playback',$line).tooltip();
                                }
                            }
                        }
                    } 
                    // Video Post By iframe                   
                    else if($postContent.has('iframe[src^="//www.youtube.com"]').length){                        
                        var $videoEl=$postContent.find('iframe[src^="//www.youtube.com"]');
                        var regExp=/youtube(-nocookie)?\.com\/(embed|v)\/([\w_-]+)/;                        
                        var regResult= $videoEl.attr('src').match(regExp);
                        if(regResult[3] != undefined && regResult[3]!=''){
                            $postHeader.addClass('has-background video-post');                            
                            $line.addClass('has-icon');
                            if(sfApp.isMobile()){
                                $postHeader.addClass('mobile');
                                $postHeader.css('background-image', 'url("'+'http://i3.ytimg.com/vi/'+regResult[3]+'/0.jpg'+'")'); 
                                $line.html('<a class="video-playback youtube" href="http://www.youtube.com/watch?v='+videoUrl+'" data-toggle="tooltip" data-placement="right" title="Try me!"></a>');
                                var $videoPlayback=$line.find('.video-playback');
                                $('.video-playback',$line).tooltip();
                                $videoPlayback.magnificPopup({                                            
                                    type: 'iframe',
                                    mainClass: 'mfp-fade',
                                    removalDelay: 160,
                                    preloader: false,
                                    fixedContentPos: false
                                });
                            }
                            else{
                                var videoUrl='http://www.youtube.com/watch?v='+regResult[3];                                
                                var videoData="{videoURL:'"+videoUrl+"', containment:'self', showControls:true, startAt:0, mute:false, autoPlay:false, loop:false, opacity:1, quality:'highres'}";
                                $postHeader.append('<div class="video player"></div>');
                                var $video=$postHeader.find('.video');
                                $video.data("property",videoData);
                                $video.mb_YTPlayer();
                                $video.on("YTPStart",function(){                                     
                                    $postHeader.addClass('playing');
                                });
                                $video.on("YTPPause",function(){
                                    $postHeader.removeClass('playing');
                                });
                                $video.on("YTPEnd",function(){
                                    $postHeader.removeClass('playing');
                                });                                
                                $line.html('<a class="video-playback youtube" href="javascript:;" data-toggle="tooltip" data-placement="right" title="Try me!"></a>');
                                $('.video-playback',$line).tooltip();
                            }
                        }
                    }
                    // Vimeo Video Post By link
                    else if($postContent.has('a[href*="vimeo.com"]').length){
                        var $vimeoVideoEl=$postContent.find('a[href*="vimeo.com"]');
                        var vimeoVideoUrl=$vimeoVideoEl.attr('href');
                        if( !$postHeader.is('has-background') ){
                            var regExp = /vimeo.com\/(\d+)/;
                            var vimeoId ='';
                            var regResult= vimeoVideoUrl.match(regExp);
                            if(regResult.length && regResult[1] !='' ){
                                vimeoId=regResult[1];
                            }
                            if(vimeoId!=''){
                                var vimeoUrl='http://vimeo.com/api/v2/video/'+vimeoId+'.json';
                                $.ajax({
                                    type: 'GET',
                                    url: vimeoUrl,
                                    dataType: "json",
                                    success: function(result) {
                                        if(result.length){
                                            $postHeader.addClass('video-post vimeo');
                                            $postHeader.css('background-image', 'url("'+result[0].thumbnail_large+'")');                                                                                
                                        }
                                    }
                                });
                            }
                        }                        
                        $line.html('<a class="video-playback vimeo" href="'+vimeoVideoUrl+'" data-toggle="tooltip" data-placement="right" title="Try me!"></a>');
                        $line.addClass('has-icon');                        
                        var $videoPlayback=$line.find('.video-playback');
                        $videoPlayback.tooltip();
                        $videoPlayback.magnificPopup({                                            
                            type: 'iframe',
                            mainClass: 'mfp-fade',
                            removalDelay: 160,
                            preloader: false,
                            fixedContentPos: false,
                            callbacks: {
                                open: function() {
                                    // Will fire when this exact popup is opened
                                    // this - is Magnific Popup object
                                },
                                close: function() {
                                    console.log($videoPlayback.attr('class'));
                                }
                            }
                        });
                    }
                    // Vimeo Video Post By iframe
                    else if($postContent.has('iframe[src^="//player.vimeo.com"]').length){
                        var $vimeoVideoEl=$postContent.find('iframe[src^="//player.vimeo.com"]');
                        var vimeoVideoUrl=$vimeoVideoEl.attr('src');
                        var vimeoId ='';
                        var regExp = /video\/(\d+)/;
                        var regResult= vimeoVideoUrl.match(regExp);
                        if(regResult.length && regResult[1]!=''){
                            vimeoId=regResult[1];
                        }
                        if( !$postHeader.is('has-background') && vimeoId!='' ){                            
                            var vimeoUrl='http://vimeo.com/api/v2/video/'+vimeoId+'.json';
                            $.ajax({
                                type: 'GET',
                                url: vimeoUrl,
                                dataType: "json",
                                success: function(result) {
                                    if(result.length){
                                        $postHeader.addClass('video-post vimeo');
                                        $postHeader.css('background-image', 'url("'+result[0].thumbnail_large+'")');                                                                                
                                    }
                                }
                            });                            
                        }                        
                        $line.html('<a class="video-playback vimeo" href="https://vimeo.com/'+vimeoId+'" data-toggle="tooltip" data-placement="right" title="Try me!"></a>');
                        $line.addClass('has-icon');                        
                        var $videoPlayback=$line.find('.video-playback');
                        $videoPlayback.tooltip();
                        $videoPlayback.magnificPopup({                                            
                            type: 'iframe',
                            mainClass: 'mfp-fade',
                            removalDelay: 160,
                            preloader: false,
                            fixedContentPos: false,
                            callbacks: {
                                open: function() {
                                    // Will fire when this exact popup is opened
                                    // this - is Magnific Popup object
                                },
                                close: function() {
                                    console.log($videoPlayback.html());
                                }
                            }
                        });
                    }
                    // Audio Post By Link
                    else if($postContent.has('a[href*="soundcloud.com"]').length){
                        var $audioEl=$postContent.find('a[href*="soundcloud.com"]');
                        var apiUrl='http://api.soundcloud.com/resolve.json?url='+$audioEl.attr('href')+'&client_id=425fc6ee65a14efbb9b83b1c49a87ccb';
                        $.getJSON(apiUrl, function(data) {
                            if(data.id) {                                                                                                                                         
                                $postHeader.append('<div class="sf-audio-player"></div>');
                                var $audioPlayer=$postHeader.find('.sf-audio-player');
                                $audioPlayer.data('track-id',data.id);    
                                var $section=$postHeader.closest('section');                                
                                $line.html('<a class="audio-playback" href="javascript:;" data-toggle="tooltip" data-placement="right" title="Try me!"></a>');
                                $line.addClass('has-icon');                                
                                var $playback = $line.find('.audio-playback');
                                $playback.tooltip();
                                var waveformColorOptions={
                                    defaultColor: 'rgba(255,255,255,0.4)',
                                    loadedColor: 'rgba(69,69,69,0.8)',
                                    playedColor: 'rgba(255,102,0,0.8)',
                                };                                
                                if(!$postHeader.is('.has-background') && ( $section.is('.odd') || $('body').is('.post-template') ) ){
                                    waveformColorOptions={
                                        defaultColor: 'rgba(0,0,0,0.4)',
                                        loadedColor: 'rgba(69,69,69,0.8)',
                                        playedColor: 'rgba(255,102,0,0.8)',
                                    };
                                }     
                                SC.get("/tracks/"+data.id, function(track){                        
                                    var waveform = new Waveform({
                                        container: $audioPlayer[0],
                                        innerColor: waveformColorOptions.defaultColor,                            
                                    });
                                    waveform.dataFromSoundCloudTrack(track);
                                    var streamOptions = waveform.optionsForSyncedStream(waveformColorOptions);
                                    var onfinishOptions = {
                                        onfinish: function(){ 
                                            $playback.removeClass('playing');   
                                            console.log('track finished');
                                        }
                                    }
                                    jQuery.extend( streamOptions, onfinishOptions );
                                    SC.stream(track.uri, streamOptions, function(stream){
                                        window.scStreams.push(stream);                            
                                    });  
                                });           
                                $audioPlayer.data('track-index',trackIndex);                       
                                $playback.data('track-index',trackIndex);
                                $audioPlayer.addClass('inited');
                                trackIndex++;
                            }
                        });                        
                    }
                    // Audio Post By iframe
                    else if($postContent.has('iframe[src^="https://w.soundcloud.com"]').length){
                        var $audioEl=$postContent.find('iframe[src^="https://w.soundcloud.com"]');
                        var regExp =/soundcloud.com\/tracks\/(\d+)/;
                        var soundcloudUrl = '';
                        var regResult= $audioEl.attr('src').match(regExp);                        
                        if(regResult.length && regResult[1]!=''){                                                            
                            $postHeader.append('<div class="sf-audio-player"></div>');
                            var $audioPlayer=$postHeader.find('.sf-audio-player');
                            $audioPlayer.data('track-id',regResult[1]);    
                            var $section=$postHeader.closest('section');                            
                            $line.html('<a class="audio-playback" href="javascript:;" data-toggle="tooltip" data-placement="right" title="Try me!"></a>');
                            $line.addClass('has-icon');                            
                            var $playback = $line.find('.audio-playback');
                            $playback.tooltip();
                            var waveformColor = $section.css("background-color");
                            if(!$postHeader.is('.has-background')){
                                if($section.is('.even') || $('body').is('.post-template')){
                                    waveformColor = 'rgba(255,255,255,0.4)';
                                }
                                else{
                                    waveformColor = 'rgba(0,0,0,0.4)';
                                }
                            }                            
                            SC.get("/tracks/"+regResult[1], function(track){                        
                                var waveform = new Waveform({
                                    container: $audioPlayer[0],
                                    innerColor: waveformColor,                            
                                });
                                waveform.dataFromSoundCloudTrack(track);
                                var streamOptions = waveform.optionsForSyncedStream();
                                var onfinishOptions = {
                                    onfinish: function(){ 
                                        $playback.removeClass('playing');   
                                        console.log('track finished');
                                    }
                                }
                                jQuery.extend( streamOptions, onfinishOptions );
                                SC.stream(track.uri, streamOptions, function(stream){
                                    window.scStreams.push(stream);                            
                                });  
                            });           
                            $audioPlayer.data('track-index',trackIndex);                       
                            $playback.data('track-index',trackIndex);
                            $audioPlayer.addClass('inited'); 
                            trackIndex++;                           
                        }
                    }   
                    else if($postHeader.is('.has-background')){
                        console.log('has-background');
                        var bg_url = $postHeader.css('background-image');
                        bg_url = bg_url.replace(/.*\s?url\([\'\"]?/, '').replace(/[\'\"]?\).*/, ''); 
                        $line.html('<a class="image-popup" href="'+bg_url+'" data-toggle="tooltip" data-placement="right" title="Try me!"></a>');
                        $line.addClass('has-icon');
                        $line.find('.image-popup').tooltip();
                        $line.find('.image-popup').magnificPopup({
                            type: 'image',
                            tLoading: '',
                        });
                    }
                    // Image Post
                    else if($postContent.has('img[alt*="image-post"]').length){
                        var $backgroundEl=$postContent.find('img[alt*="image-post"]');
                        $postHeader.addClass('has-background '+$backgroundEl.attr('alt'));
                        $postHeader.css('background-image', 'url("'+$backgroundEl.attr('src')+'")');                        
                        $line.html('<a class="image-popup" href="'+$backgroundEl.attr('src')+'" data-toggle="tooltip" data-placement="right" title="Try me!"></a>');
                        $line.addClass('has-icon');
                        $line.find('.image-popup').tooltip();
                        $line.find('.image-popup').magnificPopup({
                            type: 'image',
                            tLoading: '',
                        });
                    }                 
                    $this.addClass('formated');
                });
            });
        }        
    },
    audioSeekingHandler:function(){
        jQuery(document).on('click','.sf-audio-player', function(event) {            
            var $this=jQuery(this);
            var $postHeader=$this.closest('.post-header');  
            var $playback = jQuery('.header-wrap .line .audio-playback', $postHeader);            
            if($playback.is('.playing')){
                sfApp.audioScrub( $this, event.pageX );
            }
            else{
                console.log('audio not playing');
            }            
            return false;
        });
    },
    audioScrub:function($element,xPos){
        var stream = window.scStreams[$element.data('track-index')];        
        var needSeek = Math.floor( Math.min( ( stream.bytesLoaded/stream.bytesTotal ), ( xPos/$element.width() ) ) * stream.durationEstimate );
        console.log('seek to:'+needSeek );
        stream.setPosition(needSeek);
    },
    audioPlayback:function(){
        jQuery(document).on('click','.audio-playback', function(event) {            
            var $this=jQuery(this);                                        
            var $postHeader=$this.closest('.post-header');                        
            if(!$this.is('.playing')){                
                if(typeof window.scStreams != 'undefined' ){
                    jQuery.each(window.scStreams, function( index, stream ) {                    
                        if( index != $this.data('track-index') ){                        
                            window.scStreams[index].pause();                        
                        }                             
                    });
                }                
                jQuery('.audio-playback.playing').removeClass('playing');
                $this.addClass('playing');                                
            }
            else{
                $this.removeClass('playing');                
            }
            window.scStreams[$this.data('track-index')].togglePause();  
            return false;
        });
    },    
    videoPlayback:function(){
        $(document).on('click','.video-playback:not(.vimeo)', function(event) {            
            var $this=$(this);
            var $postHeader=$this.closest('.post-header');
            var $video=$postHeader.find('.video');
            if(!$this.is('.playing')){
                $('.video-playback.playing').removeClass('playing');       
                $this.addClass('playing');
                $('.post-header.video-post.playing .mb_YTVPlayer').each(function(){
                    $(this).pauseYTP();
                });                
                $video.playYTP();
            }
            else{
                $this.removeClass('playing');
                $video.pauseYTP();
            }
            return false;
        });
    },
    getRecentPosts:function(){
        if($('.recent-post').length){
            $('.recent-post').each(function(){
                var $this=$(this);
                var showPubDate=false;
                var showDesc=false;
                var descCharacterLimit=-1;
                var size=-1;
                var type='static';
                var slideMode='horizontal';
                var slideSpeed=500;
                var slidePager=false;
                var isTicker=false;
                var monthName=new Array();
                monthName[0]="Jan";
                monthName[1]="Feb";
                monthName[2]="Mar";
                monthName[3]="Apr";
                monthName[4]="May";
                monthName[5]="June";
                monthName[6]="July";
                monthName[7]="Aug";
                monthName[8]="Sept";
                monthName[9]="Oct";
                monthName[10]="Nov";
                monthName[11]="Dec";
                if($this.data('pubdate'))
                    showPubDate=$this.data('pubdate');
                if($this.data('desc')){
                    showDesc=$this.data('desc');
                    if($this.data('character-limit'))
                        descCharacterLimit=$this.data('character-limit');
                }
                if($this.data('size'))
                    size=$this.data('size');
                if($this.data('type'))
                    type=$this.data('type');
                if(type==='scroll'){
                    if($this.data('mode'))
                        slideMode=$this.data('mode');
                    if($this.data('speed'))
                        slideSpeed=$this.data('speed');
                    if($this.data('pager'))
                        slidePager=$this.data('pager');
                    if($this.data('ticker'))
                        isTicker=$this.data('ticker');
                }
                $.ajax({
                    type: 'GET',
                    url: sfThemeOptions.global.rootUrl+'/rss/',
                    dataType: "xml",
                    success: function(xml) {
                        if($(xml).length){
                            var htmlStr='';
                            var date;
                            var count=0;
                            $('item', xml).each( function() {
                                if(size>0 && count < size){
                                    htmlStr+='<li class="clearfix">';
                                    if(showPubDate){
                                        date = new Date($(this).find('pubDate').eq(0).text());
                                        htmlStr += '<span class="itemDate">\
                                                        <span class="date">'+date.getDate()+'</span>\
                                                        <span class="month">'+monthName[date.getMonth()]+'</span>\
                                                    </span>';
                                    }
                                    htmlStr+='<span class="itemContent">';
                                    htmlStr += '<span class="title">\
                                                        <a href="' + $(this).find('link').eq(0).text() + '">\
                                                        ' + $(this).find('title').eq(0).text() + '\
                                                        </a>\
                                                </span>';
                                    if (showDesc) {
                                        var desc=$(this).find('description').eq(0).text();
                                        // trip html tag
                                        desc=$(desc).text();
                                        if (descCharacterLimit > 0 && desc.length > descCharacterLimit) {
                                            htmlStr += '<span class="desc">' + desc.substr(0, descCharacterLimit) + ' ...\
                                                            <a href="'+$(this).find('link').eq(0).text()+'">View »</a>\
                                                        </span>';
                                        }
                                        else{
                                            htmlStr += '<span class="desc">' + desc + "</span>";
                                        }
                                    }
                                    htmlStr+='</span>';
                                    htmlStr += '</li>';
                                    count++;
                                }
                                else{
                                    return false;
                                }
                            });
                            if(type==='static')
                                htmlStr='<ul class="feedList static">'+ htmlStr + "</ul>";
                            else{
                                htmlStr='<ul class="feedList bxslider">'+ htmlStr + "</ul>";
                            }
                            $this.append(htmlStr);
                            if(type!=='static'){
                                // Updating on v1.2
                            }
                        }
                    }
                });
            });
        }
    },
    getMaxPagination:function(){
        if($('.total-page').length){            
            return parseInt($('.total-page').html());
        }
    },
    infiniteScrollHandler:function(){
        if($('.post-list').length && $('body').data('infinite-scroll')==true){            
            var $container = $('.post-list');
            $container.infinitescroll({
                    navSelector     : '.pagination',    // selector for the paged navigation
                    nextSelector    : '.pagination a.older-posts',  // selector for the NEXT link (to page 2)
                    itemSelector    : '.post',     // selector for all items you'll retrieve
                    maxPage         : sfApp.getMaxPagination(),                                        
                    loading: {
                        finishedMsg: 'No more post to load.',
                        img: sfThemeOptions.global.rootUrl+'/assets/img/loading.gif'
                    }
                },                
                function( newElements ) {                    
                    var $newElements= sfApp.formatBlogAjax($(newElements));                    
                    $container.append($newElements);
                }
            );
        }
    },
    getFlickr:function(){
        if($('.flickr-feed').length){
            var count=1;
            $('.flickr-feed').each(function() {
                if(flickr_id=='' || flickr_id=='YOUR_FLICKR_ID_HERE'){
                    $(this).html('<li><strong>Please change Flickr user id before use this widget</strong></li>');
                }
                else{
                    var feedTemplate='<li><a href="{{image_b}}" target="_blank"><img src="{{image_m}}" alt="{{title}}" /></a></li>';
                    var size=15;
                    if($(this).data('size'))
                        size=$(this).data('size');
                    var isPopupPreview=false;
                    if($(this).data('popup-preview'))
                        isPopupPreview=$(this).data('popup-preview');
                    if(isPopupPreview){
                        feedTemplate='<li><a href="{{image_b}}"><img src="{{image_m}}" alt="{{title}}" /></a></li>';
                        count++;
                    }
                    $(this).jflickrfeed({
                        limit: size,
                        qstrings: {
                            id: flickr_id
                        },
                        itemTemplate: feedTemplate
                    }, function(data) {
                        if(isPopupPreview){
                            $(this).magnificPopup({
                                delegate: 'a',
                                type: 'image',
                                closeOnContentClick: false,
                                closeBtnInside: false,
                                mainClass: 'mfp-with-zoom mfp-img-mobile',
                                gallery: {
                                    enabled: true,
                                    navigateByImgClick: true,
                                    preload: [0,1] // Will preload 0 - before current, and 1 after the current image
                                },
                                image: {
                                    verticalFit: true,
                                    tError: '<a href="%url%">The image #%curr%</a> could not be loaded.'
                                },
                                zoom: {
                                    enabled: true,
                                    duration: 300, // don't foget to change the duration also in CSS
                                    opener: function(element) {
                                        return element.find('img');
                                    }
                                }
                            });
                        }
                    });
                }
            });
        }
    },
    getInstagram: function(){
        if($('.instagram-feed').length){
            if(instagram_accessToken!='' || instagram_accessToken!='your-instagram-access-token'){
                $.fn.spectragram.accessData = {
                    accessToken: instagram_accessToken,
                    clientID: instagram_clientID
                };
            }
            $('.instagram-feed').each(function(){
                if(instagram_accessToken=='' || instagram_accessToken=='your-instagram-access-token'){
                    $(this).html('<li><strong>Please change instagram api access info before use this widget</strong></li>');
                }
                else{
                    var display=15;
                    var wrapEachWithStr='<li></li>';
                    if($(this).data('display'))
                        display=$(this).data('display');
                    $(this).spectragram('getUserFeed',{
                        query: 'adrianengine',
                        max: display
                    });
                }
            });
        }
    },
    getDribbble: function(){
        if($('.dribbble-feed').length){
            var count=1;
            $('.dribbble-feed').each(function(){
                var $this=$(this);
                var display=15;
                if($this.data('display'))
                    display=$this.data('display');
                var isPopupPreview=false;
                if($this.data('popup-preview'))
                    isPopupPreview=$this.data('popup-preview');
                $.jribbble.getShotsByList('popular', function (listDetails) {
                    var html = [];
                    $.each(listDetails.shots, function (i, shot) {
                        if(isPopupPreview){
                            html.push('<li><a href="' + shot.image_url + '">');
                        }
                        else{
                            html.push('<li><a href="' + shot.url + '">');
                        }
                        html.push('<img src="' + shot.image_teaser_url + '" ');
                        html.push('alt="' + shot.title + '"></a></li>');
                    });
                    $this.html(html.join(''));
                    if(isPopupPreview){
                        $this.magnificPopup({
                            delegate: 'a',
                            type: 'image',
                            tLoading: 'Loading image #%curr%...',
                            mainClass: 'mfp-img-mobile',
                            gallery: {
                                enabled: true,
                                navigateByImgClick: true,
                                preload: [0,1] // Will preload 0 - before current, and 1 after the current image
                            },
                            image: {
                                tError: '<a href="%url%">The image #%curr%</a> could not be loaded.'
                            }
                        });
                    }
                }, {page: 1, per_page: display});
            });
        }
    },
    fitVids:function(){
        $('.post-content').find('iframe[src^="//www.youtube.com"]').wrap( '<div class="video-wrap"></div>' );                   
        $('.post-content').find('iframe[src^="//player.vimeo.com"]').wrap( '<div class="video-wrap"></div>' );        
        if($('.post-content').find('>:first-child').is('.video-wrap')){               
            $('.post-content').find('>:first-child').removeClass('video-wrap');
        }
        $('.post-content .video-wrap').fitVids();
    },
    timeToRead: function(){
        var $shareBox=$('.share-box');
        if(!$('#time-to-read-nofify').length){
            $('<div id="time-to-read-nofify"></div>').appendTo("body");
            if($(window).width()>979){
                $shareBox.appendTo("body");
            }
        }        
        var $timeToReadNofify=$('#time-to-read-nofify');
        var $postContent=$(".post-content");
        if(!$postContent.data('time-to-read')){
            var time=Math.round($postContent.text().split(' ').length/200);
            $postContent.data('time-to-read',time);            
        }        
        var totalTime=$postContent.data('time-to-read');
        var winHeight=$(window).height();        
        var scrollbarHeight = winHeight / $(document).height() * winHeight;
        var progress = $(window).scrollTop() / ($(document).height() - winHeight);
        var distance = progress * (winHeight - scrollbarHeight) + scrollbarHeight / 2 - $timeToReadNofify.height() / 2;
        var remainTime = Math.ceil(totalTime - (totalTime * progress));       
        var notifyStr='';        
        if($(window).scrollTop()<$('.post-footer').offset().top){
            if(remainTime > 1) {
                notifyStr = remainTime + ' minutes left';
            }
            else if(progress >= 1) {
                notifyStr = 'Thanks for reading';
            }
            else if (remainTime <= 1) {
                notifyStr = 'Less than a minute';
            }
            $timeToReadNofify.css('top', distance).text(notifyStr).fadeIn(100);            
            if($(window).width()>979){
                $shareBox.fadeOut(100);    
            }            
        }
        else{
            $timeToReadNofify.fadeOut(100);            
            if($(window).width()>979){
                $shareBox.css('top', distance-75).fadeIn(100);
            }
        }
        if (sfApp.scrollTimer !== null) {
            clearTimeout(sfApp.scrollTimer);
        }
        sfApp.scrollTimer = setTimeout(function() { $timeToReadNofify.fadeOut(); }, 1000);        
    },    
    mailchimpHandler:function(){
        if($('#mc-form').length){
            $("#mc-form input").not("[type=submit]").jqBootstrapValidation({
                submitSuccess: function ($form, event) {
                    event.preventDefault();                    
                    var url=$form.attr('action');
                    if(url=='' || url=='YOUR_WEB_FORM_URL_HERE')
                    {
                        alert('Please config your mailchimp form url for this widget');
                        return false;
                    }
                    else{
                        url=url.replace('/post?', '/post-json?').concat('&c=?');
                        var data = {};
                        var dataArray = $form.serializeArray();
                        $.each(dataArray, function (index, item) {
                            data[item.name] = item.value;
                        });
                        $.ajax({
                            url: url,
                            data: data,
                            success: function(resp){
                                if (resp.result === 'success') {
                                    alert("Got it, you've been added to our newsletter. Thanks for subscribe!");
                                }
                                else{
                                    alert(resp.result);
                                }
                            },
                            dataType: 'jsonp',
                            error: function (resp, text) {
                                console.log('mailchimp ajax submit error: ' + text);
                            }
                        });
                        return false;
                    }
                }
            });
        }
    },    
    scrollEvent:function(){
        $(window).scroll(function() {
            "use strict";
            if($('.header').attr('data-sticky')=='true'){
                var curPos = $(window).scrollTop();
                if (curPos >= $('.header').height()) {
                    $('.header').addClass('fixed-top');
                    if($('.logo-container .logo img').length && !$('.logo-container .logo img').is('.apply-sticked') && $('.logo-container .logo img').attr('data-sticked-src')!=''){
                        $('.logo-container .logo img').attr('data-normal-src',$('.logo-container .logo img').attr('src'));
                        $('.logo-container .logo img').attr('src',$('.logo-container .logo img').attr('data-sticked-src'));
                        $('.logo-container .logo img').addClass('apply-sticked');
                    }
                } else {
                    $('.header').removeClass('fixed-top');
                    if($('.logo-container .logo img').length && $('.logo-container .logo img').is('.apply-sticked') && $('.logo-container .logo img').attr('data-normal-src')!=''){
                        $('.logo-container .logo img').attr('data-sticked-src',$('.logo-container .logo img').attr('src'));
                        $('.logo-container .logo img').attr('src',$('.logo-container .logo img').attr('data-normal-src'));
                        $('.logo-container .logo img').removeClass('apply-sticked');
                    }
                }
            }
            if($('body').is('.post-template') && !$('body').is('.page') && $('.post-content').length){
                sfApp.timeToRead();
            }            
        });
    },
    menuEvent:function(){
        if($('.mini-nav-button').length){
            $('.mini-nav-button').click(function(){
                var $menu=$('.full-screen-nav');
                if(!$menu.length){                    
                    $menu=$('.mini-nav');
                    if(!$menu.length){
                        $menu=$('.standard-nav');                        
                    }
                }
                if(!$(this).is('.active')){
                    $('body').addClass('open-menu');
                    $menu.addClass('open');
                    $(this).addClass('active');
                }
                else{
                    $('body').removeClass('open-menu');
                    $menu.removeClass('open');
                    $(this).removeClass('active');
                }
            });
        }
        if($('.search-button').length){
            $('.search-button').click(function(){
                $('#search-keyword').val('');
                var $search=$('.search-container');                
                if(!$(this).is('.active')){
                    $('body').addClass('open-search');
                    $search.addClass('open');
                    $(this).addClass('active');
                    $('#search-keyword').focus();
                }
                else{
                    $('body').removeClass('open-search');
                    $search.removeClass('open');
                    $(this).removeClass('active');
                    $('.search-result').removeClass('searching');                    
                }
            });
        }
    },    
    gmapInitialize:function(){
        if(jQuery('.gmap').length){
            var your_latitude=jQuery('.gmap').data('latitude');
            var your_longitude=jQuery('.gmap').data('longitude');            
            var mainColor=sfApp.hexColor(jQuery('.gmap-container').css('backgroundColor'));
            var myLatlng = new google.maps.LatLng(your_latitude,your_longitude);
            var mapOptions = {
                zoom: 17,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                mapTypeControl: false,
                panControl: false,
                zoomControl: false,
                scaleControl: false,
                streetViewControl: false,
                scrollwheel: false,
                center: myLatlng,
                styles: [{"stylers":[{"hue": mainColor, "lightness" : 100}]}]
            }
            var map = new google.maps.Map(document.getElementById('gmap'), mapOptions);
            var markerIcon = new google.maps.MarkerImage(
                            sfThemeOptions.global.rootUrl+'/assets/img/map-marker.png',
                            null, // size
                            null, // origin
                            new google.maps.Point( 32, 32 ), // anchor (move to center of marker)
                            new google.maps.Size( 64, 64 ) // scaled size (required for Retina display icon)
                        );            
            var marker = new google.maps.Marker({
                position: myLatlng,
                flat: true,
                icon: markerIcon,
                map: map,
                optimized: false,
                title: 'i-am-here',
                visible: true
            });
        }        
    },
    hexColor:function(colorval) {
        var parts = colorval.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
        delete(parts[0]);
        for (var i = 1; i <= 3; ++i) {
            parts[i] = parseInt(parts[i]).toString(16);
            if (parts[i].length == 1) parts[i] = '0' + parts[i];
        }
        return '#' + parts.join('');
    },
    setCookie: function (key, value) {
        var expires = new Date();
        expires.setTime(expires.getTime() + (1 * 24 * 60 * 60 * 1000));
        document.cookie = key + '=' + value + ';path=/;expires=' + expires.toUTCString();
    },
    getCookie: function (key) {
        var keyValue = document.cookie.match('(^|;) ?' + key + '=([^;]*)(;|$)');
        return keyValue ? keyValue[2] : null;
    },
    searchHandler:function(){
        $('#search-keyword').keypress(function(event) {            
            if (event.which == 13) {
                if($('#search-keyword').val()!='' && $('#search-keyword').val().length>=3){                             
                    $('.search-result').html('<li class="loading-text">Searching ...</li>');
                    $('.search-result').addClass('searching');
                    sfApp.search($('#search-keyword').val());
                }
                else{
                    $('.search-result').html('<li class="loading-text">Please enter at least 3 characters!</li>');
                    $('.search-result').addClass('searching');
                }
            }
        });
    },
    search:function(keyword){
        var hasResult=false;
        var page = 0;
        var maxPage=0;        
        if(keyword != ''){                  
            $.ajax({
                type: 'GET',
                url: sfThemeOptions.global.rootUrl,
                success: function(response){
                    var $response=$(response);
                    var postPerPage=$response.find('section.post').length; 
                    var totalPage=parseInt($response.find('.total-page').html());
                    maxPage=Math.floor((postPerPage*totalPage)/15)+1;                                       
                    var timeout = setInterval(function(){
                        page=page+1;                
                        var ajaxUrl=sfThemeOptions.global.rootUrl+'/rss/'+page+'/';
                        if(page==1){
                            ajaxUrl=sfThemeOptions.global.rootUrl+'/rss/';
                        } 
                        if(page>maxPage){
                            clearInterval(timeout);
                            if(!hasResult){
                                $('.search-result .loading-text').html('Apologies, but no results were found. Please try another keyword!');
                            }
                        }
                        else{                                                                          
                            $.ajax({
                                type: 'GET',
                                url: ajaxUrl,
                                dataType: "xml",
                                success: function(xml) {
                                    if($(xml).length){                                                           
                                        $('item', xml).each( function() {                                                                          
                                            if($(this).find('title').eq(0).text().toLowerCase().indexOf(keyword.toLowerCase())>=0 ||
                                                    $(this).find('description').eq(0).text().toLowerCase().indexOf(keyword.toLowerCase())>=0){
                                                hasResult=true;
                                                if($('.search-result .loading-text').length){
                                                    $('.search-result .loading-text').remove();
                                                }
                                                $('.search-result').append('<li><a href="'+$(this).find('link').eq(0).text()+'">'+$(this).find('title').eq(0).text()+'</a></li>');
                                            }                    
                                        });
                                    }
                                }
                            });   
                        }             
                    }, 1000); 
                }
            });                                           
        }
    },
    isMobile:function(){
        if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
            return true;
        }
        else
            return false;
    },
    refreshIntro:function(){        
        var wHeight = $(window).height();
        if($('#site-intro').length){
            if($('#site-intro').is('.personal')){
                if($('.post-list .post').length){
                    $('#site-intro .author-avatar').html('<img src="'+$('.post-list .post').first().data('author-img')+'" class="img-responsive"/>');    
                    $('#site-intro .author-name').html($('.post-list .post').first().data('author-name'));    
                    $('#site-intro .author-bio').html($('.post-list .post').first().data('author-bio'));    
                }                
            }            
            if($('body').attr('data-site-layout')=='boxed'){                
                if($(window).width()>=1170){
                    $('#site-intro').css('height', Math.floor(wHeight*80/100)+'px');   
                }
                else{
                    $('#site-intro').css('height', wHeight+'px');     
                }
            }
            else{
                $('#site-intro').css('height', wHeight+'px');   
            }
            if(!$('#site-intro').is('.left-style') && ! $('#site-intro').is('.right-style')){
                var introTextMargin=Math.floor($('.intro-text').height()/2);
                $('.intro-wrap').css('margin-top', '-'+introTextMargin+'px');    
            }            
            $('.intro-wrap').css('opacity', '1');
            if($('#site-intro .more-detail').length){
                $('#site-intro .more-detail').css('opacity', '1');
            }
        }
        if($('body').is('.post-template') && $('.post-header').length){
            var percent=70;            
            if(wHeight<=600){
                percent=100;
            }
            $('.post-header').css('height', Math.floor(wHeight*percent/100)+'px');
            $('.post-header .header-wrap').css('opacity', '1');
        }        
    },    
    misc:function(){                   
        $('.more-detail .scrollDown').click(function(){
            $("html, body").animate({scrollTop: $('#start').offset().top-$('.header').outerHeight()+20}, 500);
            return false;
        });  
        $('.more-detail .start').click(function(){
            $("html, body").animate({scrollTop: $('#start').offset().top-$('.header').outerHeight()+20}, 500);
            return false;
        });
        $('.action-list .go-to-blog').click(function(){
            $("html, body").animate({scrollTop: $('#start').offset().top-$('.header').outerHeight()+20}, 500);
            return false;
        });           
        if($('.totop-btn').length){
            $('.totop-btn').click(function () {
                $("html, body").animate({scrollTop: 0}, 800);
                return false;
            });
        }
        if($('.go-to-comment').length){
            $('.go-to-comment').click(function(event) {
                $('html, body').stop().animate({scrollTop: $('.comment-wrap').offset().top}, 500);
            });
        }
        if($('body').is('.post-template') || $('body').is('.page-template')){                      
            var $imgList=$('.post-content').find('img');
            if($imgList.length){
                $imgList.each(function(index, el) {
                    var alt=$(this).attr('alt');                         
                    $(this).addClass('img-responsive'); 
                    $(this).addClass(alt);   
                    if(alt.indexOf('no-responsive')>=0){                        
                        $(this).removeClass('img-responsive');
                    }                    
                    if(alt.indexOf('fullscreen-img')>=0){
                        $(this).wrap('<span class="fullscreen-img-wrap"></span>');
                        var $fullscreenImgWrap=$(this).closest('.fullscreen-img-wrap');
                        $(this).on('load', function(){
                            $fullscreenImgWrap.css({'height': $(this).outerHeight()});    
                        });                                                    
                    }                    
                    else if( alt.indexOf('popup-preview')>=0 || $('body').data('auto-image-popup-preview') ){
                        $(this).wrap( '<a class="popup-preview" href="' + $(this).attr('src') + '"></a>' );
                        var $wrap = $(this).parent();                        
                        if( alt.indexOf( 'alignright' ) >=0 ) {
                            $wrap.addClass( 'alignright' );
                        }
                        if( alt.indexOf( 'alignleft' ) >=0 ) {
                            $wrap.addClass( 'alignleft' );
                        }
                        if( alt.indexOf( 'aligncenter' ) >=0 ) {
                            $wrap.addClass( 'aligncenter' );
                        }
                        $('.popup-preview').magnificPopup({
                            type: 'image',
                            closeOnContentClick: true,
                            closeBtnInside: false,
                            fixedContentPos: true,
                            mainClass: 'mfp-no-margins mfp-with-zoom', // class to remove default margin from left and right side
                            image: {
                                verticalFit: true
                            },
                            gallery: {
                                enabled: true
                            },
                            zoom: {
                                enabled: true,
                                duration: 300 // don't foget to change the duration also in CSS
                            }
                        });
                    }
                });
            }
        }                     
        if(jQuery('.gmap').length){
            sfApp.gmapInitialize();
            google.maps.event.addDomListener(window, 'load', sfApp.gmapInitialize);
            google.maps.event.addDomListener(window, 'resize', sfApp.gmapInitialize);
        }
        var $menu=$('.full-screen-nav');
        if(!$menu.length){                    
            $menu=$('.mini-nav');
            if(!$menu.length){
                $menu=$('.standard-nav');                        
            }
        }
        var currentUrl=window.location.href;
        var $currentMenu=$menu.find('a[href="'+currentUrl+'"]');
        if($currentMenu.length){            
            $('li.active',$menu).removeClass('active');
            $currentMenu.parent().addClass('active');            
        }
        $('input, textarea').placeholder();
    },
    init: function () {
        SC.initialize({
            client_id: "425fc6ee65a14efbb9b83b1c49a87ccb"
        });
        if(typeof window.scStreams == 'undefined' ){
            window.scStreams = [];
        }   
        sfApp.refreshIntro();
        sfApp.formatBlog();
        sfApp.nextPost();
        sfApp.infiniteScrollHandler();        
        sfApp.fitVids();
        sfApp.audioPlayback();      
        sfApp.videoPlayback();      
        sfApp.scrollEvent();
        sfApp.menuEvent();
        sfApp.searchHandler();
        sfApp.mailchimpHandler();        
        sfApp.misc();        
    }
};
/*================================================================*/
/*  2. Initialing
/*================================================================*/
$(document).ready(function() {
    "use strict";  
    sfApp.init();
});
$(window).resize(function () {
    "use strict";    
    if(this.resizeTO){
        clearTimeout(this.resizeTO);
    }  
    this.resizeTO = setTimeout(function() {
        $(this).trigger('resizeEnd');
    }, 500);
});
$(window).bind('resizeEnd', function() {
    "use strict";    
    sfApp.refreshIntro();
});