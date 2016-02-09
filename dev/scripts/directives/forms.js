app.directive('inputField', function(){
  return {
    restrict: 'E',
    require: ['?^form'],
    replace: true,
    template: [
                '<div class="form-section" ng-class="class.row">',
                  '<div ng-class="class.left">',
                    '<label for="{{id}}">',
                      '{{label}}',
                      '<span class="info" ng-if="desc">{{desc}}</span>',
                    '</label>',
                  '</div>',
                  '<div ng-class="class.right">',
                    '<div class="input" ng-class="class.icon">',
                      '<input id="{{id}}" type="{{type}}" placeholder="{{placeholder}}" ng-model="model" form="{{form.$name}}" name="{{name}}" ng-required="required" maxlength="{{maxlength}}" ng-maxlength="maxlength" ng-minlength="minlength" ng-change="change()" ng-disabled="disabled" ng-blur="validate()">',
                      '<div ng-show="errorMessage && form[name].$touched" class="error">',
                        '<p ng-show="errorMessage.required">This field is required.</p>',
                        '<p ng-show="errorMessage.minlength">This field is too short.</p>',
                        '<p ng-show="errorMessage.maxlength">This field is too long.</p>',
                        '<p ng-show="errorMessage.email">Invalid e-mail.</p>',
                      '</div>',
                      '<i ng-if="icon" class="icon" ng-class="icon"></i>',
                    '</div>',
                  '</div>'
              ].join(''),
    scope:{
      id: '=',
      type: '=?',
      placeholder: '=?',
      label: '=',
      desc: '=?',
      icon: '=?',
      grid: '=?',
      maxlength: '=?ngMaxlength',
      minlength: '=?ngMinlength',
      readonly: '=?',
      name: '=?',
      required: '=?ngRequired',
      change: '&?ngChange',
      model: '=?ngModel'
    },
    link: function(scope, elm, attrs, ctrl){
      scope.form = ctrl[0];
      
      if(scope.type === 'radio' || scope.type === 'submit' || scope.type === 'checkbox' || !scope.type){
        scope.type = 'text';
      }
      scope.class = {
                      icon: scope.icon ? 'icon-padding' : '',
                      row: scope.grid ? 'row' : '',
                      left: scope.grid ? 'four col' : '',
                      right: scope.grid ? 'eight col' : ''
                    };
      
      scope.name = scope.name || scope.label.replace(/ /g,"_").toLowerCase();
      
      if(attrs.disabled !== undefined) scope.disabled = true;
      
      if(scope.form){
        scope.validate = function(){
          scope.errorMessage = scope.form[scope.name].$error;
        }
      }
    }
  }
})
  .directive('radioButton', function(){
    return {
      restrict: 'E',
      replace: true,
      require: ['?^form'],
      template: [
                  '<div class="inline-block">',
                    '<input type="radio" id="{{id}}" name="{{name}}" value="{{value}}" ng-disabled="{{disabled}}" ng-model="model">',
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
        model: '=?ngModel'
      },
      link: function(scope, elm, attrs, ctrl){
        scope.form = ctrl[0];
        scope.value = scope.label.replace(/ /g,"_").toLowerCase();
        if(attrs.disabled !== undefined) scope.disabled = true;
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