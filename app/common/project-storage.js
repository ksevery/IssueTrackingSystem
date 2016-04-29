angular.module('issueTrackingSystem.common.localStorage', [])
    .factory('projectLocalStorage', [
        function () {
            function get(key) {
                return localStorage[key];
            }
            
            function addOrUpdate(key, value) {
                localStorage[key] = value;
            }
            
            function deleteItem(key){
                delete localStorage[key];
            }
            
            return {
                get: get,
                addOrUpdate: addOrUpdate,
                deleteItem: deleteItem
            }
    }])