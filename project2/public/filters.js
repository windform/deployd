angular.module("exampleApp.Filters",[]) .filter("dayName",function(){   //定义过滤器

    var dayNames=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    return function(input){
        return angular.isNumber(input) ? dayNames[input] : input;
    }
    
})