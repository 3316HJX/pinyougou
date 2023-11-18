app.controller('searchController',function($scope,$location ,searchService){
//搜索
    $scope.search=function(){
        $scope.searchMap.pageNo=1;//页码重新置为1
        searchService.search( $scope.searchMap ).success(
            function(response){
                $scope.resultMap=response;//搜索返回的结果
            }
        );
    }

    $scope.searchMap={ keywords:"" ,brand:"",category:"",spec:{},price:"",pageNo:1,pageSize:20,sort:"",sortField:"" };//搜索对象


});