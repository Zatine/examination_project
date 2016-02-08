app.directive('inputField', function(){
  return {
    restrict: 'E',
    replace: true,
    template: [
                '<div class="form-section">',
                  '<label>',
                    '{{label}}',
                    '<span class="info" ng-if="desc">{{desc}}</span>',
                  '</label>',
                  '<div class="input" ng-class="class">',
                    '<input id="" type="{{type}}" ng-disabled="{{disabled}}"/>',
                    '<i ng-if="icon" class="icon" ng-class="icon"></i>',
                  '</div>'
              ].join(''),
    scope:{
      label: '=',
      type: '=',
      desc: '=',
      disabled: '=',
      icon: '='
    },
    link: function(scope, elm, attrs){
      scope.class = scope.icon ? 'icon-padding' : '';
    }
  }
})
  .directive('radioButton', function(){
    return {
      restrict: 'E',
      replace: true,
      template: [
                  '<div class="inline-block">',
                    '<input type="radio" id="{{id}}" name="{{name}}" value="{{value}}" ng-disabled="{{disabled}}">',
                    '<label for="{{id}}">',
                    '<span><svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="40"/></svg></span>',
                    ' {{label}}',
                    '</label>',
                  '</div>'
                ].join(''),
      scope: {
        label: '=',
        id: '=',
        name: '=',
        disabled: '='
      },
      link: function(scope, elm, attrs){
        scope.value = scope.label.replace(/ /g,"_").toLowerCase();
      }
    }
  })
  .directive('checkbox', function(){
    return {
      replace: true,
      restrict: 'E',
      template: [
                  '<div class="inline-block">',
                    '<input type="checkbox" id="{{id}}" name="{{name}}" value="{{value}}" ng-disabled="{{disabled}}">',
                    '<label for="{{id}}">',
                    '<span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 47.66 48.75"><path d="M2.41,30.3l5.21-7.16A0.81,0.81,0,0,1,8.86,23l9.43,8a0.81,0.81,0,0,0,1.24-.15L40.9,1.37a0.81,0.81,0,0,1,1.19-.19l6.61,5a0.81,0.81,0,0,1,.17,1.06l-28,37.9a0.81,0.81,0,0,1-1.22.17l-17.12-14A0.81,0.81,0,0,1,2.41,30.3Z"/></svg></span>',
                    ' {{label}}',
                    '</label>',
                  '</div'
                ].join(''),
      scope: {
        label: '=',
        id: '=',
        name: '=',
        disabled: '='
      },
      link: function(scope, elm, attrs){
        scope.value = scope.label.replace(/ /g,"_").toLowerCase();
      }
    }
  });