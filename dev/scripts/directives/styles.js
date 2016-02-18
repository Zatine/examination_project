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
});