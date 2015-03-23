/**
 * Created by pc on 12.03.2015.
 */
angular.module('datetimeModule', []).directive('ngDatetime', function($parse){
return{
  link:function(scope, element, attrs, controller, transcludeFn){
      element.datetime();
      var source = attrs['ngDatetime'];
      var statement =$parse(source);
      element.setDateTime(statement(scope));
      element.on('datetimechanged', function(e){
          scope.$apply(function(){
              statement.assign(scope, e.datetime);
          });
      });

      scope.$watch(source, function(newVal, oldVal){
          element.setDateTime(newVal);
      });
  }
};
});