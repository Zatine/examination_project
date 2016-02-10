var app = angular.module('App', []);

app.controller('Documentation', function(){
  var vm = this;
  vm.formData = {};
  vm.options = [{name: 'First selection'}, {name: 'Second Selection'}, {name: 'Third Selection'}];
  return vm;
});