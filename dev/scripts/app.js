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
    {name: 'Hamburger Menu Horizontal', value: 'h-hamburger'},
    {name: 'Vertical', value: 'vertical'},
    {name: 'Fixed Vertical', value: 'v-fixed'},
    {name: 'Snap to Top Vertical', value: 'v-snap'},
    {name: 'Hamburger Menu Vertical', value: 'v-hamburger'}];  
  vm.menuStyle = vm.styles[4].value;
  
  vm.menu = {
    toggle: false,
    links: [
    {name: 'Introduction', href: '#intro'},
    {name: 'Menus', href: '#menus'},
    {name: 'Basic Styles', href: '#basic-styles'},
    {name: 'Forms', href: '#forms'},
    {name: 'Grid', href: '#grid'},
    {name: 'Helper Classes', href: '#helpers'},
    {name: 'Special Styles', href: '#special-styles'},
    {name: 'Mixins', href: '#mixins', 
     subMenu: {
       links: [{name: 'Basic', href: '#mixins-basic'},
               {name: 'Containers', href: '#mixins-containers'},
               {name: 'Text', href: '#mixins-text'},
               {name: 'Other', href: '#mixins-other'}]}},
  ]};
  
  vm.toggleSubMenuToggle = function(){
    vm.menu.toggle = !vm.menu.toggle;
  }
  
  return vm;
});