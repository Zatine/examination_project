app.directive('modal', function(){
  return {
    restrict: 'E',
    transclude: true,
    replace: true,
    scope: {
      show: '=',
      next: '&?',
      previous: '&?'
    },
    template: [
        '<div class="modal" ng-show="show" ng-click="close()">',
          '<div class="modal-content" ng-click="$event.stopPropagation()">',
            '<span class="close-modal" ng-click="close()">x</span>',
            '<span ng-if="previous" class="previous">&lt;</span>',
            '<span ng-if="next" class="next" ng-click="next()">&gt;</span>',
            '<div data-ng-transclude></div>',
          '</div>',
        '</div>'
    ].join(''),
    link: function(scope, elm, attrs){

      scope.close = function(){
        scope.show = false;
      }
    }    
  }
});