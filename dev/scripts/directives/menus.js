app.directive('links', function(){
  return {
    restrict: 'E',
    template: [ 
              '<ul>',
                  '<li ng-repeat="link in items">',
                    '<a href="{{link.href}}">{{link.name}}</a>',
                    '<ul ng-if="link.subMenu"">',
                      '<li ng-repeat="subLink in link.subMenu">',
                        '<a href="{{subLink.href}}">{{subLink.name}}</a>',
                      '</li>',
                    '</ul>',
                '</li>',
              '</ul>'     
    ].join(''),
    scope:
    {
      items: '='
    },
    link: function(scope, elm, attrs, ctrl){
    }
  }
})
.directive('hamburger', function(){
  return{
    restrict: 'E',
    transclude: true,
    template: [ '<div>',
                '<button class="hamburger" ng-class="{\'active\': show}" ng-click="toggleMenu()">',
                  '<span>Toggle Menu</span>',
                '</button>',
                '<ng-transclude ng-show="show"></ng-transclude>',
               '</div>'
    ].join(''),
    link: function(scope, elm, attrs){
      scope.show = false;
      scope.toggleMenu = function(){
        scope.show = !scope.show;
      }
    }
  }
});