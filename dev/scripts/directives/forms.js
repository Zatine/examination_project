app.directive('formSection', function(){
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
                  '<div ng-show="hide" class="error"><p>Invalid input type.</p></div>',
                  '<div ng-class="class.right" ng-hide="hide">',
                    '<div class="input" ng-class="class.icon" ng-switch="field">',
                      '<input ng-switch-when="input" id="{{id}}" type="{{type}}" placeholder="{{placeholder}}" ng-model="model" form="{{formName}}" name="{{name}}" ng-required="required" maxlength="{{maxlength}}" ng-maxlength="maxlength" ng-minlength="minlength" ng-change="change()" ng-disabled="disabled" ng-blur="validate()" ng-readonly="readonly">',
                      '<textarea ng-switch-when="textarea" id="{{id}}" placeholder="{{placeholder}}" ng-model="model" form="{{form.$name}}" name="{{name}}" ng-required="required" maxlength="{{maxlength}}" ng-maxlength="maxlength" ng-minlength="minlength" ng-change="change()" ng-disabled="disabled" ng-blur="validate()" ng-readonly="readonly"></textarea>',
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
      id: '@',
      type: '@?',
      placeholder: '@?',
      label: '@',
      desc: '@?',
      icon: '@?',
      grid: '=?',
      maxlength: '=?ngMaxlength',
      minlength: '=?ngMinlength',
      readonly: '=?',
      name: '=?',
      required: '=?ngRequired',
      change: '&?ngChange',
      model: '=?ngModel',
      field: '@',
      formName: '@?form'
    },
    link: function(scope, elm, attrs, ctrl){
      elm.removeAttr('id');
      if(ctrl[0]) scope.formName = ctrl[0].$name; scope.form = ctrl[0];
      var disallowed = ['radio', 'submit', 'checkbox', 'file', 'color', 'image'];
      if(disallowed.indexOf(scope.type) !== -1){
          scope.hide = true;
      }

      scope.class = {
                      icon: scope.icon ? 'icon-padding' : '',
                      row: scope.grid ? 'row' : '',
                      left: scope.grid ? 'four col' : '',
                      right: scope.grid ? 'eight col' : ''
                    };
      
      scope.name = scope.name || scope.label.replace(/ /g,"_").toLowerCase();
      
      if(attrs.disabled !== undefined) scope.disabled = true;
      
      if(ctrl[0]){
        scope.validate = function(){
          scope.errorMessage = ctrl[0][scope.name].$error;
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
                    '<input type="radio" id="{{id}}" name="{{name}}" value="{{value}}" ng-disabled="{{disabled}}" ng-model="model" form="{{formName}}">',
                    '<label for="{{id}}">',
                    '<span><svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="40"/></svg></span>',
                    ' {{label}}',
                    '</label>',
                  '</div>'
                ].join(''),
      scope: {
        label: '@',
        id: '@',
        name: '@',
        model: '=?ngModel',
        formName: '@?form'
      },
      link: function(scope, elm, attrs, ctrl){
        elm.removeAttr('id');
        if(ctrl[0]) scope.formName = ctrl[0].$name; scope.form = ctrl[0];
        scope.value = scope.label.replace(/ /g,"_").toLowerCase();
        if(attrs.disabled !== undefined) scope.disabled = true;
        if(attrs.checked !== undefined) scope.model = scope.value;
      }
    }
  })
  .directive('checkbox', function(){
    return {
      replace: true,
      restrict: 'E',
      require: ['?^form'],
      template: [
                  '<div class="inline-block">',
                    '<input type="checkbox" id="{{id}}" name="{{name}}" value="{{value}}" ng-disabled="{{disabled}}" form="{{formName}}" ng-model="model">',
                    '<label for="{{id}}">',
                    '<span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 47.66 48.75"><path d="M2.41,30.3l5.21-7.16A0.81,0.81,0,0,1,8.86,23l9.43,8a0.81,0.81,0,0,0,1.24-.15L40.9,1.37a0.81,0.81,0,0,1,1.19-.19l6.61,5a0.81,0.81,0,0,1,.17,1.06l-28,37.9a0.81,0.81,0,0,1-1.22.17l-17.12-14A0.81,0.81,0,0,1,2.41,30.3Z"/></svg></span>',
                    ' {{label}}',
                    '</label>',
                  '</div'
                ].join(''),
      scope: {
        label: '@',
        id: '@',
        name: '@',
        model: '=?ngModel',
        formName: '@?form'
      },
      link: function(scope, elm, attrs, ctrl){
        elm.removeAttr('id');
        if(ctrl[0]) scope.formName = ctrl[0].$name; scope.form = ctrl[0];
        scope.value = scope.label.replace(/ /g,"_").toLowerCase();
        if(attrs.disabled !== undefined) scope.disabled = true;
      }
    }
  })
.directive('dropdown', function($document){
    return {
      replace: true,
      restrict: 'E',
      require: ['?^form'],
      template: [
                  '<div ng-switch="multiple">',
                  '<div class="dropdown" ng-switch-when="false">',
                    '<select form="{{formName}}" ng-options="option as option.name for option in options" ng-model="model" id="{{id}}" name="{{name}}" ng-disabled="{{disabled}}"></select>',
                    '<ul ng-class="ulClass">',
                      '<li ng-click="toggleMenu()">',
                      '<label><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45.88 32.24"><polygon class="a" points="9.98 0.66 23.11 20.19 37.17 0.5 44.92 0.5 23.11 31.38 0.98 0.59 9.98 0.66"/></svg></label>',
                      '{{model.name}}</li>',
                      '<li ng-show="menu" ng-repeat="option in options" ng-click="setModel(option)">{{option.name}}</li>',
                      '</ul>',
                    '</div>',
                    '<div class="multiple" ng-switch-when="true">',
                    '<select form="{{formName}}" ng-options="option.name for option in options" ng-model="model" id="{{id}}" name="{{name}}" multiple ng-disabled="{{disabled}}"></select>',
                    '<ul ng-class="ulClass">',
                      '<li ng-repeat="option in options" ng-click="toggleOption(option)" ng-class="option.class">{{option.name}}</li>',
                    '</ul>',
                  '</div>'
      ].join(''),
      scope: {
        options: '=',
        model: '=?ngModel',
        id: '@',
        multiple: '=?',
        name: '@?',
        formName: '@?form'
      },
      link: function(scope, elm, attrs, ctrl){
        scope.multiple = false;
        if(ctrl[0]) scope.formName = ctrl[0].$name; scope.form = ctrl[0];
        if(attrs.disabled !== undefined) {scope.disabled = true; scope.ulClass = 'disabled';}
        if(attrs.multiple !== undefined) scope.multiple = true;
        scope.model = scope.multiple ? [] : (scope.model || scope.options[0]);
        scope.menu = false;
        
        scope.toggleMenu = function(){
          if(scope.disabled) return;
          scope.menu = !scope.menu;
        };
        scope.setModel = function(option){
          scope.model = option;
          scope.menu = false;
        }
        
        scope.toggleOption = function(option){
          if(scope.disabled) return;
          if(scope.model.indexOf(option) !== -1) {scope.model.splice(scope.model.indexOf(option), 1); option.class = '';}
          else {scope.model.push(option); option.class = 'selected';}
        }
        
        $document.bind('click', function(event){
          elm.removeAttr('id');
          if(event.path.indexOf(elm[0]) !== -1) return;
          scope.menu = false;
          if(!scope.$$phase) scope.$apply();
        });
      }
    }

});