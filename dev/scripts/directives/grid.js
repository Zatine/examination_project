app.directive('row', function(){
  return {
    restrict: 'E',
    replace: true,
    transclude: true,
    template: '<div class="row" data-ng-transclude></div>'
  }
})
.directive('column', function(){
  return{
    restrict: 'E',
    replace: true,
    transclude: true,
    template: '<div class="col" ng-class="width"><div ng-class="class" data-ng-transclude></div></div>',
    scope: true,
    link: function(scope, elm, attrs){
      var columns = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve'];
      
      for(var i = 0; i < columns.length; i++){
        if(attrs[columns[i]] !== undefined) scope.width = columns[i];
      }
      
      if(attrs.class !== undefined){
        scope.class = attrs.class.split('col').join('');
        elm.removeClass(scope.class);
      }
    }
  }
});