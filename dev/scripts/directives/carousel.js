app.directive('carousel', function($interval, $timeout, $window){
  return{
    restrict: 'E',
    replace: true,
    transclude: true,
    scope: {
      interval: '=?'
    },
    template: [
      '<div class="carousel">',
        '<ul data-ng-transclude></ul>',
        '<div class="indicators">',
          '<div class="indicator" ng-repeat="item in items" ng-if="$index < items.length - 1" ng-class="{\'active\': item === activeSlide}" ng-click="getSlide($index)">',
          '</div>',
        '</div>',
      '</div>'
    ].join(''),
    link: function(scope, elm, attrs){
      var width,
          interval,
          reset,
          list = elm[0].children[0];
      
      scope.interval = scope.interval || 5000;
      scope.items = [].slice.call(list.children);
      scope.activeSlide = scope.items[0];
      scope.items.push(scope.items[0].cloneNode(true));
      list.appendChild(scope.items[scope.items.length - 1]);
      setWidths();
      
      function setWidths(){
        $timeout(function(){
          width = elm[0].offsetWidth;
          list.style.width = (scope.items.length * width) + 'px';

          for(var i = 0; i < scope.items.length; i++){
            scope.items[i].style.width = width + 'px';
          }
        });
      }
      
      interval = $interval(nextSlide, scope.interval);
      
      function nextSlide(){
        list.style.transition = '1s';
        var index = scope.items.indexOf(scope.activeSlide);
        index++;
        scope.activeSlide = scope.items[index];
        list.style.left = '-' + (width * index) + 'px';
        if(index == scope.items.length - 1){
          $timeout(function(){
            resetCarousel();
            return;
          }, 1000);        
        }
      }
      
      function resetCarousel(){
        list.style.transition = 'none';
        scope.activeSlide = scope.items[0];
        list.style.left = '0px';
      }
      
      scope.getSlide = function(index){
        scope.activeSlide = scope.items[index];
        list.style.left = '-' + (width * index) + 'px';
        $interval.cancel(interval);
        $interval.cancel(reset);
        reset = $interval(function(){
          interval = $interval(nextSlide, scope.interval);
          $interval.cancel(reset);
        }, (scope.interval * 2));
        
      }
      
      angular.element($window).bind('resize', setWidths);
    }
  }
});