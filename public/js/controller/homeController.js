app.controller("homeCtrl", function($scope, $location, authFactory) {
    $scope.callLogin = function() {
        if ($scope.loginform.city.$valid && $scope.city ) {
            $scope.login();
        }
        else{
            swal ( "Oops" ,  "Pls provide correct city " ,  "error" );
        }
    };

    $scope.login = () => {
        let promise = authFactory.getWeather($scope.city, $scope.password);
        promise.then(data => {
            console.log(data);
            if(data.data.success){
                console.log(data.data);
                $scope.weatherData = data.data;
                swal ( "Success" ,  "Yay and password...", )
            }
            else
                swal ( "Oops" ,  "Somthing went wrong..Pls try again with valid city and password...", "error")
        }, err => {
            swal ( "Oops" ,  "Somthing went wrong..Pls try again with valid city and password..." ,  "error" )
        });
    };
});