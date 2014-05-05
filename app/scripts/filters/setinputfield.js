'use strict';

angular.module('neurocidEditorApp')
  .filter('setInputField', function ($sce) {
    return function (value, name) {
        switch(typeof value) {
          case 'number':
            return $sce.trustAsHtml('<input type="number" name="'+name+'" ng-model="model_'+name+'" value="'+value+'" />');
          case 'boolean':
              console.log(name,typeof value);
            return $sce.trustAsHtml('<label><input type="checkbox" name="'+name+'" ng-model="model_'+name+' value="left" bs-checkbox/> '+name+'</label>')
          case 'object':
            return  $sce.trustAsHtml('<hr>') ;
        }
    };
  });
