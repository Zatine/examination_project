app.directive('coloredWords', function(){
  return {
    restrict: 'C',
    link: function(scope, elm, attrs){
      var text = elm[0].innerHTML;
      text = text.split(' ');
      for(var i = 0; i < text.length; i++){
        text[i] = '<span class="color-span">' + text[i] + '</span>';
      }
      elm[0].innerHTML = text.join(' ');
    }
  }
})
.directive('slanted', function(){
  return{
    restrict: 'C',
    link: function(scope, elm, attrs){
      var html = '<div class="content">' + elm[0].innerHTML + '</div>';
      elm[0].innerHTML = html;
    }
  }
})
.directive('getOrientation', function($timeout){
  return{
    restrict: 'A',
    link: function(scope, elm, attrs){
      $timeout(function(){
        if(elm[0].offsetWidth == elm[0].offsetHeight){
          elm.addClass('square');
        }      
        else if(elm[0].offsetWidth > elm[0].offsetHeight){
          elm.addClass('landscape');
        }
        else{
          elm.addClass('portrait');
        }
      });
    }
  }
})
.directive('snapToTop', function($document, $window){
  return {
    restrict: 'A',
    link: function(scope, elm, attrs){
      var originalPos = getPos(elm[0]),
          originalWidth = elm[0].offsetWidth,
          snapClass = 'snap-top',
          keepPos;
      
      if(attrs.keepPos !== undefined) keepPos = true;
      
      function getPos(el) {
          for (var lx=0, ly=0;
               el != null;
               lx += el.offsetLeft, ly += el.offsetTop, el = el.offsetParent);
          return {x: lx,y: ly};
      }
      
      $document.bind('scroll', function(){
        var scrollTop = $window.scrollY || document.documentElement.scrollTop;
        if(scrollTop >= originalPos.y){
          if(elm.hasClass(snapClass)) return;
          elm.addClass(snapClass);
          if (keepPos) {
            elm[0].style.width = originalWidth + 'px';
            elm[0].style.left = originalPos.x + 'px';
          }
        }
        else{
          if(!elm.hasClass(snapClass)) return;
          elm.removeClass(snapClass);
          elm.attr('style', '');
        }
      });
    }
  }
});