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
            if(data.data.success){
                $scope.weatherData = data.data;
                $scope.data = data.data.weatherData.weatherArray.map(element => element.temperature)
                $scope.labels = data.data.weatherData.weatherArray.map(element => element.date)
                swal ( "Success" ,  "Weather Data received ..", )
            }
            else
                swal ( "Oops" ,  "Somthing went wrong..Pls try again with valid city and password...", "error")
        }, err => {
            swal ( "Oops" ,  "Somthing went wrong..Pls try again with valid city and password..." ,  "error" )
        });
    };

    $scope.labels = [];
    $scope.data = [];
    $scope.colors= ["rgb(159,204,0)","rgb(250,109,33)","rgb(154,154,154)"];
    $scope.onClick = function (points, evt) {
    //   console.log(points, evt);
    };
    $scope.datasetOverride = [{ yAxisID: 'y-axis-1' }];
    $scope.options = {
      scales: {
        yAxes: [
          {
            id: 'y-axis-1',
            type: 'linear',
            display: true,
            position: 'left'
          }
        ]
      }
    };
});