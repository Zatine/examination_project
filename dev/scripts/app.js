var app = angular.module('App', []);

app.controller('Documentation', function(){
  var vm = this;
  vm.formData = {};
  vm.options = [{name: 'First selection'}, {name: 'Second Selection'}, {name: 'Third Selection'}];
  return vm;
})
.controller('MenuController', function(){
  var vm = this;
  
  vm.styles = [
    {name: 'Fixed Horizontal', value: 'h-fixed'},
    {name: 'Snap to Top Horizontal', value: 'h-snap'},
    {name: 'Hamburger Menu Horizontal', value: 'h-hamburger'}];  
  vm.menuStyle = vm.styles[0].value;
  
  vm.links = [
    {name: 'Introduction', id: 'intro'},
    {name: 'Basic Styles', id: 'basic-styles'},
    {name: 'Forms', id: 'forms'},
    {name: 'Grid', id: 'grid'},
    {name: 'Helper Classes', id: 'helpers'},
    {name: 'Special Styles', id: 'special-styles'},
    {name: 'Mixins', id: 'mixins'},
    {name: 'Menus', id: 'menus'}
  ]
  return vm;
});