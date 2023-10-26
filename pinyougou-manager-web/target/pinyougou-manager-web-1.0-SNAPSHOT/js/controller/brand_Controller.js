app.controller('brandController', function ($scope, $controller,brandService) {//构建前端控制层
    $controller("baseController",{$scope:$scope});
    //读取列表数据绑定到表单中

    $scope.findAll = function () {
        brandService.findAll().success(function (response) {
            $scope.list = response;
        });
    }


    //分页

    $scope.findPage = function (page, rows) {
        brandService.findPage().success(
            function (response) {
                $scope.list = response.rows;
                $scope.paginationConf.totalItems = response.total;//更新总记录数
            }
        );
    }



//新增品牌
    $scope.save = function () {
        var object = null;
        if ($scope.entity.id != null) {
            object = brandService.update($scope.entity);
        } else {
            object = brandService.add($scope.entity);
        }
        object.success(function (response) {
            if (response.success) {
                $scope.reloadList();
            } else {
                alert(response.message);
            }
        })
    }

    //查询实体
    $scope.findOne = function (id) {
        brandService.findOne(id).success(function (response) {
                $scope.entity = response;
            }
        );
    }


//批量删除
    $scope.dele = function () {
        if ($scope.selectIds.length == 0) {
            alter("请选择！");
            return;
        }
        //获取选中的复选框
        brandService.dele($scope.selectIds).success(
            function (response) {
                if (response.success) {
                    $scope.reloadList();//刷新列表
                    $scope.selectIds = [];
                } else {
                    alert(response.message);
                }
            }
        );
    }

    $scope.searchEntity = {};//定义搜索对象
//条件查询+分页
    $scope.search = function (page, rows) {
        brandService.search(page, rows, $scope.searchEntity).success(
            function (response) {
                $scope.paginationConf.totalItems = response.total;//总记录数
                $scope.list = response.rows;//给列表变量赋值
            }
        );
    }

});