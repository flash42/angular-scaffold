angular.module('MyApp', []).service('MyService', function ($http, $q) {
    var MyService = {
        getMovies: function () {
            var deferred = $q.defer();
            $http.jsonp('/url/movies')
                .success(function (data, status, headers, config) {
                deferred.resolve({
                    results: data.results
                });
            }).error(function (msg, code) {
                console.log("running tests baby", msg, code);
                msg = msg || 'Request failed: ';
                deferred.reject(msg);
            });
            return deferred.promise;
        }
    };

    return MyService;
});
