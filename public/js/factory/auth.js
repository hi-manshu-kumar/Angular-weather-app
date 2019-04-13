app.factory("authFactory", function($http, $cookies, $q){
    const object = {
        getWeather (city) {
            let defered = $q.defer();

            $http.get(`weather?location=${city}`)
            .then(data => {
                if(data.status === 200){
                    defered.resolve(data);
                } else {
                    defered.reject(data);
                }
            }, err => {
                defered.reject(err);
            });

            return defered.promise;
        }
    }
        
    return object;
})