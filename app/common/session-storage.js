angular.module('issueTrackingSystem.common.sessionStorage', [])
    .factory('projectSessionStorage', [
        function () {
            
            function get(key) {
                return sessionStorage[key];
            }
            
            function addOrUpdate(key, value) {
                sessionStorage[key] = value;
            }
            
            function deleteItem(key){
                delete sessionStorage[key];
            }
            
            return {
                get: get,
                addOrUpdate: addOrUpdate,
                deleteItem: deleteItem
            }
    }])