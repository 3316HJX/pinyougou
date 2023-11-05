//控制层
app.controller('goodsController', function ($scope, $controller, goodsService, uploadService,itemCatService,typeTemplateService) {

    $controller('baseController', {$scope: $scope});//继承

    //读取列表数据绑定到表单中  
    $scope.findAll = function () {
        goodsService.findAll().success(
            function (response) {
                $scope.list = response;
            }
        );
    }

    //分页
    $scope.findPage = function (page, rows) {
        goodsService.findPage(page, rows).success(
            function (response) {
                $scope.list = response.rows;
                $scope.paginationConf.totalItems = response.total;//更新总记录数
            }
        );
    }

    //查询实体
    $scope.findOne = function (id) {
        goodsService.findOne(id).success(
            function (response) {
                $scope.entity = response;
            }
        );
    }

    //保存
    $scope.add = function () {
        editor.html();
        $scope.entity.goodsDesc.introduction = editor.html();//商品介绍

        goodsService.add($scope.entity).success(function (response) {
                alert(response.message);
                if (response.success) {
                    $scope.entity = {};
                    editor.html("");//清空编辑器
                }
            }
        );


    }


    //批量删除
    $scope.dele = function () {
        //获取选中的复选框
        goodsService.dele($scope.selectIds).success(
            function (response) {
                if (response.success) {
                    $scope.reloadList();//刷新列表
                    $scope.selectIds = [];
                }
            }
        );
    }

    $scope.searchEntity = {};//定义搜索对象

    //搜索
    $scope.search = function (page, rows) {
        goodsService.search(page, rows, $scope.searchEntity).success(
            function (response) {
                $scope.list = response.rows;
                $scope.paginationConf.totalItems = response.total;//更新总记录数
            }
        );
    }

$scope.image_entity={}
    $scope.uploadImage = function () {
        uploadService.upload().success(function (response) {
            if (response.error == 0) {
                $scope.image_entity.url = response.url;
            } else {
                alert(response.message);
            }
        })
    }

    $scope.uploadFile=function () {
        uploadService.uploadFile().success(function (response) {
            alert(response);
            if(response.error==0){
                $scope.image_entity.url=  response.url;
            }else{
                alert(response.message);
            }
        })
    }

    $scope.entity={goods:{},goodsDesc:{itemImages:[]}};//定义页面实体结构
    //添加图片列表
    $scope.add_image_entity=function () {
        $scope.entity.goodsDesc.itemImages.push($scope.image_entity);
    }
    $scope.remove_image_entity=function (index) {
        $scope.entity.goodsDesc.itemImages.splice(index,1);
    }


    //查询商品一级分类的列表
    $scope.selectItemCat1List=function () {
        itemCatService.findByParentId(0).success(
            function (response) {
                $scope.itemCat1List=response;

            }
        )
    }
    //查询商品二级分类列表 使用angular变量监控绑定事件
    $scope.$watch("entity.goods.category1Id",function (newValue,oldValue) {
        itemCatService.findByParentId(newValue).success(
            function (response) {
                $scope.itemCat2List=response;

            }
        )
    })
    //查询商品三级分类列表 使用angular变量监控绑定事件
    $scope.$watch("entity.goods.category2Id",function (newValue,oldValue) {
        itemCatService.findByParentId(newValue).success(
            function (response) {
                $scope.itemCat3List=response;

            }
        )
    })

    //三级分类选择后，读取模板id
    $scope.$watch("entity.goods.category3Id",function (newValue,oldValue) {
        itemCatService.findOne(newValue).success(
            function (response) {
                $scope.entity.goods.typeTemplateId=response.typeId;//更新模板id

            }
        )

    })

    //模板ID选择后  更新模板对象
    $scope.$watch('entity.goods.typeTemplateId', function(newValue, oldValue) {
        typeTemplateService.findOne(newValue).success(
            function(response){
                $scope.typeTemplate=response;//获取类型模板
                $scope.typeTemplate.brandIds= JSON.parse( $scope.typeTemplate.brandIds);//品牌列表
                $scope.entity.goodsDesc.customAttributeItems=JSON.parse( $scope.typeTemplate.customAttributeItems);//扩展属性
            }
        );
        //查询规格列表
        typeTemplateService.findSpecList(newValue).success(
            function(response){
                $scope.specList=response;
            }
        );
    });

    $scope.entity={ goodsDesc:{itemImages:[],specificationItems:[]}  };

    //更新选中的规格
    $scope.updateSpecItems=function ($event, name,value) {

        //思路：在集合中查询规格名称为某值的对象
        var object=  $scope.searchObjectByKey( $scope.entity.goodsDesc.specificationItems ,"name",name );
        if(object!=null ){ //有此规格
            if($event.target.checked){//如果是选中
                object.values.push(value);
            }else{//如果是取消选中
                object.values.splice( object.values.indexOf(value) ,1);
                if( object.values.length==0 ){
                    $scope.entity.goodsDesc.specificationItems.splice(
                        $scope.entity.goodsDesc.specificationItems.indexOf(object) ,1  );
                }
            }

        }else{//没有此规格,添加规格记录
            $scope.entity.goodsDesc.specificationItems.push({name:name,values:[value] }  );
        }

    }

//创建SKU列表
    $scope.createItemList=function(){
        $scope.entity.itemList=[{spec:{},price:0,num:99999,status:'0',isDefault:'0'}];//初始
        var items=  $scope.entity.goodsDesc.specificationItems;
        for(var i=0;i< items.length;i++){
            $scope.entity.itemList = addColumn( $scope.entity.itemList,items[i].name,items[i].values );
        }
    }
//添加列值
    addColumn=function(list,name,values){
        var newList=[];//新的集合
        for(var i=0;i<list.length;i++){
            var oldRow= list[i];
            for(var j=0;j<values.length;j++){
                var newRow= JSON.parse( JSON.stringify( oldRow )  );//深克隆
                newRow.spec[name]=values[j];
                newList.push(newRow);
            }
        }
        return newList;
    }
});	
