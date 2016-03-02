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
                    '<input type="radio" id="{{\'id_\' + id}}" name="{{name}}" value="{{value}}" ng-disabled="disabled" ng-model="model" form="{{formName}}">',
                    '<label for="{{\'id_\' + id}}">',
                    '<span tabindex="0"><svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="40"/></svg></span>',
                    ' {{label}}',
                    '</label>',
                  '</div>'
                ].join(''),
      scope: {
        label: '@',
        id: '@',
        name: '@',
        model: '=?ngModel',
        formName: '@?form',
        value: '=?'
      },
      link: function(scope, elm, attrs, ctrl){
        var focused = false;
        if(ctrl[0]) scope.formName = ctrl[0].$name; scope.form = ctrl[0];
        scope.value = scope.value || scope.label.replace(/ /g,"_").toLowerCase();
        if(attrs.disabled !== undefined) scope.disabled = true;
        if(attrs.checked !== undefined) scope.model = scope.value;
        
        elm.bind('keypress', function(event){
          if(event.keyCode !== 13 || scope.disabled) return true;
          scope.model = scope.value;
          if(!scope.$$phase) scope.$apply();
        });
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
                    '<input type="checkbox" id="{{\'id_\' + id}}" name="{{name}}" value="{{value}}" ng-disabled="disabled" form="{{formName}}" ng-model="model">',
                    '<label for="{{\'id_\' + id}}" ng-class="{\'disabled\': disabled}">',
                    '<span tabindex="0"><i class="icon-check"></i></span>',
                    ' {{label}}',
                    '</label>',
                  '</div'
                ].join(''),
      scope: {
        label: '@',
        id: '@',
        name: '@',
        model: '=?ngModel',
        formName: '@?form',
        value: '=?'
      },
      link: function(scope, elm, attrs, ctrl){
        if(ctrl[0]) scope.formName = ctrl[0].$name; scope.form = ctrl[0];
        scope.value = scope.value || scope.label.replace(/ /g,"_").toLowerCase();
        if(attrs.disabled !== undefined) scope.disabled = true;
        scope.model = scope.model ? scope.model : false;
        
        elm.bind('keypress', function(event){
          if(event.keyCode !== 13 || scope.disabled) return true;
          scope.model = !scope.model;
          if(!scope.$$phase) scope.$apply();
        });
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
                    '<ul ng-class="{\'disabled\': disabled}" tabindex="0" ng-blur="hideMenu()">',
                      '<li ng-click="toggleMenu()">',
                      '<label><i class="icon-chevron_down_light"></i></label>',
                      '{{model.name}}</li>',
                      '<li ng-show="showMenu" ng-repeat="option in options" ng-click="setModel(option)" ng-class="{\'active\': model === option}">{{option.name}}</li>',
                      '</ul>',
                    '</div>',
                    '<div class="multiple" ng-switch-when="true">',
                    '<select form="{{formName}}" ng-options="option.name for option in options" ng-model="model" id="{{id}}" name="{{name}}" multiple ng-disabled="{{disabled}}"></select>',
                    '<ul ng-class="{\'disabled\': disabled}" tabindex="0" ng-blur="resetIndex()">',
                      '<li ng-repeat="option in options" ng-click="toggleOption(option)" ng-class="{\'active\': $index === multipleIndex, \'selected\': model.indexOf(option) !== -1}">{{option.name}}</li>',
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
        if(attrs.disabled !== undefined) scope.disabled = true;
        if(attrs.multiple !== undefined) scope.multiple = true;
        scope.model = scope.multiple ? [] : (scope.model || scope.options[0]);
        
        var navigateMenu;
        
        if(!scope.multiple){
            scope.showMenu = false;
            scope.toggleMenu = function(){
              if(scope.disabled) return;
              scope.showMenu = !scope.showMenu;
            };
            scope.hideMenu = function(){
              scope.showMenu = false;
            }
            scope.setModel = function(option){
              scope.model = option;
              scope.showMenu = false;
            }
            
            navigateMenu = function (event){
              var index = scope.options.indexOf(scope.model);
               //enter
              if(event.keyCode === 13){
                scope.toggleMenu();
              }
              //up
              else if(event.keyCode === 38){
                  if(index === 0) return;
                  scope.model = scope.options[index - 1];
              }
              //down
              else if(event.keyCode === 40){
                if(index === scope.options.length - 1) return;
                scope.model = scope.options[index + 1];
              }
            }
        }
        
        if(scope.multiple){
          scope.toggleOption = function(option){
            if(scope.disabled) return;
            if(scope.model.indexOf(option) !== -1) scope.model.splice(scope.model.indexOf(option), 1);
            else scope.model.push(option);
          }

          scope.resetIndex = function(){
            scope.multipleIndex = undefined;
          }
          
          navigateMenu = function(event){
              //enter
              if(event.keyCode === 13){
                scope.toggleOption(scope.options[scope.multipleIndex]);
              }
              //up
              else if(event.keyCode === 38){
                if(scope.multipleIndex === 0) return;
                if(scope.multipleIndex === undefined) scope.multipleIndex = scope.options.length - 1;
                else scope.multipleIndex--;
              }
              //down
              else if(event.keyCode === 40){
                if(scope.multipleIndex === scope.options.length - 1) return;
                if(scope.multipleIndex === undefined) scope.multipleIndex = 0;
                else scope.multipleIndex++;
              }
          }
        }
        
        
        elm.bind('keydown', function(event){
          if(event.keyCode !== 38 && event.keyCode !== 40 && event.keyCode !== 13) return true;
          if(scope.disabled) return;
          event.preventDefault();
          
          navigateMenu(event);
          if(!scope.$$phase) scope.$apply();
        });
          
        
        $document.bind('click', function(event){
          elm.removeAttr('id');
          if(event.path.indexOf(elm[0]) !== -1) return;
          scope.menu = false;
          if(!scope.$$phase) scope.$apply();
        });
      }
    }

});