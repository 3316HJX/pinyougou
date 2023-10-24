package com.pinyougou.sellergoods.service.impl;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import com.alibaba.dubbo.config.annotation.Service;
import com.pinyougou.mapper.TbBrandMapper;
import com.pinyougou.pojo.TbBrand;
import com.pinyougou.sellergoods.service.BrandService;



/**
 * @author HJX
 * @create 2023-10-23 0:34
 */

@Service
public class BrandServiceImpl implements BrandService {
    @Autowired
    private TbBrandMapper brandMapper;


    @Override
    public List<TbBrand> findAll() {
        return brandMapper.selectByExample(null);
    }
}
