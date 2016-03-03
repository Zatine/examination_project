app.directive('modal', function($timeout, $window){
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
        '<div class="modal-overlay" ng-show="show" ng-click="close()">',
          '<div class="modal-wrapper" ng-click="$event.stopPropagation()">',
              '<span class="close-modal" ng-click="close()"><i class="icon-close"></i></span>',
              '<div data-ng-transclude></div>',
              '<span ng-if="previous" class="previous" ng-click="previousButton()"><i class="icon-chevron_left_light"></i></span>',
              '<span ng-if="next" class="next" ng-click="nextButton()"><i class="icon-chevron_right_light"></i></span>',
          '</div>',
        '</div>'
    ].join(''),
    link: function(scope, elm, attrs){
      var wrapper = elm.children()[0],
          height = $window.innerHeight;
          wrapper.style.height = height + 'px';
      
      scope.$watch('show', function (newValue){
        if(newValue) {
          $timeout(function(){
            height = $window.innerHeight;
            wrapper.style.height = height + 'px';
            setWidth();
            setTop();
          });
        }
      }, true);
      
      scope.nextButton = function(){
        scope.next();
        $timeout(function(){
          setWidth();
          setTop();
        });
      };
      
      scope.previousButton = function(){
        scope.previous();
        $timeout(function(){
          setWidth();
          setTop();
        });
      };
      
      function setTop(){
        var image = wrapper.children[1].children[0],
            top = image.offsetHeight,
            previous = wrapper.children[2],
            next = wrapper.children[3];
                
        previous.style.top = (top / 2) + 'px';
        next.style.top = (top / 2) + 'px';
      }
      
      function setWidth(){
        wrapper.style.minWidth = '0px';
        $timeout(function(){
          var width = wrapper.children[1].children[0].offsetWidth;
          wrapper.style.minWidth = width + 'px';
        });
      }
      
      scope.close = function(){
        scope.show = false;
        wrapper.style.minWidth = '0px';
      }
    }    
  }
});