angular.module('myApp',[])
.controller('AppCtrl',['$scope','$http',
function($scope,$http){
	console.log("Hello World from Controller");

	var refresh = function(){

	$http.get('/patientlist').then(function(response){
        console.log("I got the data ");
        $scope.patientlist = response.data;
        $scope.patient=null;
    });﻿

};
refresh();

    $scope.addPatient = function(){
    	console.log($scope.patient);
    	$http.post('/patientlist', $scope.patient).then(function(response){
    		console.log(response);
    		refresh();
    	});
    };

    $scope.remove = function(id){
    	console.log(id);
    	$http.delete('/patientlist/'+id).then(function(response){
    		refresh();
    	});
    };
    $scope.edit = function(id){
    	console.log(id);
    	$http.get('/patientlist/'+id).then(function(response){
    			$scope.patient = response.data;
    	});
    };

    $scope.update = function(){
    	console.log($scope.patient._id);
    	$http.put('/patientlist/' + $scope.patient._id, $scope.patient).then(function(response){
    		refresh();
    	});

    };

	
}]);