var controllersModule = angular.module("exampleApp.Controllers",[]);
 controllersModule.controller("dayCtrl",function($scope,days){   //定义控制器
             //var dayNames=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
             //$scope.day=dayNames[new Date().getDay()];
             //$scope.day=new Date().getDay();
             $scope.day=days.today;
             
            /*$scope.day=days.today
            $scope.tomorrow=days.tomorrow;*/
        })
        .controller("tomorrowCtrl",function($scope,days){
            //var dayNames=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
            //$scope.tomorrow=dayNames[(new Date().getDay()+1)];
            //$scope.tomorrow=new Date().getDay()+1;
            $scope.day=days.tomorrow;

        })