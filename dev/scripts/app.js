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
    {name: 'Horizontal', value: 'horizontal'},
    {name: 'Fixed Horizontal', value: 'h-fixed'},
    {name: 'Snap to Top Horizontal', value: 'h-snap'},
    {name: 'Hamburger Menu Horizontal', value: 'h-hamburger'}];  
  vm.menuStyle = vm.styles[0].value;
  
  vm.links = [
    {name: 'Introduction', href: '#intro'},
    {name: 'Basic Styles', href: '#basic-styles'},
    {name: 'Forms', href: '#forms'},
    {name: 'Grid', href: '#grid'},
    {name: 'Helper Classes', href: '#helpers'},
    {name: 'Special Styles', href: '#special-styles'},
    {name: 'Mixins', href: '#mixins', subMenu: [{name: 'Containers', href: '#containers'},{name: 'Text', href: '#text'},{name: 'Other', href: '#other'}]},
    {name: 'Menus', href: '#menus'}
  ]
  return vm;
});