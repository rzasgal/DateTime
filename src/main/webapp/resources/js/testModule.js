/**
 * Created by pc on 23.03.2015.
 */
angular.module('testModule', ['datetimeModule']).controller('testController',function($scope){
   $scope.person =   { birthdate: new Date()};
});
