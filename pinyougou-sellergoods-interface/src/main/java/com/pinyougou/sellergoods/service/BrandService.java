package com.pinyougou.sellergoods.service;

import com.pinyougou.pojo.TbBrand;
import entity.PageResult;

import java.util.List;

/**
 * @author HJX
 * @create 2023-10-23 0:30
 */
public interface BrandService {
    public List<TbBrand> findAll();

    public PageResult findPage(int pageNum,int pageSize);

//    增加
    public void add(TbBrand brand);
    //修改
    public void update(TbBrand brand);
    /*根据id获取实体*/
    public TbBrand findOne(Long id);
    /*批量删除*/
    public void delete(Long [] ids);
    /*分页*/
    public PageResult findPage(TbBrand brand,int pageNum,int pageSize);
}
