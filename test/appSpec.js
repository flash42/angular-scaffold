describe('Service: ', function () {
    var service,
    $httpBackend,
    url = '/url/movies',
        returnedPromise,
        result;

    //load the angular app module
    beforeEach(function () {
        module('MyApp');
    });
    // inject your service and $httpBackend from angular-mocks.js
    beforeEach(inject(function (MyService, _$httpBackend_) {
        service = MyService;
        $httpBackend = _$httpBackend_;
        // invoke your getMovies method
        returnedPromise = service.getMovies();
    }));

    //make sure no expectations where missed
    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('should make a successful API call and return a list of movies', function () {
        var expectedResult = {
            results: []
        };
        $httpBackend.whenJSONP(url).respond({
            results: []
        });
        returnedPromise.then(function (response) {
            result = response;
        });
        $httpBackend.flush();
        expect(result).toEqual(expectedResult);
    });

    it('should make a unsuccessful API call and return an error', function () {
        var expectedResult = 'Request failed: ';
        $httpBackend.whenJSONP(url).respond(401);
        returnedPromise.then(function (response) {}, function (msg) {
            result = msg;
        });
        $httpBackend.flush();
        expect(result).toEqual(expectedResult);
    });
});

