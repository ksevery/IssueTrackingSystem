angular.module('issueTrackingSystem.labels.service', [])
    .factory('labels', [
        '$http',
        '$q',
        'BASE_URL',
        'identity',
        function ($http, $q, BASE_URL, identity) {
            function getLabelsByName(labelName) {
                var deferred = $q.defer();

                $http.get(BASE_URL + 'Labels/?filter=' + labelName, {
                        headers: {
                            Authorization: 'Bearer ' + identity.getAccessToken()
                        }
                    })
                    .then(function (response) {
                        deferred.resolve(response.data);
                    });

                return deferred.promise;
            }

            return {
                getLabelsByName: getLabelsByName
            }
        }
    ])