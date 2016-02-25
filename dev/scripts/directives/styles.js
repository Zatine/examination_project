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
.directive('snapToTop', function($document, $window){
  return {
    restrict: 'A',
    link: function(scope, elm, attrs){
      var originalPos = getPos(elm[0]),
          originalWidth = elm[0].offsetWidth,
          snapClass = 'snap-top',
          keepPos;
      
      console.log(elm[0].offsetTop);
      if(attrs.keepPos !== undefined) keepPos = true;
      
      function getPos(el) {
          for (var lx=0, ly=0;
               el != null;
               lx += el.offsetLeft, ly += el.offsetTop, el = el.offsetParent);
          return {x: lx,y: ly};
      }
      
      $document.bind('scroll', function(){
        if($window.scrollY >= originalPos.y){
          if(elm.hasClass(snapClass)) return;
          elm.addClass(snapClass);
          if (keepPos) elm.attr('style', 'width:' + originalWidth + 'px;left:' + originalPos.x + 'px;');
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