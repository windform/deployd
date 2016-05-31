 angular.module("sportsStore",["customFilters","cart","ngRoute"])
 .config(function($routeProvider){
    $routeProvider.when("/complete",{
        templateUrl:"/views/thankYou.html"
    });
    $routeProvider.when("/placeorder",{
        templateUrl:"/views/placeOrder.html"
    });
    $routeProvider.when("/checkout",{
        templateUrl:"/views/checkoutSummary.html"
    });
    $routeProvider.when("/products",{
        templateUrl:"/views/productList.html"
    });
    $routeProvider.otherwise({
        templateUrl:"/views/productList.html"
    });

 })
 .constant("dataUrl","http://localhost:5000/products")
 .constant("orderUrl","http://localhost:5000/order")
 .controller("sportsStoreCtrl", function ($scope,$http,$location,dataUrl,orderUrl,cart) {
    /*$scope.data = {
        products: [
            {
                name: "Product #1", description: "A product",
                category: "Category #1", price: 100
            },
            {
                name: "Product #2", description: "A product",
                category: "Category #1", price: 110
            },
            {
                name: "Product #3", description: "A product",
                category: "Category #2", price: 210
            },
            {
                name: "Product #4", description: "A product",
                category: "Category #3", price: 202
            }]
    };*/
    $scope.data={};
    $http.get(dataUrl).success(function(data){
        $scope.data.products=data;
    }).error(function(error){
        $scope.data.error=error;
    });

    $scope.sendOrder=function(shippingDetails){
        var order=angular.copy(shippingDetails);
        order.products=cart.getProducts();
        $http.post(orderUrl,order)
            .success(function(data){
                $scope.data.orderId=data.id;
                //cart.getProducts().length = 0;
            })
            .error(function(error){
                $scope.data.orderError=error;
            }).finally(function(){
                $location.path("/complete");
            })
    }

})
 .constant("productListActiveClass","btn-primary")
 .constant("productListPageCount",3)
.controller("productListCtrl",function($scope,$filter,productListActiveClass,productListPageCount,cart){

    var selectedCategory=null;
    $scope.selectedPage=1;
    $scope.pageSize=productListPageCount;

    $scope.selectCategory=function(newCategory){
      selectedCategory=newCategory;
      $scope.selectedPage=1;
       // alert(selectedCategory);
    }
    $scope.selectPage=function(newPage){
        $scope.selectedPage=newPage;
    }
    $scope.categoryFilterFn=function(product){
        return selectedCategory==null || product.category == selectedCategory;
    }
    $scope.getCategoryClass=function(category){
        return selectedCategory == category ? productListActiveClass : "";
    }
    $scope.getPageClass=function(page){
        return $scope.selectedPage == page ? productListActiveClass : ""; 
    }
    $scope.addProductToCart=function(product){
        cart.addProduct(product.id,product.name,product.price);
    }
})