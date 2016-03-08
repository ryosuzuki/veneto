
angular.module('app', [])
.controller('MainCtrl', function ($scope, $compile) {
  var json = {
    users: [
      { name: 'Name 1', about: 'Hello world 1'},
      { name: 'Name 2', about: 'Hello world 2'}
    ]
  }
  window.scope = $scope;
  $scope.data = json;

  $scope.getData = function () {
    return JSON.stringify($scope.data, null, 2)
  }
  $scope.$watch('data', function () {
    $scope.users = $scope.data.users;
  })

  getList($('#original'));
  var html = getHTML()
  console.log(html)
  $('#generate').html($compile(html)($scope));
  // $scope.$apply()

})
