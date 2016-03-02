app.directive('modal', function($timeout){
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
            '<span class="close-modal" ng-click="close()"><i class="icon-close"></i></span>',
            '<div data-ng-transclude></div>',
            '<span ng-if="previous" class="previous" ng-click="previousButton()"><i class="icon-chevron_left_light"></i></span>',
            '<span ng-if="next" class="next" ng-click="nextButton()"><i class="icon-chevron_right_light"></i></span>',
          '</div>',
        '</div>'
    ].join(''),
    link: function(scope, elm, attrs){
      var content;
      
      content = elm.children()[0];
      
      scope.nextButton = function(){
        scope.next();
        setWidth();
      };
      
      scope.previousButton = function(){
        scope.previous();
        setWidth();
      };
      
      function setWidth(){
        content.setAttribute('style', 'min-width:0px;');
        $timeout(function(){
          var width = content.children[1].children[0].offsetWidth;
          content.setAttribute('style', 'min-width:' + width + 'px;');
        });
      }
      
      scope.close = function(){
        scope.show = false;
        content.setAttribute('style', '');
      }
    }    
  }
});