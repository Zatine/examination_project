app.directive('links', function(){
  return {
    restrict: 'E',
    template: [ 
              '<ul>',
                  '<li ng-repeat="link in menu.links">',
                    '<a ng-if="!menu.toggle || !link.subMenu" href="{{link.href}}">{{link.name}}</a>',
                    '<span ng-if="menu.toggle && link.subMenu" ng-click="toggleSubMenu(link)">{{link.name}} <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45.88 32.24"><polygon class="a" points="9.98 0.66 23.11 20.19 37.17 0.5 44.92 0.5 23.11 31.38 0.98 0.59 9.98 0.66"/></svg></span>',
                    '<ul ng-if="link.subMenu && !menu.toggle" class="hover">',
                      '<li ng-repeat="subLink in link.subMenu.links">',
                        '<a href="{{subLink.href}}">{{subLink.name}}</a>',
                      '</li>',
                    '</ul>',
                    '<ul ng-if="link.subMenu && menu.toggle" class="toggle" ng-show="link.subMenu.open">',
                      '<li ng-repeat="subLink in link.subMenu.links">',
                        '<a href="{{subLink.href}}">{{subLink.name}}</a>',
                      '</li>',
                    '</ul>',
                '</li>',
              '</ul>'     
    ].join(''),
    scope:
    {
      menu: '='
    },
    link: function(scope, elm, attrs, ctrl){
      scope.toggleSubMenu = function(link){
        link.subMenu.open = link.subMenu.open === undefined ? true : !link.subMenu.open;
      }
    }
  }
})
.directive('hamburger', function(){
  return{
    restrict: 'E',
    transclude: true,
    template: [ '<div class="hamburger-container" ng-class="{\'active\': show}">',
                '<button class="hamburger" ng-class="{\'active\': show}" ng-click="toggleMenu()">',
                  '<span>Toggle Menu</span>',
                '</button>',
                '<div class="menu"><ng-transclude></ng-transclude></div>',
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